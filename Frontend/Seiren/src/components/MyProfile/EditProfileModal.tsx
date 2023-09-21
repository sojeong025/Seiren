import { useState } from 'react';
import styles from './EditProfileModal.module.css';
import axios from 'axios';

const accessToken = localStorage.getItem("accessToken");

function EditProfileModal({ closeModal, updateProfile }) {
  const [newNickname, setNewNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean | null>(null);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setNewNickname(inputValue);
    // 닉네임 유효성 검사: 2글자 이상 8글자 이하, 특수 문자와 공백 포함하지 않음
    const isValid = /^[a-zA-Z0-9가-힣]{2,8}$/.test(inputValue);
    if (isValid) {
      setError(null); // 유효한 경우 에러 메시지를 지웁니다.
    } else {
      setError('닉네임은 2글자 이상 8글자 이하의 문자, 숫자, 한글만 허용됩니다.');
    }
  };

  const checkNicknameAvailability = async () => {
    try {
      const checkNicknameUrl = 'http://192.168.40.134:8080/api/user/nicknames/check';
      const response = await axios.get(checkNicknameUrl, {
        params: { nickname: newNickname }, // params로 닉네임 전달
        headers: {
          Authorization: `Bearer ${accessToken}` // 액세스 토큰을 헤더에 추가
        }
      });
      
      const { apiError, response: isAvailable } = response.data;
  
      if (apiError) {
        setError('닉네임 중복 검사 중 오류 발생');
        setIsNicknameAvailable(null);
      } else {
        setIsNicknameAvailable(isAvailable);
        setError(null); // 에러 메시지 초기화
      }
    } catch (error) {
      console.error('닉네임 중복 검사 중 오류 발생:', error);
      setError('닉네임 중복 검사 중 오류 발생');
    }
  };
  
  
  

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    const nicknameUpdateUrl = 'http://192.168.40.134:8080/api/user/nicknames';

    try {
      // 닉네임 유효성 검사
      const isValid = /^[a-zA-Z0-9가-힣]{2,8}$/.test(newNickname);
      if (!isValid) {
        setError('닉네임은 2글자 이상 8글자 이하의 문자, 숫자, 한글만 허용됩니다.');
        return;
      }

      // 닉네임 중복 검사
      await checkNicknameAvailability();
      if (!isNicknameAvailable) {
        setError('이미 사용 중인 닉네임입니다.');
        return;
      }

      // 닉네임 업데이트 요청
      await axios.put(nicknameUpdateUrl, { nickname: newNickname }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // 업데이트 성공 시 프로필 업데이트 후 모달 닫기
      updateProfile({ nickname: newNickname });
      closeModal();
    } catch (error) {
      console.error('프로필 변경 중 오류 발생:', error);
      setError('프로필 변경 중 오류 발생');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className={styles.modalContainer}>
      <h2 className={styles.modalTitle}>Edit Profile</h2>
      {error && <div className={styles.error}>{error}</div>}
      {isNicknameAvailable === false && <div className={styles.error}>이미 사용 중인 닉네임입니다.</div>}
      <div className={styles.formGroup}>
        <label htmlFor="newNickname">New Nickname:</label>
        <input
          type="text"
          id="newNickname"
          value={newNickname}
          onChange={handleNicknameChange}
          onBlur={checkNicknameAvailability} // 입력 완료 후 중복 검사
          disabled={isSubmitting}
          className={styles.inputField}
        />
      </div>
      <div className={styles.buttons}>
        <button onClick={handleSubmit} disabled={isSubmitting} className={styles.submitButton}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        <button onClick={handleCancel} disabled={isSubmitting} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditProfileModal;
