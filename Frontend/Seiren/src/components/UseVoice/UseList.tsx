import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { customAxios } from "../../libs/axios";

function UseList() {
  const [useList, setUseList] = useState([]);
  const { transactionid } = useParams();

  useEffect(() => {
    customAxios
      .get(`transactions/history?transactionid=${transactionid}&page=0`) 
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
        상품 리스트
        <div>{useList}</div>
      </div>
    </div>
  );
}

export default UseList;
