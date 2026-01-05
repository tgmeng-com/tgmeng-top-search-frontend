// TODO 如果后续有新的路由，需要在这里添加seo sitemap信息，里面的paths变量
export default function generateSitemap() {
    // 根据 changefreq 返回不同精度的 lastmod
    function getLastMod(freq) {
        const now = new Date();
        const year = now.getUTCFullYear();
        const month = String(now.getUTCMonth() + 1).padStart(2, "0");
        const day = String(now.getUTCDate()).padStart(2, "0");
        const hour = String(now.getUTCHours()).padStart(2, "0");
        const minute = String(now.getUTCMinutes()).padStart(2, "0");

        switch (freq) {
            case "minute":
                return `${year}-${month}-${day}T${hour}:${minute}:00Z`;
            case "hourly":
                return `${year}-${month}-${day}T${hour}:00:00Z`;
            case "weekly":
            case "monthly":
            default:
                return `${year}-${month}-${day}T00:00:00Z`;
        }
    }

    const domains = ["tgmeng.com"];

    // 路径数组，每个对象可自定义 priority
    const paths = [
        {path: "/", changefreq: "hourly", priority: 1.0},      // 首页
        {path: "/all", changefreq: "minute", priority: 1.0},   // 全部
        {path: "/tgmeng", changefreq: "minute", priority: 1.0},   // 糖果AI榜
        {path: "/news", changefreq: "minute", priority: 1.0},  // 新闻
        {path: "/wool", changefreq: "hourly", priority: 1.0}, // 羊毛
        {path: "/media", changefreq: "minute", priority: 1.0}, // 媒体
        {path: "/tv", changefreq: "minute", priority: 1.0},   // 电视
        {path: "/life", changefreq: "hourly", priority: 1.0},   // 生活
        {path: "/community", changefreq: "minute", priority: 1.0},   // 社区
        {path: "/finance", changefreq: "minute", priority: 1.0},   // 财经
        {path: "/sports", changefreq: "minute", priority: 1.0},   // 体育
        {path: "/technology", changefreq: "hourly", priority: 1.0},   // 科技
        {path: "/design", changefreq: "minute", priority: 1.0},   // 设计
        {path: "/audiovideo", changefreq: "minute", priority: 1.0},   // 音影
        {path: "/game", changefreq: "minute", priority: 1.0},   // 游戏
        {path: "/health", changefreq: "minute", priority: 1.0},   // 健康
        {path: "/favorites", changefreq: "minute", priority: 0.5},   // 收藏
        {path: "/about", changefreq: "monthly", priority: 0.5},   // 关于我们
        {path: "/donation", changefreq: "monthly", priority: 0.5},   // 捐赠
        {path: "/function", changefreq: "monthly", priority: 0.5},   // 功能介绍
        {path: "/excel", changefreq: "minute", priority: 1.0},   // 设置
        {path: "/vscode", changefreq: "minute", priority: 1.0},   // 设置
        {path: "/sudden", changefreq: "minute", priority: 1.0},   // 突发热点

    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(p => domains.map(d => `  <url>
    <loc>https://${d}${p.path}</loc>
    <lastmod>${getLastMod(p.changefreq)}</lastmod>
    <changefreq>${p.changefreq === "minute" ? "always" : p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
  </url>`).join("\n")).join("\n")}
</urlset>`;

    return xml;
}
