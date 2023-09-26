
import styles from "./BuyCount.module.css";

import { useRecoilState } from "recoil";
import { buyCountState } from "../../recoil/UserAtom";

function BuyCount() {
  const [buyCount] = useRecoilState(buyCountState);
  
  return (
    <div className={styles.buyCountBox}>
      <div className={styles.itemCount}>
        <p className={styles.textText}>BUY</p>
        <p className={styles.countText}>{buyCount}</p>
      </div>
    </div>
  );
}

export default BuyCount;
