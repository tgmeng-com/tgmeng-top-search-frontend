<template>
  <el-collapse expand-icon-position="left">
    <el-collapse-item>
      <template #title>
        <span class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
          👉🏻点击展开样式自定义设置👈🏻
        </span>
      </template>

      <div class="flex justify-center mb-4">
        <div class="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <button
              @click="mainActiveTab = 'style'"
              :class="[
              'px-4 py-1 text-xs rounded-md transition-all',
              mainActiveTab === 'style' ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-800 dark:text-gray-100' : 'text-gray-400'
            ]"
          >
            样式微调
          </button>
          <button
              @click="mainActiveTab = 'platforms'"
              :class="[
              'px-4 py-1 text-xs rounded-md transition-all',
              mainActiveTab === 'platforms' ? 'bg-white dark:bg-gray-600 shadow-sm text-gray-800 dark:text-gray-100' : 'text-gray-400'
            ]"
          >
            平台管理
          </button>
        </div>
      </div>

      <div v-if="mainActiveTab === 'style'">
        <div
            v-for="(group, index) in settingsGroups"
            :key="index"
            class="mb-2 overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
        >
          <div class="text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide"
               style="line-height: 0.1rem"
               :class="group.class">
            <template v-for="setting in group.items" :key="setting.key">
              <span v-if="setting.type === 'number'"
                    class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                {{ setting.label }}：
                <el-input-number
                    :class="setting.inputClass || 'input-title'"
                    v-model="settings[setting.key]"
                    :min="setting.min"
                    :max="setting.max"
                    :precision="setting.precision || 0"
                    :step="setting.step || 1"
                    size="small"
                    @change="handleChange(setting)"
                />
              </span>

              <span v-else-if="setting.type === 'switch'"
                    class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                {{ setting.label }}：
                <el-switch
                    v-model="settings[setting.key]"
                    :active-value="setting.activeValue"
                    :inactive-value="setting.inactiveValue"
                    size="small"
                    @change="handleChange(setting)"
                />
              </span>

              <span v-else-if="setting.type === 'select'"
                    class="text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                {{ setting.label }}：
                <el-select
                    v-model="settings[setting.key]"
                    placeholder="Select"
                    style="width: 3.5rem"
                    size="small"
                    @change="handleChange(setting)"
                >
                  <el-option
                      v-for="item in setting.options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                  />
                </el-select>
              </span>

              <span v-else-if="setting.type === 'tags'"
                    class="text-xs px-2 py-0.5 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex"
                    :class="setting.class">
                {{ setting.label }}：
                <el-input-tag
                    v-model="settings[setting.key]"
                    :tag-type="setting.tagType || 'success'"
                    :tag-effect="setting.tagEffect || 'dark'"
                    clearable
                    size="small"
                    @change="handleChange(setting)"
                    :placeholder="setting.placeholder"
                >
                  <template #tag="{ value }">
                    <div class="flex items-center">
                      <el-icon class="mr-1">
                        <ElementPlus/>
                      </el-icon>
                      <span>{{ value }}</span>
                    </div>
                  </template>
                </el-input-tag>
              </span>
              &nbsp;
            </template>
          </div>
          <div></div>
        </div>
      </div>

      <div v-else>
        <el-tabs v-model="activeCategoryName" class="platform-tabs">
          <el-tab-pane
              v-for="cat in categories.filter(item => item.id !== -1)"
              :key="cat.name"
              :name="cat.name"
              :label="cat.name"
          >
            <div v-if="activeCategoryName === cat.name" class="flex flex-wrap gap-2 mt-2">
              <div
                  v-for="p in cat.subCategories"
                  :key="p.title"
                  class="text-xs px-2 py-0.5 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center"
              >
                <img :src="p.logo" class="w-4 h-4 rounded-sm" :alt="p.title">&nbsp;
                {{ p.title }}：
                <el-switch
                    v-model="p.isShow"
                    active-color="#13ce66"
                    inactive-color="#C0CCDA"
                    size="small"
                    @change="changeCategoryStatus"
                />
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <div
          class="mt-4 mb-2 overflow-x-auto scrollbar-hide flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div class="text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-x-auto scrollbar-hide">
          <el-button @click="handleReset" size="small" type="danger" style="background-color: #f78989" round>
            重置设置
          </el-button>
        </div>
        <div></div>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import {getLocalStorage, setLocalStorage, clearLocalStorage, LOCAL_STORAGE_KEYS} from "@/utils/localStorageUtils";

