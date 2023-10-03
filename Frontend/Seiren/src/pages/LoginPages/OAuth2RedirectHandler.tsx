import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthenticationService } from './AuthenticationService.tsx';

const OAuth2RedirectHandler: React.FC = () => {
  let params = new URL(window.document.URL).searchParams;
  let code = params.get('code');
  let navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);

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

      setLoading(false);
      navigate('/');
    };

    handleLogin();
  }, [code, navigate]);
    
  return (
    <></>
  )
}

export default OAuth2RedirectHandler;

