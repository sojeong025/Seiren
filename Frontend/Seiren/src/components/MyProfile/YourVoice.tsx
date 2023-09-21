import React, { useEffect, useState } from 'react';
import axios from 'axios';

function YourComponent() {
  const [apiData, setApiData] = useState([]); // 초기값을 빈 배열로 설정
  const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJudWxsIiwiaWF0IjoxNjk1MjYyMjMyLCJleHAiOjE2OTUyNjgyMzJ9.LC5rwDLYVZtF_rTor327rHBxbREIQe5I-RZKREf1XlA'; // 여기에 액세스 토큰을 넣어주세요

  useEffect(() => {
    const apiUrl = 'http://192.168.40.134:8080/api/voices'; // API 엔드포인트 URL

    // API 호출 설정
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 액세스 토큰 추가
      },
    };

    // API 호출
    axios.get(apiUrl, config)
      .then((response) => {
        // API 응답 데이터를 상태에 저장
        setApiData(response.data.response); // response.data.response를 저장
      })
      .catch((error) => {
        // 오류 처리
        console.error('API 호출 중 오류 발생:', error);
      });
  }, []);

  return (
    <div>
      <h1>Your Voice</h1>
      <ul>
        {apiData.map((item) => (
          <li key={item.voiceId}>{item.voiceTitle}</li>
        ))}
      </ul>
    </div>
  );
}

export default YourComponent;
