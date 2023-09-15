import styles from "./VoiceStudyPage.module.css"
import { NavLink } from "react-router-dom";

function VoiceStudyPage() {
  return (
    <div className={styles.MainState}>
      <div className={styles.MainState_record}>
        <img className={styles.record_img} src="/src/assets/microphone.png" alt="" />
        <NavLink to='/Voice-Record'>
          <div className={styles.btn}>녹음하기</div>
        </NavLink>
      </div>
      <div className={styles.MainState_record}>
        <img className={styles.record_img} src="/src/assets/microphone.png" alt="" />
        <NavLink to='/Voice-Record'>
          <div className={styles.btn}>녹음하기</div>
        </NavLink>
      </div>
      <div className={styles.MainState_record}>
        <img className={styles.record_img} src="/src/assets/microphone.png" alt="" />
        <NavLink to='/Voice-Record'>
          <div className={styles.btn}>녹음하기</div>
        </NavLink>
      </div>
      
    </div>
  );
}

export default VoiceStudyPage;