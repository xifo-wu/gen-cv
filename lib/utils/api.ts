import axios from 'axios';

const TOKEN_KEY = 'accessToken';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  ...(process.env.NODE_ENV !== 'production' && { baseURL }),
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem(TOKEN_KEY);
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err: any) => {
    // 请求错误，这里可以用全局提示框进行提示
    return Promise.reject(err);
  },
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response) {
      return Promise.reject({
        ...error.response.data,
        httpStatus: error.response.status,
      });
    }

    return Promise.reject(error);
  }
)

export default api;
