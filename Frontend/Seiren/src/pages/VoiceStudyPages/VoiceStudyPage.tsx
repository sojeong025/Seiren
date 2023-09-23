import { customAxios } from "../../libs/axios";
import { useSetRecoilState } from 'recoil';
import { RecordState, VoiceIdState } from "../../recoil/RecordAtom";
import { useEffect, useState } from "react";

import NoVoice from "../../components/VoiceStudy/NoVoice";
import VoiceState from "../../components/VoiceStudy/VoiceState";


function VoiceStudyPage() {
  const [success, setSuccess] = useState<boolean | null>(null);
  const setRecordState = useSetRecoilState(RecordState);
  const setVoiceId = useSetRecoilState(VoiceIdState);

  // 가장 최신의 목소리의 id와 상태
  useEffect(() => {
    customAxios.get("progressingVoices")
      .then((res) => {
        console.log('목소리 상태 호출', res)
        setSuccess(res.data.success);
        setRecordState(res.data.response.state);
        setVoiceId(res.data.response.voiceId);
      })
      .catch((error) => {
        console.error('목소리 상태 호출 중 오류:', error);
      });
  }, []);

  // 로딩화면 걸어두기
  if(success === null) return null;

  return (
    <div>
      { success? <VoiceState/> : <NoVoice/>}
    </div>
  );
}

export default VoiceStudyPage;