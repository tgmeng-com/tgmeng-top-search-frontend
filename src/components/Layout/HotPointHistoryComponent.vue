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
              <div class="hot-title-card">
                <div class="title-info">
                  <h2>🚩 {{ $store.state.historyDataBoardUseTitle }}</h2>
                </div>
              </div>

              <div class="chart-tabs">
                <div class="tab-buttons">
                  <button class="tab-btn" :class="{ active: activeTab === 'daily' }" @click="clickTab('daily')">
                    今日走势
                  </button>
                  <button class="tab-btn" :class="{ active: activeTab === 'history' }" @click="clickTab('history')">
                    历史走势
                  </button>
                </div>

                <div class="tab-content">
                  <div v-if="activeTab === 'history'" class="chart-container">
                    <div class="chart-title">历史出现频率曲线</div>
                    <div class="chart-wrapper">
                      <div class="chart-y-axis">
                        <span v-for="(val, idx) in historyYAxisLabels" :key="idx">{{ val }}</span>
                      </div>
                      <div class="chart-placeholder" @mousemove="onChartHover($event, 'history')"
                           @mouseleave="hideTooltip">
                        <div class="fake-line-chart">
                          <svg viewBox="0 0 800 180" preserveAspectRatio="none">
                            <path :d="historyChartPath" fill="none" stroke="url(#gradient-history)" stroke-width="4"
                                  opacity="0.8"/>
                            <defs>
                              <linearGradient id="gradient-history" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#409eff"/>
                                <stop offset="100%" stop-color="#67c23a"/>
                              </linearGradient>
                            </defs>
                          </svg>
                          <div class="chart-glow"></div>
                        </div>
                        <div class="chart-x-labels">
                          <span v-for="(label, index) in historyXLabels" :key="index">{{ label }}</span>
                        </div>
                        <transition name="tooltip-fade">
                          <div v-if="tooltipShow && activeTab === 'history'" class="chart-tooltip" :style="tooltipStyle">
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

                  <div v-else-if="activeTab === 'daily'" class="chart-container">
                    <div class="chart-title">今日小时级热度走势（{{ currentDate }}）</div>
                    <div class="chart-wrapper">
                      <div class="chart-y-axis">
                        <span v-for="(val, idx) in dailyYAxisLabels" :key="idx">{{ val }}</span>
                      </div>
                      <div class="chart-placeholder" @mousemove="onChartHover($event, 'daily')"
                           @mouseleave="hideTooltip">
                        <div class="fake-line-chart">
                          <svg viewBox="0 0 800 180" preserveAspectRatio="none">
                            <path :d="dailyChartPath" fill="none" stroke="url(#gradient-daily)" stroke-width="4"
                                  opacity="0.9"/>
                            <defs>
                              <linearGradient id="gradient-daily" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#ff7e5f"/>
                                <stop offset="100%" stop-color="#feb47b"/>
                              </linearGradient>
                            </defs>
                          </svg>
                          <div class="chart-glow"></div>
                        </div>
                        <div class="chart-x-labels daily-labels">
                          <span v-for="h in getHourLabels()" :key="h">{{ h }}</span>
                        </div>
                        <transition name="tooltip-fade">
                          <div v-if="tooltipShow && activeTab === 'daily'" class="chart-tooltip" :style="tooltipStyle">
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
                <div class="list-header">
                  <span>出现时间</span>
                  <span>热点标题</span>
                  <span>平台名称</span>
                  <span>相关度</span>
                </div>
                <div class="list-items">
                  <div v-if="loading" class="flex flex-col items-center justify-center py-16">
                    <div class="atom-spinner">
                      <div class="spinner-inner">
                        <div class="spinner-line"></div>
                        <div class="spinner-line"></div>
                        <div class="spinner-line"></div>
                        <div class="spinner-circle">&#9679;</div>
                      </div>
                    </div>
                    <span class="mt-4 text-gray-600 dark:text-gray-400 font-medium">历史数据追踪中...</span>
                  </div>

                  <div v-if="!loading">
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
                    <div v-if="historyData.length === 0" class="empty-state">暂无历史数据</div>
                  </div>
                </div>
              </div>
            </main>

            <footer class="panel-footer">
              <div class="shortcuts"><kbd>ESC</kbd> 关闭窗口</div>
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

