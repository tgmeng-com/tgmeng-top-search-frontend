import {request} from '@/utils/request.js'

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
        url: '/topsearch/github/stars/all',
        method: 'get',
        data: data
    })
}

export function topSearchForGitHubDaystars(data) {
    return request({
        url: '/topsearch/github/stars/day',
        method: 'get',
        data: data
    })
}

export function topSearchForGitHubWeekstars(data) {
    return request({
        url: '/topsearch/github/stars/week',
        method: 'get',
        data: data
    })
}

export function topSearchForGitHubMonthstars(data) {
    return request({
        url: '/topsearch/github/stars/month',
        method: 'get',
        data: data
    })
}

export function topSearchForGitHubYearstars(data) {
    return request({
        url: '/topsearch/github/stars/year',
        method: 'get',
        data: data
    })
}

export function topSearchForGitHubThreeYearStars(data) {
    return request({
        url: '/topsearch/github/stars/threeyear',
        method: 'get',
        data: data
    })
}

export function topSearchForGitHubFiveYearStars(data) {
    return request({
        url: '/topsearch/github/stars/fiveyear',
        method: 'get',
        data: data
    })
}

export function topSearchForGitHubTenYearStars(data) {
    return request({
        url: '/topsearch/github/stars/tenyear',
        method: 'get',
        data: data
    })
}

export function topSearchForYoutube(data) {
    return request({
        url: '/topsearch/global/youtube',
        method: 'get',
        data: data
    })
}

export function topSearchForDouBan(data) {
    return request({
        url: '/topsearch/douban',
        method: 'get',
        data: data
    })
}

export function topSearchForTencent(data) {
    return request({
        url: '/topsearch/tencent',
        method: 'get',
        data: data
    })
}

export function topSearchForTouTiao(data) {
    return request({
        url: '/topsearch/toutiao',
        method: 'get',
        data: data
    })
}

export function topSearchForWangYi(data) {
    return request({
        url: '/topsearch/wangyi',
        method: 'get',
        data: data
    })
}

export function topSearchForWangYiYunBiaoSheng(data) {
    return request({
        url: '/topsearch/wangyiyun/biaoshengbang',
        method: 'get',
        data: data
    })
}

export function topSearchForWangYiYunXinGe(data) {
    return request({
        url: '/topsearch/wangyiyun/xingebang',
        method: 'get',
        data: data
    })
}

export function topSearchForWangYiYunYuanChuang(data) {
    return request({
        url: '/topsearch/wangyiyun/yuanchuangbang',
        method: 'get',
        data: data
    })
}

export function topSearchForWangYiYunReGe(data) {
    return request({
        url: '/topsearch/wangyiyun/regebang',
        method: 'get',
        data: data
    })
}

export function topSearchForBaiDuTieBa(data) {
    return request({
        url: '/topsearch/tiebabaidu',
        method: 'get',
        data: data
    })
}

export function topSearchForShaoShuPai(data) {
    return request({
        url: '/topsearch/shaoshupai',
        method: 'get',
        data: data
    })
}

export function topSearchForDianShiJuBaiDu(data) {
    return request({
        url: '/topsearch/baidu/dianshiju',
        method: 'get',
        data: data
    })
}

export function topSearchForDianYingBaiDu(data) {
    return request({
        url: '/topsearch/baidu/dianying',
        method: 'get',
        data: data
    })
}

export function topSearchForXiaoShuoBaiDu(data) {
    return request({
        url: '/topsearch/baidu/xiaoshuo',
        method: 'get',
        data: data
    })
}

export function topSearchForYouXiBaiDu(data) {
    return request({
        url: '/topsearch/baidu/youxi',
        method: 'get',
        data: data
    })
}

export function topSearchForQiCheBaiDu(data) {
    return request({
        url: '/topsearch/baidu/qiche',
        method: 'get',
        data: data
    })
}

export function topSearchForReGengBaiDu(data) {
    return request({
        url: '/topsearch/baidu/regeng',
        method: 'get',
        data: data
    })
}

export function topSearchForCaiJingBaiDu(data) {
    return request({
        url: '/topsearch/baidu/caijing',
        method: 'get',
        data: data
    })
}

export function topSearchForMinShengBaiDu(data) {
    return request({
        url: '/topsearch/baidu/minsheng',
        method: 'get',
        data: data
    })
}

export function topSearchForHuggingFaceSpaceTrending(data) {
    return request({
        url: '/topsearch/global/huggingface/spacestrending',
        method: 'get',
        data: data
    })
}

export function topSearchForHuggingFaceSpaceLikes(data) {
    return request({
        url: '/topsearch/global/huggingface/spaceslikes',
        method: 'get',
        data: data
    })
}

export function topSearchForHuggingFaceModelTrending(data) {
    return request({
        url: '/topsearch/global/huggingface/modelstrending',
        method: 'get',
        data: data
    })
}

export function topSearchForHuggingFaceModelLikes(data) {
    return request({
        url: '/topsearch/global/huggingface/modelslikes',
        method: 'get',
        data: data
    })
}

