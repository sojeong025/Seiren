import styles from "./AboutPage.module.css";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import YouTube from "react-youtube";

gsap.registerPlugin(ScrollTrigger);

function AboutPage() {
  const [sideTab, setSideTab] = useState("Store");
  const handleTabClick = tabName => {
    setSideTab(tabName);
  };

  const videoContainerRef = useRef(null);
  const textRef = useRef(null);
  useEffect(() => {
    // 비디오 컨테이너 확대 애니메이션 설정
    const videoTimeline = gsap.timeline();
    videoTimeline.fromTo(videoContainerRef.current, { scaleX: 1, scaleY: 1 }, { scaleX: 1.8, scaleY: 1.8 });

    // 비디오 컨테이너 확대 애니메이션 설정
    ScrollTrigger.create({
      id: "videoTimeLine",
      animation: videoTimeline,
      trigger: "#section2",
      start: "top top",
      end: "+=1000",
      scrub: true,
      pin: true,
      markers: true,
    });

    // 텍스트 확대
    const textani = gsap.timeline();
    textani.from(textRef.current, { scale: 2, x: 200, duration: 1 });

    ScrollTrigger.create({
      id: "textani",
      animation: textani,
      trigger: "#section2",
      start: "top top",
      end: "+=1000",
      scrub: true,
      pin: true,
      markers: true,
    });
    return () => {
      ScrollTrigger.getById("videoTimeLine").kill(true);
      ScrollTrigger.getById("textani").kill(true);
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* section1: 프로그램 소개 */}
      <section id="section1" className={styles.section1}>
        <div className={styles.section1_left}></div>
        <div className={styles.section1_right}>
          <div className={styles.section_right_txt}> Serien 목소리 학습 및 거래 플랫폼</div>
          <hr />
          <div className={styles.section_right_context}>
            <div>
              당신의 목소리가 Seiren을 만날 때,
              <br />
              창의성과 가능성이 무한대로 확장됩니다. <br />
              당신의 목소리로 다양한 콘텐츠를 창조하고, <br />
              세계와 공유해 보세요!
            </div>
            <div>
              옹알이가 완전한 문장이 되기까지, <br />
              Seiren도 학습을 거듭하며 목소리를 재현합니다. <br />
              자연스러움마저 배우는 Seiren이 목소리의 무한한 가능성을 열어 나가겠습니다.
            </div>
          </div>
        </div>
      </section>

      {/* section2: 전체적 소개 영상 */}
      <section id="section2" className={styles.section2}>
        <div ref={textRef} className={styles.section2_txt}>
          SHOW SHOW{" "}
        </div>
        {/* <div className={styles.section2_txt}>SHOW SHOW </div> */}
        <div ref={videoContainerRef} className={styles.section2_video}>
          <YouTube videoId="K6fHSb87aAM" />
        </div>
      </section>

      {/* section3: 사이드 탭에 따라 설명 */}
      <section id="section3" className={styles.section3}>
        <div className={styles.left}>
          <div className={styles.menu} onClick={() => handleTabClick("Store")}>
            Voice Store
          </div>
          <div className={styles.menu} onClick={() => handleTabClick("Record")}>
            Voice Record
          </div>
          <div className={styles.menu} onClick={() => handleTabClick("Mypage")}>
            MyPage
          </div>
        </div>

        <hr />

        <div className={styles.right}>
          {sideTab === "Store" && (
            // Store 설명
            <div>
              <div>
                <div>물결이 되어 퍼져나가는 목소리의 아름다움, 당신만의 목소리로 무대에 서세요. </div>

                <div>당신의 목소리를 다른 사용자와 공유해 보세요. </div>

                <div>Seiren의 다양한 목소리를 듣고</div>

                <div>여러가지 콘텐츠에 활용해 보세요.</div>
              </div>
            </div>
          )}
          {sideTab === "Record" && (
            // Record 설명
            <div>
              <div>상상하는 모든 것, Seiren과 함께 대화해 보세요.</div>

              <div>목소리를 녹음하여 자신만의 AI Voice 모델을 만들 수 있습니다.</div>

              <div>목소리를 대표하는 아바타 및 카테고리를 선택할 수 있습니다.</div>

              <div>지금 바로 목소리를 등록해보세요!</div>
            </div>
          )}
          {sideTab === "Mypage" && (
            // Mypage 설명
            <div>
              <div>Seiren과 함께 성장하는 AI 목소리의 여정</div>

              <div>통계를 통해 목소리의 인기 장르와 트렌드를 파악할 수 있습니다.</div>

              <div>나의 목소리가 어떤 분야 또는 장르에 적합한지 알아볼 수 있습니다.</div>

              <div>구매한 목소리를 사용하여 다양한 프로젝트에 적용할 수 있습니다.</div>
            </div>
          )}{" "}
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
