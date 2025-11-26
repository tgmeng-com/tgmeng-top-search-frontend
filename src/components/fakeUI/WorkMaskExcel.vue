<template>
  <div class="work-mask">
    <!-- 顶部菜单 -->
    <div class="topbar" :style="excelCardTopStyle">
      <div
          v-for="(menu,index) in menus"
          :key="menu.name"
          class="menu-item"
          :class="{'active': index === activeMenuIndex}"
          @click="clickMenu(index)"
      >
        {{ menu.name }}
      </div>
      <el-collapse expand-icon-position="left" class="menu-item">
        <el-collapse-item>
          <template #title>
            <span class="text-gray-600" :style="excelCardTopStyle">
            自定义设置
            </span>&nbsp;
          </template>
          <div
              class="mb-2 overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div class="text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
            <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                分类名称：<el-input-number class="input-title" v-model="excelCategroiesTitleFontSize" :min="0.1" :max="2"
                                          size="small"
                                          :precision="3" :step="0.025" @change="changeExcelCategoriesTitleFontSize"/>
              </span>&nbsp;
              <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                分类加粗：<el-input-number class="input-title" v-model="excelCategroiesTitleFontWeight" :min="100"
                                          :max="900"
                                          size="small"
                                          :precision="0" :step="100" @change="changeExcelCategoriesTitleFontWeight"/>
            </span>&nbsp;
            </div>
            <div></div>
          </div>

          <div
              class="mb-2 overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div class="text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
            <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            平台名称：<el-input-number class="input-title" v-model="excelCardTopFontSize" :min="0.1" :max="2"
                                      size="small"
                                      :precision="3" :step="0.025" @change="changeExcelCardTopFontSize"/>
            </span>&nbsp;
              <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            平台加粗：<el-input-number class="input-title" v-model="excelCardTopFontWeight" :min="100" :max="900"
                                      size="small"
                                      :precision="0" :step="100" @change="changeExcelCardTopFontWeight"/>
            </span>&nbsp;
            </div>
            <div></div>
          </div>

          <div
              class="mb-2 overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div class="text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
            <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            热点标题：<el-input-number class="input-title" v-model="excelCardTitleFontSize" :min="0.1" :max="2"
                                      size="small"
                                      :precision="3" :step="0.025" @change="changeExcelCardTitleFontSize"/>
            </span>&nbsp;
              <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            热点加粗：<el-input-number class="input-title" v-model="excelCardTitleFontWeight" :min="100" :max="900"
                                      size="small"
                                      :precision="0" :step="100" @change="changeExcelCardTitleFontWeight"/>
            </span>&nbsp;
            </div>
            <div></div>
          </div>

          <div
              class="mb-2 overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div class="text-sm  whitespace-nowrap overflow-x-auto scrollbar-hide">
              <el-button @click="cleanExcelLocalStorage" size="small" type="danger" style="background-color: #f78989"
                         round>重置设置
              </el-button>
            </div>
            <div></div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="menu-item ml-auto text-xs" @click="handleClose">
        ESC/F9退出🐟
      </div>
    </div>

    <ExcelRibbonComponent :menuName="menus[activeMenuIndex].enName" @click="handleOpenImage"/>

    <!-- 悬浮图片 -->
    <div v-if="floatingImageVisible" class="floating-image-wrapper" @click.self="handleCloseImage">
      <div class="image-nav">
        <button @click.stop="handleOpenImage" class="nav-btn left-btn">&#8592;</button>
        <img :src="floatingImageUrl" class="floating-image fade-in-zoom" @click.stop/>
        <button @click.stop="handleOpenImage" class="nav-btn right-btn">&#8594;</button>
      </div>
    </div>

    <!-- 表格容器 - 添加 padding-bottom 为 sheet-tabs 留出空间 -->
    <div class="table-container" ref="tableContainer">
      <table>
        <thead>
        <!-- 列标题行 (A, B, C...) -->
        <tr class="column-header-row">
          <th class="column-header corner-cell"></th>
          <th
              v-for="(subCat, index) in (activeCategory?.subCategories ?? [])"
              :key="'col-' + index"
              :style="[{
                width: (colWidths[index] ?? 120) + 'px',
                minWidth: (colWidths[index] ?? 120) + 'px',
                maxWidth: (colWidths[index] ?? 120) + 'px'
              },excelCardTitleStyle]"
              class="column-header"
          >
            {{ getColumnLabel(index) }}
          </th>
        </tr>

        <!-- 原有的表头行 -->
        <tr>
          <th class="row-number" :style="[excelCardTopStyle]">序号</th>
          <th
              v-for="(subCat, index) in (activeCategory?.subCategories ?? [])"
              :key="subCat.title || index"
              :style="[{
                  width: (colWidths[index] ?? 120) + 'px',
                  minWidth: (colWidths[index] ?? 120) + 'px',
                  maxWidth: (colWidths[index] ?? 120) + 'px'
                },excelCardTopStyle]"
              class="resizable-th"
          >
            <div class="resizable-header">{{ subCat.title }}</div>
            <div
                class="resize-handle"
                @mousedown="startResize($event, index)"
            ></div>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr >
          <td class="row-number" :style="[excelCardTitleStyle]">状态</td>
          <td
              v-for="(subCat, index) in (activeCategory?.subCategories ?? [])"
              :key="'tip-' + (subCat.title || Math.random())"
              :style="[{
                width: (colWidths[index] ?? 120) + 'px',
                minWidth: (colWidths[index] ?? 120) + 'px',
                maxWidth: (colWidths[index] ?? 120) + 'px'
              },excelCardTitleStyle]"
          >
            <div v-if="subCat?.loading" >⏳ 正在加载…</div>
            <div v-else-if="!(subCat?.data) || subCat.data.length === 0">🚫 无数据</div>
            <div v-else>✅ 加载完成</div>
          </td>
        </tr>

        <tr v-for="rowIndex in rowCount" :key="rowIndex" class="text-left">
          <td class="row-number">{{ rowIndex }}</td>

          <td
              v-for="(subCat, index) in (activeCategory?.subCategories ?? [])"
              :key="rowIndex + '-' + (subCat.title || Math.random())"
              :style="[{
                width: (colWidths[index] ?? 120) + 'px',
                minWidth: (colWidths[index] ?? 120) + 'px',
                maxWidth: (colWidths[index] ?? 120) + 'px'
              },excelCardTitleStyle]"
          >
            <a
                v-if="subCat?.data && subCat.data[rowIndex - 1]"
                :href="subCat.data[rowIndex - 1].url"
                target="_blank"
                rel="noopener noreferrer"
                style="cursor: pointer"
            >
              {{ subCat.data[rowIndex - 1].keyword }}
            </a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Sheet 切换 - 固定在底部 -->
    <div class="sheet-tabs">
      <!-- 左侧导航按钮 -->
      <div class="sheet-nav-buttons">
        <button class="sheet-nav-btn" title="滚动到第一个工作表">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M8 2L4 5L8 8M5 2L1 5L5 8" stroke="#605e5c" stroke-width="1.5" fill="none"/>
          </svg>
        </button>
        <button class="sheet-nav-btn" title="向左滚动">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M7 2L3 5L7 8" stroke="#605e5c" stroke-width="1.5" fill="none"/>
          </svg>
        </button>
        <button class="sheet-nav-btn" title="向右滚动">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M3 2L7 5L3 8" stroke="#605e5c" stroke-width="1.5" fill="none"/>
          </svg>
        </button>
        <button class="sheet-nav-btn" title="滚动到最后一个工作表">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M2 2L6 5L2 8M5 2L9 5L5 8" stroke="#605e5c" stroke-width="1.5" fill="none"/>
          </svg>
        </button>
      </div>

      <!-- Sheet 标签容器 -->
      <div class="sheet-tabs-container">
        <button
            v-for="(cat) in (categroies ?? [])"
            v-show="cat.isShow"
            :key="cat.name"
            :class="['sheet-tab', { 'sheet-tab-active': activeCategory?.name === cat.name }]"
            @click="handleSheetCategoryClick(cat)"
            :style="excelCategroiesTitleStyle"
        >
          {{ cat.name }}
        </button>
      </div>

      <!-- 新建工作表按钮 -->
      <button class="sheet-add-btn" title="插入工作表">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path d="M6 1v10M1 6h10" stroke="#605e5c" stroke-width="1.5" fill="none"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import ExcelRibbonComponent from "@/components/fakeUI/ExcelRibbonComponent.vue";
