<template>
  <div class="empty-pro">
    <div class="illustration">
      <svg viewBox="0 0 240 240" class="svg">
        <!-- 背景圆 -->
        <circle cx="120" cy="120" r="100" fill="url(#grad)" opacity="0.8"/>
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" :stop-color="accentColor" stop-opacity="0.6"/>
            <stop offset="100%" :stop-color="accentColor" stop-opacity="0.1"/>
          </linearGradient>
        </defs>

        <!-- 主要图形：抽象的“文档 + 放大镜” -->
        <g transform="translate(70,60)">
          <rect x="20" y="30" width="80" height="100" rx="12" fill="none" stroke="currentColor" stroke-width="8" opacity="0.15"/>
          <rect x="30" y="45" width="60" height="6" rx="3" fill="currentColor" opacity="0.2"/>
          <rect x="30" y="60" width="50" height="4" rx="2" fill="currentColor" opacity="0.15"/>
          <rect x="30" y="70" width="55" height="4" rx="2" fill="currentColor" opacity="0.15"/>
          <circle cx="85" cy="95" r="20" fill="none" stroke="currentColor" stroke-width="10" opacity="0.3"/>
          <line x1="95" y1="105" x2="105" y2="115" stroke="currentColor" stroke-width="10" opacity="0.3"/>
        </g>
      </svg>
    </div>

    <div class="content">
      <h3 class="title">{{ title }}</h3>
      <p class="desc">
        {{ description }}
      </p>
    </div>

    <slot name="action" />
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '暂无内容' },
    description: { type: String, default: '这里空空如也，待内容来填充～' },
    accentColor: { type: String, default: '#50457a' } // 主题色
  }
}
</script>

<style scoped>
.empty-pro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 360px;
  padding: 3rem 1rem;
  text-align: center;
  color: #053f93;
}

.dark .empty-pro {
  color: #1b5fc3;
}

.illustration {
  width: 180px;
  height: 180px;
  margin-bottom: 2rem;
  color: #c4b5fd;                    /* 极亮紫 */
  filter:
      drop-shadow(0 0 20px rgba(196, 181, 253, 0.6))
      drop-shadow(0 12px 40px rgba(139, 92, 246, 0.4))
      brightness(1.3);
  animation: float 6s ease-in-out infinite;
  transform: scale(1.08);
}

.svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 10px 30px rgba(139, 92, 246, 0.08));
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  background: linear-gradient(90deg, #8b5cf6, #bda6b2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .title {
  background: linear-gradient(90deg, #c084fc, #aa276c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.desc {
  white-space: pre-wrap;
  font-size: 1rem;
  line-height: 1.6;
  color: #94a3b8;
  margin: 0;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-16px); }
}
</style>