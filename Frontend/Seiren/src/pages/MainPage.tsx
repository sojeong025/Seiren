import styles from './MainPage.module.css'
import danceduck from "../assets/duckdance.gif";
import videoSource from "../assets/dance_-_95064 (1080p).mp4"; // 영상 파일 경로를 추가하세요.

export default function MainPage() {
  return (
    <div>
      {/* <h1>main</h1> */}
      <video className={styles.video} autoPlay loop muted>
        <source src={videoSource} type="video/mp4" />
      </video>
      <img src={danceduck} className={styles.duck} alt="" />
    </div>
  );
}
