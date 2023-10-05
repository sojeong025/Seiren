import { useEffect } from 'react';
import styles from "./BuyListPage.module.css";
import BuyListBox from "../../components/MyProfile/Buy/BuyListBox";
import SideBar from "../../components/common/SideBar";

const BuyList: React.FC<{ setIsNavBarVisible: (visible: boolean) => void }> = ({ setIsNavBarVisible }) => {

  useEffect(() => {
    setIsNavBarVisible(false);

    return()=>{
      setIsNavBarVisible(true)
    }
    
  }, [setIsNavBarVisible]);
  
  return (
    <div className={styles.buyCountContainer}>
      <SideBar />
      <div className={styles.countInfo}>
        <BuyListBox />
      </div>
    </div>
  );
}

export default BuyList;
