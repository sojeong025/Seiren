import { useState, useCallback } from "react";
import styles from "./VoiceRecord.module.css"

const VoiceRecord = () => {
  const [stream, setStream] = useState<MediaStream | null>(null); // 오디오 스트림 저장
  const [media, setMedia] = useState<MediaRecorder | null>(null); // 인스턴스 저장
  const [onRec, setOnRec] = useState<boolean>(true); // 녹음 중인지 아닌지
  const [source, setSource] = useState<MediaStreamAudioSourceNode | null>(null); // 오디오 소스 정보 저장
  const [analyser, setAnalyser] = useState<ScriptProcessorNode | null>(null); // 오디오 분석 정보 저장
  const [audioUrl, setAudioUrl] = useState<Blob | string | ArrayBuffer | null>(null); // 녹음된 오디오 데이터의 Url 저장
  const [disabled, setDisabled] = useState<boolean>(true);

  const onRecAudio = () => {
    setDisabled(true)
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream: MediaStream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e: AudioProcessingEvent) {
        // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e: BlobEvent) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    if(media){
      media.ondataavailable = function (e) {
        setAudioUrl(e.data);
        setOnRec(true);
      };
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    if(stream){
      stream.getAudioTracks().forEach(function (track) {
        track.stop();
      });
    }

    // 미디어 캡처 중지
    if(media){
      media.stop();
      // 메서드가 호출 된 노드 연결 해제
      if(analyser){
        analyser.disconnect();
      }
      if(source){
        source.disconnect();
      }
    }
  };

  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
    }
    // File 생성자를 사용해 파일로 변환
    const sound = new File([audioUrl], "soundBlob", { lastModified: new Date().getTime(), type: "audio" });

    setDisabled(false);
    console.log(sound); // File 정보 출력
  }, [audioUrl]);

  const play = () => {
    const audio = new Audio(URL.createObjectURL(audioUrl));
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
        <button className={styles.Btn_record} onClick={onRec ? onRecAudio : offRecAudio}>녹음</button>
        <button className={styles.Btn_listen} onClick={onSubmitAudioFile}>정지</button>
        <button className={styles.Btn_play} onClick={play} disabled={disabled}>재생</button>
      </div>
    </div>
  );
};

export default VoiceRecord;