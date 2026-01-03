<!-- HotPointComponentSudden.vue -->
<template>
  <div class="sudden-hotspots-page mt-4 mb-10">
    <div class="page-header mb-4">
      <!-- Tab 切换 -->
      <div class="tab-buttons dark:text-dark-text">
        <button
            class="tab-btn bg-gray-300 dark:bg-dark-card-title"
            :class="{ active: activeTab === 'hour' }"
            @click="clickSwitchTab('hour')"
        >
          1小时
        </button>
        <button
            class="tab-btn bg-gray-300 dark:bg-dark-card-title"
            :class="{ active: activeTab === '3hour' }"
            @click="clickSwitchTab('3hour')"
        >
          3小时
        </button>
        <button
            class="tab-btn bg-gray-300 dark:bg-dark-card-title"
            :class="{ active: activeTab === '6hour' }"
            @click="clickSwitchTab('6hour')"
        >
          6小时
        </button>
        <button
            class="tab-btn bg-gray-300 dark:bg-dark-card-title"
            :class="{ active: activeTab === 'day' }"
            @click="clickSwitchTab('day')"
        >
          1天
        </button>
        <button
            class="tab-btn bg-gray-300 dark:bg-dark-card-title"
            :class="{ active: activeTab === '10day' }"
            @click="clickSwitchTab('10day')"
        >
          10天
        </button>
        <button
            class="tab-btn bg-gray-300 dark:bg-dark-card-title"
            :class="{ active: activeTab === 'month' }"
            @click="clickSwitchTab('month')"
        >
          1月
        </button>
        <button
            class="tab-btn bg-gray-300 dark:bg-dark-card-title"
            :class="{ active: activeTab === 'history' }"
            @click="clickSwitchTab('history')"
        >
          历史
        </button>
      </div>
      <div v-if="suddenDescShow"
          class="mb-1 overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div class="text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
          <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            🤖 实时捕捉多平台同时爆发的相似话题，采用糖果模型进行分析，结果仅供参考（前1-2项部分时间存在指纹干扰，仅供参考）
          </span>&nbsp;
        </div>
        <div>
          <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            🤖 本页面所有数据每5分钟更新一次
          </span>&nbsp;
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-placeholder">
      <div class="atom-spinner">
        <div class="spinner-inner">
          <div class="spinner-line"></div>
          <div class="spinner-line"></div>
          <div class="spinner-line"></div>
          <div class="spinner-circle">&#9679;</div>
        </div>
      </div>
      <span class="mt-4 text-gray-600 dark:text-gray-400 font-medium">突发热点数据追踪中...</span>
    </div>

    <!-- 无数据提示 -->
    <div v-else-if="currentHotspots.length === 0" class="empty-state">
      <div class="empty-icon">📭</div>
      <p class="empty-text">暂无突发热点数据</p>
      <p class="empty-subtext">当前时间段内未检测到多平台同时爆发的话题</p>
    </div>

    <!-- 有数据时显示列表 -->
    <div v-else class="hotspots-list">
      <div
          v-for="(item, index) in currentHotspots"
          :key="item.simhash_group"
          class="bg-gray-200 dark:bg-dark-card rounded-xl overflow-hidden card-hover"
          :class="{ expanded: item.expanded }"
          @click="toggleExpand(index)"
      >
        <!-- 主标题行 -->
        <div :style="cardTopStyle" class="bg-gray-300 dark:bg-dark-card-title p-4 flex items-center drag-handle">
          <span :class="[
              'sequence-number rounded-xl flex items-center justify-center font-bold mr-3',
              index === 0 ? 'bg-red-600 text-white' :
              index === 1 ? 'bg-orange-500 text-white' :
              index === 2 ? 'bg-yellow-700 text-white' :
              'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300']">
              {{ index + 1 }}
            </span>

          <div class="main-content">
            <div class="title-heat-row">
              <div class="title-link font-semibold dark:text-dark-text hot-title ml-2"
                   :class="{'card-title-full':cardTitleFull}">
                {{ item.title }}
              </div>
              <div class="heat-wrapper">
                <span class="heat-value">{{ item.platform_count }} 个平台</span>
                <div class="heat-bar-wrapper">
                  <div class="heat-bar" :style="{ width: heatPercentage(item.platform_count) + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="expand-icon" :class="{ rotated: item.expanded }">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 8l4 4 4-4"/>
            </svg>
          </div>
        </div>

        <!-- 展开详情（丝滑版） -->
        <div class="card-details-wrapper" :class="{ expanded: item.expanded }">
          <div class="card-details">
            <div class="record-list">
              <a
                  v-for="record in item.hotspot_list"
                  :key="record.url"
                  :href="record.url"
                  target="_blank"
                  class="record-item bg-gray-300 dark:bg-dark-card-title"
                  @click.stop
                  :style="[cardTitleStyle]"
              >
                <div class="record-time">
                  <span class="time-badge dark:text-dark-text">{{ formatFullTime(record.dataUpdateTime) }}</span>
                </div>
                <div class="dark:text-dark-text hot-title " :class="{'hot-title-full':cardHotTitleFull}">
                    <span class="mr-2 cursor-pointer" @click.stop.prevent="clickHotPointTrend(item.title)">
                      📈
                    </span>
                  {{ record.title }}
                </div>
                <div class="record-platform">
                  <span class="platform-badge">{{ record.platformName }}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  searchHistorySuddenHeatPointHour,
} from "@/api/api";
import store from "@/store";

