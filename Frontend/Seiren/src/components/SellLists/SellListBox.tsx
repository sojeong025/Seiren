import React from "react";
import styles from "./SellListBox.module.css";
import Slider from "react-slick";

// Slick 슬라이더의 스타일을 불러옵니다.
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SellListBox() {
  const likedItems = ["노래 제목 1", "노래 제목 2", "노래 제목 3"];

  // Slick 슬라이더 설정
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // 한 번에 보여줄 아이템 수
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // 자동 재생 속도 (2초)
  };

  return (
    <div className={styles.sellListBoxContainer}>
      <h1 className={styles.sellListBoxTitle}>MY Voice</h1>
      <div className={styles.sellList}>
        <Slider {...settings}>
          {likedItems.map((item, index) => (
            <div key={index} className={styles.sellListItem}>
              <img src="프로필 이미지 경로" alt="프로필 이미지" />
              <p>{item}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SellListBox;
