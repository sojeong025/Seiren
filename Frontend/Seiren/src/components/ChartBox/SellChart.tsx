import React, { useState, useEffect } from "react";
import styles from "./SellChart.module.css";

function SellListBox() {
  const [totalSales, setTotalSales] = useState(0);
  const [myProductLikes, setMyProductLikes] = useState(0);

  // 더미 데이터를 사용하여 전체 판매수와 내 상품의 찜 횟수 설정
  useEffect(() => {
    // 전체 판매수와 내 상품 찜 횟수를 하드코딩된 값으로 설정
    setTotalSales(1000); // 예시 값, 실제 데이터로 대체해야 합니다.
    setMyProductLikes(50); // 예시 값, 실제 데이터로 대체해야 합니다.
  }, []);

  return (
    <div className={styles.allContainer}>
      <h1>판매통계차트</h1>
      <div className={styles.sellChartContainer}>
        <div className={styles.sellChartBox}>여긴 판매통계차트가 들어갈거에요!! 대헷</div>
        <div className={styles.sellAndLikes}>
          <p>전체 판매수: {totalSales}</p>
          <p>내 상품 찜 횟수: {myProductLikes}</p>
        </div>
      </div>
    </div>
  );
}

export default SellListBox;
