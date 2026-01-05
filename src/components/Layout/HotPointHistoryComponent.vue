<template>
  <div>
    <teleport to="body">
      <transition name="modal">
        <div v-if="historyDataBoardShow" class="history-backdrop" @click="loading ? null : close">
          <div class="history-panel" @click.stop>
            <div class="bg-gradient"></div>
            <div class="bg-mesh"></div>
            <header class="panel-header">
              <div class="header-content">
                <div class="title-group">
                  <h1>📊 热点历史轨迹</h1>
                  <p>传播趋势分析 · 多平台出现频率统计</p>
                </div>
                <button class="close-btn" @click="close" aria-label="关闭" :disabled="loading">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 5L5 15M5 5l10 10"/>
                  </svg>
                </button>
              </div>
            </header>
            <main class="panel-body">
              <div class="hot-title-card">
                <div class="title-info">
                  <div class="search-row">
                    <h2>
                      🚩
                      <input
                          v-model="searchQuery"
                          @keyup.enter="handleManualSearch"
                          @focus="showHistoryGrid = true"
                          :disabled="loading"
                          placeholder="输入关键词并按回车..."
                          class="search-input"
                      />
                    </h2>
                    <button
                        @click="handleManualSearch"
                        class="search-btn"
                        :disabled="loading"
                    >
                      {{ loading ? '分析中...' : '分析' }}
                    </button>
                  </div>
                  <div v-if="showHistoryGrid && searchQuery.length === 0 && searchHistory.length > 0"
                       class="history-grid">
                    <div v-for="(item, index) in searchHistory" :key="index" @click="selectHistory(item)">
                      {{ item }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="chart-tabs">
                <div class="tab-buttons">
                  <button
                      v-for="tab in tabConfigs"
                      :key="tab.mode"
                      class="tab-btn"
                      :class="{ active: currentSearchMode === tab.mode }"
                      @click="loading ? null : clickTab(tab.mode)"
                  >
                    {{ tab.label }}
                  </button>
                </div>
                <div class="tab-content">
                  <div class="chart-container">
                    <div class="chart-title">{{
                        isHistoryMode ? '历史出现频率（折线图只展示最近30天）' : (currentSearchMode === 'MO_HU_PI_PEI_ONE_MINUTES' ? '分钟级热度走势（60秒）' : '小时级热度走势')
                      }}
                    </div>
                    <div class="chart-wrapper">
                      <div class="chart-y-axis">
                        <span v-for="(val, idx) in yAxisLabels" :key="idx">{{ val }}</span>
                      </div>
                      <div class="chart-placeholder" @mousemove="onChartHover($event)" @mouseleave="hideTooltip">
                        <div v-if="loading" class="chart-loading">
                          <div class="atom-spinner">
                            <div class="spinner-inner">
                              <div class="spinner-line"></div>
                              <div class="spinner-line"></div>
                              <div class="spinner-line"></div>
                              <div class="spinner-circle">&#9679;</div>
                            </div>
                          </div>
                          <span>历史数据追踪中...</span>
                        </div>
                        <div class="fake-line-chart" :style="{ opacity: loading ? 0.1 : 1 }">
                          <svg viewBox="0 0 800 160" preserveAspectRatio="none">
                            <line x1="0" y1="150" x2="800" y2="150" stroke="#444" stroke-width="1"
                                  stroke-dasharray="4,4"/>
                            <path :d="chartPath" fill="none" stroke="url(#gradient-unified)" stroke-width="2"
                                  stroke-linecap="round" stroke-linejoin="round"/>
                            <circle
                                v-for="(point, i) in chartPoints"
                                :key="'point-'+i"
                                :cx="point.x"
                                :cy="point.y"
                                r="3"
                                :fill="dataCounts[i] > 0 ? '#409eff' : '#4a5568'"
                                :opacity="dataCounts[i] > 0 ? '1' : '0.4'"
                                stroke="#fff"
                                stroke-width="1.5"
                                vector-effect="non-scaling-stroke"
                            />
                            <defs>
                              <linearGradient id="gradient-unified" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#409eff"/>
                                <stop offset="100%" stop-color="#79d8a0"/>
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <div class="chart-x-labels">
                          <span v-for="label in displayedXAxisLabels" :key="label">{{ label }}</span>
                        </div>
                        <transition name="tooltip-fade">
                          <div v-if="tooltipShow && !loading" class="chart-tooltip" :style="tooltipStyle">
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
                <div class="list-header" :class="isMoHu ? 'four-columns' : 'five-columns'">
                  <span class="sortable-header" @click="handleSort('dataUpdateTime')">
                    出现时间
                    <span v-if="sortKey === 'dataUpdateTime'" class="sort-arrow">{{
                        sortDir === 'asc' ? '↑' : '↓'
                      }}</span>
                  </span>
                  <span class="sortable-header" @click="handleSort('title')">
                    热点标题
                    <span v-if="sortKey === 'title'" class="sort-arrow">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
                  </span>
                  <span class="sortable-header" @click="handleSort('platformCategoryRoot')">
                    分类
                    <span v-if="sortKey === 'platformCategoryRoot'" class="sort-arrow">{{
                        sortDir === 'asc' ? '↑' : '↓'
                      }}</span>
                  </span>
                  <span class="sortable-header" @click="handleSort('platformName')">
                    平台名称
                    <span v-if="sortKey === 'platformName'" class="sort-arrow">{{
                        sortDir === 'asc' ? '↑' : '↓'
                      }}</span>
                  </span>
                  <span v-if="!isMoHu" class="sortable-header" @click="handleSort('distance')">
                    相关度
                    <span v-if="sortKey === 'distance'" class="sort-arrow">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
                  </span>
                </div>
                <div class="list-items">
                  <div v-if="loading" class="list-loading">
                    <div class="atom-spinner">
                      <div class="spinner-inner">
                        <div class="spinner-line"></div>
                        <div class="spinner-line"></div>
                        <div class="spinner-line"></div>
                        <div class="spinner-circle">&#9679;</div>
                      </div>
                    </div>
                    <span>历史数据追踪中...</span>
                  </div>
                  <div v-else>
                    <!-- PC 端网格布局 -->
                    <template v-if="windowWidth > 768">
                      <a v-for="(item) in sortedHistoryData"
                         :key="item.dataUpdateTime + item.title + item.platformName"
                         class="list-item pc-item"
                         :class="isMoHu ? 'four-columns' : 'five-columns'"
                         :href="item.url" target="_blank">
                        <div class="time">{{ item.dataUpdateTime }}</div>
                        <div class="item-title">{{ item.title }}</div>
                        <div class="platform">
                          <span class="platform-category">{{ item.platformCategoryRoot || '未知' }}</span>
                        </div>
                        <div class="platform">
                          <span class="platform-name">{{ item.platformName }}</span>
                        </div>
                        <div class="relevance" v-if="!isMoHu">
                          <span class="relevance-value">{{ 100 - item.distance }}</span>
                          <div class="relevance-bar-wrapper">
                            <div class="relevance-bar"
                                 :style="{ width: Math.min(100 - item.distance, 100) + '%' }"></div>
                          </div>
                        </div>
                      </a>
                    </template>

                    <!-- 移动端卡片布局 -->
                    <template v-else>
                      <a v-for="(item) in sortedHistoryData"
                         :key="item.dataUpdateTime + item.title + item.platformName"
                         class="list-item mobile-item"
                         :href="item.url" target="_blank">
                        <div class="item-title">{{ item.title }}</div>
                        <div class="platform-info-row">
                          <span class="platform-category">{{ item.platformCategoryRoot || '未知' }}</span>
                          <span class="platform-name">{{ item.platformName }}</span>
                        </div>
                        <div class="time">{{ item.dataUpdateTime }}</div>
                        <div class="relevance" v-if="!isMoHu">
                          <span class="relevance-value">{{ 100 - item.distance }}</span>
                          <div class="relevance-bar-wrapper">
                            <div class="relevance-bar"
                                 :style="{ width: Math.min(100 - item.distance, 100) + '%' }"></div>
                          </div>
                        </div>
                      </a>
                    </template>

                    <div v-if="historyData.length === 0" class="empty-tip">暂无历史数据</div>
                  </div>
                </div>
              </div>
            </main>
            <footer class="panel-footer">
              <div class="shortcuts">
                <kbd>ESC</kbd> 关闭窗口 · <kbd>Enter</kbd> 重新分析
              </div>
              <button class="close-btn-footer" @click="close" :disabled="loading">关闭追踪</button>
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
      sortKey: 'dataUpdateTime',
      sortDir: 'desc',
      windowWidth: 0,
      tabConfigs: [
        {label: '1分钟走势(精确)', mode: 'MO_HU_PI_PEI_ONE_MINUTES', isHistory: false, isMohu: true},
        {label: '今日走势(精确)', mode: 'MO_HU_PI_PEI_TODAY', isHistory: false, isMohu: true},
        {label: '历史走势(精确)', mode: 'MO_HU_PI_PEI_HISTORY', isHistory: true, isMohu: true},
        {label: '今日走势(指纹)', mode: 'ZHI_WEN_PI_PEI_TODAY', isHistory: false, isMohu: false},
        {label: '历史走势(指纹)', mode: 'ZHI_WEN_PI_PEI_HISTORY', isHistory: true, isMohu: false}
      ]
    };
  },
  computed: {
    getCurrentSearchModeLabel() {
      return this.tabConfigs.find(item => item.mode === this.currentSearchMode)?.label;
    },
    historyDataBoardShow() {
      return this.$store.state.historyDataBoardShow;
    },
    isHistoryMode() {
      return this.tabConfigs.find(t => t.mode === this.currentSearchMode)?.isHistory || false;
    },
    isMoHu() {
      return this.tabConfigs.find(t => t.mode === this.currentSearchMode)?.isMohu || false;
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
    fullXAxisLabels() {
      if (this.isHistoryMode) return this.historyFixedDates.map(d => `${parseInt(d.split('-')[1])}/${parseInt(d.split('-')[2])}`);
      if (this.currentSearchMode === 'MO_HU_PI_PEI_ONE_MINUTES') {
        return Array.from({length: 30}, (_, i) => `${i * 2}`);
      }
      return Array.from({length: 13}, (_, i) => `${String(i * 2).padStart(2, '0')}:00`);
    },
    displayedXAxisLabels() {
      if (this.windowWidth > 768) return this.fullXAxisLabels;

      const labels = this.fullXAxisLabels;
      if (this.isHistoryMode) {
        // 30天，每5天显示一个，共6个
        return labels.filter((_, i) => i % 5 === 0);
      }
      if (this.currentSearchMode === 'MO_HU_PI_PEI_ONE_MINUTES') {
        // 60秒，只显示 0,10,20,30,40,50
        return ['0', '10', '20', '30', '40', '50'];
      }
      // 小时级，只显示 00,04,08,12,16,20
      return ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
    },
    dataCounts() {
      if (this.isHistoryMode) {
        const map = new Map();
        this.historyData.forEach(item => {
          const d = item.dataUpdateTime.slice(0, 10);
          map.set(d, (map.get(d) || 0) + 1);
        });
        return this.historyFixedDates.map(d => map.get(d) || 0);
      }
      if (this.currentSearchMode === 'MO_HU_PI_PEI_ONE_MINUTES') {
        const counts = Array(60).fill(0);
        if (this.historyData.length === 0) return counts;
        const baseTime = this.historyData[0].dataUpdateTime.slice(0, 16);
        this.historyData.forEach(item => {
          if (item.dataUpdateTime.startsWith(baseTime)) {
            const sec = parseInt(item.dataUpdateTime.slice(17, 19));
            if (!isNaN(sec)) counts[sec]++;
          }
        });
        return counts;
      }
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
    },
    yAxisLabels() {
      const max = Math.max(...this.dataCounts, 1);
      return [max, Math.floor(max * 0.75), Math.floor(max * 0.5), Math.floor(max * 0.25), 0];
    },
    chartPoints() {
      const counts = this.dataCounts;
      const max = Math.max(...counts, 1);
      const len = counts.length - 1;
      return counts.map((count, i) => ({x: (i / len) * 800, y: 150 - (count / max) * 140}));
    },
    chartPath() {
      const p = this.chartPoints;
      return p.length ? `M${p[0].x},${p[0].y} ` + p.slice(1).map(i => `L${i.x},${i.y}`).join(' ') : '';
    },
    sortedHistoryData() {
      if (!this.sortKey) return this.historyData;
      return [...this.historyData].sort((a, b) => {
        let va = a[this.sortKey] ?? '';
        let vb = b[this.sortKey] ?? '';
        if (this.sortKey === 'dataUpdateTime') {
          va = new Date(va).getTime();
          vb = new Date(vb).getTime();
        }
        if (this.sortKey === 'distance') {
          va = a.distance ?? Infinity;
          vb = b.distance ?? Infinity;
        }
        if (va < vb) return this.sortDir === 'asc' ? -1 : 1;
        if (va > vb) return this.sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    }
  },
  watch: {
    historyDataBoardShow(val) {
      if (val) {
        this.historyData = [];
        this.loadLocalHistory();
        const externalTitle = this.$store.state.historyDataBoardUseTitle;
        this.searchQuery = externalTitle || '';
        // this.currentSearchMode = externalTitle ? 'ZHI_WEN_PI_PEI_TODAY' : 'MO_HU_PI_PEI_TODAY';
        this.currentSearchMode = this.$store.state.historyDataSearchMode;
        if (this.searchQuery) this.fetchData();
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKey);
    this.updateWindowWidth();
    window.addEventListener('resize', this.updateWindowWidth);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKey);
    window.removeEventListener('resize', this.updateWindowWidth);
  },
  methods: {
    updateWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
    clickTab(mode) {
      if (this.loading) return;
      this.currentSearchMode = mode;
      this.fetchData();
    },
    handleManualSearch() {
      if (this.loading || !this.searchQuery.trim()) return;
      this.saveLocalHistory(this.searchQuery);
      this.fetchData();
    },
    fetchData() {
      if (!this.searchQuery.trim() || this.loading) return;
      this.loading = true;
      this.tooltipShow = false;
      this.sortKey = 'dataUpdateTime';
      this.sortDir = 'desc';
      cacheSearchForAllByWord(this.searchQuery, this.currentSearchMode)
          .then(res => {
            if (res?.data?.code !== 999) this.historyData = res?.data?.data || [];
            else {
              store.commit('setLicenseShow', true);
              this.historyData = [];
            }
          })
          .finally(() => {
            this.$umami.track('📈历史追踪 | ' + this.getCurrentSearchModeLabel + " | " + this.searchQuery);
            this.loading = false;
          });
    },
    onChartHover(e) {
      if (this.loading) return;
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
      } else if (this.currentSearchMode === 'MO_HU_PI_PEI_ONE_MINUTES') {
        this.tooltipTitle = `${index}秒`;
        const base = this.historyData[0]?.dataUpdateTime.slice(0, 16) || '';
        this.tooltipData = this.historyData.filter(item => item.dataUpdateTime.startsWith(base) && parseInt(item.dataUpdateTime.slice(17, 19)) === index);
      } else {
        const hourStr = String(index).padStart(2, '0');
        this.tooltipTitle = `${hourStr}:00 - ${String(index + 1).padStart(2, '0')}:00`;
        const todayStr = this.historyData[0]?.dataUpdateTime.slice(0, 10) || '';
        this.tooltipData = this.historyData.filter(item => item.dataUpdateTime.startsWith(todayStr) && parseInt(item.dataUpdateTime.slice(11, 13)) === index);
      }
      const tooltipWidth = 300;
      let left = mouseX + 10;
      if (left + tooltipWidth > width) left = mouseX - tooltipWidth - 10;
      this.tooltipStyle = {left: Math.max(10, left) + 'px', top: '10px'};
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
      if (this.loading) return;
      this.searchQuery = k;
      this.handleManualSearch();
    },
    close() {
      if (this.loading) return;
      this.$store.commit('setHistoryDataBoardShow', false);
    },
    handleKey(e) {
      if (e.key === 'Escape' && this.historyDataBoardShow && !this.loading) this.close();
    },
    handleSort(key) {
      if (this.loading) return;
      if (this.sortKey === key) {
        if (this.sortDir === 'asc') {
          this.sortDir = 'desc';
        } else {
          this.sortKey = null;
        }
      } else {
        this.sortKey = key;
        this.sortDir = 'asc';
      }
    }
  }
};
</script>

<style scoped>
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
  padding: 16px;
}

