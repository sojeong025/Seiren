import React from "react";
import styles from "./UseVoiceBox.module.css";

function VoiceItem({ profileImage, title, moodHashtag }) {
  return (
    <div className={styles.voiceItem}>
      <img src={profileImage} alt="프로필 사진" className={styles.profileImage} />
      <div className={styles.title}>{title}</div>
      <div className={styles.moodHashtag}>{moodHashtag}</div>
      <button className={styles.playButton}>재생</button>
    </div>
  );
}

export default VoiceItem;
