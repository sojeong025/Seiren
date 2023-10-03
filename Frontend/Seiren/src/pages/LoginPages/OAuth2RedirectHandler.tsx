import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from 'axios'; // Axios 추가
import { AuthenticationService } from './AuthenticationService';

const OAuth2RedirectHandler: React.FC = () => {
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // URL에서 'code' 파라미터 추출
        const code = new URL(window.location.href).searchParams.get("code");

        if (code) {
          // 서버로 GET 요청 보내기
          const response: AxiosResponse = await axios.get(
            `https://j9e105.p.ssafy.io/api/login/oauth2/code/kakao?code=${code}`
          );

          console.log('kakaoLogin 성공');
          console.log(response.data);

          // 토큰을 로컬 스토리지에 저장
          localStorage.setItem('accessToken', response.data.response.accessToken);

          // JWT 로그인 처리
          AuthenticationService.registerSuccessfulLoginForJwt(response.data.response.accessToken);
        } else {
          console.log('code 파라미터가 없습니다.');
        }
      } catch (error) {
        console.error('kakaoLogin 실패', error);
      } finally {
        // 컴포넌트 마운트 상태 변경
        setCheck(true);
      }
    };

    // 컴포넌트 마운트 시 fetchToken 함수 호출
    fetchToken();
  }, []);

  // check 상태 변경 시 실행되는 효과
  useEffect(() => {
    if (check === true) {
      // 로그인 성공 후 리디렉션
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
