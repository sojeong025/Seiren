import { useEffect, useRef } from "react";
import styles from "./MainPage.module.css";
import { Link as ScrollLink } from "react-scroll"
import AboutPage from "./AboutPage";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CanvasBackground from "../components/common/CanvasBackground";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function MainPage() {
  useEffect(() => {

  }, )
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

  const titleRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    gsap.from(titleRef.current, {
      duration: 1,
      y: 50,
      ease: "power1.out",
    });
  }, []);

  return (
    <div className={styles.container}>
        <div className={styles.main}>
      <CanvasBackground/>
        <div className={styles.main_txt} ref={titleRef}><span>Recording</span> your voice <br/><span>Selling</span> yours <br/>all at once</div>
          <Link to='/about'>
            <div className={styles.go_about}>
              <div className={styles.go_about_txt}> ABOUT</div>  
            </div>
          </Link>
          <div className={styles.main_img}>
            <img ref={imgRef} src="https://api.dicebear.com/7.x/adventurer/svg?flip=false&eyebrows=variant01&eyes=variant02&hair=long09&mouth=variant25&skinColor=9e5622&hairColor=e5d7a3" alt="" />

          </div>
        {/* <div className={styles.main_img}><img ref={imgRef} src="src/assets/img/about.png" alt="img" onLoad={handleImageLoad} /></div>    */}
        </div>
    </div>
  );
}

export default MainPage;