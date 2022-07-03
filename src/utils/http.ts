import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const defaultsConfig = {
  baseURL: import.meta.env.DEV
    ? 'http://localhost:9000/proxy'
    : 'http://110.42.184.111',
  timeout: 5000
};

class Http {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  private static axiosInstance = axios.create(defaultsConfig);

  // 请求拦截
  // Add a request interceptor
  private httpInterceptorsRequest() {
    Http.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // Do something before request is sent
        return config;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      }
    );
  }

  // 响应拦截
  // Add a response interceptor
  private httpInterceptorsResponse() {
    Http.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      }
    );
  }

  public async get(url: string, config?: AxiosRequestConfig) {
    const response = await Http.axiosInstance.get(url, config);
    return response.data;
  }

  public async post(url: string, config: AxiosRequestConfig) {
    const response = await Http.axiosInstance.post(url, config);
    return response.data;
  }
}

export const http = new Http();
