import axios from "axios";

<<<<<<< HEAD
const SERVER_ADDRESS = `https://j9e105.p.ssafy.io`;
=======
const SERVER_ADDRESS = `http://j9e105.p.ssafy.io:8082`;
>>>>>>> e82f6607ea1ec22087fe3660df00e9b1d278359e

export const customAxios = axios.create({
  baseURL: `${SERVER_ADDRESS}/api/`,
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
  (error) => {
    return Promise.reject(error);
  },
);