import React, { useState, useEffect } from 'react';
import styles from './MainPage.module.css';
import danceduck from '../assets/duckdance.gif';
import videoSource from '../assets/night_-_28860 (1080p).mp4';

export default function MainPage() {
  const [textStyle, setTextStyle] = useState({
    transform: 'perspective(4000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
  });

  const handleMouseMove = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // 여기에서 원하는 움직임을 계산하세요.
    // 예를 들어, 마우스 위치에 따라 텍스트를 움직이거나 변형합니다.
    const transformValue = `perspective(4000px) rotateX(${mouseY}deg) rotateY(${mouseX}deg) scale3d(1, 1, 1)`;
    
    setTextStyle({ transform: transformValue });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.mainPageContainer}>
      <video className={styles.videoBackground} autoPlay loop muted>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={textStyle}>
        <div className={`w-[100vw] h-[100vh] relative`}>
          <div className={`absolute left-[10vw] top-[5vw]`}>
            <p className={`landing-text-shadow text-[calc(35px+1vw)] font-montserrat font-bold`}>
              Voice of Web 3.0
            </p>
          </div>
          <div className={`absolute bottom-[2vw] right-[calc(3vw+1vh)]`}>
            <p className={`text-center landing-text-shadow text-[calc(4px+1.4vw)] font-montserrat font-semi-bold`}>
              Full freedom to sound like <br /> anyone in the metaverse
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
