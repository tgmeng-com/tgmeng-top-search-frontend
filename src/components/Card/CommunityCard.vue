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
        <li v-for="(item, index) in list" :key="index" class="flex items-start">
          <span
              :class="[
              'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5',
              index === 0 ? 'bg-blue-500 text-white' :
              index === 1 ? 'bg-blue-400 text-white' :
              index === 2 ? 'bg-blue-300 text-white' :
              'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            ]"
          >
            {{ index + 1 }}
          </span>
          <p class="text-sm dark:text-dark-text">{{ item.title }}</p>
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