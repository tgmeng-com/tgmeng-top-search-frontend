import axios from "axios";
import { getMachineId } from "@/utils/machineId"

export function request(config) {
    const instance = axios.create({
        // TODO 替换为你自己的后端接口地址
        // baseURL: process.env.VUE_APP_API_BASE_URL || window.APP_CONFIG?.VUE_APP_API_BASE_URL ||  'http://127.0.0.1:4399/api/',
        // baseURL: 'http://127.0.0.1:4399/api/',
        baseURL: 'https://trendapi.tgmeng.com/api/',
        timeout: 600000
    });

    // 请求拦截器
    instance.interceptors.request.use(
        async config => {
            const machineId = await getMachineId()
            config.headers['X-Machine-Id'] = machineId
            // 优先使用函数里提交的code，没有的话再拿缓存里的
            if (!config.headers['X-License-Code']) {
                const licenseCode = localStorage.getItem('licenseCode')
                if (licenseCode) {
                    config.headers['X-License-Code'] = licenseCode
                }
            }
            return config
        },
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
