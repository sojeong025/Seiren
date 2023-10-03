import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthenticationService } from './AuthenticationService';

// OAuth2 인증 처리를 위한 컴포넌트
const OAuth2RedirectHandler: React.FC = () => {
  // URL에서 파라미터 추출
  let params = new URL(document.URL).searchParams;
  let code = params.get('code');
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthenticationService.kakaoLogin(code);
        console.log('kakao로그인 성공');
        console.log(response);

        AuthenticationService.registerSuccessfulLoginForJwt(response.data.response.accessToken);
        navigate('/');
      } catch (err) {
        console.log('카카오 로그인 실패', err);
        // 오류 처리 로직을 추가할 수 있습니다.
      }
    };

    fetchData();
  }, [code, navigate]);
    
  return (
    <div>
      로그인 중
    </div>
  )
}

export default OAuth2RedirectHandler;
