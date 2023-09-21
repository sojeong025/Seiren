import styles from './AboutPage.module.css';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import YouTube from 'react-youtube';

gsap.registerPlugin(ScrollTrigger);

function AboutPage() {
  const imgRef = useRef<HTMLImageElement>(null);
  const handleImageLoad = () => {
    gsap.to(imgRef.current, {
      rotation: "-=20",
      yoyo: true,
      repeat: -1,
      duration: 2,
      ease: "power1.inOut"
    });
  };

  useEffect(() => {
      let section1 = document.querySelector(`.${styles.section1}`);
      let section2 = document.querySelector(`.${styles.section2}`);
      let section3 = document.querySelector(`.${styles.section3}`);
      let videoContainer = document.querySelector(`.${styles.section2_video}`);
  
      gsap.set([section1, section2, section3], { height: "100vh" });

      // 비디오 컨테이너 확대 애니메이션 설정
      const videoTimeline = gsap.timeline();
      videoTimeline.fromTo(videoContainer,{scaleX:"100%", scaleY:"100%"},{scaleX:"230%", scaleY:"210%"});
  
      // 비디오 컨테이너 확대 애니메이션 설정
      ScrollTrigger.create({
        animation: videoTimeline,
        trigger:section2,
        start:"top top", 
        end:"+=2000", 
        scrub:true,
        pin: true,
      })

  }, []);

  return (
    <div className={styles.container}>
      {/* section1: main */}
      <section className={styles.section1}>
        <div className={styles.main}>
          <div className={styles.main_txt}>From <span>Recording</span> your voice to <span>Selling</span> yours <br/> all at once</div>
          <div className={styles.main_img}><img ref={imgRef} src="src/assets/img/about.png" alt="img" onLoad={handleImageLoad} /></div>   
        </div>
        <div>
          <hr />   
        </div>
      </section>

      {/* section2: 전체적 소개 영상 */}
      <section className={styles.section2}>
        <div className={`${styles.section2_txt} ${styles.animatedText}`}>SHOW SHOW SHOW SHOW SHOW SHOW SHOW SHOW SHOW SHOW SHOW SHOW</div>
        <div className={`${styles.section2_txt} ${styles.animatedText2}`}>SHOW SHOW SHOW SHOW SHOW SHOW SHOW SHOW SHOW SHOW SHOW SHOW</div>
        <div className={styles.section2_video}><YouTube videoId="K6fHSb87aAM" /></div>
      </section>

      {/* section3: 사이드 탭에 따라 설명 */}
      <section className={styles.section3}>
        <div>그냥 설명</div>
      </section>
    </div>
  );
}

export default AboutPage;