import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { customAxios } from "../../libs/axios";
import styles from "./YourVoiceDetail.module.css";

function EditVoiceDetail() {
  const { voiceId } = useParams();
  const [voiceDetail, setVoiceDetail] = useState<{ voiceTitle: string; memo: string; voiceAvatarUrl: string }>({
    voiceTitle: "",
    memo: "",
    voiceAvatarUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const voiceTitleRef = useRef<HTMLInputElement | null>(null);
  const memoRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    customAxios
      .get(`voices/${voiceId}`)
      .then(response => {
        const voiceDetailData = response.data.response;
        setVoiceDetail(voiceDetailData);
      })
      .catch(error => {
        console.error("API 호출 중 오류 발생:", error);
      });
  }, [voiceId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedData = {
      voiceTitle: voiceTitleRef.current?.value || "",
      memo: memoRef.current?.value || "",
    };

    customAxios
      .put(`voices/${voiceId}`, updatedData)
      .then(response => {
        // console.log("수정 완료:", response.data);
        setVoiceDetail(response.data);
        setIsEditing(false);
      })
      .catch(error => {
        console.error("수정 중 오류 발생:", error);
      });
  };

  if (!voiceDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.YourVoiceDetailContainer}>
      {isEditing ? (
        <>
          <input type="text" ref={voiceTitleRef} defaultValue={voiceDetail.voiceTitle} />
          <textarea ref={memoRef} defaultValue={voiceDetail.memo} />
          <button onClick={handleSaveClick}>저장</button>
        </>
      ) : (
        <>
          <h1>{voiceDetail.voiceTitle}</h1>
          <p>Memo: {voiceDetail.memo}</p>
          <button onClick={handleEditClick}>수정</button>
        </>
      )}
      <img src={voiceDetail.voiceAvatarUrl} alt={voiceDetail.voiceTitle} />
    </div>
  );
}

export default EditVoiceDetail;
