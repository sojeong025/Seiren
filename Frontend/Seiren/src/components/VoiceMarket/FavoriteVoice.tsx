import styles from "./FavoriteVoice.module.css";
import Lottie from "lottie-react";


function FavoriteVoice() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.text}>
          당신의 <span>취향에 맞는</span> <br />
          목소리를 <span>선택</span>해보세요
        </div>  
        <div className={styles.english}>
          Select Your Voice
        </div>
        <div className={styles.english2}>
          Creative & Unique
        </div>
      </div>
    </div>
  );
}

export default FavoriteVoice;
