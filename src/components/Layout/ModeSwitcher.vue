<template>
  <div>
    <div
        ref="floatButton"
        class="fixed pointer-events-auto cursor-move z-[1000]"
        :style="buttonStyle"
        @mousedown="handleMouseDown"
        @touchstart="handleTouchStart"
        @click="handleClick"
    >
      <div class="ai-float-button-wrapper" :style="{ width: buttonSize + 'px', height: buttonSize + 'px' }">
        <div class="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 animate-spin-slow opacity-60 blur-md pointer-events-none"></div>

        <div :class="['relative w-full h-full rounded-full shadow-2xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 overflow-hidden',
                     !isAIMode ? 'bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600' : 'bg-gradient-to-br from-rose-400 via-fuchsia-400 to-orange-300']">

          <div v-if="!isAIMode" class="robot-3d" :style="{ transform: `scale(${buttonSize / 80})` }">
            <div class="antenna"><div class="antenna-ball"></div></div>
            <div class="robot-head">
              <div class="eyes">
                <div class="eye left-eye"><div class="pupil"></div></div>
                <div class="eye right-eye"><div class="pupil"></div></div>
              </div>
              <div class="mouth"></div>
            </div>
            <div class="robot-body">
              <div class="chest-light"></div>
              <div class="arm left-arm"></div>
              <div class="arm right-arm"></div>
            </div>
            <div class="legs"><div class="leg left-leg"></div><div class="leg right-leg"></div></div>
          </div>

          <div v-else class="crystal-candy" :style="{ transform: `scale(${buttonSize / 75})` }">
            <div class="stick"></div>
            <div class="candy-sphere">
              <div class="inner-glow"></div>
              <div class="glossy-overlay"></div>
              <div class="spiral-line"></div>
            </div>
            <div class="particles">
              <div class="p1"></div>
              <div class="p2"></div>
              <div class="p3"></div>
            </div>
          </div>

          <div class="button-label-text">{{ !isAIMode ? 'AI模式' : '糖果模式' }}</div>
        </div>

        <div class="absolute inset-0 rounded-full bg-white animate-ping opacity-10 pointer-events-none"></div>
      </div>
    </div>

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
// 这里完全保持你最原始的代码逻辑，不作改动
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
      hasMoved: false,
    };
  },
  computed: {
    isAIMode: {
      get() { return this.$store.state.isAIMode; },
      set(value) { this.$store.commit('setIsAIMode', value); }
    },
    buttonSize() { return window.innerWidth < 768 ? 60 : 70; },
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
          if (this.isPositionValid(savedPos)) this.position = savedPos;
        }
      } catch (e) { console.error('Load position error', e); }
    },
    savePosition() {
      try {
        localStorage.setItem('modeSwitcherPosition', JSON.stringify(this.position));
      } catch (e) { console.error('Save position error', e); }
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
    handleMouseMove(e) { this.drag(e.clientX, e.clientY); },
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
      this.hasMoved = false;
      this.dragStartX = clientX;
      this.dragStartY = clientY;
      this.dragStartPosX = this.position.x;
      this.dragStartPosY = this.position.y;
    },
    drag(clientX, clientY) {
      if (!this.isDragging) return;
      const deltaX = clientX - this.dragStartX;
      const deltaY = clientY - this.dragStartY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance > this.dragThreshold) this.hasMoved = true;
      let newX = this.dragStartPosX + deltaX;
      let newY = this.dragStartPosY + deltaY;
      const maxX = window.innerWidth - this.buttonSize;
      const maxY = window.innerHeight - this.buttonSize;
      this.position.x = Math.max(0, Math.min(newX, maxX));
      this.position.y = Math.max(0, Math.min(newY, maxY));
    },
    endDrag() {
      if (!this.isDragging) return;
      this.isDragging = false;
      if (this.hasMoved) this.savePosition();
    },
    handleResize() {
      const maxX = window.innerWidth - this.buttonSize;
      const maxY = window.innerHeight - this.buttonSize;
      this.position.x = Math.max(0, Math.min(this.position.x, maxX));
      this.position.y = Math.max(0, Math.min(this.position.y, maxY));
    },
    handleClick(e) {
      if (this.hasMoved) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      this.toggleMode();
    },
    toggleMode() {
      const willBeAIMode = !this.isAIMode;
      if (willBeAIMode) {
        const currentCat = this.$store.state.activeCategory;
        if (currentCat && (currentCat.routerName === 'sudden' || currentCat.routerName === 'favorites')) {
          const newsCat = this.$store.state.categroies.find(cat => cat.routerName === 'news');
          if (newsCat) this.$store.commit('setActiveCategory', newsCat);
        }
      }
      this.isAIMode = willBeAIMode;
      this.showModeMessage(willBeAIMode);
      if (window.umami) window.umami.track(willBeAIMode ? '切换到AI模式' : '切换到糖果模式');
    },
    showModeMessage(isAI) {
      this.messageIsAI = isAI;
      // this.messageTitle = isAI ? '🤖 AI智能模式已启动' : '🍭 糖果模式已切换';
      // this.messageDesc = isAI ? '为您提供深度分析和未来趋势预测' : '回到传统热点列表浏览模式';
      // this.showMessage = true;
      // setTimeout(() => { this.showMessage = false; }, 3000);
    }
  }
};
</script>

