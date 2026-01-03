<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="searchShow" class="config-backdrop" @click="close">
        <div class="config-panel" @click.stop>
          <div class="bg-gradient"></div>
          <div class="bg-mesh"></div>

          <header class="panel-header">
            <div class="header-content">
              <div class="title-group">
                <h1>全网热点搜索</h1>
                <p>一搜即达 · 聚合全网热门排行榜</p>
              </div>
            </div>
            <button class="close-btn" @click="close" title="关闭 (Esc)">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M15 5L5 15M5 5l10 10"/>
              </svg>
            </button>
          </header>

          <main class="scrollable-content">
            <div class="search-input-row">
              <div class="search-input-wrapper">
                <input
                    v-model="input"
                    type="text"
                    placeholder="请输入关键词并按回车..."
                    @keyup.enter="handleEnter"
                    @focus="handleInputFocus"
                    @input="handleInputChange"
                    :disabled="inputSearchDisable"
                    class="modal-search-input"
                    ref="inputRef"
                />

                <div class="absolute right-4 top-1/2 -translate-y-1/2 z-20">
                  <el-select
                      v-model="searchMode"
                      class="embedded-mode-select"
                      popper-class="embedded-mode-popper"
                      :teleported="false"
                  >
                    <el-option
                        v-for="item in modeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                      <el-tooltip :content="item.tip" placement="top" effect="dark">
                        <span class="block truncate">{{ item.label }}</span>
                      </el-tooltip>
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>

            <section v-if="showHistory" class="info-section">
              <h3 class="section-title">
                <span>历史搜索</span>
                <button @click="clearHistory" class="clear-btn">清空</button>
              </h3>
              <div class="history-grid">
                <div v-for="(item, index) in searchHistory" :key="index" class="history-item" @click="selectHistory(item)">
                  <span class="truncate">{{ item }}</span>
                  <button @click.stop="deleteHistoryItem(item)" class="delete-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>
            </section>

            <section v-if="showResults" class="info-section">
              <h3 class="section-title results-header">
                <div class="left-info">
                  <span>搜索结果</span>
                  <span class="result-count" v-if="!loading">共 {{ sortedResults.length }} 条</span>
                </div>
                <div class="sort-controls" v-if="searchResults.length > 0 && !loading">
                  <span class="sort-label">排序:</span>
                  <div class="sort-group">
                    <button
                        v-for="opt in sortOptions"
                        :key="opt.value"
                        @click="toggleSort(opt.value)"
                        :class="['sort-btn', { active: currentSort.key === opt.value }]"
                    >
                      {{ opt.label }}{{ getSortIcon(opt.value) }}
                    </button>
                  </div>
                </div>
              </h3>

              <div v-if="loading" class="loading-container">
                <div class="atom-spinner">
                  <div class="spinner-inner">
                    <div class="spinner-line"></div>
                    <div class="spinner-line"></div>
                    <div class="spinner-line"></div>
                    <div class="spinner-circle">&#9679;</div>
                  </div>
                </div>
                <span class="loading-text">全网实时热点获取中...</span>
              </div>

              <ul v-else class="results-list">
                <li v-for="(item, index) in sortedResults" :key="index" class="result-item mt-4">
                  <a :target="'_blank'" :href="item.url" class="result-link">
                    <div class="rank">{{ index + 1 }}</div>
                    <div class="title-wrapper">
                      <span class="trend-icon" @click.stop.prevent="clickHotPointTrend(item.title)">📈</span>
                      <span class="title truncate-2">{{ item.title }}</span>
                    </div>
                    <div class="meta-info">
                      <span class="tag platform">{{ item.platformName }}</span>
                      <span class="tag category" v-if="item.platformCategoryRoot">{{ item.platformCategoryRoot }}</span>
                      <span class="tag time" v-if="item.dataUpdateTime">{{ item.dataUpdateTime }}</span>
                    </div>
                  </a>
                </li>
                <li v-if="sortedResults.length === 0" class="no-result">暂无检索结果</li>
              </ul>
            </section>
          </main>

          <footer class="panel-footer">
            <div class="shortcuts">
              <kbd>ESC</kbd> 关闭 · <kbd>Enter</kbd> 搜索
            </div>
          </footer>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { cacheSearchForAllByWord } from "@/api/api"
