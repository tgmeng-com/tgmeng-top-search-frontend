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
    '电视剧': require('@/assets/logos/tgmeng-trend_dianshiju.png'),
    '电影': require('@/assets/logos/tgmeng-trend_dianying.png'),
    '小说': require('@/assets/logos/tgmeng-trend_xiaoshuo.png'),
    '游戏': require('@/assets/logos/tgmeng-trend_qiche.png'),
    '汽车': require('@/assets/logos/tgmeng-trend_youxi.png'),
    '财经': require('@/assets/logos/tgmeng-trend_caijing.png'),
    '热梗': require('@/assets/logos/tgmeng-trend_regeng.png'),
    '民生': require('@/assets/logos/tgmeng-trend_minsheng.png'),
    'Spaces热门榜': require('@/assets/logos/tgmeng-trend_huggingface.png'),
    'Spaces点赞榜': require('@/assets/logos/tgmeng-trend_huggingface.png'),
    'Models热门榜': require('@/assets/logos/tgmeng-trend_huggingface.png'),
    'Models点赞榜': require('@/assets/logos/tgmeng-trend_huggingface.png'),
    'Datasets热门榜': require('@/assets/logos/tgmeng-trend_huggingface.png'),
    'Datasets点赞榜': require('@/assets/logos/tgmeng-trend_huggingface.png'),

};

// 默认图
const fallback = require('@/assets/logos/tgmeng-trend_default.png');

/**
 * 根据平台名获取 logo 图片
 */
export function getLogoByName(name) {
    return logoMap[name] || fallback;
}
