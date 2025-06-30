<template>
  <div class="bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-sm card-hover">
    <div class="bg-blue-50 dark:bg-blue-900/20 p-4 flex items-center">
      <img :src="logo" alt="Logo" class="w-8 h-8 rounded-full mr-3">
      <h3 class="font-semibold dark:text-dark-text">{{ title }}</h3>
      <span class="ml-auto text-xs px-2 py-1 bg-blue-100 dark:bg-blue-800/50 text-blue-600 dark:text-blue-400 rounded-full dark:text-dark-text">
        {{ updateTime }}
      </span>
    </div>
    <div class="p-4">
      <ul class="space-y-3">
        <li v-for="(item, index) in list" :key="index" class="flex items-center justify-between">
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

          <!-- 标题（强制居左 + 单行省略） -->
          <p class="text-sm dark:text-dark-text hot-title">
            {{ item.keyword }}
          </p>

          <!-- 热点值（居右 + 固定宽度） -->
          <span class="text-sm text-red-600 dark:text-red-300 hot-score">
            {{ item.hotScore }}
          </span>
        </li>
      </ul>
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
/* 列表项布局 - 严格左右对齐 */
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

/* 标题样式 - 强制居左 + 单行省略 */
.hot-title {
  flex: 1;
  text-align: left !important; /* 强制居左 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0; /* 允许标题在空间不足时缩小 */
}

/* 热点值样式 - 居右 + 固定宽度 */
.hot-score {
  min-width: 60px; /* 根据实际需求调整宽度 */
  text-align: right;
  flex-shrink: 0; /* 防止热点值被压缩 */
}
</style>