import styles from "./MyPage.module.css";
import MyInfo from "../../components/MyProfile/MyInfo";
import Likes from "../../components/MyProfile/Likes";
import YourVoice from "../../components/MyProfile/YourVoice";
import Testnavi from "./testnavi";

function MyPage() {
  return (
    <div className={styles.mainPageContainer}>
      <Testnavi />
      <MyInfo />
      <Likes />
      <YourVoice />
    </div>
  );
}

export default MyPage;
