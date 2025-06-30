<template>
  <header class="sticky top-0 z-50 bg-light-bg/80 dark:bg-dark-card/80 backdrop-blur-md shadow-sm">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <i class="fa fa-newspaper-o text-primary text-2xl"></i>
        <h1 class="text-xl font-bold">社区热榜聚合</h1>
      </div>

      <div class="flex items-center space-x-4">
        <div class="relative">
          <input
              type="text"
              placeholder="搜索热榜内容..."
              class="pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-primary/50 w-48 md:w-64 transition-all duration-300"
          >
          <i class="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
        <ThemeToggle />
      </div>
      <!-- 深色模式切换按钮 -->
      <button
          class="px-3 py-2 bg-light-bg dark:bg-gray-700 text-gray-900 dark:text-white rounded"
          @click="toggleDarkMode"
      >
        {{ isDark ? '深色模式' : '浅色模式' }}
      </button>
    </div>
  </header>
</template>

<script>
import ThemeToggle from '@/components/ThemeToggle.vue'
import {ref} from 'vue';

export default {
  components: {
    ThemeToggle
  },
  setup() {
    // 定义响应式变量
    const isDark = ref(true);

    // 定义切换函数
    const toggleDarkMode = () => {
      isDark.value = !isDark.value;
      document.documentElement.classList.toggle('dark', isDark.value);
    };

    // 返回给模板使用
    return {
      isDark,
      toggleDarkMode
    }
  }
}
</script>