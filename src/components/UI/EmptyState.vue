<template>
  <div class="empty-state-container">
    <div class="empty-state-content">
      <!-- 糖果去月球图标 -->
      <div class="empty-icon-wrapper">
        <svg class="candy-moon-svg" viewBox="0 0 320 320" fill="none">
          <!-- 背景星空效果 -->
          <defs>
            <!-- 月球渐变 -->
            <radialGradient id="moonGradient" cx="35%" cy="35%">
              <stop offset="0%" style="stop-color:#FFF9E3;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#FFE9A0;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#FFD54F;stop-opacity:0.95" />
            </radialGradient>

            <!-- 月球光晕 -->
            <radialGradient id="moonGlow">
              <stop offset="0%" style="stop-color:#FFF9E3;stop-opacity:0.4" />
              <stop offset="100%" style="stop-color:#FFD54F;stop-opacity:0" />
            </radialGradient>

            <!-- 坑洞阴影 -->
            <radialGradient id="craterShadow">
              <stop offset="0%" style="stop-color:#E0B862;stop-opacity:0.6" />
              <stop offset="100%" style="stop-color:#D4A644;stop-opacity:0.9" />
            </radialGradient>

            <!-- 糖果渐变 -->
            <radialGradient id="candyGradient" cx="40%" cy="40%">
              <stop offset="0%" style="stop-color:#FFB3D9;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#FF6B9D;stop-opacity:1" />
            </radialGradient>
          </defs>

          <!-- 星星装饰 - 增加动画效果 -->
          <g class="stars">
            <!-- 大星星 - 有光芒 -->
            <g class="star-with-sparkle">
              <circle cx="50" cy="50" r="2.5" fill="#FFF9E3">
                <animate attributeName="r" values="2.5;3;2.5" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
              </circle>
              <line x1="50" y1="44" x2="50" y2="56" stroke="#FFF9E3" stroke-width="1" opacity="0.6">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
              </line>
              <line x1="44" y1="50" x2="56" y2="50" stroke="#FFF9E3" stroke-width="1" opacity="0.6">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
              </line>
            </g>

            <g class="star-with-sparkle">
              <circle cx="280" cy="70" r="3" fill="#FFE9A0">
                <animate attributeName="r" values="3;3.5;3" dur="2.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite"/>
              </circle>
              <line x1="280" y1="62" x2="280" y2="78" stroke="#FFE9A0" stroke-width="1.2" opacity="0.7">
                <animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.5s" repeatCount="indefinite"/>
              </line>
              <line x1="272" y1="70" x2="288" y2="70" stroke="#FFE9A0" stroke-width="1.2" opacity="0.7">
                <animate attributeName="opacity" values="0.2;0.9;0.2" dur="2.5s" repeatCount="indefinite"/>
              </line>
            </g>

            <!-- 中等星星 -->
            <circle cx="40" cy="120" r="2.2" fill="#FFD54F">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2.8s" repeatCount="indefinite"/>
              <animate attributeName="r" values="2.2;2.6;2.2" dur="2.8s" repeatCount="indefinite"/>
            </circle>
            <circle cx="290" cy="140" r="2" fill="#FFF9E3">
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="60" cy="180" r="2.5" fill="#FFE9A0">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2.3s" repeatCount="indefinite"/>
            </circle>

            <!-- 小星星 -->
            <circle cx="90" cy="60" r="1.5" fill="#FFF9E3">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3.2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="270" cy="110" r="1.8" fill="#FFD54F">
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.6s" repeatCount="indefinite"/>
            </circle>
            <circle cx="110" cy="140" r="1.3" fill="#FFE9A0">
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="250" cy="200" r="1.6" fill="#FFF9E3">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.9s" repeatCount="indefinite"/>
            </circle>
            <circle cx="70" cy="240" r="1.4" fill="#FFD54F">
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3.3s" repeatCount="indefinite"/>
            </circle>

            <!-- 微小星星点缀 -->
            <circle cx="150" cy="80" r="1" fill="#FFF9E3" opacity="0.5">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.8s" repeatCount="indefinite"/>
            </circle>
            <circle cx="200" cy="190" r="1.2" fill="#FFE9A0" opacity="0.6">
              <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.4s" repeatCount="indefinite"/>
            </circle>
          </g>

          <!-- 月球光晕 -->
          <circle cx="235" cy="100" r="65" fill="url(#moonGlow)" opacity="0.6">
            <animate attributeName="r" values="65;70;65" dur="4s" repeatCount="indefinite"/>
          </circle>

          <!-- 月球本体 -->
          <g class="moon">
            <circle cx="235" cy="100" r="48" fill="url(#moonGradient)"/>

            <!-- 环形山 -->
            <circle cx="218" cy="82" r="10" fill="url(#craterShadow)"/>
            <circle cx="220" cy="83" r="5" fill="#D4A644" opacity="0.4"/>

            <circle cx="252" cy="90" r="8" fill="url(#craterShadow)"/>
            <circle cx="254" cy="91" r="3.5" fill="#D4A644" opacity="0.4"/>

            <circle cx="237" cy="122" r="9" fill="url(#craterShadow)"/>
            <circle cx="239" cy="124" r="4" fill="#D4A644" opacity="0.4"/>

            <circle cx="211" cy="110" r="7" fill="url(#craterShadow)"/>
            <circle cx="213" cy="111" r="3" fill="#D4A644" opacity="0.3"/>

            <circle cx="260" cy="108" r="6" fill="url(#craterShadow)"/>
            <circle cx="261" cy="109" r="2.5" fill="#D4A644" opacity="0.3"/>

            <!-- 小坑洞 -->
            <circle cx="205" cy="95" r="4" fill="#E0B862" opacity="0.4"/>
            <circle cx="248" cy="75" r="3.5" fill="#E0B862" opacity="0.35"/>
            <circle cx="268" cy="98" r="4" fill="#E0B862" opacity="0.4"/>
            <circle cx="224" cy="128" r="3.5" fill="#E0B862" opacity="0.35"/>

            <!-- 月球微笑表情 -->
            <g class="moon-face" opacity="0.15">
              <ellipse cx="225" cy="95" rx="3" ry="4" fill="#D4A644"/>
              <ellipse cx="245" cy="95" rx="3" ry="4" fill="#D4A644"/>
              <path d="M 220 108 Q 235 115 250 108" stroke="#D4A644" stroke-width="2" fill="none" stroke-linecap="round"/>
            </g>
          </g>

          <!-- 飞行的糖果 - 加强动画 -->
          <g class="candy">
            <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 8,-6; 0,0"
                dur="2.5s"
                repeatCount="indefinite"
            />
            <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 170 210; -5 170 210; 5 170 210; 0 170 210"
                dur="2.5s"
                repeatCount="indefinite"
                additive="sum"
            />

            <g transform="translate(120, 180)">
              <!-- 棒子 - 添加高光 -->
              <rect x="48" y="45" width="4" height="65" rx="2" fill="#E8B4B8"/>
              <rect x="49" y="45" width="1.5" height="65" rx="1" fill="#FFF0F3" opacity="0.6"/>

              <!-- 糖果球 -->
              <circle cx="50" cy="32" r="30" fill="url(#candyGradient)"/>

              <!-- 螺旋条纹 - 更明显 -->
              <path d="M 50 2 Q 68 12, 72 32 Q 68 52, 50 62"
                    stroke="#FFE5EC"
                    stroke-width="6"
                    fill="none"
                    opacity="0.9"
                    stroke-linecap="round"/>
              <path d="M 50 2 Q 32 12, 28 32 Q 32 52, 50 62"
                    stroke="#FFE5EC"
                    stroke-width="6"
                    fill="none"
                    opacity="0.9"
                    stroke-linecap="round"/>

              <!-- 额外螺旋 -->
              <path d="M 50 8 Q 62 18, 65 32 Q 62 46, 50 56"
                    stroke="#FFFFFF"
                    stroke-width="3"
                    fill="none"
                    opacity="0.5"
                    stroke-linecap="round"/>

              <!-- 高光 -->
              <circle cx="38" cy="20" r="7" fill="white" opacity="0.7"/>
              <circle cx="60" cy="26" r="5" fill="white" opacity="0.5"/>
              <circle cx="45" cy="38" r="3" fill="white" opacity="0.4"/>
            </g>
          </g>

          <!-- 飞行轨迹 - 更可爱 -->
          <path d="M 170 210 Q 185 160, 210 125"
                stroke="#E0B3FF"
                stroke-width="3"
                stroke-dasharray="10 8"
                fill="none"
                opacity="0.5">
            <animate attributeName="stroke-dashoffset"
                     from="0"
                     to="36"
                     dur="1.2s"
                     repeatCount="indefinite"/>
          </path>

          <!-- 飞行轨迹上的小爱心 -->
          <g opacity="0.6">
            <path d="M 175 200 Q 175 196, 177 196 Q 179 196, 179 200 Q 179 203, 175 206 Q 171 203, 171 200 Q 171 196, 173 196 Q 175 196, 175 200"
                  fill="#FFB3D9">
              <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/>
            </path>
            <path d="M 195 170 Q 195 167, 197 167 Q 199 167, 199 170 Q 199 172, 195 175 Q 191 172, 191 170 Q 191 167, 193 167 Q 195 167, 195 170"
                  fill="#C084FC">
              <animate attributeName="opacity" values="0;1;0" dur="3s" begin="1s" repeatCount="indefinite"/>
            </path>
          </g>

          <!-- 装饰小糖果 - 更可爱 -->
          <g class="candy-small" opacity="0.7">
            <ellipse cx="100" cy="135" rx="9" ry="14" fill="#FF6B9D" transform="rotate(-30 100 135)"/>
            <ellipse cx="105" cy="135" rx="9" ry="14" fill="#FFE5EC" transform="rotate(-30 105 135)"/>
            <!-- 小高光 -->
            <circle cx="98" cy="130" r="2.5" fill="white" opacity="0.6" transform="rotate(-30 98 130)"/>
          </g>

          <g class="candy-small" opacity="0.6">
            <ellipse cx="185" cy="220" rx="7" ry="11" fill="#A78BFA" transform="rotate(20 185 220)"/>
            <ellipse cx="189" cy="220" rx="7" ry="11" fill="#DDD6FE" transform="rotate(20 189 220)"/>
            <circle cx="183" cy="216" r="2" fill="white" opacity="0.5" transform="rotate(20 183 216)"/>
          </g>

          <!-- 新增：漂浮的小星星装饰 -->
          <g class="floating-decoration">
            <path d="M 65 200 L 68 206 L 74 208 L 68 210 L 65 216 L 62 210 L 56 208 L 62 206 Z"
                  fill="#FFE9A0" opacity="0.5">
              <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 3,-3; 0,0"
                  dur="3s"
                  repeatCount="indefinite"
              />
            </path>

            <path d="M 260 165 L 262 169 L 266 171 L 262 173 L 260 177 L 258 173 L 254 171 L 258 169 Z"
                  fill="#FFC857" opacity="0.6">
              <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; -2,2; 0,0"
                  dur="3.5s"
                  repeatCount="indefinite"
              />
            </path>
          </g>
        </svg>
      </div>

      <!-- 文字内容 -->
      <div class="empty-text-content">
        <h3 class="empty-title">
          <span class="title-word" style="animation-delay: 0s">数</span>
          <span class="title-word" style="animation-delay: 0.1s">据</span>
          <span class="title-word" style="animation-delay: 0.2s">跑</span>
          <span class="title-word" style="animation-delay: 0.3s">到</span>
          <span class="title-word" style="animation-delay: 0.4s">月</span>
          <span class="title-word" style="animation-delay: 0.5s">球</span>
          <span class="title-word" style="animation-delay: 0.6s">吃</span>
          <span class="title-word" style="animation-delay: 0.7s">糖</span>
          <span class="title-word" style="animation-delay: 0.8s">果</span>
          <span class="title-word" style="animation-delay: 0.9s">去</span>
          <span class="title-word" style="animation-delay: 1s">了</span>
          <span class="emoji-bounce" style="animation-delay: 1.1s">🍭</span>
        </h3>

        <p class="empty-description">
          {{ description || '它们可能在月球上迷路了，稍后再来看看吧' }}
          <span class="emoji-rotate">🌙</span>
        </p>
      </div>

      <!-- 操作按钮 -->
      <div v-if="showAction" class="empty-actions">
        <a
            href="https://wechat.tgmeng.com"
            target="_blank"
            rel="noopener noreferrer"
            class="empty-action-button"
        >
          <span class="button-icon">🚀</span>
          <span>{{ actionText || '去月球找找它们' }}</span>
          <span class="button-sparkle">✨</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    description: {
      type: String,
      default: ''
    },
    showAction: {
      type: Boolean,
      default: false
    },
    actionText: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
