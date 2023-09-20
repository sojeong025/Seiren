import React, { useState, useEffect } from 'react';
import styles from './MyInfo.module.css';
import avatar from '../../assets/preview.png';
import EditProfileModal from './EditProfileModal';

function MyInfo() {
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 추가

  useEffect(() => {
    // Access Token 값을 가져온다고 가정
    const accessToken = 'YOUR_ACCESS_TOKEN'; // 실제 Access Token 값으로 대체

    // API 호출 예시 (실제 API 엔드포인트 및 데이터 형식에 따라 수정 필요)
    fetch('http://192.168.40.134:8080/api/user', {
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Access Token을 헤더에 추가
      },
    })
      .then((response) => {
        if (!response.ok) {
          // API 호출이 실패하면 로그인을 유도하는 문구를 표시하고 로그인 상태를 변경
          setIsLoggedIn(false);
          throw new Error('API 호출 실패');
        }
        return response.json();
      })
      .then((data) => {
        setNickname(data.nickname);
        setProfileImage(data.profileImage);
        setIsLoading(false);
        setIsLoggedIn(true); // API 호출 성공 시 로그인 상태 변경
      })
      .catch((error) => {
        console.error('API 호출 오류:', error);
        setError(error);
        setIsLoading(false);
        setIsLoggedIn(false);
      });
  }, []);

  // 모달 열기 함수
  const openEditModal = () => {
    setIsEditing(true);
  };

  // 모달 닫기 함수
  const closeEditModal = () => {
    setIsEditing(false);
  };

  // 모달에서 수정된 정보 저장 함수
  const saveProfileChanges = ({ nickname, profileImage }) => {
    // API 호출 또는 상태 업데이트를 통해 수정된 정보를 저장
    // 예: API 호출 또는 setNickname, setProfileImage 호출
    setNickname(nickname);
    setProfileImage(profileImage);
  };

  return (
    <div className={styles.profileContainer}>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : isLoggedIn ? ( // 로그인 상태를 확인하여 표시할 내용 변경
        <>
          <img className={styles.profileImage} src={profileImage} alt="Profile" />
          <div>
            <div className={styles.nickName}>{nickname}</div>
            <div className={styles.feel}>#뭘보노 #보노보노야 #앙?</div>
            <button onClick={openEditModal}>Edit</button>
          </div>
        </>
      ) : (
        <div>Please log in to see your profile.</div> // 로그인을 유도하는 문구
      )}

      {/* 모달 열기/닫기 상태에 따라 모달을 렌더링 */}
      {isEditing && (
        <EditProfileModal
          initialNickname={nickname}
          initialProfileImage={profileImage}
          onSave={saveProfileChanges}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
}

export default MyInfo;
