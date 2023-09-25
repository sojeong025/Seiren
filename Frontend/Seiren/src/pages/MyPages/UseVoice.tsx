import styles from "./UseVoice.module.css";
import { useEffect } from "react";
import UseVoiceBox from "../../components/UseVoice/UseVoiceBox";
import SideBar from "../../components/common/SideBar";

const SellList: React.FC<{ setIsNavBarVisible: (visible: boolean) => void }> = ({ setIsNavBarVisible }) => {

  useEffect(() => {
    setIsNavBarVisible(false);

    return()=>{
      setIsNavBarVisible(true)
    }
    
  }, [setIsNavBarVisible]);

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
