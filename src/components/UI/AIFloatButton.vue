<template>
  <div>
    <!-- AI悬浮按钮 -->
    <div
        :class="['fixed cursor-pointer z-50 ai-summary-button']"
        :style="buttonStyle"
        @click="handleClick"
    >
      <!-- 外圈光环 -->
      <div class="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 animate-spin-slow opacity-75 blur-sm pointer-events-none"></div>

      <!-- 按钮主体 -->
      <div class="relative w-full h-full rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 shadow-2xl flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-110 hover:shadow-purple-500/50">

        <!-- 3D机器人 -->
        <div class="robot-3d" :style="{ transform: `scale(${size / 80})` }">
          <!-- 天线 -->
          <div class="antenna">
            <div class="antenna-ball"></div>
          </div>

          <!-- 头部 -->
          <div class="robot-head">
            <!-- 眼睛 -->
            <div class="eyes">
              <div class="eye left-eye">
                <div class="pupil"></div>
              </div>
              <div class="eye right-eye">
                <div class="pupil"></div>
              </div>
            </div>
            <!-- 嘴巴 -->
            <div class="mouth"></div>
          </div>

          <!-- 身体 -->
          <div class="robot-body">
            <!-- 胸部指示灯 -->
            <div class="chest-light"></div>
            <!-- 手臂 -->
            <div class="arm left-arm"></div>
            <div class="arm right-arm"></div>
          </div>

          <!-- 腿部 -->
          <div class="legs">
            <div class="leg left-leg"></div>
            <div class="leg right-leg"></div>
          </div>
        </div>

        <!-- 文字 -->
        <span class="text-[8px] font-bold text-white tracking-wide" :style="{ fontSize: size > 55 ? '10px' : '8px' }">{{ text }}</span>
      </div>

      <!-- 脉冲效果 -->
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

/* 3D机器人样式 */
.robot-3d {
  position: relative;
  width: 30px;
  height: 32px;
  transform-style: preserve-3d;
  animation: robotFloat 2s ease-in-out infinite;
}

@keyframes robotFloat {
  0%, 100% { transform: translateY(0) rotateY(0deg); }
  25% { transform: translateY(-3px) rotateY(-5deg); }
  50% { transform: translateY(0) rotateY(0deg); }
  75% { transform: translateY(-3px) rotateY(5deg); }
}

/* 天线 */
.antenna {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 1.5px;
  height: 4px;
  background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.5));
  border-radius: 1px;
}

.antenna-ball {
  position: absolute;
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 3px;
  background: radial-gradient(circle at 30% 30%, #fff, #ffd700);
  border-radius: 50%;
  box-shadow: 0 0 3px rgba(255, 215, 0, 0.8);
  animation: antennaBlink 1.5s ease-in-out infinite;
}

@keyframes antennaBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* 头部 */
.robot-head {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 18px;
  height: 16px;
  background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
  border-radius: 6px 6px 4px 4px;
  box-shadow:
      inset -1.5px -1.5px 3px rgba(0,0,0,0.1),
      inset 1.5px 1.5px 3px rgba(255,255,255,0.9),
      0 1.5px 6px rgba(0,0,0,0.2);
}

/* 眼睛 */
.eyes {
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 13px;
  display: flex;
  justify-content: space-between;
}

.eye {
  width: 4.5px;
  height: 4.5px;
  background: linear-gradient(135deg, #4a90e2, #2e5c8a);
  border-radius: 50%;
  box-shadow:
      inset -0.5px -0.5px 1.5px rgba(0,0,0,0.3),
      0 0.5px 1.5px rgba(74, 144, 226, 0.6);
  position: relative;
  animation: eyeBlink 4s ease-in-out infinite;
}

.pupil {
  position: absolute;
  width: 1.5px;
  height: 1.5px;
  background: #fff;
  border-radius: 50%;
  top: 0.8px;
  left: 0.8px;
  box-shadow: 0 0 1.5px rgba(255,255,255,0.8);
}

@keyframes eyeBlink {
  0%, 96%, 100% { transform: scaleY(1); }
  98% { transform: scaleY(0.1); }
}

/* 嘴巴 */
.mouth {
  position: absolute;
  bottom: 3px;
  left: 50%;
  transform: translateX(-50%);
  width: 7px;
  height: 2px;
  border-radius: 0 0 6px 6px;
  background: linear-gradient(180deg, #555, #333);
  box-shadow: inset 0 -0.5px 0.5px rgba(0,0,0,0.3);
}

/* 身体 */
.robot-body {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 21px;
  height: 15px;
  background: linear-gradient(135deg, #f0f0f0 0%, #c0c0c0 100%);
  border-radius: 3px;
  box-shadow:
      inset -1.5px -1.5px 3px rgba(0,0,0,0.15),
      inset 1.5px 1.5px 3px rgba(255,255,255,0.9),
      0 2px 6px rgba(0,0,0,0.25);
}

/* 胸部指示灯 */
.chest-light {
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 4.5px;
  height: 4.5px;
  background: radial-gradient(circle at 30% 30%, #4ade80, #22c55e);
  border-radius: 50%;
  box-shadow:
      0 0 3px rgba(74, 222, 128, 0.8),
      inset -0.5px -0.5px 1.5px rgba(0,0,0,0.2);
  animation: chestPulse 2s ease-in-out infinite;
}

@keyframes chestPulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 4px rgba(74, 222, 128, 0.8); }
  50% { opacity: 0.6; box-shadow: 0 0 8px rgba(74, 222, 128, 1); }
}

/* 手臂 */
.arm {
  position: absolute;
  top: 1.5px;
  width: 4.5px;
  height: 12px;
  background: linear-gradient(135deg, #e0e0e0, #b0b0b0);
  border-radius: 2px;
  box-shadow:
      inset -0.5px -0.5px 1.5px rgba(0,0,0,0.2),
      0.5px 0.5px 1.5px rgba(0,0,0,0.1);
}

.left-arm {
  left: -5px;
  transform-origin: top center;
  animation: armWave 2s ease-in-out infinite;
}

.right-arm {
  right: -5px;
  transform-origin: top center;
  animation: armWave 2s ease-in-out infinite 1s;
}

@keyframes armWave {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-15deg); }
}

/* 腿部 */
.legs {
  position: absolute;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);
  width: 15px;
  display: flex;
  justify-content: space-between;
}

.leg {
  width: 5px;
  height: 7px;
  background: linear-gradient(135deg, #d0d0d0, #a0a0a0);
  border-radius: 0 0 2px 2px;
  box-shadow:
      inset -0.5px -0.5px 1.5px rgba(0,0,0,0.2),
      0.5px 1.5px 2px rgba(0,0,0,0.2);
}
</style>