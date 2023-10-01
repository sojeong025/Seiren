import { useEffect, useState } from "react";
import { UserState } from "../../recoil/UserAtom";
import { useRecoilState } from "recoil";
import { customAxios } from "../../libs/axios";
import styles from "./EditImage.module.css";
import UploadImg from "../common/UploadImg";

function EditImage() {
  const [userInfo, setUserInfo] = useRecoilState(UserState);

  // UploadImg 컴포넌트에서 업로드된 이미지 URL을 저장할 상태
  const [uploadedImageUrl, setUploadedImageUrl] = useState(userInfo.profileImage);

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

  useEffect(() => {
    customAxios
      .put("user/profileimg", { profileImgUrl: uploadedImageUrl }) // PUT 요청과 함께 데이터 전송
      .then(response => {
        console.log(response);
      })
      .catch(error => console.error("API 호출 중 오류 발생:", error));
  }, [uploadedImageUrl]); // uploadedImageUrl이 변경될 때마다 이 useEffect가 실행됨

  // UploadImg 컴포넌트에서 이미지 업로드 후 URL을 전달받아 상태를 업데이트
  useEffect(() => {
    if (uploadedImageUrl) {
      // 서버로부터 반환된 이미지 URL을 userInfo 상태를 업데이트하여 프로필 이미지를 변경
      setUserInfo(prevUserInfo => ({
        ...prevUserInfo,
        profileImage: uploadedImageUrl,
      }));
    }
  }, [uploadedImageUrl, setUserInfo]);

  return (
    <div>
      <div className={styles.text}>프로필 이미지 수정</div>
      <div className={styles.EditContainer}>
        <div className={styles.texta}>
          <div>변경 전</div>
        <img src={userInfo.profileImage} alt="프로필 이미지" className={styles.img} />
        </div>
        <div className={styles.upload}>
        <div>변경 후</div>
        <UploadImg imgUrl={uploadedImageUrl} setImgUrl={setUploadedImageUrl} />
        </div>
      </div>
    </div>
  );
}

export default EditImage;