import store from "@/store"
import { clearLocalStorage, getLocalStorage, LOCAL_STORAGE_KEYS, setLocalStorage } from "@/utils/localStorageUtils"

export default {
  name: 'SearchModal',
  data() {
    return {
      input: '',
      showResults: false,
      inputSearchDisable: false,
      searchResults: [],
      loading: false,
      showHistory: false,
      searchHistory: [],
      maxHistoryItems: 20,
      searchMode: 'MO_HU_PI_PEI_ONE_MINUTES',
      currentSort: { key: null, order: 'asc' },
      sortOptions: [
        { label: '标题', value: 'title' },
        { label: '平台', value: 'platform' },
        { label: '分类', value: 'category' },
        { label: '时间', value: 'time' }
      ],
      modeOptions: [
        { value: 'MO_HU_PI_PEI_ONE_MINUTES', icon: '🤖', label: '🤖模糊匹配(1分钟)', tip: '【数据范围:1分钟】【匹配模式:模糊匹配】(热点标题包含输入内容：建议输入短文本)' },
        { value: 'MO_HU_PI_PEI_TODAY', icon: '🤖', label: '🤖模糊匹配(今日)', tip: '【数据范围:今日】【匹配模式:模糊匹配】(热点标题包含输入内容：建议输入短文本)' },
        { value: 'MO_HU_PI_PEI_HISTORY', icon: '🤖', label: '🤖模糊匹配(历史)', tip: '【数据范围:历史】【匹配模式:模糊匹配】(热点标题包含输入内容：建议输入短文本)' },
        { value: 'ZHI_WEN_PI_PEI_TODAY', icon: '🤖', label: '🤖指纹匹配(今日)', tip: '【数据范围:今日】【匹配模式:指纹匹配】(热点标题与输入内容存在关联：建议输入长文本)' },
        { value: 'ZHI_WEN_PI_PEI_HISTORY', icon: '🤖', label: '🤖指纹匹配(历史)', tip: '【数据范围:历史】【匹配模式:指纹匹配】(热点标题与输入内容存在关联：建议输入长文本)' },
      ]
    }
  },
  computed: {
    searchShow: {
      get() {
        return this.$store.state.searchShow;
      },
      set(value) {
        this.$store.commit('setSearchShow', value);
      }
    },

    sortedResults() {
      if (!this.currentSort.key) return this.searchResults

      let list = [...this.searchResults]

      return list.sort((a, b) => {
        let valA, valB
        if (this.currentSort.key === 'title') { valA = a.title || ''; valB = b.title || '' }
        else if (this.currentSort.key === 'platform') { valA = a.platformName || ''; valB = b.platformName || '' }
        else if (this.currentSort.key === 'category') { valA = a.platformCategoryRoot || ''; valB = b.platformCategoryRoot || '' }
        else if (this.currentSort.key === 'time') { valA = a.dataUpdateTime || ''; valB = b.dataUpdateTime || '' }

        if (valA < valB) return this.currentSort.order === 'asc' ? -1 : 1
        if (valA > valB) return this.currentSort.order === 'asc' ? 1 : -1
        return 0
      })
    }
  },

  watch: {
    '$store.state.searchTrigger'() {
      const keyword = this.$store.state.searchKeyword;
      if (keyword) {
        this.loadSearchHistory()
        this.input = keyword;
        this.handleEnter();
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    }
  },

  mounted() {
    this.loadSearchHistory()
    this.$nextTick(() => this.$refs.inputRef?.focus())
    window.addEventListener('keydown', this.handleEsc)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleEsc)
  },
  methods: {
    toggleSort(key) {
      if (this.currentSort.key === key) {
        if (this.currentSort.order === 'asc') {
          this.currentSort.order = 'desc'
        } else {
          this.currentSort = { key: null, order: 'asc' }
        }
      } else {
        this.currentSort = { key, order: 'asc' }
      }
    },
    isSortActive(key) {
      return this.currentSort.key === key
    },
    getSortIcon(key) {
      if (this.currentSort.key !== key) return ''
      return this.currentSort.order === 'asc' ? '↑' : '↓'
    },
    close() {
      this.searchShow = false
      this.showResults = false
      this.showHistory = false
      this.input = ''
      this.inputSearchDisable = false
    },
    handleEsc(e) {
      if (this.searchShow && e.key === 'Escape') this.close()
    },
    loadSearchHistory() {
      const history = getLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_HISTORY)
      if (history) {
        try {
          this.searchHistory = JSON.parse(JSON.stringify(history))
        } catch {
          this.searchHistory = []
        }
      }
    },
    saveSearchHistory(keyword) {
      if (!keyword?.trim()) return
      const trimmed = keyword.trim()
      this.searchHistory = this.searchHistory.filter(i => i !== trimmed)
      this.searchHistory.unshift(trimmed)
      if (this.searchHistory.length > this.maxHistoryItems) this.searchHistory.pop()
      setLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(this.searchHistory))
    },
    deleteHistoryItem(keyword) {
      this.searchHistory = this.searchHistory.filter(i => i !== keyword)
      setLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(this.searchHistory))
    },
    clearHistory() {
      this.searchHistory = []
      clearLocalStorage(LOCAL_STORAGE_KEYS.SEARCH_HISTORY)
    },
    selectHistory(keyword) {
      this.input = keyword
      this.showHistory = false
      this.handleEnter()
    },
    handleInputFocus() {
      if (this.searchHistory.length > 0 && !this.input.trim()) {
        this.showHistory = true
        this.showResults = false
      }
    },
    handleInputChange() {
      if (this.input.trim()) {
        this.showHistory = false
      } else if (this.searchHistory.length > 0) {
        this.showHistory = true
        this.showResults = false
      }
    },
    handleEnter() {
      if (!this.input.trim()) return
      const mode = this.modeOptions.find(m => m.value === this.searchMode)
      if (window.umami) window.umami.track('🔎热点检索 | ' + (mode?.label || '') + ' | ' + this.input)

      this.saveSearchHistory(this.input.trim())

      this.inputSearchDisable = true
      this.showResults = true
      this.showHistory = false
      this.loading = true
      this.searchResults = []

      cacheSearchForAllByWord(this.input.trim(), this.searchMode)
          .then(res => {
            if (res?.data?.data && res.data.code !== 999) {
              this.searchResults = res.data.data
            } else if (res?.data?.code === 999) {
              this.$message?.error(res.data.message || '密钥失效')
              store.commit('setLicenseShow', true)
            }
          })
          .finally(() => {
            this.inputSearchDisable = false
            this.loading = false
          })
    },
    clickHotPointTrend(title) {
      store.commit('setHistoryDataBoardShow', true)
      store.commit('setHistoryDataBoardUseTitle', title)
      if (window.umami) window.umami.track('📊热点历史追踪')
    }
  }
}
</script>

