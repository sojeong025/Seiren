import styles from "./VoiceStudyPage.module.css"
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";
import record from "../../assets/lottie/record.json"
import programming from "../../assets/lottie/programming.json"
import finish from "../../assets/lottie/finish.json"

function VoiceStudyPage() {
  return (
    <div>
      <div className={styles.Maintext}>Register your voice</div>
      <div className={styles.MainState}>
        <div className={styles.MainState_record}>
          <div className={styles.icon}>
            <Lottie animationData={record} style={{width: '300px', height: '300px'}} />
          </div>
          <NavLink to='/voice-record'>
            <div className={styles.btn}>녹음하기</div>
          </NavLink>
        </div>
        <div className={styles.MainState_record}>
          <div className={styles.icon}>
            <Lottie animationData={programming} style={{width: '350px', height: '350px'}} />
          </div>
          <NavLink to='/voice-studying'>
            <div className={styles.btn}>학습하기</div>
          </NavLink>
        </div>
        <div className={styles.MainState_record}>
        <div className={styles.icon}>
        <Lottie animationData={finish} style={{width: '350px', height: '350px'}} />
          </div>
          <NavLink to='/voice-custom'>
            <div className={styles.btn}>학습완료</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default VoiceStudyPage;