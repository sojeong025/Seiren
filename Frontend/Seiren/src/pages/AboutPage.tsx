import styles from "./AboutPage.module.css";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import YouTube from "react-youtube";

gsap.registerPlugin(ScrollTrigger);

function AboutPage() {
  const text1Ref = useRef<HTMLImageElement>(null);
  const mainRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLImageElement>(null);

  const opts = {
    height: '500',
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
          <div>
            <div>물결이 되어 퍼져나가는 목소리의 아름다움, 당신만의 목소리로 무대에 서세요. </div>
            <div>당신의 목소리를 다른 사용자와 공유해 보세요. </div>
            <div>Seiren의 다양한 목소리를 듣고</div>
            <div>여러가지 콘텐츠에 활용해 보세요.</div>
          </div>
        </div>

        <div className={styles.record}>
          <div>상상하는 모든 것, Seiren과 함께 대화해 보세요.</div>
          <div>목소리를 녹음하여 자신만의 AI Voice 모델을 만들 수 있습니다.</div>
          <div>목소리를 대표하는 아바타 및 카테고리를 선택할 수 있습니다.</div>
          <div>지금 바로 목소리를 등록해보세요!</div>
        </div>

        <div className={styles.my}>
          <div>Seiren과 함께 성장하는 AI 목소리의 여정</div>
          <div>통계를 통해 목소리의 인기 장르와 트렌드를 파악할 수 있습니다.</div>
          <div>나의 목소리가 어떤 분야 또는 장르에 적합한지 알아볼 수 있습니다.</div>
          <div>구매한 목소리를 사용하여 다양한 프로젝트에 적용할 수 있습니다.</div>
        </div>
      </section>

    </div>
  );
}

export default AboutPage;
