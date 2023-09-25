import { useState, useEffect } from "react";
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
          <VoiceItem
            key={item.productId} // 적절한 키를 사용하세요.
            productImageUrl={item.productImageUrl}
            productTitle={item.productTitle}
            remainCount={item.remainLetter}
            totalCount={item.totalCount}
            productCategories={item.productCategories}
          />
        ))}
      </div>
    </div>
  );
}

export default UseVoiceBox;
