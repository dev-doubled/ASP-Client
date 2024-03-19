import axios from "axios";
import TokenService from "./tokenService";

const excludedRoutes = [
  "/auth/login",
  "/auth/signup",
  "/auth/google",
  "/auth/token",
  "/auth/logout",
];

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

let isRefreshing = false;
let refreshQueue = [];

api.interceptors.request.use(async (config) => {
  const accessToken = TokenService.getAccessToken();
  if (
    accessToken &&
    !excludedRoutes.some((route) => config.url.includes(route))
  ) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshToken = TokenService.getRefreshToken();
          const response = await api.post("/auth/token", { refreshToken });
          const newAccessToken = response.data.accessToken;
          TokenService.setAccessToken(newAccessToken);

          // Retry the queued requests with the new access token
          refreshQueue.forEach((cb) => cb(newAccessToken));
          refreshQueue = [];
          isRefreshing = false;

          // Retry the original request now that the token has been refreshed
          return api(originalRequest);
        } catch (error) {
          console.error("Error refreshing token:", error);
          TokenService.removeTokens();
          return Promise.reject(error);
        }
      } else {
        // If token is already being refreshed, queue the request
        return new Promise((resolve) => {
          refreshQueue.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }
    }

    return Promise.reject(error);
  }
);

export default api;
