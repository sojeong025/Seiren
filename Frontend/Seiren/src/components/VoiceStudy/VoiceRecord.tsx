import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { RecordingState, AudioDataState } from "../../recoil/RecordAtom";
import styles from "./VoiceRecord.module.css";
import { BsFillMicFill, BsStopFill, BsPlayFill } from "react-icons/bs";
import { WaveFile } from 'wavefile';

declare global {
  interface Window { webkitAudioContext: typeof AudioContext }
}

const VoiceRecord = () => {
  const [recordingStatus, setRecordingStatus] = useRecoilState(RecordingState);
  const [stream, setStream] = useState<MediaStream | null>(null); // 오디오 스트림 저장
  const [media, setMedia] = useState<MediaRecorder | null>(null); // 인스턴스 저장
  const [analyser, setAnalyser] = useState<ScriptProcessorNode | null>(null);
  const [source, setSource] = useState<MediaStreamAudioSourceNode | null>(null); // 오디오 소스 저장
  const [audioUrl, setAudioUrl] = useState<Blob | string | ArrayBuffer | null>(null); // 녹음된 오디오 데이터의 Url 저장
  const [disabled, setDisabled] = useState<boolean>(true);
  const setAudioData = useSetRecoilState(AudioDataState);


  // 사용자가 음성 녹음을 시작했을 때
  const onRecAudio = () => {
    setRecordingStatus("recording");
    setDisabled(true);
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const localAnalyser = audioCtx.createScriptProcessor(0, 1, 1);

    function makeSound(stream) {
      var source = audioCtx.createMediaStreamSource(stream);
      source.connect(localAnalyser);
      localAnalyser.connect(audioCtx.destination);
      return source;
    }


    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream: MediaStream) => {
      var mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      var source = makeSound(stream);

      setStream(stream);
      setMedia(mediaRecorder);
      setSource(source);
      setAnalyser(localAnalyser);

      mediaRecorder.ondataavailable = async function (e) {
        if (e.data.size > 0) {
          let blobURL = URL.createObjectURL(e.data);
          console.log("Blob URL:", blobURL);

          if (blobURL) {

            // Fetch the audio data as an ArrayBuffer
            let response= await fetch(blobURL);
            let arrayBuffer= await response.arrayBuffer();

            // Decode the audio data into PCM format using Web Audio API 
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            let audioBuffer= await audioCtx.decodeAudioData(arrayBuffer);

            // Create a wavefile instance and convert the PCM data to wav file format.
            let wav=new WaveFile();
          
            for(let channel=0; channel<audioBuffer.numberOfChannels; channel++){
                let samples=audioBuffer.getChannelData(channel);
                let int16Samples= Int16Array.from(samples.map(n => n *32767));
                wav.fromScratch(1,audioBuffer.sampleRate,'16',int16Samples); 
            }
            console.log("wav buffer:", wav.toBuffer());

            // Convert the wav file to a Blob and set it as the current audioUrl
            let wavBuffer = wav.toBuffer();
            let wavBlob = new Blob([wavBuffer], { type: 'audio/wav' });
            let wavURL=URL.createObjectURL(wavBlob);
            
            console.log('녹음시 wavURL은:',wavURL)
            console.log('녹음시 wavBlob은:',wavBlob)
            setAudioUrl(wavURL);
            setAudioData(wavBlob);
          }
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = () => {
    if (media) {
      media.stop();
      if (stream) {
        stream.getAudioTracks().forEach(function (track) {
          track.stop();
          console.log("멈췄다");
        });
      }
    }
    if (source) {
      source.disconnect();
    }
    if (analyser) {
      analyser.disconnect();
    }
    setDisabled(false);
    setRecordingStatus("stopped");
  };

  const play = () => {
    var audio = new Audio(audioUrl as string);  // Use the original Blob URL
    audio.loop = false;
    audio.volume = 1;

    audio.play();
};

  return (
    <div>
      <div className={styles.Text}>
        <div className={styles.MainText}>Record Your Voice</div>
        <div className={styles.RecordText}>가능한 주변 소음 없는 조용한 환경에서 녹음해 주세요.</div>
      </div>

      <div className={styles.Btn}>
        {recordingStatus === "idle" && (
          <button className={styles.Btn_record} onClick={onRecAudio}>
            <BsFillMicFill />
          </button>
        )}

        {recordingStatus === "recording" && (
          <button className={styles.Btn_stop} onClick={offRecAudio}>
            <BsStopFill />
          </button>
        )}

        {recordingStatus === "stopped" && (
          <>
            <button className={styles.Btn_play} onClick={play} disabled={!audioUrl}>
              <BsPlayFill />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VoiceRecord;