.history-panel {
  position: relative;
  width: 80%;
  height: 90vh;
  max-height: 900px;
  background: linear-gradient(145deg, rgba(30, 33, 42, 0.95), rgba(20, 23, 32, 0.98));
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 30px 100px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1);
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: none;
  }
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
  padding: 20px 24px 16px;
  position: relative;
  z-index: 2;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-group h1 {
  font-size: 24px;
  font-weight: 800;
  color: #e4e4e4;
  margin-bottom: 4px;
}

.title-group p {
  font-size: 13px;
  color: #8892b0;
}

.close-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #ccd6f6;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 0 24px 24px;
  position: relative;
  z-index: 2;
}

.hot-title-card {
  background: rgba(40, 44, 56, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 12px 16px;
  margin-bottom: 20px;
}

.search-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-row h2 {
  flex: 1;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
}

.search-input {
  background: transparent;
  border: none;
  color: #e6edf3;
  font-size: 18px;
  font-weight: 700;
  outline: none;
  width: 100%;
}

.search-btn {
  height: 36px;
  padding: 0 20px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.search-btn:disabled {
  background: #2c3e50;
  cursor: not-allowed;
  opacity: 0.7;
}

.history-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.history-grid > div {
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  color: #8892b0;
  cursor: pointer;
}

.chart-tabs {
  margin-bottom: 20px;
}

.tab-buttons {
  display: flex;
  background: rgba(40, 44, 56, 0.4);
  border-radius: 10px;
  padding: 4px;
  margin-bottom: 16px;
  width: fit-content;
}

.tab-btn {
  padding: 6px 16px;
  border-radius: 8px;
  background: transparent;
  color: #8892b0;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s;
  border: none;
}

.tab-btn.active {
  background: linear-gradient(135deg, #409eff, #3a8fee);
  color: white;
  box-shadow: 0 4px 10px rgba(64, 158, 255, 0.3);
}

.chart-container {
  background: rgba(40, 44, 56, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 16px;
}

.chart-title {
  font-size: 15px;
  font-weight: 600;
  color: #e6edf3;
  margin-bottom: 12px;
}

.chart-wrapper {
  display: flex;
  gap: 10px;
  align-items: stretch;
}

.chart-y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 0 24px 0;
  min-width: 32px;
  text-align: right;
  font-size: 11px;
  color: #6b7280;
  font-weight: 500;
}

.chart-placeholder {
  position: relative;
  flex: 1;
  height: 160px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  cursor: crosshair;
}

.chart-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background: rgba(0, 0, 0, 0.3);
}

.fake-line-chart {
  position: absolute;
  inset: 0;
  padding: 12px 12px 24px 12px;
}

.fake-line-chart svg {
  width: 100%;
  height: 100%;
}

.chart-x-labels {
  position: absolute;
  bottom: 4px;
  left: 12px;
  right: 12px;
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
  border-radius: 10px;
  padding: 10px 12px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.8);
  min-width: 260px;
  max-width: 320px;
  z-index: 1000;
  font-size: 13px;
}

.tooltip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 6px;
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
  gap: 6px;
  max-height: 120px;
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
  border-radius: 14px;
  overflow: hidden;
}

