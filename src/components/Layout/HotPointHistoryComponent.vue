<template>
  <div>
    <teleport to="body">
      <transition name="modal">
        <div v-if="historyDataBoardShow" class="history-backdrop" @click="close">
          <div class="history-panel" @click.stop>
            <div class="bg-gradient"></div>
            <div class="bg-mesh"></div>
            <header class="panel-header">
              <div class="header-content">
                <div class="title-group">
                  <h1>📊 热点历史轨迹</h1>
                  <p>传播趋势分析 · 多平台出现频率统计</p>
                </div>
                <button class="close-btn" @click="close" aria-label="关闭">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 5L5 15M5 5l10 10"/>
                  </svg>
                </button>
              </div>
            </header>
            <main class="panel-body">
              <div class="hot-title-card" style="display: block;">
                <div class="title-info" style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
                  <div style="display: flex; align-items: center; gap: 10px; width: 100%;">
                    <h2 style="display: flex; align-items: center; flex: 1; margin: 0;">
                      🚩
                      <input
                          v-model="searchQuery"
                          @keyup.enter="handleManualSearch"
                          @focus="showHistoryGrid = true"
                          placeholder="输入关键词并按回车..."
                          style="background: transparent; border: none; color: #e6edf3; font-size: 22px; font-weight: 700; outline: none; margin-left: 8px; width: 100%;"
                      />
                    </h2>
                    <button @click="handleManualSearch" class="close-btn-footer"
                            style="background:#409eff; border:none; height:36px; padding:0 20px; font-size: 14px;">分析
                    </button>
                  </div>
                  <div v-if="showHistoryGrid && searchHistory.length > 0"
                       style="display: flex; flex-wrap: wrap; gap: 8px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.05);">
                    <div v-for="(item, index) in searchHistory" :key="index" @click="selectHistory(item)"
                         style="background: rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 6px; font-size: 12px; color: #8892b0; cursor: pointer;">
                      {{ item }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="chart-tabs">
                <div class="tab-buttons">
                  <button v-for="tab in tabConfigs" :key="tab.mode" class="tab-btn"
                          :class="{ active: currentSearchMode === tab.mode }" @click="clickTab(tab.mode)">
                    {{ tab.label }}
                  </button>
                </div>
                <div class="tab-content">
                  <div class="chart-container">
                    <div class="chart-title">{{ isHistoryMode ? '历史出现频率（最近 30 天）' : '小时级热度走势' }}</div>
                    <div class="chart-wrapper">
                      <div class="chart-y-axis">
                        <span v-for="(val, idx) in yAxisLabels" :key="idx">{{ val }}</span>
                      </div>
                      <div class="chart-placeholder" @mousemove="onChartHover($event)" @mouseleave="hideTooltip">
                        <div class="fake-line-chart">
                          <svg viewBox="0 0 800 180" preserveAspectRatio="none">
                            <line x1="0" y1="170" x2="800" y2="170" stroke="#444" stroke-width="1"
                                  stroke-dasharray="4,4"/>
                            <path :d="chartPath" fill="none" stroke="url(#gradient-unified)" stroke-width="2"
                                  stroke-linecap="round" stroke-linejoin="round"/>
                            <circle v-for="(point, i) in chartPoints" :key="'point-'+i"
                                    :cx="point.x" :cy="point.y" r="4"
                                    :fill="dataCounts[i] > 0 ? '#409eff' : '#8892b0'"
                                    :opacity="dataCounts[i] > 0 ? '1' : '0.5'"
                                    stroke="#fff" stroke-width="2"/>
                            <defs>
                              <linearGradient id="gradient-unified" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#409eff"/>
                                <stop offset="100%" stop-color="#67c23a"/>
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <div class="chart-x-labels">
                          <span v-for="label in xAxisLabels" :key="label">{{ label }}</span>
                        </div>
                        <transition name="tooltip-fade">
                          <div v-if="tooltipShow" class="chart-tooltip" :style="tooltipStyle">
                            <div class="tooltip-header">
                              <strong>{{ tooltipTitle }}</strong>
                              <span class="count">{{ tooltipData.length }} 条</span>
                            </div>
                            <div class="tooltip-list" v-if="tooltipData.length > 0">
                              <div v-for="item in tooltipData.slice(0, 5)"
                                   :key="item.dataUpdateTime + item.platformName" class="tooltip-item">
                                <span class="time">{{ item.dataUpdateTime.slice(11, 16) }}</span>
                                <span class="platform">{{ item.platformName }}</span>
                                <span class="title">{{ item.title }}</span>
                              </div>
                              <div v-if="tooltipData.length > 5" class="tooltip-more">+{{ tooltipData.length - 5 }}
                                条更多记录
                              </div>
                            </div>
                            <div v-else class="tooltip-empty">暂无数据</div>
                          </div>
                        </transition>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="history-list">
                <div class="list-summary">
                  <span class="summary-text">共 {{ historyData.length }} 条记录</span>
                </div>
                <div class="list-header">
                  <span>出现时间</span><span>热点标题</span><span>平台名称</span><span>相关度</span>
                </div>
                <div class="list-items">
                  <div v-if="loading" style="display:flex; flex-direction:column; align-items:center; padding:40px;">
                    <div class="atom-spinner">
                      <div class="spinner-inner">
                        <div class="spinner-line"></div>
                        <div class="spinner-line"></div>
                        <div class="spinner-line"></div>
                        <div class="spinner-circle">&#9679;</div>
                      </div>
                    </div>
                    <span style="margin-top:16px; color:#8892b0; font-weight:500;">历史数据追踪中...</span>
                  </div>
                  <div v-else>
                    <a v-for="(item, index) in historyData" :key="index" class="list-item cursor-pointer"
                       :href="item.url" target="_blank">
                      <div class="time">{{ item.dataUpdateTime }}</div>
                      <div class="item-title">{{ item.title }}</div>
                      <div class="platform"><span class="platform-name">{{ item.platformName }}</span></div>
                      <div class="relevance">
                        <span class="relevance-value">{{ 100 - item.distance }}</span>
                        <div class="relevance-bar-wrapper">
                          <div class="relevance-bar" :style="{ width: Math.min(100 - item.distance, 100) + '%' }"></div>
                        </div>
                      </div>
                    </a>
                    <div v-if="historyData.length === 0" style="text-align:center; padding:40px; color:#6b7280;">
                      暂无历史数据
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <footer class="panel-footer">
              <div class="shortcuts"><kbd>ESC</kbd> 关闭窗口 · <kbd>Enter</kbd> 重新分析</div>
              <button class="close-btn-footer" @click="close">关闭追踪</button>
            </footer>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script>
import {cacheSearchForAllByWord} from "@/api/api";
import store from "@/store";
import {getLocalStorage, LOCAL_STORAGE_KEYS, setLocalStorage} from "@/utils/localStorageUtils";

export default {
  name: 'HotPointHistoryComponent',
  data() {
    return {
      searchQuery: '',
      historyData: [],
      currentSearchMode: 'MO_HU_PI_PEI_TODAY',
      loading: false,
      tooltipShow: false,
      tooltipStyle: {},
      tooltipTitle: '',
      tooltipData: [],
      showHistoryGrid: false,
      searchHistory: [],
      tabConfigs: [
        {label: '1小时走势(模糊)', mode: 'MO_HU_PI_PEI_ONE_MINUTES', isHistory: false},
        {label: '今日走势(模糊)', mode: 'MO_HU_PI_PEI_TODAY', isHistory: false},
        {label: '历史走势(模糊)', mode: 'MO_HU_PI_PEI_HISTORY', isHistory: true},
        {label: '今日走势(指纹)', mode: 'ZHI_WEN_PI_PEI_TODAY', isHistory: false},
        {label: '历史走势(指纹)', mode: 'ZHI_WEN_PI_PEI_HISTORY', isHistory: true}
      ]
    };
  },
  computed: {
    historyDataBoardShow() {
      return this.$store.state.historyDataBoardShow;
    },
    isHistoryMode() {
      return this.tabConfigs.find(t => t.mode === this.currentSearchMode)?.isHistory || false;
    },

    historyFixedDates() {
      const dates = [];
      const today = new Date();
      for (let i = 29; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        dates.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
      }
      return dates;
    },
    xAxisLabels() {
      if (this.isHistoryMode) return this.historyFixedDates.map(d => `${parseInt(d.split('-')[1])}/${parseInt(d.split('-')[2])}`);
      return Array.from({length: 13}, (_, i) => `${String(i * 2).padStart(2, '0')}:00`);
    },
    dataCounts() {
      if (this.isHistoryMode) {
        const map = new Map();
        this.historyData.forEach(item => {
          const d = item.dataUpdateTime.slice(0, 10);
          map.set(d, (map.get(d) || 0) + 1);
        });
        return this.historyFixedDates.map(d => map.get(d) || 0);
      } else {
        const counts = Array(24).fill(0);
        if (this.historyData.length === 0) return counts;
        const targetDate = this.historyData[0].dataUpdateTime.slice(0, 10);
        this.historyData.forEach(item => {
          if (item.dataUpdateTime.startsWith(targetDate)) {
            const h = parseInt(item.dataUpdateTime.slice(11, 13));
            if (!isNaN(h)) counts[h]++;
          }
        });
        return counts;
      }
    },
    yAxisLabels() {
      const max = Math.max(...this.dataCounts, 1);
      return [max, Math.floor(max * 0.75), Math.floor(max * 0.5), Math.floor(max * 0.25), 0];
    },
    chartPoints() {
      const counts = this.dataCounts;
      const max = Math.max(...counts, 1);
      const len = counts.length - 1;
      return counts.map((count, i) => ({x: (i / len) * 800, y: 170 - (count / max) * 160}));
    },
    chartPath() {
      const p = this.chartPoints;
      return p.length ? `M${p[0].x},${p[0].y} ` + p.slice(1).map(i => `L${i.x},${i.y}`).join(' ') : '';
    }
  },
  watch: {
    historyDataBoardShow(val) {
      if (val) {
        this.loadLocalHistory();
        const externalTitle = this.$store.state.historyDataBoardUseTitle;
        this.searchQuery = externalTitle || '';
        this.currentSearchMode = externalTitle ? 'ZHI_WEN_PI_PEI_TODAY' : 'MO_HU_PI_PEI_TODAY';
        if (this.searchQuery) this.fetchData();
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKey);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKey);
  },
  methods: {
    clickTab(mode) {
      this.currentSearchMode = mode;
      this.fetchData();
    },
    handleManualSearch() {
      if (!this.searchQuery.trim()) return;
      this.saveLocalHistory(this.searchQuery);
      this.fetchData();
    },
    fetchData() {
      if (!this.searchQuery.trim()) return;
      this.loading = true;
      cacheSearchForAllByWord(this.searchQuery, this.currentSearchMode)
          .then(res => {
            if (res?.data?.code !== 999) this.historyData = res?.data?.data || [];
            else {
              store.commit('setLicenseShow', true);
              this.historyData = [];
            }
          }).finally(() => {
        this.loading = false;
      });
    },
    onChartHover(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const width = rect.width;
      const len = this.dataCounts.length - 1;
      const index = Math.max(0, Math.min(len, Math.round((mouseX / width) * len)));

      if (this.isHistoryMode) {
        const fullDate = this.historyFixedDates[index];
        const [, m, d] = fullDate.split('-');
        this.tooltipTitle = `${parseInt(m)}月${parseInt(d)}日`;
        this.tooltipData = this.historyData.filter(item => item.dataUpdateTime.startsWith(fullDate));
      } else {
        const hourStr = String(index).padStart(2, '0');
        this.tooltipTitle = `${hourStr}:00 - ${String(index + 1).padStart(2, '0')}:00`;
        const todayStr = this.historyData[0]?.dataUpdateTime.slice(0, 10) || '';
        this.tooltipData = this.historyData.filter(item => item.dataUpdateTime.startsWith(todayStr) && parseInt(item.dataUpdateTime.slice(11, 13)) === index);
      }

      // 原始 Tooltip 计算逻辑
      const tooltipWidth = 360;
      let left = mouseX + 15;
      if (left + tooltipWidth > width) left = mouseX - tooltipWidth - 15;
      this.tooltipStyle = {left: Math.max(10, left) + 'px', top: '15px'};
      this.tooltipShow = true;
    },
    hideTooltip() {
      this.tooltipShow = false;
    },
    loadLocalHistory() {
      const h = getLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_HISTORY);
      if (h) this.searchHistory = JSON.parse(JSON.stringify(h));
    },
    saveLocalHistory(k) {
      const h = [k.trim(), ...this.searchHistory.filter(i => i !== k.trim())].slice(0, 15);
      this.searchHistory = h;
      setLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(h));
    },
    selectHistory(k) {
      this.searchQuery = k;
      this.handleManualSearch();
    },
    close() {
      this.$store.commit('setHistoryDataBoardShow', false);
    },
    handleKey(e) {
      if (e.key === 'Escape' && this.historyDataBoardShow) this.close();
    }
  }
};
</script>

