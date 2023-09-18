import React, { useState, useEffect } from "react";
import styles from "./BuyListBox.module.css";

function Likes() {
  // 예시 데이터 (나중에 API로 대체할 예정)
  const exampleData = [
    {
      seller: "판매자1",
      voiceTitle: "목소리 제목 1",
      date: "2023-09-13",
      purchaseAmountPerCharacter: 10,
      purchaseCharacterCount: 150,
    },
    {
      seller: "판매자2",
      voiceTitle: "목소리 제목 2",
      date: "2023-09-14",
      purchaseAmountPerCharacter: 8,
      purchaseCharacterCount: 100,
    },
    // 다른 구매 내역 데이터 추가
  ];

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
          {exampleData.map((item, index) => {
            const totalAmount = item.purchaseAmountPerCharacter * item.purchaseCharacterCount;
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
            <td colSpan="5" className={styles.totalLabel}>
              총 금액:
            </td>
            <td className={styles.totalAmount}>
              {exampleData.reduce(
                (total, item) =>
                  total +
                  item.purchaseAmountPerCharacter * item.purchaseCharacterCount,
                0
              )}
              원
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Likes;
  