import axios from "axios";

const SERVER_ADDRESS = import.meta.env.VITE_BASE_URL;
const S3_ADDRESS = import.meta.env.VITE_S3_URL;

export const customAxios = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
  headers: {
    "Content-Type": "application/json",
  },
});

customAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  async (error) => {
    const originRequest = error.config;

    if (error.response.status === 403 && !originRequest._retry) {
      originRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const headers = {
          "Content-Type": "application/json",
          Authorization_refresh: `Bearer ${refreshToken}`,
        };
        const response = await axios.get(`${SERVER_ADDRESS}/profile`, {
          headers,
        });
        console.log("액세스 및 리프레쉬 토큰 재발급");
        localStorage.setItem("accessToken", response.headers["authorization"]);
        localStorage.setItem(
          "refreshToken",
          response.headers["authorization_refresh"],
        );

        originRequest.headers.Authorization = `Bearer ${response.headers["authorization"]}`;
        return customAxios(originRequest);
      } catch (refreshError) {
        console.log("리프레쉬토큰 보내는 axios에서 에러 발생");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export const fileAxios = axios.create({
  baseURL: `${S3_ADDRESS}`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

fileAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
