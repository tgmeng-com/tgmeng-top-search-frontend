<template>
  <div class="vscode-container">
    <!-- 顶部标题栏 -->
    <div class="titlebar">
      <div class="titlebar-left">
        <div class="window-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
                d="M14.491 1.847a1.933 1.933 0 0 0-2.12.369l-8.93 8.93a1.093 1.093 0 0 0 0 1.545l2.914 2.914a1.093 1.093 0 0 0 1.545 0l8.93-8.93a1.933 1.933 0 0 0 .369-2.12l-2.708-2.708z"/>
          </svg>
        </div>
        <div class="menu-bar">
          <div
              v-for="menu in menus"
              :key="menu"
              class="menu-item"
              @click="activeMenu = menu"
          >
            {{ menu }}
          </div>
        </div>
      </div>
      <div class="titlebar-center">{{ currentFile }} - {{ projectName }}</div>
      <div class="titlebar-right">
        <div class="window-controls">
          <div class="control-btn minimize">−</div>
          <div class="control-btn maximize">□</div>
          <div class="control-btn close" @click="handleClose">×</div>
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 左侧活动栏 -->
      <div class="activity-bar">
        <div
            v-for="(icon, index) in activityIcons"
            :key="icon.name"
            :class="['activity-item', { active: activeActivityIndex === index }]"
            @click="activeActivityIndex = index"
            :title="icon.name"
        >
          <i :class="icon.icon"></i>
        </div>
        <div class="activity-item activity-bottom">
          <i class="codicon codicon-account"></i>
        </div>
        <div class="activity-item">
          <i class="codicon codicon-settings-gear"></i>
        </div>
      </div>

      <!-- 侧边栏和拖动条 -->
      <div class="sidebar-wrapper" v-show="sidebarVisible">
        <!-- 侧边栏 -->
        <div
            class="sidebar"
            :style="{ width: sidebarWidth + 'px' }"
            ref="sidebar"
        >
          <div class="sidebar-header">
            <span class="sidebar-title">{{ activityIcons[activeActivityIndex]?.name }}</span>
            <div class="sidebar-actions">
              <i class="codicon codicon-ellipsis"></i>
            </div>
          </div>
          <div class="sidebar-content">

            <!-- 文件浏览器 -->
            <div v-if="activeActivityIndex === 0" class="file-explorer">

              <div class="section-header">
                <i class="codicon codicon-chevron-down"></i>
                <span>{{ projectName }}</span>
              </div>

              <div class="demo-collapse-position">
                <el-collapse expand-icon-position="left">
                  <el-collapse-item v-for="(cat) in categroies" :key="cat.name" :title="cat.name">
                    <template #title>
                      <div @click="handleSheetCategoryClick(cat)" class="collapse-title">
                        {{ cat.name }}
                      </div>
                    </template>

                    <div
                        v-for="subCat in cat.subCategories"
                        :key="subCat.title"
                        :class="['file-item', { active: currentFile === subCat.title }]"
                        @click="openFile(subCat)"
                    >
                      <img v-if="subCat.logo" :src="subCat.logo" class="h-full w-auto rounded-xl">
                      <i v-else :class="getFileIcon(subCat.title)"></i>
                      <span>{{ subCat.title }}</span>
                    </div>
                  </el-collapse-item>
                </el-collapse>

                <div
                    v-for="file in files"
                    :key="file.title"
                    :class="['file-item', { active: currentFile === file.title }]"
                    @click="openFile(file)"
                >
                  <i :class="getFileIcon(file.title)"></i>
                  <span>{{ file.title }}</span>
                </div>

              </div>
            </div>

            <!-- 搜索 -->
            <div v-else-if="activeActivityIndex === 1" class="search-view">
              <input type="text" placeholder="Search" class="search-input"/>
            </div>

            <!-- 源代码管理 -->
            <div v-else-if="activeActivityIndex === 2" class="source-control">
              <div class="message-box">
                <textarea placeholder="Message (Ctrl+Enter to commit)"></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- 拖动条 -->
        <div
            class="sidebar-resizer"
            @mousedown="startResize"
            :class="{ resizing: isResizing }"
        ></div>
      </div>

      <!-- 编辑器区域 -->
      <div class="editor-container">
        <!-- 标签栏 -->
        <div class="tabs-bar">
          <div
              v-for="tab in openTabs"
              :key="tab.title"
              :class="['tab', { active: currentFile === tab.title }]"
              @click="currentFile = tab.title"
          >
            <i :class="getFileIcon(tab.title)"></i>
            <span>{{ tab.title }}</span>
            <i class="codicon codicon-close tab-close" @click.stop="closeTab(tab)"></i>
          </div>
        </div>

        <!-- 编辑器内容 -->
        <div class="editor-content">
          <div class="line-numbers">
            <div v-for="n in 50" :key="n" class="line-number">{{ n }}</div>
          </div>
          <div class="code-area text-left">
            <!-- 当选中“资源管理器”且有平台数据时，渲染热点列表 -->
            <div v-if="activeActivityIndex === 0 && currentPlatform" class="hotpoint-code-list">
              <!-- 加载中 -->
              <div v-if="currentPlatform.loading" class="loading-in-editor">
                ⏳ 正在加载数据…
              </div>

              <!-- 无数据 -->
              <div v-else-if="!currentPlatform.data || currentPlatform.data.length === 0" class="empty-in-editor">
                🚫 当前平台暂无热点数据
              </div>

              <!-- 有数据：使用 v-for 渲染每行 -->
              <div
                  v-else
                  v-for="(item, index) in currentPlatform.data"
                  :key="index"
                  class="hotpoint-line"
              >
                <span class="line-num">{{ String(index + 1).padStart(2, '0') }}</span>
                <a :href="item.url" target="_blank" class="hotpoint-link">
                  <span class="trend-icon" @click.stop.prevent="clickHotPointTrend(item.title)">📈</span>
                  {{ item.title }}
                </a>
              </div>
            </div>

            <!-- 其他情况（打开普通文件）保持原 v-html 高亮代码显示 -->
            <pre v-else><code v-html="highlightedCode"></code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部状态栏 -->
    <div class="statusbar">
      <div class="statusbar-left">
        <div class="statusbar-item">
          <i class="codicon codicon-source-control"></i>
          <span>main</span>
        </div>
        <div class="statusbar-item">
          <i class="codicon codicon-error"></i>
          <span>0</span>
          <i class="codicon codicon-warning"></i>
          <span>0</span>
        </div>
      </div>
      <div class="statusbar-right">
        <div class="statusbar-item">Ln {{ lineNumber }}, Col {{ columnNumber }}</div>
        <div class="statusbar-item">Spaces: 2</div>
        <div class="statusbar-item">UTF-8</div>
        <div class="statusbar-item">{{ fileLanguage }}</div>
        <div class="statusbar-item">
          <i class="codicon codicon-feedback"></i>
        </div>
        <div class="statusbar-item">
          <i class="codicon codicon-bell"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as objectUtils from "@/utils/objectUtils";
