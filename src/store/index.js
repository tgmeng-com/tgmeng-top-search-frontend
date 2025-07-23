class Platform {
    constructor(title, api, logo, isShow = true) {
        this.title = title;
        this.api = api;
        this.logo = logo;
        this.updateTime = '';
        this.data = [];
        this.loading = true;
        this.isShow = isShow;
    }
}

import {createStore} from 'vuex';
import {
    topSearchForYoutube,
    topSearchForBaiDu,
    topSearchForGitHubAllStars,
    topSearchForDouYin,
    topSearchForBilibili,
    topSearchForWeiBo,
    topSearchForGitHubDaystars,
    topSearchForGitHubWeekstars,
    topSearchForGitHubMonthstars,
    topSearchForGitHubYearstars,
    topSearchForGitHubThreeYearStars,
    topSearchForGitHubFiveYearStars,
    topSearchForGitHubTenYearStars,
    topSearchForDouBan,
    topSearchForTencent,
    topSearchForTouTiao,
    topSearchForWangYi,
    topSearchForWangYiYunBiaoSheng,
    topSearchForWangYiYunXinGe,
    topSearchForWangYiYunYuanChuang,
    topSearchForWangYiYunReGe,
    topSearchForBaiDuTieBa,
    topSearchForShaoShuPai,
    topSearchForDianShiJuBaiDu,
    topSearchForDianYingBaiDu,
    topSearchForXiaoShuoBaiDu,
    topSearchForYouXiBaiDu,
    topSearchForQiCheBaiDu,
    topSearchForReGengBaiDu,
    topSearchForCaiJingBaiDu,
    topSearchForMinShengBaiDu,
    topSearchForHuggingFaceSpaceTrending,
    topSearchForHuggingFaceSpaceLikes,
    topSearchForHuggingFaceModelTrending,
    topSearchForHuggingFaceModelLikes,
    topSearchForHuggingFaceDatasetsTrending, topSearchForHuggingFaceDatasetsLikes, topSearchForZhiHu,
    topSearchForDianShiJuTengXun,
    topSearchForDianYingTengXun,
    topSearchForDongManTengXun,
    topSearchForZongYiTengXun,
    topSearchForZongBangTengXun,
    topSearchForDianShiJuAiQiYi,
    topSearchForDianYingAiQiYi,
    topSearchForDongManAiQiYi,
    topSearchForZongYiAiQiYi,
    topSearchForZongBangAiQiYi,
    topSearchForDianShiJuYouKu,
    topSearchForDianYingYouKu,
    topSearchForDongManYouKu,
    topSearchForZongYiYouKu,
    topSearchForZongBangYouKu,
    topSearchForDianShiJuMangGuo,
    topSearchForDianYingMangGuo,
    topSearchForDongManMangGuo,
    topSearchForZongYiMangGuo,
    topSearchForZongBangMangGuo


} from '@/api/api';

