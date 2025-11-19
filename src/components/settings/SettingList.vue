<!-- 移动端 设置菜单页面 -->
<template>
  <div class="p-4">
    <ul class="divide-y divide-gray-200 dark:divide-gray-700 title">
      <li v-for="item in menu" :key="item.key">
        <router-link
            :to="item.to"
            class="flex items-center gap-2 py-4 px-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            @click="trackUmami(item.label)"
        >
          <component :is="item.icon" class="w-6 h-6"/>
          <span class="text-lg">{{ item.label }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "SettingList",
  data() {
    return {
      menu: this.$store.state.settingMenu
    };
  },
  methods: {
    trackUmami(eventName) {
      window.umami.track(eventName);
    }
  },
};
</script>

<style>
.title {
  @apply font-semibold text-gray-900 dark:text-gray-100
}
</style>
