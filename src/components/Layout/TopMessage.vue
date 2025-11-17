<template>
  <div class="top-0 z-50 bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md transition-all duration-300">
    <div class="py-3 flex flex-col items-center text-lg space-y-1">

      <!-- 第一行可横向滑动 -->
      <div class="overflow-x-auto whitespace-nowrap scrollbar-hide w-full text-center">
        <div class="inline-block font-semibold dark:text-dark-text py-1">
          🎉本项目前后端在GitHub上均已100%开源&nbsp;&nbsp;&nbsp;
          <a data-umami-event="前端" data-umami-event-name="前端" target="_blank"  href="https://github.com/CandyDream6/tgmeng-top-search-frontend" class="cursor-pointer">👉前端</a>&nbsp;&nbsp;&nbsp;
          <a data-umami-event="后端" data-umami-event-name="后端" target="_blank"  href="https://github.com/CandyDream6/tgmeng-api" class="cursor-pointer">👉后端</a>
        </div>
      </div>

      <!-- 第二行可横向滑动 -->
      <div class="overflow-x-auto whitespace-nowrap scrollbar-hide w-full text-center">
        <div class="inline-block font-semibold dark:text-dark-text py-1">
          项目用到的所有接口均是官方接口，无任何第三方中转，主打无情铁手
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.logo {
  height: 3.125rem; /* 根据实际需求调整 */
  width: auto;
}

/* 确保深色模式下 Logo 可见（如果是白色 Logo，需调整） */
.dark .logo {
  filter: invert(1) brightness(1.2); /* 白色 Logo 在深色背景下更清晰 */
}

/* 字体颜色变化 */
.wordColorFuckYou {
  font-weight: 900;
  background: linear-gradient(270deg,
  #ff3c3c, #e3bd00, #ffeb3b, #00e676, #00bcd4, #09efda, #9b56bf);
  background-size: 600% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: flashFlow 2s ease-in-out infinite;
}
@keyframes flashFlow {
  0%   { background-position: 0% 50%; opacity: 1; }
  40%  { background-position: 100% 50%; opacity: 0.85; }
  60%  { background-position: 50% 50%; opacity: 0.5; }
  100% { background-position: 0% 50%; opacity: 1; }
}

</style>