import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customAxios } from "../../../libs/axios";
import State from "./State";
import UploadImgOri from "../../common/UploadImgOri";
import styles from "./YourVoiceDetail.module.css";

function EditVoiceDetail() {
  const { voiceId } = useParams();
  const [voiceDetail, setVoiceDetail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [voiceTitle, setVoiceTitle] = useState(""); // 상태로 voiceTitle을 관리합니다.
  const [memo, setMemo] = useState(""); // 상태로 memo를 관리합니다.
  const [voiceAvatarUrl, setVoiceAvatarUrl] = useState(""); //
  const navigate = useNavigate();

  useEffect(() => {
    customAxios
      .get(`voices/${voiceId}`)
      .then(response => {
        const voiceDetailData = response.data.response;
        setVoiceDetail(voiceDetailData);
        setVoiceTitle(voiceDetailData.voiceTitle); // voiceTitle 초기값 설정
        setMemo(voiceDetailData.memo); // memo 초기값 설정
        setVoiceAvatarUrl(voiceDetailData.voiceAvatarUrl);
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
      voiceTitle: voiceTitle,
      memo: memo,
      voiceAvatarUrl: voiceAvatarUrl,
    };

    customAxios
      .put(`voices`, updatedData)
      .then(response => {
        setIsEditing(false);
        setVoiceDetail(prevState => ({
          ...prevState,
          voiceTitle: updatedData.voiceTitle,
          memo: updatedData.memo,
          voiceAvatarUrl: updatedData.voiceAvatarUrl,
        }));
        console.log(response);
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
    if (newImage) {
      const formData = new FormData();
      formData.append('image', newImage);

      customAxios
        .post('upload-image-endpoint', formData)
        .then(response => {
          const newImageUrl = response.data.imageUrl;
          setVoiceDetail(prevState => ({
            ...prevState,
            voiceAvatarUrl: newImageUrl,
          }));
          setIsEditing(false);
        })
        .catch(error => {
          console.error("이미지 업로드 중 오류 발생:", error);
        });
    }
  };

  if (voiceDetail === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.YourVoiceDetailContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.upBox}>
          <div className={styles.imgContainer}>
            <UploadImgOri
              imgUrl={voiceDetail.voiceAvatarUrl}
              setImgUrl={setVoiceAvatarUrl}
            />
            <button className={styles.savebtn} onClick={handleSaveClick}>저장</button>
          </div>
          <div className={styles.stateBox}>
            <State voiceDetail={voiceDetail} />
          </div>
        </div>

        <div className={styles.downBox}>
          {isEditing ? (
            <><div className={styles.voiceTitle}>
              <input
                type="text"
                value={voiceTitle}
                onChange={e => setVoiceTitle(e.target.value)}
                className={styles.inputTitle}
              />
              </div>
              <div className={styles.memo} >
              <input
                type="text"
                value={memo}
                onChange={e => setMemo(e.target.value)}
                className={styles.inputMemo}
              />
              </div>
            </>
          ) : (
            <>
              <div className={styles.voiceTitle}>{voiceDetail.voiceTitle}</div>
              <div className={styles.memo}>{voiceDetail.memo}</div>
            </>
          )}
          <div className={styles.buttons}>
            {isEditing ? (
              <button onClick={handleSaveClick}>저장</button>
            ) : (
              <button onClick={handleEditClick}>수정</button>
            )}
            <button onClick={handleDeleteClick}>삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditVoiceDetail;
