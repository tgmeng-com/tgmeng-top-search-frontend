import {request} from '@/utils/requestForUmami.js'
import {getCurrentTimestamp, getTodayStartTimestamp, getAllTimeStartTimestamp} from '@/utils/timeUtils.js'

export function umamiActive() {
    return request({
        url: '/api/websites/c05acefd-a67e-44f3-8146-1f72dda7ec6a/active',
        method: 'get',
    })
}

export function umamiStatsToday() {
    return request({
        url: '/api/websites/c05acefd-a67e-44f3-8146-1f72dda7ec6a/stats',
        method: 'get',
        params: {
            startAt: getTodayStartTimestamp(),
            endAt: getCurrentTimestamp(),
        },
    })
}

export function umamiStatsAll() {
    return request({
        url: '/api/websites/c05acefd-a67e-44f3-8146-1f72dda7ec6a/stats',
        method: 'get',
        params: {
            startAt: getAllTimeStartTimestamp(),
            endAt: getCurrentTimestamp(),
        },
    })
}