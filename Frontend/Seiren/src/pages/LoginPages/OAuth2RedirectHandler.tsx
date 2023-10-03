import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom/dist/index";
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
        
        localStorage.setItem('kakoalogin', 'true');

        AuthenticationService.registerSuccessfulLoginForJwt(response.data.response.accessToken);
      } catch (err) {
        console.log('카카오 로그인 실패')
      }

      setLoading(false);
      navigate('/');
    };

    handleLogin();
  }, [code]);
    
  return (
    <div>{params}</div>
  )
}

export default OAuth2RedirectHandler;

