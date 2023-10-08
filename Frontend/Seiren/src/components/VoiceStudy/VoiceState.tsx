import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { RecordState } from "../../recoil/RecordAtom";
import { BsFillMicFill, BsRobot, BsCheckCircleFill } from "react-icons/bs";
import styles from "./VoiceState.module.css";

function VoiceState() {
  const recordState = useRecoilValue(RecordState);
  // console.log(recordState);

  return (
    <div>
      <div className={styles.Maintext}>당신의 목소리를 등록하세요</div>
      <div className={styles.MainState}>
        <div className={styles.MainState_record}>
          <div className={styles.smallCircle}></div>

          <div className={`${styles.icon} ${recordState !== 0 && styles.disabled}`}>
            <BsFillMicFill />
          </div>
          <div className={`${styles.title} ${recordState !== 0 && styles.disabled}`}>보이스 녹음</div>
          <div className={`${styles.subtitle} ${recordState !== 0 && styles.disabled}`}>최소 100문장을 녹음하세요</div>
          <NavLink to="/voice-record" onClick={e => recordState !== 0 && e.preventDefault()}>
            <div className={`${styles.btn} ${recordState !== 0 && styles.disabled}`}>녹음하러 가기</div>
          </NavLink>
        </div>

        <div className={styles.MainState_record}>
          <div className={styles.smallCircle}></div>
          <div className={`${styles.icon} ${recordState !== 1 && styles.disabled}`}>
            <BsRobot />
          </div>
          <div className={`${styles.title} ${recordState !== 1 && styles.disabled}`}>보이스 학습</div>
          <div className={`${styles.subtitle} ${recordState !== 0 && styles.disabled}`}>
            학습은 최대 1시간 정도 소요됩니다.
          </div>

          <NavLink to="/voice-studying" onClick={e => recordState !== 1 && e.preventDefault()}>
            <div className={`${styles.btn} ${recordState !== 1 && styles.disabled}`}>학습하기</div>
          </NavLink>
        </div>

        <div className={styles.MainState_record}>
          <div className={styles.smallCircle}></div>
          <div className={`${styles.icon} ${recordState !== 2 && styles.disabled}`}>
            <BsCheckCircleFill />
          </div>
          <div className={`${styles.title} ${recordState !== 2 && styles.disabled}`}>보이스 학습 완료</div>
          <div className={`${styles.subtitle} ${recordState !== 0 && styles.disabled}`}>
            학습 후 등록 및 설정을 해주세요
          </div>

          <NavLink to="/voice-finish" onClick={e => recordState !== 2 && e.preventDefault()}>
            <div className={`${styles.btn} ${recordState !== 2 && styles.disabled}`}>학습완료</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default VoiceState;
