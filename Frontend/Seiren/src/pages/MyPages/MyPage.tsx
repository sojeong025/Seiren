import { useEffect, useState } from 'react';
import styles from "./MyPage.module.css";
import Likes from "../../components/MyProfile/Likes";
import YourVoice from "../../components/MyProfile/YourVoice";
import SideBar from "../../components/common/SideBar";
import { customAxios } from "../../libs/axios";



const MyPage: React.FC<{ setIsNavBarVisible: (visible: boolean) => void }> = ({ setIsNavBarVisible }) => {
  const [nickname, setNickname] = useState("");
  useEffect(() => {
    setIsNavBarVisible(false);

    return()=>{
      setIsNavBarVisible(true)
    }
    
  }, [setIsNavBarVisible]);

  useEffect(() => {
    customAxios.get("user")
      .then(response => {
        setNickname(response.data.response.nickname)
      })
  }, []);

  return (
    <div className={styles.myPageContainer}>
      <SideBar />
      <div className={styles.myPageBox}>
        <div className={styles.section1}>
          <div className={styles.hi}>
            <div className={styles.hi_1}>안녕하세요,</div>
            <div className={styles.hi_2}>{nickname}님!</div>
            <div className={styles.hi_3}>
              {nickname}님의 SEIREN 보이스 스튜디오 <br/>
              사용현황을 한 눈에 알려드릴게요
            </div>

          </div>
          <div className={styles.hi}>
            안녕하십니까 왜 글자가 안보이지요
            안녕하십니까 왜 글자가 안보이지요

            안녕하십니까 왜 글자가 안보이지요

            안녕하십니까 왜 글자가 안보이지요
          </div>
        </div>
        <div className={styles.yourVoiceContainer}>
          <YourVoice />
        </div>
        <div className={styles.likesContainer}>
          <Likes />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
