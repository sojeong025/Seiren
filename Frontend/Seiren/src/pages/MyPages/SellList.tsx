import styles from "./SellList.module.css";
import SellListBox from "../../components/SellLists/SellListBox";
import SellChart from "../../components/ChartBox/SellChart";
import SideBar from "../../components/common/SideBar";

function SellList() {
  return (
    <div className={styles.sellCountContainer}>
      <SideBar />
      <div className={styles.chart}>
        <SellChart />
        <SellListBox />
      </div>
    </div>
  );
}

export default SellList;
