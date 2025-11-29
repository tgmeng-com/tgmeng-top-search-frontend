<!-- 社区设置 -->
<template>
  <div class="min-h-screen pb-16 bg-transparent">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <header class="relative text-center mb-10">
        <h1 class="main-title">
          加入我们的社区
        </h1>
        <div class="main-desc">
          <p class="mt-1">与核心开发者和热心贡献者共襄技术盛宴，深度探讨项目优化、前沿功能与创新实践</p>
        </div>
      </header>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        <div v-for="contact in contacts" :key="contact.name" class="card-bg flex flex-col items-center p-6 text-center">
          <a :href="contact.link" target="_blank" rel="noopener">
            <div class="mb-3 w-15 h-15 flex items-center justify-center rounded-full ">
              <img :src="contact.icon" :alt="contact.name" class="w-16 h-16 object-contain"/>
            </div>
            <h3 class="card-title">{{ contact.name }}</h3>
            <p class="card-desc break-words">{{ contact.desc }}</p>
            <a v-if="contact.link" :href="contact.link" target="_blank" rel="noopener"
               class="mt-2 inline-block text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
              立即加入
            </a>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommunitySection',
  data() {
    return {
      contacts: [
        {
          name: '微信群',
          desc: '扫描二维码加入官方微信群，与更多用户互动',
          icon: require('@/assets/image/wechat-logo.png'),
          link: 'https://wechat.tgmeng.com/'
        },
        // {
        //   name: '论坛',
        //   desc: '加入官方论坛，和其他用户一起讨论问题、分享心得，获取更多项目资源与支持',
        //   icon: require('@/assets/image/bbs.png'),
        //   link: 'https://bbs.tgmeng.com/'
        // },
        {
          name: 'GitHub',
          desc: '关注我们的 GitHub 仓库，提交 PR 或 Issue',
          icon: require('@/assets/image/github-logo-light.png'),
          link: 'https://github.com/tgmeng-com/tgmeng-top-search-frontend'
        },
      ]
    }
  }
}
</script>

<style scoped>
.main-title {
  @apply mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-gray-100
}

.main-desc {
  @apply mt-6 max-w-3xl mx-auto text-gray-600 dark:text-gray-300
}

.card-bg {
  @apply p-4 rounded-xl bg-gradient-to-r from-indigo-600/10 to-pink-600/10 border border-transparent
  dark:border-transparent shadow-sm hover:shadow-lg transition transform hover:-translate-y-1;
}

.card-title {
  @apply font-semibold text-gray-900 dark:text-gray-100 mt-2;
}

.card-desc {
  @apply text-sm text-gray-500 dark:text-gray-400 mt-1;
}
</style>
