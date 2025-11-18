<!-- 设置布局 -->
<template>
  <div class="min-h-screen ">
    <!-- PC端固定左侧 + 内容 -->
    <div class="hidden md:flex min-h-screen">
      <div class="w-64  p-4">
        <SettingMenu />
      </div>
      <main class="flex-1 p-6">
        <!-- PC端访问 /setting 默认显示关于我们 -->
        <router-view :key="$route.fullPath" />
      </main>
    </div>

    <!-- 移动端全屏显示 -->
    <div class="md:hidden">
      <router-view />
    </div>
  </div>
</template>


<script>
import SettingMenu from "./SettingMenu.vue";

export default {
  name: "SettingLayout",
  components: { SettingMenu },
  data() {
    return {
      isPC: window.innerWidth >= 768, // 初始化时判断是否是PC端
    };
  },
  watch: {
    // 监听路由变化
    '$route'(to) {
      if (this.isPC && (to.path === '/setting' || to.path === '/setting/')) {
        this.$router.replace('/setting/about'); // 路由切换时设置默认路径
      }
    },
  },
  mounted() {
    if (this.isPC && (this.$route.path === '/setting' || this.$route.path === '/setting/')) {
      this.$router.replace('/setting/about'); // 组件首次加载时设置默认路径
    }
  },
};
</script>