import store from "@/store";

export default {
  data() {
    return {
      menus: ['文件', '编辑', '选择', '查看', '转到', '运行', '终端', '帮助'],
      activeMenu: null,
      projectName: '糖果梦热榜',
      currentFile: 'index.js',
      sidebarVisible: true,
      activeActivityIndex: 0,
      lineNumber: 1,
      columnNumber: 1,
      // 侧边栏宽度和拖动状态
      sidebarWidth: 250,
      isResizing: false,
      startX: 0,
      startWidth: 0,

      activityIcons: [
        {name: '资源管理器', icon: 'codicon codicon-files'},
        {name: '搜索', icon: 'codicon codicon-search'},
        {name: '源代码管理', icon: 'codicon codicon-source-control'},
        {name: '运行和调试', icon: 'codicon codicon-debug-alt'},
        {name: '扩展', icon: 'codicon codicon-extensions'}
      ],
      files: [
        {title: 'index.js', content: this.getJavaScriptCode()},
        {title: 'style.css', content: this.getCSSCode()},
        {title: 'package.json', content: this.getJSONCode()},
        {title: 'README.md', content: this.getMarkdownCode()}
      ],
      openTabs: []
    };
  },
  computed: {
    currentPlatform() {
      // 从 store 的 categroies 中找到当前选中的平台
      if (this.activeCategory && this.activeCategory.subCategories) {
        return this.activeCategory.subCategories.find(sub => sub.title === this.currentFile);
      }
      return null;
    },
    fileLanguage() {
      const ext = this.currentFile.split('.').pop();
      const langMap = {
        'js': 'JavaScript',
        'css': 'CSS',
        'json': 'JSON',
        'md': 'Markdown',
        'vue': 'Vue',
        'html': 'HTML'
      };
      return langMap[ext] || 'Plain Text';
    },
    highlightedCode() {
      const platform = this.categroies.flatMap(c => c.subCategories).find(p => p.title === this.currentFile)
      return this.syntaxHighlight(platform, this.currentFile);
    },

    categroies: {
      get() {
        return this.$store.state.categroies;
      },
      set(value) {
        this.$store.commit('setCategroies', value);
      }
    },
    activeCategory: {
      get() {
        return this.$store.state.activeCategory;
      },
      set(value) {
        this.$store.commit('setActiveCategory', value);
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyboard);
    document.body.style.overflow = 'hidden';

    // 默认打开第一个文件
    this.openFile(this.files[0]);

    // 恢复保存的侧边栏宽度
    const savedWidth = localStorage.getItem('vscode-sidebar-width');
    if (savedWidth) {
      this.sidebarWidth = parseInt(savedWidth);
    }
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyboard);
    window.removeEventListener('mousemove', this.handleResize);
    window.removeEventListener('mouseup', this.stopResize);
    document.body.style.overflow = '';
  },
  methods: {
    clickHotPointTrend(title){
      store.commit('setHistoryDataBoardShow', true)
      store.commit('setHistoryDataSearchMode', 'ZHI_WEN_PI_PEI_TODAY')
      store.commit('setHistoryDataBoardUseTitle', title)
      window.umami.track('📊热点历史追踪');
    },
    handleClose() {
      this.$router?.push({name: 'Home'}) || window.close();
    },
    handleKeyboard(e) {
      if (e.key === 'Escape' || e.key === 'F9') {
        this.handleClose();
      }
    },
    openFile(file) {
      this.currentFile = file.title;
      if (!this.openTabs.find(t => t.title === file.title)) {
        this.openTabs.push(file);
      }
    },
    closeTab(tab) {
      const index = this.openTabs.findIndex(t => t.name === tab.name);
      this.openTabs.splice(index, 1);
      if (this.currentFile === tab.name && this.openTabs.length > 0) {
        this.currentFile = this.openTabs[0].name;
      }
    },

    // 侧边栏拖动功能
    startResize(e) {
      this.isResizing = true;
      this.startX = e.clientX;
      this.startWidth = this.sidebarWidth;

      // 添加全局事件监听
      window.addEventListener('mousemove', this.handleResize);
      window.addEventListener('mouseup', this.stopResize);

      // 防止文本选择
      e.preventDefault();
    },

    handleResize(e) {
      if (!this.isResizing) return;

      const deltaX = e.clientX - this.startX;
      let newWidth = this.startWidth + deltaX;

      // 限制最小和最大宽度
      newWidth = Math.max(150, Math.min(500, newWidth));

      this.sidebarWidth = newWidth;
    },

    stopResize() {
      this.isResizing = false;

      // 保存宽度到本地存储
      localStorage.setItem('vscode-sidebar-width', this.sidebarWidth.toString());

      // 移除全局事件监听
      window.removeEventListener('mousemove', this.handleResize);
      window.removeEventListener('mouseup', this.stopResize);
    },

    getFileIcon(filename) {
      if (!filename || typeof filename !== 'string') return ''
      const name = filename.trim()
      const noExtSpecialFiles = {
        'README': 'codicon codicon-book',
        'readme': 'codicon codicon-book',
        'LICENSE': 'codicon codicon-law',
        'Dockerfile': 'codicon codicon-docker',
        '.gitignore': 'codicon codicon-git',
        '.gitconfig': 'codicon codicon-git',
        '.env': 'codicon codicon-settings',
        '.env.local': 'codicon codicon-settings',
        'Makefile': 'codicon codicon-tools',
        'webpack.config.js': 'codicon codicon-webpack',
        'vite.config.js': 'codicon codicon-vite',
        'package.json': 'codicon codicon-npm',
        'yarn.lock': 'codicon codicon-yarn',
        'pnpm-lock.yaml': 'codicon codicon-pnpm',
      }
      if (noExtSpecialFiles[name]) {
        return noExtSpecialFiles[name]
      }
      if (!name.includes('.')) {
        return ''
      }
      const ext = name.split('.').pop().toLowerCase()
      const iconMap = {
        js: 'codicon codicon-symbol-method',
        ts: 'codicon codicon-symbol-keyword',
        jsx: 'codicon codicon-react',
        tsx: 'codicon codicon-react',
        vue: 'codicon codicon-symbol-class',
        html: 'codicon codicon-code',
        css: 'codicon codicon-symbol-color',
        scss: 'codicon codicon-symbol-color',
        less: 'codicon codicon-symbol-color',
        json: 'codicon codicon-json',
        yaml: 'codicon codicon-json',
        yml: 'codicon codicon-json',
        md: 'codicon codicon-markdown',
        mdx: 'codicon codicon-markdown',
        jpg: 'codicon codicon-image',
        jpeg: 'codicon codicon-image',
        png: 'codicon codicon-image',
        gif: 'codicon codicon-image',
        webp: 'codicon codicon-image',
        svg: 'codicon codicon-symbol-namespace',
        mp4: 'codicon codicon-play',
        mp3: 'codicon codicon-play',
        pdf: 'codicon codicon-file-pdf',
        zip: 'codicon codicon-file-zip',
        rar: 'codicon codicon-file-zip',
        exe: 'codicon codicon-executable',
      }
      return iconMap[ext] || 'codicon codicon-file'
    },

    syntaxHighlight(platform, filename) {
      const ext = filename.split('.').pop();
      if (!objectUtils.isEmpty(ext)) {
        const file = this.files.find(f => f.title === this.currentFile);
        if (ext === 'js') {
          return file.content
              // 1. 多行注释 /* */
              .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
              // 2. 单行注释 //
              .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
              // 3. 模板字符串 `...${...}...`
              .replace(/(`(?:[^`\\]|\\.)*`)/g, (match) => {
                return match.replace(/\$\{([^}]+)\}/g, (m, expr) => {
                  return '${<span class="template-expr">' + expr + '</span>}';
                }).replace(/^`|`$/g, (q) => '<span class="string">' + q) + '</span>';
              })
              // 4. 正则表达式 /pattern/flags
              // .replace(/\/(?![\/\*])([^\/\n]+)\/([gimuy]*)/g, '<span class="regex">$&</span>')
              // 5. 字符串 "..." '...'
              .replace(/(['"])(?:(?=(\\?))\2.)*?\1/g, '<span class="string">$&</span>')
              // 6. 数字（包括小数、十六进制、科学计数法）
              .replace(/\b(0x[0-9a-fA-F]+|0b[01]+|0o[0-7]+|\d+\.?\d*(?:e[+-]?\d+)?)\b/g, '<span class="number">$1</span>')
              // 7. 布尔值和 null/undefined
              .replace(/\b(true|false|null|undefined|NaN|Infinity)\b/g, '<span class="constant">$1</span>')
              // 8. 关键字
              .replace(/\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|class|extends|new|import|export|from|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|delete|void|yield|static|super|this)\b/g, '<span class="keyword">$1</span>')
              // 9. 内置对象和函数
              .replace(/\b(console|Array|Object|String|Number|Boolean|Date|Math|JSON|Promise|Set|Map|WeakMap|WeakSet|Symbol|Proxy|Reflect|Error|RegExp|parseInt|parseFloat|isNaN|isFinite|encodeURIComponent|decodeURIComponent)\b/g, '<span class="builtin">$1</span>')
              // 10. 函数调用
              .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, '<span class="function">$1</span>')
              // 11. 类名（大写开头）
              .replace(/\b([A-Z][a-zA-Z0-9_$]*)\b/g, '<span class="class-name">$1</span>')
              // 12. 对象属性
              .replace(/\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g, '.<span class="property">$1</span>')
              // 13. 箭头函数
              .replace(/=&gt;/g, '<span class="arrow">=&gt;</span>');
        } else if (ext === 'css') {
          return file.content
              .replace(/([.#][\w-]+)/g, '<span class="selector">$1</span>')
              .replace(/(\w+):/g, '<span class="property">$1</span>:')
              .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');
        } else if (ext === 'json') {
          return file.content
              .replace(/"(.*?)":/g, '<span class="json-key">"$1"</span>:')
              .replace(/:\s*"(.*?)"/g, ': <span class="string">"$1</span>')
              .replace(/:\s*(\d+)/g, ': <span class="number">$1</span>');
        } else if (ext === 'md') {
          return file.content
              .replace(/^(#{1,6})\s*(.*)$/gm, '<span class="md-h$1.length">$&</span>')
              .replace(/\*\*(.*?)\*\*/g, '<span class="md-bold">$1</span>')
              .replace(/\*(.*?)\*/g, '<span class="md-italic">$1</span>')
              .replace(/`([^`]+)`/g, '<span class="md-code">$1</span>')
              .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span class="md-link">$1</span>');
        }
      }
      if (platform.loading) {
        return "⏳ 正在加载…";
      } else {
        if (objectUtils.isEmpty(platform.data)) {
          return "🚫 无数据";
        } else {
          return platform.data.map((item, index) => {
            const num = String(index + 1).padStart(2, '0');
            return `<div style="height:0.8rem;"><span style="display:inline-block;width:2ch;text-align:right;margin-right:0.5ch;">${num}</span>&nbsp;<a href="${item.url}" target="_blank"><span class="mr-1 cursor-pointer" @click.stop.prevent="clickHotPointTrend(${item.title})">📈</span>${item.title}</a></div>`;
          }).join('\n');
        }
      }
    },

    getJavaScriptCode() {
      return `
export const getCurrentTimestamp = () => {
    return new Date().getTime();
};

export const getTodayStartTimestamp = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
};

export const getAllTimeStartTimestamp = () => {
    return 0;
};

export const formatSecondsToHMS = (seconds) => {
    if (typeof seconds !== 'number' || isNaN(seconds)) {
        return seconds;
    }
    if (seconds < 60) {
    }
    const hours = Math.floor(seconds / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = seconds % 60;
    return hours > 0
};

export const isFuture = (timeSec) => {
    return timeSec * 1000 > Date.now();
}

export const isPast = (timeSec) => {
    return timeSec * 1000 < Date.now();
}

export const isBetween = (startSec, endSec) => {
    const now = Date.now();
    return now >= startSec * 1000 && now <= endSec * 1000;
}
`;
    },

    getCSSCode() {
      return `/* Main Styles */
.container {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  background-color: #007acc;
  color: white;
  padding: 1rem;
  border-radius: 4px;
}

.content {
  flex: 1;
  margin-top: 20px;
}

/* Typography */
h1, h2, h3 {
  font-family: 'Segoe UI', sans-serif;
  font-weight: 600;
}
@keyframes blob {
  0% {
    transform: translateY(0) scale(1);
  }
  33% {
    transform: translateY(-8px) scale(1.03);
  }
  66% {
    transform: translateY(4px) scale(0.98);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

.animate-blob {
  animation: blob 8s infinite ease-in-out;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

:root {
  --dark-card: #0b1220;
}

.dark .dark\\:bg-dark-card {
  background-color: var(--dark-card);
}

.relative > ul > li {
  list-style: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.main-title {
  @apply mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-gray-100
}

.main-desc {
  @apply mt-6 max-w-3xl mx-auto text-gray-600 dark:text-gray-300
}

.card-bg {
  @apply p-4 rounded-xl bg-gradient-to-r from-indigo-600/30 to-pink-600/30 border border-transparent
  dark:border-transparent shadow-sm hover:shadow-lg transition transform hover:-translate-y-1;
}

.card-title {
  @apply font-semibold text-gray-900 dark:text-gray-100
}

.card-title-special {
  @apply text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-2
}

.card-desc {
  @apply text-sm text-gray-500 dark:text-gray-400 mt-1
}
`;
    },

    getJSONCode() {
      return `{
  {
  "name": "tgmeng-top-search-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "@fortawesome/fontawesome-free": "^6.7.2",
    "@fortawesome/fontawesome-svg-core": "^6.7.2",
    "@fortawesome/free-solid-svg-icons": "^6.7.2",
    "@fortawesome/vue-fontawesome": "^3.0.8",
    "@icon-park/vue-next": "^1.4.2",
    "@vueuse/head": "^2.0.0",
    "@vueuse/motion": "^3.0.3",
    "@waline/client": "^3.6.0",
    "axios": "^1.10.0",
    "chart.js": "^4.4.8",
    "core-js": "^3.8.3",
    "date-fns": "^4.1.0",
    "date-fns-tz": "^3.2.0",
    "echarts": "^5.6.0",
    "echarts-wordcloud": "^2.1.0",
    "element-plus": "^2.10.3",
    "vue": "^3.2.13",
    "vue-router": "^4.6.3",
    "vuedraggable": "^4.1.0",
    "vuex": "^4.1.0"
  },
  "devDependencies": {
    "@babel/core": "^7.27.7",
    "@babel/eslint-parser": "^7.12.16",
    "@babel/preset-env": "^7.27.2",
    "@vue/babel-preset-app": "^5.0.8",
    "@vue/cli-plugin-babel": "~5.0.0",
    "@vue/cli-plugin-eslint": "~5.0.0",
    "@vue/cli-service": "~5.0.0",
    "autoprefixer": "^10.4.21",
    "eslint": "^7.32.0",
    "eslint-plugin-vue": "^8.0.3",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.1"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/vue3-essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "@babel/eslint-parser"
    },
    "rules": {}
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead",
    "not ie 11"
  ],
  "description": "\`\`\` npm install \`\`\`",
  "main": "babel.config.js",
  "keywords": [],
  "author": "",
  "license": "ISC"
}`;
    },

    getMarkdownCode() {
      return `# My Project

Welcome to **My Project**!

## Features

- Modern UI
- Fast performance
- Easy to use

## Installation

\`\`\`bash
npm install
npm start
\`\`\`

## Usage

Import and use the components:

\`\`\`javascript
import App from './App';
\`\`\``;
    },

    handleSheetCategoryClick(cat) {
      this.$emit("handleCategoryClick", cat);
    },
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.vscode-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1e1e1e;
  color: #cccccc;
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
  z-index: 1999;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 标题栏 */
.titlebar {
  height: 35px;
  background: #323233;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  user-select: none;
  border-bottom: 1px solid #2d2d30;
}

.titlebar-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.window-icon {
  width: 16px;
  height: 16px;
  color: #007acc;
}

.menu-bar {
  display: flex;
  gap: 4px;
}

.menu-item {
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 13px;
}

.menu-item:hover {
  background: #3e3e42;
}

.titlebar-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #8b8b8b;
}

.titlebar-right {
  display: flex;
  align-items: center;
}

.window-controls {
  display: flex;
  gap: 1px;
}

.control-btn {
  width: 45px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
}

.control-btn:hover {
  background: #3e3e42;
}

.control-btn.close:hover {
  background: #e81123;
  color: white;
}

/* 主内容区 */
.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* 活动栏 */
.activity-bar {
  width: 48px;
  background: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  border-right: 1px solid #2d2d30;
}

.activity-item {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  color: #858585;
}

.activity-item:hover {
  color: #cccccc;
}

.activity-item.active {
  color: #ffffff;
}

.activity-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 32px;
  background: #007acc;
}

.activity-item i {
  font-size: 24px;
}

.activity-bottom {
  margin-top: auto;
}

/* 侧边栏包装器 */
.sidebar-wrapper {
  display: flex;
  position: relative;
}

/* 侧边栏 */
.sidebar {
  background: #252526;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #2d2d30;
  min-width: 150px;
  max-width: 500px;
}

.sidebar-header {
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: #cccccc;
  letter-spacing: 0.5px;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 16px 4px 32px;
  cursor: pointer;
  font-size: 13px;
  height: 1.7rem;
}

.file-item:hover {
  background: #2a2d2e;
}

.file-item.active {
  background: #37373d;
}

.file-item i {
  font-size: 16px;
  color: #75beff;
}

/* 侧边栏拖动条 */
.sidebar-resizer {
  width: 4px;
  background: transparent;
  cursor: col-resize;
  transition: background-color 0.2s;
  position: relative;
  z-index: 10;
}

.sidebar-resizer:hover,
.sidebar-resizer.resizing {
  background: #007acc;
}

.sidebar-resizer::before {
  content: '';
  position: absolute;
  top: 0;
  left: -2px;
  width: 8px;
  height: 100%;
}

/* 编辑器区域 */
.editor-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #1e1e1e;
  min-width: 200px;
}

