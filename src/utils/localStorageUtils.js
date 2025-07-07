// src/utils/localStorageUtils.js
export const updateCategroiesInLocalStorage = (categroies) => {
    localStorage.setItem('categroies', JSON.stringify(categroies));
};

export const getCategroiesFromLocalStorage = () => {
    const cachedCategroies = localStorage.getItem('categroies');
    return cachedCategroies ? JSON.parse(cachedCategroies) : null;
};

export const clearCategroiesFromLocalStorage = () => {
    localStorage.setItem('categroies', null);
};