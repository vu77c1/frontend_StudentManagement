import axios from 'axios';
import NProgress from 'nprogress';

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
})
//Add a request interceptor
instance.interceptors.request.use(function (config) {
  NProgress.start();

  if (typeof window !== "undefined" && window
      && window.localStorage
      && window.localStorage.getItem('access_token')) {
    config.headers.Authorization = 'Bearer ' + window.localStorage.getItem(
        'access_token');
  }
  return config;
}, function (error) {
  NProgress.done();

  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  NProgress.done();

  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  if (response.data && response.data.data) {
    return response.data;
  }
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  NProgress.done();
  if (error.response && error.response.data) {
    return error.response.data;
  }
  return Promise.reject(error);
});
export default instance;