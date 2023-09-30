import { useState, useEffect } from "react";
import styles from "./BuyListBox.module.css";
import { customAxios } from "../../libs/axios";
import { useParams, NavLink } from "react-router-dom";
import Pagination from "../common/Pagination";
import { IoIosArrowDown } from "react-icons/io"

function BuyListBox() {
  const [purchaseData, setPurchaseData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalBuyCount, setTotalBuyCount] = useState(0);

  // 이부분이 페이지네이션 같아욤 (수정 필요)
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState(page || 1); // 현재 페이지 상태 추가
  const itemsPerPage = 10;

  useEffect(() => {
    customAxios.get("transactions/receipt?page=0")
      .then(response => {
        console.log('구매목록 : ',response.data)
        const data = response.data.response;
        const numberOfItems = response.data.response.length;
        setTotalBuyCount(numberOfItems);
        setPurchaseData(data);

        // 총 금액 계산
        const totalPurchasePrice = data.reduce((acc, item) => {
          return acc + item.totalPrice;
        }, 0);
        setTotalAmount(totalPurchasePrice);
      
      })
      .catch(error => {
        console.error("API 호출 중 오류 발생:", error);
      });
  }, [setPurchaseData, page]);

  const onPageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const buyCountState = totalBuyCount

  return (
    <div className={styles.buyListBox}>
      <div className={styles.buyCount}>
        <div className={styles.buyCount_txt}>구매 목록</div>
        <div className={styles.count}>
          <div className={styles.buyCount_count}>총 구매한 목소리는 <span>{buyCountState}개</span> 입니다 </div>
          <div className={styles.buyCount_count}>
            <NavLink to="/use-voice">사용하기 <IoIosArrowDown/></NavLink>
          </div>
        </div>
      </div>

      {/* 구매한 list 자세히 */}
      <div className={styles.purchaseTable}>
        <div className={styles.buyCount_txt}>구매 정보</div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>구매 일자</th>
              <th>판매자</th>
              <th>목소리 제목</th>
              <th>금액 <span>(단위: 자)</span></th>
              <th>구매 글자 수</th>
              <th>총 금액</th>
            </tr>
          </thead>
          <tbody>
            {purchaseData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.buyDate.substring(0, 10)}</td>
                  <td>{item.seller}</td>
                  <td>{item.productTitle}</td>
                  <td>{item.price}원</td>
                  <td>{item.buyLetterCount}자</td>
                  <td>{item.totalPrice}원</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6} className={styles.totalPrice}>
                총 사용 금액 : {totalAmount}원
              </td>
            </tr>
            {/* 페이지네이션 수정 필요 */}
            <tr className={styles.page}>
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={totalBuyCount}
                currentPage={currentPage}
                onPageChange={onPageChange}
              />
            </tr>
          </tfoot>
        </table>

      </div>
    </div>
  );
}

export default BuyListBox;
