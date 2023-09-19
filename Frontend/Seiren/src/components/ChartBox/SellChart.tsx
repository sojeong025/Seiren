import React, { useState, useEffect } from "react";
import styles from "./SellChart.module.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function SellListBox() {
  const [totalSales, setTotalSales] = useState(0);
  const [myProductLikes, setMyProductLikes] = useState(0);
  const [salesData, setSalesData] = useState([]); // 날짜와 판매량 데이터를 저장할 상태

  // 더미 데이터를 사용하여 전체 판매수, 내 상품 찜 횟수, 그래프 데이터 설정
  useEffect(() => {
    // 전체 판매수와 내 상품 찜 횟수를 하드코딩된 값으로 설정
    setTotalSales(1000); // 예시 값, 실제 데이터로 대체해야 합니다.
    setMyProductLikes(50); // 예시 값, 실제 데이터로 대체해야 합니다.

    // 더미 그래프 데이터 생성 (날짜와 판매량)
    const dummySalesData = [
      { date: "2023-09-01", sales: 100 },
      { date: "2023-09-02", sales: 150 },
      { date: "2023-09-03", sales: 200 },
      // 더 많은 데이터를 추가할 수 있습니다.
    ];

    setSalesData(dummySalesData);
  }, []);

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
