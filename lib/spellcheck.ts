export type SpellcheckReplacement = {
    value: string;
};

export type SpellcheckMatch = {
    offset: number;
    length: number;
    message: string;
    replacements: SpellcheckReplacement[];
};

type LanguageToolMatch = {
    offset?: number;
    length?: number;
    message?: string;
    replacements?: Array<{ value?: string }>;
};

export const mapLanguageToolMatches = (matches: unknown): SpellcheckMatch[] => {
    if (!Array.isArray(matches)) {
        return [];
    }

    return matches
        .map((match) => {
            const item = match as LanguageToolMatch;
            return {
                offset: typeof item.offset === "number" ? item.offset : 0,
                length: typeof item.length === "number" ? item.length : 0,
                message: typeof item.message === "string" ? item.message : "Possible spelling issue",
                replacements: Array.isArray(item.replacements)
                    ? item.replacements
                        .map((replacement) => ({ value: replacement?.value ?? "" }))
                        .filter((replacement) => replacement.value.length > 0)
                    : [],
            };
        })
        .filter((item) => item.length > 0);
};