<style scoped>
.ai-float-button-wrapper {
  position: relative;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.button-label-text {
  font-size: 10px;
  font-weight: 800;
  color: white;
  margin-top: 2px;
  text-shadow: 0 1px 3px rgba(0,0,0,0.4);
  z-index: 10;
}

/* --- 梦幻水晶糖样式 --- */
.crystal-candy {
  position: relative;
  width: 36px;
  height: 42px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stick {
  position: absolute;
  bottom: 0;
  width: 4px;
  height: 20px;
  background: linear-gradient(to right, #f8fafc, #e2e8f0, #f8fafc);
  border-radius: 2px;
  z-index: 1;
}

.candy-sphere {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #ff80b0, #ff2a6d);
  box-shadow:
      0 5px 15px rgba(255, 42, 109, 0.4),
      inset -2px -2px 6px rgba(0, 0, 0, 0.2);
  z-index: 2;
  overflow: hidden;
}

/* 内部流光 */
.inner-glow {
  position: absolute;
  top: -50%; left: -50%; width: 200%; height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%);
  animation: rotateGlow 4s linear infinite;
}

/* 表面炫光层 */
.glossy-overlay {
  position: absolute;
  top: 2px; left: 5px; width: 12px; height: 8px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  transform: rotate(-20deg);
  filter: blur(1px);
}

/* 螺旋动效 */
.spiral-line {
  position: absolute;
  inset: 0;
  background: repeating-conic-gradient(
      from 0deg,
      rgba(255, 255, 255, 0) 0deg 20deg,
      rgba(255, 255, 255, 0.2) 25deg 45deg
  );
  animation: spin-slow 5s linear infinite;
}

/* 环绕粒子 */
.particles div {
  position: absolute;
  width: 4px; height: 4px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 5px #fff;
  z-index: 3;
}
.p1 { top: 0; right: -5px; animation: orbit 2s linear infinite; }
.p2 { bottom: 5px; left: -8px; animation: orbit 2.5s linear infinite reverse; }
.p3 { top: 15px; left: -5px; animation: sparkle 1.5s ease-in-out infinite; }

@keyframes rotateGlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes orbit {
  from { transform: rotate(0deg) translateX(22px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(22px) rotate(-360deg); }
}

@keyframes sparkle {
  0%, 100% { transform: scale(0.5); opacity: 0.3; }
  50% { transform: scale(1.2); opacity: 1; }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* --- 机器人样式 (保持之前的精美度) --- */
.robot-3d { position: relative; width: 30px; height: 32px; animation: robotFloat 2s ease-in-out infinite; }
@keyframes robotFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
.antenna { position: absolute; top: -6px; left: 50%; transform: translateX(-50%); width: 1.5px; height: 4px; background: white; }
.antenna-ball { position: absolute; top: -3px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; background: #ffd700; border-radius: 50%; box-shadow: 0 0 5px #ffd700; }
.robot-head { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 18px; height: 16px; background: #fff; border-radius: 6px 6px 4px 4px; }
.eyes { position: absolute; top: 4px; left: 50%; transform: translateX(-50%); width: 12px; display: flex; justify-content: space-between; }
.eye { width: 4px; height: 4px; background: #4a90e2; border-radius: 50%; }
.robot-body { position: absolute; top: 15px; left: 50%; transform: translateX(-50%); width: 22px; height: 16px; background: #eee; border-radius: 4px; }
.arm { position: absolute; top: 2px; width: 4px; height: 12px; background: #ddd; border-radius: 2px; }
.left-arm { left: -5px; } .right-arm { right: -5px; }

/* 消息提示框视觉 */
.mode-message-container { position: fixed; top: 2rem; left: 50%; transform: translateX(-50%); z-index: 9999; pointer-events: none; }
.mode-message { display: flex; align-items: center; gap: 1rem; padding: 1rem 1.5rem; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border-radius: 1rem; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1); border: 1px solid rgba(255, 255, 255, 0.8); min-width: 320px; }
.message-fade-enter-active { animation: messageFadeIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
.message-fade-leave-active { animation: messageFadeOut 0.3s ease-in; }
@keyframes messageFadeIn { 0% { opacity: 0; transform: translateX(-50%) translateY(-20px); } 100% { opacity: 1; transform: translateX(-50%) translateY(0); } }
@keyframes messageFadeOut { 0% { opacity: 1; transform: translateX(-50%) translateY(0); } 100% { opacity: 0; transform: translateX(-50%) translateY(-10px); } }
</style>