export function topSearchForHuggingFaceDatasetsTrending(data) {
    return request({
        url: '/topsearch/global/huggingface/datasetstrending',
        method: 'get',
        data: data
    })
}

export function topSearchForHuggingFaceDatasetsLikes(data) {
    return request({
        url: '/topsearch/global/huggingface/datasetslikes',
        method: 'get',
        data: data
    })
}

export function topSearchForZhiHu(data) {
    return request({
        url: '/topsearch/zhihu',
        method: 'get',
        data: data
    })
}

export function topSearchForDianShiJuTengXun(data) {
    return request({
        url: '/topsearch/tencent/dianshiju',
        method: 'get',
        data: data
    })
}

export function topSearchForDianYingTengXun(data) {
    return request({
        url: '/topsearch/tencent/dianying',
        method: 'get',
        data: data
    })
}

export function topSearchForDongManTengXun(data) {
    return request({
        url: '/topsearch/tencent/dongman',
        method: 'get',
        data: data
    })
}

export function topSearchForZongYiTengXun(data) {
    return request({
        url: '/topsearch/tencent/zongyi',
        method: 'get',
        data: data
    })
}

export function topSearchForZongBangTengXun(data) {
    return request({
        url: '/topsearch/tencent/zongbang',
        method: 'get',
        data: data
    })
}


export function topSearchForDianShiJuAiQiYi(data) {
    return request({
        url: '/topsearch/aiqiyi/dianshiju',
        method: 'get',
        data: data
    })
}

export function topSearchForDianYingAiQiYi(data) {
    return request({
        url: '/topsearch/aiqiyi/dianying',
        method: 'get',
        data: data
    })
}

export function topSearchForDongManAiQiYi(data) {
    return request({
        url: '/topsearch/aiqiyi/dongman',
        method: 'get',
        data: data
    })
}

export function topSearchForZongYiAiQiYi(data) {
    return request({
        url: '/topsearch/aiqiyi/zongyi',
        method: 'get',
        data: data
    })
}

export function topSearchForZongBangAiQiYi(data) {
    return request({
        url: '/topsearch/aiqiyi/zongbang',
        method: 'get',
        data: data
    })
}


export function topSearchForDianShiJuYouKu(data) {
    return request({
        url: '/topsearch/youku/dianshiju',
        method: 'get',
        data: data
    })
}

export function topSearchForDianYingYouKu(data) {
    return request({
        url: '/topsearch/youku/dianying',
        method: 'get',
        data: data
    })
}

export function topSearchForDongManYouKu(data) {
    return request({
        url: '/topsearch/youku/dongman',
        method: 'get',
        data: data
    })
}

export function topSearchForZongYiYouKu(data) {
    return request({
        url: '/topsearch/youku/zongyi',
        method: 'get',
        data: data
    })
}

export function topSearchForZongBangYouKu(data) {
    return request({
        url: '/topsearch/youku/zongbang',
        method: 'get',
        data: data
    })
}


export function topSearchForDianShiJuMangGuo(data) {
    return request({
        url: '/topsearch/mangguo/dianshiju',
        method: 'get',
        data: data
    })
}

export function topSearchForDianYingMangGuo(data) {
    return request({
        url: '/topsearch/mangguo/dianying',
        method: 'get',
        data: data
    })
}

export function topSearchForDongManMangGuo(data) {
    return request({
        url: '/topsearch/mangguo/dongman',
        method: 'get',
        data: data
    })
}

export function topSearchForZongYiMangGuo(data) {
    return request({
        url: '/topsearch/mangguo/zongyi',
        method: 'get',
        data: data
    })
}

export function topSearchForZongBangMangGuo(data) {
    return request({
        url: '/topsearch/mangguo/zongbang',
        method: 'get',
        data: data
    })
}

export function topSearchForZhouPiaoFangBangMaoYan(data) {
    return request({
        url: '/topsearch/maoyan/zhoupiaofangbang',
        method: 'get',
        data: data
    })
}

export function topSearchForXiangkanBangMaoYan(data) {
    return request({
        url: '/topsearch/maoyan/xiangkanbang',
        method: 'get',
        data: data
    })
}

export function topSearchForGouPiaoPingFenBangMaoYan(data) {
    return request({
        url: '/topsearch/maoyan/goupiaopingfenbang',
        method: 'get',
        data: data
    })
}

export function topSearchForTop100MaoYan(data) {
    return request({
        url: '/topsearch/maoyan/top100',
        method: 'get',
        data: data
    })
}

export function topSearchForJingRongJie(data) {
    return request({
        url: '/topsearch/jinrongjie',
        method: 'get',
        data: data
    })
}

export function topSearchForDiYiCaiJing(data) {
    return request({
        url: '/topsearch/diyicaijing',
        method: 'get',
        data: data
    })
}

export function topSearchForTongHuaShun(data) {
    return request({
        url: '/topsearch/tonghuashun',
        method: 'get',
        data: data
    })
}

export function topSearchForHuaErJieJianWen(data) {
    return request({
        url: '/topsearch/huaerjiejianwen',
        method: 'get',
        data: data
    })
}

