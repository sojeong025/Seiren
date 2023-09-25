import React from "react";
import styles from "./VoiceItem.module.css";

function VoiceItem({ productImageUrl, productTitle, remainCount, totalCount, productCategories }) {
  return (
    <div className={styles.voiceItem}>
      <div className={styles.imageContainer}>
        <img src={productImageUrl} alt="음식 이미지" className={styles.profileImage} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{productTitle}</div>
        <div className={styles.moodHashtag}>
          #{productCategories.join(", #")}
        </div>
        <div className={styles.count}>
          <span>{remainCount} / {totalCount}</span>
        </div>
      </div>
      <button className={styles.playButton}>재생</button>
    </div>
  );
}

export default VoiceItem;
