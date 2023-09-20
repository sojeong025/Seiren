import React from "react";
import styles from "./UseVoiceBox.module.css";
import VoiceItem from "./VoiceItem"; // VoiceItem 컴포넌트 가져오기
import voiceItemData from "./VoiceItemDummyData";

function UseVoiceBox() {
  // VoiceItem 데이터 배열
  const voiceItems = [
    {
      profileImage: "url_to_profile_image1.jpg",
      title: "Voice 1 제목",
      moodHashtag: "#분위기1",
    },
    {
      profileImage: "url_to_profile_image2.jpg",
      title: "Voice 2 제목",
      moodHashtag: "#분위기2",
    },
    // 다른 VoiceItem들을 추가할 수 있습니다.
  ];

  return (
    <div className={styles.UseVoiceContainer}>
      <div className={styles.textBox}>VoiceBox</div>
      <div className={styles.voiceItems}>
        {voiceItemData.map(item => (
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
