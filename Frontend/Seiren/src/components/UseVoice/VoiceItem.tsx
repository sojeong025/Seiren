import styles from "./VoiceItem.module.css";

function VoiceItem({ profileImage, title, moodHashtag, author }) {
  return (
    <div className={styles.voiceItem}>
      <div className={styles.imageContainer}>
        <img src={profileImage} alt="프로필 사진" className={styles.profileImage} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.moodHashtag}>{moodHashtag}</div>
        <div className={styles.authorDate}>
          <span className={styles.author}>작성자: {author}</span>
        </div>
      </div>
      <button className={styles.playButton}>재생</button>
    </div>
  );
}

export default VoiceItem;