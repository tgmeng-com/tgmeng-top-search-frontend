// 按路由 path 或 routerName 对应的 SEO 模板
// TODO 每次添加新的分类时，给这里添加一下seo的title和description：title就是浏览器页签里显示的，description就是meta标签里的描述。  记得把/里面加一下新的分类名称
// seo.js

// 路由 SEO 模板
export const pathMetaTemplates = {
    '/news': {
        title: ['新闻热榜 - 今日热门资讯汇总 | 糖果梦热榜'],
        description: ['汇集腾讯新闻、今日头条、网易新闻等热点资讯，一站掌握最新新闻趋势。'],
        image: '/og/og.png',
        category: '新闻'
    },
    '/wool': {
        title: ['羊毛热榜 - 豆瓣优惠与拼团信息 | 糖果梦热榜'],
        description: ['提供豆瓣买组、豆瓣拼组等优惠活动及社区热帖，轻松获取最新福利信息。'],
        image: '/og/og.png',
        category: '羊毛'
    },
    '/media': {
        title: ['媒体热榜 - B站、抖音、微博热门内容 | 糖果梦热榜'],
        description: ['聚合 B站、抖音、微博热搜及少数派、YouTube 等热门内容，快速了解全网趋势。'],
        image: '/og/og.png',
        category: '媒体'
    },
    '/tv': {
        title: ['电视热榜 - CCTV 各频道热门节目 | 糖果梦热榜'],
        description: ['收录 CCTV 各频道综艺、电视剧、纪录片及体育节目，一站掌握电视热门内容。'],
        image: '/og/og.png',
        category: '电视'
    },
    '/life': {
        title: ['生活热榜 - 社区趣闻与生活指南 | 糖果梦热榜'],
        description: ['提供人间情侣观察、职场吐槽、懒人生活指北等热门话题，轻松掌握生活新趋势。'],
        image: '/og/og.png',
        category: '生活'
    },
    '/community': {
        title: ['社区热榜 - V2EX、知乎、虎扑等热门讨论 | 糖果梦热榜'],
        description: ['汇聚 V2EX、知乎、虎扑步行街、百度贴吧等社区热帖，了解全网热门话题与讨论。'],
        image: '/og/og.png',
        category: '社区'
    },
    '/finance': {
        title: ['财经热榜 - 财联社、华尔街资讯汇总 | 糖果梦热榜'],
        description: ['提供财联社、华尔街见闻、同花顺、金融界等财经资讯，一站掌握市场动态。'],
        image: '/og/og.png',
        category: '财经'
    },
    '/sports': {
        title: ['体育热榜 - 央视体育、虎扑热门赛事 | 糖果梦热榜'],
        description: ['汇聚央视体育、虎扑、新浪体育等热点赛事资讯，快速了解体育新闻与赛况。'],
        image: '/og/og.png',
        category: '体育'
    },
    '/technology': {
        title: ['科技热榜 - MIT科技评论、机器之心等 | 糖果梦热榜'],
        description: ['提供人工智能、编程、科技前沿及 GitHub 热门项目动态，掌握科技最新趋势。'],
        image: '/og/og.png',
        category: '科技'
    },
    '/design': {
        title: ['设计热榜 - 产品、UI、建筑设计精选 | 糖果梦热榜'],
        description: ['聚合人人都是产品经理、站酷、ArchDaily 等设计类热门作品与资讯，提升设计灵感。'],
        image: '/og/og.png',
        category: '设计'
    },
    '/audiovideo': {
        title: ['影音热榜 - 猫眼、腾讯视频、爱奇艺等 | 糖果梦热榜'],
        description: ['收录猫眼票房榜、腾讯视频、爱奇艺热门影视内容，一站掌握影音新趋势。'],
        image: '/og/og.png',
        category: '影音'
    },
    '/game': {
        title: ['游戏热榜 - IGN、3DMGAME、游民星空 | 糖果梦热榜'],
        description: ['汇聚 IGN、3DMGAME、游民星空等热门游戏资讯，实时掌握游戏动态与排行榜。'],
        image: '/og/og.png',
        category: '游戏'
    },
    '/health': {
        title: ['健康热榜 - 丁香园、生物谷热门资讯 | 糖果梦热榜'],
        description: ['提供生物谷、丁香园、家医大健康等健康资讯，实时掌握医疗、养生与健康趋势。'],
        image: '/og/og.png',
        category: '健康'
    },
    '/favorites': {
        title: ['收藏热榜 - 我的收藏汇总 | 糖果梦热榜'],
        description: ['汇总用户收藏的各类热门内容，一站查看新闻、影视、游戏、社区等精选热榜。'],
        image: '/og/og.png',
        category: '收藏'
    },
    '/all': {
        title: ['全部热榜 - 全站热门内容汇总 | 糖果梦热榜'],
        description: ['提供新闻、娱乐、体育、游戏、科技、健康等全站热门排行榜，一站掌握最新趋势。'],
        image: '/og/og.png',
        category: '全部'
    },
    '/': {
        title: ['糖果梦热榜 - 最新热榜聚合'],
        description: ['汇聚新闻、羊毛、媒体、电视、生活、社区、财经、体育、科技、设计、影音、游戏、健康等各类热门排行榜，快速了解全网最新趋势。'],
        image: '/og/og.png',
        category: '首页'
    }
};

// 随机选择数组里的元素
export function randomFromArray(arr) {
    if (!arr || arr.length === 0) return '';
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

// 生成面包屑 JSON-LD
function generateBreadcrumb(path) {
    const parts = path.split('/').filter(Boolean);
    const itemListElements = [
        {
            '@type': 'ListItem',
            position: 1,
            name: '首页',
            item: window.location.origin + '/'
        },
        ...parts.map((part, index) => ({
            '@type': 'ListItem',
            position: index + 2,
            name: part,
            item: window.location.origin + '/' + parts.slice(0, index + 1).join('/')
        }))
    ];

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: itemListElements
    };
}

// 获取 SEO 元数据
export function getSeoByPath(path) {
    let meta = pathMetaTemplates[path];
    if (!meta && path.startsWith('/')) {
        const categoryKey = '/' + path.split('/')[1];
        meta = pathMetaTemplates[categoryKey];
    }
    if (!meta) meta = pathMetaTemplates['/'];

    const title = randomFromArray(meta.title);
    const description = randomFromArray(meta.description);
    const canonical = window.location.origin + path;
    const image = meta.image || '/og/default.png';
    const url = window.location.origin + path;
    const category = meta.category || '热榜';

    // JSON-LD
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: '糖果梦热榜',
            url: window.location.origin,
            description: '糖果梦热榜聚合全网热门排行榜',
            publisher: {
                '@type': 'Organization',
                name: '糖果梦热榜',
                logo: {
                    '@type': 'ImageObject',
                    url: window.location.origin + '/logo.png'
                }
            }
        },
        generateBreadcrumb(path),
        {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: title,
            description,
            url,
            inLanguage: 'zh-CN',
            about: category,
            isPartOf: {
                '@type': 'WebSite',
                name: '糖果梦热榜',
                url: window.location.origin
            },
            breadcrumb: generateBreadcrumb(path)
        }
    ];

    return {
        title,
        description,
        canonical,
        og: { title, description, image, url, type: 'website' },
        twitter: { card: 'summary_large_image', title, description, image },
        jsonLd
    };
}
