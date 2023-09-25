import { useState, useEffect } from "react";
import styles from "./MainPage.module.css";
// import videoSource from "../assets/pexels-rostislav-uzunov-10613972 (Original).mp4";
import { Link } from "react-router-dom";
import { customAxios } from '../libs/axios'
import { UserState } from "../recoil/UserAtom";
import { useRecoilState } from "recoil";


export default function MainPage() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [userInfo, setUserInfo] = useRecoilState(UserState);
  const accessToken = localStorage.getItem("accessToken");

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


  // 유저 정보 get 요청
  useEffect(() => {
    if(accessToken !== null){
      customAxios.get('user')
        .then(response => {
          let userData = response.data.response;
          
          let updatedUserData = {
            nickname: userData.nickname,
            profileImage: userData.profileImg,
          };
          setUserInfo(updatedUserData); // Recoil 상태 업데이트
          console.log(updatedUserData.nickname);
          console.log("recoil 저장 성공");
        })
    }
  }, [accessToken]);

  return (
    <div className={styles.mainPageContainer}>
      {/* <video className={styles.videoBackground} autoPlay loop muted>
        <source src={videoSource} type="video/mp4" />
      </video> */}
      <div className={styles.textContainer}>
        <div style={textStyle} className={styles.text}>
          <div className={styles.title}>
            <div className={styles.logoText}>SEIREN</div>
            AI VOICE
          </div>
          {/* <p className={styles.subtitle}>Experience Now!</p> */}
        </div>
      </div>
      <div className={styles.bottomTextContainer}>
        <div className={styles.bottomText}>
        <Link to="/voice-study" className={styles.voiceStudybtn}>
            <span>목소리 등록</span>
            <div className={styles.dot}></div>
          </Link>
          <Link to="/about" className={styles.toAbout}> About {'>>'} </Link>
        </div>
      </div>
      <div></div>
    </div>
  );
}