export function topSearchForCaiLianShe(data) {
    return request({
        url: '/topsearch/cailianshe',
        method: 'get',
        data: data
    })
}

export function topSearchForGeLongHui(data) {
    return request({
        url: '/topsearch/gelonghui',
        method: 'get',
        data: data
    })
}

export function topSearchForFaBu(data) {
    return request({
        url: '/topsearch/fabu',
        method: 'get',
        data: data
    })
}

export function topSearchForJinShi(data) {
    return request({
        url: '/topsearch/jinshi',
        method: 'get',
        data: data
    })
}

export function topSearchForZhiTongCaiJing(data) {
    return request({
        url: '/topsearch/zhitongcaijing',
        method: 'get',
        data: data
    })
}

export function topSearchForNiuYueShiBao(data) {
    return request({
        url: '/topsearch/niuyueshibao',
        method: 'get',
        data: data
    })
}

export function topSearchForBBC(data) {
    return request({
        url: '/topsearch/bbc',
        method: 'get',
        data: data
    })
}


export function topSearchForFaGuang(data) {
    return request({
        url: '/topsearch/faguang',
        method: 'get',
        data: data
    })
}

export function topSearchForDaJiYuan(data) {
    return request({
        url: '/topsearch/dajiyuan',
        method: 'get',
        data: data
    })
}

export function topSearchForWoShiPM(data) {
    return request({
        url: '/topsearch/woshipm',
        method: 'get',
        data: data
    })
}

export function topSearchForYouSheWang(data) {
    return request({
        url: '/topsearch/youshewang',
        method: 'get',
        data: data
    })
}

export function topSearchForZhanKuZuoPinBang(data) {
    return request({
        url: '/topsearch/zhanku/zuopinbang',
        method: 'get',
        data: data
    })
}


export function topSearchForZhanKuWenZhangBang(data) {
    return request({
        url: '/topsearch/zhanku/wenzhangbang',
        method: 'get',
        data: data
    })
}


export function topSearchForZhanKuQianLiBang(data) {
    return request({
        url: '/topsearch/zhanku/qianlibang',
        method: 'get',
        data: data
    })
}

export function topSearchForReMenZuoPinTuYaWangGuo(data) {
    return request({
        url: '/topsearch/tuyawangguo/hot',
        method: 'get',
        data: data
    })
}

export function topSearchForJingXuanZuoPinTuYaWangGuo(data) {
    return request({
        url: '/topsearch/tuyawangguo/best',
        method: 'get',
        data: data
    })
}

export function topSearchForJinRiXinZuoTuYaWangGuo(data) {
    return request({
        url: '/topsearch/tuyawangguo/new',
        method: 'get',
        data: data
    })
}

export function topSearchForFaXianXinZuoTuYaWangGuo(data) {
    return request({
        url: '/topsearch/tuyawangguo/fx',
        method: 'get',
        data: data
    })
}

export function topSearchForSheJiDaRen(data) {
    return request({
        url: '/topsearch/shejidaren',
        method: 'get',
        data: data
    })
}

export function topSearchForTopys(data) {
    return request({
        url: '/topsearch/topys',
        method: 'get',
        data: data
    })
}

export function topSearchForArchDaily(data) {
    return request({
        url: '/topsearch/archdaily',
        method: 'get',
        data: data
    })
}

export function topSearchForDribbble(data) {
    return request({
        url: '/topsearch/dribbble',
        method: 'get',
        data: data
    })
}

export function topSearchForAwwwards(data) {
    return request({
        url: '/topsearch/awwwards',
        method: 'get',
        data: data
    })
}

export function topSearchForCore77(data) {
    return request({
        url: '/topsearch/core77',
        method: 'get',
        data: data
    })
}

export function topSearchForAbduzeedo(data) {
    return request({
        url: '/topsearch/abduzeedo',
        method: 'get',
        data: data
    })
}

export function topSearchForMIT(data) {
    return request({
        url: '/topsearch/mit',
        method: 'get',
        data: data
    })
}

export function topSearchForEurekAlert(data) {
    return request({
        url: '/topsearch/eurekalert',
        method: 'get',
        data: data
    })
}

export function topSearchForRenGongZhiNengGuoJiKeJiChuangXinZhongXin(data) {
    return request({
        url: '/topsearch/guojikejichuangxinzhongxin/rengongzhineng',
        method: 'get',
        data: data
    })
}

export function topSearchForYiYaoJianKangGuoJiKeJiChuangXinZhongXin(data) {
    return request({
        url: '/topsearch/guojikejichuangxinzhongxin/yiyaojiankang',
        method: 'get',
        data: data
    })
}

export function topSearchJiQiZhiXin(data) {
    return request({
        url: '/topsearch/jiqizhixin',
        method: 'get',
        data: data
    })
}

export function topSearchForHuPu(data) {
    return request({
        url: '/topsearch/hupu',
        method: 'get',
        data: data
    })
}

export function topSearchForDongQiuDi(data) {
    return request({
        url: '/topsearch/dongqiudi',
        method: 'get',
        data: data
    })
}

