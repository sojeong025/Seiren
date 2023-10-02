import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { UserState } from "../../../recoil/UserAtom";
import { customAxios } from "../../../libs/axios";
import styles from "./EditProfile.module.css";
import MyModal from "../../common/MyModal";
import EditImage from "../../MyProfile/EditImage";
import UserDelete from "./UserDelete";

function EditProfileModal() {
  // Recoil 상태 및 초기값 설정
  const [userInfo, setUserInfo] = useRecoilState(UserState);

  // 폼 관련 상태
  const [newNickname, setNewNickname] = useState(userInfo.nickname);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean | null>(null);

  // 모달 상태
  const [modalIsOpen, setModalIsOpen] = useState(true);

  // 사용 가능한 닉네임 메시지
  const [nicknameMessage, setNicknameMessage] = useState<string | null>(null);

  // 중복 검사 이벤트 핸들러
  const handleCheckNickname = () => {
    if (newNickname === userInfo.nickname) {
      // 닉네임이 변경되지 않은 경우 아무것도 표시하지 않음
      setError(null);
      setIsNicknameAvailable(true); // 현재 닉네임과 같은 경우에도 사용 가능으로 설정
      setNicknameMessage("사용 가능한 닉네임입니다!");
    } else {
      checkNicknameAvailability(newNickname);
    }
  };

  // 닉네임 중복 체크 함수
  const checkNicknameAvailability = async (nickname: string) => {
    try {
      const response = await customAxios.get("user/nicknames/check", { params: { nickname } });
      const { apiError, response: isAvailable } = response.data;

      if (apiError) {
        setError("이미 사용 중인 닉네임 입니다.");
        setIsNicknameAvailable(null);
        setNicknameMessage(null);
      } else {
        setIsNicknameAvailable(isAvailable);
        setError(null); // 에러 메시지 초기화
        if (isAvailable) {
          setNicknameMessage("사용 가능한 닉네임입니다!");
        } else {
          setNicknameMessage("이미 사용 중인 닉네임입니다.");
        }
      }
    } catch (error) {
      console.error("이미 사용 중인 닉네임 입니다.:", error);
      setError("이미 사용 중인 닉네임 입니다.");
    }
  };

  // 사용자가 입력 변경할 때마다 실행 => 실시간으로 사용자에게 입력 값의 유효성 피드백
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setNewNickname(inputValue);
    validateNickname(inputValue);
  };

  // 닉네임 유효성 검사 함수
  const validateNickname = (nickname: string) => {
    const isValid = /^[a-zA-Z0-9가-힣]{2,8}$/.test(nickname);
    if (!isValid) {
      setError("닉네임은 2글자 이상 8글자 이하의 문자, 숫자, 한글만 허용됩니다.");
      setNicknameMessage(null);
      return false;
    }
    return true;
  };

  // 폼 제출 함수
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    if (isNicknameAvailable === null) {
      setNicknameMessage("중복확인을 해주세요!");
      setIsSubmitting(false); // 변경 시도를 중단
      return;
    }

    try {
      if (!validateNickname(newNickname)) {
        setIsSubmitting(false); // 변경 시도를 중단
        return;
      }

      if (!isNicknameAvailable) {
        setError("이미 사용 중인 닉네임입니다.");
        setIsSubmitting(false); // 변경 시도를 중단
        return;
      }

      await customAxios.put("user/nicknames", { nickname: newNickname });
      setUserInfo(prev => ({ ...prev, nickname: newNickname }));

      // 성공적으로 제출되면 모달을 닫음
      setModalIsOpen(false);
    } catch (error) {
      console.error("프로필 변경 중 오류 발생:", error);
      setError("프로필 변경 중 오류 발생");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 모달 닫기 함수
  const handleCancel = () => {
    setModalIsOpen(false);
  };
  const handleComplete = () => {
    setModalIsOpen(false);
  };

  const isSubmitEnabled = isNicknameAvailable === true || newNickname === userInfo.nickname;

  return (
    <MyModal
      content={
        <div className={styles.modalContainer}>
          <h2 className={styles.modalTitle}>프로필 수정</h2>
          <EditImage />
          <div className={styles.nickText}>닉네임 수정</div>
          <div className={styles.formGroup}>
            {error && <div className={styles.error}>{error}</div>}
            {nicknameMessage && <div className={styles.message}>{nicknameMessage}</div>}
            <label htmlFor="newNickname">새로운 닉네임 : </label>
            <input
              type="text"
              id="newNickname"
              value={newNickname}
              onChange={handleNicknameChange}
              onBlur={e => checkNicknameAvailability(e.target.value)}
              disabled={isSubmitting}
              className={styles.inputField} // CSS 모듈에서 정의한 클래스를 사용
            />
            <button
              onClick={handleCheckNickname}
              disabled={isSubmitting}
              className={styles.checkButton} // CSS 모듈에서 정의한 클래스를 사용
            >
              중복 확인
            </button>
            <button onClick={handleSubmit} disabled={!isSubmitEnabled} className={styles.submitButton}>
              {isSubmitting ? "변경중.." : "변경"}
            </button>
          </div>
          <div className={styles.buttons}>
            <button
              onClick={handleComplete}
              disabled={isSubmitting}
              className={styles.completeButton} // 완료 버튼에 대한 CSS 클래스를 정의해야 합니다.
            >
              완료
            </button>
            <button
              onClick={handleCancel}
              disabled={isSubmitting}
              className={styles.cancelButton} // CSS 모듈에서 정의한 클래스를 사용
            >
              취소
            </button>
          </div>
          <UserDelete/>          
        </div>
      }
      open={modalIsOpen}
      onClose={handleCancel}
    />
  );
}

export default EditProfileModal;
