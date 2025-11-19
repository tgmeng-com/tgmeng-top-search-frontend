<!-- PC端，设置菜单 -->
<template>
  <ul class="flex flex-col space-y-2">
    <li v-for="item in menu" :key="item.key">
      <router-link
          :to="item.to"
          class="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ease-in-out font-medium"
          :class="isActive(item.to)
          ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white'  // 激活状态的背景渐变和文字颜色
          : 'text-gray-700 dark:text-gray-300 hover:text-white hover:bg-none'">   <!-- 悬停时文字颜色变，背景不变 -->
        <div :data-umami-event="item.label" :data-umami-event-name="item.label">
          <component :is="item.icon" class="w-5 h-5 fa-l float-left"/>
          <span class="ml-4">{{ item.label }}</span>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "SettingMenu",
  data() {
    return {
      menu: this.$store.state.settingMenu
    };
  },
  methods: {
    isActive(path) {
      return this.$route.path === path;
    },
  },
};
</script>

<style scoped>
/* 激活状态的背景渐变和文字颜色 */
.router-link-active,
.router-link-exact-active {
  background-image: linear-gradient(135deg, #f53d2d, #8338ec, #3a80e9);
  color: white;
  transition: background-image 0.4s ease-in-out, color 0.4s ease-in-out; /* 平滑的背景渐变和文字颜色变化 */
}

/* 悬停时文字颜色变化，背景不变 */
.router-link:hover {
  background-image: none; /* 背景不变化 */
  color: white; /* 悬停时文字颜色变 */
  transition: color 0.4s ease-in-out; /* 文字颜色平滑过渡 */
}
</style>
