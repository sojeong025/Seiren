import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { UserState } from "../../recoil/UserAtom";
import { customAxios } from "../../libs/axios";
import styles from "./MyInfo.module.css";
import avatar from "../../assets/preview.png";
import Edit from "../MyProfile/EditProfile";

function MyInfo() {
  const [userInfo, setUserInfo] = useRecoilState(UserState);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    customAxios
      .get("user")
      .then(response => {
        let userData = response.data.response;
        
        let updatedUserData = {
          nickname: userData.nickname,
          profileImage: userData.profileImg,
        };
        setUserInfo(updatedUserData);
      })
      .catch(error => console.error("API 호출 중 오류 발생:", error));
  }, []);

  const handleImageClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileLeft}>
        <img
          className={styles.profileImage}
          src={userInfo.profileImage || avatar}
          alt="Profile"
          onClick={handleImageClick}
        />
        {isEditing && (
          <div className={styles.editModal}>
            <Edit />
          </div>
        )}
      </div>
      <div>
        <div className={styles.nickName}>{userInfo.nickname || "닉네임"}</div>
      </div>
    </div>
  );
}

export default MyInfo;
