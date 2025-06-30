<template>
  <div class="min-h-screen flex flex-col">
    <main class="container mx-auto px-4 py-6 flex-grow">
      <!-- 分类导航 - 已居中 -->
      <div class="mb-6 overflow-x-auto scrollbar-hide flex justify-center">
        <div class="flex space-x-2 py-2 min-w-max">
          <button class="px-4 py-2 bg-primary text-white rounded-full">全部</button>
          <button class="px-4 py-2 bg-white dark:bg-dark-card rounded-full shadow-sm hover:shadow-md transition-shadow">
            <span class="dark:text-dark-text">综合</span>
          </button>
          <button class="px-4 py-2 bg-white dark:bg-dark-card rounded-full shadow-sm hover:shadow-md transition-shadow">
            <span class="dark:text-dark-text">科技</span>
          </button>
          <button class="px-4 py-2 bg-white dark:bg-dark-card rounded-full shadow-sm hover:shadow-md transition-shadow">
            <span class="dark:text-dark-text">娱乐</span>
          </button>
          <button class="px-4 py-2 bg-white dark:bg-dark-card rounded-full shadow-sm hover:shadow-md transition-shadow">
            <span class="dark:text-dark-text">体育</span>
          </button>
        </div>
      </div>

      <!-- 热门社区区域 -->
      <section class="mb-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CommunityCard
              title="百度"
              :logo="baiduLogo"
              :updateTime="getUpdateTime()"
              :list="topSearchForBaiDu"
          />

          <CommunityCard
              title="Bilibili"
              :logo="bilibiliLogo"
              :updateTime="getUpdateTime()"
              :list="topSearchForBilibili"
          />

          <CommunityCard
              title="抖音"
              :logo="douyinLogo"
              :updateTime="getUpdateTime()"
              :list="topSearchForDouYin"
          />

          <CommunityCard
              title="微博"
              :logo="weiboLogo"
              :updateTime="getUpdateTime()"
              :list="topSearchForWeiBo"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import CommunityCard from '@/components/Card/CommunityCard.vue';
import {topSearchForBaiDu} from "@/api/api";
import {topSearchForDouYin} from "@/api/api";
import {topSearchForBilibili} from "@/api/api";
import {topSearchForWeiBo} from "@/api/api";
const baiduLogo = require('@/assets/image/baidu.png');
const bilibiliLogo = require('@/assets/image/bilibili.png');
const douyinLogo = require('@/assets/image/douyin.png');
const weiboLogo = require('@/assets/image/weibo.png');
export default {
  components: {
    CommunityCard,
  },
  data() {
    return {
      baiduLogo,
      bilibiliLogo,
      douyinLogo,
      weiboLogo,
      topSearchForBaiDu: '',
      topSearchForDouYin:  '',
      topSearchForBilibili: '',
      topSearchForWeiBo:  '',

    }
  },
  methods: {
    topSearchForBaiDuData(){
      topSearchForBaiDu().then(res => {
        this.topSearchForBaiDu = res.data
      })
    },
    topSearchForDouYinData(){
      topSearchForDouYin().then(res => {
        this.topSearchForDouYin = res.data
      })
    },
    topSearchForBilibiliData(){
      topSearchForBilibili().then(res => {
        this.topSearchForBilibili = res.data
      })
    },
    topSearchForWeiBoData(){
      topSearchForWeiBo().then(res => {
        this.topSearchForWeiBo = res.data
      })
    },
    getUpdateTime(){
      const now = new Date()
      return `更新于 ${now.toLocaleString()}`
    }
  },
  mounted() {
    this.topSearchForWeiBoData()
    this.topSearchForBaiDuData()
    this.topSearchForDouYinData()
    this.topSearchForBilibiliData()
    // 模拟数据加载延迟，演示加载效果
    this.$nextTick(() => {
      // 实际项目中这里可以调用API获取数据
      console.log('页面数据加载完成');
    });
  }
}
</script>