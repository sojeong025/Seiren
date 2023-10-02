// UseList.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { customAxios } from "../../libs/axios";

interface UseListProps {
  transactionid: string; // transactionid의 타입을 string으로 지정
}

function UseList({ transactionid }: UseListProps) {
  const [useList, setUseList] = useState([]);
  // transactionid는 이미 prop으로 받았으므로 useParams를 사용하지 않습니다.

  useEffect(() => {
    customAxios
      .get(`transactions/history?transactionid=${transactionid}&page=1`) 
      .then(response => {
        const responseData = response.data.response;

        console.log("useList : ", responseData);
        setUseList(responseData);
      })
      .catch(error => {
        console.error("API 호출 중 오류 발생:", error);
      });
  }, [transactionid]);

  return (
    <div>
      <div>
        사용 내역 
        <div>{useList}</div>
      </div>
    </div>
  );
}

export default UseList;