import {
  LOCAL_STORAGE_KEYS,
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage
} from "@/utils/localStorageUtils";

export default {
  name: "WorkMaskExcel",
  components: {
    ExcelRibbonComponent
  },
  data() {
    return {
      activeMenuIndex: 0,
      menus: [
        {name: "开始", enName: "1"},
        {name: "插入", enName: "2"},
        {name: "页面", enName: "3"},
        {name: "公式", enName: "4"},
        {name: "数据", enName: "5"},
        {name: "审阅", enName: "6"},
        {name: "视图", enName: "7"},
        {name: "工具", enName: "8"},
        {name: "文件", enName: "9"},
        {name: "效率", enName: "10"},
        {name: "AI", enName: "11"}
      ],
      colWidths: [],
      resizingColIndex: null,
      startX: 0,
      startWidth: 0,
      floatingImageVisible: false,
      floatingImageUrl: null
    };
  },
  computed: {
    workMaskExcelShow: {
      get() {
        return this.$store.state.workMaskExcelShow;
      },
      set(value) {
        this.$store.commit('setWorkMaskExcelShow', value);
      }
    },
    categroies: {
      get() {
        return this.$store.state.categroies;
      },
      set(value) {
        this.$store.commit('setCategroies', value);
      }
    },
    activeCategory: {
      get() {
        return this.$store.state.activeCategory;
      },
      set(value) {
        this.$store.commit('setActiveCategory', value);
      }
    },
    excelCardTopFontSize: {
      get() {
        return this.$store.state.excelCardTopFontSize;
      },
      set(value) {
        this.$store.commit('setExcelCardTopFontSize', value);
      }
    },
    excelCardTopFontWeight: {
      get() {
        return this.$store.state.excelCardTopFontWeight;
      },
      set(value) {
        this.$store.commit('setExcelCardTopFontWeight', value);
      }
    },
    excelCardTitleFontSize: {
      get() {
        return this.$store.state.excelCardTitleFontSize;
      },
      set(value) {
        this.$store.commit('setExcelCardTitleFontSize', value);
      }
    },
    excelCardTitleFontWeight: {
      get() {
        return this.$store.state.excelCardTitleFontWeight;
      },
      set(value) {
        this.$store.commit('setExcelCardTitleFontWeight', value);
      }
    },
    excelCategroiesTitleFontSize: {
      get() {
        return this.$store.state.excelCategroiesTitleFontSize;
      },
      set(value) {
        this.$store.commit('setExcelCategroiesTitleFontSize', value);
      }
    },
    excelCategroiesTitleFontWeight: {
      get() {
        return this.$store.state.excelCategroiesTitleFontWeight;
      },
      set(value) {
        this.$store.commit('setExcelCategroiesTitleFontWeight', value);
      }
    },
    excelCardTitleStyle() {
      return {
        fontSize: this.excelCardTitleFontSize + 'rem',
        fontWeight: this.excelCardTitleFontWeight,
      }
    },
    excelCardTopStyle() {
      return {
        fontSize: this.excelCardTopFontSize + 'rem',
        fontWeight: this.excelCardTopFontWeight,
      }
    },
    excelCategroiesTitleStyle() {
      return {
        fontSize: this.excelCategroiesTitleFontSize + 'rem',
        fontWeight: this.excelCategroiesTitleFontWeight,
      }
    },
    rowCount() {
      const subs = this.activeCategory?.subCategories ?? [];
      if (!subs.length) return 0;
      let max = 0;
      for (let i = 0; i < subs.length; i++) {
        const len = subs[i]?.data?.length || 0;
        if (len > max) max = len;
      }
      return max;
    }
  },
  watch: {
    activeCategory: {
      immediate: true,
      handler(newVal, oldVal) {
        if (oldVal && newVal && oldVal.name === newVal.name) {
          return;
        }
        const subs = newVal?.subCategories ?? [];
        this.colWidths = new Array(subs.length).fill(300);
      }
    }
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyClose);
    window.addEventListener("keydown", this.handleImageNavigation);
    this.initializePlatforms();

    // 禁用 body 滚动
    document.body.style.overflow = 'hidden';
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeyClose);
    window.removeEventListener("keydown", this.handleImageNavigation);

    // 恢复 body 滚动
    document.body.style.overflow = '';
  },
  methods: {
    clickMenu(index) {
      this.activeMenuIndex = index;
    },
    handleClose() {
      this.$router.push({name: 'Home'});
    },
    handleKeyClose(e) {
      if (!this.floatingImageVisible) {
        if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27 || e.key === "F9") {
          this.handleClose()
        }
      } else {
        this.handleImageNavigation(e)
      }
    },
    handleImageNavigation(e) {
      if (!this.floatingImageVisible) return;
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          this.handleOpenImage();
          window.umami.track('Excel美图:')
          break;
        case 'Escape':
        case 'Esc':
          e.preventDefault();
          this.handleCloseImage();
          break;
      }
    },
    handleSheetCategoryClick(cat) {
      this.$emit("handleCategoryClick", cat);
    },
    handleOpenImage() {
      window.umami.track('Excel美图:')
      const randomNumber = Math.floor(Math.random() * 1032) + 1
      this.floatingImageUrl = require(`@/assets/image/girl/1 (${randomNumber}).jpg`);
      this.floatingImageVisible = true;
    },
    handleCloseImage() {
      this.floatingImageVisible = false;
    },
    startResize(e, colIndex) {
      e.preventDefault();
      e.stopPropagation();
      this.resizingColIndex = colIndex;
      this.startX = e.clientX;
      this.startWidth = this.colWidths[colIndex] ?? 100;

      const handleMouseMove = (moveEvent) => {
        if (this.resizingColIndex !== null) {
          moveEvent.preventDefault();
          moveEvent.stopPropagation();
          const delta = moveEvent.clientX - this.startX;
          const newWidth = Math.max(this.startWidth + delta, 40);
          this.colWidths[this.resizingColIndex] = newWidth;
        }
      };

      const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        this.resizingColIndex = null;
        document.body.style.userSelect = "";
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
    },
    changeExcelCardTopFontSize() {
      setLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CARD_TOP_FONT_SIZE, this.excelCardTopFontSize);
      window.umami.track('自定义excel卡片标题字体大小')
    },
    changeExcelCardTopFontWeight() {
      setLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CARD_TOP_FONT_WEIGHT, this.excelCardTopFontWeight);
      window.umami.track('自定义excel卡片标题字体粗细')
    },
    changeExcelCardTitleFontSize() {
      setLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CARD_TITLE_FONT_SIZE, this.excelCardTitleFontSize);
      window.umami.track('自定义excel热点标题字体大小')
    },
    changeExcelCardTitleFontWeight() {
      setLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CARD_TITLE_FONT_WEIGHT, this.excelCardTitleFontWeight);
      window.umami.track('自定义excel热点标题字体粗细')
    },
    changeExcelCategoriesTitleFontSize() {
      setLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CATEGORIES_TITLE_FONT_SIZE, this.excelCategroiesTitleFontSize);
      window.umami.track('自定义excel分类名称字体大小')
    },
    changeExcelCategoriesTitleFontWeight() {
      setLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CATEGORIES_TITLE_FONT_WEIGHT, this.excelCategroiesTitleFontWeight);
      window.umami.track('自定义excel分类名称字体粗细')
    },
    initializePlatforms() {
      const excelCategoriesTitleFontSize = getLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CATEGORIES_TITLE_FONT_SIZE)
      this.excelCategroiesTitleFontSize = excelCategoriesTitleFontSize ?? this.excelCategroiesTitleFontSize;
      const excelCategoriesTitleFontWeight = getLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CATEGORIES_TITLE_FONT_WEIGHT)
      this.excelCategroiesTitleFontWeight = excelCategoriesTitleFontWeight ?? this.excelCategroiesTitleFontWeight;
      const excelCardTopFontSize = getLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CARD_TOP_FONT_SIZE)
      this.excelCardTopFontSize = excelCardTopFontSize ?? this.excelCardTopFontSize;
      const excelCardTopFontWeight = getLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CARD_TOP_FONT_WEIGHT)
      this.excelCardTopFontWeight = excelCardTopFontWeight ?? this.excelCardTopFontWeight;
      const excelCardTitleFontSize = getLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CARD_TITLE_FONT_SIZE)
      this.excelCardTitleFontSize = excelCardTitleFontSize ?? this.excelCardTitleFontSize;
      const excelCardTitleFontWeight = getLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CARD_TITLE_FONT_WEIGHT)
      this.excelCardTitleFontWeight = excelCardTitleFontWeight ?? this.excelCardTitleFontWeight;
    },
    cleanExcelLocalStorage() {
      this.$confirm('此操作将清除Excel摸鱼设置中的所有个人设置', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        clearLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CATEGORIES_TITLE_FONT_SIZE);
        clearLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CATEGORIES_TITLE_FONT_WEIGHT);
        clearLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CARD_TOP_FONT_SIZE);
        clearLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CARD_TOP_FONT_WEIGHT);
        clearLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CARD_TITLE_FONT_SIZE);
        clearLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CARD_TITLE_FONT_WEIGHT);
        this.$message({
          type: 'success',
          message: '已重置，请刷新页面重新加载!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    // 生成列标签 (A, B, C, ..., Z, AA, AB, ...)
    getColumnLabel(index) {
      let label = '';
      let num = index;
      while (num >= 0) {
        label = String.fromCharCode(65 + (num % 26)) + label;
        num = Math.floor(num / 26) - 1;
      }
      return label;
    }
  }
};
</script>

