<template>
  <div class="bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-sm card-hover">
    <!-- 顶部标题栏 -->
    <div class="bg-blue-50 dark:bg-blue-900/20 p-4 flex items-center">
      <img :src="logo" alt="Logo" class="w-8 h-8 rounded-full mr-3">
      <h3 class="font-semibold dark:text-dark-text">{{ title }}</h3>
      <span class="ml-auto text-xs px-2 py-1 bg-blue-100/30 dark:bg-blue-300/10 text-blue-600 dark:text-blue-400 rounded-full dark:text-dark-text">
        {{ updateTime }}
      </span>
    </div>

    <!-- 内容区域（限制高度、可滚动） -->
    <div class="p-4 max-h-[480px] overflow-y-auto custom-scroll">
      <ul v-if="list && list.length > 0" class="space-y-3">
        <li
            v-for="(item, index) in list"
            :key="index"
            class="flex items-center justify-between"
        >
          <!-- 序号 -->
          <span
              :class="[
              'w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3',
              index === 0 ? 'bg-red-600 text-white' :
              index === 1 ? 'bg-orange-500 text-white' :
              index === 2 ? 'bg-yellow-700 text-white' :
              'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            ]"
          >
        {{ index + 1 }}
      </span>

          <!-- 标题 -->
          <a
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm dark:text-dark-text hot-title hover:underline"
          >
            {{ item.keyword }}
          </a>

          <!-- 热度值 -->
          <span class="text-sm text-red-600 dark:text-red-300 hot-score">
        🔥{{ item.hotScore }}
      </span>
        </li>
      </ul>

      <!-- 如果没有数据，显示提示信息 -->
      <div v-else class="text-center text-gray-400 dark:text-gray-500 text-sm py-10">
        🚫 暂无数据或接口异常
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    logo: String,
    updateTime: String,
    list: Array
  }
}
</script>

<style scoped>
/* 单行省略处理 */
.hot-title {
  flex: 1;
  text-align: left !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

/* 热度值右对齐 */
.hot-score {
  min-width: 60px;
  text-align: right;
  flex-shrink: 0;
}

/* 滚动条美化 */
.custom-scroll::-webkit-scrollbar {
  width: 6px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(100, 100, 100, 0.2);
  border-radius: 4px;
}
.custom-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(100, 100, 100, 0.2) transparent;
}
</style>
