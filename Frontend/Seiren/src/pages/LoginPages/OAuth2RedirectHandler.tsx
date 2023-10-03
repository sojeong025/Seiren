import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OAuth2RedirectHandler: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 파라미터 추출
    const params = new URL(window.location.href).searchParams;
    const code = params.get('code');

    // 토큰 요청 및 저장
    async function fetchToken() {
      try {
        if (code) {
          const response = await axios.get(`/api/login/oauth2/code/kakao?code=${code}`);
          console.log('kakaoLogin 성공');
          console.log(response.data);

          // 토큰을 로컬 스토리지에 저장
          localStorage.setItem('accessToken', response.data.accessToken);

          // JWT 로그인 처리 또는 다른 로직을 수행
          // AuthenticationService.registerSuccessfulLoginForJwt(response.data.accessToken);
        } else {
          console.error('인증 코드가 없습니다.');
        }
      } catch (error) {
        console.error('kakaoLogin 실패', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchToken();
  }, [navigate]);

  if (isLoading) {
    return <div>로그인 중...</div>;
  }

  return <div>로그인 완료!</div>;
};

export default OAuth2RedirectHandler;