.tabs-bar {
  height: 35px;
  background: #252526;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #2d2d30;
  overflow-x: auto;
}

.tab {
  height: 35px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  cursor: pointer;
  border-right: 1px solid #2d2d30;
  background: #2d2d2d;
  color: #969696;
  font-size: 13px;
  white-space: nowrap;
}

.tab:hover {
  background: #323233;
}

.tab.active {
  background: #1e1e1e;
  color: #ffffff;
  border-top: 1px solid #007acc;
}

.tab i {
  font-size: 16px;
}

.tab-close {
  font-size: 14px !important;
  margin-left: 4px;
  padding: 2px;
  border-radius: 3px;
}

.tab-close:hover {
  background: #404040;
}

/* 编辑器内容 */
.editor-content {
  flex: 1;
  display: flex;
  overflow: auto;
  background: #1e1e1e;
}

.line-numbers {
  padding: 16px 8px;
  background: #1e1e1e;
  color: #858585;
  text-align: right;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 19px;
  user-select: none;
  min-width: 50px;
}

.line-number {
  height: 19px;
}

.code-area {
  flex: 1;
  padding: 16px;
  overflow: auto;
}

.code-area pre {
  margin: 0;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 19px;
  color: #d4d4d4;
}

.code-area code {
  display: block;
}