export default {
  name: 'HotPointHistoryComponent',
  data() {
    return {
      historyData: [],
      activeTab: 'daily',
      tooltipShow: false,
      tooltipHovered: false,
      tooltipStyle: {},
      tooltipTitle: '',
      tooltipData: [],
      loading: false,
    };
  },
  computed: {
    historyDataBoardShow: {
      get() {
        return this.$store.state.historyDataBoardShow;
      },
      set(value) {
        this.$store.commit('setHistoryDataBoardShow', value);
      }
    },
    currentDate() {
      if (this.historyData.length > 0) {
        const dateStr = this.historyData[0].dataUpdateTime.slice(0, 10);
        const [y, m, d] = dateStr.split('-');
        return `${y}年${parseInt(m)}月${parseInt(d)}日`;
      }
      return new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
    },
    historyXLabels() {
      if (this.historyData.length === 0) {
        return Array(10).fill('暂无');
      }

      const dateMap = new Map();
      this.historyData.forEach(item => dateMap.set(item.dataUpdateTime.slice(0, 10), true));

      let dates = Array.from(dateMap.keys()).sort((a, b) => b.localeCompare(a)).slice(0, 10);
      while (dates.length < 10) dates.push('暂无');

      return dates.reverse().map(date => date === '暂无' ? '暂无' : date.slice(5).replace('-', '/'));
    },
    historyDataCounts() {
      if (this.historyData.length === 0) return Array(10).fill(0);

      const countMap = new Map();
      this.historyData.forEach(item => {
        const date = item.dataUpdateTime.slice(0, 10);
        countMap.set(date, (countMap.get(date) || 0) + 1);
      });

      let dates = Array.from(countMap.keys()).sort((a, b) => b.localeCompare(a)).slice(0, 10);
      while (dates.length < 10) dates.push('暂无');

      return dates.reverse().map(date => countMap.get(date) || 0);
    },
    dailyDataCounts() {
      const counts = Array(24).fill(0);
      if (this.historyData.length === 0) return counts;

      const today = this.historyData[0].dataUpdateTime.slice(0, 10);
      this.historyData.forEach(item => {
        if (item.dataUpdateTime.startsWith(today)) {
          const hour = parseInt(item.dataUpdateTime.slice(11, 13), 10);
          if (!isNaN(hour)) counts[hour]++;
        }
      });
      return counts;
    },
    historyYAxisLabels() {
      const max = Math.max(...this.historyDataCounts, 1);
      return [max, Math.floor(max * 0.75), Math.floor(max * 0.5), Math.floor(max * 0.25), 0];
    },
    dailyYAxisLabels() {
      const max = Math.max(...this.dailyDataCounts, 1);
      return [max, Math.floor(max * 0.75), Math.floor(max * 0.5), Math.floor(max * 0.25), 0];
    },
    historyChartPath() {
      const max = Math.max(...this.historyDataCounts, 1);
      const points = this.historyDataCounts.map((count, i) => ({
        x: (i / 9) * 800,
        y: 180 - (count / max) * 160
      }));

      if (points.length === 0) return 'M0,180';
      let path = `M${points[0].x},${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const cur = points[i];
        const nxt = points[i + 1];
        const cpX = (cur.x + nxt.x) / 2;
        path += ` Q${cpX},${cur.y} ${cpX},${(cur.y + nxt.y) / 2}`;
        path += ` Q${cpX},${nxt.y} ${nxt.x},${nxt.y}`;
      }
      return path;
    },
    dailyChartPath() {
      const max = Math.max(...this.dailyDataCounts, 1);
      const points = this.dailyDataCounts.map((count, i) => ({
        x: (i / 23) * 800,
        y: 180 - (count / max) * 160 + 10
      }));

      if (points.length === 0) return 'M0,180';
      let path = `M${points[0].x},${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const cur = points[i];
        const nxt = points[i + 1];
        const cpX = (cur.x + nxt.x) / 2;
        path += ` Q ${cpX},${cur.y} ${cpX},${(cur.y + nxt.y) / 2}`;
        path += ` Q ${cpX},${nxt.y} ${nxt.x},${nxt.y}`;
      }
      return path;
    }
  },
  watch: {
    historyDataBoardShow(val) {
      if (val) {
        this.activeTab = 'daily';
        this.clickTab('daily');
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
    clickTab(tab) {
      this.activeTab = tab;
      this.loading = true;

      let searchMode = "";

      if (tab === 'daily') {
        searchMode = 'ZHI_WEN_PI_PEI_TODAY';
      } else if (tab === 'history') {
        searchMode = 'ZHI_WEN_PI_PEI_HISTORY';
      }
      cacheSearchForAllByWord(this.$store.state.historyDataBoardUseTitle, searchMode)
          .then(res => {
            const result = res?.data?.data || false;
            if (result && res.data.code !== 999) {
              this.historyData = result;
            } else {
              if (res.data.code === 999){
                store.commit('setLicenseShow', true)
              }
              this.showResults = false;
              this.historyData = [];
            }
          })
          .finally(() => {
            this.loading = false;
          });
    },
    getTodayStartTime() {
      const now = new Date();
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} 00:00:00`;
    },
    getCurrentTime() {
      const now = new Date();
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    },
    getHourLabels() {
      const isMobile = window.innerWidth <= 768;
      return isMobile
          ? ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00']
          : ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
    },
    handleKey(e) {
      if (e.key === 'Escape' && this.historyDataBoardShow) this.close();
    },
    close() {
      this.historyDataBoardShow = false;
    },
    hideTooltip() {
      setTimeout(() => {
        if (!this.tooltipHovered) this.tooltipShow = false;
      }, 100);
    },
    onChartHover(e, type) {
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const width = rect.width;
      const height = rect.height;

      let index;

      if (type === 'history') {
        index = Math.floor((mouseX / width) * 10);
        index = Math.max(0, Math.min(9, index));

        const label = this.historyXLabels[index];
        if (label === '暂无') {
          this.tooltipTitle = '暂无数据';
          this.tooltipData = [];
        } else {
          const [m, d] = label.split('/');
          const year = this.historyData.length > 0 ? this.historyData[0].dataUpdateTime.slice(0, 4) : '2025';
          const dateStr = `${year}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
          this.tooltipTitle = label;
          this.tooltipData = this.historyData.filter(item => item.dataUpdateTime.startsWith(dateStr));
        }
      } else {
        index = Math.floor((mouseX / width) * 24);
        index = Math.max(0, Math.min(23, index));
        const hourStr = String(index).padStart(2, '0');
        this.tooltipTitle = `今天 ${hourStr}:00 - ${String(index + 1).padStart(2, '0')}:00`;

        const todayStr = this.historyData.length > 0 ? this.historyData[0].dataUpdateTime.slice(0, 10) : '';
        this.tooltipData = this.historyData.filter(item =>
            item.dataUpdateTime.startsWith(todayStr) &&
            parseInt(item.dataUpdateTime.slice(11, 13)) === index
        );
      }

      const tooltipWidth = 360;
      const tooltipHeight = this.tooltipData.length > 0 ? 100 + Math.min(5, this.tooltipData.length) * 24 : 80;

      let left = mouseX + 15;
      if (left + tooltipWidth > width - 10) left = mouseX - tooltipWidth - 15;
      left = Math.max(10, Math.min(left, width - tooltipWidth - 10));

      let top = mouseY + 15;
      if (top + tooltipHeight > height - 40) top = mouseY - tooltipHeight - 15;
      top = Math.max(10, Math.min(top, height - tooltipHeight - 10));

      this.tooltipStyle = { left: left + 'px', top: top + 'px' };
      this.tooltipShow = true;
    }
  }
};
</script>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

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
  box-shadow: 0 30px 100px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
}

