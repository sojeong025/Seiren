import { useEffect } from 'react';

const KakaoSocialLogin = () => {
  useEffect(() => {
    const initializeKakaoSDK = async () => {
      // 카카오 SDK 스크립트 동적으로 추가
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.async = true;
      document.head.appendChild(script);

      // SDK 스크립트 로드 완료 시 실행할 함수
      script.onload = () => {
        // Kakao.init()을 호출하여 SDK 초기화
        window.Kakao.init('54ce58b67b0d0addc6c9d8071b45a833');
        
        // 카카오 소셜 로그인 버튼 생성
        window.Kakao.Auth.createLoginButton({
          container: '#kakao-login-btn',
          success: (authObj) => {
            // 로그인 성공 시 처리할 로직 작성
            console.log('로그인 성공:', authObj);
          },
          fail: (err) => {
            // 로그인 실패 시 처리할 로직 작성
            console.error('로그인 실패:', err);
          },
        });
      };
    };

    initializeKakaoSDK();
  }, []);

  return (
    <div>
      <h1>카카오 소셜 로그인</h1>
      <div id="kakao-login-btn"></div>
    </div>
  );
};

export default KakaoSocialLogin;