export default {
  name: 'HotPointComponentSudden',
  data() {
    return {
      activeTab: 'hour',
      loading: false,
      hotspotData: [],
    }
  },
  computed: {
    suddenDescShow: {
      get() {
        return this.$store.state.suddenDescShow;
      },
      set(value) {
        this.$store.commit('setSuddenDescShow', value);
      }
    },
    currentHotspots() {
      const list = this.hotspotData
      return [...list].sort((a, b) => b.platform_count - a.platform_count)
    },
    maxPlatformCount() {
      return Math.max(...this.currentHotspots.map(i => i.platform_count || 0), 1)
    },

    cardTitleFull: {
      get() {
        return this.$store.state.cardTitleFull;
      },
      set(value) {
        this.$store.commit('setCardTitleFull', value);
      }
    },
    cardTopStyle() {
      return {
        fontSize: this.cardTopFontSize + 'rem',
      }
    },
    cardTopFontSize: {
      get() {
        return this.$store.state.cardTopFontSize;
      },
      set(value) {
        this.$store.commit('setCardTopFontSize', value);
      }
    },
    cardHotTitleFull: {
      get() {
        return this.$store.state.cardHotTitleFull;
      },
      set(value) {
        this.$store.commit('setCardHotTitleFull', value);
      }
    },
    cardTitleStyle() {
      return {
        fontSize: this.cardTitleFontSize + 'rem',
      }
    },
    cardTitleFontSize: {
      get() {
        return this.$store.state.cardTitleFontSize;
      },
      set(value) {
        this.$store.commit('setCardTitleFontSize', value);
      }
    },
  },
  methods: {
    clickHotPointTrend(title) {
      store.commit('setHistoryDataBoardShow', true)
      store.commit('setHistoryDataBoardUseTitle', title)
      window.umami.track('📊热点历史追踪');
    },
    clickSwitchTab(tab) {
      this.activeTab = tab
      this.loading = true

      let requestPromise = searchHistorySuddenHeatPointHour(tab)
      requestPromise
          .then(res => {
            const data = res?.data?.data || false
            if (data && res.data.code !== 999) {
              this.hotspotData = data
            } else {
              if (res.data.code === 999) {
                // this.$message.error(res.data.message);
                store.commit('setLicenseShow', true)
              }
            }
          })
          .finally(() => {
            this.loading = false
          })
    },
    formatFullTime(timeStr) {
      return timeStr ? timeStr.replace(/-/g, '.') : ''
    },
    toggleExpand(index) {
      this.currentHotspots[index].expanded = !this.currentHotspots[index].expanded
    },
    heatPercentage(count) {
      return (count / this.maxPlatformCount) * 100
    },
    rankStyle(rank) {
      const colors = ['#67c23a', '#409eff', '#e6a23c', '#f56c6c']
      const bgColor = colors[(rank - 1) % colors.length] + '33'
      const textColor = colors[(rank - 1) % colors.length]
      return {
        backgroundColor: bgColor,
        color: textColor
      }
    }
  },
  mounted() {
    this.clickSwitchTab('hour')
  }
}
</script>

