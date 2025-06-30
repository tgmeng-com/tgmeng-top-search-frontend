<template>
  <header class="sticky top-0 z-50 bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md shadow-sm transition-all duration-300">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <i class="fa fa-newspaper-o text-primary text-2xl"></i>
        <h1 class="text-xl font-bold text-light-text dark:text-dark-text">社区热榜聚合</h1>
      </div>

      <div class="flex items-center space-x-4">
        <div class="relative">
          <input
              type="text"
              placeholder="搜索热榜内容..."
              class="pl-10 pr-4 py-2 rounded-full bg-light-gray dark:bg-dark-gray
                  text-light-text dark:text-dark-text
                  focus:outline-none focus:ring-2 focus:ring-primary/50
                  w-48 md:w-64 transition-all duration-300"
          >
          <i class="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-light-gray-text dark:text-dark-gray-text"></i>
        </div>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<script>
import ThemeToggle from '@/components/ThemeToggle.vue'

export default {
  components: {
    ThemeToggle
  }
}
</script>