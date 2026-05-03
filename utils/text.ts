export const normalizeSpaces = (text: string): string => {
    return text.replace(/\s+/g, " ").trim();
};

export const removeLineBreaks = (text: string): string => {
    return text
    .replace(/([.!?,])(?:\r\n|\n|\r)+\s*/g, (_, punctuation: string) => `${punctuation} `)
        .replace(/(\r\n|\n|\r)/g, " ")
    .replace(/([.!?,])(?=\p{L})/gu, (_, punctuation: string) => `${punctuation} `)
        .replace(/\s+/g, " ")
        .trim();
};