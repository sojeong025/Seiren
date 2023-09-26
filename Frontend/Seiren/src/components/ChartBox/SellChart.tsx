import React, { useState, useEffect } from "react";
import styles from "./SellChart.module.css";
import { customAxios } from "../../libs/axios";
import { useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function SellListBox() {
  const { month } = useParams();
  const [totalSales, setTotalSales] = useState(0);
  const [myProductLikes, setMyProductLikes] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const currentDate = new Date(); // 현재 날짜 객체를 생성합니다.
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1); // 현재 월을 초기값으로 설정합니다.

  useEffect(() => {
    if (selectedMonth) {
      console.log(selectedMonth);

      const requestData = { month: selectedMonth };

      customAxios
        .get(`statistics/month`, { params: requestData })
        .then(response => {
          const responseData = response.data.response;
          console.log(responseData);

          // 리스폰스 데이터를 배열로 변환하고 날짜 오름차순으로 정렬
          const salesDataArray = Object.keys(responseData)
            .map(date => ({
              date: date,
              sales: parseFloat(responseData[date]),
            }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));

          setTotalSales(responseData.totalSales);
          setMyProductLikes(responseData.myProductLikes);
          setSalesData(salesDataArray);
        })
        .catch(error => {
          console.error("API 호출 중 오류 발생:", error);
        });
    }
  }, [selectedMonth]);

  const handleMonthChange = event => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);
  };

  return (
    <div className={styles.allContainer}>
      <h1>판매통계차트</h1>
      <div className={styles.monthDropdown}>
        <label htmlFor="month">월 선택: </label>
        <select id="month" value={selectedMonth} onChange={handleMonthChange}>
          <option value="">전체</option>
          <option value="1">1월</option>
          <option value="2">2월</option>
          <option value="3">3월</option>
          <option value="4">4월</option>
          <option value="5">5월</option>
          <option value="6">6월</option>
          <option value="7">7월</option>
          <option value="8">8월</option>
          <option value="9">9월</option>
          <option value="10">10월</option>
          <option value="11">11월</option>
          <option value="12">12월</option>
        </select>
      </div>
      <div className={styles.sellChartContainer}>
        <div className={styles.sellChartBox}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="date" type="category" />
              <YAxis dataKey="sales" />
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
