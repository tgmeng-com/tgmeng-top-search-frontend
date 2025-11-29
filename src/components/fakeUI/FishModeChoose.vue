<!-- MoyuMaster.vue  —— 可扩展的高级摸鱼模式选择器 -->
<template>
  <div>
    <teleport to="body">
      <transition name="modal">
        <div v-if="fishModeChooseShow" class="moyu-backdrop" @click="close">
          <div class="moyu-panel" @click.stop>
            <!-- 动态背景 -->
            <div class="bg-gradient"></div>
            <div class="bg-mesh"></div>

            <!-- 顶部栏 -->
            <header class="panel-header">
              <div class="header-content">
                <div class="title-group">
                  <h1>🎯 专业伪装系统</h1>
                  <p>选择最适合的工作场景模拟方案</p>
                </div>
                <button class="close-btn" @click="close" aria-label="关闭">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 5L5 15M5 5l10 10"/>
                  </svg>
                </button>
              </div>
            </header>

            <!-- 卡片区 - 可动态扩展 -->
            <main class="panel-body">
              <article
                  v-for="mode in modes"
                  :key="mode.id"
                  class="mode-card"
                  :class="{ active: selected === mode.id }"
                  @click="select(mode.id)"
              >
                <div class="card-glow" :style="{ background: mode.glowColor }"></div>
                <div class="card-header">
                  <div class="icon-wrapper" :class="mode.iconClass"
                       :style="{ background: mode.gradient, boxShadow: mode.shadow }">
                    <img :src="mode.iconUrl" :alt="mode.title" class="mode-icon"/>
                  </div>
                  <div class="badge" :class="{ current: mode.isCurrent }">
                    {{ mode.badgeText }}
                  </div>
                </div>
                <div class="card-body">
                  <h2>{{ mode.title }}</h2>
                  <p class="desc">{{ mode.description }}</p>
                  <ul class="features">
                    <li v-for="(feature, index) in mode.features" :key="index">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                        <path d="M12 3.5L5.5 10L2 6.5"/>
                      </svg>
                      {{ feature }}
                    </li>
                  </ul>
                </div>
                <div class="card-footer">
                  <div class="status-indicator">
                    <div class="dot" :class="{ active: selected === mode.id }"></div>
                    <span>{{ selected === mode.id ? '已选择' : '点击选择' }}</span>
                  </div>
                </div>
              </article>
            </main>

            <!-- 底部 -->
            <footer class="panel-footer">
              <div class="shortcuts">
                <kbd>ESC</kbd> 取消 · <kbd>Enter</kbd> 确认
              </div>
              <button class="confirm-btn" @click="confirmMode">
                <span>启动 {{ selectedMode?.shortName || '模式' }}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </button>
            </footer>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: 'MoyuMaster',
  data() {
    return {
      selected: 'excel',
      // 模式配置数组 - 轻松扩展新模式
      modes: [
        {
          id: 'excel',
          title: 'Excel 数据智能分析平台',
          shortName: 'Excel 分析系统',
          description: '企业级数据处理 · 专业商业智能',
          badgeText: '数据分析',
          isCurrent: true,
          iconUrl: 'https://img.icons8.com/fluency/48/microsoft-excel-2019.png',
          iconClass: 'excel-icon',
          gradient: 'linear-gradient(135deg, #107c41, #0a5c2e)',
          shadow: '0 4px 16px rgba(16, 124, 65, 0.3)',
          glowColor: 'radial-gradient(circle at 50% 0%, rgba(16, 124, 65, 0.15), transparent 60%)',
          features: [
            '全网热榜实时表格展示',
            '多平台数据对比分析',
            '随心所欲尽享丝滑'
          ],
          route: 'Excel'
        },
        {
          id: 'vscode',
          title: 'VS Code 集成开发环境',
          shortName: 'VSCode IDE',
          description: '全栈开发工作站 · 企业级代码编辑器',
          badgeText: '专业开发',
          isCurrent: false,
          iconUrl: 'https://img.icons8.com/fluency/48/visual-studio-code-2019.png',
          iconClass: 'vscode-icon',
          gradient: 'linear-gradient(135deg, #007acc, #005a9e)',
          shadow: '0 4px 16px rgba(0, 122, 204, 0.3)',
          glowColor: 'radial-gradient(circle at 50% 0%, rgba(0, 122, 204, 0.15), transparent 60%)',
          features: [
            '热门话题代码化展示',
            '多源热榜数据流聚合',
            '文件树形结构分类管理'
          ],
          route: 'VsCode'
        },
        // 扩展示例：可以轻松添加更多模式
        // {
        //   id: 'word',
        //   title: 'Word 文档编辑系统',
        //   shortName: 'Word 编辑器',
        //   description: '专业文档处理 · 企业级排版系统',
        //   badgeText: '文档编辑',
        //   isCurrent: false,
        //   iconUrl: 'https://img.icons8.com/fluency/48/microsoft-word-2019.png',
        //   iconClass: 'word-icon',
        //   gradient: 'linear-gradient(135deg, #2b579a, #1d4178)',
        //   shadow: '0 4px 16px rgba(43, 87, 154, 0.3)',
        //   glowColor: 'radial-gradient(circle at 50% 0%, rgba(43, 87, 154, 0.15), transparent 60%)',
        //   features: [
        //     '专业排版与格式化引擎',
        //     '协同编辑与版本控制',
        //     '智能校对与语法检查'
        //   ],
        //   route: 'Word'
        // }
      ]
    }
  },
  computed: {
    fishModeChooseShow: {
      get() {
        return this.$store.state.fishModeChooseShow;
      },
      set(value) {
        this.$store.commit('setFishModeChooseShow', value);
      }
    },
    selectedMode() {
      return this.modes.find(m => m.id === this.selected);
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKey)
  },
  methods: {
    handleKey(e) {
      if (!this.fishModeChooseShow) return;
      if (e.key === 'Escape') this.close()
      if (e.key === 'Enter') this.confirmMode()
    },
    close() {
      store.commit('setFishModeChooseShow', false)
    },
    select(modeId) {
      this.selected = modeId
    },
    confirmMode() {
      store.commit('setFishModeChooseShow', false)
      const mode = this.selectedMode;
      if (mode && mode.route) {
        this.$router?.push({name: mode.route})
      }
      window.umami.track('摸鱼模式进入：' + this.selectedMode?.shortName || '模式')
    }
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKey)
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 背景遮罩 */
.moyu-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(20px) saturate(120%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 主面板 */
.moyu-panel {
  width: 100%;
  max-width: 900px;
  background: linear-gradient(145deg, rgba(30, 33, 42, 0.95), rgba(20, 23, 32, 0.95));
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6),
  0 0 0 1px rgba(255, 255, 255, 0.08),
  inset 0 1px 0 rgba(255, 255, 255, 0.05);
  position: relative;
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 动态背景 */
.bg-gradient {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
      circle at 30% 30%,
      rgba(64, 158, 255, 0.15) 0%,
      transparent 50%
  ),
  radial-gradient(
      circle at 70% 70%,
      rgba(16, 124, 65, 0.15) 0%,
      transparent 50%
  );
  animation: rotate 20s linear infinite;
  pointer-events: none;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.bg-mesh {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
}

/* 头部 */
.panel-header {
  padding: 32px 32px 24px;
  position: relative;
  z-index: 2;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-group h1 {
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff, #a8b3cf);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 4px;
  letter-spacing: -0.5px;
}

.title-group p {
  font-size: 14px;
  color: #8892b0;
}

.close-btn {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #ccd6f6;
  cursor: pointer;
  transition: all 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

.close-btn:active {
  transform: scale(0.95);
}

/* 卡片区域 - 支持动态数量 */
.panel-body {
  padding: 0 32px 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  position: relative;
  z-index: 2;
}

/* 当有3个或更多卡片时，自动调整布局 */
@media (min-width: 1200px) {
  .panel-body {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
}

.mode-card {
  background: rgba(40, 44, 56, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 24px;
  cursor: pointer;
  position: relative;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.mode-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.mode-card:hover {
  transform: translateY(-6px);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

.mode-card:hover::before {
  opacity: 1;
}

.mode-card.active {
  background: rgba(50, 55, 70, 0.7);
  border-color: rgba(64, 158, 255, 0.5);
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.15),
  0 12px 40px rgba(64, 158, 255, 0.25);
  transform: translateY(-4px);
}

.card-glow {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.mode-card.active .card-glow {
  opacity: 1;
}

/* 卡片头部 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s;
}

.mode-icon {
  width: 40px;
  height: 40px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  transition: transform 0.3s;
}

.mode-card:hover .icon-wrapper {
  transform: scale(1.08) rotate(3deg);
}

.mode-card:hover .mode-icon {
  transform: scale(1.1);
}

.badge {
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: rgba(255, 255, 255, 0.08);
  color: #8892b0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.badge.current {
  background: rgba(103, 194, 58, 0.15);
  color: #67c23a;
  border-color: rgba(103, 194, 58, 0.3);
}

/* 卡片内容 */
.card-body h2 {
  font-size: 19px;
  font-weight: 700;
  color: #e6edf3;
  margin-bottom: 8px;
  letter-spacing: -0.3px;
  line-height: 1.3;
}

.desc {
  font-size: 13px;
  color: #8892b0;
  margin-bottom: 18px;
  line-height: 1.5;
}

.features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.features li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #a8b2d1;
  line-height: 1.4;
}

.features li svg {
  flex-shrink: 0;
  stroke: #67c23a;
  fill: none;
  stroke-width: 2;
}

/* 卡片底部 */
.card-footer {
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #8892b0;
  font-weight: 500;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(136, 146, 176, 0.3);
  border: 2px solid rgba(136, 146, 176, 0.5);
  transition: all 0.3s;
}

.dot.active {
  background: #67c23a;
  border-color: #67c23a;
  box-shadow: 0 0 12px rgba(103, 194, 58, 0.5);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

/* 底部 */
.panel-footer {
  padding: 20px 32px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  position: relative;
  z-index: 2;
}

.shortcuts {
  font-size: 13px;
  color: #6b7280;
}

.shortcuts kbd {
  background: rgba(255, 255, 255, 0.08);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: ui-monospace, monospace;
  margin: 0 2px;
}

.confirm-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #409eff, #3a8fee);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 16px rgba(64, 158, 255, 0.3),
  inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.confirm-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.confirm-btn:hover::before {
  transform: translateX(100%);
}

.confirm-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(64, 158, 255, 0.4),
  inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.confirm-btn:active {
  transform: translateY(0);
}

.confirm-btn svg {
  transition: transform 0.3s;
}

.confirm-btn:hover svg {
  transform: translateX(3px);
}

/* 动画 */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .moyu-panel,
.modal-leave-to .moyu-panel {
  transform: translateY(30px) scale(0.95);
}

/* 响应式 - 平板 */
@media (max-width: 768px) {
  .moyu-panel {
    max-width: 95%;
  }

  .panel-header {
    padding: 28px 24px 20px;
  }

  .title-group h1 {
    font-size: 24px;
  }

  .panel-body {
    padding: 0 24px 20px;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .mode-card {
    padding: 20px;
  }

  .panel-footer {
    padding: 16px 24px 28px;
    flex-direction: column-reverse;
    align-items: stretch;
  }

  .confirm-btn {
    width: 100%;
    justify-content: center;
  }

  .shortcuts {
    text-align: center;
  }
}

/* 响应式 - 手机 */
@media (max-width: 480px) {
  .moyu-backdrop {
    padding: 12px;
  }

  .moyu-panel {
    border-radius: 20px;
  }

  .panel-header {
    padding: 24px 20px 16px;
  }

  .title-group h1 {
    font-size: 22px;
  }

  .title-group p {
    font-size: 13px;
  }

  .close-btn {
    width: 36px;
    height: 36px;
  }

  .panel-body {
    padding: 0 20px 16px;
    gap: 14px;
  }

  .mode-card {
    padding: 18px;
  }

  .icon-wrapper {
    width: 48px;
    height: 48px;
  }

  .mode-icon {
    width: 32px;
    height: 32px;
  }

  .card-body h2 {
    font-size: 17px;
  }

  .panel-footer {
    padding: 14px 20px 24px;
  }

  .confirm-btn {
    padding: 12px 20px;
    font-size: 13px;
  }
}
</style>