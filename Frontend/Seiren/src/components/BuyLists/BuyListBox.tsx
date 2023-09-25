import { useState, useEffect } from "react";
import styles from "./BuyListBox.module.css";
import { customAxios } from "../../libs/axios";
import { buyListState } from "../../recoil/UserAtom";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";


function BuyListBox() {
  const [purchaseData, setPurchaseData] = useRecoilState(buyListState);
  const [totalAmount, setTotalAmount] = useState(0);
  const { page } = useParams();

  useEffect(() => {
    customAxios
      .get("transactions/receipt?page=0")
      .then(response => {
        console.log(response.data)
        const data = response.data.response;
        setPurchaseData(data); // Recoil 상태 업데이트

        // 총 금액 계산
        const total = data.reduce((acc, item) => {
          const totalAmountPerItem =
            item.purchaseAmountPerCharacter * item.purchaseCharacterCount;
          return acc + totalAmountPerItem;
        }, 0);
        setTotalAmount(total);
      })
      .catch(error => {
        console.error("API 호출 중 오류 발생:", error);
      });
  }, [setPurchaseData, page]);

  return (
    <div className={styles.buyListBox}>
      <div className={styles.buyListText}>구매내역</div>
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
            const totalAmount = item.purchaseAmountPerCharacter * item.purchaseCharacterCount;
            return (
              <tr key={index}>
                <td>{item.seller}</td>
                <td>{item.productTitle}</td>
                <td>{item.buyDate.substring(0, 10)}</td>
                <td>{item.price}원 / {item.buyLetterCount}개 </td>
                <td>{item.buyLetterCount}글자</td>
                <td>{item.totalPrice}원</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className={styles.totalPrice}>
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
