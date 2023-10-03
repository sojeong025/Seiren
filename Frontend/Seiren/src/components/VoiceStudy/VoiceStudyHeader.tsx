import { useNavigate } from 'react-router-dom';
import styles from "./VoiceStudyHeader.module.css"
import { customAxios } from '../../libs/axios';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { VoiceIdState } from '../../recoil/RecordAtom';

const VoiceStudyHeader: React.FC = () => {
  const voiceId = useRecoilValue(VoiceIdState);
  const [recordCount, setRecordCount] = useState(0); 
  const [totalCount, setTotalCount] = useState(1);

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/voice-studying');
  }
    
  useEffect(() => {
    customAxios.get(`records/count/${voiceId}`)
    .then((res) => {
      console.log('진행률 요청 성공', res)
      setRecordCount(res.data.response.recordCount);
      setTotalCount(res.data.response.totalCount);
    })
    .catch((err) => {console.error('진행률 요청 실패', err)})
  }, [])
  
  const progress = (recordCount / totalCount) * 100;
  const isButtonDisabled = recordCount < 770; 


  return (
    <div className={styles.header}>
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar} style={{width: `${progress}%`}}/>
      </div>
      {/* isButtonDisabled 값에 따라 버튼의 disabled 속성 설정 */}
      <button className={styles.button_study} disabled={isButtonDisabled}
              onClick={handleButtonClick}>목소리 학습</button>
    </div>
  );
};

export default VoiceStudyHeader;