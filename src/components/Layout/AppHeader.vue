<template>
  <header class="sticky top-0 z-50 bg-white/80 dark:bg-dark-card/80 backdrop-blur-md shadow-sm">
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