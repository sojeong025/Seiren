// UseList.tsx
import { useState, useEffect } from "react";
import { customAxios } from "../../libs/axios";

interface UseListProps {
  transactionid: string;
}

function UseList({ transactionid }: UseListProps) {
  const [useList, setUseList] = useState([]);

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
        <div>
          {useList.map((item) => (
            <div key={item.createAt}>
              <p>{item.text}</p>
              <p>{item.mp3Url}</p>
              <p>{item.createAt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UseList;
