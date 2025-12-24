import {request} from '@/utils/requestForUmami.js'
import {getCurrentTimestamp, getTodayStartTimestamp, getAllTimeStartTimestamp} from '@/utils/timeUtils.js'

export function umamiActive() {
    return request({
        url: '/api/websites/4cd4a3c4-926a-4562-80f2-74022dfc93ef/active',
        method: 'get',
    })
}

export function umamiStatsToday() {
    return request({
        url: '/api/websites/4cd4a3c4-926a-4562-80f2-74022dfc93ef/stats',
        method: 'get',
        params: {
            startAt: getTodayStartTimestamp(),
            endAt: getCurrentTimestamp(),
        },
    })
}

export function umamiStatsAll() {
    return request({
        url: '/api/websites/4cd4a3c4-926a-4562-80f2-74022dfc93ef/stats',
        method: 'get',
        params: {
            startAt: getAllTimeStartTimestamp(),
            endAt: getCurrentTimestamp(),
        },
    })
}

export function umamiEventValues(eventName,startTime) {
    return request({
        url: '/api/websites/4cd4a3c4-926a-4562-80f2-74022dfc93ef/event-data/values',
        method: 'get',
        params: {
            event: eventName,
            propertyName: 'value',
            startAt: startTime,
            endAt: getCurrentTimestamp(),
        },
    })
}

