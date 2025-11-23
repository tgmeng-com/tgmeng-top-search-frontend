module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // 启用基于class的暗色模式
    theme: {
        extend: {
            colors: {
                // 亮色模式颜色
                'light-bg': '#dddddd', // 浅灰色背景，更柔和
                'light-card': '#ffffff', // 白色卡片，突出内容
                'light-text': '#2d3748', // 深灰色文本，提高可读性
                'light-gray': '#edf2f7', // 辅助灰色，用于分隔线等
                'light-gray-text': '#718096', // 灰色文本，用于次要信息

                // 暗色模式颜色
                'dark-bg': '#212830',
                'dark-card': '#2E3641',
                'dark-card-title': '#353C45',
                'dark-text': '#D1D7E0',
                'dark-gray': '#334155',
                'dark-gray-text': '#94a3b8',

                // 新增主题切换专属颜色
                'toggle-bg-light': 'rgba(237, 242, 247, 0.2)', // 与亮色模式背景更协调
                'toggle-bg-dark': 'rgba(0, 0, 0, 0.2)',
                'toggle-icon-light': '#2d3748', // 与亮色模式文本颜色协调
                'toggle-icon-dark': '#000',

                // 主题色
                primary: '#3b82f6',
                secondary: '#10b981',
                accent: '#8b5cf6',
                warning: '#f59e0b',
                danger: '#ef4444',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
    safelist: [
        {
            pattern: /^bg-(blue|green|yellow|red|purple|pink|indigo|cyan|teal|lime|amber|orange|emerald|violet|fuchsia|rose|sky)-[1-9]00$/,
        },
        {
            pattern: /^text-(blue|green|yellow|red|purple|pink|indigo|cyan|teal|lime|amber|orange|emerald|violet|fuchsia|rose|sky)-[1-9]00$/,
        },
        {
            pattern: /^border-(blue|green|yellow|red|purple|pink|indigo|cyan|teal|lime|amber|orange|emerald|violet|fuchsia|rose|sky)-[1-9]00$/,
        },
    ],
}