import React, { useEffect, useState } from 'react'; // React 라이브러리에서 필요한 모듈 및 훅 가져오기
import styles from './MyInfo.module.css'; // 스타일 시트 가져오기
import avatar from '../../assets/preview.png'; // 이미지 가져오기

function MyInfo() {
  // userData 상태와 setUserData 함수를 생성하고 초기값으로 객체를 지정
  const [userData, setUserData] = useState({
    nickname: null,    // 닉네임 데이터
    profileImg: null,  // 프로필 이미지 데이터
  });

  useEffect(() => {
    // useEffect를 사용하여 컴포넌트가 마운트될 때 한 번만 실행되는 비동기 함수 정의
    async function fetchUserData() {
      try {
        // API 요청 보내기
        const response = await fetch('http://192.168.40.134:8080/api/user', {
          headers: {
            'accept': 'application/json;charset=UTF-8',  // 요청 헤더 설정
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdXRlQGN1dGUuY29tIiwiaWF0IjoxNjk1MTc5NTM1LCJleHAiOjE2OTUxODU1MzV9.h_e6uNCr1HSTy5Q28Y9jLe0p2gyAgWWrKnymIlJ_Ix0',
          },
        });

        if (!response.ok) {
          throw new Error('API 요청이 실패했습니다.'); // 오류 처리: 응답이 성공적이지 않으면 오류 발생
        }

        const data = await response.json(); // JSON 응답 데이터 파싱
        setUserData(data.response); // userData 상태를 업데이트하여 API에서 받은 데이터 저장
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error); // 오류 발생 시 콘솔에 오류 메시지 출력
      }
    }

    fetchUserData(); // fetchUserData 함수 호출하여 API 데이터 가져오기
  }, []); // useEffect는 한 번만 실행되도록 빈 배열을 전달

  return (
    <div className={styles.profileContainer}> {/* 스타일링 클래스를 포함한 div 요소 */}
      <img className={styles.profileImage} src={userData.profileImg || avatar} alt="Profile" /> {/* 프로필 이미지를 표시, userData.profileImg가 없으면 기본 이미지를 사용 */}
      <div>
        <div className={styles.nickName}>{userData.nickname || 'Default Nickname'}</div> {/* 닉네임을 표시, userData.nickname이 없으면 'Default Nickname'을 표시 */}
        <div className={styles.feel}>#뭘보노 #보노보노야 #앙?</div> {/* 감정 표현을 표시 */}
      </div>
    </div>
  );
}

export default MyInfo; // MyInfo 컴포넌트를 다른 컴포넌트에서 재사용할 수 있도록 내보내기