.empty-state-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 3rem 1rem;
}

.empty-state-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 520px;
  width: 100%;
}

/* 图标区域 */
.empty-icon-wrapper {
  margin-bottom: 2rem;
  position: relative;
}

.candy-moon-svg {
  width: 300px;
  height: 300px;
  animation: floatIcon 5s ease-in-out infinite;
  filter: drop-shadow(0 10px 30px rgba(255, 215, 79, 0.2));
}

@keyframes floatIcon {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-12px) rotate(1deg);
  }
  50% {
    transform: translateY(-20px) rotate(0deg);
  }
  75% {
    transform: translateY(-12px) rotate(-1deg);
  }
}

/* 月球旋转 */
.moon {
  animation: moonRotate 30s linear infinite;
  transform-origin: 235px 100px;
}

@keyframes moonRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 文字内容 */
.empty-text-content {
  margin-bottom: 2rem;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  line-height: 1.6;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.15rem;
}

.title-word {
  display: inline-block;
  background: linear-gradient(135deg, #FF6B9D 0%, #C084FC 40%, #FFC857 80%, #FFD54F 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: wordBounce 3s ease-in-out infinite;
  text-shadow: 0 2px 10px rgba(255, 107, 157, 0.3);
}

@keyframes wordBounce {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-5px) scale(1.05);
  }
}

