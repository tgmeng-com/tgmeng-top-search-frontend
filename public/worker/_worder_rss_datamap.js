const dataMap = {
    "/news": {
        title: "糖果梦热榜 · 新闻",
        description: "糖果梦热榜 · 新闻",
        children: {
            "/news/tencent": {title: "糖果梦热榜 · 新闻 · 腾讯", description: "糖果梦热榜 · 新闻 · 腾讯", link: "https://trendapi.tgmeng.com/api/topsearch/tencent",platform: "腾讯"},
            "/news/toutiao": {title: "糖果梦热榜 · 新闻 · 头条", description: "糖果梦热榜 · 新闻 · 头条", link: "https://trendapi.tgmeng.com/api/topsearch/toutiao",platform: "头条"}
        }
    },
    "/media": {
        title: "糖果梦热榜 · 媒体",
        description: "糖果梦热榜 · 媒体",
        children: {
            "/media/bilibili": {title: "糖果梦热榜 · 媒体 · B站", description: "糖果梦热榜 · 媒体 · B站", link: "https://trendapi.tgmeng.com/api/topsearch/bilibili",platform: "B站"},
            "/media/douyin": {title: "糖果梦热榜 · 媒体 · 抖音", description: "糖果梦热榜 · 媒体 · 抖音", link: "https://trendapi.tgmeng.com/api/topsearch/douyin",platform: "抖音"}
        }
    }
};

export default dataMap;