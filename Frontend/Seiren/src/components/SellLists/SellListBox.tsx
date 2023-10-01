import { useState, useEffect } from "react";
import styles from "./SellListBox.module.css";
import { customAxios } from "../../libs/axios";
import { Link } from "react-router-dom";

function SellListBox() {
  const [sellList, setSellList] = useState([]);

  useEffect(() => {
    customAxios
      .get("statistics/products")
      .then(response => {
        let sellData = response.data.response;
        console.log('구매상품 체크',response)

        setSellList(sellData);
      })
      .catch(error => console.error("API 호출 중 오류 발생:", error));
  }, []);

  return (
    <div className={styles.container} >
      <div className={styles.sellListBoxContainer}>
        <div className={styles.sellListBoxTitle}>개별 통계</div>
        <div className={styles.sellList}>
          {sellList.map((item, index) => (
            <div key={index} className={styles.sellItem}>
              <Link to={`/sell-list/detail/${item.productId}`} className={styles.productLink}>
              <img src={item.productImageUrl} alt={item.productTitle} className={styles.productImage} />
              <div className={styles.productInfo}>
                <h2 className={styles.productTitle}>{item.productTitle}</h2>
                <p>Total Sales: {item.totalSumCount}</p>
              </div>
              </Link>
            </div>
          ))}
        </div> 
      </div>
    </div>
  );
}

export default SellListBox;
