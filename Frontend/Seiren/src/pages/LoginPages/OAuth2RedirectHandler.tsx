import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthenticationService } from './AuthenticationService';

const OAuth2RedirectHandler: React.FC = () => {
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);

  // URL에서 'code' 파라미터 추출
  // const searchParams = new URLSearchParams(window.location.search);
  const code = new URL(window.location.href).searchParams.get("code");

  // 토큰 요청 및 저장하는 함수
  async function fetchToken() {
    try {
      if (code) {
        const res = await AuthenticationService.kakaoLogin(code);
        console.log('kakaoLogin 성공');
        console.log(res.data);

        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem('accessToken', res.data.response.accessToken);

        // JWT 로그인 처리
        AuthenticationService.registerSuccessfulLoginForJwt(res.data.response.accessToken);
      } else {
        console.log('code 파라미터가 없습니다.');
      }
    } catch (error) {
      console.error('kakaoLogin 실패', error);
    }
  }

  // 컴포넌트가 마운트될 때 한 번만 실행
  useEffect(() => {
    setCheck(true);
  }, []);

  // check 상태 변경 시 실행되는 효과
  useEffect(() => {
    if (check === true) {
      fetchToken(); // 토큰 요청 및 저장
      navigate('/');
    }
  }, [check, navigate]);

  return (
    <div>
      로그인 중
    </div>
  );
}

export default OAuth2RedirectHandler;
