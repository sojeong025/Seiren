import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { customAxios } from "../../libs/axios";
import styles from "./UseVoiceBox.module.css";
import VoiceItem from "./VoiceItem";
import Pagination from "../common/Pagination"; // Pagination 컴포넌트 추가

function UseVoiceBox() {
  const [useVoiceList, setUseVoiceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const [ableCount, setAbleCount] = useState();
  const [unableCount, setUnableCount] = useState();
  const itemsPerPage = 10;

  useEffect(() => {
    customAxios
      .get(`transactions/availability`)
      .then(response => {
        const able = response.data.response.useAbleCount;
        const unable = response.data.response.useUnableCount;
        console.log(able);
        setAbleCount(able);
        setUnableCount(unable);
      })
      .catch(error => console.error("API 호출 중 오류 발생:", error));
  }, []);

  useEffect(() => {
    customAxios
      .get(`transactions?page=${currentPage}`)
      .then(response => {
        let voiceData = response.data.response;
        setUseVoiceList(voiceData);
      })
      .catch(error => console.error("API 호출 중 오류 발생:", error));
  }, [currentPage]);

  const onPageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.UseVoiceContainer}>
      <div className={styles.useCount}>
        <div className={styles.useCount_txt}>VoiceBox</div>
        <div className={styles.count}>
          <div className={styles.useCount_count}>
            사용 가능한 목소리는 <span>{ableCount}개</span> 입니다{" "}
          </div>
        </div>
      </div>

      <div className={styles.voiceItems}>
        {useVoiceList.map(item => (
          <Link to={`/voice-detail/${item.productId}`} key={item.productId}>
            <VoiceItem
              key={item.productId}
              productImageUrl={item.productImageUrl}
              productTitle={item.productTitle}
              remainCount={item.remainLetter}
              totalCount={item.totalCount}
              productCategories={item.productCategories}
            />
          </Link>
        ))}
      </div>
      <div className={styles.pagi}>
        <Pagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalAmount={ableCount}
        />
      </div>
    </div>
  );
}

export default UseVoiceBox;