/* 进场动画定义 - 与搜索组件对齐 */
.modal-enter-active, .modal-leave-active { transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.history-panel { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes slideUp { from { opacity: 0; transform: translateY(40px) scale(0.96); } to { opacity: 1; transform: none; } }

.bg-gradient {
  position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
  background: radial-gradient(circle at 30% 30%, rgba(64, 158, 255, 0.15) 0%, transparent 50%);
  animation: rotate 20s linear infinite; pointer-events: none;
}
@keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.bg-mesh {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 30px 30px; pointer-events: none;
}

.panel-header { padding: 32px 32px 24px; position: relative; z-index: 2; }
.header-content { display: flex; justify-content: space-between; align-items: center; }
.title-group h1 { font-size: 28px; font-weight: 800; color: rgb(228, 228, 228); margin-bottom: 4px; }
.title-group p { font-size: 14px; color: #8892b0; }
.close-btn { width: 40px; height: 40px; border-radius: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.08); color: #ccd6f6; cursor: pointer; transition: all 0.25s; display: flex; align-items: center; justify-content: center; }
.close-btn:hover { background: rgba(255, 255, 255, 0.1); transform: scale(1.05); }

.panel-body { flex: 1; overflow-y: auto; padding: 0 32px 32px; position: relative; z-index: 2; }
.hot-title-card { background: rgba(40, 44, 56, 0.5); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 12px; display: flex; align-items: center; gap: 20px; margin-bottom: 28px; }
.title-info h2 { font-size: 22px; font-weight: 700; color: #e6edf3; margin-bottom: 8px; }
.chart-tabs { margin-bottom: 28px; }
.tab-buttons { display: flex; background: rgba(40, 44, 56, 0.4); border-radius: 12px; padding: 4px; margin-bottom: 20px; width: fit-content; }
.tab-btn { padding: 8px 20px; border-radius: 10px; background: transparent; color: #8892b0; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s; border: none; }
.tab-btn.active { background: linear-gradient(135deg, #409eff, #3a8fee); color: white; box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3); }

.chart-container { background: rgba(40, 44, 56, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 20px; margin-bottom: 28px; position: relative; }
.chart-title { font-size: 16px; font-weight: 600; color: #e6edf3; margin-bottom: 16px; }
.chart-wrapper { display: flex; gap: 12px; align-items: stretch; }
.chart-y-axis { display: flex; flex-direction: column; justify-content: space-between; padding: 16px 0 30px 0; min-width: 35px; text-align: right; font-size: 11px; color: #6b7280; font-weight: 500; }
.chart-placeholder { position: relative; flex: 1; height: 180px; background: rgba(0, 0, 0, 0.2); border-radius: 12px; overflow: visible; cursor: crosshair; }
.fake-line-chart { position: absolute; inset: 0; padding: 16px 16px 30px 16px; }
.fake-line-chart svg { width: 100%; height: 100%; }
.chart-glow { position: absolute; inset: 0; background: radial-gradient(circle at 50% 100%, rgba(64, 158, 255, 0.15), transparent 70%); pointer-events: none; }
.chart-x-labels { position: absolute; bottom: 5px; left: 16px; right: 16px; display: flex; justify-content: space-between; font-size: 10px; color: #6b7280; pointer-events: none; }
.daily-labels { font-size: 9px; }

.chart-tooltip { position: absolute; background: rgba(20, 23, 32, 0.98); backdrop-filter: blur(16px); border: 1px solid rgba(64, 158, 255, 0.3); border-radius: 12px; padding: 12px 14px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8); min-width: 280px; max-width: 360px; z-index: 1000; pointer-events: auto; font-size: 13px; }
.tooltip-fade-enter-active, .tooltip-fade-leave-active { transition: opacity 0.15s; }
.tooltip-fade-enter-from, .tooltip-fade-leave-to { opacity: 0; }
.tooltip-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
.tooltip-header strong { font-size: 13px; color: #e6edf3; font-weight: 600; }
.tooltip-header .count { font-size: 11px; color: #67c23a; font-weight: 600; background: rgba(103, 194, 58, 0.15); padding: 2px 8px; border-radius: 10px; }
.tooltip-list { display: flex; flex-direction: column; gap: 8px; max-height: 140px; overflow-y: auto; }
.tooltip-item { display: flex; gap: 8px; font-size: 12px; line-height: 1.5; padding: 4px 0; }
.tooltip-item .time { color: #8892b0; font-weight: 500; min-width: 40px; flex-shrink: 0; }
.tooltip-item .platform { color: #409eff; font-weight: 500; min-width: 70px; flex-shrink: 0; }
.tooltip-item .title { color: #ccd6f6; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }
.tooltip-more { text-align: center; color: #67c23a; font-size: 11px; padding: 6px; background: rgba(103, 194, 58, 0.1); border-radius: 6px; margin-top: 4px; }
.tooltip-empty { text-align: center; color: #6b7280; font-size: 12px; padding: 12px; }

.history-list { background: rgba(40, 44, 56, 0.4); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; overflow: hidden; }
.list-header { display: grid; grid-template-columns: 170px 1fr 120px 120px; padding: 16px 24px; font-size: 13px; font-weight: 600; color: #8892b0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); align-items: center; }
.list-header span { text-align: center; }
.list-item { display: grid; grid-template-columns: 170px 1fr 120px 120px; padding: 16px 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.04); transition: background 0.2s; align-items: center; text-decoration: none; }
.list-item:hover { background: rgba(255, 255, 255, 0.03); }

.time { display: inline-block; background: rgba(64, 158, 255, 0.15); padding: 4px 10px; border-radius: 6px; font-size: 14px; color: #ccd6f6; text-align: center; }
.platform-name { display: inline-block; background: rgba(64, 158, 255, 0.15); color: #409eff; padding: 4px 10px; border-radius: 6px; font-size: 14px; }
.item-title { font-size: 14px; color: #e6edf3; line-height: 1.5; word-break: break-word; padding: 0 12px; }
.relevance { display: flex; align-items: center; gap: 8px; justify-content: center; }
.relevance-value { font-size: 13px; color: #67c23a; font-weight: 600; min-width: 28px; text-align: right; }
.relevance-bar-wrapper { flex: 1; max-width: 60px; height: 8px; background: rgba(255, 255, 255, 0.05); border-radius: 4px; overflow: hidden; }
.relevance-bar { height: 100%; background: linear-gradient(90deg, #409eff, #67c23a); border-radius: 4px; transition: width 0.3s ease; }

.panel-footer { padding: 20px 32px 32px; display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 2; }
.shortcuts { font-size: 13px; color: #6b7280; }
.shortcuts kbd { background: rgba(255, 255, 255, 0.08); padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; border: 1px solid rgba(255, 255, 255, 0.1); }
.close-btn-footer { padding: 12px 24px; background: rgba(255, 255, 255, 0.08); color: #e6edf3; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; cursor: pointer; font-weight: 600; transition: all 0.3s; }
.close-btn-footer:hover { background: rgba(255, 255, 255, 0.15); transform: translateY(-2px); }

@media (max-width: 768px) {
  .history-panel { width: 95%; height: 95vh; }
  .panel-header { padding: 24px 20px 16px; }
  .title-group h1 { font-size: 22px; }
  .title-group p { font-size: 12px; }
  .panel-body { padding: 0 20px 20px; }
  .hot-title-card { flex-direction: column; align-items: flex-start; gap: 16px; padding: 20px; }
  .title-info h2 { font-size: 18px; }
  .tab-buttons { width: 100%; }
  .tab-btn { flex: 1; font-size: 13px; padding: 8px 12px; }
  .chart-container { padding: 16px; }
  .chart-title { font-size: 14px; }
  .chart-y-axis { min-width: 28px; font-size: 10px; padding: 16px 0 25px 0; }
  .chart-placeholder { height: 160px; }
  .fake-line-chart { padding: 12px 12px 25px 12px; }
  .chart-x-labels { font-size: 9px; left: 12px; right: 12px; bottom: 3px; }
  .daily-labels { font-size: 8px; }
  .chart-tooltip { min-width: 240px; max-width: 280px; font-size: 11px; padding: 10px 12px; }
  .tooltip-header strong { font-size: 12px; }
  .tooltip-header .count { font-size: 10px; padding: 2px 6px; }
  .tooltip-item { font-size: 11px; gap: 6px; }
  .tooltip-item .time { min-width: 35px; }
  .tooltip-item .platform { min-width: 60px; font-size: 10px; }
  .tooltip-more { font-size: 10px; padding: 4px; }
  .history-list { border-radius: 14px; }
  .list-header { display: none; }
  .list-item { display: flex; flex-direction: column; gap: 8px; padding: 16px; align-items: stretch; border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
  .list-item > div { width: 100%; }
  .time { font-size: 12px; color: #8892b0; order: 1; text-align: left; }
  .item-title { font-size: 14px; line-height: 1.6; order: 2; text-align: left; padding: 0; }
  .platform { order: 3; text-align: left; }
  .platform-name { display: inline-block; background: rgba(64, 158, 255, 0.15); color: #409eff; padding: 4px 10px; border-radius: 6px; font-size: 12px; }
  .relevance { justify-content: flex-start; order: 4; gap: 8px; }
  .relevance-value { font-size: 12px; min-width: 24px; }
  .relevance-bar-wrapper { flex: 1; max-width: 100%; height: 6px; }
  .panel-footer { padding: 16px 20px 24px; flex-direction: column; gap: 12px; }
  .shortcuts { font-size: 11px; }
  .shortcuts kbd { font-size: 10px; padding: 3px 6px; }
  .close-btn-footer { width: 100%; padding: 10px 20px; font-size: 14px; }
}

@media (max-width: 480px) {
  .title-group h1 { font-size: 20px; }
  .chart-y-axis { min-width: 24px; font-size: 9px; }
  .chart-placeholder { height: 140px; }
  .chart-tooltip { min-width: 200px; max-width: 240px; }
}

/* 加载动画保持不变 */
.atom-spinner, .atom-spinner * { box-sizing: border-box; }
.atom-spinner { height: 3.125rem; width: 3.125rem; overflow: hidden; }
.atom-spinner .spinner-inner { position: relative; display: block; height: 100%; width: 100%; }
.atom-spinner .spinner-circle { display: block; position: absolute; color: #ff1d5e; font-size: calc(3.75rem * 0.24); top: 90%; left: 90%; transform: translate(-90%, -90%); }
.atom-spinner .spinner-line { position: absolute; width: 100%; height: 100%; border-radius: 90%; border-left-width: calc(3.75rem / 5); border-top-width: calc(3.75rem / 25); border-left-color: #ff1d5e; border-left-style: solid; border-top-style: solid; border-top-color: transparent; }
.atom-spinner .spinner-line:nth-child(1) { animation: atom-spinner-animation-1 1s linear infinite; transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg); }
.atom-spinner .spinner-line:nth-child(2) { animation: atom-spinner-animation-2 1s linear infinite; transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg); }
.atom-spinner .spinner-line:nth-child(3) { animation: atom-spinner-animation-3 1s linear infinite; transform: rotateZ(360deg) rotateX(66deg) rotateZ(0deg); }
@keyframes atom-spinner-animation-1 { 100% { transform: rotateZ(120deg) rotateX(66deg) rotateZ(360deg); } }
@keyframes atom-spinner-animation-2 { 100% { transform: rotateZ(240deg) rotateX(66deg) rotateZ(360deg); } }
@keyframes atom-spinner-animation-3 { 100% { transform: rotateZ(360deg) rotateX(66deg) rotateZ(360deg); } }
</style>