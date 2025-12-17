import dataMap from "./_worker_rss_datamap.js";

export default function generateRSS(key) {

    function findNode(map, key) {
        if (map[key]) return map[key];
        for (const node of Object.values(map)) {
            if (node.children) {
                const found = findNode(node.children, key);
                if (found) return found;
            }
        }
        return null;
    }

    const info = key === "/" ? {
        title: "糖果梦热榜 · 全站热点",
        description: "糖果梦热榜 · 全站热点",
        logo: "",
        children: dataMap
    } : findNode(dataMap, key);
    if (!info) return `<?xml version="1.0"?><rss></rss>`;

    function fetchData(node) {
        if (node.link) {
            return fetch(node.link)
                .then(res => res.json())
                .then(json => (json.data?.dataInfo || []).map(item => {
                    const pubDate = json.data?.dataUpdateTime ? new Date(json.data.dataUpdateTime).toUTCString() : new Date().toUTCString();
                    const platform = node.platform || '';
                    return {...item, pubDate, platform};
                }))
                .catch(err => {
                    console.error("获取数据失败:", err);
                    return [];
                });
        } else if (node.children) {
            return Promise.all(
                Object.values(node.children).map(fetchData)
            ).then(results => results.flat());
        }
        return Promise.resolve([]);
    }

    function escapeXml(str, useCdata = true) {
        if (str === undefined || str === null) str = '';
        if (useCdata) {
            return '<![CDATA[' + String(str).replace(/]]>/g, ']]]]><![CDATA[>') + ']]>';
        }
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    return fetchData(info).then(dataInfo => {
        function generateItemXml(item) {
            const title = escapeXml(item.keyword || '无标题', true);
            const link = escapeXml(item.url || '', false);
            const description = `点击标题查看详细内容`;
            const platform = escapeXml(item.platform || '', true);
            const pubDate = item.pubDate || new Date().toUTCString();
            return `<item>
            <title>${title}  -来自【${platform}】</title>
            <link>${link}</link>
            <description>${description}</description>
            <pubDate>${pubDate}</pubDate>
            <guid isPermaLink="false">${link}</guid>
        </item>`;
        }

        const itemsXml = dataInfo.map(generateItemXml).join('');

        // lastBuildDate 使用所有 item 中最新的 pubDate
        const lastBuildDate = dataInfo.length ? dataInfo.reduce((latest, item) => {
            const t = new Date(item.pubDate).getTime();
            return t > latest ? t : latest;
        }, 0) : new Date().getTime();
        const currentYear = new Date().getFullYear();

        const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
        <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
            <title>${escapeXml(info.title)}</title>
            <link>https://tgmeng.com</link>
            <description>${escapeXml(info.description)}</description>
            
            <language>zh-cn</language>
            <copyright>Copyright ${currentYear} tgmeng.com. All rights reserved.</copyright>
            <managingEditor>糖果梦</managingEditor>
            <webMaster>糖果梦</webMaster>
            <atom:link href="https://tgmeng.com${key}/rss.xml" rel="self" type="application/rss+xml" />
            
            <lastBuildDate>${new Date(lastBuildDate || Date.now()).toUTCString()}</lastBuildDate>
            <image>
                <url>https://tgmeng.com/logo.png</url>
                <title>糖果梦热榜</title>
                <link>https://tgmeng.com</link>
            </image>
            ${itemsXml}
        </channel>
        </rss>`;

        return rssXml;
    });

}
