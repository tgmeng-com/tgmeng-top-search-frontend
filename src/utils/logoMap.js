const logoMap = {
    'B站': require('@/assets/logos/tgmeng-trend_bilibili.png'),
    '网易云': require('@/assets/logos/tgmeng-trend_wangyiyun.png'),
    'Star总榜': require('@/assets/logos/tgmeng-trend_github.png'),
    '近一日新仓库Star榜': require('@/assets/logos/tgmeng-trend_github.png'),
    '近一周新仓库Star榜': require('@/assets/logos/tgmeng-trend_github.png'),
    '近一月新仓库Star榜': require('@/assets/logos/tgmeng-trend_github.png'),
    '近一年新仓库Star榜': require('@/assets/logos/tgmeng-trend_github.png'),
    '近三年新仓库Star榜': require('@/assets/logos/tgmeng-trend_github.png'),
    '近五年新仓库Star榜': require('@/assets/logos/tgmeng-trend_github.png'),
    '近十年新仓库Star榜': require('@/assets/logos/tgmeng-trend_github.png'),
    '百度': require('@/assets/logos/tgmeng-trend_baidu.png'),
    '微博': require('@/assets/logos/tgmeng-trend_weibo.png'),
    '抖音': require('@/assets/logos/tgmeng-trend_douyin.png'),
    'Youtube': require('@/assets/logos/tgmeng-trend_youtube.png'),
    '豆瓣': require('@/assets/logos/tgmeng-trend_douban.png'),
    '百度贴吧': require('@/assets/logos/tgmeng-trend_baidutieba.png'),
    '腾讯': require('@/assets/logos/tgmeng-trend_tencent.png'),
    '头条': require('@/assets/logos/tgmeng-trend_toutiao.png'),
    '网易': require('@/assets/logos/tgmeng-trend_wangyi.png'),
    '少数派': require('@/assets/logos/tgmeng-trend_shaoshupai.png'),
};

// 默认图
const fallback = require('@/assets/logos/tgmeng-trend_default.png');

/**
 * 根据平台名获取 logo 图片
 */
export function getLogoByName(name) {
    return logoMap[name] || fallback;
}
