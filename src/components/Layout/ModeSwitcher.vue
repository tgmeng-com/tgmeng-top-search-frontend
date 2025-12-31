<template>
  <div>
    <!-- 可拖动的模式切换浮动按钮 -->
    <div
        ref="floatButton"
        class="fixed pointer-events-auto cursor-move z-[1000] transition-all"
        :style="buttonStyle"
        @mousedown="handleMouseDown"
        @touchstart="handleTouchStart"
    >
      <div class="ai-float-button" @click="handleButtonClick">
        <div class="button-glow"></div>
        <div class="button-glow-2"></div>
        <div class="button-glow-3"></div>

        <div class="button-main">
          <div class="button-bg-decoration"></div>

          <div class="button-icon">
            <!-- AI模式：机器人 -->
            <svg v-if="isAIMode" class="icon-svg robot" viewBox="0 0 64 64" fill="none">
              <defs>
                <linearGradient id="robotBody" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#E8EAF6"/>
                  <stop offset="100%" style="stop-color:#C5CAE9"/>
                </linearGradient>
                <radialGradient id="eyeGlow">
                  <stop offset="0%" style="stop-color:#64FFDA"/>
                  <stop offset="100%" style="stop-color:#00BFA5"/>
                </radialGradient>
              </defs>
              <line x1="32" y1="8" x2="32" y2="12" stroke="#9E9E9E" stroke-width="2"/>
              <circle cx="32" cy="6" r="2.5" fill="#FF6B9D">
                <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite"/>
              </circle>
              <rect x="20" y="12" width="24" height="20" rx="4" fill="url(#robotBody)"/>
              <rect x="22" y="14" width="8" height="2" rx="1" fill="white" opacity="0.6"/>
              <circle cx="27" cy="22" r="4" fill="url(#eyeGlow)">
                <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="37" cy="22" r="4" fill="url(#eyeGlow)">
                <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="27" cy="22" r="2.5" fill="#1DE9B6"/>
              <circle cx="37" cy="22" r="2.5" fill="#1DE9B6"/>
              <circle cx="26" cy="21" r="1" fill="white"/>
              <circle cx="36" cy="21" r="1" fill="white"/>
              <rect x="26" y="27" width="2" height="2" rx="0.5" fill="#4FC3F7" opacity="0.8"/>
              <rect x="30" y="27" width="2" height="2" rx="0.5" fill="#4FC3F7" opacity="0.8"/>
              <rect x="34" y="27" width="2" height="2" rx="0.5" fill="#4FC3F7" opacity="0.8"/>
              <rect x="22" y="34" width="20" height="18" rx="3" fill="url(#robotBody)"/>
              <circle cx="32" cy="44" r="2.5" fill="#FF6B9D">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite"/>
              </circle>
              <rect x="14" y="36" width="6" height="12" rx="2" fill="url(#robotBody)"/>
              <rect x="44" y="36" width="6" height="12" rx="2" fill="url(#robotBody)"/>
              <rect x="26" y="52" width="5" height="8" rx="1.5" fill="url(#robotBody)"/>
              <rect x="33" y="52" width="5" height="8" rx="1.5" fill="url(#robotBody)"/>
            </svg>

            <!-- 普通模式：超可爱糖果 -->
            <svg v-else class="icon-svg candy" viewBox="0 0 64 64" fill="none">
              <defs>
                <radialGradient id="candyBallGradient" cx="35%" cy="35%">
                  <stop offset="0%" style="stop-color:#FFF0F5"/>
                  <stop offset="40%" style="stop-color:#FFB3E6"/>
                  <stop offset="100%" style="stop-color:#FF69B4"/>
                </radialGradient>
                <linearGradient id="candyStickGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#FFFFFF"/>
                  <stop offset="100%" style="stop-color:#FFE5F0"/>
                </linearGradient>
                <filter id="candyShadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                  <feOffset dx="0" dy="2" result="offsetblur"/>
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3"/>
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <!-- 糖果阴影 -->
              <circle cx="32" cy="22" r="16" fill="#FF69B4" opacity="0.2" filter="url(#candyShadow)"/>

              <!-- 棒子 -->
              <rect x="30" y="36" width="4" height="22" rx="2" fill="url(#candyStickGradient)"/>
              <rect x="30.5" y="36" width="1.5" height="22" rx="0.75" fill="white" opacity="0.6"/>

              <!-- 糖果主球体 -->
              <circle cx="32" cy="22" r="15" fill="url(#candyBallGradient)"/>

              <!-- 可爱的螺旋条纹 -->
              <g opacity="0.85">
                <!-- 外层螺旋 -->
                <path d="M 32 7 Q 44 10, 46 22 Q 44 34, 32 37"
                      stroke="#FFFFFF"
                      stroke-width="3.5"
                      fill="none"
                      stroke-linecap="round"/>
                <path d="M 32 7 Q 20 10, 18 22 Q 20 34, 32 37"
                      stroke="#FFFFFF"
                      stroke-width="3.5"
                      fill="none"
                      stroke-linecap="round"/>

                <!-- 内层螺旋 -->
                <path d="M 32 10 Q 40 13, 42 22 Q 40 31, 32 34"
                      stroke="#FFE5F0"
                      stroke-width="2.5"
                      fill="none"
                      stroke-linecap="round"/>
                <path d="M 32 10 Q 24 13, 22 22 Q 24 31, 32 34"
                      stroke="#FFE5F0"
                      stroke-width="2.5"
                      fill="none"
                      stroke-linecap="round"/>
              </g>

              <!-- 可爱的小装饰圆点 -->
              <circle cx="26" cy="16" r="2" fill="#FF1493" opacity="0.6">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="38" cy="18" r="1.8" fill="#FF1493" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.9;0.5" dur="1.8s" repeatCount="indefinite"/>
              </circle>
              <circle cx="32" cy="28" r="1.5" fill="#FF1493" opacity="0.4">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/>
              </circle>

              <!-- 超亮高光 -->
              <ellipse cx="26" cy="14" rx="5" ry="6" fill="white" opacity="0.85" transform="rotate(-20 26 14)"/>
              <ellipse cx="38" cy="20" rx="3.5" ry="4" fill="white" opacity="0.7" transform="rotate(15 38 20)"/>
              <circle cx="29" cy="25" r="2" fill="white" opacity="0.5"/>

              <!-- 中心闪亮星星 -->
              <g opacity="0.8">
                <path d="M 32 20 L 33 22 L 35 22 L 33.5 23.5 L 34 25.5 L 32 24 L 30 25.5 L 30.5 23.5 L 29 22 L 31 22 Z"
                      fill="#FFD700">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="1.2s" repeatCount="indefinite"/>
                  <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 32 22.5"
                      to="360 32 22.5"
                      dur="3s"
                      repeatCount="indefinite"/>
                </path>
              </g>
            </svg>
          </div>

          <div class="button-label">{{ isAIMode ? 'AI模式' : '普通模式' }}</div>
        </div>
      </div>
    </div>

    <!-- 切换提示消息 -->
    <Transition name="message-fade">
      <div v-if="showMessage" class="mode-message-container">
        <div class="mode-message" :class="{ 'ai-mode': messageIsAI }">
          <div class="message-icon">
            <svg v-if="messageIsAI" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <div class="message-content">
            <div class="message-title">{{ messageTitle }}</div>
            <div class="message-desc">{{ messageDesc }}</div>
          </div>
          <div class="message-sparkle">✨</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: 'ModeSwitcher',
  data() {
    return {
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0,
      dragStartPosX: 0,
      dragStartPosY: 0,
      position: { x: 0, y: 0 },
      dragThreshold: 5,
      showMessage: false,
      messageTitle: '',
      messageDesc: '',
      messageIsAI: false,
    };
  },
  computed: {
    isAIMode: {
      get() {
        return this.$store.state.isAIMode;
      },
      set(value) {
        this.$store.commit('setIsAIMode', value);
      }
    },
    buttonSize() {
      return window.innerWidth < 768 ? 50 : 60;
    },
    buttonStyle() {
      return {
        left: `${this.position.x}px`,
        top: `${this.position.y}px`,
        transition: this.isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      };
    }
  },
  mounted() {
    this.position.x = window.innerWidth - this.buttonSize - 30;
    this.position.y = window.innerHeight - this.buttonSize - 150;
    this.loadSavedPosition();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleTouchEnd);
  },
  methods: {
    loadSavedPosition() {
      try {
        const saved = localStorage.getItem('modeSwitcherPosition');
        if (saved) {
          const savedPos = JSON.parse(saved);
          if (this.isPositionValid(savedPos)) {
            this.position = savedPos;
          }
        }
      } catch (error) {
        console.error('加载按钮位置失败:', error);
      }
    },
    savePosition() {
      try {
        localStorage.setItem('modeSwitcherPosition', JSON.stringify(this.position));
      } catch (error) {
        console.error('保存按钮位置失败:', error);
      }
    },
    isPositionValid(pos) {
      const maxX = window.innerWidth - this.buttonSize;
      const maxY = window.innerHeight - this.buttonSize;
      return pos.x >= 0 && pos.x <= maxX && pos.y >= 0 && pos.y <= maxY;
    },
    handleMouseDown(e) {
      e.preventDefault();
      this.startDrag(e.clientX, e.clientY);
      window.addEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('mouseup', this.handleMouseUp);
    },
    handleMouseMove(e) {
      this.drag(e.clientX, e.clientY);
    },
    handleMouseUp(e) {
      this.endDrag(e.clientX, e.clientY);
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('mouseup', this.handleMouseUp);
    },
    handleTouchStart(e) {
      const touch = e.touches[0];
      this.startDrag(touch.clientX, touch.clientY);
      window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
      window.addEventListener('touchend', this.handleTouchEnd);
    },
    handleTouchMove(e) {
      e.preventDefault();
      const touch = e.touches[0];
      this.drag(touch.clientX, touch.clientY);
    },
    handleTouchEnd(e) {
      const touch = e.changedTouches[0];
      this.endDrag(touch.clientX, touch.clientY);
      window.removeEventListener('touchmove', this.handleTouchMove);
      window.removeEventListener('touchend', this.handleTouchEnd);
    },
    startDrag(clientX, clientY) {
      this.isDragging = true;
      this.dragStartX = clientX;
      this.dragStartY = clientY;
      this.dragStartPosX = this.position.x;
      this.dragStartPosY = this.position.y;
    },
    drag(clientX, clientY) {
      if (!this.isDragging) return;
      const deltaX = clientX - this.dragStartX;
      const deltaY = clientY - this.dragStartY;
      let newX = this.dragStartPosX + deltaX;
      let newY = this.dragStartPosY + deltaY;
      const maxX = window.innerWidth - this.buttonSize;
      const maxY = window.innerHeight - this.buttonSize;
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
      this.position.x = newX;
      this.position.y = newY;
    },
    endDrag(clientX, clientY) {
      if (!this.isDragging) return;
      const deltaX = clientX - this.dragStartX;
      const deltaY = clientY - this.dragStartY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      this.isDragging = false;
      if (distance < this.dragThreshold) {
        this.toggleMode();
      } else {
        this.savePosition();
      }
    },
    handleButtonClick() {},
    handleResize() {
      const maxX = window.innerWidth - this.buttonSize;
      const maxY = window.innerHeight - this.buttonSize;
      this.position.x = Math.max(0, Math.min(this.position.x, maxX));
      this.position.y = Math.max(0, Math.min(this.position.y, maxY));
    },
    toggleMode() {
      const willBeAIMode = !this.isAIMode;

      if (willBeAIMode) {
        const currentCat = this.$store.state.activeCategory;
        if (currentCat && (currentCat.routerName === 'sudden' || currentCat.routerName === 'favorites')) {
          const newsCat = this.$store.state.categroies.find(cat => cat.routerName === 'news');
          if (newsCat) {
            this.$store.commit('setActiveCategory', newsCat);
          }
        }
      }

      this.isAIMode = willBeAIMode;
      this.showModeMessage(willBeAIMode);

      if (window.umami) {
        window.umami.track(willBeAIMode ? '切换到AI模式' : '切换到普通模式');
      }
    },
    showModeMessage(isAI) {
      this.messageIsAI = isAI;

      if (isAI) {
        this.messageTitle = '🤖 AI智能模式已启动';
        this.messageDesc = '为您提供深度分析和未来趋势预测';
      } else {
        this.messageTitle = '🍭 普通模式已切换';
        this.messageDesc = '回到传统热点列表浏览模式';
      }

      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
/* 悬浮按钮 */
.ai-float-button {
  position: relative;
  width: 60px;
  height: 60px;
  animation: floatAnimation 3s ease-in-out infinite;
}

@keyframes floatAnimation {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.button-glow, .button-glow-2, .button-glow-3 {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  pointer-events: none;
}

.button-glow {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.6), transparent 70%);
  transform: translate(-50%, -50%);
  animation: glowPulse1 2s ease-in-out infinite;
}

.button-glow-2 {
  width: 130%;
  height: 130%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent 60%);
  transform: translate(-50%, -50%);
  animation: glowPulse2 2s ease-in-out infinite 0.25s;
}

