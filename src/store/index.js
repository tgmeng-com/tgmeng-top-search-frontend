// TODO 里面每个平台的rss值保持和_worker_rss_datamap.js里的一致

class Platform {
    constructor(title, api, logo, sort, rss, isShow = true, isStar = false) {
        this.title = title;
        this.api = api;
        this.logo = logo;
        this.updateTime = '';
        this.data = [];
        this.loading = true;
        this.isShow = isShow;
        this.sort = sort;
        this.isStar = isStar;
        this.rss = rss
    }
}

import {createStore} from 'vuex';
import {Avatar, Setting, Money, InfoFilled, Odometer} from "@element-plus/icons-vue";
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
    topSearchForZhiTongCaiJing,
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
    topSearchForDouBanXiaChuFang,
    topSearchForDouBanJieMaoYeKeAi,
    topSearchForDouBanWoDeChengShiPaiGeiNiKan,
    topSearchForDouBanJiaPianTuiJian,
    topSearchForDouBanSheChuMaiFangGongJinHui,
    topSearchForDouBanCunZhuangAiHaoZhe,
    topSearchForDouBanYouYiDeXiaoChuan,
    topSearchForDouBanSheHuiXingSiWang,
    topSearchForDouBanTaiTouKanShu,
    topSearchForDouBanLanRenShengHuoZhiBei,
    topSearchForDouBanKeAiShiWuFenXiang,
    topSearchForDouBanJinTianChuanShenMe,
    topSearchForDouBanXiaoFeiZhuYiNiXingZhe,
    topSearchForDouBanWoMenDouBuDongChe,
    topSearchForDouBanWoMenDouBuDongRenQingShiGu,
    topSearchForDouBanDouBanNiaoZu,
    topSearchForDouBanRenJianQingLvGuanCha,
    topSearchForDouBanZhiChangTuCaoDaHui,
    topSearchForDouBanJiaoShi,
    topSearchForDouBanShangBanZheJianShi,

    topSearchForYouMinXingKong,
    topSearchFor3DMGAME,
    topSearchForA9VG,
    topSearchForYouXiTuoLuo,
    topSearchForIGN,
    topSearchForGCORES,
    topSearchForYouYanShe,
    topSearchFor17173,
    topSearchForYouXiaWang,
    topSearchForShengWuGu,
    topSearchForYiYaoMoFang,
    topSearchForDingXiangYiSheng,
    topSearchForShengMingShiBao,
    topSearchForJiaYiDaJianKang,
    topSearchForGuoKe,
    topSearchForJianKangShiBaoWang,
    topSearchForCCTV1,
    topSearchForCCTV2,
    topSearchForCCTV3,
    topSearchForCCTV4,
    topSearchForCCTV4EUROPE,
    topSearchForCCTV4AMERICA,
    topSearchForCCTV5,
    topSearchForCCTV5PLUS,
    topSearchForCCTV6,
    topSearchForCCTV7,
    topSearchForCCTV8,
    topSearchForCCTV9,
    topSearchForCCTV10,
    topSearchForCCTV11,
    topSearchForCCTV12,
    topSearchForCCTV13,
    topSearchForCCTV14,
    topSearchForCCTV15,
    topSearchForCCTV16,
    topSearchForCCTV17,
    topSearchForPengPaiXinWen,
    // cacheSearchForwuaipojie,
    cacheSearchForshuimushequ,
    cacheSearchForchongbuluo,
    cacheSearchForxianzhishequ,
    cacheSearchForkdsshanghaitoutiao,
    cacheSearchForkanxue,
    cacheSearchFortongxinrenjiayuan,
    cacheSearchForemacschina,
    cacheSearchForrubychina,
    cacheSearchForkaidiwang,
    cacheSearchForzhiwubuyankuajingdianshangshequ,
    cacheSearchForkaiyuanzixun,
    cacheSearchForjingguanzhijia,

    cacheSearchFor36ke,
    cacheSearchForitzhijia,
    cacheSearchForjikegongyuan,
    cacheSearchForreadhub,
    cacheSearchFortaimeiti,
    cacheSearchForzhongguancunzaixian,
    cacheSearchForlandianwang,
    cacheSearchForchuangyebang,
    cacheSearchForiheima,
    cacheSearchForleifengwang,
    cacheSearchForquantianhoukeji,
    cacheSearchForwulianwangzhiku,
    cacheSearchForkuaikeji,
    cacheSearchFortechweb,
    cacheSearchForlixiangshenghuoshiyanshi,
    cacheSearchForduozhi,
    cacheSearchForjiemodui,
    cacheSearchForaimeiwang,
    cacheSearchForzhanzhangzhijia,
    cacheSearchForlieyunwang,

    cacheSearchForweixindushu,
    cacheSearchForacfun,
    cacheSearchFormeimanbaike,
    cacheSearchForshiguangwang,
    cacheSearchForjiandan,
    cacheSearchFordianwanbang,
    cacheSearchFordianshimao,
    cacheSearchForzhongguoxinwenwang,
    cacheSearchForzaker,
    cacheSearchForxinjingbao,
    cacheSearchForxingdaohuanqiu,

    cacheSearchFor21jingjiwang,
    cacheSearchFordongfangcaifuwang,
    cacheSearchFormbazhiku,
    cacheSearchForjingjiguanchawang,
    cacheSearchForshidaizaixian,
    cacheSearchForjingsecaijing,
    cacheSearchForxinlangcaijing,
    cacheSearchForkuaijitoutiao,
    cacheSearchForlaohucaijing,
    cacheSearchForblockbeats,
    cacheSearchForhuitongcaijing,
    cacheSearchFormeijingwang,
    cacheSearchForxuangutong,
    cacheSearchForchaincatcher,
    cacheSearchForkechuangbanribao,
    cacheSearchFortengxunshejikaifangpingtai,

    topSearchAliYunSheQu,
    topSearchTengXunYunSheQu,
    topSearchMeiTuanSheQu,

    topSearchZhiYuanSheQu,
    topSearchLiangZiWei,
    topSearchXinZhiYuan,

    topSearchFor0818Tuan,

    cacheSearchForQooAppShouJiYouXi,
    cacheSearchForQooAppPcZhuJi,
    cacheSearchForBaHaMuTeShouJi,
    cacheSearchForBaHaMuTePc,
    cacheSearchForBaHaMuTeTv,
    cacheSearchForBaHaMuTeXinXun,
    cacheSearchFor4GamerPc,
    cacheSearchFor4GamerXbox,
    cacheSearchFor4GamerPs,
    cacheSearchFor4GamerSwitch,
    cacheSearchFor4GamerSmartPhone,
    cacheSearchFor4GamerVr,
    cacheSearchFor4GamerHardWare,
    cacheSearchFor4GamerArcade,
    cacheSearchFor4GamerAnalog,
    cacheSearchFor4GamerWii,
    cacheSearchFor4GamerVita,
    cacheSearchFor4GamerNds,
    cacheSearchGameBaseShouJiYouXi,
    cacheSearchGameBasePc,
    cacheSearchGameBaseTvZhangJi,

    topSearchForLodeLocYouHui,
    topSearchForNodeLocHot

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
        umamiSubscriptionData: {
            AllSubscriptionData: {
                FEISHU: '🚀',
                DINGDING: '🚀',
                QIYEWEIXIN: '🚀',
                TELEGRAM: '🚀',
                NTFY: '🚀',
                GOTIFY: '🚀',
            },
            TodaySubscriptionData: {
                FEISHU: '🚀',
                DINGDING: '🚀',
                QIYEWEIXIN: '🚀',
                TELEGRAM: '🚀',
                NTFY: '🚀',
                GOTIFY: '🚀',
            }
        },
        // 卡片列数
        cardCols: 4,
        // 卡片高度
        cardHeight: 20,
        // 卡片是否可以拖动
        cardDraggable: false,
        // 分类是否可以拖动
        categroiesDraggable: false,
        // 卡片热度值是否显示
        cardHotScoreShow: true,
        // 卡片时间是否显示
        cardTimeShow: true,
        // 热点标题是否显示完整
        cardHotTitleFull: true,
        // 卡片标题是否显示完整
        cardTitleFull: true,
        // 卡片顶部字体大小
        cardTopFontSize: 1,
        // 热点标题字体大小
        cardTitleFontSize: 0.875,
        // 分类名称字体大小
        categroiesTitleFontSize: 1.125,
        // 默认选中的分类id
        defaultCategoryId: 1, // 默认分类ID


        // excel卡片顶部字体大小
        excelCardTopFontSize: 0.9,
        excelCardTopFontWeight: 400,
        // excel热点标题字体大小
        excelCardTitleFontSize: 0.875,
        excelCardTitleFontWeight: 400,
        // excel分类名称字体大小
        excelCategroiesTitleFontSize: 0.875,
        excelCategroiesTitleFontWeight: 400,

        // 顶部轮播字体展示
        topCarouselFontShow: false,
        //词云是否展示
        wordCloudShow: false,
        // 访问量展示
        pageViewsShow: false,
        // 边距缩放，就是屏幕两边的，主要是为了移动端
        widthPadding: 75,
        cardWidthForPhone: 100,
        // 词云数量
        wordCloudNum: 300,
        // 摸鱼模式选择面板
        fishModeChooseShow: false,
        subscriptionSettingShow: false,
        // 卡片横向滚动
        cardHorizontalScrolling: 'vertical',
        // 广告是否开启
        adsEnabled: false,

        // 这个是词云点击后存储的，然后用于header里面的搜索框调用
        searchKeyword: '', // 新增：搜索关键词
        searchTrigger: 0,  // 新增：搜索触发器（用于触发 watch）

        // 过滤中包含的关键字
        includeWord: [],
        // 过滤中排除的关键字
        unincludeWord: [],

        topMessageHeight: 6, // 头部的高度，后面的导航栏等的元素高度也都是基于这个计算
        // 自定义调整卡片列表数
        cardListLimit: 200,


        // 设置菜单，之所以提取出来，是因为web端和移动端是两块，要共享这个数据
        settingMenu: [
            {key: "about", label: "关于我们", to: "/setting/about", icon: InfoFilled},
            {key: "function", label: "功能介绍", to: "/setting/function", icon: Odometer},
            {key: "basic", label: "基础设置", to: "/setting/basic", icon: Setting},
            {key: "donation", label: "打赏列表", to: "/setting/donation", icon: Money},
            {key: "community", label: "加群交流", to: "/setting/community", icon: Avatar},
        ],
        categroies: [
            {
                name: '全部',
                routerName: 'all',
                id: 0,
                isShow: true,
                sort: 0,
                subCategories: [],
            },
            {
                name: '新闻',
                routerName: 'news',
                id: 1,
                isShow: true,
                sort: 1,
                subCategories: [
                    new Platform('腾讯', topSearchForTencent, require('@/assets/logos/tgmeng-trend_tencent.png'), 0, '/news/tencent'),
                    new Platform('头条', topSearchForTouTiao, require('@/assets/logos/tgmeng-trend_toutiao.png'), 1, '/news/toutiao'),
                    new Platform('网易', topSearchForWangYi, require('@/assets/logos/tgmeng-trend_wangyi.png'), 2, '/news/wangyi'),
                    new Platform('百度', topSearchForBaiDu, require('@/assets/logos/tgmeng-trend_baidu.png'), 3, '/news/baidu'),
                    new Platform('纽约时报', topSearchForNiuYueShiBao, require('@/assets/logos/tgmeng-trend_niuyueshibao.png'), 5, '/news/niuyueshibao'),
                    new Platform('BBC', topSearchForBBC, require('@/assets/logos/tgmeng-trend_bbc.png'), 6, '/news/bbc'),
                    new Platform('法广', topSearchForFaGuang, require('@/assets/logos/tgmeng-trend_faguang.png'), 7, '/news/faguang'),
                    new Platform('澎湃新闻', topSearchForPengPaiXinWen, require('@/assets/logos/tgmeng-trend_pengpaixinwen.png'), 7.1, '/news/pengpaixinwen'),
                    new Platform('中国新闻网', cacheSearchForzhongguoxinwenwang, require('@/assets/logos/tgmeng-trend_zhongguoxinwenwang.png'), 7.2, '/news/zhongguoxinwenwang'),
                    new Platform('MBA智库', cacheSearchFormbazhiku, require('@/assets/logos/tgmeng-trend_mbazhiku.png'), 7.21, '/news/mbazhiku'),
                    new Platform('新京报', cacheSearchForxinjingbao, require('@/assets/logos/tgmeng-trend_xinjingbao.png'), 7.3, '/news/xinjingbao'),
                    new Platform('ZAKER', cacheSearchForzaker, require('@/assets/logos/tgmeng-trend_zaker.png'), 7.31, '/news/zaker'),
                    new Platform('星岛环球', cacheSearchForxingdaohuanqiu, require('@/assets/logos/tgmeng-trend_xingdaohuanqiu.png'), 7.4, '/news/xingdaohuanqiu'),
                ]
            },
            {
                name: '羊毛',
                routerName: 'wool',
                id: 2,
                isShow: true,
                sort: 2,
                subCategories: [
                    new Platform('豆瓣组 买', topSearchForMaiZuDouBan, require('@/assets/logos/tgmeng-trend_doubanmaizu.png'), 8.1, '/wool/doubanmaizu'),
                    new Platform('豆瓣组 拼', topSearchForPinZuDouBan, require('@/assets/logos/tgmeng-trend_doubanpinzu.png'), 8.2, '/wool/doubanpinzu'),
                    new Platform('豆瓣组 爱猫生活', topSearchForAiMaoShengHuoDouBan, require('@/assets/logos/tgmeng-trend_doubanaimaoshenghuo.png'), 8.3, '/wool/doubanaimaoshenghuo'),
                    new Platform('豆瓣组 爱猫澡盆', topSearchForAiMaoZaoPenDouBan, require('@/assets/logos/tgmeng-trend_doubanaimaozaopen.png'), 8.4, '/wool/doubanaimaozaopen'),
                    new Platform('豆瓣组 狗组', topSearchForGouZuDouBan, require('@/assets/logos/tgmeng-trend_doubangouzu.png'), 8.5, '/wool/doubangouzu'),
                    new Platform('0818团', topSearchFor0818Tuan, require('@/assets/logos/tgmeng-trend_0818tuan.png'), 8.6, '/wool/0818tuan'),
                    new Platform('NodeLoc', topSearchForLodeLocYouHui, require('@/assets/logos/tgmeng-trend_nodeloc.png'), 8.7, '/wool/nodelocyouhui'),
                ]
            },
            {
                name: '媒体',
                routerName: 'media',
                id: 3,
                isShow: true,
                sort: 3,
                subCategories: [
                    new Platform('B站', topSearchForBilibili, require('@/assets/logos/tgmeng-trend_bilibili.png'), 9, '/media/bilibili'),
                    new Platform('抖音', topSearchForDouYin, require('@/assets/logos/tgmeng-trend_douyin.png'), 10, '/media/douyin'),
                    new Platform('微博', topSearchForWeiBo, require('@/assets/logos/tgmeng-trend_weibo.png'), 11, '/media/weibo'),
                    new Platform('AcFun', cacheSearchForacfun, require('@/assets/logos/tgmeng-trend_acfun.png'), 11.1, '/media/acfun'),
                    new Platform('Youtube', topSearchForYoutube, require('@/assets/logos/tgmeng-trend_youtube.png'), 13, '/media/youtube'),
                    new Platform('美漫百科', cacheSearchFormeimanbaike, require('@/assets/logos/tgmeng-trend_meimanbaike.png'), 13.1, '/media/meimanbaike'),
                    new Platform('时光网', cacheSearchForshiguangwang, require('@/assets/logos/tgmeng-trend_shiguangwang.png'), 13.2, '/media/shiguangwang'),
                    new Platform('煎蛋', cacheSearchForjiandan, require('@/assets/logos/tgmeng-trend_jiandan.png'), 13.3, '/media/jiandan'),
                    new Platform('少数派', topSearchForShaoShuPai, require('@/assets/logos/tgmeng-trend_shaoshupai.png'), 16, '/media/shaoshupai'),
                    new Platform('微信读书', cacheSearchForweixindushu, require('@/assets/logos/tgmeng-trend_weixindushu.png'), 16.1, '/media/weixindushu'),
                    new Platform('电视猫', cacheSearchFordianshimao, require('@/assets/logos/tgmeng-trend_dianshimao.png'), 16.2, '/media/dianshimao'),
                    new Platform('热梗', topSearchForReGengBaiDu, require('@/assets/logos/tgmeng-trend_regeng.png'), 17, '/media/regengbaidu'),
                    new Platform('财经', topSearchForCaiJingBaiDu, require('@/assets/logos/tgmeng-trend_caijing.png'), 18, '/media/caijingbaidu'),
                    new Platform('民生', topSearchForMinShengBaiDu, require('@/assets/logos/tgmeng-trend_minsheng.png'), 19, '/media/minshengbaidu'),
                    new Platform('汽车', topSearchForQiCheBaiDu, require('@/assets/logos/tgmeng-trend_youxi.png'), 20, '/media/qichebaidu'),
                    new Platform('游戏', topSearchForYouXiBaiDu, require('@/assets/logos/tgmeng-trend_qiche.png'), 21, '/media/youxibaidu'),
                    new Platform('小说', topSearchForXiaoShuoBaiDu, require('@/assets/logos/tgmeng-trend_xiaoshuo.png'), 22, '/media/xiaoshuobaidu'),
                ]
            },
            {
                name: '电视',
                routerName: 'tv',
                id: 14,
                isShow: true,
                sort: 12.5,
                subCategories: [
                    new Platform('CCTV1 综合', topSearchForCCTV1, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.001, '/tv/cctv/1'),
                    new Platform('CCTV2 财经', topSearchForCCTV2, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.002, '/tv/cctv/2'),
                    new Platform('CCTV3 综艺', topSearchForCCTV3, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.003, '/tv/cctv/3'),
                    new Platform('CCTV4 亚洲', topSearchForCCTV4, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.004, '/tv/cctv4'),
                    new Platform('CCTV4 欧洲', topSearchForCCTV4EUROPE, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.004, '/tv/cctv/europe'),
                    new Platform('CCTV4 美洲', topSearchForCCTV4AMERICA, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.005, '/tv/cctv/america'),
                    new Platform('CCTV5 体育', topSearchForCCTV5, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.006, '/tv/cctv/5'),
                    new Platform('CCTV5 体育赛事', topSearchForCCTV5PLUS, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.007, '/tv/cctv/5plus'),
                    new Platform('CCTV6 电影', topSearchForCCTV6, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.008, '/tv/cctv/6'),
                    new Platform('CCTV7 国防军事', topSearchForCCTV7, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.009, '/tv/cctv/7'),
                    new Platform('CCTV8 电视剧', topSearchForCCTV8, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.010, '/tv/cctv/8'),
                    new Platform('CCTV9 记录', topSearchForCCTV9, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.011, '/tv/cctv/jilu'),
                    new Platform('CCTV10 科教', topSearchForCCTV10, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.012, '/tv/cctv/10'),
                    new Platform('CCTV11 戏曲', topSearchForCCTV11, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.013, '/tv/cctv/11'),
                    new Platform('CCTV12 社会与法', topSearchForCCTV12, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.014, '/tv/cctv/12'),
                    new Platform('CCTV13 新闻', topSearchForCCTV13, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.015, '/tv/cctv/13'),
                    new Platform('CCTV14 少儿', topSearchForCCTV14, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.016, '/tv/cctv/child'),
                    new Platform('CCTV15 音乐', topSearchForCCTV15, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.017, '/tv/cctv/15'),
                    new Platform('CCTV16 奥林匹克', topSearchForCCTV16, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.018, '/tv/cctv/16'),
                    new Platform('CCTV17 农业与村', topSearchForCCTV17, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.019, '/tv/cctv/17'),
                ]
            },
            {
                name: '生活',
                routerName: 'life',
                id: 4,
                isShow: true,
                sort: 4,
                subCategories: [
                    new Platform('豆瓣组 人间情侣观察', topSearchForDouBanRenJianQingLvGuanCha, require('@/assets/logos/tgmeng-trend_ren_jian_qing_lv_guan_cha.png'), 104, '/life/renjianqinglvguancha'),
                    new Platform('豆瓣组 我们都不懂人情世故', topSearchForDouBanWoMenDouBuDongRenQingShiGu, require('@/assets/logos/tgmeng-trend_wo_men_dou_bu_dong_ren_qing_shi_gu.png'), 105, '/life/womendoubudongrenqingshigu'),
                    new Platform('豆瓣组 社会性死亡', topSearchForDouBanSheHuiXingSiWang, require('@/assets/logos/tgmeng-trend_she_hui_xing_si_wang.png'), 106, '/life/shehuixingsiwang'),
                    new Platform('豆瓣组 职场吐槽大会', topSearchForDouBanZhiChangTuCaoDaHui, require('@/assets/logos/tgmeng-trend_zhi_chang_tu_cao_da_hui.png'), 107, '/life/zhichangtucaodahui'),

                    new Platform('豆瓣组 消费主义逆行者', topSearchForDouBanXiaoFeiZhuYiNiXingZhe, require('@/assets/logos/tgmeng-trend_xiao_fei_zhu_yi_ni_xing_zhe.png'), 108, '/life/xiaofeizhuyinixingfhze'),
                    new Platform('豆瓣组 懒人生活指北', topSearchForDouBanLanRenShengHuoZhiBei, require('@/assets/logos/tgmeng-trend_lan_ren_sheng_huo_zhi_bei.png'), 109, '/life/lanrenshenghuozhibei'),
                    new Platform('豆瓣组 今天穿什么', topSearchForDouBanJinTianChuanShenMe, require('@/assets/logos/tgmeng-trend_jin_tian_chuan_shen_me.png'), 110, '/life/jintianchuanshenme'),
                    new Platform('豆瓣组 上班这件事', topSearchForDouBanShangBanZheJianShi, require('@/assets/logos/tgmeng-trend_shang_ban_zhe_jian_shi.png'), 111, '/life/shangbanzhejianshi'),

                    new Platform('豆瓣组 社畜买房共进会', topSearchForDouBanSheChuMaiFangGongJinHui, require('@/assets/logos/tgmeng-trend_she_chu_mai_fang_gong_jin_hui.png'), 112, '/life/shechumaifanggongjinhui'),
                    new Platform('豆瓣组 我们都不懂车', topSearchForDouBanWoMenDouBuDongChe, require('@/assets/logos/tgmeng-trend_wo_men_dou_bu_dong_che.png'), 113, '/life/womendoubudongche'),
                    new Platform('豆瓣组 教师', topSearchForDouBanJiaoShi, require('@/assets/logos/tgmeng-trend_jiao_shi.png'), 114, '/life/jiaoshi'),
                    new Platform('豆瓣组 友谊的小船', topSearchForDouBanYouYiDeXiaoChuan, require('@/assets/logos/tgmeng-trend_you_yi_de_xiao_chuan.png'), 115, '/life/youyidexiaochuan'),

                    new Platform('豆瓣组 下厨房', topSearchForDouBanXiaChuFang, require('@/assets/logos/tgmeng-trend_xia_chu_fang.png'), 116, '/life/xiachufang'),
                    new Platform('豆瓣组 佳片推荐', topSearchForDouBanJiaPianTuiJian, require('@/assets/logos/tgmeng-trend_jia_pian_tui_jian.png'), 117, '/life/jiapiantuijian'),
                    new Platform('豆瓣组 我的城市拍给你看', topSearchForDouBanWoDeChengShiPaiGeiNiKan, require('@/assets/logos/tgmeng-trend_wo_de_cheng_shi_pai_gei_ni_kan.png'), 118, '/life/wodechengshipaigeinikan'),
                    new Platform('豆瓣组 村庄爱好者', topSearchForDouBanCunZhuangAiHaoZhe, require('@/assets/logos/tgmeng-trend_cun_zhuang_ai_hao_zhe.png'), 119, '/life/cunzhuangaihaozhe'),

                    new Platform('豆瓣组 抬头，看树！', topSearchForDouBanTaiTouKanShu, require('@/assets/logos/tgmeng-trend_tai_tou_kan_shu.png'), 120, '/life/taitoukanshu'),
                    new Platform('豆瓣组 街猫也可爱', topSearchForDouBanJieMaoYeKeAi, require('@/assets/logos/tgmeng-trend_jie_mao_ye_ke_ai.png'), 121, '/life/jiemaoyekeai'),
                    new Platform('豆瓣组 豆瓣鸟组', topSearchForDouBanDouBanNiaoZu, require('@/assets/logos/tgmeng-trend_dou_ban_niao_zu.png'), 122, '/life/niaozu'),
                    new Platform('豆瓣组 可爱事物分享', topSearchForDouBanKeAiShiWuFenXiang, require('@/assets/logos/tgmeng-trend_ke_ai_shi_wu_fen_xiang.png'), 123, '/life/keaishiwufenxiang'),

                ]
            },

            {
                name: '社区',
                routerName: 'community',
                id: 5,
                isShow: true,
                sort: 5,
                subCategories: [
                    new Platform('Hacker News', topSearchForHackerNews, require('@/assets/logos/tgmeng-trend_hackernews.png'), 22.1, '/community/hackernews'),
                    new Platform('V2EX', topSearchForV2ex, require('@/assets/logos/tgmeng-trend_v2ex.png'), 22.2, '/community/v2ex'),
                    new Platform('NodeLoc', topSearchForNodeLocHot, require('@/assets/logos/tgmeng-trend_nodeloc.png'), 22.21, '/community/nodelochot'),
                    new Platform('虎扑步行街', topSearchForBuXingJieHuPu, require('@/assets/logos/tgmeng-trend_buxingjiehupu.png'), 22.3, '/community/buxingjiehupu'),
                    new Platform('知乎', topSearchForZhiHu, require('@/assets/logos/tgmeng-trend_zhihu.png'), 22.4, '/community/zhihu'),
                    new Platform('百度贴吧', topSearchForBaiDuTieBa, require('@/assets/logos/tgmeng-trend_baidutieba.png'), 22.5, '/community/tiebabaidu'),
                    new Platform('豆瓣', topSearchForDouBan, require('@/assets/logos/tgmeng-trend_douban.png'), 22.6, '/community/douban'),
                    // new Platform('一亩三分地', topSearchForYiMuSanFenDi, require('@/assets/logos/tgmeng-trend_yimusanfendi.png'), 22.7),
                    new Platform('掘金', topSearchForWenZhangJueJin, require('@/assets/logos/tgmeng-trend_juejin.png'), 22.8, '/community/wenzhangjuejin'),
                    new Platform('NGA', topSearchForNga, require('@/assets/logos/tgmeng-trend_nga.png'), 22.9, '/community/douyin'),
                    new Platform('虫部落', cacheSearchForchongbuluo, require('@/assets/logos/tgmeng-trend_chongbuluo.png'), 22.93, '/community/chongbuluo'),
                    new Platform('宽带山', cacheSearchForkdsshanghaitoutiao, require('@/assets/logos/tgmeng-trend_kdsshanghaitoutiao.png'), 22.95, '/community/kdsshanghaitoutiao'),

                    new Platform('通信人家园', cacheSearchFortongxinrenjiayuan, require('@/assets/logos/tgmeng-trend_tongxinrenjiayuan.png'), 22.97, '/community/tongxinrenjiayuan'),
                    new Platform('Emacs China', cacheSearchForemacschina, require('@/assets/logos/tgmeng-trend_emacschina.png'), 22.98, '/community/emacschina'),
                    new Platform('Ruby China', cacheSearchForrubychina, require('@/assets/logos/tgmeng-trend_rubychina.png'), 22.99, '/community/rubychina'),
                    new Platform('凯迪网', cacheSearchForkaidiwang, require('@/assets/logos/tgmeng-trend_kaidiwang.png'), 22.991, '/community/kaidiwang'),
                    new Platform('We Are Seller', cacheSearchForzhiwubuyankuajingdianshangshequ, require('@/assets/logos/tgmeng-trend_zhiwubuyankuajingdianshangshequ.png'), 22.9, '/community/zhiwubuyankuajingdianshangshequ'),
                    new Platform('开源资讯', cacheSearchForkaiyuanzixun, require('@/assets/logos/tgmeng-trend_kaiyuanzixun.png'), 22.992, '/community/kaiyuanzixun'),
                    new Platform('经管之家', cacheSearchForjingguanzhijia, require('@/assets/logos/tgmeng-trend_jingguanzhijia.png'), 22.993, '/community/jingguanzhijia'),
                    new Platform('看雪', cacheSearchForkanxue, require('@/assets/logos/tgmeng-trend_kanxue.png'), 22.9931, '/community/kanxue'),
                    new Platform('水木社区', cacheSearchForshuimushequ, require('@/assets/logos/tgmeng-trend_shuimushequ.png'), 22.9932, '/community/shuimushequ'),
                    new Platform('先知社区', cacheSearchForxianzhishequ, require('@/assets/logos/tgmeng-trend_xianzhishequ.png'), 22.9934, '/community/xianzhishequ'),
                    // 这个吾爱破解服务器访问不了，先不展示
                    // new Platform('吾爱破解', cacheSearchForwuaipojie, require('@/assets/logos/tgmeng-trend_wuaipojie.png'), 22.995, '/community/wuaipojie'),
                ]
            },
            {
                name: '财经',
                routerName: 'finance',
                id: 6,
                isShow: true,
                sort: 6,
                subCategories: [
                    new Platform('财联社', topSearchForCaiLianShe, require('@/assets/logos/tgmeng-trend_cailianshe.png'), 23, '/finance/cailianshe'),
                    new Platform('华尔街见闻', topSearchForHuaErJieJianWen, require('@/assets/logos/tgmeng-trend_huaerjiejianwen.png'), 24, '/finance/huaerjiejianwen'),
                    new Platform('同花顺', topSearchForTongHuaShun, require('@/assets/logos/tgmeng-trend_tonghuashun.png'), 25, '/finance/tonghuashun'),
                    new Platform('金融界', topSearchForJingRongJie, require('@/assets/logos/tgmeng-trend_jinrongjie.png'), 26, '/finance/jinrongjie'),
                    new Platform('第一财经', topSearchForDiYiCaiJing, require('@/assets/logos/tgmeng-trend_diyicaijing.png'), 27, '/finance/diyicaijing'),
                    new Platform('格隆汇', topSearchForGeLongHui, require('@/assets/logos/tgmeng-trend_gelonghui.png'), 28, '/finance/gelonghui'),
                    new Platform('法布', topSearchForFaBu, require('@/assets/logos/tgmeng-trend_fabu.png'), 29, '/finance/fabu'),
                    new Platform('金十', topSearchForJinShi, require('@/assets/logos/tgmeng-trend_jinshi.png'), 30, '/finance/jinshi'),
                    new Platform('智通财经', topSearchForZhiTongCaiJing, require('@/assets/logos/tgmeng-trend_zhitongcaijing.png'), 30.1, '/finance/zhitongcaijing'),

                    new Platform('21经济网', cacheSearchFor21jingjiwang, require('@/assets/logos/tgmeng-trend_21jingjiwang.png'), 30.2, '/finance/21jingjiwang'),
                    new Platform('东方财富网', cacheSearchFordongfangcaifuwang, require('@/assets/logos/tgmeng-trend_dongfangcaifuwang.png'), 30.3, '/finance/dongfangcaifuwang'),
                    new Platform('经济观察网', cacheSearchForjingjiguanchawang, require('@/assets/logos/tgmeng-trend_jingjiguanchawang.png'), 30.5, '/finance/jingjiguanchawang'),
                    new Platform('时代在线', cacheSearchForshidaizaixian, require('@/assets/logos/tgmeng-trend_shidaizaixian.png'), 30.6, '/finance/shidaizaixian'),
                    new Platform('金色财经', cacheSearchForjingsecaijing, require('@/assets/logos/tgmeng-trend_jingsecaijing.png'), 30.7, '/finance/jingsecaijing'),
                    new Platform('新浪财经', cacheSearchForxinlangcaijing, require('@/assets/logos/tgmeng-trend_xinlangcaijing.png'), 30.8, '/finance/xinlangcaijing'),
                    new Platform('会计头条', cacheSearchForkuaijitoutiao, require('@/assets/logos/tgmeng-trend_kuaijitoutiao.png'), 30.9, '/finance/kuaijitoutiao'),
                    new Platform('老虎财经', cacheSearchForlaohucaijing, require('@/assets/logos/tgmeng-trend_laohucaijing.png'), 30.91, '/finance/laohucaijing'),
                    new Platform('BlockBeats', cacheSearchForblockbeats, require('@/assets/logos/tgmeng-trend_blockbeats.png'), 30.92, '/finance/blockbeats'),
                    new Platform('汇通财经', cacheSearchForhuitongcaijing, require('@/assets/logos/tgmeng-trend_huitongcaijing.png'), 30.93, '/finance/huitongcaijing'),
                    new Platform('每经网', cacheSearchFormeijingwang, require('@/assets/logos/tgmeng-trend_meijingwang.png'), 30.94, '/finance/meijingwang'),
                    new Platform('选股通', cacheSearchForxuangutong, require('@/assets/logos/tgmeng-trend_xuangutong.png'), 30.95, '/finance/xuangutong'),
                    new Platform('Chain Catcher', cacheSearchForchaincatcher, require('@/assets/logos/tgmeng-trend_chaincatcher.png'), 30.96, '/finance/chaincatcher'),
                    new Platform('科创板日报', cacheSearchForkechuangbanribao, require('@/assets/logos/tgmeng-trend_kechuangbanribao.png'), 30.97, '/finance/kechuangbanribao'),
                ],
            },
            {
                name: '体育',
                routerName: 'sports',
                id: 7,
                isShow: true,
                sort: 7,
                subCategories: [
                    new Platform('央视体育', topSearchForYangShiTiYu, require('@/assets/logos/tgmeng-trend_yangshitiyu.png'), 31, '/sports/yangshitiyu'),
                    new Platform('虎扑', topSearchForHuPu, require('@/assets/logos/tgmeng-trend_huputiyu.png'), 32, '/sports/hupu'),
                    new Platform('新浪体育', topSearchForXinLangTiYu, require('@/assets/logos/tgmeng-trend_xinlangtiyu.png'), 33, '/sports/xinlangtiyu'),
                    new Platform('网易体育', topSearchForWangYiTiYu, require('@/assets/logos/tgmeng-trend_wangyitiyu.png'), 34, '/sports/tiyuwangyi'),
                    new Platform('搜狐体育', topSearchForSouHuTiYu, require('@/assets/logos/tgmeng-trend_souhutiyu.png'), 35, '/sports/souhutiyu'),
                    new Platform('PP体育', topSearchForPPTiYu, require('@/assets/logos/tgmeng-trend_pptiyu.png'), 36, '/sports/pptiyu'),
                    new Platform('懂球帝', topSearchForDongQiuDi, require('@/assets/logos/tgmeng-trend_dongqiudi.png'), 37, '/sports/dongqiudi'),
                    new Platform('直播吧', topSearchForZhiBoBa, require('@/assets/logos/tgmeng-trend_zhiboba.png'), 38, '/sports/zhiboba'),
                ]
            },
            {
                name: '科技',
                routerName: 'technology',
                id: 8,
                isShow: true,
                sort: 8,
                subCategories: [
                    new Platform('MIT科技评论', topSearchForMIT, require('@/assets/logos/tgmeng-trend-mit.png'), 39, '/technology/mit'),
                    new Platform('机器之心', topSearchJiQiZhiXin, require('@/assets/logos/tgmeng-trend_jiqizhixin.png'), 40, '/technology/jiqizhixin'),

                    new Platform('阿里云社区', topSearchAliYunSheQu, require('@/assets/logos/tgmeng-trend_aliyunshequ.png'), 40.01, '/technology/aliyunshequ'),
                    new Platform('腾讯云社区', topSearchTengXunYunSheQu, require('@/assets/logos/tgmeng-trend_tengxunyunshequ.png'), 40.02, '/technology/tengxunyunshequ'),
                    new Platform('美团社区', topSearchMeiTuanSheQu, require('@/assets/logos/tgmeng-trend_meituanshequ.png'), 40.03, '/technology/meituanshequ'),

                    new Platform('智源社区', topSearchZhiYuanSheQu, require('@/assets/logos/tgmeng-trend_zhiyuanshequ.png'), 40.04, '/technology/zhiyuanshequ'),
                    new Platform('量子位', topSearchLiangZiWei, require('@/assets/logos/tgmeng-trend_liangziwei.png'), 40.05, '/technology/liangziwei'),
                    new Platform('新智元', topSearchXinZhiYuan, require('@/assets/logos/tgmeng-trend_xinzhiyuan.png'), 40.06, '/technology/xinzhiyuan'),

                    new Platform('36氪', cacheSearchFor36ke, require('@/assets/logos/tgmeng-trend_36ke.png'), 40.1, '/technology/36ke'),
                    new Platform('IT之家', cacheSearchForitzhijia, require('@/assets/logos/tgmeng-trend_itzhijia.png'), 40.11, '/technology/itzhijia'),
                    new Platform('极客公园', cacheSearchForjikegongyuan, require('@/assets/logos/tgmeng-trend_jikegongyuan.png'), 40.12, '/technology/jikegongyuan'),
                    new Platform('ReadHub', cacheSearchForreadhub, require('@/assets/logos/tgmeng-trend_readhub.png'), 40.13, '/technology/readhub'),
                    new Platform('钛媒体', cacheSearchFortaimeiti, require('@/assets/logos/tgmeng-trend_taimeiti.png'), 40.14, '/technology/taimeiti'),
                    new Platform('中关村在线', cacheSearchForzhongguancunzaixian, require('@/assets/logos/tgmeng-trend_zhongguancunzaixian.png'), 40.15, '/technology/zhongguancunzaixian'),
                    new Platform('蓝点网', cacheSearchForlandianwang, require('@/assets/logos/tgmeng-trend_landianwang.png'), 40.16, '/technology/landianwang'),
                    new Platform('创业邦', cacheSearchForchuangyebang, require('@/assets/logos/tgmeng-trend_chuangyebang.png'), 40.17, '/technology/chuangyebang'),
                    new Platform('i黑马', cacheSearchForiheima, require('@/assets/logos/tgmeng-trend_iheima.png'), 40.18, '/technology/iheima'),
                    new Platform('雷锋网', cacheSearchForleifengwang, require('@/assets/logos/tgmeng-trend_leifengwang.png'), 40.19, '/technology/leifengwang'),
                    new Platform('全天候科技', cacheSearchForquantianhoukeji, require('@/assets/logos/tgmeng-trend_quantianhoukeji.png'), 40.20, '/technology/quantianhoukeji'),
                    new Platform('物联网智库', cacheSearchForwulianwangzhiku, require('@/assets/logos/tgmeng-trend_wulianwangzhiku.png'), 40.21, '/technology/wulianwangzhiku'),
                    new Platform('快科技', cacheSearchForkuaikeji, require('@/assets/logos/tgmeng-trend_kuaikeji.png'), 40.22, '/technology/kuaikeji'),
                    new Platform('TechWeb', cacheSearchFortechweb, require('@/assets/logos/tgmeng-trend_techweb.png'), 40.23, '/technology/techweb'),
                    new Platform('理想生活实验室', cacheSearchForlixiangshenghuoshiyanshi, require('@/assets/logos/tgmeng-trend_lixiangshenghuoshiyanshi.png'), 40.24, '/technology/lixiangshenghuoshiyanshi'),
                    new Platform('多知', cacheSearchForduozhi, require('@/assets/logos/tgmeng-trend_duozhi.png'), 40.25, '/technology/duozhi'),
                    new Platform('芥末堆', cacheSearchForjiemodui, require('@/assets/logos/tgmeng-trend_jiemodui.png'), 40.26, '/technology/jiemodui'),
                    new Platform('艾媒网', cacheSearchForaimeiwang, require('@/assets/logos/tgmeng-trend_aimeiwang.png'), 40.27, '/technology/aimeiwang'),
                    new Platform('站长之家', cacheSearchForzhanzhangzhijia, require('@/assets/logos/tgmeng-trend_zhanzhangzhijia.png'), 40.28, '/technology/zhanzhangzhijia'),
                    new Platform('猎云网', cacheSearchForlieyunwang, require('@/assets/logos/tgmeng-trend_lieyunwang.png'), 40.29, '/technology/lieyunwang'),

                    // EurekAlert服务器暂时没法访问，所以先不放了
                    // new Platform('EurekAlert', topSearchForEurekAlert, require('@/assets/logos/tgmeng-trend-eurekalert.png'), 41),
                    new Platform('NCSTI-人工智能', topSearchForRenGongZhiNengGuoJiKeJiChuangXinZhongXin, require('@/assets/logos/tgmeng-trend_ncsti.png'), 42, '/technology/rengongzhinengguojikejichuangxinzhongxin'),
                    new Platform('NCSTI-医药健康', topSearchForYiYaoJianKangGuoJiKeJiChuangXinZhongXin, require('@/assets/logos/tgmeng-trend_ncsti.png'), 43, '/technology/yiyaojiankangguojikejichuangxinzhongxin'),
                    new Platform('Star总榜', topSearchForGitHubAllStars, require('@/assets/logos/tgmeng-trend_github.png'), 90, '/technology/allstars'),
                    new Platform('近一日新仓库Star', topSearchForGitHubDaystars, require('@/assets/logos/tgmeng-trend_github.png'), 91, '/technology/daystars'),
                    new Platform('近一周新仓库Star', topSearchForGitHubWeekstars, require('@/assets/logos/tgmeng-trend_github.png'), 92, '/technology/weekstars'),
                    new Platform('近一月新仓库Star', topSearchForGitHubMonthstars, require('@/assets/logos/tgmeng-trend_github.png'), 93, '/technology/monthstars'),
                    new Platform('近一年新仓库Star', topSearchForGitHubYearstars, require('@/assets/logos/tgmeng-trend_github.png'), 94, '/technology/yearstars'),
                    new Platform('近三年新仓库Star', topSearchForGitHubThreeYearStars, require('@/assets/logos/tgmeng-trend_github.png'), 95, '/technology/threeyearstars'),
                    new Platform('近五年新仓库Star', topSearchForGitHubFiveYearStars, require('@/assets/logos/tgmeng-trend_github.png'), 96, '/technology/fiveyearstars'),
                    new Platform('近十年新仓库Star', topSearchForGitHubTenYearStars, require('@/assets/logos/tgmeng-trend_github.png'), 97, '/technology/tenyearstars'),
                    new Platform('Spaces热门榜', topSearchForHuggingFaceSpaceTrending, require('@/assets/logos/tgmeng-trend_huggingface.png'), 98, '/technology/huggingfacespacestrending'),
                    new Platform('Spaces点赞榜', topSearchForHuggingFaceSpaceLikes, require('@/assets/logos/tgmeng-trend_huggingface.png'), 99, '/technology/huggingfacespaceslikes'),
                    new Platform('Models热门榜', topSearchForHuggingFaceModelTrending, require('@/assets/logos/tgmeng-trend_huggingface.png'), 100, '/technology/huggingfacemodelstrending'),
                    new Platform('Models点赞榜', topSearchForHuggingFaceModelLikes, require('@/assets/logos/tgmeng-trend_huggingface.png'), 101, '/technology/huggingfacemodellikes'),
                    new Platform('Datasets热门榜', topSearchForHuggingFaceDatasetsTrending, require('@/assets/logos/tgmeng-trend_huggingface.png'), 102, '/technology/huggingfacedatasetstrending'),
                    new Platform('Datasets点赞榜', topSearchForHuggingFaceDatasetsLikes, require('@/assets/logos/tgmeng-trend_huggingface.png'), 103, '/technology/huggingfacedatasetslikes'),
                ]
            },
            {
                name: '设计',
                routerName: 'design',
                id: 9,
                isShow: true,
                sort: 9,
                subCategories: [
                    new Platform('人人都是产品经理', topSearchForWoShiPM, require('@/assets/logos/tgmeng-trend_woshipm.png'), 44, '/design/woshipm'),
                    new Platform('优设网', topSearchForYouSheWang, require('@/assets/logos/tgmeng-trend_youshewang.png'), 45, '/design/youshewang'),
                    new Platform('TOPYS', topSearchForTopys, require('@/assets/logos/tgmeng-trend_topys.png'), 46, '/design/topys'),
                    new Platform('ArchDaily', topSearchForArchDaily, require('@/assets/logos/tgmeng-trend_archdaily.jpg'), 47, '/design/archdaily'),
                    new Platform('站酷作品榜', topSearchForZhanKuZuoPinBang, require('@/assets/logos/tgmeng-trend_zhanku.jpg'), 48, '/design/zuopinbangzhanku'),
                    new Platform('站酷潜力榜', topSearchForZhanKuQianLiBang, require('@/assets/logos/tgmeng-trend_zhanku.jpg'), 49, '/design/qianlibangzhanku'),
                    new Platform('站酷文章榜', topSearchForZhanKuWenZhangBang, require('@/assets/logos/tgmeng-trend_zhanku.jpg'), 50, '/design/wenzhangbangzhanku'),
                    new Platform('设计达人', topSearchForSheJiDaRen, require('@/assets/logos/tgmeng-trend_shejidaren.png'), 51, '/design/shejidaren'),
                    new Platform('Abduzeedo', topSearchForAbduzeedo, require('@/assets/logos/tgmeng-trend_abduzeedo.png'), 52, '/design/abduzeedo'),
                    new Platform('Core77', topSearchForCore77, require('@/assets/logos/tgmeng-trend_core77.jpg'), 53, '/design/core77'),
                    new Platform('Dribbble', topSearchForDribbble, require('@/assets/logos/tgmeng-trend_dribbble.jpg'), 54, '/design/dribbble'),
                    new Platform('Awwwards', topSearchForAwwwards, require('@/assets/logos/tgmeng-trend_awwwards.png'), 55, '/design/awwwards'),
                    new Platform('涂鸦王国热门作品', topSearchForReMenZuoPinTuYaWangGuo, require('@/assets/logos/tgmeng-trend_tuyawangguo.jpg'), 56, '/design/remenzuopintuyawangguo'),
                    new Platform('涂鸦王国精选作品', topSearchForJingXuanZuoPinTuYaWangGuo, require('@/assets/logos/tgmeng-trend_tuyawangguo.jpg'), 57, '/design/jingxuanzuopintuyawangguo'),
                    new Platform('涂鸦王国今日新作', topSearchForJinRiXinZuoTuYaWangGuo, require('@/assets/logos/tgmeng-trend_tuyawangguo.jpg'), 58, '/design/jinrixinzuotuyawangguo'),
                    new Platform('涂鸦王国发现新作', topSearchForFaXianXinZuoTuYaWangGuo, require('@/assets/logos/tgmeng-trend_tuyawangguo.jpg'), 59, '/design/faxianxinzuotuyawangguo'),
                    new Platform('腾讯设计开放平台', cacheSearchFortengxunshejikaifangpingtai, require('@/assets/logos/tgmeng-trend_tengxunshejikaifangpingtai.png'), 59.1, '/design/tengxunshejikaifangpingtai'),
                ]
            },
            {
                name: '影音',
                routerName: 'audiovideo',
                id: 10,
                isShow: true,
                sort: 10,
                subCategories: [
                    new Platform('猫眼 周票房榜', topSearchForZhouPiaoFangBangMaoYan, require('@/assets/logos/tgmeng-trend_maoyan.png'), 60, '/audiovideo/zhoupiaofangbangmaoyan'),
                    new Platform('猫眼 想看榜', topSearchForXiangkanBangMaoYan, require('@/assets/logos/tgmeng-trend_maoyan.png'), 61, '/audiovideo/xiangkanbangmaoyan'),
                    new Platform('猫眼 购票评分榜', topSearchForGouPiaoPingFenBangMaoYan, require('@/assets/logos/tgmeng-trend_maoyan.png'), 62, '/audiovideo/goupiaopingfenbangmaoyan'),
                    new Platform('猫眼 历史总榜', topSearchForTop100MaoYan, require('@/assets/logos/tgmeng-trend_maoyan.png'), 63, '/audiovideo/top100maoyan'),

                    new Platform('网易云 飙升榜', topSearchForWangYiYunBiaoSheng, require('@/assets/logos/tgmeng-trend_wangyiyun.png'), 86, '/audiovideo/biaoshengwangyiyun'),
                    new Platform('网易云 新歌榜', topSearchForWangYiYunXinGe, require('@/assets/logos/tgmeng-trend_wangyiyun.png'), 87, '/audiovideo/xingegwangyiyun'),
                    new Platform('网易云 原创榜', topSearchForWangYiYunYuanChuang, require('@/assets/logos/tgmeng-trend_wangyiyun.png'), 88, '/audiovideo/yuanchuangwangyiyun'),
                    new Platform('网易云 热歌榜', topSearchForWangYiYunReGe, require('@/assets/logos/tgmeng-trend_wangyiyun.png'), 89, '/audiovideo/regewangyiyun'),

                    new Platform('腾讯视频 综艺', topSearchForZongYiTengXun, require('@/assets/logos/tgmeng-trend_tengxunshipin.png'), 64, '/audiovideo/zongyitengxun'),
                    new Platform('爱奇艺 综艺', topSearchForZongYiAiQiYi, require('@/assets/logos/tgmeng-trend_aiqiyi.png'), 65, '/audiovideo/zongyiaiqiyi'),
                    new Platform('芒果 综艺', topSearchForZongYiMangGuo, require('@/assets/logos/tgmeng-trend_mangguo.png'), 66, '/audiovideo/zongyimangguo'),
                    new Platform('优酷 综艺', topSearchForZongYiYouKu, require('@/assets/logos/tgmeng-trend_youku.png'), 67, '/audiovideo/zongyiyouku'),

                    new Platform('腾讯视频 电视剧', topSearchForDianShiJuTengXun, require('@/assets/logos/tgmeng-trend_tengxunshipin.png'), 68, '/audiovideo/dianshijutengxun'),
                    new Platform('爱奇艺 电视剧', topSearchForDianShiJuAiQiYi, require('@/assets/logos/tgmeng-trend_aiqiyi.png'), 69, '/audiovideo/dianshijuaiqiyi'),
                    new Platform('芒果 电视剧', topSearchForDianShiJuMangGuo, require('@/assets/logos/tgmeng-trend_mangguo.png'), 70, '/audiovideo/dianshijumangguo'),
                    new Platform('优酷 电视剧', topSearchForDianShiJuYouKu, require('@/assets/logos/tgmeng-trend_youku.png'), 71, '/audiovideo/dianshijuyouku'),

                    new Platform('腾讯视频 电影', topSearchForDianYingTengXun, require('@/assets/logos/tgmeng-trend_tengxunshipin.png'), 72, '/audiovideo/dianyingtengxun'),
                    new Platform('爱奇艺 电影', topSearchForDianYingAiQiYi, require('@/assets/logos/tgmeng-trend_aiqiyi.png'), 73, '/audiovideo/dianyingaiqiyi'),
                    new Platform('芒果 电影', topSearchForDianYingMangGuo, require('@/assets/logos/tgmeng-trend_mangguo.png'), 74, '/audiovideo/dianyingmangguo'),
                    new Platform('优酷 电影', topSearchForDianYingYouKu, require('@/assets/logos/tgmeng-trend_youku.png'), 75, '/audiovideo/dianyingyouku'),

                    new Platform('腾讯视频 动漫', topSearchForDongManTengXun, require('@/assets/logos/tgmeng-trend_tengxunshipin.png'), 76, '/audiovideo/dongmantengxun'),
                    new Platform('爱奇艺 动漫', topSearchForDongManAiQiYi, require('@/assets/logos/tgmeng-trend_aiqiyi.png'), 77, '/audiovideo/dongmanaiqiyi'),
                    new Platform('芒果 动漫', topSearchForDongManMangGuo, require('@/assets/logos/tgmeng-trend_mangguo.png'), 78, '/audiovideo/dongmanmangguo'),
                    new Platform('优酷 动漫', topSearchForDongManYouKu, require('@/assets/logos/tgmeng-trend_youku.png'), 79, '/audiovideo/dongmanyouku'),

                    new Platform('腾讯视频 总榜', topSearchForZongBangTengXun, require('@/assets/logos/tgmeng-trend_tengxunshipin.png'), 80, '/audiovideo/zongbangtengxun'),
                    new Platform('爱奇艺 总榜', topSearchForZongBangAiQiYi, require('@/assets/logos/tgmeng-trend_aiqiyi.png'), 81, '/audiovideo/zongbangaiqiyi'),
                    new Platform('芒果 总榜', topSearchForZongBangMangGuo, require('@/assets/logos/tgmeng-trend_mangguo.png'), 82, '/audiovideo/zongbangmangguo'),
                    new Platform('优酷 总榜', topSearchForZongBangYouKu, require('@/assets/logos/tgmeng-trend_youku.png'), 83, '/audiovideo/zongbangyouku'),

                    new Platform('百度 电视剧', topSearchForDianShiJuBaiDu, require('@/assets/logos/tgmeng-trend_dianshiju.png'), 84, '/audiovideo/dianshijubaidu'),
                    new Platform('百度 电影', topSearchForDianYingBaiDu, require('@/assets/logos/tgmeng-trend_dianying.png'), 85, '/audiovideo/dianyingbaidu'),
                ]
            },
            {
                name: '游戏',
                routerName: 'game',
                id: 11,
                isShow: true,
                sort: 11,
                subCategories: [
                    new Platform('IGN', topSearchForIGN, require('@/assets/logos/tgmeng-trend_ign.png'), 124, '/game/ign'),
                    new Platform('3DMGAME', topSearchFor3DMGAME, require('@/assets/logos/tgmeng-trend_3dmgame.png'), 125, '/game/3dmgame'),
                    new Platform('A9VG', topSearchForA9VG, require('@/assets/logos/tgmeng-trend_a9vg.png'), 126, '/game/a9vg'),
                    new Platform('GCORES', topSearchForGCORES, require('@/assets/logos/tgmeng-trend_gcores.png'), 127, '/game/gcores'),
                    new Platform('游民星空', topSearchForYouMinXingKong, require('@/assets/logos/tgmeng-trend_youminxingkong.png'), 128, '/game/youminxingkong'),
                    new Platform('游戏陀螺', topSearchForYouXiTuoLuo, require('@/assets/logos/tgmeng-trend_youxituoluo.png'), 129, '/game/youxituoluo'),
                    new Platform('游研社', topSearchForYouYanShe, require('@/assets/logos/tgmeng-trend_youyanshe.png'), 130, '/game/youyanshe'),
                    new Platform('游侠网', topSearchForYouXiaWang, require('@/assets/logos/tgmeng-trend_youxiawang.png'), 131, '/game/youxiawang'),
                    new Platform('17173', topSearchFor17173, require('@/assets/logos/tgmeng-trend_17173.png'), 132, '/game/17173'),
                    new Platform('电玩帮', cacheSearchFordianwanbang, require('@/assets/logos/tgmeng-trend_dianwanbang.png'), 132.1, '/game/dianwanbang'),

                    new Platform('QooApp 手機遊戲', cacheSearchForQooAppShouJiYouXi, require('@/assets/logos/tgmeng-trend_qooapp.png'), 132.1, '/game/qooapp/shoujiyouxi'),
                    new Platform('QooApp PC&主機', cacheSearchForQooAppPcZhuJi, require('@/assets/logos/tgmeng-trend_qooapp.png'), 132.1, '/game/qooapp/pczhuji'),
                    new Platform('巴哈姆特 手機', cacheSearchForBaHaMuTeShouJi, require('@/assets/logos/tgmeng-trend_bahamute.png'), 132.1, '/game/bahamute/shouji'),
                    new Platform('巴哈姆特 PC', cacheSearchForBaHaMuTePc, require('@/assets/logos/tgmeng-trend_bahamute.png'), 132.1, '/game/bahamute/pc'),
                    new Platform('巴哈姆特 TV', cacheSearchForBaHaMuTeTv, require('@/assets/logos/tgmeng-trend_bahamute.png'), 132.1, '/game/bahamute/tv'),
                    new Platform('巴哈姆特 新訊', cacheSearchForBaHaMuTeXinXun, require('@/assets/logos/tgmeng-trend_bahamute.png'), 132.1, '/game/bahamute/xinxun'),
                    new Platform('4Gamer PC', cacheSearchFor4GamerPc, require('@/assets/logos/tgmeng-trend_4gamer.png'), 132.1, '/game/4gamer/pc'),
                    new Platform('4Gamer Xbox', cacheSearchFor4GamerXbox, require('@/assets/logos/tgmeng-trend_4gamer.png'), 132.1, '/game/4gamer/xbox'),
                    new Platform('4Gamer PS5/PS4', cacheSearchFor4GamerPs, require('@/assets/logos/tgmeng-trend_4gamer.png'), 132.1, '/game/4gamer/ps'),
                    new Platform('4Gamer Switch', cacheSearchFor4GamerSwitch, require('@/assets/logos/tgmeng-trend_4gamer.png'), 132.1, '/game/4gamer/switch'),
                    new Platform('4Gamer スマホ', cacheSearchFor4GamerSmartPhone, require('@/assets/logos/tgmeng-trend_4gamer.png'), 132.1, '/game/4gamer/smartphone'),
                    new Platform('4Gamer VR', cacheSearchFor4GamerVr, require('@/assets/logos/tgmeng-trend_4gamer.png'), 132.1, '/game/4gamer/vr'),
                    new Platform('4Gamer ハードウェア', cacheSearchFor4GamerHardWare, require('@/assets/logos/tgmeng-trend_4gamer.png'), 132.1, '/game/4gamer/hardware'),
                    new Platform('4Gamer AC', cacheSearchFor4GamerArcade, require('@/assets/logos/tgmeng-trend_4gamer.png'), 132.1, '/game/4gamer/arcade'),
                    new Platform('4Gamer アナログ', cacheSearchFor4GamerAnalog, require('@/assets/logos/tgmeng-trend_4gamer.png'), 132.1, '/game/4gamer/analog'),
                    new Platform('4Gamer Wii', cacheSearchFor4GamerWii, require('@/assets/logos/tgmeng-trend_4gamer.png'), 132.1, '/game/4gamer/wii'),
                    new Platform('4Gamer PSV', cacheSearchFor4GamerVita, require('@/assets/logos/tgmeng-trend_4gamer.png'), 132.1, '/game/4gamer/vita'),
                    new Platform('4Gamer 3DS', cacheSearchFor4GamerNds, require('@/assets/logos/tgmeng-trend_4gamer.png'), 132.1, '/game/4gamer/nds'),
                    new Platform('遊戲基地 手機遊戲', cacheSearchGameBaseShouJiYouXi, require('@/assets/logos/tgmeng-trend_youxijidi.png'), 132.1, '/game/gamebase/shoujiyouxi'),
                    new Platform('遊戲基地 PC', cacheSearchGameBasePc, require('@/assets/logos/tgmeng-trend_youxijidi.png'), 132.1, '/game/gamebase/pc'),
                    new Platform('遊戲基地 TV掌機', cacheSearchGameBaseTvZhangJi, require('@/assets/logos/tgmeng-trend_youxijidi.png'), 132.1, '/game/gamebase/tvzhangji'),
                ]


            },
            {
                name: '健康',
                routerName: 'health',
                id: 12,
                isShow: true,
                sort: 12,
                subCategories: [
                    new Platform('生物谷', topSearchForShengWuGu, require('@/assets/logos/tgmeng-trend_shengwugu.png'), 133, '/health/shengwugu'),
                    new Platform('生命时报', topSearchForShengMingShiBao, require('@/assets/logos/tgmeng-trend_shengmingshibao.png'), 134, '/health/shengmingshibao'),
                    new Platform('丁香医生', topSearchForDingXiangYiSheng, require('@/assets/logos/tgmeng-trend_dingxiangyisheng.png'), 136, '/health/dingxiangyisheng'),
                    new Platform('医药魔方', topSearchForYiYaoMoFang, require('@/assets/logos/tgmeng-trend_yiyaomofang.png'), 137, '/health/yiyaomofang'),
                    new Platform('家医大健康', topSearchForJiaYiDaJianKang, require('@/assets/logos/tgmeng-trend_jiayidajiankang.png'), 138, '/health/jiayidajiankang'),
                    new Platform('健康时报网', topSearchForJianKangShiBaoWang, require('@/assets/logos/tgmeng-trend_jiankangshibaowang.png'), 139, '/health/jiankangshibaowang'),
                    new Platform('果壳', topSearchForGuoKe, require('@/assets/logos/tgmeng-trend_guoke.png'), 140, '/health/guoke'),
                ]
            },
            {
                name: '收藏',
                routerName: 'favorites',
                id: 13,
                isShow: true,
                sort: 13,
                subCategories: [],
            }
        ],
        activeCategory: {},
        workMaskExcelShow: false,
        workMaskVsCodeShow: false,
        // 顶部卡片位
        homeHeaderAdsCard: [
            {
                id: 1,
                name: '某某AI1',
                logo: require('@/assets/ads/test.png'),
                url: 'https://tgmeng.com',
                show: true,
                startTime: "2025-11-28 10:30:00",
                expireTime: "2025-11-28 23:59:59",
                status: 'active',
                desc: '某某集团',
                content: "***@gmail.com",
                note: '内部备注：首页顶部横幅广告'
            },
            {
                id: 2,
                name: '某某公司',
                logo: require('@/assets/image/girl/1 (1).jpg'),
                url: 'https://tgmeng.com',
                show: true,
                startTime: "2025-01-01 00:00:00",
                expireTime: "2025-11-28 23:59:59",
                status: 'active',
                desc: '某某集团',
                content: "qq:12345",
                note: '内部备注：首页顶部横幅广告'
            },
            {
                id: 3,
                name: '某某公司',
                logo: require('@/assets/ads/test.png'),
                url: 'https://tgmeng.com',
                show: true,
                startTime: "2025-01-01 00:00:00",
                expireTime: "2025-11-28 23:59:59",
                status: 'active',
                desc: '某某公司',
                content: "微信：***",
                note: '内部备注：首页顶部横幅广告'
            },
            {
                id: 4,
                name: '某某公司',
                logo: require('@/assets/ads/test.png'),
                url: 'https://tgmeng.com',
                show: true,
                startTime: "2025-01-01 00:00:00",
                expireTime: "2025-11-28 23:59:59",
                status: 'active',
                desc: '某某公司',
                content: "",
                note: '内部备注：首页顶部横幅广告'
            },
            {
                id: 5,
                name: '某某公司',
                logo: require('@/assets/ads/test.png'),
                url: 'https://tgmeng.com',
                show: true,
                startTime: "2025-01-01 00:00:00",
                expireTime: "2025-11-28 23:59:59",
                status: 'active',
                desc: '某某公司',
                content: "",
                note: '内部备注：首页顶部横幅广告'
            },
            {
                id: 6,
                name: '某某公司',
                logo: require('@/assets/ads/test.png'),
                url: 'https://tgmeng.com',
                show: true,
                startTime: "2025-01-01 00:00:00",
                expireTime: "2025-11-28 23:59:59",
                status: 'active',
                desc: '某某公司',
                content: "",
                note: '内部备注：首页顶部横幅广告'
            },
            {
                id: 7,
                name: '某某公司',
                logo: require('@/assets/ads/test.png'),
                url: 'https://tgmeng.com',
                show: true,
                startTime: "2025-01-01 00:00:00",
                expireTime: "2025-11-28 23:59:59",
                status: 'active',
                desc: '某某公司',
                content: "",
                note: '内部备注：首页顶部横幅广告'
            },
            {
                id: 8,
                name: '某某公司',
                logo: require('@/assets/ads/test.png'),
                url: 'https://tgmeng.com',
                show: true,
                startTime: "2025-01-01 00:00:00",
                expireTime: "2025-11-28 23:59:59",
                status: 'active',
                desc: '某某公司',
                content: "",
                note: '内部备注：首页顶部横幅广告'
            },
            {
                id: 9,
                name: '某某公司',
                logo: require('@/assets/ads/test.png'),
                url: 'https://tgmeng.com',
                show: true,
                startTime: "2025-01-01 00:00:00",
                expireTime: "2025-11-28 23:59:59",
                status: 'expired',
                desc: '某某公司',
                content: "",
                note: '内部备注：首页顶部横幅广告'
            },
        ]

    },
    mutations: {
        setCardHeight(state, newHeight) {
            state.cardHeight = newHeight;
        },
        setCardCols(state, newCols) {
            state.cardCols = newCols;
        },
        // 卡片顶部字体大小
        setCardTopFontSize(state, newSize) {
            state.cardTopFontSize = newSize;
        },
        setCardTitleFontSize(state, newSize) {
            state.cardTitleFontSize = newSize;
        },
        // 分类名称字体大小
        setCategroiesTitleFontSize(state, newSize) {
            state.categroiesTitleFontSize = newSize;
        },

        setExcelCardTopFontSize(state, newSize) {
            state.excelCardTopFontSize = newSize;
        },
        setExcelCardTopFontWeight(state, newWeight) {
            state.excelCardTopFontWeight = newWeight;
        },
        setExcelCardTitleFontSize(state, newSize) {
            state.excelCardTitleFontSize = newSize;
        },
        setExcelCardTitleFontWeight(state, newWeight) {
            state.excelCardTitleFontWeight = newWeight;
        },
        setExcelCategroiesTitleFontSize(state, newSize) {
            state.excelCategroiesTitleFontSize = newSize;
        },
        setExcelCategroiesTitleFontWeight(state, newWeight) {
            state.excelCategroiesTitleFontWeight = newWeight;
        },


        setCardDraggable(state, newDraggable) {
            state.cardDraggable = newDraggable;
        },
        setCategroiesDraggable(state, newDraggable) {
            state.categroiesDraggable = newDraggable;
        },
        setCardHotScoreShow(state, newShow) {
            state.cardHotScoreShow = newShow;
        },
        setCardTimeShow(state, newShow) {
            state.cardTimeShow = newShow;
        },
        setCardHotTitleFull(state, newFull) {
            state.cardHotTitleFull = newFull;
        },
        // 卡片标题是否显示完整
        setCardTitleFull(state, newFull) {
            state.cardTitleFull = newFull;
        },
        setDefaultCategoryId(state, newId) {
            state.defaultCategoryId = newId;
        },
        setCategroies(state, newCategroies) {
            state.categroies = newCategroies;
        },
        setActiveCategory(state, newCat) {
            state.activeCategory = newCat;
        },
        setWorkMaskExcelShow(state, newWorkMaskExcelShow) {
            state.workMaskExcelShow = newWorkMaskExcelShow;
        },
        setWorkMaskVsCodeShow(state, newWorkMaskVsCodeShow) {
            state.workMaskVsCodeShow = newWorkMaskVsCodeShow;
        },
        setTopCarouselFontShow(state, newTopCarouselFontShow) {
            state.topCarouselFontShow = newTopCarouselFontShow;
        },
        setWordCloudShow(state, newShow) {
            state.wordCloudShow = newShow;
        },
        setPageViewsShow(state, newShow) {
            state.pageViewsShow = newShow;
        },
        // 边距缩放，就是屏幕两边的，主要是为了移动端i
        setWidthPadding(state, newPadding) {
            state.widthPadding = newPadding;
        },
        setCardWidthForPhone(state, newWidth) {
            state.cardWidthForPhone = newWidth;
        },
        // 词云数量
        setWordCloudNum(state, newNum) {
            state.wordCloudNum = newNum;
        },
        setFishModeChooseShow(state, newFishModeChoose) {
            state.fishModeChooseShow = newFishModeChoose;
        },
        setSubscriptionSettingShow(state, newSubscription) {
            state.subscriptionSettingShow = newSubscription;
        },
        setCardHorizontalScrolling(state, newCardHorizontalScrolling) {
            state.cardHorizontalScrolling = newCardHorizontalScrolling;
        },
        // 广告是否开启
        setAdsEnabled(state, newAdsEnabled) {
            state.adsEnabled = newAdsEnabled;
        },
        // 词云触发搜索框用的
        triggerSearch(state, keyword) {
            state.searchKeyword = keyword;
            state.searchTrigger++; // 递增触发器，确保每次都能触发 watch
        },
        setIncludeWord(state, newNum) {
            state.includeWord = newNum;
        },
        setUnincludeWord(state, newNum) {
            state.unincludeWord = newNum;
        },
        setCardListLimit(state, newLimit) {
            state.cardListLimit = newLimit;
        }
    }
});