export function topSearchForXinLangTiYu(data) {
    return request({
        url: '/topsearch/xinlangtiyu',
        method: 'get',
        data: data
    })
}

export function topSearchForSouHuTiYu(data) {
    return request({
        url: '/topsearch/souhutiyu',
        method: 'get',
        data: data
    })
}

export function topSearchForWangYiTiYu(data) {
    return request({
        url: '/topsearch/tiyuwangyi',
        method: 'get',
        data: data
    })
}

export function topSearchForYangShiTiYu(data) {
    return request({
        url: '/topsearch/yangshitiyu',
        method: 'get',
        data: data
    })
}

export function topSearchForPPTiYu(data) {
    return request({
        url: '/topsearch/pptiyu',
        method: 'get',
        data: data
    })
}

export function topSearchForZhiBoBa(data) {
    return request({
        url: '/topsearch/zhiboba',
        method: 'get',
        data: data
    })
}

export function topSearchForV2ex(data) {
    return request({
        url: '/topsearch/v2ex',
        method: 'get',
        data: data
    })
}


export function topSearchForBuXingJieHuPu(data) {
    return request({
        url: '/topsearch/buxingjiehupu',
        method: 'get',
        data: data
    })
}


export function topSearchForNga(data) {
    return request({
        url: '/topsearch/nga',
        method: 'get',
        data: data
    })
}


export function topSearchForYiMuSanFenDi(data) {
    return request({
        url: '/topsearch/yimusanfendi',
        method: 'get',
        data: data
    })
}


export function topSearchForWenZhangJueJin(data) {
    return request({
        url: '/topsearch/wenzhangjuejin',
        method: 'get',
        data: data
    })
}


export function topSearchForHackerNews(data) {
    return request({
        url: '/topsearch/hackernews',
        method: 'get',
        data: data
    })
}

export function topSearchForMaiZuDouBan(data) {
    return request({
        url: '/topsearch/xiaozudouban/maizu',
        method: 'get',
        data: data
    })
}

export function topSearchForPinZuDouBan(data) {
    return request({
        url: '/topsearch/xiaozudouban/pinzu',
        method: 'get',
        data: data
    })
}

export function topSearchForAiMaoShengHuoDouBan(data) {
    return request({
        url: '/topsearch/xiaozudouban/aimaoshenghuo',
        method: 'get',
        data: data
    })
}

export function topSearchForAiMaoZaoPenDouBan(data) {
    return request({
        url: '/topsearch/xiaozudouban/aimaozaopen',
        method: 'get',
        data: data
    })
}

export function topSearchForGouZuDouBan(data) {
    return request({
        url: '/topsearch/xiaozudouban/gouzu',
        method: 'get',
        data: data
    })
}

export function topSearchForDouBanXiaChuFang(data) {
    return request({
        url: '/topsearch/xiaozudouban/xiachufang',
        method: 'get',
        data: data
    })
}

export function topSearchForDouBanJieMaoYeKeAi(data) {
    return request({
        url: '/topsearch/xiaozudouban/jiemaoyekeai',
        method: 'get',
        data: data
    })
}

export function topSearchForDouBanWoDeChengShiPaiGeiNiKan(data) {
    return request({
        url: '/topsearch/xiaozudouban/wodechengshipaigeinikan',
        method: 'get',
        data: data
    })
}

export function topSearchForDouBanJiaPianTuiJian(data) {
    return request({
        url: '/topsearch/xiaozudouban/jiapiantuijian',
        method: 'get',
        data: data
    })
}

export function topSearchForDouBanSheChuMaiFangGongJinHui(data) {
    return request({
        url: '/topsearch/xiaozudouban/shechumaifanggongjinhui',
        method: 'get',
        data: data
    })
}

export function topSearchForDouBanCunZhuangAiHaoZhe(data) {
    return request({
        url: '/topsearch/xiaozudouban/cunzhuangaihaozhe',
        method: 'get',
        data: data
    })
}

export function topSearchForDouBanYouYiDeXiaoChuan(data) {
    return request({
        url: '/topsearch/xiaozudouban/youyidexiaochuan',
        method: 'get',
        data: data
    })
}

export function topSearchForDouBanSheHuiXingSiWang(data) {
    return request({
        url: '/topsearch/xiaozudouban/shehuixingsiwang',
        method: 'get',
        data: data
    })
}

export function topSearchForDouBanTaiTouKanShu(data) {
    return request({
        url: '/topsearch/xiaozudouban/taitoukanshu',
        method: 'get',
        data: data
    })
}

export function topSearchForDouBanLanRenShengHuoZhiBei(data) {
    return request({
        url: '/topsearch/xiaozudouban/lanrenshenghuozhibei',
        method: 'get',
        data: data
    })
}

export function topSearchForDouBanKeAiShiWuFenXiang(data) {
    return request({
        url: '/topsearch/xiaozudouban/keaishiwufenxiang',
        method: 'get',
        data: data
    })
}

