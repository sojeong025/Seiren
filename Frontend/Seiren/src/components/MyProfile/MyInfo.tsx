import { useState, useEffect } from "react";
import styles from "./MyInfo.module.css";
import avatar from "../../assets/preview.png";
import Edit from "./EditProfileModal";
import { useRecoilState } from 'recoil';  
import { UserState } from '../../recoil/UserAtom';
import axios from 'axios';

function MyInfo() {
  // Recoil로 회원 저장
  const [userInfo, setUserInfo] = useRecoilState(UserState);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 변수


  // accessToken 받아오기
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const apiUrl = "http://192.168.40.134:8080/api/user";
        const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    // API 호출
    axios.get(apiUrl, requestOptions)
      .then(response => {
        if (response.status !== 200) {
          throw new Error("API 호출 실패");
        }
        let userData = response.data.response;
        
        let updatedUserData = {
          nickname: userData.nickname,
          profileImage: userData.profileImage,
        };
        
        setUserInfo(updatedUserData);
      })
      .catch(error => console.error("API 호출 중 오류 발생:", error));
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
      <img className={styles.profileImage} src={userInfo.profileImage || avatar} alt="Profile" />
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
