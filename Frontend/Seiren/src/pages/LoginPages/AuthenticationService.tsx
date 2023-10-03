import axios, { AxiosResponse } from 'axios';

const KAKAO_AUTH_URL: string = import.meta.env.VITE_KAKAO_LOGIN_URL;

export const AuthenticationService = {

loginSocialKakao: function(): void {
  window.location.href = KAKAO_AUTH_URL;
},

kakaoLogin: async function(code: string): Promise<AxiosResponse> {
  console.log(code)
  return await axios.get(`http://j9e105.p.ssafy.io:8082/api/login/oauth2/code/kakao?code=${code}`);
},

registerSuccessfulLoginForJwt: function( accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
},

};