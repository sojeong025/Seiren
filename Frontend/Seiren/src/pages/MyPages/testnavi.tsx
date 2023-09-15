import { NavLink } from "react-router-dom";
import styles from "./testnavi.module.css";

function MyPage() {
  return (
    <div className={styles.naviBox}>
      <NavLink to="/my-page">마이페이지</NavLink>
      <NavLink to="/buy-list">구매내역</NavLink>
      <NavLink to="/sell-list">판매내역</NavLink>
      <NavLink to="/use-voice">사용</NavLink>  
    </div>
  );
}

export default MyPage;
