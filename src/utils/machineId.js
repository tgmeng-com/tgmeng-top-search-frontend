import FingerprintJS from '@fingerprintjs/fingerprintjs'

let cachedMachineId = null
let fpPromise = null

/**
 * 获取稳定的机器指纹 ID
 */
export async function getMachineId() {
    // 内存缓存（同一次页面生命周期）
    if (cachedMachineId) {
        return cachedMachineId
    }

    // 防止并发重复 load
    if (!fpPromise) {
        fpPromise = FingerprintJS.load()
    }

    const fp = await fpPromise
    const result = await fp.get()

    cachedMachineId = result.visitorId
    return cachedMachineId
}
