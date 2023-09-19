import axios, { AxiosResponse } from 'axios';

const KAKAO_AUTH_URL: string = import.meta.env.VITE_KAKAO_LOGIN_URL;

export const AuthenticationService = {

loginSocialKakao: function(): void {
  window.location.href = KAKAO_AUTH_URL;
},

kakaoLogin: async function(code: string): Promise<AxiosResponse> {
  console.log(code)
  return await axios.get(`/api/oauth/kakao?code=${code}`);
},

};
