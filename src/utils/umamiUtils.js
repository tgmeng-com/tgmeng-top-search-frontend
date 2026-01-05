import {getMachineId} from "@/utils/machineId";

/**
 * Umami 统计工具类
 */
class UmamiTracker {
    async track(eventName, payload = {}) {
        if (!window.umami || typeof window.umami.track !== 'function') return

        const machineId = await getMachineId()
        const licenseCode = localStorage.getItem('licenseCode')

        const { href, pathname, search } = window.location

        window.umami.track(eventName, {
            /* ========== 身份 ========== */
            machineId,
            licenseCode,
            /* ========== 页面上下文（page_ 前缀） ========== */
            page_url: href,
            page_path: pathname,
            page_query: search,
            page_title: document.title,
            page_referrer: document.referrer || null,
            /* ========== 设备 & 环境 ========== */
            userAgent: navigator.userAgent,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            platform: navigator.platform,
            screen: `${window.screen.width}x${window.screen.height}`,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            deviceType: /Mobi|Android|iPhone/i.test(navigator.userAgent)
                ? 'mobile'
                : 'desktop',

            /* ========== 业务字段（永远最后） ========== */
            ...payload
        })
    }
}

export default new UmamiTracker();