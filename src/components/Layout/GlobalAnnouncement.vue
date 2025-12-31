<template>
  <Transition name="slide-fade">
    <div v-if="shouldShow && visible" class="notification-box">
      <div class="glass-card">
        <div class="header">
          <div class="title-wrap">
            <span class="brand-tag">NOTICE</span>
            <h3 class="main-title">{{ title }}</h3>
          </div>
          <button @click="close" class="icon-close" aria-label="Close">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="content-body">
          <div v-for="(item, index) in list" :key="index" class="list-item">
            <div class="bullet"></div>
            <p class="text-content">{{ item }}</p>
          </div>
        </div>

        <div class="footer">
          <button @click="close" class="btn-primary">确认并继续</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'PremiumNotification',
  props: {
    title: { type: String, default: '版本更新说明' },
    list: {
      type: Array,
      default: () => ['样式已全面适配暗色模式', '标题对比度增强', '有效期逻辑已上线']
    },
    expiryDate: { type: String, default: '' }
  },
  data() {
    return {
      visible: false,
      shouldShow: true
    };
  },
  mounted() {
    this.checkExpiry();
    if (this.shouldShow) {
      // 适当延迟弹出，更显高级
      setTimeout(() => { this.visible = true; }, 800);
    }
  },
  methods: {
    checkExpiry() {
      if (!this.expiryDate) return;
      const now = new Date().getTime();
      const expiry = new Date(this.expiryDate).getTime();
      if (now > expiry) this.shouldShow = false;
    },
    close() {
      this.visible = false;
    }
  }
}
</script>

<style scoped>
/* 核心容器布局 */
.notification-box {
  position: fixed;
  top: 32px;
  left: 32px;
  z-index: 10000;
  width: 350px;
  pointer-events: auto;
}

/* 样式逻辑 - 优先定义变量 */
.glass-card {
  /* 亮色模式默认值 */
  --n-bg: rgba(255, 255, 255, 0.95);
  --n-border: rgba(0, 0, 0, 0.08);
  --n-title: #1a202c;
  --n-text: #4a5568;
  --n-btn-bg: #1a202c;
  --n-btn-text: #ffffff;
  --n-shadow: rgba(0, 0, 0, 0.1);

  position: relative;
  background: var(--n-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--n-border);
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 20px 40px -10px var(--n-shadow);
  transition: all 0.3s ease;
}

/* 强制覆盖暗色模式样式 */
@media (prefers-color-scheme: dark) {
  .glass-card {
    --n-bg: rgba(13, 17, 23, 0.9); /* 更深的底色 */
    --n-border: rgba(255, 255, 255, 0.15); /* 亮色细边框 */
    --n-title: #f8fafc !important; /* 强制浅色标题 */
    --n-text: #94a3b8 !important; /* 灰蓝色正文 */
    --n-btn-bg: #38bdf8; /* 暗色模式下改用亮蓝色按钮 */
    --n-btn-text: #082f49;
    --n-shadow: rgba(0, 0, 0, 0.4);

    background-color: var(--n-bg) !important;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
}

.title-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-tag {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: white !important;
  font-size: 10px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 8px;
  letter-spacing: 1px;
}

.main-title {
  font-size: 19px; /* 字体加大 */
  font-weight: 800;
  color: var(--n-title) !important; /* 确保使用变量并加上 important */
  margin: 0;
}

.icon-close {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  transition: 0.2s;
}
.icon-close:hover {
  background: rgba(244, 63, 94, 0.1);
  color: #f43f5e;
}

.content-body {
  display: flex;
  flex-direction: column;
  gap: 14px;
  text-align: left;
}

.list-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.bullet {
  width: 6px;
  height: 6px;
  background: #6366f1;
  border-radius: 50%;
  margin-top: 9px;
  flex-shrink: 0;
}

.text-content {
  font-size: 15px; /* 正文字体加大 */
  line-height: 1.6;
  color: var(--n-text) !important;
  margin: 0;
  font-weight: 500;
}

.footer {
  margin-top: 28px;
  display: flex;
  justify-content: flex-end;
}

.btn-primary {
  background: var(--n-btn-bg);
  color: var(--n-btn-text);
  border: none;
  padding: 10px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
  box-shadow: 0 8px 15px -4px rgba(0,0,0,0.2);
}

/* 进场动画 */
.slide-fade-enter-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-fade-leave-active {
  transition: all 0.4s ease-in;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(-30px) scale(0.95);
  filter: blur(10px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>