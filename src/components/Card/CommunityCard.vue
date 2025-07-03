<template>
  <div class="bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-sm card-hover">
    <!-- 顶部标题栏 -->
    <div class="bg-blue-50 dark:bg-blue-900/20 p-4 flex items-center">
      <img :src="logo" alt="Logo" class="w-8 h-8 rounded-full mr-3">
      <h3 class="font-semibold dark:text-dark-text">{{ title }}</h3>
      <span
          class="ml-auto text-xs px-2 py-1 bg-blue-100/30 dark:bg-blue-300/10 text-blue-600 dark:text-blue-400 rounded-full dark:text-dark-text">
        {{ updateTime }}
      </span>
    </div>

    <!-- 内容区域（限制高度、可滚动） -->
    <div class="p-4 max-h-[480px] overflow-y-auto custom-scroll">
      <!-- ✅ 加载中 -->
      <div v-if="loading" class="flex flex-col items-center justify-center text-gray-400 py-10">
        <div class="breeding-rhombus-spinner">
          <div class="rhombus child-1"></div>
          <div class="rhombus child-2"></div>
          <div class="rhombus child-3"></div>
          <div class="rhombus child-4"></div>
          <div class="rhombus child-5"></div>
          <div class="rhombus child-6"></div>
          <div class="rhombus child-7"></div>
          <div class="rhombus child-8"></div>
          <div class="rhombus big"></div>
        </div>
        <p class="mt-3 text-sm text-gray-500">加载中...</p>
      </div>


      <!-- ✅ 有数据 -->
      <ul v-else-if="list && list.length > 0" class="space-y-3">
        <li
            v-for="(item, index) in list"
            :key="index"
            class="flex items-center justify-between"
        >
          <!-- 序号 -->
          <span
              :class="[
              'w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3',
              index === 0
                ? 'bg-red-600 text-white'
                : index === 1
                ? 'bg-orange-500 text-white'
                : index === 2
                ? 'bg-yellow-700 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
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

      <!-- ✅ 无数据 -->
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
    list: Array,
    loading: {
      type: Boolean,
      default: false,
    },
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

/* 加载动画样式*/
.breeding-rhombus-spinner {
  height: 65px;
  width: 65px;
  position: relative;
  transform: rotate(45deg);
}

.breeding-rhombus-spinner, .breeding-rhombus-spinner * {
  box-sizing: border-box;
}

.breeding-rhombus-spinner .rhombus {
  height: calc(65px / 7.5);
  width: calc(65px / 7.5);
  animation-duration: 2000ms;
  top: calc(65px / 2.3077);
  left: calc(65px / 2.3077);
  background-color: #ff1d5e;
  position: absolute;
  animation-iteration-count: infinite;
}

.breeding-rhombus-spinner .rhombus:nth-child(2n+0) {
  margin-right: 0;
}

.breeding-rhombus-spinner .rhombus.child-1 {
  animation-name: breeding-rhombus-spinner-animation-child-1;
  animation-delay: calc(100ms * 1);
}

.breeding-rhombus-spinner .rhombus.child-2 {
  animation-name: breeding-rhombus-spinner-animation-child-2;
  animation-delay: calc(100ms * 2);
}

.breeding-rhombus-spinner .rhombus.child-3 {
  animation-name: breeding-rhombus-spinner-animation-child-3;
  animation-delay: calc(100ms * 3);
}

.breeding-rhombus-spinner .rhombus.child-4 {
  animation-name: breeding-rhombus-spinner-animation-child-4;
  animation-delay: calc(100ms * 4);
}

.breeding-rhombus-spinner .rhombus.child-5 {
  animation-name: breeding-rhombus-spinner-animation-child-5;
  animation-delay: calc(100ms * 5);
}

.breeding-rhombus-spinner .rhombus.child-6 {
  animation-name: breeding-rhombus-spinner-animation-child-6;
  animation-delay: calc(100ms * 6);
}

.breeding-rhombus-spinner .rhombus.child-7 {
  animation-name: breeding-rhombus-spinner-animation-child-7;
  animation-delay: calc(100ms * 7);
}

.breeding-rhombus-spinner .rhombus.child-8 {
  animation-name: breeding-rhombus-spinner-animation-child-8;
  animation-delay: calc(100ms * 8);
}

.breeding-rhombus-spinner .rhombus.big {
  height: calc(65px / 3);
  width: calc(65px / 3);
  top: calc(65px / 3);
  left: calc(65px / 3);
  background-color: #ff1d5e;
  animation: breeding-rhombus-spinner-animation-child-big 2s infinite;
  animation-delay: 0.5s;
}

@keyframes breeding-rhombus-spinner-animation-child-1 {
  50% {
    transform: translate(-325%, -325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-2 {
  50% {
    transform: translate(0, -325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-3 {
  50% {
    transform: translate(325%, -325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-4 {
  50% {
    transform: translate(325%, 0);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-5 {
  50% {
    transform: translate(325%, 325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-6 {
  50% {
    transform: translate(0, 325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-7 {
  50% {
    transform: translate(-325%, 325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-8 {
  50% {
    transform: translate(-325%, 0);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-big {
  50% {
    transform: scale(0.5);
  }
}



</style>
