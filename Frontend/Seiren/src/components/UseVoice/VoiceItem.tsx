import styles from "./VoiceItem.module.css";
import { Link } from "react-router-dom";

function VoiceItem({ productImageUrl, productTitle, remainCount, totalCount, productCategories, productId }) {
  return (
    <div className={styles.voiceItem}>
      <div className={styles.left}>
        <img src={productImageUrl} alt="음식 이미지" className={styles.profileImage} />
      </div>
      <div className={styles.mid}>
        <div className={styles.title}>{productTitle}</div>
        <div className={styles.moodHashtag}>#{productCategories.join(" #")}</div>
        
      </div>
      <div className={styles.right}>
        <div className={styles.count}>
          <span>{remainCount}자</span> &nbsp;/ {totalCount}자
        </div>
        <Link to={`/voice-detail/${productId}`} key={productId} className={styles.usebtn}>
          사용
        </Link>
      </div>
    </div>
  );
}

export default VoiceItem;
