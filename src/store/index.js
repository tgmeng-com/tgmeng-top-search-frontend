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
    topSearchForZongBangMangGuo,
    topSearchForZhouPiaoFangBangMaoYan,
    topSearchForXiangkanBangMaoYan,
    topSearchForGouPiaoPingFenBangMaoYan,
    topSearchForTop100MaoYan,
    topSearchForJingRongJie,
    topSearchForDiYiCaiJing,
    topSearchForTongHuaShun,
    topSearchForHuaErJieJianWen,
    topSearchForCaiLianShe,
    topSearchForGeLongHui,
    topSearchForFaBu,
    topSearchForJinShi,
    topSearchForNiuYueShiBao,
    topSearchForBBC,
    topSearchForFaGuang,
    topSearchForDaJiYuan,
    topSearchForWoShiPM,
    topSearchForYouSheWang,
    topSearchForZhanKuZuoPinBang,
    topSearchForZhanKuWenZhangBang,
    topSearchForZhanKuQianLiBang,
    topSearchForReMenZuoPinTuYaWangGuo,
    topSearchForJingXuanZuoPinTuYaWangGuo,
    topSearchForJinRiXinZuoTuYaWangGuo,
    topSearchForFaXianXinZuoTuYaWangGuo,
    topSearchForSheJiDaRen,
    topSearchForTopys,
    topSearchForArchDaily,
    topSearchForDribbble,
    topSearchForAwwwards,
    topSearchForCore77,
    topSearchForAbduzeedo,
    topSearchForMIT,
    // topSearchForEurekAlert,
    topSearchForRenGongZhiNengGuoJiKeJiChuangXinZhongXin,
    topSearchForYiYaoJianKangGuoJiKeJiChuangXinZhongXin,
    topSearchJiQiZhiXin,
    topSearchForHuPu,
    topSearchForDongQiuDi,
    topSearchForXinLangTiYu,
    topSearchForSouHuTiYu,
    topSearchForWangYiTiYu,
    topSearchForYangShiTiYu,
    topSearchForPPTiYu,
    topSearchForZhiBoBa,


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
                    new Platform('纽约时报', topSearchForNiuYueShiBao, require('@/assets/logos/tgmeng-trend_niuyueshibao.png')),
                    new Platform('BBC', topSearchForBBC, require('@/assets/logos/tgmeng-trend_bbc.png')),
                    new Platform('法广', topSearchForFaGuang, require('@/assets/logos/tgmeng-trend_faguang.png')),
                    // new Platform('大纪元', topSearchForDaJiYuan, require('@/assets/logos/tgmeng-trend_dajiyuan.png')),
                ]
            },
            {
                name: '媒体',
                isShow: true,
                subCategories: [
                    new Platform('B站', topSearchForBilibili, require('@/assets/logos/tgmeng-trend_bilibili.png')),
                    new Platform('抖音', topSearchForDouYin, require('@/assets/logos/tgmeng-trend_douyin.png')),
                    new Platform('微博', topSearchForWeiBo, require('@/assets/logos/tgmeng-trend_weibo.png')),
                    new Platform('知乎', topSearchForZhiHu, require('@/assets/logos/tgmeng-trend_zhihu.png')),
                    new Platform('Youtube', topSearchForYoutube, require('@/assets/logos/tgmeng-trend_youtube.png')),
                    new Platform('百度贴吧', topSearchForBaiDuTieBa, require('@/assets/logos/tgmeng-trend_baidutieba.png')),
                    new Platform('豆瓣', topSearchForDouBan, require('@/assets/logos/tgmeng-trend_douban.png')),
                    new Platform('少数派', topSearchForShaoShuPai, require('@/assets/logos/tgmeng-trend_shaoshupai.png')),
                    new Platform('热梗', topSearchForReGengBaiDu, require('@/assets/logos/tgmeng-trend_regeng.png')),
                    new Platform('财经', topSearchForCaiJingBaiDu, require('@/assets/logos/tgmeng-trend_caijing.png')),
                    new Platform('民生', topSearchForMinShengBaiDu, require('@/assets/logos/tgmeng-trend_minsheng.png')),
                    new Platform('汽车', topSearchForQiCheBaiDu, require('@/assets/logos/tgmeng-trend_youxi.png')),
                    new Platform('游戏', topSearchForYouXiBaiDu, require('@/assets/logos/tgmeng-trend_qiche.png')),
                    new Platform('小说', topSearchForXiaoShuoBaiDu, require('@/assets/logos/tgmeng-trend_xiaoshuo.png')),
                ]
            },
            {
                name: '财经',
                isShow: true,
                subCategories: [
                    new Platform('财联社', topSearchForCaiLianShe, require('@/assets/logos/tgmeng-trend_cailianshe.png')),
                    new Platform('华尔街见闻', topSearchForHuaErJieJianWen, require('@/assets/logos/tgmeng-trend_huaerjiejianwen.png')),
                    new Platform('同花顺', topSearchForTongHuaShun, require('@/assets/logos/tgmeng-trend_tonghuashun.png')),
                    new Platform('金融界', topSearchForJingRongJie, require('@/assets/logos/tgmeng-trend_jinrongjie.png')),
                    new Platform('第一财经', topSearchForDiYiCaiJing, require('@/assets/logos/tgmeng-trend_diyicaijing.png')),
                    new Platform('格隆汇', topSearchForGeLongHui, require('@/assets/logos/tgmeng-trend_gelonghui.png')),
                    new Platform('法布', topSearchForFaBu, require('@/assets/logos/tgmeng-trend_fabu.png')),
                    new Platform('金十', topSearchForJinShi, require('@/assets/logos/tgmeng-trend_jinshi.png')),
                ]
            },
            {
                name: '体育',
                isShow: true,
                subCategories: [
                    new Platform('央视体育', topSearchForYangShiTiYu, require('@/assets/logos/tgmeng-trend_yangshitiyu.png')),
                    new Platform('虎扑', topSearchForHuPu, require('@/assets/logos/tgmeng-trend_huputiyu.png')),
                    new Platform('新浪体育', topSearchForXinLangTiYu, require('@/assets/logos/tgmeng-trend_xinlangtiyu.png')),
                    new Platform('网易体育', topSearchForWangYiTiYu, require('@/assets/logos/tgmeng-trend_wangyitiyu.png')),
                    new Platform('搜狐体育', topSearchForSouHuTiYu, require('@/assets/logos/tgmeng-trend_souhutiyu.png')),
                    new Platform('PP体育', topSearchForPPTiYu, require('@/assets/logos/tgmeng-trend_pptiyu.png')),
                    new Platform('懂球帝', topSearchForDongQiuDi, require('@/assets/logos/tgmeng-trend_dongqiudi.png')),
                    new Platform('直播吧', topSearchForZhiBoBa, require('@/assets/logos/tgmeng-trend_zhiboba.png')),
                ]
            },
            {
                name: '科技',
                isShow: true,
                subCategories: [
                    new Platform('MIT科技评论', topSearchForMIT, require('@/assets/logos/tgmeng-trend-mit.png')),
                    new Platform('机器之心', topSearchJiQiZhiXin, require('@/assets/logos/tgmeng-trend_jiqizhixin.png')),
                    // EurekAlert服务器暂时没法访问，所以先不放了
                    // new Platform('EurekAlert', topSearchForEurekAlert, require('@/assets/logos/tgmeng-trend-eurekalert.png')),
                    new Platform('NCSTI-人工智能', topSearchForRenGongZhiNengGuoJiKeJiChuangXinZhongXin, require('@/assets/logos/tgmeng-trend_ncsti.png')),
                    new Platform('NCSTI-医药健康', topSearchForYiYaoJianKangGuoJiKeJiChuangXinZhongXin, require('@/assets/logos/tgmeng-trend_ncsti.png')),

                ]
            },
            {
                name: '设计',
                isShow: true,
                subCategories: [
                    new Platform('人人都是产品经理', topSearchForWoShiPM, require('@/assets/logos/tgmeng-trend_woshipm.png')),
                    new Platform('优设网', topSearchForYouSheWang, require('@/assets/logos/tgmeng-trend_youshewang.png')),
                    new Platform('TOPYS', topSearchForTopys, require('@/assets/logos/tgmeng-trend_topys.png')),
                    new Platform('ArchDaily', topSearchForArchDaily, require('@/assets/logos/tgmeng-trend_archdaily.jpg')),
                    new Platform('站酷作品榜', topSearchForZhanKuZuoPinBang, require('@/assets/logos/tgmeng-trend_zhanku.jpg')),
                    new Platform('站酷潜力榜', topSearchForZhanKuQianLiBang, require('@/assets/logos/tgmeng-trend_zhanku.jpg')),
                    new Platform('站酷文章榜', topSearchForZhanKuWenZhangBang, require('@/assets/logos/tgmeng-trend_zhanku.jpg')),
                    new Platform('设计达人', topSearchForSheJiDaRen, require('@/assets/logos/tgmeng-trend_shejidaren.png')),
                    new Platform('Abduzeedo', topSearchForAbduzeedo, require('@/assets/logos/tgmeng-trend_abduzeedo.png')),
                    new Platform('Core77', topSearchForCore77, require('@/assets/logos/tgmeng-trend_core77.jpg')),
                    new Platform('Dribbble', topSearchForDribbble, require('@/assets/logos/tgmeng-trend_dribbble.jpg')),
                    new Platform('Awwwards', topSearchForAwwwards, require('@/assets/logos/tgmeng-trend_awwwards.png')),
                    new Platform('涂鸦王国热门作品', topSearchForReMenZuoPinTuYaWangGuo, require('@/assets/logos/tgmeng-trend_tuyawangguo.jpg')),
                    new Platform('涂鸦王国精选作品', topSearchForJingXuanZuoPinTuYaWangGuo, require('@/assets/logos/tgmeng-trend_tuyawangguo.jpg')),
                    new Platform('涂鸦王国今日新作', topSearchForJinRiXinZuoTuYaWangGuo, require('@/assets/logos/tgmeng-trend_tuyawangguo.jpg')),
                    new Platform('涂鸦王国发现新作', topSearchForFaXianXinZuoTuYaWangGuo, require('@/assets/logos/tgmeng-trend_tuyawangguo.jpg'))
                ]
            },
            {
                name: '影视',
                isShow: true,
                subCategories: [
                    new Platform('猫眼 周票房榜', topSearchForZhouPiaoFangBangMaoYan, require('@/assets/logos/tgmeng-trend_maoyan.png')),
                    new Platform('猫眼 想看榜', topSearchForXiangkanBangMaoYan, require('@/assets/logos/tgmeng-trend_maoyan.png')),
                    new Platform('猫眼 购票评分榜', topSearchForGouPiaoPingFenBangMaoYan, require('@/assets/logos/tgmeng-trend_maoyan.png')),
                    new Platform('猫眼 历史总榜', topSearchForTop100MaoYan, require('@/assets/logos/tgmeng-trend_maoyan.png')),

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
