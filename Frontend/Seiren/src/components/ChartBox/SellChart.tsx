import React, { useState, useEffect } from "react";
import styles from "./SellChart.module.css";
import { customAxios } from "../../libs/axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function SellListBox() {
  const [totalSales, setTotalSales] = useState(0);
  const [myProductLikes, setMyProductLikes] = useState(0);
  const [salesData, setSalesData] = useState([]); // 날짜와 판매량 데이터를 저장할 상태

  // useEffect(() => {
  //   customAxios
  //     .get("Statistics/products") // 원하는 API 경로로 변경하세요.
  //     .then(response => {
  //       const responseData = response.data;
  //       console.log(responseData)


  //     })
  //     .catch(error => {
  //       console.error("API 호출 중 오류 발생:", error);
  //     });
  // }, []);

  return (
    <div className={styles.allContainer}>
      <h1>판매통계차트</h1>
      <div className={styles.sellChartContainer}>
        <div className={styles.sellChartBox}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.sellAndLikes}>
          <div>전체 판매수: {totalSales}</div>
          <div>내 상품 찜 횟수: {myProductLikes}</div>
        </div>
      </div>
    </div>
  );
}

export default SellListBox;
