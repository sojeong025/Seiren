import React, { useState, useEffect } from "react";
import styles from "./BuyListBox.module.css";
import BuyCount from "./BuyCount";
import axios from "axios";

function BuyListBox() {
  const [purchaseData, setPurchaseData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const apiUrl = "http://192.168.40.134:8080/api/transaction?page=1";
    const accessToken = localStorage.getItem("accessToken");

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    axios
      .get(apiUrl, config)
      .then((response) => {
        setPurchaseData(response.data.response);
        const total = response.data.response.reduce(
          (total, item) =>
            total +
            item.purchaseAmountPerCharacter * item.purchaseCharacterCount,
          0
        );
        setTotalAmount(total);
      })
      .catch((error) => {
        console.error("API 호출 중 오류 발생:", error);
      });
  }, []);

  return (
    <div className={styles.buyListBox}>
      <h2>구매내역</h2>
      <table className={styles.purchaseTable}>
        <thead>
          <tr>
            <th>판매자</th>
            <th>목소리 제목</th>
            <th>일자</th>
            <th>금액/글자</th>
            <th>글자 수</th>
            <th>총 금액</th>
          </tr>
        </thead>
        <tbody>
          {purchaseData.map((item, index) => {
            const totalAmount =
              item.purchaseAmountPerCharacter * item.purchaseCharacterCount;
            return (
              <tr key={index}>
                <td>{item.seller}</td>
                <td>{item.voiceTitle}</td>
                <td>{item.date}</td>
                <td>{item.purchaseAmountPerCharacter}원</td>
                <td>{item.purchaseCharacterCount}글자</td>
                <td>{totalAmount}원</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className={styles.totalLabel}>
              총 금액:
            </td>
            <td className={styles.totalAmount}>{totalAmount}원</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default BuyListBox;
