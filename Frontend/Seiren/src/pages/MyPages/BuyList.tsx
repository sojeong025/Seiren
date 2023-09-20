import styles from "./BuyList.module.css";
import MyInfo from "../../components/MyProfile/MyInfo";
import BuyListBox from "../../components/BuyLists/BuyListBox";
import BuyCount from "../../components/BuyLists/BuyCount";

function BuyList() {
  return (
    <div>
      <div className={styles.buyCountContainer}>
        <div className={styles.countInfo}>
          <MyInfo />
          <BuyCount />
        </div>
        <BuyListBox />
      </div>
    </div>
  );
}

export default BuyList;
