import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Likes.module.css';

function Likes() {
  const [wishList, setWishList] = useState([]);
  const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJudWxsIiwiaWF0IjoxNjk1MjYyMjMyLCJleHAiOjE2OTUyNjgyMzJ9.LC5rwDLYVZtF_rTor327rHBxbREIQe5I-RZKREf1XlA'; // 여기에 액세스 토큰을 넣어주세요

  useEffect(() => {
    const apiUrl = 'http://192.168.40.134:8080/api/wish'; // API 엔드포인트 URL

    // API 호출 설정
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 액세스 토큰 추가
      },
    };

    // API 호출
    axios.get(apiUrl, config)
      .then((response) => {
        // API 응답 데이터에서 'wishList' 필드를 추출하여 상태에 저장
        setWishList(response.data.response.wishList);
      })
      .catch((error) => {
        // 오류 처리
        console.error('API 호출 중 오류 발생:', error);
      });
  }, [accessToken]);

  return (
    <div className={styles.LikesContainer}>
      <div className={styles.likesText}>Likes</div>
      <ul>
        {wishList.map((item) => (
          <li key={item.productId}>
            <div>{item.title}</div>
            <div>{item.price}</div>
            <img src={item.productImageUrl} alt={item.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Likes;
