import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { customAxios } from "../../libs/axios";
import styles from "./UseVoiceBox.module.css";
import VoiceItem from "./VoiceItem"; // VoiceItem 컴포넌트 가져오기

function UseVoiceBox() {
  const [useVoiceList, setUseVoiceList] = useState([]);

  useEffect(() => {
    customAxios
      .get("transactions?page=0")
      .then(response => {
        let voiceData = response.data.response;

        console.log("리스트 : ", voiceData);
        setUseVoiceList(voiceData);
      })
      .catch(error => console.error("API 호출 중 오류 발생:", error));
  }, []);
  console.log(useVoiceList);
  return (
    <div className={styles.UseVoiceContainer}>
      <div className={styles.textBox}>VoiceBox</div>
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
    </div>
  );
}

export default UseVoiceBox;
