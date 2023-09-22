import styles from "./UseVoice.module.css";
import UseVoiceBox from "../../components/UseVoice/UseVoiceBox";
import SideBar from "../../components/common/SideBar";

function SellList() {
  return (
    <div className={styles.useVoiceContainer}>
      <SideBar />
      <UseVoiceBox />
    </div>
  );
}

export default SellList;
