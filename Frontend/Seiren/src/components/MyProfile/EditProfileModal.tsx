// EditProfileModal.js

import React, { useState } from 'react';

function EditProfileModal({ initialNickname, initialProfileImage, onSave, onClose }) {
  const [nickname, setNickname] = useState(initialNickname);
  const [profileImage, setProfileImage] = useState(initialProfileImage);

  const handleSave = () => {
    // 수정된 정보를 onSave 콜백 함수를 통해 부모 컴포넌트로 전달
    onSave({ nickname, profileImage });
    onClose(); // 모달 닫기
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <label>Nickname:</label>
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <label>Profile Image URL:</label>
      <input
        type="text"
        value={profileImage}
        onChange={(e) => setProfileImage(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default EditProfileModal;
