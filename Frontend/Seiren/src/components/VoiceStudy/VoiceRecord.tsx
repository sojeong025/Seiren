import { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { RecordingState, AudioDataState } from "../../recoil/RecordAtom";
import styles from "./VoiceRecord.module.css";
import { BsFillMicFill, BsStopFill, BsPlayFill } from "react-icons/bs";
//import { MediaRecorder, register } from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";

const VoiceRecord = () => {
  const [recordingStatus, setRecordingStatus] = useRecoilState(RecordingState);
  const [stream, setStream] = useState<MediaStream | null>(null); // 오디오 스트림 저장
  const [media, setMedia] = useState<MediaRecorder | null>(null);
  const [analyser, setAnalyser] = useState<ScriptProcessorNode | null>(null);
  const [source, setSource] = useState<MediaStreamAudioSourceNode | null>(null); // 오디오 소스 저장
  const [audioUrl, setAudioUrl] = useState<Blob | string | ArrayBuffer | null>(null); // 녹음된 오디오 데이터의 Url 저장
  const [disabled, setDisabled] = useState<boolean>(true);
  const setAudioData = useSetRecoilState(AudioDataState);

  // useEffect(() => {
  //   const registerEncoder = async () => {
  //     await register(await connect());
  //   };

  //   registerEncoder();
  // }, []);

  // 사용자가 음성 녹음을 시작했을 때
  const onRecAudio = async () => {
    setRecordingStatus("recording");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!MediaRecorder.isTypeSupported("audio/wav")) {
        console.error("audio/wav is not supported");
        return;
      }
      var mediaRecoder = new MediaRecorder(stream, {
        mimeType: "audio/wav",
        audioBitsPerSecond: 22050,
      });

      mediaRecoder.start();

      setStream(stream);
      setMedia(mediaRecoder as MediaRecorder);

      mediaRecoder.ondataavailable = function (e) {
        if (e.data.size > 0) {
          let blobURL = URL.createObjectURL(e.data);
          if (blobURL) {
            let data = new Blob([e.data], { type: "audio/wav" });
            let fileReader = new FileReader();

            fileReader.onloadend = function () {
              let arrayBuffer = fileReader.result as ArrayBuffer;
              if (arrayBuffer) {
                let buffer = new Uint8Array(arrayBuffer);
                if (buffer.byteLength == e.data.size) {
                  setAudioUrl(buffer);
                  setAudioData(buffer);
                }
              }
            };
            fileReader.readAsArrayBuffer(data);
          }
        }
      };
    } catch (error) {
      console.error("Error occurred while starting the recording:", error);
    }
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
    let blob = new Blob([audioUrl], { type: "audio/wav" });
    let url = URL.createObjectURL(blob);

    var audio = new Audio(url);
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