<style scoped>
.config-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(25px) saturate(150%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1999;
  padding: 20px;
}

.config-panel {
  position: relative;
  width: 80%;
  height: 90vh;
  max-height: 900px;
  background: linear-gradient(145deg, rgba(30, 33, 42, 0.95), rgba(20, 23, 32, 0.98));
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 30px 100px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
}

.modal-enter-active, .modal-leave-active { transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.config-panel { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes slideUp { from { opacity: 0; transform: translateY(40px) scale(0.96); } to { opacity: 1; transform: none; } }

.bg-gradient {
  position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
  background: radial-gradient(circle at 30% 30%, rgba(64, 158, 255, 0.18), transparent 50%),
  radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.15), transparent 50%);
  animation: rotate 30s linear infinite; pointer-events: none;
}
.bg-mesh {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px; pointer-events: none;
}
@keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

.panel-header {
  position: relative;
  padding: 32px 32px 24px;
  flex-shrink: 0;
}
.title-group h1 { font-size: 28px; font-weight: 800; background: linear-gradient(135deg, #fff 30%, #a8b3cf); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0; letter-spacing: -0.5px; }
.title-group p { font-size: 14px; color: #8892b0; font-weight: 500; margin-top: 6px; }

.close-btn {
  position: absolute; top: 32px; right: 32px; width: 40px; height: 40px; border-radius: 14px;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: #ccd6f6;
  display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s;
}
.close-btn:hover { background: rgba(255,255,255,0.15); color: #fff; transform: rotate(90deg); }

.scrollable-content { flex: 1; overflow-y: auto; padding: 0 32px 32px; scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.1) transparent; }
.scrollable-content::-webkit-scrollbar { width: 8px; }
.scrollable-content::-webkit-scrollbar-track { background: transparent; }
.scrollable-content::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

.search-input-wrapper {
  position: relative; background: rgba(255,255,255,0.04); padding: 16px 24px;
  border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); transition: all 0.3s;
}
.search-input-wrapper:focus-within { border-color: rgba(64, 158, 255, 0.5); box-shadow: 0 0 0 4px rgba(64, 158, 255, 0.1); }
.modal-search-input { width: 100%; background: transparent; border: none; outline: none; color: #fff; font-size: 18px; padding-right: 180px; }

.embedded-mode-select :deep(.el-input__wrapper) {
  background: rgba(64, 158, 255, 0.1) !important;
  border: 1px solid rgba(64, 158, 255, 0.3) !important;
  border-radius: 12px !important;
  box-shadow: none !important;
  padding: 4px 12px !important;
}

.embedded-mode-select :deep(.el-input__inner) {
  color: #64b5ff !important;
  font-size: 13px !important;
  font-weight: 600 !important;
}

.info-section { margin-top: 30px; }
.section-title { font-size: 18px; color: #fff; margin-bottom: 18px; display: flex; justify-content: space-between; font-weight: 700; }
.clear-btn { font-size: 14px; color: #64b5ff; cursor: pointer; background: transparent; border: none; }
.history-grid { display: flex; flex-wrap: wrap; gap: 10px; }
.history-item {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px; padding: 8px 14px; display: flex; align-items: center; gap: 8px;
  cursor: pointer; transition: all .2s; max-width: 200px;
  color: #d5d5d5;
}
.history-item:hover { background: rgba(64,158,255,0.15); border-color: rgba(64,158,255,0.3); }
.delete-btn { color: #8892b0; border: none; background: transparent; padding: 0; display: flex; cursor: pointer; }

.results-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
.left-info { display: flex; align-items: center; gap: 12px; }
.result-count { font-size: 14px; color: #8892b0; font-weight: 400; }
.sort-controls { display: flex; align-items: center; gap: 10px; }
.sort-label { font-size: 13px; color: #8892b0; }
.sort-group { display: flex; background: rgba(255,255,255,0.05); padding: 4px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08); }
.sort-btn {
  padding: 4px 12px; font-size: 12px; border-radius: 7px; border: none; background: transparent;
  color: #a8b3cf; cursor: pointer; transition: all 0.2s;
}
.sort-btn.active { background: rgba(64,158,255,0.2); color: #64b5ff; font-weight: 600; }

.results-list { margin-top: 20px; }
.result-item { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; transition: 0.3s;}
.result-item:hover { background: rgba(64,158,255,0.1); transform: translateX(6px); }
.result-link { display: flex; align-items: center; padding: 10px; text-decoration: none; width: 100%; }

.rank { width: 32px; font-weight: 800; color: rgba(100, 181, 255, 0.4); font-size: 20px; font-style: italic; }
.title-wrapper { flex: 1; display: flex; align-items: center; gap: 12px; min-width: 0; }
.title { color: #e6edf3; font-size: 16px; line-height: 1.4; }
.trend-icon { cursor: pointer; transition: transform 0.2s; }
.trend-icon:hover { transform: scale(1.2); }

.meta-info {
  display: flex; flex-wrap: wrap; justify-content: flex-end; align-items: center;
  gap: 8px; flex-shrink: 0; margin-left: auto;
}
.tag { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 6px; white-space: nowrap; }
.tag.category { background: rgba(139, 92, 246, 0.15); color: #a78bfa; border: 1px solid rgba(139, 92, 246, 0.2); }
.tag.platform { background: rgba(64, 158, 255, 0.15); color: #64b5ff; border: 1px solid rgba(64, 158, 255, 0.2); }
.time { background: rgba(64, 158, 255, 0.15); color: #399567; border: 1px solid rgba(64, 158, 255, 0.2); }

.panel-footer { padding: 24px 32px; flex-shrink: 0; display: flex; justify-content: flex-end; border-top: 1px solid rgba(255,255,255,0.05); }
.shortcuts { font-size: 13px; color: #8892b0; }
.shortcuts kbd {
  background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);
  box-shadow: 0 2px 0 rgba(0,0,0,0.2); color: #fff; padding: 2px 6px; border-radius: 4px; margin: 0 4px;
}

.loading-container { padding: 80px 0; text-align: center; color: #64b5ff; display: flex; flex-direction: column; align-items: center; gap: 20px; }
.loading-text { font-size: 14px; color: #8892b0; }
.no-result { text-align: center; color: #8892b0; padding: 60px 0; }
.truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.truncate-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

.atom-spinner, .atom-spinner * { box-sizing: border-box; }
.atom-spinner { height: 3.125rem; width: 3.125rem; overflow: hidden; }
.atom-spinner .spinner-inner { position: relative; display: block; height: 100%; width: 100%; }
.atom-spinner .spinner-circle { display: block; position: absolute; color: #ff1d5e; font-size: calc(3.75rem * 0.24); top: 50%; left: 50%; transform: translate(-50%, -50%); }
.atom-spinner .spinner-line { position: absolute; width: 100%; height: 100%; border-radius: 50%; border-left-width: calc(3.75rem / 5); border-top-width: calc(3.75rem / 25); border-left-color: #ff1d5e; border-left-style: solid; border-top-style: solid; border-top-color: transparent; }
.atom-spinner .spinner-line:nth-child(1) { animation: atom-spinner-animation-1 1s linear infinite; transform: rotateZ(120deg) rotateX(66deg) rotateZ(0deg); }
.atom-spinner .spinner-line:nth-child(2) { animation: atom-spinner-animation-2 1s linear infinite; transform: rotateZ(240deg) rotateX(66deg) rotateZ(0deg); }
.atom-spinner .spinner-line:nth-child(3) { animation: atom-spinner-animation-3 1s linear infinite; transform: rotateZ(360deg) rotateX(66deg) rotateZ(0deg); }

@keyframes atom-spinner-animation-1 { 100% { transform: rotateZ(120deg) rotateX(66deg) rotateZ(360deg); } }
@keyframes atom-spinner-animation-2 { 100% { transform: rotateZ(240deg) rotateX(66deg) rotateZ(360deg); } }
@keyframes atom-spinner-animation-3 { 100% { transform: rotateZ(360deg) rotateX(66deg) rotateZ(360deg); } }

@media (max-width: 768px) {
  .config-panel { width: 95%; height: 92vh; }
  .panel-header { padding: 24px 20px 20px; }
  .title-group h1 { font-size: 24px; }
  .close-btn { top: 24px; right: 20px; }
  .scrollable-content { padding: 0 20px 20px; }
  .panel-footer { padding: 20px; }
  .result-link { flex-direction: column; align-items: flex-start; gap: 10px; }
  .meta-info { width: 100%; justify-content: flex-end; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 10px; }
  .rank { width: 32px !important; display: block !important; font-weight: 800; color: rgba(100, 181, 255, 0.4); font-size: 20px; font-style: italic; }
}

:deep(.el-select) {
  width: 11rem !important;
}

:deep(.el-select__wrapper) {
  background-color: unset !important;
  border-radius: 2rem;
}
:deep(.el-select__placeholder) {
  color: #d5d5d5 !important;
}
</style>