.emoji-bounce {
  display: inline-block;
  animation: emojiBounce 2s ease-in-out infinite;
  font-size: 1.4em;
}

@keyframes emojiBounce {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-8px) rotate(-10deg);
  }
  50% {
    transform: translateY(0) rotate(0deg);
  }
  75% {
    transform: translateY(-8px) rotate(10deg);
  }
}

.empty-description {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.8;
  font-weight: 500;
}

.dark .empty-description {
  color: #9ca3af;
}

.emoji-rotate {
  display: inline-block;
  animation: emojiRotate 4s ease-in-out infinite;
  margin-left: 0.25rem;
}

@keyframes emojiRotate {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-15deg) scale(1.1);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(15deg) scale(1.1);
  }
}

/* 操作按钮 */
.empty-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.empty-action-button {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, #FF6B9D 0%, #C084FC 50%, #FFC857 100%);
  color: white;
  border: none;
  border-radius: 3rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4),
  0 2px 8px rgba(192, 132, 252, 0.3);
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.empty-action-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s;
}

.empty-action-button:hover::before {
  left: 100%;
}

.empty-action-button:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 30px rgba(255, 107, 157, 0.5),
  0 4px 12px rgba(192, 132, 252, 0.4);
}

.empty-action-button:active {
  transform: translateY(-1px) scale(1.02);
}

.button-icon {
  display: inline-block;
  animation: rocketFly 2s ease-in-out infinite;
  font-size: 1.2em;
}

@keyframes rocketFly {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-3px) rotate(-5deg);
  }
}

.button-sparkle {
  display: inline-block;
  animation: sparkle 1.5s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1.3) rotate(180deg);
    opacity: 0.7;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .empty-state-container {
    min-height: 350px;
    padding: 2rem 1rem;
  }

  .candy-moon-svg {
    width: 240px;
    height: 240px;
  }

  .empty-title {
    font-size: 1.25rem;
  }

  .empty-description {
    font-size: 0.9375rem;
  }

  .empty-action-button {
    padding: 0.75rem 1.75rem;
    font-size: 0.9375rem;
  }
}
</style>