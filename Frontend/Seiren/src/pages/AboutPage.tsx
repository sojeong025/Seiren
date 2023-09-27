import styles from './AboutPage.module.css';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import YouTube from 'react-youtube';

gsap.registerPlugin(ScrollTrigger);

function AboutPage() {

  const [sideTab, setSideTab] = useState('Store');
  const handleTabClick = (tabName) => {
    setSideTab(tabName);
  };

  useEffect(() => {
      const section1 = document.querySelector(`.${styles.section1}`);
      const section2 = document.querySelector(`.${styles.section2}`);
      const section3 = document.querySelector(`.${styles.section3}`);
      const videoContainer = document.querySelector(`.${styles.section2_video}`);
      const text = document.querySelector(`.${styles.section2_txt}`)
  
      gsap.set([section1, section3], { height: "100vh" });
      gsap.set([section2], { height: "100vh" });

      // 비디오 컨테이너 확대 애니메이션 설정
      const videoTimeline = gsap.timeline();
      videoTimeline.fromTo(videoContainer,{scaleX:"100%", scaleY:"100%"},{scaleX:"180%", scaleY:"180%"});
  
      // 비디오 컨테이너 확대 애니메이션 설정
      ScrollTrigger.create({
        animation: videoTimeline,
        trigger:"#section2",
        start:"top top", 
        end:"+=800", 
        scrub:true,
        pin: true,
        markers: true,
      })

      // 텍스트 확대
      const textani = gsap.timeline();
      textani.to(text, {scale: 2, x:200, duration:1})

      ScrollTrigger.create({
        animation: textani,
        trigger: "#section2",
        start: "top top",
        end: "+=800",
        scrub: true,
        pin: true,
        markers: true,
      })
  }, []);

  return (
    <div className={styles.container}>
      {/* section1: 프로그램 소개 */}
      <section className={styles.section1}>
        <div className={styles.section1_left}>

        </div>

        <div className={styles.section1_right}>
          <div className={styles.section_right_txt}> Serien 목소리 학습 및 거래 플랫폼</div>
          <hr />
          <div className={styles.section_right_context}>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              LoremIpsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled 
              it to make a type specimen book.
            </div>
            <div>
              It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
              and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. 
            </div>
          </div>

        </div>
      </section>

      {/* section2: 전체적 소개 영상 */}
      <section id="section2" className={styles.section2}>
        <div className={styles.section2_txt}>SHOW SHOW </div>
        {/* <div className={styles.section2_txt}>SHOW SHOW </div> */}
        <div className={styles.section2_video}><YouTube videoId="K6fHSb87aAM" /></div>
      </section>

      {/* section3: 사이드 탭에 따라 설명 */}
      <section id="section3" className={styles.section3}>
        <div className={styles.left} >
          <div className={styles.menu} onClick={() => handleTabClick('Store')}>Voice Store</div>
          <div className={styles.menu} onClick={() => handleTabClick('Record')}>Voice Record</div>
          <div className={styles.menu} onClick={() => handleTabClick('Mypage')}>MyPage</div>
        </div>

        <hr />

        <div className={styles.right} >
          {sideTab === 'Store' && (
            // Store 설명
            <div>
              <div>Store : Lorem ipsum dolor sit amet...</div>
              <div>Store : Lorem ipsum dolor sit amet...</div>
              <div>Store : Lorem ipsum dolor sit amet...</div>
              <div>Store : Lorem ipsum dolor sit amet...</div>
            </div>
          )}
          
          {sideTab === 'Record' && (
            // Record 설명
            <div>Record : Lorem ipsum dolor sit amet...</div>
          )}

          {sideTab === 'Mypage' && (
            // Mypage 설명
            <div>My page: Lorem ipsum dolor sit amet...</div>
          )}
        </div>
      </section>
    </div>
  );
}

export default AboutPage;