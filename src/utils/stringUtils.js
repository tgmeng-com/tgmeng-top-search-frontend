const getDefaultFont = () => {
    const testElement = document.createElement('div');
    testElement.style.font = 'initial';  // 使用浏览器默认字体
    document.body.appendChild(testElement);

    const computedStyle = window.getComputedStyle(testElement);
    const defaultFont = computedStyle.fontFamily;  // 获取计算后的默认字体
    document.body.removeChild(testElement);  // 移除测试元素

    return defaultFont;
}

// 根据文本和字体计算宽度
export const getTextWidthFromDOM = (text, font = null) => {
    // 如果没有提供字体，则获取浏览器默认字体
    const defaultFont = font || getDefaultFont();

    const span = document.createElement('span');
    span.style.position = 'absolute';
    span.style.visibility = 'hidden';
    span.style.font = defaultFont; // 使用默认字体
    span.textContent = text;
    document.body.appendChild(span);
    const width = span.getBoundingClientRect().width; // 获取元素宽度
    document.body.removeChild(span); // 移除元素
    return width;
}