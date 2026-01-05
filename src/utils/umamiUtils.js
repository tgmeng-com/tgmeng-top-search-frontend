import {getMachineId} from "@/utils/machineId";

/**
 * Umami 统计工具类
 */
class UmamiTracker {
    async track(eventName, payload = {}) {
        if (window.umami && typeof window.umami.track === 'function') {
            const machineId = await getMachineId()
            const licenseCode = localStorage.getItem('licenseCode')
            window.umami.track(eventName, {
                machineId, licenseCode, ...payload
            })
        }
    }
}

export default new UmamiTracker();