<style scoped>
.work-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f3f3f3;
  z-index: 1999;
  display: flex;
  flex-direction: column;
  font-family: "Arial", sans-serif;
}

.topbar {
  display: flex;
  align-items: center;
  background: #e3e3e3;
  padding: 4px 8px;
  border-bottom: 1px solid #ccc;
  z-index: 100;
  overflow-x: auto;
  overflow-y: hidden;
  flex-wrap: nowrap; /* 确保不换行 */

  /* 关键：Excel 风格滚动条 */
  scrollbar-width: auto;
  scrollbar-color: #c1c1c1 #e3e3e3;
}

/* 确保在小屏幕下也不换行 */
@media (max-width: 640px) {
  .topbar {
    flex-wrap: nowrap !important;
    white-space: nowrap;
  }

  .menu-item {
    white-space: nowrap;
    flex-shrink: 0; /* 防止菜单项被压缩 */
  }
}

.topbar::-webkit-scrollbar {
  height: 17px;                     /* Excel 经典高度 */
}

.topbar::-webkit-scrollbar-track {
  background: #e3e3e3;
  border-top: 1px solid #d4d4d4;
  box-shadow: inset 0 1px 0 #f1f1f1;
}

.topbar::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border: 1px solid #a6a6a6;
  border-top-color: #d4d4d4;
  border-left-color: #d4d4d4;
  min-width: 50px;
}

