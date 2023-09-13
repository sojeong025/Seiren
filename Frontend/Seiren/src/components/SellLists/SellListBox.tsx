import React from "react";
import styles from "./SellListBox.module.css";

function SellListBox() {
  const likedItems = ["노래 제목 1", "노래 제목 2", "노래 제목 3"];

  return (
    <div className={styles.sellListBoxContainer}>
      <h1 className={styles.sellListBoxTitle}>MY Voice</h1>
      <div className={styles.sellList}>
        {likedItems.map((item, index) => (
          <div key={index} className={styles.sellListItem}>
            <img src="프로필 이미지 경로" alt="프로필 이미지" />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SellListBox;
