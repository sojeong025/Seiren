import React from "react";
import styles from "./Loading.module.css"; // 스타일을 위한 CSS 파일을 import

function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <div className={styles.loadingText}>로딩 중...</div>
    </div>
  );
}

export default Loading;
