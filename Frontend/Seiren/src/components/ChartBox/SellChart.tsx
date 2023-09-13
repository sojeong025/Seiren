import styles from "./SellChart.module.css";

function SellListBox() {
  return (
    <div>
      <h1>판매통계차트</h1>
      <div className={styles.sellChartContainer}>
        <div className={styles.sellChartBox}>여긴 판매통계차트가 들어갈거에요!! 대헷</div>
        <div className={styles.sellAndLikes}>여긴 판매숫자/찜숫자가 들어갈겁니다!</div>
      </div>
    </div>
  );
}

export default SellListBox;
