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

        setSellList(sellData);
      })
      .catch(error => console.error("API 호출 중 오류 발생:", error));
  }, []);

  return (
    <div className={styles.sellListBoxContainer}>
      <h1 className={styles.sellListBoxTitle}>MY Voice</h1>
      <div className={styles.sellList}>
        {sellList.map((item, index) => (
          <div key={index} className={styles.sellItem}>
            <img src={item.productImageUrl} alt={item.productTitle} className={styles.productImage} />
            <div className={styles.productInfo}>
              <h2 className={styles.productTitle}>{item.productTitle}</h2>
              <p>Total Sales: {item.totalSumCount}</p>
              <Link to={`/product/${item.productId}`} className={styles.productLink}>
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div> 
    </div>
  );
}

export default SellListBox;
