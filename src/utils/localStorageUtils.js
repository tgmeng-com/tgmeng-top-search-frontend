// 本地存储键名
export const LOCAL_STORAGE_KEYS = {
    CATEGORIES: 'categroies',
    CARD_COLS: 'cardCols',
    CARD_HEIGHT: 'cardHeight',
    CARD_LIST_LIMIT: 'cardListLimit',
    CARD_WIDTH_FOR_PHONE: 'cardWidthForPhone',
    CARD_TITLE_FONT_SIZE: 'cardTitleFontSize',
    CATEGORIES_TITLE_FONT_SIZE: 'categroiesTitleFontSize',
    CARD_TOP_FONT_SIZE: 'cardTopFontSize',
    CARD_DRAGGABLE: 'cardDraggable',
    CATEGORIES_DRAGGABLE: 'categroiesDraggable',
    CARD_HOT_SCORE_SHOW: 'cardHotScoreShow',
    CARD_TIME_SHOW: 'cardTimeShow',
    CARD_HORIZONTAL_SCROLLING: 'cardHorizontalScrolling',
    CARD_HOT_TITLE_FULL: 'cardHotTitleFull',
    CARD_TITLE_FULL: 'cardTitleFull',
    DEFAULT_CATEGORY_ID: 'defaultCategoryId',
    // excel卡片顶部字体大小
    EXCEL_CARD_TOP_FONT_SIZE: 'excelCardTopFontSize',
    EXCEL_CARD_TOP_FONT_WEIGHT: 'excelCardTopFontWeight',
    // excel热点标题字体大小
    EXCEL_CARD_TITLE_FONT_SIZE: 'excelCardTitleFontSize',
    EXCEL_CARD_TITLE_FONT_WEIGHT: 'excelCardTitleFontWeight',
    // excel分类名称字体大小
    EXCEL_CATEGORIES_TITLE_FONT_SIZE: 'excelCategroiesTitleFontSize',
    EXCEL_CATEGORIES_TITLE_FONT_WEIGHT: 'excelCategroiesTitleFontWeight',
    // 顶部轮播字体展示
    TOP_CAROUSE_FONT_SHOW: 'topCarouselFontShow',
    // 词云是否展示
    WORD_CLOUD_SHOW: 'wordCloudShow',
    // 访问量展示
    PAGE_VIEWS_SHOW: 'pageViewsShow',
    // 边距缩放，就是屏幕两边的，主要是为了移动端i
    WIDTH_PADDING: 'widthPadding',
    // 词云数量
    WORD_CLOUD_NUM: 'wordCloudNum',
    // 广告是否展示
    ADS_ENABLED: 'adsEnabled',
    // 搜索历史
    SEARCH_HISTORY: 'searchHistory',
    // 过滤中包含的关键字
    INCLUDE_WORD: 'includeWord',
    // 过滤中排除的挂念子
    UNINCLUDE_WORD: 'unincludeWord',
    // webhook订阅用的密钥
    WEBHOOK_ACCESS_KEY: '',
};

// 设置本地存储
export const setLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.warn(`❌ Failed to set localStorage key: ${key}`, e);
    }
};

// 获取本地存储
export const getLocalStorage = (key) => {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (e) {
        console.warn(`❌ Failed to get localStorage key: ${key}`, e);
        return null;
    }
};


// 清除本地存储
export const clearLocalStorage = (key) => {
    localStorage.removeItem(key);
};

// 清除全部本地存储
export const clearAllLocalStorage = () => {
    try {
        localStorage.clear();
    } catch (e) {
        console.warn('❌ Failed to clear all localStorage', e);
    }
};
