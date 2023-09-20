import { useEffect, useState } from 'react';
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
  const [check, setCheck] = useState(false);

  useEffect(()=>{
    setCheck(true);
  },[]);

  useEffect(() => {
      if(check == true){
        fetchToken();
        navigate('/');
      }
  }, [check]);

  return (
    <div>
      로그인 중
    </div>
  )
}

export default OAuth2RedirectHandler;
