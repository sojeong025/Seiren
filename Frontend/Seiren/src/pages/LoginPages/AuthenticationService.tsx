import axios, { AxiosResponse } from 'axios';

const KAKAO_AUTH_URL: string = import.meta.env.VITE_KAKAO_LOGIN_URL;

export const AuthenticationService = {
  loginSocialKakao: function(): void {
    window.location.href = KAKAO_AUTH_URL;
  },

  kakaoLogin: async function(code: string): Promise<AxiosResponse> {
    try {
      console.log('Received code:', code);
      const response = await axios.get(`http://j9e105.p.ssafy.io/api/login/oauth2/code/kakao?code=${code}`);
      console.log('kakaoLogin 성공');
      console.log(response.data);

      // 토큰을 로컬 스토리지에 저장[오류??]
      localStorage.setItem('accessToken', response.data.accessToken);

      return response;
    } catch (error) {
      console.error('kakaoLogin 실패', error);

      // 오류 발생 시 오류 정보를 반환하거나 다른 오류 처리 로직을 추가할 수 있습니다.
      throw error;
    }
  },

  registerSuccessfulLoginForJwt: function(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  },
};
