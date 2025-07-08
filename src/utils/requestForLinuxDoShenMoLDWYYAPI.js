import axios from "axios";

export function request(config) {
    const instance = axios.create({
        baseURL: 'https://wyy-api-three.vercel.app',
        timeout: 600000
    });

    // 请求拦截器
    instance.interceptors.request.use(
        config => config,
        error => Promise.reject(error)
    );

    // 响应拦截器
    instance.interceptors.response.use(
        response => response,
        error => {
            console.warn("请求失败，返回空结构：", error.message || error);
            return Promise.resolve({ data: [] }); // 返回一个空数据结构
        }
    );

    return instance(config);
}