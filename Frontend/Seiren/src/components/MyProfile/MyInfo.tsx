import React, { useEffect, useState } from 'react';
import styles from './MyInfo.module.css';
import avatar from '../../assets/preview.png';

function MyInfo() {
  const [userData, setUserData] = useState({
    nickname: null,
    profileImg: null,
  });

  const [isEditing, setIsEditing] = useState(false); // 모달 열기 상태 추가
  const [editedUserData, setEditedUserData] = useState({
    nickname: '',
    profileImg: null,
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch('http://192.168.40.134:8080/api/user', {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdXRlQGN1dGUuY29tIiwiaWF0IjoxNjk1MTkwODg2LCJleHAiOjE2OTUxOTY4ODZ9.9Oo4NgBUE-E_-c-oYuispYl8M960-E76Vc0Cs3Gnx9s',
          },
        });

        if (!response.ok) {
          throw new Error('API 요청이 실패했습니다. 응답 상태 코드: ' + response.status);
        }

        const text = await response.text();
        console.log('서버 응답 텍스트:', text);

        try {
          const data = JSON.parse(text);
          console.log('서버에서 받은 데이터:', data);
          if (data.success && data.response) {
            setUserData(data.response);
          } else {
            throw new Error('올바른 데이터 형식이 아닙니다.');
          }
        } catch (error) {
          throw new Error('JSON 파싱 오류: ' + error.message);
        }
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error.message);
      }
    }

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true); // 모달 열기
    // 현재 사용자 데이터로 초기화
    setEditedUserData({
      nickname: userData.nickname || '',
      profileImg: null, // 프로필 이미지 초기화
    });
  };

  const handleModalClose = () => {
    setIsEditing(false); // 모달 닫기
  };

  const handleSaveProfile = () => {
    // 수정된 데이터를 서버에 보내고 저장하는 로직 추가
    // editedUserData를 서버로 보내고, 서버 응답을 처리하는 로직을 추가
    // 수정된 데이터를 userData에 업데이트
    setUserData({
      nickname: editedUserData.nickname,
      profileImg: editedUserData.profileImg || avatar,
    });
    setIsEditing(false); // 모달 닫기
  };

  return (
    <div className={styles.profileContainer}>
      <img className={styles.profileImage} src={userData.profileImg || avatar} alt="Profile" />
      <div>
        <div className={styles.nickName}>{userData.nickname || 'Default Nickname'}</div>
        <button onClick={handleEditClick}>Edit Profile</button>
        <div className={styles.feel}>#뭘보노 #보노보노야 #앙?</div>
      </div>

      {/* 모달 열기 */}
      {isEditing && (
        <div className={styles.modalOverlay}>
          <div className={styles.editModal}>
            <h2>Edit Profile</h2>
            <label>
              Nickname:
              <input
                type="text"
                value={editedUserData.nickname}
                onChange={(e) => setEditedUserData({ ...editedUserData, nickname: e.target.value })}
              />
            </label>
            <label>
              Profile Image:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setEditedUserData({ ...editedUserData, profileImg: e.target.files[0] })}
              />
            </label>
            <button onClick={handleSaveProfile}>Save</button>
            <button onClick={handleModalClose}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyInfo;