<style scoped>
/* 样式部分：100% 完整保留原版样式 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.history-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(25px) saturate(150%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.history-panel {
  position: relative;
  width: 80%;
  max-width: 90%;
  height: 90vh;
  background: linear-gradient(145deg, rgba(30, 33, 42, 0.95), rgba(20, 23, 32, 0.98));
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 30px 100px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1);
  animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.bg-gradient {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 30% 30%, rgba(64, 158, 255, 0.15) 0%, transparent 50%);
  animation: rotate 20s linear infinite;
  pointer-events: none;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.bg-mesh {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 30px 30px;
  pointer-events: none;
}

.panel-header {
  padding: 32px 32px 24px;
  position: relative;
  z-index: 2;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-group h1 {
  font-size: 28px;
  font-weight: 800;
  color: rgb(228, 228, 228);
  margin-bottom: 4px;
}

.title-group p {
  font-size: 14px;
  color: #8892b0;
}

.close-btn {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #ccd6f6;
  cursor: pointer;
  transition: all 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 0 32px 32px;
  position: relative;
  z-index: 2;
}

.hot-title-card {
  background: rgba(40, 44, 56, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 12px;
  margin-bottom: 28px;
}

.chart-tabs {
  margin-bottom: 28px;
}

.tab-buttons {
  display: flex;
  background: rgba(40, 44, 56, 0.4);
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 20px;
  width: fit-content;
}

.tab-btn {
  padding: 8px 20px;
  border-radius: 10px;
  background: transparent;
  color: #8892b0;
  font-size: 14px;
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

.chart-container {
  background: rgba(40, 44, 56, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 20px;
  margin-bottom: 28px;
  position: relative;
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: #e6edf3;
  margin-bottom: 16px;
}

.chart-wrapper {
  display: flex;
  gap: 12px;
  align-items: stretch;
}

.chart-y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 0 30px 0;
  min-width: 35px;
  text-align: right;
  font-size: 11px;
  color: #6b7280;
  font-weight: 500;
}

.chart-placeholder {
  position: relative;
  flex: 1;
  height: 180px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  cursor: crosshair;
}

.fake-line-chart {
  position: absolute;
  inset: 0;
  padding: 16px 16px 30px 16px;
}

.fake-line-chart svg {
  width: 100%;
  height: 100%;
}

.chart-x-labels {
  position: absolute;
  bottom: 5px;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #6b7280;
  pointer-events: none;
}

.chart-tooltip {
  position: absolute;
  background: rgba(20, 23, 32, 0.98);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(64, 158, 255, 0.3);
  border-radius: 12px;
  padding: 12px 14px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
  min-width: 280px;
  max-width: 360px;
  z-index: 1000;
  font-size: 13px;
}

.tooltip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tooltip-header strong {
  font-size: 13px;
  color: #e6edf3;
}

.tooltip-header .count {
  font-size: 11px;
  color: #67c23a;
  background: rgba(103, 194, 58, 0.15);
  padding: 2px 8px;
  border-radius: 10px;
}

.tooltip-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 140px;
  overflow-y: auto;
}

.tooltip-item {
  display: flex;
  gap: 8px;
  font-size: 12px;
}

.tooltip-item .time {
  color: #8892b0;
  min-width: 40px;
}

.tooltip-item .platform {
  color: #409eff;
  min-width: 70px;
}

.tooltip-item .title {
  color: #ccd6f6;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.history-list {
  background: rgba(40, 44, 56, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  overflow: hidden;
}

.list-summary {
  padding: 12px 24px;
  background: rgba(64, 158, 255, 0.08);
  border-bottom: 1px solid rgba(64, 158, 255, 0.2);
  font-size: 14px;
  color: #409eff;
  font-weight: 600;
}

.list-header {
  display: grid;
  grid-template-columns: 170px 1fr 120px 120px;
  padding: 16px 24px;
  font-size: 13px;
  font-weight: 600;
  color: #8892b0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.list-item {
  display: grid;
  grid-template-columns: 170px 1fr 120px 120px;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: background 0.2s;
  align-items: center;
  text-decoration: none;
}

.time {
  background: rgba(64, 158, 255, 0.15);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 14px;
  color: #ccd6f6;
  text-align: center;
}

.platform-name {
  background: rgba(64, 158, 255, 0.15);
  color: #409eff;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 14px;
}

.item-title {
  font-size: 14px;
  color: #e6edf3;
  padding: 0 12px;
}

.relevance {
  display: flex;
  align-items: center;
  gap: 8px;
}

.relevance-value {
  font-size: 13px;
  color: #67c23a;
  font-weight: 600;
}

.relevance-bar-wrapper {
  flex: 1;
  max-width: 60px;
  height: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  overflow: hidden;
}

.relevance-bar {
  height: 100%;
  background: linear-gradient(90deg, #409eff, #67c23a);
}

.panel-footer {
  padding: 20px 32px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.shortcuts kbd {
  background: rgba(255, 255, 255, 0.08);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  color: #6b7280;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.close-btn-footer {
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.08);
  color: #e6edf3;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

/* 原子加载动画样式 */
.atom-spinner {
  height: 50px;
  width: 50px;
}

.atom-spinner .spinner-inner {
  position: relative;
  height: 100%;
  width: 100%;
}

.atom-spinner .spinner-circle {
  position: absolute;
  color: #ff1d5e;
  top: 90%;
  left: 90%;
  transform: translate(-90%, -90%);
}

.atom-spinner .spinner-line {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 90%;
  border-left: 4px solid #ff1d5e;
  border-top: 2px solid transparent;
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

/* 响应式适配代码... */
@media (max-width: 768px) {
  .history-panel {
    width: 95%;
    height: 95vh;
  }

  .list-header {
    display: none;
  }

  .list-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>