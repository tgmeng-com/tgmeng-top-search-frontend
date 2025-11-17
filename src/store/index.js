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
    topSearchForDingXiangYuanSheQu,
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
        // 卡片列数
        cardCols: 4,
        // 卡片高度
        cardHeight: 30,
        // 卡片是否可以拖动
        cardDraggable: true,
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
        categroiesTitleFontSize: 1,
        // 默认选中的分类id
        defaultCategoryId: 1, // 默认分类ID
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
                    new Platform('腾讯', topSearchForTencent, require('@/assets/logos/tgmeng-trend_tencent.png'), 0),
                    new Platform('头条', topSearchForTouTiao, require('@/assets/logos/tgmeng-trend_toutiao.png'), 1),
                    new Platform('网易', topSearchForWangYi, require('@/assets/logos/tgmeng-trend_wangyi.png'), 2),
                    new Platform('百度', topSearchForBaiDu, require('@/assets/logos/tgmeng-trend_baidu.png'), 3),
                    new Platform('纽约时报', topSearchForNiuYueShiBao, require('@/assets/logos/tgmeng-trend_niuyueshibao.png'), 5),
                    new Platform('BBC', topSearchForBBC, require('@/assets/logos/tgmeng-trend_bbc.png'), 6),
                    new Platform('法广', topSearchForFaGuang, require('@/assets/logos/tgmeng-trend_faguang.png'), 7),
                    new Platform('澎湃新闻', topSearchForPengPaiXinWen, require('@/assets/logos/tgmeng-trend_pengpaixinwen.png'), 7.1),
                    // new Platform('大纪元', topSearchForDaJiYuan, require('@/assets/logos/tgmeng-trend_dajiyuan.png'),8),
                ]
            },
            {
                name: '羊毛',
                routerName: 'wool',
                id: 2,
                isShow: true,
                sort: 2,
                subCategories: [
                    new Platform('豆瓣组 买', topSearchForMaiZuDouBan, require('@/assets/logos/tgmeng-trend_doubanmaizu.png'), 8.1),
                    new Platform('豆瓣组 拼', topSearchForPinZuDouBan, require('@/assets/logos/tgmeng-trend_doubanpinzu.png'), 8.2),
                    new Platform('豆瓣组 爱猫生活', topSearchForAiMaoShengHuoDouBan, require('@/assets/logos/tgmeng-trend_doubanaimaoshenghuo.png'), 8.3),
                    new Platform('豆瓣组 爱猫澡盆', topSearchForAiMaoZaoPenDouBan, require('@/assets/logos/tgmeng-trend_doubanaimaozaopen.png'), 8.4),
                    new Platform('豆瓣组 狗组', topSearchForGouZuDouBan, require('@/assets/logos/tgmeng-trend_doubangouzu.png'), 8.5),
                ]
            },
            {
                name: '媒体',
                routerName: 'media',
                id: 3,
                isShow: true,
                sort: 3,
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
                name: '电视',
                routerName: 'tv',
                id: 14,
                isShow: true,
                sort: 12.5,
                subCategories: [
                    new Platform('CCTV1 综合', topSearchForCCTV1, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.001),
                    new Platform('CCTV2 财经', topSearchForCCTV2, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.002),
                    new Platform('CCTV3 综艺', topSearchForCCTV3, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.003),
                    new Platform('CCTV4 亚洲', topSearchForCCTV4, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.004),
                    new Platform('CCTV4 欧洲', topSearchForCCTV4EUROPE, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.004),
                    new Platform('CCTV4 美洲', topSearchForCCTV4AMERICA, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.005),
                    new Platform('CCTV5 体育', topSearchForCCTV5, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.006),
                    new Platform('CCTV5 体育赛事', topSearchForCCTV5PLUS, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.007),
                    new Platform('CCTV6 电影', topSearchForCCTV6, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.008),
                    new Platform('CCTV7 国防军事', topSearchForCCTV7, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.009),
                    new Platform('CCTV8 电视剧', topSearchForCCTV8, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.010),
                    new Platform('CCTV9 记录', topSearchForCCTV9, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.011),
                    new Platform('CCTV10 科教', topSearchForCCTV10, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.012),
                    new Platform('CCTV11 戏曲', topSearchForCCTV11, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.013),
                    new Platform('CCTV12 社会与法', topSearchForCCTV12, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.014),
                    new Platform('CCTV13 新闻', topSearchForCCTV13, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.015),
                    new Platform('CCTV14 少儿', topSearchForCCTV14, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.016),
                    new Platform('CCTV15 音乐', topSearchForCCTV15, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.017),
                    new Platform('CCTV16 奥林匹克', topSearchForCCTV16, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.018),
                    new Platform('CCTV17 农业与村', topSearchForCCTV17, require('@/assets/logos/tgmeng-trend_cctv.png'), 22.019),
                ]
            },
            {
                name: '生活',
                routerName: 'life',
                id: 4,
                isShow: true,
                sort: 4,
                subCategories: [
                    new Platform('豆瓣组 人间情侣观察', topSearchForDouBanRenJianQingLvGuanCha, require('@/assets/logos/tgmeng-trend_ren_jian_qing_lv_guan_cha.png'), 104),
                    new Platform('豆瓣组 我们都不懂人情世故', topSearchForDouBanWoMenDouBuDongRenQingShiGu, require('@/assets/logos/tgmeng-trend_wo_men_dou_bu_dong_ren_qing_shi_gu.png'), 105),
                    new Platform('豆瓣组 社会性死亡', topSearchForDouBanSheHuiXingSiWang, require('@/assets/logos/tgmeng-trend_she_hui_xing_si_wang.png'), 106),
                    new Platform('豆瓣组 职场吐槽大会', topSearchForDouBanZhiChangTuCaoDaHui, require('@/assets/logos/tgmeng-trend_zhi_chang_tu_cao_da_hui.png'), 107),

                    new Platform('豆瓣组 消费主义逆行者', topSearchForDouBanXiaoFeiZhuYiNiXingZhe, require('@/assets/logos/tgmeng-trend_xiao_fei_zhu_yi_ni_xing_zhe.png'), 108),
                    new Platform('豆瓣组 懒人生活指北', topSearchForDouBanLanRenShengHuoZhiBei, require('@/assets/logos/tgmeng-trend_lan_ren_sheng_huo_zhi_bei.png'), 109),
                    new Platform('豆瓣组 今天穿什么', topSearchForDouBanJinTianChuanShenMe, require('@/assets/logos/tgmeng-trend_jin_tian_chuan_shen_me.png'), 110),
                    new Platform('豆瓣组 上班这件事', topSearchForDouBanShangBanZheJianShi, require('@/assets/logos/tgmeng-trend_shang_ban_zhe_jian_shi.png'), 111),

                    new Platform('豆瓣组 社畜买房共进会', topSearchForDouBanSheChuMaiFangGongJinHui, require('@/assets/logos/tgmeng-trend_she_chu_mai_fang_gong_jin_hui.png'), 112),
                    new Platform('豆瓣组 我们都不懂车', topSearchForDouBanWoMenDouBuDongChe, require('@/assets/logos/tgmeng-trend_wo_men_dou_bu_dong_che.png'), 113),
                    new Platform('豆瓣组 教师', topSearchForDouBanJiaoShi, require('@/assets/logos/tgmeng-trend_jiao_shi.png'), 114),
                    new Platform('豆瓣组 友谊的小船', topSearchForDouBanYouYiDeXiaoChuan, require('@/assets/logos/tgmeng-trend_you_yi_de_xiao_chuan.png'), 115),

                    new Platform('豆瓣组 下厨房', topSearchForDouBanXiaChuFang, require('@/assets/logos/tgmeng-trend_xia_chu_fang.png'), 116),
                    new Platform('豆瓣组 佳片推荐', topSearchForDouBanJiaPianTuiJian, require('@/assets/logos/tgmeng-trend_jia_pian_tui_jian.png'), 117),
                    new Platform('豆瓣组 我的城市拍给你看', topSearchForDouBanWoDeChengShiPaiGeiNiKan, require('@/assets/logos/tgmeng-trend_wo_de_cheng_shi_pai_gei_ni_kan.png'), 118),
                    new Platform('豆瓣组 村庄爱好者', topSearchForDouBanCunZhuangAiHaoZhe, require('@/assets/logos/tgmeng-trend_cun_zhuang_ai_hao_zhe.png'), 119),

                    new Platform('豆瓣组 抬头，看树！', topSearchForDouBanTaiTouKanShu, require('@/assets/logos/tgmeng-trend_tai_tou_kan_shu.png'), 120),
                    new Platform('豆瓣组 街猫也可爱', topSearchForDouBanJieMaoYeKeAi, require('@/assets/logos/tgmeng-trend_jie_mao_ye_ke_ai.png'), 121),
                    new Platform('豆瓣组 豆瓣鸟组', topSearchForDouBanDouBanNiaoZu, require('@/assets/logos/tgmeng-trend_dou_ban_niao_zu.png'), 122),
                    new Platform('豆瓣组 可爱事物分享', topSearchForDouBanKeAiShiWuFenXiang, require('@/assets/logos/tgmeng-trend_ke_ai_shi_wu_fen_xiang.png'), 123),

                ]
            },

            {
                name: '社区',
                routerName: 'community',
                id: 5,
                isShow: true,
                sort: 5,
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
                routerName: 'finance',
                id: 6,
                isShow: true,
                sort: 6,
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
                routerName: 'sports',
                id: 7,
                isShow: true,
                sort: 7,
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
                routerName: 'technology',
                id: 8,
                isShow: true,
                sort: 8,
                subCategories: [
                    new Platform('MIT科技评论', topSearchForMIT, require('@/assets/logos/tgmeng-trend-mit.png'), 39),
                    new Platform('机器之心', topSearchJiQiZhiXin, require('@/assets/logos/tgmeng-trend_jiqizhixin.png'), 40),
                    // EurekAlert服务器暂时没法访问，所以先不放了
                    // new Platform('EurekAlert', topSearchForEurekAlert, require('@/assets/logos/tgmeng-trend-eurekalert.png'), 41),
                    new Platform('NCSTI-人工智能', topSearchForRenGongZhiNengGuoJiKeJiChuangXinZhongXin, require('@/assets/logos/tgmeng-trend_ncsti.png'), 42),
                    new Platform('NCSTI-医药健康', topSearchForYiYaoJianKangGuoJiKeJiChuangXinZhongXin, require('@/assets/logos/tgmeng-trend_ncsti.png'), 43),
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
                name: '设计',
                routerName: 'design',
                id: 9,
                isShow: true,
                sort: 9,
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
                name: '影音',
                routerName: 'audiovideo',
                id: 10,
                isShow: true,
                sort: 10,
                subCategories: [
                    new Platform('猫眼 周票房榜', topSearchForZhouPiaoFangBangMaoYan, require('@/assets/logos/tgmeng-trend_maoyan.png'), 60),
                    new Platform('猫眼 想看榜', topSearchForXiangkanBangMaoYan, require('@/assets/logos/tgmeng-trend_maoyan.png'), 61),
                    new Platform('猫眼 购票评分榜', topSearchForGouPiaoPingFenBangMaoYan, require('@/assets/logos/tgmeng-trend_maoyan.png'), 62),
                    new Platform('猫眼 历史总榜', topSearchForTop100MaoYan, require('@/assets/logos/tgmeng-trend_maoyan.png'), 63),

                    new Platform('网易云 飙升榜', topSearchForWangYiYunBiaoSheng, require('@/assets/logos/tgmeng-trend_wangyiyun.png'), 86),
                    new Platform('网易云 新歌榜', topSearchForWangYiYunXinGe, require('@/assets/logos/tgmeng-trend_wangyiyun.png'), 87),
                    new Platform('网易云 原创榜', topSearchForWangYiYunYuanChuang, require('@/assets/logos/tgmeng-trend_wangyiyun.png'), 88),
                    new Platform('网易云 热歌榜', topSearchForWangYiYunReGe, require('@/assets/logos/tgmeng-trend_wangyiyun.png'), 89),

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
                name: '游戏',
                routerName: 'game',
                id: 11,
                isShow: true,
                sort: 11,
                subCategories: [
                    new Platform('IGN', topSearchForIGN, require('@/assets/logos/tgmeng-trend_ign.png'), 124),
                    new Platform('3DMGAME', topSearchFor3DMGAME, require('@/assets/logos/tgmeng-trend_3dmgame.png'), 125),
                    new Platform('A9VG', topSearchForA9VG, require('@/assets/logos/tgmeng-trend_a9vg.png'), 126),
                    new Platform('GCORES', topSearchForGCORES, require('@/assets/logos/tgmeng-trend_gcores.png'), 127),
                    new Platform('游民星空', topSearchForYouMinXingKong, require('@/assets/logos/tgmeng-trend_youminxingkong.png'), 128),
                    new Platform('游戏陀螺', topSearchForYouXiTuoLuo, require('@/assets/logos/tgmeng-trend_youxituoluo.png'), 129),
                    new Platform('游研社', topSearchForYouYanShe, require('@/assets/logos/tgmeng-trend_youyanshe.png'), 130),
                    new Platform('游侠网', topSearchForYouXiaWang, require('@/assets/logos/tgmeng-trend_youxiawang.png'), 131),
                    new Platform('17173', topSearchFor17173, require('@/assets/logos/tgmeng-trend_17173.png'), 132),
                ]
            },
            {
                name: '健康',
                routerName: 'health',
                id: 12,
                isShow: true,
                sort: 12,
                subCategories: [
                    new Platform('生物谷', topSearchForShengWuGu, require('@/assets/logos/tgmeng-trend_shengwugu.png'), 133),
                    new Platform('生命时报', topSearchForShengMingShiBao, require('@/assets/logos/tgmeng-trend_shengmingshibao.png'), 134),
                    new Platform('丁香园社区', topSearchForDingXiangYuanSheQu, require('@/assets/logos/tgmeng-trend_dingxiangyuanshequ.png'), 135),
                    new Platform('丁香医生', topSearchForDingXiangYiSheng, require('@/assets/logos/tgmeng-trend_dingxiangyisheng.png'), 136),
                    new Platform('医药魔方', topSearchForYiYaoMoFang, require('@/assets/logos/tgmeng-trend_yiyaomofang.png'), 137),
                    new Platform('家医大健康', topSearchForJiaYiDaJianKang, require('@/assets/logos/tgmeng-trend_jiayidajiankang.png'), 138),
                    new Platform('健康时报网', topSearchForJianKangShiBaoWang, require('@/assets/logos/tgmeng-trend_jiankangshibaowang.png'), 139),
                    new Platform('果壳', topSearchForGuoKe, require('@/assets/logos/tgmeng-trend_guoke.png'), 140),
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
        // 顶部卡片位
        homeHeaderAdsCard: [
            { name: '位置1', desc: '友链', logo: require('@/assets/ads/test.png'), url: 'https://example.com' },
            { name: '位置2', desc: '友链', logo: require('@/assets/ads/test.png'), url: 'https://example.com' },
            { name: '位置3', desc: '友链', logo: require('@/assets/ads/test.png'), url: 'https://example.com' },
            { name: '位置4', desc: '友链', logo: require('@/assets/ads/test.png'), url: 'https://example.com' },
            { name: '位置5', desc: '友链', logo: require('@/assets/ads/test.png'), url: 'https://example.com' },
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
    }
});
