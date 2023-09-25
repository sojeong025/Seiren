import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { customAxios } from "../../libs/axios";

function Likes() {
    const { transactionid } = useParams();

  useEffect(() => {
    customAxios
      .get('transactions/history?transactionid=1&page=0') // 원하는 API 경로로 변경하세요.
      .then(response => {
        const responseData = response.data;
        
        console.log("useList : ", responseData)
      })
      .catch(error => {
        console.error("API 호출 중 오류 발생:", error);
      });
  }, []);

  return (
    <div></div>
  );
}

export default Likes;
