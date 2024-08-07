import axios from 'axios';
// import { checkAuthAction } from '../store/api-actions';
// import { useAppDispatch } from '../hooks/hook';
// import { APIRoute } from '../const';

const BACKEND_URL = 'https://tabletime-production.up.railway.app';
// const BACKEND_URL = 'http://localhost:8080/';
// const dispatch = useAppDispatch();
// const REQUEST_TIMEOUT = 5000;

export const createAPI = () => {
    const api = axios.create({
        baseURL: BACKEND_URL,
        // timeout: REQUEST_TIMEOUT,
        // withCredentials: true,
    });

    api.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
        return config
      }
    )

    api.interceptors.response.use(
      (config) => {
        return config;
      },
      async (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          // dispatch(checkAuthAction());
          // window.location.reload();
        // const originalRequest = {...error.config};
        // originalRequest._isRetry = true; 
        // if (
        //   error.response.status === 401 && 
        //   error.config &&
        //   !error.config._isRetry
        // ) {
        //   try {
        //     const response = await api.get(APIRoute.Refresh);
        //     if (response.status === 200) {
        //       const token = response.data.accessToken;
        //       localStorage.setItem("token", token);
        //       return api.request(originalRequest);
        //     }
        //   } catch (error) {
        //     if (error.response && error.response.status === 403) {
        //       localStorage.removeItem("token");
        //       window.location.reload();
        //     } else {
        //       console.log("AUTH ERROR");
        //     }
        //   }
        }
        throw error;
      }
    );
    
    
    return api;
};