import { NavLink } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { RecordState } from '../../recoil/RecordAtom';

import Lottie from "lottie-react";
import record from "../../assets/lottie/record.json"
import programming from "../../assets/lottie/programming.json"
import finish from "../../assets/lottie/finish.json"
import styles from "./VoiceState.module.css"

function VoiceState() {
  const recordState = useRecoilValue(RecordState);
  console.log(recordState);
  
  return(
    <div>
      <div className={styles.Maintext}>Register your voice</div>
      <div className={styles.MainState}>
        <div className={styles.MainState_record}>
          <div className={styles.icon}>
            <Lottie animationData={record} style={{width: '300px', height: '300px'}} />
          </div>
          <NavLink to='/voice-record' onClick={(e) => recordState !== 0 && e.preventDefault()}>
            <div className={`${styles.btn} ${recordState !== 0 && styles.disabled}`}>녹음하기</div>
          </NavLink>
        </div>
        <div className={styles.MainState_record}>
          <div className={styles.icon}>
            <Lottie animationData={programming} style={{width: '350px', height: '350px'}} />
          </div>
          <NavLink to='/voice-studying' onClick={(e) => recordState !== 1 && e.preventDefault()}>
            <div className={`${styles.btn} ${recordState !== 1 && styles.disabled}`}>학습하기</div>
          </NavLink> 
        </div>
        <div className={styles.MainState_record}>
        <div className={styles.icon}>
        <Lottie animationData={finish} style={{width: '350px', height: '350px'}} />
          </div>
          <NavLink to='/voice-studying' onClick={(e) => recordState !== 2 && e.preventDefault()}>
            <div className={`${styles.btn} ${recordState !== 2 && styles.disabled}`}>학습완료</div>
          </NavLink> 
        </div>
      </div>
    </div>
  );
}

export default VoiceState;