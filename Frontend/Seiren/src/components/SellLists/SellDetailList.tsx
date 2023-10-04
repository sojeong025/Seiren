import { useState, useEffect } from "react";
import { customAxios } from "../../libs/axios";
import Pagination from "../../components/common/Pagination";
import styles from "./SellDetailList.module.css";

interface SellDetailListProps {
  productId: string;
}

function SellDetailList({ productId }: SellDetailListProps) {
  const [sellList, setSellList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [totalAmount, setTotalAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = sellList.slice(startIndex, endIndex);

  useEffect(() => {
    let totalPrice = 0;

    customAxios
      .get(`statistics/${productId}`)
      .then(response => {
        const responseData = response.data.response;
        console.log(responseData);
        responseData.forEach(item => {
          totalPrice += item.price * item.buyLetterCount;
        });
        setSellList(responseData);
        setTotalAmount(responseData.length);
        setTotalPrice(totalPrice);
      })
      .catch(error => {
        console.error("API 호출 중 오류 발생:", error);
      });
  }, [productId]);

  const onPageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.Lcontainer}>
      <div className={styles.container}>
        <div className={styles.sellDetailTitle}>판매 목록</div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>구매 일자</th>
              <th>닉네임</th>
              <th>목적</th>
              <th>금액</th>
              <th>
                구매 횟수<span>(단위: 자)</span>
              </th>
              <th>총 금액</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.buyDate.substring(0, 10)}</td>
                <td>{item.nickname}</td>
                <td>{item.purposeName}</td>
                <td>{item.price}원</td>
                <td>{item.buyLetterCount}자</td>
                <td>{item.price * item.buyLetterCount}원</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6} className={styles.totalPrice}>
                총 판매 금액 : {totalPrice}원
              </td>
            </tr>
          </tfoot>
        </table>
        <Pagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalAmount={totalAmount}
        />
      </div>
    </div>
  );
}

export default SellDetailList;