/* 语法高亮 */
:deep(.keyword) {
  color: #569cd6;
}

:deep(.string) {
  color: #ce9178;
}

:deep(.number) {
  color: #b5cea8;
}

:deep(.comment) {
  color: #6a9955;
  font-style: italic;
}

:deep(.selector) {
  color: #d7ba7d;
}

:deep(.property) {
  color: #9cdcfe;
}

:deep(.json-key) {
  color: #9cdcfe;
}

/* 搜索视图 */
.search-view {
  padding: 16px;
}

.search-input {
  width: 100%;
  padding: 8px;
  background: #3c3c3c;
  border: 1px solid #3c3c3c;
  color: #cccccc;
  font-size: 13px;
  border-radius: 2px;
}

.search-input:focus {
  outline: none;
  border-color: #007acc;
}

/* 源代码管理 */
.source-control {
  padding: 16px;
}

.message-box textarea {
  width: 100%;
  height: 80px;
  padding: 8px;
  background: #3c3c3c;
  border: 1px solid #3c3c3c;
  color: #cccccc;
  font-size: 13px;
  font-family: inherit;
  resize: vertical;
  border-radius: 2px;
}

.message-box textarea:focus {
  outline: none;
  border-color: #007acc;
}

/* 状态栏 */
.statusbar {
  height: 22px;
  background: #007acc;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  font-size: 12px;
  user-select: none;
}

