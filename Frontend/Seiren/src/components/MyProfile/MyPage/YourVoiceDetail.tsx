import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customAxios } from "../../../libs/axios";
import styles from "./YourVoiceDetail.module.css";

function EditVoiceDetail() {
  const { voiceId } = useParams();
  const [voiceDetail, setVoiceDetail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const voiceTitleRef = useRef(null);
  const memoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    customAxios
      .get(`voices/${voiceId}`)
      .then(response => {
        const voiceDetailData = response.data.response;
        setVoiceDetail(voiceDetailData);
        console.log(voiceDetailData);
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
        setVoiceDetail(prevState => ({
          ...prevState,
          voiceTitle: updatedData.voiceTitle,
          memo: updatedData.memo,
        }));
      })
      .catch(error => {
        console.error("수정 중 오류 발생:", error);
      });
  };

  const handleDeleteClick = () => {
    customAxios
      .delete(`voices/${voiceId}`)
      .then(res => {
        console.log("내 목소리 삭제 성공", res);
        navigate("/my-page");
      })
      .catch(err => console.log(err));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setNewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = () => {
    // 이미지 업로드 및 URL 업데이트를 처리하는 코드를 추가합니다.
    // 이 부분은 서버 API와 연동하여 이미지 업로드 기능을 구현해야 합니다.
    // 이미지 업로드 후, 업로드된 이미지의 URL을 `voiceDetail.voiceAvatarUrl`로 업데이트합니다.
  };

  if (voiceDetail === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.YourVoiceDetailContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.upBox}>
          <div className={styles.imgContainer}>
            <img src={newImage || voiceDetail.voiceAvatarUrl} alt={voiceDetail.voiceTitle} className={styles.img} />
            <button> 이미지 수정 </button>
          </div>
          <div className={styles.stateBox}>여긴 상태변경</div>
        </div>

        <div className={styles.downBox}>
          <div className={styles.voiceTitle}>{voiceDetail.voiceTitle}</div>
          <div className={styles.memo}>Memo: {voiceDetail.memo}</div>
          <div className={styles.buttons}>
            <button onClick={handleEditClick}>수정</button>
            <button onClick={handleDeleteClick}>삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditVoiceDetail;
