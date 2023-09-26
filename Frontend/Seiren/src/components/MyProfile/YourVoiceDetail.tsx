import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { customAxios } from "../../libs/axios";
import styles from "./YourVoiceDetail.module.css";

function YourVoiceDetail() {
  const { voiceId } = useParams();
  const [voiceDetail, setVoiceDetail] = useState([]);
  
  useEffect(() => {
    customAxios
      .get(`voices/${voiceId}`)
      .then((response) => {
        const voiceDetailData = response.data.response;
        console.log(voiceDetailData);
        setVoiceDetail(voiceDetailData);
      })
      .catch((error) => {
        console.error("API 호출 중 오류 발생:", error);
      });
  }, [voiceId]);

  if (!voiceDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.YourVoiceDetailContainer}>
      <h1>{voiceDetail.voiceTitle}</h1>
      <p>Memo: {voiceDetail.memo}</p>
      <img src={voiceDetail.voiceAvatarUrl} alt={voiceDetail.voiceTitle} />
    </div>
  );
}

export default YourVoiceDetail;
