import { useState, useEffect } from "react";
import styles from "./SellListBox.module.css";
import { customAxios } from "../../libs/axios";
import { Link } from "react-router-dom";

function SellListBox() {
  const [sellList, setSellList] = useState();
  

  useEffect(() => {
    customAxios
      .get("")
      .then(response => {
        let sellData = response.data.response;
        console.log(sellData)

      })
      .catch(error => console.error("API 호출 중 오류 발생:", error));
  }, []);

  return (
    <div className={styles.sellListBoxContainer}>
      <h1 className={styles.sellListBoxTitle}>MY Voice</h1>
      <div className={styles.sellList}>
        {/* {buyItems.map((item, index) => (
          <Link to={`/detail/${index}`} key={index} className={styles.sellListItem}>
            <div>
              <img src="프로필 이미지 경로" alt="프로필 이미지" />
            </div>
            <div className={styles.itemText}>{item}</div>
          </Link>
        ))} */}
      </div>
    </div>
  );
}

export default SellListBox;