.button-glow-3 {
  width: 160%;
  height: 160%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.25), transparent 50%);
  transform: translate(-50%, -50%);
  animation: glowPulse3 2s ease-in-out infinite 0.5s;
}

@keyframes glowPulse1 {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  50% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
}

@keyframes glowPulse2 {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  50% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
}

@keyframes glowPulse3 {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  50% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
}

.button-main {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #3b82f6 100%);
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4),
  0 8px 40px rgba(139, 92, 246, 0.3),
  inset 0 1px 0 rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.button-main:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 30px rgba(99, 102, 241, 0.6),
  0 12px 50px rgba(139, 92, 246, 0.4),
  inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.button-bg-decoration {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent 70%);
  animation: rotateBg 10s linear infinite;
}

@keyframes rotateBg {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.button-icon {
  position: relative;
  z-index: 1;
  width: 32px;
  height: 32px;
  margin-bottom: 2px;
}

.icon-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.icon-svg.robot {
  animation: robotBounce 2.5s ease-in-out infinite;
}

.icon-svg.candy {
  animation: candyBounce 2.5s ease-in-out infinite;
}

@keyframes robotBounce {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-4px) rotate(5deg); }
}

@keyframes candyBounce {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-4px) rotate(-5deg); }
}

.button-label {
  position: relative;
  z-index: 1;
  font-size: 10px;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;
}