.list-summary {
  padding: 10px 20px;
  background: rgba(64, 158, 255, 0.08);
  border-bottom: 1px solid rgba(64, 158, 255, 0.2);
  font-size: 13px;
  color: #409eff;
  font-weight: 600;
}

.list-header {
  display: grid;
  grid-template-columns: 150px 1fr 90px 110px 110px;
  padding: 12px 20px;
  font-size: 13px;
  font-weight: 600;
  color: #8892b0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.list-header.four-columns {
  grid-template-columns: 150px 1fr 90px 110px;
}

.list-header.five-columns {
  grid-template-columns: 150px 1fr 90px 110px 110px;
}

.sortable-header {
  cursor: pointer;
  padding-right: 14px;
  position: relative;
}

.sort-arrow {
  font-size: 11px;
  color: #409eff;
  font-weight: bold;
  margin-left: 4px;
}

.pc-item {
  display: grid;
  padding: 12px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: background 0.2s;
  align-items: center;
  text-decoration: none;
}

.pc-item.four-columns {
  grid-template-columns: 150px 1fr 90px 110px;
}

.pc-item.five-columns {
  grid-template-columns: 150px 1fr 90px 110px 110px;
}

.pc-item:hover {
  background: rgba(255, 255, 255, 0.03);
}

.time {
  background: rgba(64, 158, 255, 0.15);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 13px;
  color: #ccd6f6;
  text-align: center;
}

