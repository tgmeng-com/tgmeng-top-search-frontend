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
        'light-bg': '#ffffff',
        'light-card': '#f8fafc',
        'light-text': '#334155',
        'light-gray': '#e2e8f0',
        'light-gray-text': '#64748b',

        // 暗色模式颜色
        'dark-bg': '#0f172a',
        'dark-card': '#1e293b',
        'dark-text': '#f8fafc',
        'dark-gray': '#334155',
        'dark-gray-text': '#94a3b8',

        // 新增主题切换专属颜色
        'toggle-bg-light': 'rgba(255,255,255,0.2)',
        'toggle-bg-dark': 'rgba(0,0,0,0.2)',
        'toggle-icon-light': '#fff',
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
}    