import React from "react";
import styles from "./SellListBox.module.css";
import { Link } from "react-router-dom"; // React Router의 Link 컴포넌트 추가

function SellListBox() {
  const likedItems = ["노래 제목 1", "노래 제목 2", "노래 제목 3"];

  return (
    <div className={styles.sellListBoxContainer}>
      <h1 className={styles.sellListBoxTitle}>MY Voice</h1>
      <div className={styles.sellList}>
        {likedItems.map((item, index) => (
          <Link to={`/detail/${index}`} key={index} className={styles.sellListItem}>
            <img src="프로필 이미지 경로" alt="프로필 이미지" />
            <p>{item}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SellListBox;
