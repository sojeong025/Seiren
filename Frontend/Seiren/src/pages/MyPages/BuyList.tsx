import styles from "./BuyList.module.css";
import MyInfo from "../../components/MyProfile/MyInfo";
import BuyListBox from "../../components/BuyLists/BuyListBox";

function BuyList() {
  return (
    <div>
      <div className={styles.buyCountContainer}>
        <MyInfo />
        <div>여기는 구매 숫자</div>
      </div>
      <BuyListBox />
    </div>
  );
}

export default BuyList;
