import {request} from '@/util/request.js'

export function topSearchForBaiDu(data) {
    return request({
        url: '/topsearch/baidu',
        method: 'get',
        data: data
    })
}

export function topSearchForDouYin(data) {
    return request({
        url: '/topsearch/douyin',
        method: 'get',
        data: data
    })
}

export function topSearchForBilibili(data) {
    return request({
        url: '/topsearch/bilibili',
        method: 'get',
        data: data
    })
}

export function topSearchForWeiBo(data) {
    return request({
        url: '/topsearch/weibo',
        method: 'get',
        data: data
    })
}

export function topSearchForGitHubAllStars(data) {
    return request({
        url: '/topsearch/github/allstars',
        method: 'get',
        data: data
    })
}