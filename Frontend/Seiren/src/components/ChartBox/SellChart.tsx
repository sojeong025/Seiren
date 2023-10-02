import { useState, useEffect } from "react";
import styles from "./SellChart.module.css";
import { customAxios } from "../../libs/axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Calendar from 'react-calendar';
import './ReactCalendar.css';

function SellListBox() {
  const currentDate = new Date(); // 현재 날짜 객체를 생성합니다.
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [totalSales, setTotalSales] = useState(0);
  const [myProductLikes, setMyProductLikes] = useState(0);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    customAxios.get('wish/count')
      .then(res => {
        setMyProductLikes(res.data.response)
      })
      .catch(err => console.log(err))
  })

  useEffect(() => {
    if (selectedMonth) {
      console.log(selectedMonth);
      const requestData = { month: selectedMonth };

      customAxios
        .get(`statistics/month`, { params: requestData })
        .then(response => {
          const responseData = response.data.response;
          console.log('판매내역 확인', response)

          // 리스폰스 데이터를 배열로 변환하고 날짜 오름차순으로 정렬
          const salesDataArray = Object.keys(responseData)
            .map(date => ({
              date: date,
              sales: parseFloat(responseData[date]),
            }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


          setTotalSales(responseData.totalSales);
          setSalesData(salesDataArray);
        })
        .catch(error => {
          console.error("API 호출 중 오류 발생:", error);
        });
    }
  }, [selectedMonth]);

  return (
    <div className={styles.allContainer}>
      <div className={styles.top}>
        <div className={styles.top_txt}>전체 통계</div>
          <div className={styles.totalStatic}>
            <Calendar 
              onChange={(date: Date) => setSelectedMonth(date.getMonth() +1)}
              value={new Date(currentDate.getFullYear(), selectedMonth - 1)}
              view="year"
              onClickMonth={(date: Date) => setSelectedMonth(date.getMonth() +1)}
            />
            <div className={styles.sellChartContainer}>
              <div className={styles.sellChartBox}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="date" type="category" />
                    <YAxis dataKey="sales" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#ed5808" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
          </div>
        </div>
          {/* <div className={styles.sellAndLikes}>
            <div>전체 판매수: {totalSales}</div>
            <div>내 상품 찜 횟수: {myProductLikes}</div>
          </div> */}
      </div>
    </div>
  );
}

export default SellListBox;