export function topSearchForDouBanJinTianChuanShenMe(data) {
    return request({
        url: '/topsearch/xiaozudouban/jintianchuanshenme',
        method: 'get',
        data: data
    })
}

export function topSearchForDouBanXiaoFeiZhuYiNiXingZhe(data) {
    return request({
        url: '/topsearch/xiaozudouban/xiaofeizhuyinixingzhe',
        method: 'get',
        data: data
    })
}

export function topSearchForDouBanWoMenDouBuDongChe(data) {
    return request({
        url: '/topsearch/xiaozudouban/womendoubudongche',
        method: 'get',
        data: data
    })
}

export function topSearchForDouBanWoMenDouBuDongRenQingShiGu(data) {
    return request({
        url: '/topsearch/xiaozudouban/womendoubudongrenqingshigu',
        method: 'get',
        data: data
    })
}

export function topSearchForDouBanDouBanNiaoZu(data) {
    return request({
        url: '/topsearch/xiaozudouban/niaozu',
        method: 'get',
        data: data
    })
}

export function topSearchForDouBanRenJianQingLvGuanCha(data) {
    return request({
        url: '/topsearch/xiaozudouban/renjianqinglvguancha',
        method: 'get',
        data: data
    })
}

export function topSearchForDouBanZhiChangTuCaoDaHui(data) {
    return request({
        url: '/topsearch/xiaozudouban/zhichangtucaodahui',
        method: 'get',
        data: data
    })
}

export function topSearchForDouBanJiaoShi(data) {
    return request({
        url: '/topsearch/xiaozudouban/jiaoshi',
        method: 'get',
        data: data
    })
}

export function topSearchForDouBanShangBanZheJianShi(data) {
    return request({
        url: '/topsearch/xiaozudouban/shangbanzhejianshi',
        method: 'get',
        data: data
    })
}

export function topSearchForYouMinXingKong(data) {
    return request({
        url: '/topsearch/youminxingkong',
        method: 'get',
        data: data
    })
}

export function topSearchFor3DMGAME(data) {
    return request({
        url: '/topsearch/3dmgame',
        method: 'get',
        data: data
    })
}

export function topSearchForA9VG(data) {
    return request({
        url: '/topsearch/a9vg',
        method: 'get',
        data: data
    })
}

export function topSearchForYouXiTuoLuo(data) {
    return request({
        url: '/topsearch/youxituoluo',
        method: 'get',
        data: data
    })
}

export function topSearchForIGN(data) {
    return request({
        url: '/topsearch/ign',
        method: 'get',
        data: data
    })
}

export function topSearchForGCORES(data) {
    return request({
        url: '/topsearch/gcores',
        method: 'get',
        data: data
    })
}

export function topSearchForYouYanShe(data) {
    return request({
        url: '/topsearch/youyanshe',
        method: 'get',
        data: data
    })
}

export function topSearchFor17173(data) {
    return request({
        url: '/topsearch/17173',
        method: 'get',
        data: data
    })
}

export function topSearchForYouXiaWang(data) {
    return request({
        url: '/topsearch/youxiawang',
        method: 'get',
        data: data
    })
}

export function topSearchForShengWuGu(data) {
    return request({
        url: '/topsearch/shengwugu',
        method: 'get',
        data: data
    })
}

export function topSearchForYiYaoMoFang(data) {
    return request({
        url: '/topsearch/yiyaomofang',
        method: 'get',
        data: data
    })
}

export function topSearchForDingXiangYiSheng(data) {
    return request({
        url: '/topsearch/dingxiangyisheng',
        method: 'get',
        data: data
    })
}

export function topSearchForShengMingShiBao(data) {
    return request({
        url: '/topsearch/shengmingshibao',
        method: 'get',
        data: data
    })
}

export function topSearchForJiaYiDaJianKang(data) {
    return request({
        url: '/topsearch/jiayidajiankang',
        method: 'get',
        data: data
    })
}

export function topSearchForGuoKe(data) {
    return request({
        url: '/topsearch/guoke',
        method: 'get',
        data: data
    })
}

export function topSearchForJianKangShiBaoWang(data) {
    return request({
        url: '/topsearch/jiankangshibaowang',
        method: 'get',
        data: data
    })
}

export function topSearchForCCTV1(data) {
    return request({
        url: '/topsearch/cctv/1',
        method: 'get',
        data: data
    })
}

export function topSearchForCCTV2(data) {
    return request({
        url: '/topsearch/cctv/2',
        method: 'get',
        data: data
    })
}

export function topSearchForCCTV3(data) {
    return request({
        url: '/topsearch/cctv/3',
        method: 'get',
        data: data
    })
}

export function topSearchForCCTV4(data) {
    return request({
        url: '/topsearch/cctv/4',
        method: 'get',
        data: data
    })
}

export function topSearchForCCTV4EUROPE(data) {
    return request({
        url: '/topsearch/cctv/europe',
        method: 'get',
        data: data
    })
}

export function topSearchForCCTV4AMERICA(data) {
    return request({
        url: '/topsearch/cctv/america',
        method: 'get',
        data: data
    })
}

