<template>
  <div v-if="show">
    <!-- 主统计数据 -->
    <div class="mb-1 overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div class="text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
        <span v-for="stat in mainStats"
              :key="stat.key">
          <span
              class="text-xs px-2 py-1 rounded-md text-gray-600 dark:text-gray-300"
              :class="[stat.bgClass, {'stats-updating': isUpdating}]"
          >
            {{ stat.label }}: <span class="font-medium">{{ statsData[stat.key] }}</span>
          </span>&nbsp;
        </span>
      </div>
      <div
          class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 whitespace-nowrap">
        {{ updateInfo }}
      </div>
    </div>

    <!-- 历史订阅推送 -->
    <div class="mb-1 overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div class="text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
        <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              :class="{'stats-updating': isUpdating}">
          历史订阅推送
        </span>&nbsp;
        <span v-for="platform in subscriptionPlatforms"
              :key="platform.key">
          <span
              class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              :class="{'stats-updating': isUpdating}"
          >
          {{ platform.label }}: <span class="font-medium">{{ subscriptionData.all[platform.key] }}</span>
        </span>&nbsp;
        </span>
      </div>
      <div></div>
    </div>

    <!-- 今日订阅推送 -->
    <div class="overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div class="text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
        <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              :class="{'stats-updating': isUpdating}">
          今日订阅推送
        </span>&nbsp;
        <span v-for="platform in subscriptionPlatforms"
              :key="platform.key">
          <span
              class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              :class="{'stats-updating': isUpdating}"
          >
          {{ platform.label }}: <span class="font-medium">{{ subscriptionData.today[platform.key] }}</span>
        </span>&nbsp;
        </span>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import {umamiActive, umamiEventValues, umamiStatsAll, umamiStatsToday} from "@/api/apiForUmami";
import {formatSecondsToHMS, getAllTimeStartTimestamp, getTodayStartTimestamp} from "@/utils/timeUtils";

export default {
  name: 'StatsDisplay',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    updateInfo: {
      type: String,
      default: '数据每分钟更新一次（GitHub20-40分钟，网易云音乐10-15分钟，豆瓣2-10分钟，词云1分钟）'
    }
  },
  data() {
    return {
      isUpdating: false,

      // 统计数据
      statsData: {
        allViews: '🚀',
        allTime: '🚀',
        todayViews: '🚀',
        todayTime: '🚀',
        active: '🚀',
      },

      // 订阅数据
      subscriptionData: {
        all: {
          FEISHU: '🚀',
          DINGDING: '🚀',
          QIYEWEIXIN: '🚀',
          TELEGRAM: '🚀',
          NTFY: '🚀',
          GOTIFY: '🚀',
          WANGYIPOPO: '🚀'
        },
        today: {
          FEISHU: '🚀',
          DINGDING: '🚀',
          QIYEWEIXIN: '🚀',
          TELEGRAM: '🚀',
          NTFY: '🚀',
          GOTIFY: '🚀',
          WANGYIPOPO: '🚀',
        }
      },

      // 主统计数据配置
      mainStats: [
        {
          key: 'allViews',
          label: '总访问量',
          bgClass: 'bg-gray-200 dark:bg-gray-700'
        },
        {
          key: 'allTime',
          label: '总时长',
          bgClass: 'bg-gray-200 dark:bg-gray-700'
        },
        {
          key: 'todayViews',
          label: '今日访问量',
          bgClass: 'bg-gray-200 dark:bg-gray-700'
        },
        {
          key: 'todayTime',
          label: '今日时长',
          bgClass: 'bg-gray-200 dark:bg-gray-700'
        },
        {
          key: 'active',
          label: '在线',
          bgClass: 'bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-300'
        }
      ],

      // 订阅平台配置
      subscriptionPlatforms: [
        {key: 'FEISHU', label: '飞书', event: '订阅推送-飞书'},
        {key: 'DINGDING', label: '钉钉', event: '订阅推送-钉钉'},
        {key: 'QIYEWEIXIN', label: '企业微信', event: '订阅推送-企业微信'},
        {key: 'TELEGRAM', label: 'Telegram', event: '订阅推送-TG'},
        {key: 'NTFY', label: 'NTFY', event: '订阅推送-NTFY'},
        {key: 'GOTIFY', label: 'GOTIFY', event: '订阅推送-GOTIFY'},
        {key: 'WANGYIPOPO', label: '网易泡泡', event: '订阅推送-网易POPO'}
      ]
    };
  },
  mounted() {
    if (this.show) {
      this.loadAllStats();
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.loadAllStats();
      }
    }
  },
  methods: {
    // 加载所有统计数据
    async loadAllStats() {
      this.isUpdating = true;

      try {
        await Promise.all([
          this.loadMainStats(),
          this.loadSubscriptionStats()
        ]);
      } catch (error) {
        console.error('加载统计数据失败:', error);
      } finally {
        this.isUpdating = false;
      }
    },

    // 加载主统计数据
    async loadMainStats() {
      try {
        // 在线人数
        const activeRes = await umamiActive();
        this.statsData.active = activeRes?.data?.visitors || 1;

        // 今日统计
        const todayRes = await umamiStatsToday();
        this.statsData.todayViews = todayRes?.data?.pageviews || '加载失败';
        this.statsData.todayTime = formatSecondsToHMS(todayRes?.data?.totaltime || 0);

        // 历史统计
        const allRes = await umamiStatsAll();
        this.statsData.allViews = allRes?.data?.pageviews || '加载失败';
        this.statsData.allTime = formatSecondsToHMS(allRes?.data?.totaltime || 0);
      } catch (error) {
        console.warn('主统计数据加载失败:', error);
      }
    },

    // 加载订阅统计数据
    async loadSubscriptionStats() {
      try {
        // 历史订阅数据
        await this.loadPlatformsData(
            this.subscriptionPlatforms,
            getAllTimeStartTimestamp(),
            'all'
        );

        // 今日订阅数据
        await this.loadPlatformsData(
            this.subscriptionPlatforms,
            getTodayStartTimestamp(),
            'today'
        );
      } catch (error) {
        console.warn('订阅统计数据加载失败:', error);
      }
    },

    // 加载平台数据
    async loadPlatformsData(platforms, startTimestamp, dataKey) {
      const results = await Promise.all(
          platforms.map(platform =>
              umamiEventValues(platform.event, startTimestamp)
                  .then(res => {
                    const result = res?.data;
                    return {
                      key: platform.key,
                      value: Array.isArray(result)
                          ? result.reduce((acc, item) => acc + (Number(item.value) * item.total), 0)
                          : '加载失败'
                    };
                  })
                  .catch(err => {
                    console.warn(`${platform.label}订阅数统计失败:`, err);
                    return {key: platform.key, value: '加载失败'};
                  })
          )
      );

      results.forEach(({key, value}) => {
        this.subscriptionData[dataKey][key] = value;
      });
    }
  }
};
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.stats-updating {
  animation: pulse 0.5s ease-in-out;
}
</style>