// 本地存储键名
export const LOCAL_STORAGE_KEYS = {
    CATEGORIES: 'categroies',
    CARD_COLS: 'cardCols',
    CARD_HEIGHT: 'cardHeight',
    CARD_TITLE_FONT_SIZE: 'cardTitleFontSize',
    CATEGORIES_TITLE_FONT_SIZE: 'categroiesTitleFontSize',
    CARD_TOP_FONT_SIZE: 'cardTopFontSize',
    CARD_DRAGGABLE: 'cardDraggable',
    CATEGORIES_DRAGGABLE: 'categroiesDraggable',
    CARD_HOT_SCORE_SHOW: 'cardHotScoreShow',
    CARD_TIME_SHOW: 'cardTimeShow',
    CARD_HOT_TITLE_FULL: 'cardHotTitleFull',
    CARD_TITLE_FULL: 'cardTitleFull',
    DEFAULT_CATEGORY_ID: 'defaultCategoryId',
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
        console.log('🧹 已清除全部本地缓存');
    } catch (e) {
        console.warn('❌ Failed to clear all localStorage', e);
    }
};
