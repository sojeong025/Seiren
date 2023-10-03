import styles from "./SellListPage.module.css";
import { useEffect } from 'react';
import SellListBox from "../../components/SellLists/SellListBox";
import SellChart from "../../components/ChartBox/SellChart";
import SideBar from "../../components/common/SideBar";

const SellList: React.FC<{ setIsNavBarVisible: (visible: boolean) => void }> = ({ setIsNavBarVisible }) => {

  useEffect(() => {
    setIsNavBarVisible(false);

    return()=>{
      setIsNavBarVisible(true)
    }
    
  }, [setIsNavBarVisible]);

  return (
    <div className={styles.sellCountContainer}>
      <SideBar/>
      <div className={styles.chart}>
        <SellChart />
        <SellListBox />
      </div>
    </div>
  );
}

export default SellList;
