<template>
  <div class="work-mask">
    <!-- 顶部菜单 -->
    <div class="topbar">
      <div
          v-for="(menu,index) in menus"
          :key="menu.name"
          class="menu-item"
          :class="{'active': index === activeMenuIndex}"
          @click="clickMenu(index)"
      >
        {{ menu.name }}
      </div>
      <div class="menu-item ml-auto text-xs" @click="handleClose">
        🚫ESC/F9退出摸鱼小达人
      </div>
    </div>

    <ExcelRibbonComponent :menuName="menus[activeMenuIndex].enName" @click="handleOpenImage"/>

    <!-- 悬浮图片 -->
    <div v-if="floatingImageVisible" class="floating-image-wrapper" @click.self="handleCloseImage">
      <div class="image-nav">
        <button @click.stop="handleOpenImage" class="nav-btn left-btn">&#8592;</button> <!-- 左箭头 -->
        <img :src="floatingImageUrl" class="floating-image fade-in-zoom" @click.stop/>
        <button @click.stop="handleOpenImage" class="nav-btn right-btn">&#8594;</button> <!-- 右箭头 -->
      </div>
    </div>

    <el-collapse expand-icon-position="left">
      <el-collapse-item>
        <!-- 自定义按钮作为标题，点击按钮展开/折叠内容 -->
        <template #title>
            <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-400 text-gray-600 dark:text-gray-100">
            👉🏻点击展开样式自定义设置👈🏻
            </span>&nbsp;
        </template>
        <div
            class="mb-2 overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <!-- 左侧：统计数据（移动端换行显示） -->
          <div class="text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
            <!-- 自定义分类字体大小-->
            <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                分类名称：<el-input-number class="input-title" v-model="excelCategroiesTitleFontSize" :min="0.1" :max="2"
                                          size="small"
                                          :precision="3" :step="0.025" @change="changeExcelCategoriesTitleFontSize"/>
              </span>&nbsp;
            <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                分类加粗：<el-input-number class="input-title" v-model="excelCategroiesTitleFontWeight" :min="100" :max="900"
                                          size="small"
                                          :precision="0" :step="100" @change="changeExcelCategoriesTitleFontWeight"/>
            </span>&nbsp;
          </div>
          <!-- 右侧：更新时间（移动端换行显示） -->
          <div>
          </div>
        </div>

        <!-- 用户样式自定义调整   -->
        <div
            class="mb-2 overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <!-- 左侧：统计数据（移动端换行显示） -->
          <div class="text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
            <!-- 自定义卡片标题字体大小-->
            <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            平台名称：<el-input-number class="input-title" v-model="excelCardTopFontSize" :min="0.1" :max="2" size="small"
                                      :precision="3" :step="0.025" @change="changeExcelCardTopFontSize"/>
            </span>&nbsp;
            <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            平台加粗：<el-input-number class="input-title" v-model="excelCardTopFontWeight" :min="100" :max="900" size="small"
                                      :precision="0" :step="100" @change="changeExcelCardTopFontWeight"/>
            </span>&nbsp;
          </div>
          <!-- 右侧：更新时间（移动端换行显示） -->
          <div>
          </div>
        </div>

        <!-- 用户样式自定义调整   -->
        <div
            class="mb-2 overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <!-- 左侧：统计数据（移动端换行显示） -->
          <div class="text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
            <!-- 自定义标题字体大小-->
            <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            热点标题：<el-input-number class="input-title" v-model="excelCardTitleFontSize" :min="0.1" :max="2" size="small"
                                      :precision="3" :step="0.025" @change="changeExcelCardTitleFontSize"/>
            </span>&nbsp;

            <!-- 自定义热点标题是否完整显示-->
            <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            热点加粗：<el-input-number class="input-title" v-model="excelCardTitleFontWeight" :min="100" :max="900" size="small"
                                      :precision="0" :step="100" @change="changeExcelCardTitleFontWeight"/>
            </span>&nbsp;
          </div>
          <!-- 右侧：更新时间（移动端换行显示） -->
          <div>
          </div>
        </div>

        <!-- 用户样式自定义调整   -->
        <div
            class="mb-2 overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <!-- 左侧：统计数据（移动端换行显示） -->
          <div class="text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
            <el-button @click="cleanExcelLocalStorage" size="small" type="danger" round>重置设置</el-button>
          </div>
          <!-- 右侧：更新时间（移动端换行显示） -->
          <div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>


    <!-- Sheet 切换 -->
    <div class="sheet-tabs">
      <div class="whitespace-nowrap overflow-x-auto scrollbar-hide">
        <button
            v-for="(cat) in (categroies ?? [])"
            v-show="cat.isShow"
            :key="cat.name"
            :class="['sheet-btn', (activeCategory?.name === cat.name)
            ? 'bg-primary text-white'
            : 'bg-gray-200 text-red hover:shadow-md transition-shadow']"
            @click="handleSheetCategoryClick(cat)"
            :style="excelCategroiesTitleStyle"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>

    <!-- 表格 -->
    <div class="table-container" ref="tableContainer">
      <table>
        <thead>
        <tr>
          <th class="row-number" style="width: 60px">序号</th>
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
        <tr>
          <td class="row-number">提示</td>
          <td
              v-for="(subCat, index) in (activeCategory?.subCategories ?? [])"
              :key="'tip-' + (subCat.title || Math.random())"
              :style="{
                width: (colWidths[index] ?? 120) + 'px',
                minWidth: (colWidths[index] ?? 120) + 'px',
                maxWidth: (colWidths[index] ?? 120) + 'px'
              }"
          >
            <div v-if="subCat?.loading" class="text-gray-500">⏳ 正在加载…</div>
            <div v-else-if="!(subCat?.data) || subCat.data.length === 0" class="text-gray-400">🚫 无数据</div>
            <div v-else>✅ 加载完成</div>
          </td>
        </tr>

        <!-- 动态行数：根据每一列的数据长度动态计算最大行数并渲染 -->
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
            <!-- 空单元格保持为空 -->
          </td>
        </tr>

        </tbody>
      </table>
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
    // 平台字体样式
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
    // 标题字体样式
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
    // 分类字体样式
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
    // 汇总样式
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

    // 动态计算应渲染的行数（取所有列中数据长度的最大值）
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
        // 只在真正切换分类时重新初始化列宽
        // 如果只是数据更新（name 相同），保持原有列宽
        if (oldVal && newVal && oldVal.name === newVal.name) {
          return; // 同一个分类，不重置列宽
        }

        // 初始化列宽：根据标题长度自适应
        const subs = newVal?.subCategories ?? [];
        // this.colWidths = subs.map(sub => {
        //   let resultWidth = 120;
        //   sub.data.map(data => {
        //         // const dataKeyWordWidth = (data?.keyword || '').length * 16;
        //         const dataKeyWordWidth = getTextWidthFromDOM(data?.keyword || '')
        //         resultWidth = Math.max(dataKeyWordWidth, 120);
        //       }
        //   )
        //   return resultWidth;
        // });
        this.colWidths = new Array(subs.length).fill(300);

      }
    }
  },
  mounted() {
    // 监听键盘关闭（ESC / F9）
    window.addEventListener("keydown", this.handleKeyClose);
    // 监听图片浏览键盘事件
    window.addEventListener("keydown", this.handleImageNavigation);
    this.initializePlatforms();
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeyClose);
    window.removeEventListener("keydown", this.handleImageNavigation);
  },
  methods: {
    clickMenu(index) {
      this.activeMenuIndex = index;
    },
    handleClose() {
      // this.workMaskExcelShow = false;
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
    // 图片键盘导航
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
      // 切换分类时把 activeCategory 同步设置（由你 Vuex 的 mutation 控制）
      this.$emit("handleCategoryClick", cat);
      // 如果你希望组件内部直接切换 Vuex activeCategory，可以使用：
      // this.activeCategory = cat;
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

      // 直接在这里处理，不调用其他方法
      const handleMouseMove = (moveEvent) => {
        if (this.resizingColIndex !== null) {
          moveEvent.preventDefault();
          moveEvent.stopPropagation();

          const delta = moveEvent.clientX - this.startX;
          const newWidth = Math.max(this.startWidth + delta, 40);

          // Vue 3 直接修改数组即可
          this.colWidths[this.resizingColIndex] = newWidth;
        }
      };

      const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);

        this.resizingColIndex = null;
        document.body.style.userSelect = "";
        // document.body.style.cursor = "";  // 先注释掉看看
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      // 禁止文本选中，避免拖动时选中页面文本
      document.body.style.userSelect = "none";
      // document.body.style.cursor = "col-resize";  // 先注释掉看看
    },
    // 自定义调整卡片顶部字体大小
    // 自定义调整excel卡片顶部字体大小
    changeExcelCardTopFontSize() {
      setLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CARD_TOP_FONT_SIZE, this.excelCardTopFontSize);
      window.umami.track('自定义excel卡片标题字体大小')
    },
    changeExcelCardTopFontWeight() {
      setLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CARD_TOP_FONT_WEIGHT, this.excelCardTopFontWeight);
      window.umami.track('自定义excel卡片标题字体粗细')
    },
    // 自定义调整excel热点标题字体大小
    changeExcelCardTitleFontSize() {
      setLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CARD_TITLE_FONT_SIZE, this.excelCardTitleFontSize);
      window.umami.track('自定义excel热点标题字体大小')
    },
    changeExcelCardTitleFontWeight() {
      setLocalStorage(LOCAL_STORAGE_KEYS.EXCEL_CARD_TITLE_FONT_WEIGHT, this.excelCardTitleFontWeight);
      window.umami.track('自定义excel热点标题字体粗细')
    },
    // 自定义调整excel分类名称字体大小
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


.sheet-tabs {
  display: flex;
  background: #ddd;
  padding: 2px 4px;
  border-bottom: 1px solid #bbb;
}

.sheet-btn {
  padding: 2px 8px;
  margin-right: 2px;
  border: 1px solid #aaa;
  cursor: pointer;
  font-size: 12px;
}

.table-container {
  flex: 1;
  overflow: auto;
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
}

.resizable-th {
  padding-right: 12px;
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

/* 淡入 + 缩放动画 */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.5); /* 初始缩小 */
  }
  100% {
    opacity: 1;
    transform: scale(1); /* 最终大小 */
  }
}

.floating-image-wrapper .floating-image {
  animation: fadeInZoom 0.5s ease-out;
}

@keyframes fadeInZoom {
  0% {
    opacity: 0;
    transform: scale(0.7); /* 初始缩放 */
  }
  100% {
    opacity: 1;
    transform: scale(1); /* 最终大小 */
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
  margin-top:10px !important;
}

</style>