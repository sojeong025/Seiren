import React from 'react';
import styles from "./VoiceStudyHeader.module.css"

const VoiceStudyHeader: React.FC = () => {
  return (
    <div className={styles.header}>
      <div>목소리 녹음</div>
      <button className={styles.button_study}>목소리 학습</button>
    </div>
  );
};

export default VoiceStudyHeader;