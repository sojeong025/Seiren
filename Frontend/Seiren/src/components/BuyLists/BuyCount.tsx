import React, { useState, useEffect } from "react";
import styles from "./BuyCount.module.css";
import { customAxios } from "../../libs/axios";
import { useRecoilState } from "recoil";
import { buyCountState } from "../../recoil/UserAtom";

function BuyCount() {
  const [buyCount, setBuyCount] = useRecoilState(buyCountState);

  useEffect(() => {
    customAxios
      .get("transactions/totalcount")
      .then(response => {
        let count = response.data.response;
        setBuyCount(count);
      })
      .catch(error => {
        console.error("API 호출 중 오류 발생:", error);
      });
  }, []);
  
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
