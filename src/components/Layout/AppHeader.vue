<template>
  <header class=" top-0 z-50 bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md  transition-all duration-300">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center text-lg">
      <div  class="flex-1 text-center font-semibold dark:text-dark-text">
        🎉本项目前后端在GitHub上均已100%开源&nbsp;&nbsp;&nbsp;
        <a data-umami-event="前端" data-umami-event-name="前端" target="_blank" href="https://github.com/CandyDream6/tgmeng-top-search-frontend" style="cursor: pointer;">👉前端</a>&nbsp;&nbsp;&nbsp;
        <a data-umami-event="后端" data-umami-event-name="后端" target="_blank" href="https://github.com/CandyDream6/tgmeng-api" style="cursor: pointer;">👉后端</a><br/>
        项目用到的所有接口均是官方接口，无任何第三方中转，主打无情铁手
<!--        <br/><br/>-->
<!--        <a class="wordColorFuckYou" target="_blank" href="https://bbs.tgmeng.com" style="cursor: pointer;">更多好物请前往论坛或交流群 bbs.tgmeng.com</a> -->

      </div>
    </div>
  </header>
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