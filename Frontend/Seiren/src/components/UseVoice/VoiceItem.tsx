import styles from "./VoiceItem.module.css";

function VoiceItem({ productImageUrl, productTitle, remainCount, totalCount, productCategories }) {
  return (
    <div className={styles.voiceItem}>
      <img src={productImageUrl} alt="음식 이미지" className={styles.profileImage} />
      <div className={styles.content}>
        <div className={styles.title}>{productTitle}</div>
        <div className={styles.moodHashtag}>#{productCategories.join(", #")}</div>
        <div className={styles.under}>
          <div className={styles.count}>
            <span>
              {remainCount} / {totalCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceItem;
