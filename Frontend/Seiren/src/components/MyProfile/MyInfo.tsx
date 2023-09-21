import { useState, useEffect } from "react";
import { useRecoilState } from 'recoil';  
import { UserState } from '../../recoil/UserAtom';
import { customAxios } from '../../libs/axios';
import styles from "./MyInfo.module.css";
import avatar from "../../assets/preview.png";
import Edit from "./EditProfileModal";

function MyInfo() {
  const [userInfo, setUserInfo] = useRecoilState(UserState);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 변수


  useEffect(() => {
    customAxios.get("user")
      .then(response => {
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

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileLeft}>
        <img className={styles.profileImage} src={userInfo.profileImage || avatar} alt="Profile" />
      </div>
      <div>
        <div className={styles.nickName}>{userInfo.nickname || "닉네임"}</div>
        <button onClick={toggleModal} className={styles.editButton}>
          닉네임 수정
        </button>
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              {/* 모달 컴포넌트에 프로필 업데이트 함수 전달 */}
              <Edit closeModal={toggleModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyInfo;
