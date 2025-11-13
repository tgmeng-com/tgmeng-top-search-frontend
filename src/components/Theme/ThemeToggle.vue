<template>
  <button
      @click="toggleTheme"
      class="theme-toggle-btn"
      aria-label="切换主题"
      data-umami-event="顶部右边明暗主题切换"
      data-umami-event-name="顶部右边明暗主题切换"
  >
    <svg
        v-if="isDark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        class="icon sun-icon"
    >
      <circle cx="12" cy="12" r="5" fill="#fff" stroke="#fff" stroke-width="1"/>
      <line x1="12" y1="1" x2="12" y2="3" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="21" x2="12" y2="23" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <line x1="1" y1="12" x2="3" y2="12" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <line x1="21" y1="12" x2="23" y2="12" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        class="icon moon-icon"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 默认暗色模式
const isDark = ref(true)

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')

  // 优先使用用户保存的主题
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    // 没有保存时，默认暗色（无需检查系统偏好）
    isDark.value = true
  }

  document.documentElement.classList.toggle('dark', isDark.value)
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
</script>

<style scoped>
/* 保持原有样式不变 */
.theme-toggle-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.2s ease;
}

.icon {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.sun-icon {
  opacity: 0;
  transform: scale(0.8);
}

.moon-icon {
  opacity: 1;
  transform: scale(1);
}

.dark .sun-icon {
  opacity: 1;
  transform: scale(1);
}

.dark .moon-icon {
  opacity: 0;
  transform: scale(0.8);
}

.theme-toggle-btn:hover .icon {
  transform: scale(1.1);
}

.theme-toggle-btn:active .icon {
  transform: scale(0.95);
}
</style>