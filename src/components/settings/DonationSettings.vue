<!-- 打赏设置 -->
<template>
  <div class="min-h-screen pb-16 bg-transparent">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <header class="relative text-center mb-10">
        <h1 class="main-title">
          🙏 感谢各位对开源项目的支持
        </h1>
        <div class="main-desc">
          <p class="mt-1">
            您的每一份支持，都是这个项目持续发展的动力！
            <a class="inline-flex items-center gap-2 px-4 rounded-lg bg-white/5 border border-white/10 text-gray-900 dark:text-gray-100 hover:bg-white/10 transition"
               href="https://github.com/CandyDream6/tgmeng-top-search-frontend" target="_blank" rel="noopener">
              👉开源仓库
            </a>
          </p>
          <p class="mt-1 text-sm">打赏后如果没有出现在下面列表，请在微信交流群联系一下站长</p>
        </div>
      </header>

      <!-- 收款码区域 -->
      <div class="mb-6">
        <!-- PC端网格 -->
        <div class="hidden sm:grid grid-cols-2 gap-4">
          <div v-for="pay in payQrcodes" :key="pay.id" class="flex flex-col items-center rounded-xl ">
            <img :src="pay.qrcode" :alt="pay.name + '收款码'" class="w-36 h-36 object-cover rounded-md"/>
          </div>
        </div>

        <!-- 移动端横向滚动 -->
        <div class="sm:hidden flex gap-4 overflow-x-auto pb-2">
          <div v-for="pay in payQrcodes" :key="pay.id" class="flex-shrink-0 flex flex-col items-center p-4 rounded-xl  w-44">
            <img :src="pay.qrcode" :alt="pay.name + '收款码'" class="w-36 h-36 object-cover rounded-md"/>
          </div>
        </div>
      </div>
      <h2 class="text-sm font-bold text-gray-900/800 dark:text-gray-100/80 pb-4"></h2>
      <!-- 打赏列表 -->
      <!-- PC端表格 -->
      <div class="hidden sm:block overflow-x-auto rounded-xl shadow card-bg">
        <table class="min-w-full text-left table-auto border-collapse">
          <thead class="text-gray-700 dark:text-gray-200">
          <tr>
            <th class="p-2 w-16 text-center">头像</th>
            <th class="p-2 w-20 text-center">用户名</th>
            <th class="p-2 w-20 text-center">金额</th>
            <th class="p-2 text-center">留言</th>
            <th class="p-2 w-48 text-center">时间</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="donate in donations" :key="donate.id" class="border-b dark:border-gray-700 align-top">
            <td class="p-1 text-center flex justify-center">
              <img :src="donate.avatar" class="w-8 h-8 rounded-full"/>
            </td>
            <td class="p-2 text-center text-gray-600 dark:text-gray-300 break-words">{{ donate.name }}</td>
            <td class="p-2 text-center font-semibold text-green-600">{{ '￥' + donate.amount.toFixed(2) }}</td>
            <td class="p-2 text-gray-600 dark:text-gray-300 break-words">{{ donate.message }}</td>
            <td class="p-2 text-center text-gray-600 dark:text-gray-300 break-words">{{ donate.time }}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- 移动端卡片式打赏列表 -->
      <h2 class="sm:hidden  text-xl font-bold text-gray-900 dark:text-gray-100 pb-4">打赏详情</h2>
      <div class="sm:hidden flex gap-4 overflow-x-auto pb-2">
        <div v-for="donate in donations" :key="donate.id" class="flex-shrink-0 w-64 p-4 rounded-xl bg-gradient-to-r from-indigo-600/10 to-pink-600/10 shadow">
          <div class="flex items-center gap-2 mb-2">
            <img :src="donate.avatar" class="w-10 h-10 rounded-full"/>
            <div class="flex flex-col">
              <span class="font-semibold text-gray-900 dark:text-gray-100">{{ donate.name }}</span>
              <span class="font-semibold text-green-600">{{ '￥' + donate.amount.toFixed(2) }}</span>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-300 break-words mb-2">{{ donate.message }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ donate.time }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DonateList',
  data() {
    return {
      // 打赏数据
      donations: [
        { id: 1, name: '糖果梦', avatar: require('@/assets/avatars/project/tgmeng.png'), amount: 1, message: '项目越来越棒，期待更多精彩功能上线！', time: '2025-11-18 12:38' },
        { id: 2, name: '糖果梦', avatar: require('@/assets/avatars/project/tgmeng.png'), amount: 0.5, message: '感谢开源精神，愿更多人看到这个优秀项目。', time: '2025-11-17 15:22' },
        { id: 3, name: '糖果梦', avatar: require('@/assets/avatars/project/tgmeng.png'), amount: 5, message: '支持热榜站，信息聚合真方便，期待更多优化！', time: '2025-11-16 09:10' },
        { id: 4, name: '糖果梦', avatar: require('@/assets/avatars/project/tgmeng.png'), amount: 25, message: '项目体验很棒，感谢开发者们的辛勤付出！', time: '2025-11-15 20:45' },
        { id: 5, name: '糖果梦', avatar: require('@/assets/avatars/project/tgmeng.png'), amount: 20, message: '功能实用，界面友好，希望未来加入更多数据源！', time: '2025-11-14 21:28' },
        { id: 6, name: '糖果梦', avatar: require('@/assets/avatars/project/tgmeng.png'), amount: 50, message: '感谢团队的努力，项目稳定性和速度都很赞！', time: '2025-11-13 22:43' },
        { id: 7, name: '糖果梦', avatar: require('@/assets/avatars/project/tgmeng.png'), amount: 15, message: '持续关注项目发展，期待更多创新功能上线！', time: '2025-11-12 18:32' },
      ],
      // 收款码数据
      payQrcodes: [
        { id: 1, name: '支付宝', qrcode: require('@/assets/avatars/donation/zhifubao.png') },
        { id: 2, name: '微信', qrcode: require('@/assets/avatars/donation/weixin.png') }
      ]
    }
  }
}
</script>

<style scoped>
.break-words {
  word-break: break-word;
  white-space: normal;
}

table {
  min-width: 100%;
}

.main-title {
  @apply mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-gray-100
}

.main-desc {
  @apply mt-6 max-w-3xl mx-auto text-gray-600 dark:text-gray-300
}

.card-bg {
  @apply p-4 rounded-xl bg-gradient-to-r from-indigo-600/10 to-pink-600/10 border border-transparent dark:border-transparent shadow-sm hover:shadow-lg transition transform hover:-translate-y-1;
}
</style>
