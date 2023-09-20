import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthenticationService } from './AuthenticationService';

const OAuth2RedirectHandler: React.FC = () => {
  let params = new URL(document.URL).searchParams;
  let code = params.get('code');
  let navigate = useNavigate();
  
  async function fetchToken() {
    try {
        const res = await AuthenticationService.kakaoLogin(code as string);
        console.log('kakaoLogin 성공');
        console.log(res);
        AuthenticationService.registerSuccessfulLoginForJwt(res.data.response.accessToken);
    } catch (error) {
      console.log('kakaoLogin 실패');
    }
  }


  useEffect(() => {
    let act = localStorage.getItem("accessToken");
    if(act === null){
      fetchToken();
      navigate('/');
    }
  }, []);

  return (
    <div>
      로그인 중
    </div>
  )
}

export default OAuth2RedirectHandler;
