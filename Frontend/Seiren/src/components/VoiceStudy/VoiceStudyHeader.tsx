import { useNavigate } from 'react-router-dom';
import styles from "./VoiceStudyHeader.module.css"

interface VoiceStudyHeaderProps {
  totalIndex: number; // 전체 script의 개수 받는 props 추가
  currentIndex: number; // 현재 script의 인덱스 값을 받는 props 추가
}

const VoiceStudyHeader: React.FC<VoiceStudyHeaderProps> = ({ totalIndex, currentIndex }) => {
  
  const isButtonDisabled = currentIndex < 9; // 버튼 활성화 여부 판단
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/voice-studying');
  }

  const progress = (currentIndex / totalIndex) * 100;

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