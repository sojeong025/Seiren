import styles from "./AboutPage.module.css";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import store from "../assets/AboutAssets/about_store.png";
import mypage from "../assets/AboutAssets/about_mypage.png";
import record from "../assets/AboutAssets/about_record.png";
import YouTube from "react-youtube";
import { NavLink } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function AboutPage() {
  const text1Ref = useRef<HTMLImageElement>(null);
  const mainRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLImageElement>(null);

  const opts = {
    height: '600',
    width: '900',
  }

  useEffect(() => {
    gsap.from(text1Ref.current, {
      duration: 1,
      y: 80,
      ease: "power1.out",
    });
    gsap.from(mainRef.current, {
      duration: 1,
      x:-80,
      ease: "power1.out",
    })

    const textani = gsap.timeline();
    textani.to(textRef.current, { scale: 2, x: -200, duration: 1 });
    // textani.to(videoRef.current, { scale:2 ,duration:1 });

    ScrollTrigger.create({
      id: "textani",
      animation: textani,
      trigger: "#section2",
      start: "top top",
      end: "+=2000",
      scrub: true,
      pin: true,
    });

    
    return() => {
      textani.kill();
    }
  }, []);

  

  return (
    <div className={styles.container}>
      {/* section1: 프로그램 소개 */}
      <section id="section1" className={styles.section1}>
        <div className={styles.section1_left}></div>
        <div className={styles.section1_right}>
          <div className={styles.section_right_txt} ref={text1Ref}> Serien 목소리 학습 및 거래 플랫폼</div>
          <hr />
          <div className={styles.section_right_context} ref={mainRef} >
            <div>
              당신의 목소리가 Seiren을 만날 때,
              <br />
              창의성과 가능성이 무한대로 확장됩니다. <br />
              <span>당신의 목소리로 다양한 콘텐츠를 창조</span>하고, <br />
              세계와 공유해 보세요!
            </div>
            <div>
              옹알이가 완전한 문장이 되기까지, <br />
              Seiren도 학습을 거듭하며 <span>목소리를 재현</span>합니다. <br />
              자연스러움마저 배우는 Seiren이 목소리의 무한한 가능성을 열어 나가겠습니다.
            </div>
          </div>
        </div>
      </section>

      <section id="section2" className={styles.section2}>
        <div className={styles.section2_txt}  ref={textRef}>
          SHOW SHOW
        </div>
        <div className={styles.section2_video} ref={videoRef}>
          <YouTube videoId="9EbEfCqpu8U" opts={opts}/>
        </div>
      </section>

      <section id="section3" className={styles.section3}>
        <div className={styles.section3_title}>
          Seiren 어떻게 활용하나요?<br/>
          <span>한 번에 목소리를 거래하고 등록할 수 있는 페이지</span>
        </div>

      </section>
      <section className={styles.section4}>
        <div className={styles.store}>
          <div className={styles.smallTitle}>당신의 목소리를 거래하세요</div>
          <div className={styles.smallSummary}>
            구매자가 직접 입력한 문장을 실시간 음성으로 변환하여
            구매하려는 목소리에 대해 더 확실히 알아볼 수 있으며, 
            그에 따라 보다 만족도 높은 구매 결정을 내릴 수 있게 됩니다
          </div>
          {/* <div>Seiren의 다양한 목소리를 듣고</div>
          <div>여러가지 콘텐츠에 활용해 보세요.</div> */}
          <NavLink to="/voice-market">
            <div className={styles.btn}>스토어 가기</div>
          </NavLink>
        </div>

        <div className={styles.record}>
          <div className={styles.smallTitle}>제공된 스크립트를 녹음해 보세요</div>
          <div className={styles.smallSummary}>
            사용자가 가장 자연스럽고 섬세한 음성을 경험할 수 있도록, 
            녹음된 목소리를 학습하고 있습니다. 최소 100개의 녹음된 목소리를 통해
            자연스러우면서도 섬세한 TTS 출력이 가능합니다

          </div>
          <NavLink to="/voice-study">
            <div className={styles.btn}>녹음하러 가기</div>
          </NavLink>
        </div>

        <div className={styles.my}>
          <div className={styles.smallTitle}>데이터를 한 번에 확인해보세요</div>
          <div className={styles.smallSummary}>
            프로필, 판매 내역, 구매 내역, 사용의 개별 탭에 따라 목소리 관리, 통계 차트, 
            전체 구매 및 구매한 보이스 사용을 통해 실시간 데이터 확인 및 관리 할 수 있습니다

          </div>
          <NavLink to="/my-page">
            <div className={styles.btn}>마이페이지 가기</div>
          </NavLink>

        </div>
      </section>

    </div>
  );
}

export default AboutPage;
