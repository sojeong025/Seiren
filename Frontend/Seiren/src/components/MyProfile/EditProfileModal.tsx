import React, { useState } from 'react';
import styles from './EditProfileModal.module.css'; // CSS 모듈을 불러옵니다.

function EditProfileModal({ isOpen, onClose, onSave, userData }) {
  const [editedUserData, setEditedUserData] = useState(userData);

  const handleNicknameChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  const handleImageChange = (e) => {
    // 이미지 업로드 로직 구현
  };

  const handleSubmit = () => {
    onSave(editedUserData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}> {/* CSS 모듈 클래스를 적용합니다. */}
      <div className={styles.modalContent}> {/* CSS 모듈 클래스를 적용합니다. */}
        <h2>Edit Profile</h2>
        <label>
          Nickname:
          <input
            type="text"
            name="nickname"
            value={editedUserData.nickname}
            onChange={handleNicknameChange}
          />
        </label>
        <label>
          Profile Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        <button onClick={handleSubmit} className={styles.saveButton}>Save</button> {/* CSS 모듈 클래스를 적용합니다. */}
        <button onClick={onClose} className={styles.cancelButton}>Cancel</button> {/* CSS 모듈 클래스를 적용합니다. */}
      </div>
    </div>
  );
}

export default EditProfileModal;