.statusbar-left,
.statusbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.statusbar-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 4px;
  cursor: pointer;
  height: 22px;
}

.statusbar-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.statusbar-item i {
  font-size: 16px;
}

/* Codicon 图标样式 */
.codicon {
  font-family: codicon;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
}

.codicon-files::before {
  content: "📁";
}

.codicon-search::before {
  content: "🔍";
}

.codicon-source-control::before {
  content: "🌿";
}

.codicon-debug-alt::before {
  content: "▶️";
}

.codicon-extensions::before {
  content: "⊞";
}

.codicon-account::before {
  content: "👤";
}

.codicon-settings-gear::before {
  content: "⚙️";
}

.codicon-chevron-down::before {
  content: "▼";
}

.codicon-close::before {
  content: "×";
}

.codicon-ellipsis::before {
  content: "⋯";
}

.codicon-symbol-method::before {
  content: "JS";
  font-size: 10px;
}

.codicon-symbol-color::before {
  content: "🎨";
}

.codicon-json::before {
  content: "{}";
  font-size: 10px;
}

.codicon-markdown::before {
  content: "M↓";
  font-size: 10px;
}

.codicon-file::before {
  content: "📄";
}

.codicon-symbol-class::before {
  content: "V";
  font-size: 10px;
}

.codicon-error::before {
  content: "⊗";
}

