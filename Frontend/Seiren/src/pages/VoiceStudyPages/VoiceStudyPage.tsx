import styles from "./VoiceStudyPage.module.css"
import { NavLink } from "react-router-dom";

function VoiceStudyPage() {
  return (
    <div>
      <div className={styles.Maintext}>Register your voice</div>
      <div className={styles.MainState}>
        <div className={styles.MainState_record}>
          <img className={styles.record_img} src="/src/assets/record.png" alt="" />
          <div></div>
          <NavLink to='/voice-record'>
            <div className={styles.btn}>녹음하기</div>
          </NavLink>
        </div>
        <div className={styles.MainState_record}>
          <img className={styles.record_img} src="/src/assets/microphone.png" alt="" />
          <NavLink to='/voice-studying'>
            <div className={styles.btn}>학습하기</div>
          </NavLink>
        </div>
        <div className={styles.MainState_record}>
          <img className={styles.record_img} src="/src/assets/finish.png" alt="" />
          <NavLink to='/voice-custom'>
            <div className={styles.btn}>학습완료</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default VoiceStudyPage;