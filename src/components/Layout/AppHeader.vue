<template>
  <header class="sticky top-0 z-50 bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md shadow-sm transition-all duration-300">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <!-- 左侧 Logo -->
      <div class="flex items-center space-x-2">
        <!-- 替换为你的 Logo 路径 -->
        <a href="https://tgmeng.com" target="_blank"><img
            src="@/assets/image/logo.png"
            alt="网站 Logo"
            class="logo"
        >
        </a>
      </div>

      <!-- 右侧主题切换 -->
      <div class="flex items-center">
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<script setup>
import ThemeToggle from '@/components/Theme/ThemeToggle.vue'
</script>

<style scoped>
.logo {
  height: 32px; /* 根据实际需求调整 */
  width: auto;
}

/* 确保深色模式下 Logo 可见（如果是白色 Logo，需调整） */
.dark .logo {
  filter: invert(1) brightness(1.2); /* 白色 Logo 在深色背景下更清晰 */
}
</style>