.codicon-warning::before {
  content: "⚠️";
}

.codicon-feedback::before {
  content: "💬";
}

.codicon-bell::before {
  content: "🔔";
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #1e1e1e;
}

::-webkit-scrollbar-thumb {
  background: #424242;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4e4e4e;
}

::-webkit-scrollbar-corner {
  background: #1e1e1e;
}

.demo-collapse-position {
  padding: 4px 16px;
}

:deep(.el-collapse .el-icon.el-collapse-item__arrow) {
  display: block !important;
}

:deep(.el-collapse-item__header) {
  height: 1.7rem;
}

/* 拖动时的样式 */
.resizing {
  cursor: col-resize !important;
}

/* 防止文本选择 */
.no-select {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* 语法高亮样式 - 更完善的配色 */
:deep(.comment) {
  color: #6a9955;
  font-style: italic;
}

:deep(.string) {
  color: #ce9178;
}

:deep(.template-expr) {
  color: #4ec9b0;
}

:deep(.regex) {
  color: #d16969;
}

:deep(.number) {
  color: #b5cea8;
}

:deep(.constant) {
  color: #569cd6;
  font-weight: 500;
}

:deep(.keyword) {
  color: #c586c0;
  font-weight: 600;
}

:deep(.builtin) {
  color: #4ec9b0;
}

:deep(.function) {
  color: #dcdcaa;
}

:deep(.class-name) {
  color: #4ec9b0;
  font-weight: 500;
}

:deep(.property) {
  color: #9cdcfe;
}

:deep(.arrow) {
  color: #d4d4d4;
}

.hotpoint-code-list {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  padding: 8px 0;
}

.hotpoint-line {
  display: flex;
  align-items: center;
  padding: 2px 0;
}

.line-num {
  display: inline-block;
  width: 40px;
  text-align: right;
  margin-right: 16px;
  color: #858585;
  user-select: none;
}

.hotpoint-link {
  color: #d4d4d4;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hotpoint-link:hover {
  color: #ffffff;
}

.trend-icon {
  cursor: pointer;
  font-size: 16px;
  padding: 2px;
  border-radius: 4px;
}

.trend-icon:hover {
  background: rgba(64, 158, 255, 0.3);
  color: #409eff;
}

.loading-in-editor,
.empty-in-editor {
  padding: 20px;
  text-align: center;
  color: #858585;
  font-style: italic;
}

</style>