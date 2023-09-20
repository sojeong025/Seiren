import React, { useState, useEffect } from "react";
import styles from "./BuyCount.module.css";


function BuyCount() {
  // 예시 데이터 (나중에 API로 대체할 예정)
  const exampleData = [
    // 데이터 내용 생략
  ];

  const itemCount = exampleData.length; // 데이터의 아이템 수를 가져옵니다.

  return (
    <div className={styles.buyCountBox}>
      <div className={styles.itemCount}>
        <p className={styles.textText}>BUY</p> 
        <p className={styles.countText}>{itemCount}</p>
      </div>
    </div>
  );
}

export default BuyCount;
