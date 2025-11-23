<template>
  <div class="text-carousel-container" :style="containerStyle">
    <div class="text-carousel-wrapper" ref="textContainer">
      <!-- 星星粒子 -->
      <div
          v-for="sparkle in sparkles"
          :key="sparkle.id"
          class="sparkle"
          :style="{
          left: sparkle.x + 'px',
          top: sparkle.y + 'px',
          width: sparkle.size + 'px',
          height: sparkle.size + 'px',
          animationDuration: sparkle.duration + 'ms'
        }"
      >
        <svg viewBox="0 0 20 20" fill="none">
          <path
              d="M10 0L10.9 6.5L16 3L12 8.5L18 10L12 11.5L16 17L10.9 13.5L10 20L9.1 13.5L4 17L8 11.5L2 10L8 8.5L4 3L9.1 6.5L10 0Z"
              :fill="sparkle.color"
          />
        </svg>
      </div>

      <!-- 文字内容 -->
      <transition
          name="slide"
      >
        <div :key="currentIndex" class="text-item" :style="textStyle">
          {{ textList[currentIndex] }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextCarousel',
  props: {
    // 文字列表
    textList: {
      type: Array,
      default: () => [
        'AI 加持的聚合热榜 · 实时追踪全网热点',
        '智能分析 · 发现热点背后的故事',
        '多平台聚合 · 一站掌握热榜动态',
        'AI 深度解读 · 永不错过精彩内容',
        '个性化推荐 · 智能热点订阅'
      ]
    },
    // 切换间隔时间（毫秒）
    interval: {
      type: Number,
      default: 3000
    },
    // 动画时长（毫秒）
    duration: {
      type: Number,
      default: 600
    },
    // 星星生成间隔（毫秒）
    sparkleInterval: {
      type: Number,
      default: 150
    },
    // 星星颜色
    sparkleColors: {
      type: Array,
      default: () => ['#A07CFE', '#FE8FB5', '#3b82f6', '#10b981']
    },
    // 文字大小（支持数字px或CSS字符串）
    fontSize: {
      type: [Number, String],
      default: 'clamp(18px, 4vw, 32px)'
    },
    // 字重
    fontWeight: {
      type: [Number, String],
      default: 700
    },
    // 字间距（支持数字px或CSS字符串）
    letterSpacing: {
      type: [Number, String],
      default: 'clamp(0.5px, 0.15vw, 1.5px)'
    },
    // 字体
    fontFamily: {
      type: String,
      default: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", sans-serif'
    },
    // 容器最小高度（防止抖动）
    minHeight: {
      type: [Number, String],
      default: 'auto'
    }
  },
  data() {
    return {
      currentIndex: 0,
      timer: null,
      sparkleTimer: null,
      sparkles: []
    }
  },
  computed: {
    textStyle() {
      return {
        fontSize: typeof this.fontSize === 'number' ? `${this.fontSize}px` : this.fontSize,
        fontWeight: this.fontWeight,
        letterSpacing: typeof this.letterSpacing === 'number' ? `${this.letterSpacing}px` : this.letterSpacing,
        fontFamily: this.fontFamily
      }
    },
    containerStyle() {
      const height = typeof this.minHeight === 'number' ? `${this.minHeight}px` : this.minHeight
      return height !== 'auto' ? { minHeight: height } : {}
    }
  },
  mounted() {
    this.startCarousel()
    this.startSparkles()
  },
  beforeUnmount() {
    this.stopCarousel()
    this.stopSparkles()
  },
  methods: {
    startCarousel() {
      this.timer = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.textList.length
      }, this.interval)
    },
    stopCarousel() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    startSparkles() {
      this.sparkleTimer = setInterval(() => {
        this.generateSparkle()
      }, this.sparkleInterval)
    },
    stopSparkles() {
      if (this.sparkleTimer) {
        clearInterval(this.sparkleTimer)
        this.sparkleTimer = null
      }
    },
    generateSparkle() {
      if (!this.$refs.textContainer) return

      const rect = this.$refs.textContainer.getBoundingClientRect()

      // 限制星星数量，防止内存溢出
      if (this.sparkles.length > 50) {
        return
      }

      const sparkle = {
        id: Date.now() + Math.random(),
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        size: Math.random() * 8 + 8,
        color: this.sparkleColors[Math.floor(Math.random() * this.sparkleColors.length)],
        duration: Math.random() * 1000 + 800
      }

      this.sparkles.push(sparkle)

      // 自动清理
      setTimeout(() => {
        const index = this.sparkles.findIndex(s => s.id === sparkle.id)
        if (index > -1) {
          this.sparkles.splice(index, 1)
        }
      }, sparkle.duration)
    }
  }
}
</script>

<style scoped>
.text-carousel-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 20px 0;
}

.text-carousel-wrapper {
  position: relative;
  width: 100%;
  min-height: 60px; /* 设置固定最小高度 */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* 星星粒子样式 */
.sparkle {
  position: absolute;
  pointer-events: none;
  animation: sparkle-fade forwards ease-out;
  z-index: 1;
}

.sparkle svg {
  width: 100%;
  height: 100%;
  filter: blur(0.5px) drop-shadow(0 0 4px currentColor);
}

@keyframes sparkle-fade {
  0% {
    opacity: 0;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.5) rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: scale(0.5) rotate(360deg);
  }
}

/* 文字样式 */
.text-item {
  background: linear-gradient(120deg, #a855f7, #ec4899, #f59e0b, #10b981, #3b82f6, #8b5cf6);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  white-space: nowrap;
  overflow: hidden; /* 改为 hidden */
  text-overflow: ellipsis;
  animation: color-shift 6s ease-in-out infinite;
  position: relative;
  filter: contrast(1.1) brightness(1.1);
  line-height: 1.2;
  padding: 10px 20px; /* 左右也加 padding */
  max-width: 100%; /* 限制最大宽度 */
  z-index: 2;
}

@keyframes color-shift {
  0%, 100% {
    background-position: 0% 50%;
    filter: contrast(1.1) brightness(1.1) hue-rotate(0deg);
  }
  25% {
    background-position: 50% 50%;
    filter: contrast(1.2) brightness(1.15) hue-rotate(30deg);
  }
  50% {
    background-position: 100% 50%;
    filter: contrast(1.15) brightness(1.2) hue-rotate(60deg);
  }
  75% {
    background-position: 50% 50%;
    filter: contrast(1.2) brightness(1.15) hue-rotate(30deg);
  }
}

/* 上下滑动过渡动画 */
.slide-enter-active {
  transition: all 0.6s ease;
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
}

.slide-leave-active {
  transition: all 0.6s ease;
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
}

.slide-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>