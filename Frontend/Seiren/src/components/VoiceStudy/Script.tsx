import { useRecoilState, useRecoilValue } from 'recoil';
import { RecordingState, VoiceIdState } from '../../recoil/RecordAtom';
import { customAxios } from '../../libs/axios';
import { useState, useEffect } from 'react';

import styles from "./Script.module.css"


const Script = () => {
  // 스크립트 state설정
  const [scriptId, setScriptId] = useState();
  const [nextScriptId, setNextScriptId] = useState();


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


  const goNext = () => {
    setScriptId(nextScriptId);
    customAxios.get(`nextScripts/${nextScriptId}`)
      .then((res) => {
        console.log(`넘어가기 성공? ㅋ`, res)
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
        <div className={styles.text_next}>{nextScript}</div>
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
