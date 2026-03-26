import axios from 'axios';
import Cookies from 'js-cookie';

// Get base URL from environment variable, default to the local backend URL for dev
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const customInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to inject the auth token if needed
customInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor for generic error handling if needed
customInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Orval needs a function that takes AxiosRequestConfig and returns a Promise
export const customAxiosInstance = <T>(
  config: import('axios').AxiosRequestConfig,
  options?: import('axios').AxiosRequestConfig,
): Promise<T> => {
  const source = axios.CancelToken.source();
  const promise = customInstance({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // Allow cancellation of requests
  // @ts-expect-error Orval adds cancel property to the promise
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};
