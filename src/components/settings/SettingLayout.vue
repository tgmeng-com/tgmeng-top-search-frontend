<!-- 设置布局 -->
<template>
  <div class="min-h-screen">
    <!-- PC端固定左侧 + 内容 -->
    <div class="hidden md:flex">
      <!-- 固定左侧导航栏 -->
      <div class="fixed h-screen w-64 p-4 py-8 overflow-y-auto custom-scrollbar">
        <SettingMenu />
      </div>
      <!-- 右侧内容区域 -->
      <main class="flex-1 ml-64 min-h-screen p-4 custom-scrollbar">
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

<style>
/* 自定义滚动条样式 */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.3);
  border-radius: 10px;
  transition: background 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.6);
}

/* Firefox 滚动条样式 */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
}
</style>