/* 消息提示 */
.mode-message-container {
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  pointer-events: none;
}

.mode-message {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(249, 250, 251, 0.95));
  backdrop-filter: blur(20px);
  border-radius: 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.8);
  min-width: 320px;
  max-width: 90vw;
}

.mode-message.ai-mode {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15));
  border: 1px solid rgba(102, 126, 234, 0.3);
}

.dark .mode-message {
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.95), rgba(17, 24, 39, 0.95));
  border: 1px solid rgba(75, 85, 99, 0.5);
}

.dark .mode-message.ai-mode {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.25), rgba(118, 75, 162, 0.25));
  border: 1px solid rgba(139, 92, 246, 0.4);
}

.message-icon {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  animation: iconPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes iconPop {
  0% { transform: scale(0) rotate(-180deg); opacity: 0; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

.message-content {
  flex: 1;
}

.message-title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.dark .message-title {
  color: #f3f4f6;
}

.message-desc {
  font-size: 0.8125rem;
  color: #6b7280;
  line-height: 1.4;
}

.dark .message-desc {
  color: #9ca3af;
}

.message-sparkle {
  flex-shrink: 0;
  font-size: 1.25rem;
  animation: sparkleRotate 2s ease-in-out infinite;
}

@keyframes sparkleRotate {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.2); }
}

.message-fade-enter-active {
  animation: messageFadeIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.message-fade-leave-active {
  animation: messageFadeOut 0.3s ease-in;
}

@keyframes messageFadeIn {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

@keyframes messageFadeOut {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px) scale(0.95);
  }
}

@media (max-width: 768px) {
  .ai-float-button { width: 50px; height: 50px; }
  .button-icon { width: 26px; height: 26px; }
  .button-label { font-size: 9px; }

  .mode-message {
    padding: 0.875rem 1.25rem;
    min-width: 280px;
    gap: 0.75rem;
  }

  .message-icon {
    width: 2rem;
    height: 2rem;
  }

  .message-title {
    font-size: 0.875rem;
  }

  .message-desc {
    font-size: 0.75rem;
  }
}
</style>