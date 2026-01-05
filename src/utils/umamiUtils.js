import {getMachineId} from "@/utils/machineId";

/**
 * Umami 统计工具类
 */
class UmamiTracker {
    track(eventName,) {
        if (window.umami && typeof window.umami.track === 'function') {
            const machineId = getMachineId()
            const licenseCode = localStorage.getItem('licenseCode')
            window.umami.track(eventName + " 丨🤖:" + machineId +  " 丨🔑:" + licenseCode);
        }
    }
}

export default new UmamiTracker();