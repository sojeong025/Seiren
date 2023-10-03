import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthenticationService } from './AuthenticationService';

const OAuth2RedirectHandler: React.FC = () => {
  let params = new URL(document.URL).searchParams;
  let code = params.get('code');
  let navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const response = await AuthenticationService.kakaoLogin(code);
        console.log('kakao로그인 성공');
        console.log(response);

        AuthenticationService.registerSuccessfulLoginForJwt(response.data.response.accessToken);
      } catch (err) {
        console.log('카카오 로그인 실패')
      }

      navigate('/');
    };

    handleLogin();
  }, [code, navigate]);
    
  return (
    <div>
      로그인 중
    </div>
  )
}

export default OAuth2RedirectHandler;
