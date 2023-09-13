import styles from "./SellList.module.css";
import SellListBox from "../../components/SellLists/SellListBox";
import SellChart from "../../components/ChartBox/SellChart";

function SellList() {
  return (
    <div>
      <SellChart />
      <SellListBox />
      <div className={styles.sellCountContainer}></div>
    </div>
  );
}

export default SellList;