.platform-category {
  background: rgba(64, 255, 249, 0.15);
  color: rgb(64 255 210 / 68%);
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 13px;
}

.platform-name {
  background: rgba(64, 158, 255, 0.15);
  color: #409eff;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 13px;
}

.item-title {
  font-size: 14px;
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.relevance {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.relevance-value {
  color: #67c23a;
  font-weight: 600;
}

.relevance-bar-wrapper {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  overflow: hidden;
}

.relevance-bar {
  height: 100%;
  background: linear-gradient(90deg, #409eff, #67c23a);
}

.mobile-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  text-decoration: none;
}

.mobile-item:hover {
  background: rgba(255, 255, 255, 0.03);
}

.mobile-item .item-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-all;
}

.platform-info-row {
  display: flex;
  gap: 12px;
  width: 100%;
  flex-wrap: wrap;
}

.mobile-item .time {
  align-self: flex-start;
}

.mobile-item .relevance {
  width: 100%;
}

.mobile-item .relevance-bar-wrapper {
  height: 7px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
}

.mobile-item .relevance-bar {
  border-radius: 4px;
}

.list-loading, .empty-tip {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  color: #8892b0;
}

.panel-footer {
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.shortcuts kbd {
  background: rgba(255, 255, 255, 0.08);
  padding: 3px 7px;
  border-radius: 5px;
  font-size: 11px;
  color: #6b7280;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.close-btn-footer {
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.08);
  color: #e6edf3;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.close-btn-footer:hover {
  background: rgba(255, 255, 255, 0.15);
}

.atom-spinner {
  height: 44px;
  width: 44px;
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
  border-radius: 50%;
  border-left: 3px solid #ff1d5e;
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

@media (max-width: 768px) {
  .history-panel {
    width: 96%;
    height: 96vh;
    border-radius: 16px;
  }

  .panel-header {
    padding: 16px 16px 12px;
  }

  .title-group h1 {
    font-size: 20px;
  }

  .title-group p {
    font-size: 12px;
  }

  .panel-body {
    padding: 0 16px 20px;
  }

  .hot-title-card {
    padding: 10px 12px;
    margin-bottom: 16px;
  }

  .search-row {
    gap: 10px;
  }

  .search-row h2 {
    font-size: 16px;
  }

  .search-input {
    font-size: 16px;
  }

  .search-btn {
    height: 34px;
    padding: 0 16px;
    font-size: 13px;
  }

  .tab-buttons {
    flex-wrap: wrap;
  }

  .tab-btn {
    padding: 6px 12px;
    font-size: 12px;
  }

  .chart-container {
    padding: 12px;
  }

  .chart-title {
    font-size: 14px;
  }

  .chart-placeholder {
    height: 140px;
  }

  .chart-x-labels {
    bottom: 10px;
    left: 8px;
    right: 8px;
    font-size: 10px;
  }

  .chart-x-labels span {
    writing-mode: horizontal-tb;
    transform: none;
    text-align: center;
  }

  .list-header {
    display: none;
  }

  .panel-footer {
    padding: 14px 16px;
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .panel-footer .shortcuts {
    order: 2;
    text-align: center;
    font-size: 12px;
  }

  .close-btn-footer {
    order: 1;
    width: 100%;
  }
}

/* 统一处理所有禁用按钮的鼠标样式 */
button:disabled,
.close-btn:disabled,
.close-btn-footer:disabled,
.search-btn:disabled {
  cursor: not-allowed !important;
  opacity: 0.6;
}

/* 可选：加强视觉反馈 */
button:disabled:hover,
.close-btn:disabled:hover,
.close-btn-footer:disabled:hover {
  transform: none !important;
}
</style>