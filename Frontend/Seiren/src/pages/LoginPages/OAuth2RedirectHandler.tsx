import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationService } from "./AuthenticationService";

// OAuth2 인증 처리를 위한 컴포넌트
const OAuth2RedirectHandler: React.FC = () => {
  // URL에서 파라미터 추출
  let params = new URL(document.URL).searchParams;
  let code = params.get("code");
  let navigate = useNavigate();
  const [check, setCheck] = useState(false);

  // 토큰 요청 및 저장하는 함수
  async function fetchToken() {
    try {
      const res = await AuthenticationService.kakaoLogin(code as string);
      // console.log('kakaoLogin 성공');
      // console.log(res);

      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("kakaoLogin", "true");

      // JWT 로그인 처리
      await AuthenticationService.registerSuccessfulLoginForJwt(res.data.response.accessToken);
      navigate("/");
    } catch (error) {
      console.log("kakaoLogin 실패");
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
    }
  }, [check]);

  return <div>로그인 중</div>;
};

export default OAuth2RedirectHandler;
