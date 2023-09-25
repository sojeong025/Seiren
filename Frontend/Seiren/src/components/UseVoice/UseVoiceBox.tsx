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
            key={item.id}
            profileImage={item.profileImage}
            title={item.title}
            moodHashtag={item.moodHashtag}
            author={item.author}
          />
        ))}
      </div>
    </div>
  );
}

export default UseVoiceBox;
