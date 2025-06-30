<template>
  <button
      @click="toggleTheme"
      class="p-2 rounded-full hover:bg-light-gray dark:hover:bg-dark-gray transition-colors"
  >
    <i class="fa fa-moon-o dark:hidden text-light-text"></i>
    <i class="fa fa-sun-o hidden dark:inline-block text-dark-text"></i>
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