import React, { useState, useEffect } from "react";
import styles from "./MainPage.module.css";
import videoSource from "../assets/pexels-rostislav-uzunov-10613972 (Original).mp4";
import { Link } from "react-router-dom";

export default function MainPage() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = e => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const maxAngle = 30;
    const angleX = (mouseY / window.innerHeight) * 2 * maxAngle - maxAngle;
    const angleY = (mouseX / window.innerWidth) * 2 * maxAngle - maxAngle;

    setRotateX(angleX);
    setRotateY(angleY);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const textStyle = {
    transform: `perspective(4000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`,
  };

  return (
    <div className={styles.mainPageContainer}>
      <video className={styles.videoBackground} autoPlay loop muted>
        <source src={videoSource} type="video/mp4" />
      </video>
      <div className={styles.textContainer}>
        <div style={textStyle} className={styles.text}>
          <p className={styles.title}>
            <p className={styles.logoText}>SEIREN</p>
            AI VOICE
          </p>
          {/* <p className={styles.subtitle}>Experience Now!</p> */}
        </div>
      </div>
      <div className={styles.bottomTextContainer}>
        <div className={styles.bottomText}>
        <Link to="/voice-study" className={styles.voiceStudybtn}>
            <span>목소리 등록</span>
            <div className={styles.dot}></div>
          </Link>
          <Link to="/about" className={styles.toAbout}> About >> </Link>
        </div>
      </div>
    </div>
  );
}
