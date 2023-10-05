import { useEffect, useRef } from "react";
import styles from "./MainPage.module.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md"

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CanvasBackground from "../components/common/CanvasBackground";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function MainPage() {
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
        <div className={styles.main_txt} ref={titleRef}><span>Recording</span> and <span>Selling</span> <br/>voice all at once</div>
          <Link to='/about'>
            <div className={styles.go_about}>
              <div className={styles.down}><MdOutlineKeyboardArrowDown/></div>
              <div className={styles.go_about_txt}> ABOUT</div>  
            </div>
          </Link>
          <div className={styles.main_img}>
            <img className={styles.img1} src="https://api.dicebear.com/7.x/adventurer/svg?flip=true&eyebrows=variant06&eyes=variant04&hair=short03&mouth=variant25&skinColor=ecad80&hairColor=dba3be" alt="" />
            <img className={styles.img2} src="https://api.dicebear.com/7.x/adventurer/svg?features=blush&flip=false&eyebrows=variant03&eyes=variant23&hair=long13&mouth=variant24&skinColor=f2d3b1&hairColor=796a45" alt="" />
            <img className={styles.img3} src="https://api.dicebear.com/7.x/adventurer/svg?flip=false&eyebrows=variant06&eyes=variant12&hair=long11&mouth=variant15&skinColor=f2d3b1&hairColor=3eac2c" alt="" />

          </div>
        {/* <div className={styles.main_img}><img ref={imgRef} src="src/assets/img/about.png" alt="img" onLoad={handleImageLoad} /></div>    */}
        </div>
    </div>
  );
}

export default MainPage;