export default {
  name: 'SettingsPanel',
  props: {
    categories: { type: Array, default: () => [] }
  },
  data() {
    return {
      mainActiveTab: 'style',
      activeCategoryName: '新闻',
      settings: {},
      settingsGroups: [
        /* 这里保持你原来的 settingsGroups 数组内容，不作变动 */
        {
          class: 'text-left',
          items: [
            { key: 'widthPadding', type: 'number', label: '边距缩进', min: 10, max: 100, step: 5, storageKey: LOCAL_STORAGE_KEYS.WIDTH_PADDING, storeKey: 'widthPadding', umamiEvent: '自定义边距缩放' },
            { key: 'topCarouselFontShow', type: 'switch', label: '轮播字体展示', storageKey: LOCAL_STORAGE_KEYS.TOP_CAROUSE_FONT_SHOW, storeKey: 'topCarouselFontShow', umamiEvent: '自定义轮播字体展示' },
            { key: 'wordCloudNum', type: 'number', label: '词云数量', min: 50, max: 1000, step: 50, storageKey: LOCAL_STORAGE_KEYS.WORD_CLOUD_NUM, storeKey: 'wordCloudNum', umamiEvent: '自定义词云数量' },
            { key: 'wordCloudShow', type: 'switch', label: '词云模块展示', storageKey: LOCAL_STORAGE_KEYS.WORD_CLOUD_SHOW, storeKey: 'wordCloudShow', umamiEvent: '自定义词云是否展示' },
            { key: 'pageViewsShow', type: 'switch', label: '访问展示', storageKey: LOCAL_STORAGE_KEYS.PAGE_VIEWS_SHOW, storeKey: 'pageViewsShow', umamiEvent: '自定义访问量是否展示' }
          ]
        },
        {
          items: [
            { key: 'categroiesTitleFontSize', type: 'number', label: '分类名称', min: 0.1, max: 2, precision: 3, step: 0.025, storageKey: LOCAL_STORAGE_KEYS.CATEGORIES_TITLE_FONT_SIZE, storeKey: 'categroiesTitleFontSize', umamiEvent: '自定义分类名称字体大小' },
            { key: 'defaultCategoryId', type: 'select', label: '默认分类', options: this.categories, storageKey: LOCAL_STORAGE_KEYS.DEFAULT_CATEGORY_ID, storeKey: 'defaultCategoryId', umamiEvent: '自定义默认选中的分类id' },
            { key: 'categroiesDraggable', type: 'switch', label: '分类拖动', storageKey: LOCAL_STORAGE_KEYS.CATEGORIES_DRAGGABLE, storeKey: 'categroiesDraggable', umamiEvent: '自定义分类是否可以拖动' },
            { key: 'categroiesRssIconShow', type: 'switch', label: '分类RSS', storageKey: LOCAL_STORAGE_KEYS.CATEGORIES_RSS_ICON_SHOW, storeKey: 'categroiesRssIconShow', umamiEvent: '自定义分类是否可以拖动' }
          ]
        },
        {
          items: [
            { key: 'cardTitleFontSize', type: 'number', label: '热点标题', min: 0.1, max: 2, precision: 3, step: 0.025, storageKey: LOCAL_STORAGE_KEYS.CARD_TITLE_FONT_SIZE, storeKey: 'cardTitleFontSize', umamiEvent: '自定义热点标题字体大小' },
            { key: 'cardHotTitleFull', type: 'switch', label: '热点标题完整', storageKey: LOCAL_STORAGE_KEYS.CARD_HOT_TITLE_FULL, storeKey: 'cardHotTitleFull', umamiEvent: '自定义热点标题是否完整显示' },
            { key: 'cardHotScoreShow', type: 'switch', label: '热点热度', storageKey: LOCAL_STORAGE_KEYS.CARD_HOT_SCORE_SHOW, storeKey: 'cardHotScoreShow', umamiEvent: '自定义热点热度值是否显示' }
          ]
        },
        {
          items: [
            { key: 'cardTopFontSize', type: 'number', label: '卡片名称', min: 0.1, max: 2, precision: 3, step: 0.025, storageKey: LOCAL_STORAGE_KEYS.CARD_TOP_FONT_SIZE, storeKey: 'cardTopFontSize', umamiEvent: '自定义卡片标题字体大小' },
            { key: 'cardTitleFull', type: 'switch', label: '卡片标题完整', storageKey: LOCAL_STORAGE_KEYS.CARD_TITLE_FULL, storeKey: 'cardTitleFull', umamiEvent: '自定义卡片标题是否完整显示' },
            { key: 'cardTimeShow', type: 'switch', label: '卡片时间', storageKey: LOCAL_STORAGE_KEYS.CARD_TIME_SHOW, storeKey: 'cardTimeShow', umamiEvent: '自定义卡片时间是否显示' },
            { key: 'cardDraggable', type: 'switch', label: '卡片拖动', storageKey: LOCAL_STORAGE_KEYS.CARD_DRAGGABLE, storeKey: 'cardDraggable', umamiEvent: '自定义卡片是否可以拖动' },
            { key: 'cardCols', type: 'number', label: '卡片列', inputClass: 'input-cols', min: 1, max: 6, storageKey: LOCAL_STORAGE_KEYS.CARD_COLS, storeKey: 'cardCols', umamiEvent: '自定义卡片列数' },
            { key: 'cardHeight', type: 'number', label: '卡片高', inputClass: 'input-height', min: 1, max: 500, storageKey: LOCAL_STORAGE_KEYS.CARD_HEIGHT, storeKey: 'cardHeight', umamiEvent: '自定义卡片高度' },
            { key: 'cardListLimit', type: 'number', label: '热点个数', min: 3, max: 200, step: 5, storageKey: LOCAL_STORAGE_KEYS.CARD_LIST_LIMIT, storeKey: 'cardListLimit', umamiEvent: '自定义卡片列表数' },
            { key: 'cardHorizontalScrolling', type: 'switch', label: '卡片横向滚动(移动端)', activeValue: 'horizontal', inactiveValue: 'vertical', storageKey: LOCAL_STORAGE_KEYS.CARD_HORIZONTAL_SCROLLING, storeKey: 'cardHorizontalScrolling', umamiEvent: '自定义卡片移动端横向滚动' },
            { key: 'cardWidthForPhone', type: 'number', label: '卡片宽(移动端横向)', inputClass: 'input-height', min: 10, max: 100, step: 5, storageKey: LOCAL_STORAGE_KEYS.CARD_WIDTH_FOR_PHONE, storeKey: 'cardWidthForPhone', umamiEvent: '自定义卡片宽度' }
          ]
        },
        {
          items: [
            { key: 'suddenDescShow', type: 'switch', label: '突发热点顶部说明', storageKey: LOCAL_STORAGE_KEYS.SUDDEN_DESC_SHOW, storeKey: 'suddenDescShow', umamiEvent: '自定义突发热点顶部说明是否显示' },
            { key: 'aiModeDesc', type: 'switch', label: 'AI模式顶部说明', storageKey: LOCAL_STORAGE_KEYS.AI_MODE_DESC, storeKey: 'aiModeDesc', umamiEvent: '自定义AI模式顶部说明是否显示' },
            { key: 'aiModeBigModalDesc', type: 'switch', label: 'AI模式顶部大模型说明', storageKey: LOCAL_STORAGE_KEYS.AI_MODE_BIG_MODAL_DESC, storeKey: 'aiModeBigModalDesc', umamiEvent: '自定义AI模式大模型说明是否显示' }
          ]
        },
        {
          items: [
            { key: 'includeWord', type: 'tags', label: '包含关键词', tagType: 'success', placeholder: '输入要包含的关键词', storageKey: LOCAL_STORAGE_KEYS.INCLUDE_WORD, storeKey: 'includeWord', umamiEvent: '🔓添加过滤关键字包含', needsRefresh: true }
          ]
        },
        {
          items: [
            { key: 'unincludeWord', type: 'tags', label: '排除关键词', class: '', tagType: 'danger', placeholder: '输入要过滤的关键词', storageKey: LOCAL_STORAGE_KEYS.UNINCLUDE_WORD, storeKey: 'unincludeWord', umamiEvent: '🔒添加过滤关键字排除', needsRefresh: true }
          ]
        }
      ]
    };
  },
  mounted() { this.initSettings(); },
  methods: {
    initSettings() {
      this.settingsGroups.forEach(group => {
        group.items.forEach(setting => {
          const storeValue = this.$store?.state?.[setting.storeKey];
          const cachedValue = getLocalStorage(setting.storageKey);
          this.settings[setting.key] = cachedValue !== null && cachedValue !== undefined ? cachedValue : storeValue;
          if (cachedValue !== null && cachedValue !== undefined) this.syncToStore(setting);
        });
      });
    },
    changeCategoryStatus() {
      const cloned = JSON.parse(JSON.stringify(this.categories));
      cloned.forEach(cat => cat.subCategories.forEach(sub => {
        sub.data = null; sub.api = null; sub.logo = null; sub.updateTime = ''; sub.loading = true;
      }));
      setLocalStorage(LOCAL_STORAGE_KEYS.CATEGORIES, cloned);
    },
    handleChange(setting) {
      const value = this.settings[setting.key];
      setLocalStorage(setting.storageKey, value);
      if (setting.umamiEvent) window.umami?.track(setting.umamiEvent);
      this.syncToStore(setting);
      this.$emit('setting-changed', {key: setting.key, value: value, needsRefresh: setting.needsRefresh});
    },
    syncToStore(setting) {
      const mutationName = 'set' + setting.storeKey.charAt(0).toUpperCase() + setting.storeKey.slice(1);
      if (this.$store?.commit) this.$store.commit(mutationName, this.settings[setting.key]);
    },
    handleReset() {
      this.$confirm('确定重置吗？', { confirmButtonText: '确定', type: 'warning' }).then(() => {
        this.settingsGroups.forEach(g => g.items.forEach(s => clearLocalStorage(s.storageKey)));
        this.$emit('reset');
      }).catch(() => {});
    }
  }
};
</script>