export function topSearchForCCTV5(data) {
    return request({
        url: '/topsearch/cctv/5',
        method: 'get',
        data: data
    })
}

export function topSearchForCCTV5PLUS(data) {
    return request({
        url: '/topsearch/cctv/5plus',
        method: 'get',
        data: data
    })
}

export function topSearchForCCTV6(data) {
    return request({
        url: '/topsearch/cctv/6',
        method: 'get',
        data: data
    })
}

export function topSearchForCCTV7(data) {
    return request({
        url: '/topsearch/cctv/7',
        method: 'get',
        data: data
    })
}

export function topSearchForCCTV8(data) {
    return request({
        url: '/topsearch/cctv/8',
        method: 'get',
        data: data
    })
}

export function topSearchForCCTV9(data) {
    return request({
        url: '/topsearch/cctv/jilu',
        method: 'get',
        data: data
    })
}

export function topSearchForCCTV10(data) {
    return request({
        url: '/topsearch/cctv/10',
        method: 'get',
        data: data
    })
}

export function topSearchForCCTV11(data) {
    return request({
        url: '/topsearch/cctv/11',
        method: 'get',
        data: data
    })
}

export function topSearchForCCTV12(data) {
    return request({
        url: '/topsearch/cctv/12',
        method: 'get',
        data: data
    })
}

export function topSearchForCCTV13(data) {
    return request({
        url: '/topsearch/cctv/13',
        method: 'get',
        data: data
    })
}

export function topSearchForCCTV14(data) {
    return request({
        url: '/topsearch/cctv/child',
        method: 'get',
        data: data
    })
}

export function topSearchForCCTV15(data) {
    return request({
        url: '/topsearch/cctv/15',
        method: 'get',
        data: data
    })
}

export function topSearchForCCTV16(data) {
    return request({
        url: '/topsearch/cctv/16',
        method: 'get',
        data: data
    })
}

export function topSearchForCCTV17(data) {
    return request({
        url: '/topsearch/cctv/17',
        method: 'get',
        data: data
    })
}

export function topSearchForPengPaiXinWen(data) {
    return request({
        url: '/topsearch/pengpaixinwen',
        method: 'get',
        data: data
    })
}

export function cacheSearchForCiYun(data) {
    return request({
        url: '/cachesearch/wordcloud',
        method: 'get',
        data: data
    })
}

export function cacheSearchForAllByWord(data) {
    return request({
        url: '/cachesearch/allbyword',
        method: 'post',
        data: {
            word: data
        }
    })
}

