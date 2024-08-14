import { useEffect } from "react";
import axios from "axios";


const useAxiosFtech = () => {
    const axiosinstance = axios.create({
        baseURL: 'http://localhost:5000',
      });

      useEffect(() => {

        // request Interceptors 
        const requestInterceptor = axios.interceptors.request.use((config) => {
            // Do something before request is sent
            return config;
          }, function (error) {
            // Do something with request error
            return Promise.reject(error);
          });

          // Response Interceptor
          const responseInterceptor = axios.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
          }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
          });
          return () => {
            axiosinstance.interceptors.request.eject(requestInterceptor);
            axiosinstance.interceptors.response.eject(responseInterceptor);
          }
      },[axiosinstance])
  return axiosinstance;
}

export default useAxiosFtech