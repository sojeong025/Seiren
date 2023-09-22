import { useState } from "react";
import { useRecoilState } from "recoil";
import { UserState } from "../../recoil/UserAtom";
import { customAxios } from "../../libs/axios";
import styles from "./EditProfile.module.css";
import MyModal from "../common/MyModal";

function EditProfileModal() {
  const [userInfo, setUserInfo] = useRecoilState(UserState);
  const [newNickname, setNewNickname] = useState(userInfo.nickname);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(true);

  // 닉네임 중복 체크
  const checkNicknameAvailability = async (nickname: string) => {
    try {
      const response = await customAxios.get("user/nicknames/check", { params: { nickname } });
      const { apiError, response: isAvailable } = response.data;

      if (apiError) {
        setError("닉네임 중복 검사 중 오류 발생");
        setIsNicknameAvailable(null);
      } else {
        setIsNicknameAvailable(isAvailable);
        setError(null); // 에러 메시지 초기화
      }
    } catch (error) {
      console.error("닉네임 중복 검사 중 오류 발생:", error);
      setError("닉네임 중복 검사 중 오류 발생");
    }
  };

  // 닉네임 유효성 검사(중복제거 위해)
  const validateNickname = (nickname: string) => {
    const isValid = /^[a-zA-Z0-9가-힣]{2,8}$/.test(nickname);
    if (!isValid) {
      setError("닉네임은 2글자 이상 8글자 이하의 문자, 숫자, 한글만 허용됩니다.");
      return false;
    }
    return true;
  };

  // 사용자가 입력 변경할 때마다 실행 => 실시간으로 사용자에게 입력 값의 유효성 피드백
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setNewNickname(inputValue);

    validateNickname(inputValue);
  };

  // 사용자가 폼 제출할 때 실행 => 서버에 전송하기 전에 한번 더 검증
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (!validateNickname(newNickname)) return;
      await checkNicknameAvailability(newNickname);
      if (!isNicknameAvailable) {
        setError("이미 사용 중인 닉네임입니다.");
        return;
      }
      await customAxios.put("user/nicknames", { nickname: newNickname });
      setUserInfo((prev) => ({ ...prev, nickname: newNickname }));

      // 성공적으로 제출되면 모달을 닫음
      setModalIsOpen(false);
    } catch (error) {
      console.error("프로필 변경 중 오류 발생:", error);
      setError("프로필 변경 중 오류 발생");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 모달을 닫는 함수
  const handleCancel = () => {
    setModalIsOpen(false);
  };

  return (
    <MyModal
      content={
        <div className={styles.modalContainer}>
          <h2 className={styles.modalTitle}>프로필 수정</h2>
          {error && <div className={styles.error}>{error}</div>}
          {isNicknameAvailable === false && <div className={styles.error}>이미 사용 중인 닉네임입니다.</div>}
          <div className={styles.formGroup}>
            <label htmlFor="newNickname">New Nickname:</label>
            <input
              type="text"
              id="newNickname"
              value={newNickname}
              onChange={handleNicknameChange}
              onBlur={(e) => checkNicknameAvailability(e.target.value)}
              disabled={isSubmitting}
              className={styles.inputField}
            />
          </div>
          <div className={styles.buttons}>
            <button onClick={handleSubmit} disabled={isSubmitting} className={styles.submitButton}>
              {isSubmitting ? "변경중.." : "변경"}
            </button>
            <button onClick={handleCancel} disabled={isSubmitting} className={styles.cancelButton}>
              취소
            </button>
          </div>
        </div>
      }
      open={modalIsOpen}
      onClose={handleCancel}
    />
  );
}

export default EditProfileModal;