.topbar::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
  border-color: #8c8c8c;
}

.topbar::-webkit-scrollbar-thumb:active {
  background: #787878;
  border-color: #696969;
}

/* 左右箭头按钮（Excel 经典小三角） */
.topbar::-webkit-scrollbar-button:horizontal:decrement {
  background:
      #e3e3e3
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='10' viewBox='0 0 6 10'%3E%3Cpath fill='%23605e5c' d='M5 1L1 5l4 4z'/%3E%3C/svg%3E")
      center center no-repeat;
  border-right: 1px solid #d4d4d4;
  width: 17px;
}

.topbar::-webkit-scrollbar-button:horizontal:increment {
  background:
      #e3e3e3
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='10' viewBox='0 0 6 10'%3E%3Cpath fill='%23605e5c' d='M1 1l4 4-4 4z'/%3E%3C/svg%3E")
      center center no-repeat;
  border-left: 1px solid #d4d4d4;
  width: 17px;
}

.topbar::-webkit-scrollbar-button:horizontal:decrement:hover,
.topbar::-webkit-scrollbar-button:horizontal:increment:hover {
  background-color: #d4d4d4;
}

.topbar::-webkit-scrollbar-button:horizontal:decrement:active,
.topbar::-webkit-scrollbar-button:horizontal:increment:active {
  background-color: #c1c1c1;
}

