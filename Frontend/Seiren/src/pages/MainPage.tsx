import styles from './MainPage.module.css'
import danceduck from "../assets/duckdance.gif";

export default function MainPage() {
  return (
    <div>
      <h1>main</h1>
      <img src={danceduck} className={styles.img} alt="" />
    </div>
  );
}
