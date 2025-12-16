import axios from "axios";

export function request(config) {
    const instance = axios.create({
        baseURL:  process.env.VUE_APP_UMAMI_BASE_URL || window.APP_CONFIG?.VUE_APP_UMAMI_BASE_URL || 'https://umami.test.com/',
        timeout: 600000,
        headers: {
            Authorization: process.env.VUE_APP_UMAMI_AUTH || window.APP_CONFIG?.VUE_APP_UMAMI_AUTH || 'Bearer 123456'
        }
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