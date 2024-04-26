import axios from 'axios';

const BACKEND_URL = '';
const REQUEST_TIMEOUT = 5000;

export const createAPI = () => {
    const api = axios.create({
        baseURL: BACKEND_URL,
        timeout: REQUEST_TIMEOUT,
    });

    api.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
        return config
      }
    )
    
    return api;
};