export default createStore({
    state: {
        // 实时在线人数
        umamiActive: '🚀',
        // 今日访问量
        umamiTodayViews: '🚀',
        // 今日访问时长
        umamiTodayTime: '🚀',
        // 总访问量
        umamiAllViews: '🚀',
        // 总访问时长
        umamiAllTime: '🚀',
        categroies: [
            {
                name: '全部',
                isShow: true,
                subCategories: [],
            },
            {
                name: '新闻',
                isShow: true,
                subCategories: [
                    new Platform('腾讯', topSearchForTencent, require('@/assets/logos/tgmeng-trend_tencent.png')),
                    new Platform('头条', topSearchForTouTiao, require('@/assets/logos/tgmeng-trend_toutiao.png')),
                    new Platform('网易', topSearchForWangYi, require('@/assets/logos/tgmeng-trend_wangyi.png')),
                    new Platform('百度', topSearchForBaiDu, require('@/assets/logos/tgmeng-trend_baidu.png')),
                ]
            },
            {
                name: '媒体',
                isShow: true,
                subCategories: [
                    new Platform('B站', topSearchForBilibili, require('@/assets/logos/tgmeng-trend_bilibili.png')),
                    new Platform('抖音', topSearchForDouYin, require('@/assets/logos/tgmeng-trend_douyin.png')),
                    new Platform('Youtube', topSearchForYoutube, require('@/assets/logos/tgmeng-trend_youtube.png')),
                    new Platform('热梗', topSearchForReGengBaiDu, require('@/assets/logos/tgmeng-trend_regeng.png')),
                    new Platform('财经', topSearchForCaiJingBaiDu, require('@/assets/logos/tgmeng-trend_caijing.png')),
                    new Platform('民生', topSearchForMinShengBaiDu, require('@/assets/logos/tgmeng-trend_minsheng.png')),
                    new Platform('汽车', topSearchForQiCheBaiDu, require('@/assets/logos/tgmeng-trend_youxi.png')),
                    new Platform('游戏', topSearchForYouXiBaiDu, require('@/assets/logos/tgmeng-trend_qiche.png')),
                    new Platform('小说', topSearchForXiaoShuoBaiDu, require('@/assets/logos/tgmeng-trend_xiaoshuo.png')),
                ]
            },
            {
                name: '影视',
                isShow: true,
                subCategories: [

                    new Platform('腾讯视频 电视剧', topSearchForDianShiJuTengXun, require('@/assets/logos/tgmeng-trend_tengxunshipin.png')),
                    new Platform('爱奇艺 电视剧', topSearchForDianShiJuAiQiYi, require('@/assets/logos/tgmeng-trend_aiqiyi.png')),
                    new Platform('芒果 电视剧', topSearchForDianShiJuMangGuo, require('@/assets/logos/tgmeng-trend_mangguo.png')),
                    new Platform('优酷 电视剧', topSearchForDianShiJuYouKu, require('@/assets/logos/tgmeng-trend_youku.png')),

                    new Platform('腾讯视频 电影', topSearchForDianYingTengXun, require('@/assets/logos/tgmeng-trend_tengxunshipin.png')),
                    new Platform('爱奇艺 电影', topSearchForDianYingAiQiYi, require('@/assets/logos/tgmeng-trend_aiqiyi.png')),
                    new Platform('芒果 电影', topSearchForDianYingMangGuo, require('@/assets/logos/tgmeng-trend_mangguo.png')),
                    new Platform('优酷 电影', topSearchForDianYingYouKu, require('@/assets/logos/tgmeng-trend_youku.png')),

                    new Platform('腾讯视频 动漫', topSearchForDongManTengXun, require('@/assets/logos/tgmeng-trend_tengxunshipin.png')),
                    new Platform('爱奇艺 动漫', topSearchForDongManAiQiYi, require('@/assets/logos/tgmeng-trend_aiqiyi.png')),
                    new Platform('芒果 动漫', topSearchForDongManMangGuo, require('@/assets/logos/tgmeng-trend_mangguo.png')),
                    new Platform('优酷 动漫', topSearchForDongManYouKu, require('@/assets/logos/tgmeng-trend_youku.png')),

                    new Platform('腾讯视频 综艺', topSearchForZongYiTengXun, require('@/assets/logos/tgmeng-trend_tengxunshipin.png')),
                    new Platform('爱奇艺 综艺', topSearchForZongYiAiQiYi, require('@/assets/logos/tgmeng-trend_aiqiyi.png')),
                    new Platform('芒果 综艺', topSearchForZongYiMangGuo, require('@/assets/logos/tgmeng-trend_mangguo.png')),
                    new Platform('优酷 综艺', topSearchForZongYiYouKu, require('@/assets/logos/tgmeng-trend_youku.png')),

                    new Platform('腾讯视频 总榜', topSearchForZongBangTengXun, require('@/assets/logos/tgmeng-trend_tengxunshipin.png')),
                    new Platform('爱奇艺 总榜', topSearchForZongBangAiQiYi, require('@/assets/logos/tgmeng-trend_aiqiyi.png')),
                    new Platform('芒果 总榜', topSearchForZongBangMangGuo, require('@/assets/logos/tgmeng-trend_mangguo.png')),
                    new Platform('优酷 总榜', topSearchForZongBangYouKu, require('@/assets/logos/tgmeng-trend_youku.png')),

                    new Platform('百度 电视剧', topSearchForDianShiJuBaiDu, require('@/assets/logos/tgmeng-trend_dianshiju.png')),
                    new Platform('百度 电影', topSearchForDianYingBaiDu, require('@/assets/logos/tgmeng-trend_dianying.png')),
                ]
            },
            {
                name: '音乐',
                isShow: true,
                subCategories: [
                    new Platform('网易云 飙升榜', topSearchForWangYiYunBiaoSheng, require('@/assets/logos/tgmeng-trend_wangyiyun.png')),
                    new Platform('网易云 新歌榜', topSearchForWangYiYunXinGe, require('@/assets/logos/tgmeng-trend_wangyiyun.png')),
                    new Platform('网易云 原创榜', topSearchForWangYiYunYuanChuang, require('@/assets/logos/tgmeng-trend_wangyiyun.png')),
                    new Platform('网易云 热歌榜', topSearchForWangYiYunReGe, require('@/assets/logos/tgmeng-trend_wangyiyun.png')),
                ]
            },
            {
                name: '社交',
                isShow: true,
                subCategories: [
                    new Platform('微博', topSearchForWeiBo, require('@/assets/logos/tgmeng-trend_weibo.png')),
                    new Platform('知乎', topSearchForZhiHu, require('@/assets/logos/tgmeng-trend_zhihu.png')),
                    new Platform('百度贴吧', topSearchForBaiDuTieBa, require('@/assets/logos/tgmeng-trend_baidutieba.png')),
                    new Platform('豆瓣', topSearchForDouBan, require('@/assets/logos/tgmeng-trend_douban.png')),
                    new Platform('少数派', topSearchForShaoShuPai, require('@/assets/logos/tgmeng-trend_shaoshupai.png')),
                ]
            },
            {
                name: 'IT',
                isShow: true,
                subCategories: [
                    new Platform('Star总榜', topSearchForGitHubAllStars, require('@/assets/logos/tgmeng-trend_github.png')),
                    new Platform('近一日新仓库Star榜', topSearchForGitHubDaystars, require('@/assets/logos/tgmeng-trend_github.png')),
                    new Platform('近一周新仓库Star榜', topSearchForGitHubWeekstars, require('@/assets/logos/tgmeng-trend_github.png')),
                    new Platform('近一月新仓库Star榜', topSearchForGitHubMonthstars, require('@/assets/logos/tgmeng-trend_github.png')),
                    new Platform('近一年新仓库Star榜', topSearchForGitHubYearstars, require('@/assets/logos/tgmeng-trend_github.png')),
                    new Platform('近三年新仓库Star榜', topSearchForGitHubThreeYearStars, require('@/assets/logos/tgmeng-trend_github.png')),
                    new Platform('近五年新仓库Star榜', topSearchForGitHubFiveYearStars, require('@/assets/logos/tgmeng-trend_github.png')),
                    new Platform('近十年新仓库Star榜', topSearchForGitHubTenYearStars, require('@/assets/logos/tgmeng-trend_github.png')),
                    new Platform('Spaces热门榜', topSearchForHuggingFaceSpaceTrending, require('@/assets/logos/tgmeng-trend_huggingface.png')),
                    new Platform('Spaces点赞榜', topSearchForHuggingFaceSpaceLikes, require('@/assets/logos/tgmeng-trend_huggingface.png')),
                    new Platform('Models热门榜', topSearchForHuggingFaceModelTrending, require('@/assets/logos/tgmeng-trend_huggingface.png')),
                    new Platform('Models点赞榜', topSearchForHuggingFaceModelLikes, require('@/assets/logos/tgmeng-trend_huggingface.png')),
                    new Platform('Datasets热门榜', topSearchForHuggingFaceDatasetsTrending, require('@/assets/logos/tgmeng-trend_huggingface.png')),
                    new Platform('Datasets点赞榜', topSearchForHuggingFaceDatasetsLikes, require('@/assets/logos/tgmeng-trend_huggingface.png')),
                ]
            }
        ],  // 定义一个状态变量 count
    },
});
