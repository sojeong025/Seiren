import { useRecoilState, useRecoilValue } from 'recoil';
import { RecordingState, VoiceIdState, AudioDataState } from '../../recoil/RecordAtom';
import { customAxios } from '../../libs/axios';
import { useState, useEffect } from 'react';
import styles from "./Script.module.css"
import * as AWS from 'aws-sdk';
import toWav from 'audiobuffer-to-wav';

async function resampleAudioData(audioData, newSampleRate) {
  // 원본 오디오 버퍼 생성
  const audioCtx = new AudioContext();
  const sourceBuffer = await audioCtx.decodeAudioData(audioData);

  // OfflineAudioContext 객체 생성
  const offlineCtx = new OfflineAudioContext(sourceBuffer.numberOfChannels, sourceBuffer.length * newSampleRate / sourceBuffer.sampleRate, newSampleRate);

  // 소스 노드와 버퍼 설정
  const source = offlineCtx.createBufferSource();
  source.buffer = sourceBuffer;

  // 소스 노드 연결 및 시작
  source.connect(offlineCtx.destination);
  source.start();

 return await offlineCtx.startRendering();  // 결과 데이터 반환
}

const Script: React.FC = () => {
  // 스크립트 state설정
  const [scriptId, setScriptId] = useState();
  const [nextScriptId, setNextScriptId] = useState();
  const audioUrl = useRecoilValue(AudioDataState);

  const [recordingStatus, setRecordingStatus] = useRecoilState(RecordingState);
  const voiceId = useRecoilValue(VoiceIdState);
  // 스크립트 내용
  const [nowScript, setNowScript] = useState('');
  const [nextScript, setNextScript] = useState('');

  // 최신 스크립트 상태 get
  useEffect(() => {
    customAxios.get(`records/recent/${voiceId}`)
      .then((res) => {
        console.log('스크립트 get 요청 성공', res)
        console.log(res.data.response)
        setScriptId(res.data.response)
      })
      .catch((err) => {
        console.error('스크립트 get 요청 에러', err)
      });
  }, []);

  // 스크립트 get
  useEffect(()=>{
    customAxios.get(`nextScripts/${scriptId}`)
      .then((res) => {
        console.log('다음 스크립트 get 요청 성공', res)
        setNowScript(res.data.response.script)
        setNextScriptId(res.data.response.scriptId)
      }) 
      .catch((err) => {
        console.error('다음 스크립트 get 요청 에러', err)
      });
  }, [scriptId]);
  
  // 다음 스크립트 get
  useEffect(() => {
    customAxios.get(`nextScripts/${nextScriptId}`)
      .then((res) => {
        console.log('두번째 스크립트 get 요청 성공', res)
        setNextScript(res.data.response.script)
      })
      .catch((err) => {console.error('두번째 스크립트 get요청 실패다', err)})
  }, [nextScriptId])


  const goNext = async () => {
    if (recordingStatus === "stopped") {
      let blob = new Blob([audioUrl], { type: "audio/wav" });
      let url = URL.createObjectURL(blob);
      console.log(url);

      const formData = new FormData();

      // 원본 오디오 데이터 가져옴
      let response=await fetch(url);
      let data=await response.arrayBuffer();

      // 샘플링 비율을 변경한 후 Blob으로 변환함 
      let resampled=await resampleAudioData(data,22050);
      let wavArrayBuffer=toWav(resampled);
      let wavBlob=new Blob([wavArrayBuffer],{type:'audio/wav'});
    
      formData.append("file", wavBlob);

      AWS.config.update({
        region: import.meta.env.VITE_PUBLIC_REGION,
        accessKeyId: import.meta.env.VITE_PUBLIC_ACCESSKEY,
        secretAccessKey: import.meta.env.VITE_PUBLIC_SECRETKEY,
      });
      console.log(formData.get("file"));
      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: import.meta.env.VITE_PUBLIC_BUCKET,
          Key: "records/" + voiceId +'-'+ new Date().toISOString() + ".wav",
          Body: formData.get("file")
        },
      });

      const promise = upload.promise();

      promise.then(
        function (data) {
          console.log("File uploaded successfully");
          console.log(data.Location);
          customAxios.post("records",{
            "voiceId" : voiceId,
            "scriptId" : scriptId,
            "recordUrl":data.Location
          }).then((res)=>{
            console.log("녹음하고 보낸거"+res.data.response);
          })
        },
        function (err) {
          return err("Audio upload failed");
        },
      );
    }
    setScriptId(nextScriptId);
    customAxios.get(`nextScripts/${nextScriptId}`)
      .then((res) => {
        console.log(`넘어가기 성공`, res)
      })
    if(recordingStatus === "stopped"){
      console.log("녹음이 완료되었습니다. 다음으로 넘어갑니다.")
      setRecordingStatus("idle");
    }
  }

  return (
    <div>      
      <div className={styles.text}>
        <div className={styles.text_now}>{nowScript}</div>
        <div className={styles.text_next}>Next {nextScript}</div>
      </div>
        
      <hr className={styles.hr} />

      <div className={styles.btn}>
        <div className={styles.record2} onClick={()=>{
          console.log("다시 녹음 버튼 클릭");
          setRecordingStatus("idle");
        }}>다시 녹음</div>
        <div className={styles.next} onClick={goNext}>다음</div>
      </div>
    </div>
  );
};


export default Script;
