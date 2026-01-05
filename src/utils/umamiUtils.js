import {getMachineId} from "@/utils/machineId";

/**
 * Umami 统计工具类
 */
class UmamiTracker {
    async track(eventName, payload = {}) {
        if (!window.umami || typeof window.umami.track !== 'function') return

        const machineId = await getMachineId()
        const licenseCode = localStorage.getItem('licenseCode')

        const {
            href,
            pathname,
            search
        } = window.location

        const properties = {
            // 业务标识
            machineId,
            licenseCode,

            // 页面上下文
            url: href,
            path: pathname,
            query: search,
            title: document.title,
            referrer: document.referrer,

            // 设备 & 环境
            userAgent: navigator.userAgent,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            platform: navigator.platform,
            screen: `${window.screen.width}x${window.screen.height}`,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            deviceType: /Mobi|Android|iPhone/i.test(navigator.userAgent)
                ? 'mobile'
                : 'desktop',

            // 允许调用方覆盖
            ...payload
        }

        window.umami.track(eventName, properties)
    }
}

export default new UmamiTracker();