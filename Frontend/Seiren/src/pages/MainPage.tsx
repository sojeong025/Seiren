import { useState, useEffect, useRef } from "react";
import styles from "./MainPage.module.css";
import { Link as ScrollLink } from "react-scroll"
import AboutPage from "./AboutPage";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function MainPage() {
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

    gsap.set([section1], { height: "100vh" });
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.section1}>
        <div className={styles.main}>
        <div className={styles.main_txt}>From <span>Recording</span> your voice to <span>Selling</span> yours <br/> all at once</div>
          <ScrollLink to='about' smooth={true} duration={500}>
            <div className={styles.go_about}>
              <div className={styles.go_about_txt}> about</div>  
            </div>
          </ScrollLink>
        <div className={styles.main_img}><img ref={imgRef} src="src/assets/img/about.png" alt="img" onLoad={handleImageLoad} /></div>   
        </div>
        <hr className={styles.hr} />
      </section>

      <div id="about">
        <AboutPage />
      </div>
    </div>
  );
}

export default MainPage;