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

export function topSearchForGitHubDaystars(data) {
    return request({
        url: '/topsearch/github/daystars',
        method: 'get',
        data: data
    })
}

export function topSearchForGitHubWeekstars(data) {
    return request({
        url: '/topsearch/github/weekstars',
        method: 'get',
        data: data
    })
}

export function topSearchForGitHubMonthstars(data) {
    return request({
        url: '/topsearch/github/monthstars',
        method: 'get',
        data: data
    })
}

export function topSearchForGitHubYearstars(data) {
    return request({
        url: '/topsearch/github/yearstars',
        method: 'get',
        data: data
    })
}

export function topSearchForGitHubThreeYearStars(data) {
    return request({
        url: '/topsearch/github/threeyearstars',
        method: 'get',
        data: data
    })
}

export function topSearchForGitHubFiveYearStars(data) {
    return request({
        url: '/topsearch/github/fiveyearstars',
        method: 'get',
        data: data
    })
}

export function topSearchForGitHubTenYearStars(data) {
    return request({
        url: '/topsearch/github/tenyearstars',
        method: 'get',
        data: data
    })
}