<style scoped>
/* 样式保留你的穿透样式，不作变动 */
:deep(.el-input__wrapper) { background-color: transparent !important; box-shadow: none !important; border: 0 solid rgba(255, 255, 255, 0.2); }
:deep(.el-input-number__decrease), :deep(.el-input-number__increase) { background-color: transparent !important; box-shadow: none !important; border: 0 solid rgba(255, 255, 255, 0); color: inherit; }
:deep(.el-input__inner) { color: inherit; }
:deep(.input-cols.el-input-number--small) { width: 4.3rem !important; }
:deep(.input-height.el-input-number--small) { width: 5.1rem !important; }
:deep(.input-title.el-input-number--small) { width: 5.75rem !important; }
:deep(.el-select__wrapper.el-tooltip__trigger.el-tooltip__trigger) { min-height: 1rem !important; width: 4rem !important; font-size: 0.75rem !important; box-shadow: none !important; }
:deep(.el-collapse) { border: none !important; }
:deep(.el-collapse-item__header) { border: none !important; background-color: #ffffff00 !important; }
:deep(.el-icon.el-collapse-item__arrow) { display: none !important; }
:deep(.el-collapse-item__wrap) { border: none !important; background-color: #ffffff00 !important; }
:deep(.el-collapse-item__content) { padding: 0 !important; }
:deep(.el-input-tag) { background-color: unset !important; box-shadow: unset !important; min-height: 1rem !important; }
:deep(.el-input-tag--small) { --el-input-tag-padding: 0px !important; line-height: normal !important; }
:deep(.el-tag--small) { height: 14px !important; }
:deep(.el-input-tag__input-wrapper) { height: 14px !important; }
:deep(.el-icon.mr-1) { display: none !important; }
:deep(.el-tag__content) { line-height: unset !important; }
:deep(.el-select__wrapper) { background-color: unset !important; }

/* 平台 Tab 样式保持 */
:deep(.platform-tabs .el-tabs__header) { margin-bottom: 0 !important; }
:deep(.platform-tabs .el-tabs__nav-wrap:after) { display: none; }
:deep(.platform-tabs .el-tabs__item) { font-size: 0.8rem !important; height: 30px !important; line-height: 30px !important; }

.scrollbar-hide::-webkit-scrollbar { display: none; }
</style>