/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}', // 扫描 src 目录下所有 vue/js/ts 等文件
  ],
  darkMode: 'class', // 启用暗色模式
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        accent: '#8B5CF6',
        dark: {
          bg: '#1E293B',
          card: '#334155',
          text: '#F1F5F9'
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  }
}
