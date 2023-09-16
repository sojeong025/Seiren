import React from 'react';
import styles from './MainPage.module.css';
import danceduck from '../assets/duckdance.gif';
import videoSource from '../assets/night_-_28860 (1080p).mp4';

export default function MainPage() {
  return (
    <div className={styles.mainPageContainer}>
      <video className={styles.videoBackground} autoPlay loop muted>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