export function cacheSearchForAISummaryData(data) {
    return request({
        url: '/cachesearch/realtimesummary',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function topSearchForAdsPassword(password) {
    return request({
        url: '/topsearch/password/ads',
        method: 'post',
        data: {
            password: password
        }
    })
}

export function cacheSearchForwuaipojie(data) {
    return request({
        url: '/topsearch/wuaipojie',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForshuimushequ(data) {
    return request({
        url: '/topsearch/shuimushequ',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForchongbuluo(data) {
    return request({
        url: '/topsearch/chongbuluo',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForxianzhishequ(data) {
    return request({
        url: '/topsearch/xianzhishequ',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForkdsshanghaitoutiao(data) {
    return request({
        url: '/topsearch/kdsshanghaitoutiao',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForkanxue(data) {
    return request({
        url: '/topsearch/kanxue',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchFortongxinrenjiayuan(data) {
    return request({
        url: '/topsearch/tongxinrenjiayuan',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForemacschina(data) {
    return request({
        url: '/topsearch/emacschina',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForrubychina(data) {
    return request({
        url: '/topsearch/rubychina',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForkaidiwang(data) {
    return request({
        url: '/topsearch/kaidiwang',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForzhiwubuyankuajingdianshangshequ(data) {
    return request({
        url: '/topsearch/zhiwubuyankuajingdianshangshequ',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForkaiyuanzixun(data) {
    return request({
        url: '/topsearch/kaiyuanzixun',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForjingguanzhijia(data) {
    return request({
        url: '/topsearch/jingguanzhijia',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchFor36ke(data) {
    return request({
        url: '/topsearch/36ke',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForitzhijia(data) {
    return request({
        url: '/topsearch/itzhijia',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForjikegongyuan(data) {
    return request({
        url: '/topsearch/jikegongyuan',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForreadhub(data) {
    return request({
        url: '/topsearch/readhub',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchFortaimeiti(data) {
    return request({
        url: '/topsearch/taimeiti',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForzhongguancunzaixian(data) {
    return request({
        url: '/topsearch/zhongguancunzaixian',
        method: 'get',
        data: {
            word: data
        }
    })
}


export function cacheSearchForlandianwang(data) {
    return request({
        url: '/topsearch/landianwang',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForchuangyebang(data) {
    return request({
        url: '/topsearch/chuangyebang',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForiheima(data) {
    return request({
        url: '/topsearch/iheima',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForleifengwang(data) {
    return request({
        url: '/topsearch/leifengwang',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForquantianhoukeji(data) {
    return request({
        url: '/topsearch/quantianhoukeji',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForwulianwangzhiku(data) {
    return request({
        url: '/topsearch/wulianwangzhiku',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForkuaikeji(data) {
    return request({
        url: '/topsearch/kuaikeji',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchFortechweb(data) {
    return request({
        url: '/topsearch/techweb',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForlixiangshenghuoshiyanshi(data) {
    return request({
        url: '/topsearch/lixiangshenghuoshiyanshi',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForduozhi(data) {
    return request({
        url: '/topsearch/duozhi',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForjiemodui(data) {
    return request({
        url: '/topsearch/jiemodui',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForaimeiwang(data) {
    return request({
        url: '/topsearch/aimeiwang',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForzhanzhangzhijia(data) {
    return request({
        url: '/topsearch/zhanzhangzhijia',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForlieyunwang(data) {
    return request({
        url: '/topsearch/lieyunwang',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForweixindushu(data) {
    return request({
        url: '/topsearch/weixindushu',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForacfun(data) {
    return request({
        url: '/topsearch/acfun',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchFormeimanbaike(data) {
    return request({
        url: '/topsearch/meimanbaike',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForshiguangwang(data) {
    return request({
        url: '/topsearch/shiguangwang',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForjiandan(data) {
    return request({
        url: '/topsearch/jiandan',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchFordianwanbang(data) {
    return request({
        url: '/topsearch/dianwanbang',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchFordianshimao(data) {
    return request({
        url: '/topsearch/dianshimao',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForzhongguoxinwenwang(data) {
    return request({
        url: '/topsearch/zhongguoxinwenwang',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForzaker(data) {
    return request({
        url: '/topsearch/zaker',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForxinjingbao(data) {
    return request({
        url: '/topsearch/xinjingbao',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchForxingdaohuanqiu(data) {
    return request({
        url: '/topsearch/xingdaohuanqiu',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function cacheSearchFor21jingjiwang(data) {
    return request({
        url: '/topsearch/21jingjiwang',
        method: 'get',
        data: {
            word: data
        }
    })
}


export function cacheSearchFordongfangcaifuwang(data) {
    return request({
        url: '/topsearch/dongfangcaifuwang',
        method: 'get',
        data: {
            word: data
        }
    })
}


export function cacheSearchFormbazhiku(data) {
    return request({
        url: '/topsearch/mbazhiku',
        method: 'get',
        data: {
            word: data
        }
    })
}


export function cacheSearchForjingjiguanchawang(data) {
    return request({
        url: '/topsearch/jingjiguanchawang',
        method: 'get',
        data: {
            word: data
        }
    })
}


export function cacheSearchForshidaizaixian(data) {
    return request({
        url: '/topsearch/shidaizaixian',
        method: 'get',
        data: {
            word: data
        }
    })
}


export function cacheSearchForjingsecaijing(data) {
    return request({
        url: '/topsearch/jingsecaijing',
        method: 'get',
        data: {
            word: data
        }
    })
}


export function cacheSearchForxinlangcaijing(data) {
    return request({
        url: '/topsearch/xinlangcaijing',
        method: 'get',
        data: {
            word: data
        }
    })
}


export function cacheSearchForkuaijitoutiao(data) {
    return request({
        url: '/topsearch/kuaijitoutiao',
        method: 'get',
        data: {
            word: data
        }
    })
}


export function cacheSearchForlaohucaijing(data) {
    return request({
        url: '/topsearch/laohucaijing',
        method: 'get',
        data: {
            word: data
        }
    })
}


export function cacheSearchForblockbeats(data) {
    return request({
        url: '/topsearch/blockbeats',
        method: 'get',
        data: {
            word: data
        }
    })
}


export function cacheSearchForhuitongcaijing(data) {
    return request({
        url: '/topsearch/huitongcaijing',
        method: 'get',
        data: {
            word: data
        }
    })
}


export function cacheSearchFormeijingwang(data) {
    return request({
        url: '/topsearch/meijingwang',
        method: 'get',
        data: {
            word: data
        }
    })
}


export function cacheSearchForxuangutong(data) {
    return request({
        url: '/topsearch/xuangutong',
        method: 'get',
        data: {
            word: data
        }
    })
}


export function cacheSearchForchaincatcher(data) {
    return request({
        url: '/topsearch/chaincatcher',
        method: 'get',
        data: {
            word: data
        }
    })
}


export function cacheSearchForkechuangbanribao(data) {
    return request({
        url: '/topsearch/kechuangbanribao',
        method: 'get',
        data: {
            word: data
        }
    })
}


export function cacheSearchFortengxunshejikaifangpingtai(data) {
    return request({
        url: '/topsearch/tengxunshejikaifangpingtai',
        method: 'get',
        data: {
            word: data
        }
    })
}

export function getSubscriptionConfig(data) {
    return request({
        url: '/topsearch/subscription/getSubscriptionConfig',
        method: 'post',
        data: data
    })
}

export function updateSubscriptionConfig(data) {
    return request({
        url: '/topsearch/subscription/updateSubscriptionConfig',
        method: 'post',
        data: data
    })
}

export function topSearchAliYunSheQu(data) {
    return request({
        url: '/topsearch/aliyunshequ',
        method: 'post',
        data: data
    })
}

export function topSearchTengXunYunSheQu(data) {
    return request({
        url: '/topsearch/tengxunyunshequ',
        method: 'post',
        data: data
    })
}

export function topSearchMeiTuanSheQu(data) {
    return request({
        url: '/topsearch/meituanshequ',
        method: 'post',
        data: data
    })
}

export function topSearchFor0818Tuan(data) {
    return request({
        url: '/topsearch/0818tuan',
        method: 'post',
        data: data
    })
}

export function  cacheSearchForQooAppShouJiYouXi(data) {
    return request({
        url: '/topsearch/qooapp/shoujiyouxi',
        method: 'post',
        data: data
    })
}
export function  cacheSearchForQooAppPcZhuJi(data) {
    return request({
        url: '/topsearch/qooapp/pczhuji',
        method: 'post',
        data: data
    })
}
export function  cacheSearchForBaHaMuTeShouJi(data) {
    return request({
        url: '/topsearch/bahamute/shouji',
        method: 'post',
        data: data
    })
}
export function  cacheSearchForBaHaMuTePc(data) {
    return request({
        url: '/topsearch/bahamute/pc',
        method: 'post',
        data: data
    })
}
export function  cacheSearchForBaHaMuTeTv(data) {
    return request({
        url: '/topsearch/bahamute/tv',
        method: 'post',
        data: data
    })
}
export function  cacheSearchForBaHaMuTeXinXun(data) {
    return request({
        url: '/topsearch/bahamute/xinxun',
        method: 'post',
        data: data
    })
}
export function  cacheSearchFor4GamerPc(data) {
    return request({
        url: '/topsearch/4gamer/pc',
        method: 'post',
        data: data
    })
}
export function  cacheSearchFor4GamerXbox(data) {
    return request({
        url: '/topsearch/4gamer/xbox',
        method: 'post',
        data: data
    })
}
export function  cacheSearchFor4GamerPs(data) {
    return request({
        url: '/topsearch/4gamer/ps',
        method: 'post',
        data: data
    })
}
export function  cacheSearchFor4GamerSwitch(data) {
    return request({
        url: '/topsearch/4gamer/switch',
        method: 'post',
        data: data
    })
}
export function  cacheSearchFor4GamerSmartPhone(data) {
    return request({
        url: '/topsearch/4gamer/smartphone',
        method: 'post',
        data: data
    })
}
export function  cacheSearchFor4GamerVr(data) {
    return request({
        url: '/topsearch/4gamer/vr',
        method: 'post',
        data: data
    })
}
export function  cacheSearchFor4GamerHardWare(data) {
    return request({
        url: '/topsearch/4gamer/hardware',
        method: 'post',
        data: data
    })
}
export function  cacheSearchFor4GamerArcade(data) {
    return request({
        url: '/topsearch/4gamer/arcade',
        method: 'post',
        data: data
    })
}
export function  cacheSearchFor4GamerAnalog(data) {
    return request({
        url: '/topsearch/4gamer/analog',
        method: 'post',
        data: data
    })
}
export function  cacheSearchFor4GamerWii(data) {
    return request({
        url: '/topsearch/4gamer/wii',
        method: 'post',
        data: data
    })
}
export function  cacheSearchFor4GamerVita(data) {
    return request({
        url: '/topsearch/4gamer/vita',
        method: 'post',
        data: data
    })
}
export function  cacheSearchFor4GamerNds(data) {
    return request({
        url: '/topsearch/4gamer/nds',
        method: 'post',
        data: data
    })
}
export function  cacheSearchGameBaseShouJiYouXi(data) {
    return request({
        url: '/topsearch/gamebase/shoujiyouxi',
        method: 'post',
        data: data
    })
}
export function  cacheSearchGameBasePc(data) {
    return request({
        url: '/topsearch/gamebase/pc',
        method: 'post',
        data: data
    })
}
export function  cacheSearchGameBaseTvZhangJi(data) {
    return request({
        url: '/topsearch/gamebase/tvzhangji',
        method: 'post',
        data: data
    })
}

export function  topSearchZhiYuanSheQu(data) {
    return request({
        url: '/topsearch/zhiyuanshequ',
        method: 'post',
        data: data
    })
}

export function  topSearchLiangZiWei(data) {
    return request({
        url: '/topsearch/liangziwei',
        method: 'post',
        data: data
    })
}

export function  topSearchXinZhiYuan(data) {
    return request({
        url: '/topsearch/xinzhiyuan',
        method: 'post',
        data: data
    })
}

export function topSearchForLodeLocYouHui(data) {
    return request({
        url: '/topsearch/nodeloc/youhui',
        method: 'post',
        data: data
    })
}

export function topSearchForNodeLocHot(data) {
    return request({
        url: '/topsearch/nodeloc/hot',
        method: 'post',
        data: data
    })
}
