<template>
  <footer class="bg-white dark:bg-dark-bg py-8 mt-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <i class="fa fa-newspaper-o text-primary text-xl"></i>
            <h3 class="text-lg font-bold">社区热榜聚合</h3>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            汇聚全网热门内容，实时追踪社区动态
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-500 hover:text-primary transition-colors">
              <i class="fa fa-github text-xl"></i>
            </a>
            <a href="#" class="text-gray-500 hover:text-primary transition-colors">
              <i class="fa fa-twitter text-xl"></i>
            </a>
            <a href="#" class="text-gray-500 hover:text-primary transition-colors">
              <i class="fa fa-weibo text-xl"></i>
            </a>
          </div>
        </div>

        <div>
          <h4 class="font-semibold mb-4">热门平台</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">知乎</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">微博</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">豆瓣</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">GitHub</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-4">关于我们</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">介绍</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">API</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">贡献</a></li>
            <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">联系我们</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-4">订阅更新</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
            获取每日热榜推送
          </p>
          <div class="flex">
            <input
                type="email"
                placeholder="输入邮箱"
                class="flex-grow px-4 py-2 rounded-l-lg bg-gray-100 dark:bg-dark-card border-0 focus:outline-none focus:ring-2 focus:ring-primary"
            >
            <button class="bg-primary text-white px-4 rounded-r-lg hover:bg-primary/90 transition-colors">
              订阅
            </button>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>© 2025 社区热榜聚合. 保留所有权利.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>