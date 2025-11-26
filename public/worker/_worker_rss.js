export default function generateRSS(key) {
    const rssMap = {
        "/news": {
            title: "新闻资讯",
            description: "新闻资讯",
            logo: "",
            children: {
                "/news/tencent": {
                    title: "腾讯",
                    description: "腾讯",
                    logo: "",
                    link: "https://trendapi.tgmeng.com/api/topsearch/tencent"
                },
                "/news/toutiao": {
                    title: "头条",
                    description: "头条",
                    logo: "",
                    link: "https://trendapi.tgmeng.com/api/topsearch/toutiao"
                }
            }
        },
        "/media": {
            title: "媒体资讯",
            description: "媒体资讯",
            logo: "",
            children: {
                "/media/bilibili": {
                    title: "B站",
                    description: "B站",
                    logo: "",
                    link: "https://trendapi.tgmeng.com/api/topsearch/bilibili"
                },
                "/media/douyin": {
                    title: "抖音",
                    description: "抖音",
                    logo: "",
                    link: "https://trendapi.tgmeng.com/api/topsearch/douyin"
                }
            }
        }
    };

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
        title: "聚合 RSS",
        description: "汇总全部分类",
        logo: "",
        children: rssMap
    } : findNode(rssMap, key);
    if (!info) return `<?xml version="1.0"?><rss></rss>`;

    function fetchData(node) {
        if (node.link) {
            return fetch(node.link)
                .then(res => res.json())
                .then(json => (json.data?.dataInfo || []).map(item => {
                    const pubDate = json.data?.dataUpdateTime ? new Date(json.data.dataUpdateTime).toUTCString() : new Date().toUTCString();
                    return {...item, pubDate};
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

    function escapeXml(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    return fetchData(info).then(dataInfo => {
        function generateItemXml(item) {
            const title = item.keyword || '无标题';
            const link = item.url ? escapeXml(item.url) : '';
            const description = '';
            const pubDate = item.pubDate || new Date().toUTCString();
            return `<item>

                <title><![CDATA[${title}]]></title>
            <link>${link}</link>
            <description><![CDATA[${description}]]></description>
            <pubDate>${pubDate}</pubDate>
        </item>`;
        }

        const itemsXml = dataInfo.map(generateItemXml).join('');

        // lastBuildDate 使用所有 item 中最新的 pubDate
        const lastBuildDate = dataInfo.length ? dataInfo.reduce((latest, item) => {
            const t = new Date(item.pubDate).getTime();
            return t > latest ? t : latest;
        }, 0) : new Date().getTime();

        const rssXml = `<?xml version="1.0" encoding="UTF-8"?>

                <rss version="2.0">
                <channel>
                <title><![CDATA[${info.title}]]></title>
            <link>https://tgmeng.com</link>
            <description><![CDATA[${info.description}]]></description>
            <language>zh-cn</language>
            <lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>
            <image>
                <url>${info.logo || "https://tgmeng.com/logo.png"}</url>
                <link>https://tgmeng.com</link>
            </image>
            ${itemsXml}
        </channel>
        </rss>`;

        return rssXml;
    });

}
