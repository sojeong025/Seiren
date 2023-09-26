import { useEffect } from 'react';
import styles from "./MyPage.module.css";
import Likes from "../../components/MyProfile/Likes";
import YourVoice from "../../components/MyProfile/YourVoice";
import SideBar from "../../components/common/SideBar";

const MyPage: React.FC<{ setIsNavBarVisible: (visible: boolean) => void }> = ({ setIsNavBarVisible }) => {

  useEffect(() => {
    setIsNavBarVisible(false);

    return()=>{
      setIsNavBarVisible(true)
    }
    
  }, [setIsNavBarVisible]);


  return (
    <div className={styles.myPageContainer}>
      <SideBar />
      <div className={styles.myPageBox}>
        <div className={styles.likesContainer}>
          <Likes />
        </div>
        <div className={styles.yourVoiceContainer}>
          <YourVoice />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