/* 隐藏垂直滚动条（顶部菜单不需要） */
.topbar::-webkit-scrollbar:vertical {
  display: none;
}

/* Firefox 兼容 */
.topbar {
  scrollbar-width: auto;
  scrollbar-color: #c1c1c1 #e3e3e3;
}
.menu-item {
  position: relative;
  padding: 2px 8px;
  margin-right: 4px;
  cursor: pointer;
}

.menu-item.active {
  color: green;
  font-weight: bold;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 6px;
  background-color: white;
}

.menu-item:hover {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 6px;
}

/* Sheet 标签固定在底部 */
.sheet-tabs {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  background: #f3f3f3;
  border-top: 1px solid #d4d4d4;
  height: 28px;
  z-index: 10;
  gap: 2px;
  padding: 0 4px;
}

/* 左侧导航按钮组 */
.sheet-nav-buttons {
  display: flex;
  align-items: center;
  gap: 1px;
  padding-right: 8px;
  border-right: 1px solid #d4d4d4;
}

.sheet-nav-btn {
  width: 18px;
  height: 18px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  transition: background 0.15s;
}

.sheet-nav-btn:hover {
  background: #e1e1e1;
}

.sheet-nav-btn:active {
  background: #d4d4d4;
}

/* Sheet 标签容器 */
.sheet-tabs-container {
  flex: 1;
  display: flex;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 2px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.sheet-tabs-container::-webkit-scrollbar {
  display: none;
}

/* 单个 Sheet 标签 */
.sheet-tab {
  padding: 4px 16px;
  border: none;
  background: #fff;
  color: #323130;
  cursor: pointer;
  font-size: 11px;
  white-space: nowrap;
  border-radius: 4px 4px 0 0;
  transition: all 0.15s;
  position: relative;
  border: 1px solid transparent;
  border-bottom: none;
  min-width: 60px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sheet-tab:hover:not(.sheet-tab-active) {
  background: #e8e8e8;
}

.sheet-tab-active {
  background: #fff;
  color: #107c10;
  font-weight: 600 !important;
  border: 1px solid #d4d4d4;
  border-bottom: 1px solid #fff;
  margin-bottom: -1px;
  z-index: 1;
}

/* 新建工作表按钮 */
.sheet-add-btn {
  width: 18px;
  height: 18px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  transition: background 0.15s;
  margin-left: 4px;
}

.sheet-add-btn:hover {
  background: #e1e1e1;
}

.sheet-add-btn:active {
  background: #d4d4d4;
}

.sheet-btn {
  padding: 2px 8px;
  margin-right: 2px;
  border: 1px solid #aaa;
  cursor: pointer;
  font-size: 12px;
}

/* 表格容器需要为底部 sheet 标签留出空间 */
.table-container {
  flex: 1;
  overflow: auto;
  padding-bottom: 32px; /* 为底部固定的 sheet-tabs 留出空间 */
}

table {
  border-collapse: collapse;
  width: auto;
  table-layout: auto;
}

th, td {
  border: 1px solid #ccc;
  padding: 4px 6px;
  font-size: 12px;
  white-space: nowrap;
}

td {
  position: relative;
}

td a {
  display: inline-block;
  max-width: calc(100% - 10px);
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: auto;
}

th {
  background: #ddd;
  position: sticky;
  top: 0;
  z-index: 1;
  font-weight: 600;
}

/* 列标题行样式 (A, B, C...) */
.column-header-row {
  height: 20px;
}

.column-header {
  background: #f0f0f0 !important;
  color: #323130;
  font-size: 11px;
  font-weight: 400;
  text-align: center;
  padding: 2px 4px !important;
  border: 1px solid #d4d4d4;
  position: sticky;
  top: 0;
  z-index: 2;
}

.corner-cell {
  background: #f0f0f0 !important;
  border: 1px solid #d4d4d4;
  width: 60px;
  position: sticky;
  left: 0;
  z-index: 3;
}

.resizable-th {
  padding-right: 12px;
  position: sticky;
  top: 20px;
  z-index: 1;
}

.resize-handle {
  position: absolute;
  top: 0;
  right: -1px;
  width: 12px;
  height: 100%;
  cursor: col-resize;
  z-index: 100;
  pointer-events: auto;
  user-select: none;
  touch-action: none;
}

.resize-handle:hover {
  background: rgba(66, 133, 244, 0.5);
  border-right: 2px solid #4285f4;
}

.row-number {
  text-align: center;
  font-weight: bold;
}

.resizable-header {
  user-select: none;
}

.floating-image-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50000;
  cursor: pointer;
  animation: fadeIn 0.5s ease-out;
}

.floating-image {
  max-width: 80%;
  max-height: 80%;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.floating-image-wrapper .floating-image {
  animation: fadeInZoom 0.5s ease-out;
}

@keyframes fadeInZoom {
  0% {
    opacity: 0;
    transform: scale(0.7);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.image-nav {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 20px;
  transition: background 0.3s;
}

.nav-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.floating-image {
  max-width: 80%;
  max-height: 80%;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  margin: 0 10px;
}

@keyframes fadeInOut {
  0%, 100% {
    opacity: 0;
    transform: translateY(10px);
  }
  20%, 80% {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.el-collapse-item__header) {
  height: 20px !important;
  border: none !important;
}

:deep(.el-collapse-item__wrap) {
  margin-top: 10px !important;
}

/* Excel 风格滚动条 */
.table-container::-webkit-scrollbar {
  width: 17px;
  height: 17px;
}

.table-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border: 1px solid #d4d4d4;
}

.table-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border: 1px solid #a6a6a6;
  border-radius: 0;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.table-container::-webkit-scrollbar-thumb:active {
  background: #787878;
}

.table-container::-webkit-scrollbar-corner {
  background: #f1f1f1;
  border: 1px solid #d4d4d4;
}

/* 滚动条按钮 */
.table-container::-webkit-scrollbar-button {
  background: #f1f1f1;
  border: 1px solid #d4d4d4;
  display: block;
  height: 17px;
  width: 17px;
}

.table-container::-webkit-scrollbar-button:hover {
  background: #e5e5e5;
}

.table-container::-webkit-scrollbar-button:active {
  background: #d4d4d4;
}

/* 垂直滚动条上箭头 */
.table-container::-webkit-scrollbar-button:vertical:decrement {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%23605e5c' d='M5 0L0 6h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
}

/* 垂直滚动条下箭头 */
.table-container::-webkit-scrollbar-button:vertical:increment {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%23605e5c' d='M5 6L0 0h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
}

/* 水平滚动条左箭头 */
.table-container::-webkit-scrollbar-button:horizontal:decrement {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='10' viewBox='0 0 6 10'%3E%3Cpath fill='%23605e5c' d='M0 5L6 0v10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
}

/* 水平滚动条右箭头 */
.table-container::-webkit-scrollbar-button:horizontal:increment {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='10' viewBox='0 0 6 10'%3E%3Cpath fill='%23605e5c' d='M6 5L0 0v10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
}

/* Firefox 滚动条样式 */
.table-container {
  scrollbar-width: auto;
  scrollbar-color: #c1c1c1 #f1f1f1;
}
</style>