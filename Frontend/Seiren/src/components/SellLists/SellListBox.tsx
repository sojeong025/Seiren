import React from "react";
import styles from "./SellListBox.module.css";
import { Link } from "react-router-dom"; // React Router의 Link 컴포넌트 추가

function getRandomColor() {
  // 랜덤한 16진수 색상을 생성하는 함수
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function SellListBox() {
  const buyItems = ["노래 제목 1", "노래 제목 2", "노래 제목 3"];

  return (
    <div className={styles.sellListBoxContainer}>
      <h1 className={styles.sellListBoxTitle}>MY Voice</h1>
      <div className={styles.sellList}>
        {buyItems.map((item, index) => (
          <Link
            to={`/detail/${index}`}
            key={index}
            className={styles.sellListItem}
            style={{ backgroundColor: getRandomColor() }} // 랜덤 배경색 적용
          >
            <img src="프로필 이미지 경로" alt="프로필 이미지" />
            <p>{item}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SellListBox;
