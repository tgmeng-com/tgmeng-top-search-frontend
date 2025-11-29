// 根据文本和字体计算宽度
export const isEmpty = (value) => {
    // null 或 undefined
    if (value == null) return true

    // 字符串（包括全空格）
    if (typeof value === 'string') return value.trim().length === 0

    // 数组
    if (Array.isArray(value)) return value.length === 0

    // Map / Set
    if (value instanceof Map || value instanceof Set) return value.size === 0

    // 普通对象（包括 Object.create(null)）
    if (typeof value === 'object') {
        // 排除 Date、RegExp 等有原型的对象
        if (Object.prototype.toString.call(value) !== '[object Object]') return false
        return Object.keys(value).length === 0
    }
    return false
}