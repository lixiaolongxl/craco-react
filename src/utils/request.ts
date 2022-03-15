import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import store from "../store/index";
import { message } from 'antd';

// import baseURL from '../config/index'


const service: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_HOST, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000, // request timeout
    // headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/x-www-form-urlencoded"
    // },
    // transformRequest: [
    //     function(data) {
    //       //由于使用的 form-data传数据所以要格式化

    //       data = qs.stringify(data);
    //       return data;
    //     }
    // ]
})

service.interceptors.request.use((config: AxiosRequestConfig) => {
    if (store.getState().userReducer) {
        // config.headers['session'] = store.getState().userReducer?.token
    }
    return config
}, error => {
    return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use((response: AxiosResponse) => {
    const res = response.data
    if (res.status_code !== 200) {
        if (res.status_code == 400) {
            message.error({
                content: res.msg,
                // duration: 100,
                className: 'custom-class',

            });
            // message.error(res.msg, 100);
        }

        return Promise.reject('error')
    }
    // console.log(response.data);
    return response.data;
}, error => {
    // message.error(error.msg);
})
export default service