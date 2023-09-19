import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthenticationService } from './AuthenticationService';

const OAuth2RedirectHandler: React.FC = () => {
  let params = new URL(document.URL).searchParams;
  let code = params.get('code');
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await AuthenticationService.kakaoLogin(code as string);
        console.log('kakaoLogin');
        console.log(response.data.data.token);
        console.log(response.data.data.userEmail);
      } catch (error) {
        console.log(code)
        console.log('kakaoLogin 실패');
      }
      navigate('/');
    }

    fetchToken();
  }, [navigate, code]);

  return (
    <div>
      로그인 중
    </div>
  )
}

export default OAuth2RedirectHandler;
