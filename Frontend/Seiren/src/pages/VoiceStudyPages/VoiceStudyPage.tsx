import { customAxios } from "../../libs/axios";
import { useSetRecoilState } from 'recoil';
import { RecordState, VoiceIdState } from "../../recoil/RecordAtom";
import { useEffect, useState } from "react";

import NoVoice from "../../components/VoiceStudy/NoVoice";
import VoiceState from "../../components/VoiceStudy/VoiceState";
import styles from './VoiceStudyPage.module.css'

function VoiceStudyPage() {
  const [success, setSuccess] = useState<boolean | null>(null);
  const setRecordState = useSetRecoilState(RecordState);
  const setVoiceId = useSetRecoilState(VoiceIdState);

  // 가장 최신의 목소리의 id와 상태
  useEffect(() => {
    customAxios.get("progressingVoices")
      .then((res) => {
        console.log('목소리 상태 호출', res)
        if (res.data.response) { // response 객체가 있는지 확인
          console.log(`voiceId:`, res.data.response.voiceId)
          setSuccess(res.data.success);
          setRecordState(res.data.response.state);
          setVoiceId(res.data.response.voiceId);
        } else {
          setSuccess(false);
        }
      })
      .catch((error) => {
        console.error('목소리 상태 호출 중 오류:', error);
      });
  }, [success]);

  // 로딩화면 걸어두기
  if(success === null) return null;

  return (
    <div className={styles.total}>
      { success? <VoiceState/> : <NoVoice setSuccess={setSuccess}/>}
    </div>
  );
}

export default VoiceStudyPage;