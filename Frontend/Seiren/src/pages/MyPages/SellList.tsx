import styles from "./SellList.module.css";
import SellListBox from "../../components/SellLists/SellListBox";
import SellChart from "../../components/ChartBox/SellChart";

function SellList() {
  return (
      <div className={styles.sellCountContainer}>
        <SellChart />
        <SellListBox />
      </div>
  );
}

export default SellList;
