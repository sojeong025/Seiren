import styles from "./MyPage.module.css";
import Likes from "../../components/MyProfile/Likes";
import YourVoice from "../../components/MyProfile/YourVoice";
import SideBar from "../../components/common/SideBar";

function MyPage({ isNavBarVisible }) {
  return (
    <div className={styles.myPageContainer}>
      <SideBar />
      <div className={styles.myPageBox}>
        <Likes />
        <YourVoice />
      </div>
    </div>
  );
}

export default MyPage;
