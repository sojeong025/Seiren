import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customAxios } from "../../../libs/axios";
import styles from "./YourVoiceDetail.module.css";

function EditVoiceDetail() {
  const { voiceId } = useParams();
  const [voiceDetail, setVoiceDetail] = useState(null); // 초기 값을 null로 설정
  const [isEditing, setIsEditing] = useState(false);
  const voiceTitleRef = useRef(null);
  const memoRef = useRef(null);
  const navigate = useNavigate();


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
      voiceId: voiceDetail.voiceId,
      voiceTitle: voiceTitleRef.current.value,
      memo: memoRef.current.value,
      voiceAvatarUrl: voiceDetail.voiceAvatarUrl,
    };
  
    customAxios
      .put(`voices`, updatedData)
      .then(response => {
        setIsEditing(false);
        // 수정된 데이터로 상태 업데이트
        setVoiceDetail(prevState => ({
          ...prevState,
          voiceTitle: updatedData.voiceTitle,
          memo: updatedData.memo,
        }));
      })
      .catch(error => {
        console.error("수정 중 오류 발생:", error);
        // 오류 처리 추가 가능
      });
  };

  const handleDeleteClick = () => {
    customAxios
      .delete(`voices/${voiceId}`)
      .then(res => {
        console.log("내 목소리 삭제 성공", res);
        navigate('/my-page')
      })
      .catch(err => console.log(err));
  };
  

  if (voiceDetail === null) {
    // 데이터 로딩 중인 경우 로딩 상태 표시
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.YourVoiceDetailContainer}>
      {isEditing ? (
        <div>
          <input type="text" ref={voiceTitleRef} defaultValue={voiceDetail.voiceTitle} />
          <textarea ref={memoRef} defaultValue={voiceDetail.memo} />
          <button onClick={handleSaveClick}>저장</button>
        </div>
      ) : (
        <div>
          <div>{voiceDetail.voiceTitle}</div>
          <div>Memo: {voiceDetail.memo}</div>
          <button onClick={handleEditClick}>수정</button>
          <button onClick={handleDeleteClick}>삭제</button>
        </div>
      )}
      <img src={voiceDetail.voiceAvatarUrl} alt={voiceDetail.voiceTitle} />
    </div>
  );
}

export default EditVoiceDetail;
