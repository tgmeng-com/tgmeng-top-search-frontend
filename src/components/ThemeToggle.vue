<template>
  <button
      @click="toggleTheme"
      class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-bg transition-colors"
  >
    <i class="fa fa-moon-o dark:hidden"></i>
    <i class="fa fa-sun-o hidden dark:inline-block"></i>
  </button>
</template>

<script>
export default {
  methods: {
    toggleTheme() {
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    }
  },
  mounted() {
    // 初始化主题
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  }
}
</script>