import styles from "./UseVoice.module.css";
import UseVoiceBox from "../../components/UseVoice/UseVoiceBox";
import SideBar from "../../components/common/SideBar";

function SellList() {
  return (
    <div className={styles.useVoiceContainer}>
      <SideBar />
      <div className={styles.useVoiceBox}>
        <UseVoiceBox />
      </div>
    </div>
  );
}

export default SellList;
