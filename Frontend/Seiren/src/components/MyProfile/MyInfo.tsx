import React, { useState, useEffect } from "react";
import styles from "./MyInfo.module.css";
import avatar from "../../assets/preview.png";
import Edit from "./EditProfileModal";

function MyInfo() {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 변수

  useEffect(() => {
    // API 엔드포인트 URL 및 액세스 토큰 설정
    const apiUrl = "http://192.168.40.134:8080/api/user";
    const accessToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJudWxsIiwiaWF0IjoxNjk1MjczNDAxLCJleHAiOjE2OTUyNzk0MDF9.y5G8BFF4fo9jxS1Q41tB1yG8W_AkTFFsjfEUjySBYcY";

    // API 호출을 위한 옵션 설정
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 추가
      },
    };

    // API 호출
    fetch(apiUrl, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error("API 호출 실패");
        }
        return response.json();
      })
      .then(data => {
        // API에서 받은 데이터를 userInfo 상태에 저장
        setUserInfo(data.response);
        setLoading(false); // 로딩 상태를 false로 설정
      })
      .catch(error => {
        console.error("API 호출 중 오류 발생:", error);
        setLoading(false); // 오류 발생 시 로딩 상태를 false로 설정
      });
  }, []);

  // 모달 열기/닫기 핸들러
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // 프로필 업데이트 후 상태를 업데이트하는 함수
  const updateProfile = newProfileData => {
    // 새로운 프로필 데이터를 userInfo 상태로 업데이트
    setUserInfo(newProfileData);
  };

  return (
    <div className={styles.profileContainer}>
      <img className={styles.profileImage} src={userInfo.profileImg || avatar} alt="Profile" />
      <div>
        <div className={styles.nickName}>{userInfo.nickname || "Loading..."}</div>
        <div className={styles.feel}>#뭘보노 #보노보노야 #앙?</div>
        <button onClick={toggleModal} className={styles.editButton}>
          닉네임 수정
        </button>
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              {/* 모달 컴포넌트에 프로필 업데이트 함수 전달 */}
              <Edit closeModal={toggleModal} updateProfile={updateProfile} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyInfo;