<style scoped>
.sudden-hotspots-page {
  margin: 0 auto;
  min-height: 30vh;
}

.page-header {
  text-align: center;
}

/* 新增：顶部提示条 - 简洁优雅 */
.header-tip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(64, 158, 255, 0.1);
  border: 1px solid rgba(64, 158, 255, 0.2);
  border-radius: 12px;
  padding: 10px 16px;
  margin-bottom: 24px;
  max-width: 90%;
  font-size: 14px;
  backdrop-filter: blur(8px);
}

.tip-icon {
  color: #409eff;
  flex-shrink: 0;
}

.tip-text {
  line-height: 1.5;
}

/* Tab 按钮保持原有样式 */
.tab-buttons {
  display: flex;
  border-radius: 14px;
  padding: 6px;
  margin: 0 auto 24px;
  width: fit-content;
  gap: 4px;
}

.tab-btn {
  padding: 10px 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.tab-btn.active {
  background: linear-gradient(135deg, #409eff, #3a8fee);
  color: white;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

/* 其余样式完全保持不变（加载、空状态、列表等） */
.loading-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 20px;
  color: #8892b0;
  font-size: 16px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 20px;
  color: #8892b0;
  text-align: center;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.6;
}

.empty-text {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
}

.empty-subtext {
  font-size: 15px;
  opacity: 0.8;
}

.hotspots-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hotspot-card {
  background: rgba(30, 33, 42, 0.95);
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
}

.hotspot-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
}

.card-main {
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(40, 44, 56, 0.4);
}

.rank-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
}

.main-content {
  flex: 1;
}

.title-heat-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.hotspot-title {
  font-size: 22px;
  font-weight: 700;
  text-align: left;
  flex: 1;
  min-width: 0;
}

.title-link {
  text-decoration: none;
  transition: color 0.3s;
}

.heat-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 220px;
}

.heat-value {
  color: #67c23a;
  font-weight: 600;
  white-space: nowrap;
}

.heat-bar-wrapper {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  overflow: hidden;
}

