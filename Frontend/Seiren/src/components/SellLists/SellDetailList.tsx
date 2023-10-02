import { useState, useEffect } from "react";
import { customAxios } from "../../libs/axios";
import { useParams } from "react-router-dom";
import styles from "./SellDetailList.module.css";


interface SellDetailListProps {
  productId: string;
}

function SellDetailList({ productId }: SellDetailListProps) {
  const [sellList, setSellList] = useState([]);

  useEffect(() => {
    customAxios
      .get(`statistics/${productId}`)
      .then(response => {
        const responseData = response.data.response;
        console.log(responseData);

        setSellList(responseData);
      })
      .catch(error => {
        console.error("API 호출 중 오류 발생:", error);
      });
  }, [productId]);

  return (
    <div>
      <h1 className={styles.sellDetailTitle}>판매 목록</h1>
      <table className={styles.sellDetailTable}>
        <thead>
          <tr>
            <th>닉네임</th>
            <th>구매 횟수</th>
            <th>가격</th>
            <th>목적</th>
            <th>구매 일자</th>
          </tr>
        </thead>
        <tbody>
          {sellList.map((item, index) => (
            <tr key={index}>
              <td>{item.nickname}</td>
              <td>{item.buyLetterCount}</td>
              <td>{item.price}</td>
              <td>{item.purposeName}</td>
              <td>{item.buyDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SellDetailList;
