import { request } from '@/utils/requestForLinuxDoShenMoLDWYYAPI.js';

export function getWyySongUrl(songId) {
    return request({
        url: `/song/url?id=${songId}&quality=flac`,
        method: 'get'
    })
}