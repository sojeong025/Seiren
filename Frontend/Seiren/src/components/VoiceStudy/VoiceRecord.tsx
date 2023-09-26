import { useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { RecordingState } from "../../recoil/RecordAtom";
import styles from "./VoiceRecord.module.css";
import { BsFillMicFill, BsStopFill, BsPlayFill } from "react-icons/bs";
import * as AWS from 'aws-sdk';


const VoiceRecord = () => {
  const [recordingStatus, setRecordingStatus] = useRecoilState(RecordingState);
  const [stream, setStream] = useState<MediaStream | null>(null); // 오디오 스트림 저장
  const [media, setMedia] = useState<MediaRecorder | null>(null); // 인스턴스 저장
  const [analyser, setAnalyser] = useState<ScriptProcessorNode | null>(null);
  const [source, setSource] = useState<MediaStreamAudioSourceNode | null>(null); // 오디오 소스 저장
  const [audioUrl, setAudioUrl] = useState<Blob | string | ArrayBuffer | null>(null); // 녹음된 오디오 데이터의 Url 저장
  const [disabled, setDisabled] = useState<boolean>(true);

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

      mediaRecorder.ondataavailable = function (e) {
        if (e.data.size > 0) {
          console.log("Data available after MediaRecorder.stop() called.");
          console.log(`This blob's size is ${e.data.size}`);
          let blobURL = URL.createObjectURL(e.data);
          console.log(blobURL);
          if (blobURL) {
            console.log("Blob url created.");
            console.log(blobURL);
            let data = new Blob([e.data], { type: "audio/wav" });
            let fileReader = new FileReader();

            fileReader.onloadend = function () {
              let arrayBuffer = fileReader.result as ArrayBuffer;
              if (arrayBuffer) {
                console.log("Array buffer created.");
                let buffer = new Uint8Array(arrayBuffer);
                if (buffer.byteLength == e.data.size) {
                  console.log("Buffer created.");
                  setAudioUrl(buffer);
                }
              }
            };
            fileReader.readAsArrayBuffer(data);
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

  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      let blob = new Blob([audioUrl], { type: "audio/wav" });
      let url = URL.createObjectURL(blob);
      console.log(url);

      const formData = new FormData();
      formData.append("file", blob);

      AWS.config.update({
        region: import.meta.env.VITE_PUBLIC_REGION,
        accessKeyId: import.meta.env.VITE_PUBLIC_ACCESSKEY,
        secretAccessKey: import.meta.env.VITE_PUBLIC_SECRETKEY,
      });

      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: import.meta.env.VITE_PUBLIC_BUCKET,
          Key: "testTrack/" + new Date().toISOString() + ".wav",
        },
      });

      const promise = upload.promise();

      promise.then(
        function (data) {
          console.log("File uploaded successfully");
          console.log(data);
        },
        function (err) {
          return err("Audio upload failed");
        },
      );
    }
  }, [audioUrl]);

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
            <button onClick={onSubmitAudioFile}>저장</button>
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
