import axios, { AxiosResponse } from 'axios';

const KAKAO_AUTH_URL: string = import.meta.env.VITE_KAKAO_LOGIN_URL;

export const AuthenticationService = {

loginSocialKakao: function(): void {
  window.location.href = KAKAO_AUTH_URL;
  console.log('1');
},

kakaoLogin: async function(code: string): Promise<AxiosResponse> {
  console.log('2');
  return await axios.get(`https://j9e105.p.ssafy.io/api/login/oauth2/code/kakao?code=${code}`);
},

registerSuccessfulLoginForJwt: function( accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
},

};