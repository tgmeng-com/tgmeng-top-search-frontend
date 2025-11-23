<template>
  <div>
    <!-- AI悬浮按钮 -->
    <div
        :class="['fixed cursor-pointer z-50 ai-summary-button']"
        :style="buttonStyle"
        @click="handleClick"
    >
      <!-- 外圈光环 - 添加 pointer-events-none -->
      <div class="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 animate-spin-slow opacity-75 blur-sm pointer-events-none"></div>

      <!-- 按钮主体 -->
      <div class="relative w-full h-full rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 shadow-2xl flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-purple-500/50">
        <!-- AI图标 -->
        <svg class="w-8 h-8 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <!-- 文字 -->
        <span class="text-[10px] font-bold text-white tracking-wide">{{ text }}</span>
      </div>

      <!-- 脉冲效果 - 添加 pointer-events-none -->
      <div class="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-20 pointer-events-none"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AIFloatButton1',
  props: {
    text: {
      type: String,
      default: 'AI简报'
    },
    size: {
      type: Number,
      default: 64
    },
    position: {
      type: String,
      default: 'bottom-right',
      validator: (val) => ['bottom-right', 'bottom-left', 'top-right', 'top-left'].includes(val)
    },
    offset: {
      type: Number,
      default: 32
    }
  },
  computed: {
    buttonStyle() {
      const positions = {
        'bottom-right': { bottom: `${this.offset}px`, right: `${this.offset}px` },
        'bottom-left': { bottom: `${this.offset}px`, left: `${this.offset}px` },
        'top-right': { top: `${this.offset}px`, right: `${this.offset}px` },
        'top-left': { top: `${this.offset}px`, left: `${this.offset}px` }
      }
      return {
        ...positions[this.position],
        width: `${this.size}px`,
        height: `${this.size}px`
      }
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.ai-summary-button {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}
</style>