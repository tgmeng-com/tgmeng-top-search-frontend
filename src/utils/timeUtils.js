export const getCurrentTimestamp = () => {
    return new Date().getTime();
};

export const getTodayStartTimestamp = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
};

export const getAllTimeStartTimestamp = () => {
    return 0;
};

export const formatSecondsToHMS = (seconds) => {
    if (typeof seconds !== 'number' || isNaN(seconds)) {
        return seconds;
    }
    if (seconds < 60) {
        return `${seconds}秒`;
    }
    const hours = Math.floor(seconds / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = seconds % 60;
    return hours > 0
        ? `${hours}时${minutes}分${remainingSeconds}秒`
        : `${minutes}分${remainingSeconds}秒`;
};

export const isFuture = (timeSec) => {
    return timeSec * 1000 > Date.now();
}

export const isPast = (timeSec) => {
    return timeSec * 1000 < Date.now();
}

export const isBetween = (startSec, endSec) => {
    const now = Date.now();
    return now >= startSec * 1000 && now <= endSec * 1000;
}