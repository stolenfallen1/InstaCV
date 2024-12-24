export const formatDate = (date: Date | string | null): string => {
    if (!date) return "";

    const dateObj = date instanceof Date ? date : new Date(date);

    return dateObj.toLocaleDateString("en-US", {
        month: 'short',
        year: 'numeric'
    });
}

export const capitalizeFirstLetter = (str: string) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const capitalizeEachWord = (sentence: string) => {
    if (!sentence) return sentence;
    return sentence
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
};