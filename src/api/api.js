import {request} from '@/util/request.js'

export function topSearchForBaiDu(data) {
    return request({
        url: '/baidu',
        method: 'get',
        data: data
    })
}

export function topSearchForDouYin(data) {
    return request({
        url: '/douyin',
        method: 'get',
        data: data
    })
}

export function topSearchForBilibili(data) {
    return request({
        url: '/bilibili',
        method: 'get',
        data: data
    })
}

export function topSearchForWeiBo(data) {
    return request({
        url: '/weibo',
        method: 'get',
        data: data
    })
}