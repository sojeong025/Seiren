import styles from "./MyPage.module.css";
import Likes from "../../components/MyProfile/Likes";
import YourVoice from "../../components/MyProfile/YourVoice";
import SideBar from "../../components/common/SideBar";

function MyPage() {
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
