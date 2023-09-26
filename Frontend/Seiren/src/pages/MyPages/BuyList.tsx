import { useEffect } from 'react';
import styles from "./BuyList.module.css";
import BuyListBox from "../../components/BuyLists/BuyListBox";
import BuyCount from "../../components/BuyLists/BuyCount";
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
        <BuyCount />
        <BuyListBox />
      </div>
    </div>
  );
}

export default BuyList;
