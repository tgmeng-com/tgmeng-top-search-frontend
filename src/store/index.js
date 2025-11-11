class Platform {
    constructor(title, api, logo, sort, isShow = true, isStar = false) {
        this.title = title;
        this.api = api;
        this.logo = logo;
        this.updateTime = '';
        this.data = [];
        this.loading = true;
        this.isShow = isShow;
        this.sort = sort;
        this.isStar = isStar;
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
    // topSearchForDaJiYuan,
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
    topSearchForV2ex,
    topSearchForBuXingJieHuPu,
    topSearchForNga,
    // topSearchForYiMuSanFenDi,
    topSearchForWenZhangJueJin,
    topSearchForHackerNews,
    topSearchForMaiZuDouBan,
    topSearchForPinZuDouBan,
    topSearchForAiMaoShengHuoDouBan,
    topSearchForAiMaoZaoPenDouBan,
    topSearchForGouZuDouBan,


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
                    new Platform('腾讯', topSearchForTencent, require('@/assets/logos/tgmeng-trend_tencent.png'), 0),
                    new Platform('头条', topSearchForTouTiao, require('@/assets/logos/tgmeng-trend_toutiao.png'), 1),
                    new Platform('网易', topSearchForWangYi, require('@/assets/logos/tgmeng-trend_wangyi.png'), 2),
                    new Platform('百度', topSearchForBaiDu, require('@/assets/logos/tgmeng-trend_baidu.png'), 3),
                    new Platform('纽约时报', topSearchForNiuYueShiBao, require('@/assets/logos/tgmeng-trend_niuyueshibao.png'), 5),
                    new Platform('BBC', topSearchForBBC, require('@/assets/logos/tgmeng-trend_bbc.png'), 6),
                    new Platform('法广', topSearchForFaGuang, require('@/assets/logos/tgmeng-trend_faguang.png'), 7),
                    // new Platform('大纪元', topSearchForDaJiYuan, require('@/assets/logos/tgmeng-trend_dajiyuan.png'),8),
                ]
            },
            {
                name: '羊毛',
                isShow: true,
                subCategories: [
                    new Platform('豆瓣组 买', topSearchForMaiZuDouBan, require('@/assets/logos/tgmeng-trend_douban.png'), 8.1),
                    new Platform('豆瓣组 拼', topSearchForPinZuDouBan, require('@/assets/logos/tgmeng-trend_douban.png'), 8.2),
                    new Platform('豆瓣组 爱猫生活', topSearchForAiMaoShengHuoDouBan, require('@/assets/logos/tgmeng-trend_douban.png'), 8.3),
                    new Platform('豆瓣组 爱猫澡盆', topSearchForAiMaoZaoPenDouBan, require('@/assets/logos/tgmeng-trend_douban.png'), 8.4),
                    new Platform('豆瓣组 狗组', topSearchForGouZuDouBan, require('@/assets/logos/tgmeng-trend_douban.png'), 8.5),
                ]
            },

            {
                name: '媒体',
                isShow: true,
                subCategories: [
                    new Platform('B站', topSearchForBilibili, require('@/assets/logos/tgmeng-trend_bilibili.png'), 9),
                    new Platform('抖音', topSearchForDouYin, require('@/assets/logos/tgmeng-trend_douyin.png'), 10),
                    new Platform('微博', topSearchForWeiBo, require('@/assets/logos/tgmeng-trend_weibo.png'), 11),
                    new Platform('Youtube', topSearchForYoutube, require('@/assets/logos/tgmeng-trend_youtube.png'), 13),
                    new Platform('少数派', topSearchForShaoShuPai, require('@/assets/logos/tgmeng-trend_shaoshupai.png'), 16),
                    new Platform('热梗', topSearchForReGengBaiDu, require('@/assets/logos/tgmeng-trend_regeng.png'), 17),
                    new Platform('财经', topSearchForCaiJingBaiDu, require('@/assets/logos/tgmeng-trend_caijing.png'), 18),
                    new Platform('民生', topSearchForMinShengBaiDu, require('@/assets/logos/tgmeng-trend_minsheng.png'), 19),
                    new Platform('汽车', topSearchForQiCheBaiDu, require('@/assets/logos/tgmeng-trend_youxi.png'), 20),
                    new Platform('游戏', topSearchForYouXiBaiDu, require('@/assets/logos/tgmeng-trend_qiche.png'), 21),
                    new Platform('小说', topSearchForXiaoShuoBaiDu, require('@/assets/logos/tgmeng-trend_xiaoshuo.png'), 22),
                ]
            },
            {
                name: '社区',
                isShow: true,
                subCategories: [
                    new Platform('Hacker News', topSearchForHackerNews, require('@/assets/logos/tgmeng-trend_hackernews.png'), 22.1),
                    new Platform('V2EX', topSearchForV2ex, require('@/assets/logos/tgmeng-trend_v2ex.png'), 22.2),
                    new Platform('虎扑步行街', topSearchForBuXingJieHuPu, require('@/assets/logos/tgmeng-trend_buxingjiehupu.png'), 22.3),
                    new Platform('知乎', topSearchForZhiHu, require('@/assets/logos/tgmeng-trend_zhihu.png'), 22.4),
                    new Platform('百度贴吧', topSearchForBaiDuTieBa, require('@/assets/logos/tgmeng-trend_baidutieba.png'), 22.5),
                    new Platform('豆瓣', topSearchForDouBan, require('@/assets/logos/tgmeng-trend_douban.png'), 22.6),
                    // new Platform('一亩三分地', topSearchForYiMuSanFenDi, require('@/assets/logos/tgmeng-trend_yimusanfendi.png'), 22.7),
                    new Platform('掘金', topSearchForWenZhangJueJin, require('@/assets/logos/tgmeng-trend_juejin.png'), 22.8),
                    new Platform('NGA', topSearchForNga, require('@/assets/logos/tgmeng-trend_nga.png'), 22.9),

                ]
            },
            {
                name: '财经',
                isShow: true,
                subCategories: [
                    new Platform('财联社', topSearchForCaiLianShe, require('@/assets/logos/tgmeng-trend_cailianshe.png'), 23),
                    new Platform('华尔街见闻', topSearchForHuaErJieJianWen, require('@/assets/logos/tgmeng-trend_huaerjiejianwen.png'), 24),
                    new Platform('同花顺', topSearchForTongHuaShun, require('@/assets/logos/tgmeng-trend_tonghuashun.png'), 25),
                    new Platform('金融界', topSearchForJingRongJie, require('@/assets/logos/tgmeng-trend_jinrongjie.png'), 26),
                    new Platform('第一财经', topSearchForDiYiCaiJing, require('@/assets/logos/tgmeng-trend_diyicaijing.png'), 27),
                    new Platform('格隆汇', topSearchForGeLongHui, require('@/assets/logos/tgmeng-trend_gelonghui.png'), 28),
                    new Platform('法布', topSearchForFaBu, require('@/assets/logos/tgmeng-trend_fabu.png'), 29),
                    new Platform('金十', topSearchForJinShi, require('@/assets/logos/tgmeng-trend_jinshi.png'), 30),
                ]
            },
            {
                name: '体育',
                isShow: true,
                subCategories: [
                    new Platform('央视体育', topSearchForYangShiTiYu, require('@/assets/logos/tgmeng-trend_yangshitiyu.png'), 31),
                    new Platform('虎扑', topSearchForHuPu, require('@/assets/logos/tgmeng-trend_huputiyu.png'), 32),
                    new Platform('新浪体育', topSearchForXinLangTiYu, require('@/assets/logos/tgmeng-trend_xinlangtiyu.png'), 33),
                    new Platform('网易体育', topSearchForWangYiTiYu, require('@/assets/logos/tgmeng-trend_wangyitiyu.png'), 34),
                    new Platform('搜狐体育', topSearchForSouHuTiYu, require('@/assets/logos/tgmeng-trend_souhutiyu.png'), 35),
                    new Platform('PP体育', topSearchForPPTiYu, require('@/assets/logos/tgmeng-trend_pptiyu.png'), 36),
                    new Platform('懂球帝', topSearchForDongQiuDi, require('@/assets/logos/tgmeng-trend_dongqiudi.png'), 37),
                    new Platform('直播吧', topSearchForZhiBoBa, require('@/assets/logos/tgmeng-trend_zhiboba.png'), 38),
                ]
            },
            {
                name: '科技',
                isShow: true,
                subCategories: [
                    new Platform('MIT科技评论', topSearchForMIT, require('@/assets/logos/tgmeng-trend-mit.png'), 39),
                    new Platform('机器之心', topSearchJiQiZhiXin, require('@/assets/logos/tgmeng-trend_jiqizhixin.png'), 40),
                    // EurekAlert服务器暂时没法访问，所以先不放了
                    // new Platform('EurekAlert', topSearchForEurekAlert, require('@/assets/logos/tgmeng-trend-eurekalert.png'), 41),
                    new Platform('NCSTI-人工智能', topSearchForRenGongZhiNengGuoJiKeJiChuangXinZhongXin, require('@/assets/logos/tgmeng-trend_ncsti.png'), 42),
                    new Platform('NCSTI-医药健康', topSearchForYiYaoJianKangGuoJiKeJiChuangXinZhongXin, require('@/assets/logos/tgmeng-trend_ncsti.png'), 43),

                ]
            },
            {
                name: '设计',
                isShow: true,
                subCategories: [
                    new Platform('人人都是产品经理', topSearchForWoShiPM, require('@/assets/logos/tgmeng-trend_woshipm.png'), 44),
                    new Platform('优设网', topSearchForYouSheWang, require('@/assets/logos/tgmeng-trend_youshewang.png'), 45),
                    new Platform('TOPYS', topSearchForTopys, require('@/assets/logos/tgmeng-trend_topys.png'), 46),
                    new Platform('ArchDaily', topSearchForArchDaily, require('@/assets/logos/tgmeng-trend_archdaily.jpg'), 47),
                    new Platform('站酷作品榜', topSearchForZhanKuZuoPinBang, require('@/assets/logos/tgmeng-trend_zhanku.jpg'), 48),
                    new Platform('站酷潜力榜', topSearchForZhanKuQianLiBang, require('@/assets/logos/tgmeng-trend_zhanku.jpg'), 49),
                    new Platform('站酷文章榜', topSearchForZhanKuWenZhangBang, require('@/assets/logos/tgmeng-trend_zhanku.jpg'), 50),
                    new Platform('设计达人', topSearchForSheJiDaRen, require('@/assets/logos/tgmeng-trend_shejidaren.png'), 51),
                    new Platform('Abduzeedo', topSearchForAbduzeedo, require('@/assets/logos/tgmeng-trend_abduzeedo.png'), 52),
                    new Platform('Core77', topSearchForCore77, require('@/assets/logos/tgmeng-trend_core77.jpg'), 53),
                    new Platform('Dribbble', topSearchForDribbble, require('@/assets/logos/tgmeng-trend_dribbble.jpg'), 54),
                    new Platform('Awwwards', topSearchForAwwwards, require('@/assets/logos/tgmeng-trend_awwwards.png'), 55),
                    new Platform('涂鸦王国热门作品', topSearchForReMenZuoPinTuYaWangGuo, require('@/assets/logos/tgmeng-trend_tuyawangguo.jpg'), 56),
                    new Platform('涂鸦王国精选作品', topSearchForJingXuanZuoPinTuYaWangGuo, require('@/assets/logos/tgmeng-trend_tuyawangguo.jpg'), 57),
                    new Platform('涂鸦王国今日新作', topSearchForJinRiXinZuoTuYaWangGuo, require('@/assets/logos/tgmeng-trend_tuyawangguo.jpg'), 58),
                    new Platform('涂鸦王国发现新作', topSearchForFaXianXinZuoTuYaWangGuo, require('@/assets/logos/tgmeng-trend_tuyawangguo.jpg'), 59),
                ]
            },
            {
                name: '影视',
                isShow: true,
                subCategories: [
                    new Platform('猫眼 周票房榜', topSearchForZhouPiaoFangBangMaoYan, require('@/assets/logos/tgmeng-trend_maoyan.png'), 60),
                    new Platform('猫眼 想看榜', topSearchForXiangkanBangMaoYan, require('@/assets/logos/tgmeng-trend_maoyan.png'), 61),
                    new Platform('猫眼 购票评分榜', topSearchForGouPiaoPingFenBangMaoYan, require('@/assets/logos/tgmeng-trend_maoyan.png'), 62),
                    new Platform('猫眼 历史总榜', topSearchForTop100MaoYan, require('@/assets/logos/tgmeng-trend_maoyan.png'), 63),

                    new Platform('腾讯视频 综艺', topSearchForZongYiTengXun, require('@/assets/logos/tgmeng-trend_tengxunshipin.png'), 64),
                    new Platform('爱奇艺 综艺', topSearchForZongYiAiQiYi, require('@/assets/logos/tgmeng-trend_aiqiyi.png'), 65),
                    new Platform('芒果 综艺', topSearchForZongYiMangGuo, require('@/assets/logos/tgmeng-trend_mangguo.png'), 66),
                    new Platform('优酷 综艺', topSearchForZongYiYouKu, require('@/assets/logos/tgmeng-trend_youku.png'), 67),

                    new Platform('腾讯视频 电视剧', topSearchForDianShiJuTengXun, require('@/assets/logos/tgmeng-trend_tengxunshipin.png'), 68),
                    new Platform('爱奇艺 电视剧', topSearchForDianShiJuAiQiYi, require('@/assets/logos/tgmeng-trend_aiqiyi.png'), 69),
                    new Platform('芒果 电视剧', topSearchForDianShiJuMangGuo, require('@/assets/logos/tgmeng-trend_mangguo.png'), 70),
                    new Platform('优酷 电视剧', topSearchForDianShiJuYouKu, require('@/assets/logos/tgmeng-trend_youku.png'), 71),

                    new Platform('腾讯视频 电影', topSearchForDianYingTengXun, require('@/assets/logos/tgmeng-trend_tengxunshipin.png'), 72),
                    new Platform('爱奇艺 电影', topSearchForDianYingAiQiYi, require('@/assets/logos/tgmeng-trend_aiqiyi.png'), 73),
                    new Platform('芒果 电影', topSearchForDianYingMangGuo, require('@/assets/logos/tgmeng-trend_mangguo.png'), 74),
                    new Platform('优酷 电影', topSearchForDianYingYouKu, require('@/assets/logos/tgmeng-trend_youku.png'), 75),

                    new Platform('腾讯视频 动漫', topSearchForDongManTengXun, require('@/assets/logos/tgmeng-trend_tengxunshipin.png'), 76),
                    new Platform('爱奇艺 动漫', topSearchForDongManAiQiYi, require('@/assets/logos/tgmeng-trend_aiqiyi.png'), 77),
                    new Platform('芒果 动漫', topSearchForDongManMangGuo, require('@/assets/logos/tgmeng-trend_mangguo.png'), 78),
                    new Platform('优酷 动漫', topSearchForDongManYouKu, require('@/assets/logos/tgmeng-trend_youku.png'), 79),

                    new Platform('腾讯视频 总榜', topSearchForZongBangTengXun, require('@/assets/logos/tgmeng-trend_tengxunshipin.png'), 80),
                    new Platform('爱奇艺 总榜', topSearchForZongBangAiQiYi, require('@/assets/logos/tgmeng-trend_aiqiyi.png'), 81),
                    new Platform('芒果 总榜', topSearchForZongBangMangGuo, require('@/assets/logos/tgmeng-trend_mangguo.png'), 82),
                    new Platform('优酷 总榜', topSearchForZongBangYouKu, require('@/assets/logos/tgmeng-trend_youku.png'), 83),

                    new Platform('百度 电视剧', topSearchForDianShiJuBaiDu, require('@/assets/logos/tgmeng-trend_dianshiju.png'), 84),
                    new Platform('百度 电影', topSearchForDianYingBaiDu, require('@/assets/logos/tgmeng-trend_dianying.png'), 85),
                ]
            },
            {
                name: '音乐',
                isShow: true,
                subCategories: [
                    new Platform('网易云 飙升榜', topSearchForWangYiYunBiaoSheng, require('@/assets/logos/tgmeng-trend_wangyiyun.png'), 86),
                    new Platform('网易云 新歌榜', topSearchForWangYiYunXinGe, require('@/assets/logos/tgmeng-trend_wangyiyun.png'), 87),
                    new Platform('网易云 原创榜', topSearchForWangYiYunYuanChuang, require('@/assets/logos/tgmeng-trend_wangyiyun.png'), 88),
                    new Platform('网易云 热歌榜', topSearchForWangYiYunReGe, require('@/assets/logos/tgmeng-trend_wangyiyun.png'), 89),
                ]
            },
            {
                name: 'IT',
                isShow: true,
                subCategories: [
                    new Platform('Star总榜', topSearchForGitHubAllStars, require('@/assets/logos/tgmeng-trend_github.png'), 90),
                    new Platform('近一日新仓库Star', topSearchForGitHubDaystars, require('@/assets/logos/tgmeng-trend_github.png'), 91),
                    new Platform('近一周新仓库Star', topSearchForGitHubWeekstars, require('@/assets/logos/tgmeng-trend_github.png'), 92),
                    new Platform('近一月新仓库Star', topSearchForGitHubMonthstars, require('@/assets/logos/tgmeng-trend_github.png'), 93),
                    new Platform('近一年新仓库Star', topSearchForGitHubYearstars, require('@/assets/logos/tgmeng-trend_github.png'), 94),
                    new Platform('近三年新仓库Star', topSearchForGitHubThreeYearStars, require('@/assets/logos/tgmeng-trend_github.png'), 95),
                    new Platform('近五年新仓库Star', topSearchForGitHubFiveYearStars, require('@/assets/logos/tgmeng-trend_github.png'), 96),
                    new Platform('近十年新仓库Star', topSearchForGitHubTenYearStars, require('@/assets/logos/tgmeng-trend_github.png'), 97),
                    new Platform('Spaces热门榜', topSearchForHuggingFaceSpaceTrending, require('@/assets/logos/tgmeng-trend_huggingface.png'), 98),
                    new Platform('Spaces点赞榜', topSearchForHuggingFaceSpaceLikes, require('@/assets/logos/tgmeng-trend_huggingface.png'), 99),
                    new Platform('Models热门榜', topSearchForHuggingFaceModelTrending, require('@/assets/logos/tgmeng-trend_huggingface.png'), 100),
                    new Platform('Models点赞榜', topSearchForHuggingFaceModelLikes, require('@/assets/logos/tgmeng-trend_huggingface.png'), 101),
                    new Platform('Datasets热门榜', topSearchForHuggingFaceDatasetsTrending, require('@/assets/logos/tgmeng-trend_huggingface.png'), 102),
                    new Platform('Datasets点赞榜', topSearchForHuggingFaceDatasetsLikes, require('@/assets/logos/tgmeng-trend_huggingface.png'), 103),
                ]
            },
            {
                name: '收藏',
                isShow: true,
                subCategories: [],
            }
        ],  // 定义一个状态变量 count
    },
});
