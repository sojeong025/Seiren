import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function KakaoLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  // Access Token 추출
  const accessTokenParam = searchParams.get("access_token");
  const refreshTokenParam = searchParams.get("refresh_token");
  const isUser = searchParams.get("is_user");

  // Access Token에서 "Bearer " 부분을 제거하고, 공백을 제거
  const accessToken = accessTokenParam
    ? accessTokenParam.replace("Bearer ", "").trim()
    : null;
  
  const refreshToken = refreshTokenParam
    ? refreshTokenParam.replace("Bearer ", "").trim()
    : null;

  // Access Token 출력 (디버깅용)
  console.log("Access Token:", accessToken);

  // accessToken이 있는 경우 /join 페이지로 이동
  const goTo = () => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      if (localStorage.getItem("accessToken") === accessToken) {
        if (isUser === "T") {
          if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
            navigate("/home");
          } else {
            navigate("login")
          }
        } else if (isUser === "F") {
          navigate("/go-join");
        }
      }
    }
  };

  useEffect(() => {
    goTo();
  }, [navigate, accessToken]);
}

export default KakaoLogin