import axios from "axios";
import { getMachineId } from "@/utils/machineId"
import umami from '@/utils/umamiUtils'

export function request(config) {
    const instance = axios.create({
        // TODO 替换为你自己的后端接口地址
        baseURL: process.env.VUE_APP_API_BASE_URL || window.APP_CONFIG?.VUE_APP_API_BASE_URL ||  'http://127.0.0.1:4399/api/',
        // baseURL: 'http://127.0.0.1:4399/api/',
        timeout: 600000
    });

    // 请求拦截器
    instance.interceptors.request.use(
        async config => {
            config.metadata = { startTime: Date.now() }
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
        response => {
            trackApi(response.config, 'success')
            return response
        },
        error => {
            if (error.config) {
                trackApi(error.config, 'error', error)
            }
            console.warn("请求失败，返回空结构：", error.message || error);
            return Promise.resolve({ data: [] }); // 返回一个空数据结构
        }
    );

    return instance(config);
}

function trackApi(config, status, error) {
    umami.track('api_request', {
        api_method: config.method?.toUpperCase(),
        api_base: config.baseURL || null,
        api_path: config.url,
        api_status: status,
        api_duration: Date.now() - (config.metadata?.startTime || Date.now()),
        api_error: status === 'error' ? error?.message : undefined
    })
}
