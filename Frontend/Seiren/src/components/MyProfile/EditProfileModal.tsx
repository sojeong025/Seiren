        import React, { useState } from 'react';
        import styles from './EditProfileModal.module.css';

        const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJudWxsIiwiaWF0IjoxNjk1MjU2MDE5LCJleHAiOjE2OTUyNjIwMTl9.0kdhfY7hAgED-kSkmERl0vyLtrEQBTBSDKcY5JWB2Qo'; // 여기에 액세스 토큰을 추가하세요

        function EditProfileModal({ closeModal, updateProfile }) {
        const [newNickname, setNewNickname] = useState('');
        const [newProfileImg, setNewProfileImg] = useState<File | null>(null);
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [error, setError] = useState<string | null>(null);

        const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setNewNickname(e.target.value);
        };

        const handleProfileImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
            setNewProfileImg(e.target.files[0]);
            }
        };

        const handleSubmit = async () => {
            setIsSubmitting(true);
            setError(null); // 이전 에러 초기화

            // JSON 형식의 데이터를 포함하는 PUT 요청
            const apiUrl = 'http://192.168.40.134:8080/api/user/nicknames';

            try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
             // JSON 형식의 데이터를 보냄
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
                body: { "nickname": newNickname }, // JSON 형식의 데이터 전송
            });
            console.log(response)
            // if (!response.ok) {
            //     throw new Error('닉네임 변경 실패');
            // }

            // 프로필 업데이트 후, 새로운 프로필 데이터를 상위 컴포넌트로 전달
            updateProfile({ nickname: newNickname });

            // 변경 성공 시 모달 닫기
            closeModal();
            } catch (error) {
            console.error('프로필 변경 중 오류 발생:', error);
            setError('프로필 변경 중 오류 발생');
            } finally {
            setIsSubmitting(false);
            }
        };

        return (
            <div className={styles.modalContainer}>
            <h2>Edit Profile</h2>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.formGroup}>
                <label htmlFor="newNickname">New Nickname:</label>
                <input
                type="text"
                id="newNickname"
                value={newNickname}
                onChange={handleNicknameChange}
                disabled={isSubmitting}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="newProfileImg">New Profile Image:</label>
                <input
                type="file"
                id="newProfileImg"
                accept="image/*"
                onChange={handleProfileImgChange}
                disabled={isSubmitting}
                />
            </div>                                                                                                                  
            <button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            </div>
        );
        }

        export default EditProfileModal;