.heat-bar {
  height: 100%;
  background: linear-gradient(90deg, #409eff, #67c23a);
  border-radius: 4px;
  transition: width 0.6s ease;
}

.expand-icon {
  color: #8892b0;
  transition: transform 0.3s ease;
}

.expand-icon.rotated {
  transform: rotate(180deg);
}

.card-details-wrapper {
  overflow: hidden;
  transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 0;
}

.card-details-wrapper.expanded {
  /*max-height: 2000px;*/
  max-height: max-content;
}

.card-details {
  padding: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.card-details-wrapper.expanded .card-details {
  animation: fadeIn 0.45s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.record-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.record-item {
  display: grid;
  grid-template-columns: 160px 1fr 140px;
  gap: 16px;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
  align-items: center;
}

.record-item:hover {
  transform: translateY(-2px);
}

.record-time {
  font-family: monospace;
}

.time-badge {
  background: rgba(64, 158, 255, 0.15);
  padding: 4px 10px;
  border-radius: 8px;
}

.record-title {
  font-size: 15px;
  color: #e6edf3;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.record-platform {
  text-align: right;
}

.platform-badge {
  background: rgba(64, 158, 255, 0.15);
  color: #409eff;
  padding: 4px 10px;
  border-radius: 8px;
}

/* 加载动画保持不变 */
.atom-spinner, .atom-spinner * {
  box-sizing: border-box;
}

.atom-spinner {
  height: 3.125rem;
  width: 3.125rem;
  overflow: hidden;
}

.atom-spinner .spinner-inner {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
}

.atom-spinner .spinner-circle {
  display: block;
  position: absolute;
  color: #ff1d5e;
  font-size: calc(3.75rem * 0.24);
  top: 90%;
  left: 90%;
  transform: translate(-90%, -90%);
}

.atom-spinner .spinner-line {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 90%;
  border-left-width: calc(3.75rem / 5);
  border-top-width: calc(3.75rem / 25);
  border-left-color: #ff1d5e;
  border-left-style: solid;
  border-top-style: solid;
  border-top-color: transparent;
}

.atom-spinner .spinner-line:nth-child(1) {
  animation: atom-spinner-animation-1 1s linear infinite;
  transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg);
}

.atom-spinner .spinner-line:nth-child(2) {
  animation: atom-spinner-animation-2 1s linear infinite;
  transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg);
}

.atom-spinner .spinner-line:nth-child(3) {
  animation: atom-spinner-animation-3 1s linear infinite;
  transform: rotateZ(360deg) rotateX(66deg) rotateZ(0deg);
}

@keyframes atom-spinner-animation-1 {
  100% {
    transform: rotateZ(120deg) rotateX(66deg) rotateZ(360deg);
  }
}

@keyframes atom-spinner-animation-2 {
  100% {
    transform: rotateZ(240deg) rotateX(66deg) rotateZ(360deg);
  }
}

@keyframes atom-spinner-animation-3 {
  100% {
    transform: rotateZ(360deg) rotateX(66deg) rotateZ(360deg);
  }
}

/* 移动端适配（保持原有） */
@media (max-width: 768px) {
  .header-tip {
    font-size: 13px;
    padding: 8px 14px;
    gap: 6px;
  }

  .tip-icon {
    width: 14px;
    height: 14px;
  }

  .tab-btn {
    padding: 10px 14px;
    font-size: 13px;
  }

  .card-main {
    padding: 18px 16px;
    gap: 14px;
  }

  .rank-circle {
    width: 34px;
    height: 34px;
    font-size: 16px;
  }

  .hotspot-title {
    font-size: 18px;
  }

  .heat-value {
  }

  .title-heat-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .heat-wrapper {
    width: 100%;
    min-width: unset;
  }

  .card-details {
    padding: 16px;
  }

  .record-item {
    grid-template-columns: 140px 1fr 110px;
    padding: 12px 14px;
  }

  .time-badge, .platform-badge {
    padding: 4px 8px;
  }

  .record-title {
    font-size: 14px;
  }

  .empty-state {
    padding: 80px 20px;
  }

  .empty-icon {
    font-size: 48px;
  }

  .empty-text {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .header-tip {
    flex-direction: column;
    text-align: center;
    gap: 4px;
    padding: 10px 12px;
  }

  .tab-btn {
    font-size: 12px;
    padding: 8px 10px;
  }

  .hotspot-title {
    font-size: 17px;
  }

  .record-item {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 14px;
  }

  .record-time, .record-platform {
    text-align: left;
  }

  .platform-badge {
    display: inline-block;
  }
}

.hot-title {
  flex: 1;
  text-align: left !important;
  white-space: normal;
  word-break: break-word;
  min-width: 0;
  display: -webkit-box;
  /*标题最多显示行数，0表示不限制*/
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-title-full {
  display: block !important;
  -webkit-line-clamp: unset !important;
  overflow: visible !important;
  -webkit-box-orient: unset !important;
  white-space: normal !important;
}

.sequence-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.4em; /* 使用 em 单位，使其随字体大小自动放大 */
  height: 1.4em;
  border-radius: 50%; /* 保证圆形 */
  font-weight: 600;
  text-align: center;
  line-height: 1; /* 避免字体撑高 */
  flex-shrink: 0;
}
</style>