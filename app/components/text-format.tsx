"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/app/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/app/components/ui/tooltip";
import { LucideCaseLower, LucideCaseSensitive, LucideCaseUpper, Undo2 } from "lucide-react";
import { TbAlignCenter, TbAlignLeft2, TbAlignRight2, TbLetterCase, TbHash } from "react-icons/tb";
import { LiaListSolid } from "react-icons/lia";
import { FaListOl, FaListUl } from "react-icons/fa";
import { normalizeSpaces, removeLineBreaks } from "@/utils/text";
import type { SpellcheckMatch } from "@/lib/spellcheck";

type FormatAction =
    | "uppercase"
    | "lowercase"
    | "titlecase"
    | "propercase"
    | "sentencecase"
    | "bold"
    | "italic"
    | "underline"
    | "bullet-list"
    | "number-list"
    | "circle-list"
    | "align-left"
    | "align-center"
    | "align-right"
    | "clear"
    | "copy"
    | "invert-case"
    | "alternating-case"
    | "remove-spaces"
    | "remove-line-breaks"
    | "reverse-text"
    | "slug";

type ListType = "bullet" | "number" | "circle" | "none";

type SpellSegment = {
    text: string;
    isError: boolean;
};

type SuggestionLine = {
    word: string;
    suggestions: string[];
};

const buildSpellSegments = (inputText: string, matches: SpellcheckMatch[]): SpellSegment[] => {
    if (!inputText || matches.length === 0) {
        return [{ text: inputText, isError: false }];
    }

    const segments: SpellSegment[] = [];
    const safeMatches = [...matches]
        .filter((match) => match.length > 0 && match.offset >= 0 && match.offset < inputText.length)
        .sort((a, b) => a.offset - b.offset);

    let cursor = 0;
    for (const match of safeMatches) {
        const start = Math.max(match.offset, cursor);
        const end = Math.min(match.offset + match.length, inputText.length);

        if (start > cursor) {
            segments.push({ text: inputText.slice(cursor, start), isError: false });
        }

        if (end > start) {
            segments.push({ text: inputText.slice(start, end), isError: true });
            cursor = end;
        }
    }

    if (cursor < inputText.length) {
        segments.push({ text: inputText.slice(cursor), isError: false });
    }

    return segments.length > 0 ? segments : [{ text: inputText, isError: false }];
};

const buildSuggestionLines = (inputText: string, matches: SpellcheckMatch[]): SuggestionLine[] => {
    const grouped = new Map<string, { word: string; suggestions: Set<string> }>();

    for (const match of matches) {
        if (match.length <= 0 || match.offset < 0 || match.offset >= inputText.length) {
            continue;
        }

        const end = Math.min(match.offset + match.length, inputText.length);
        const word = inputText.slice(match.offset, end).trim();
        if (!word) {
            continue;
        }

        const key = word.toLowerCase();
        if (!grouped.has(key)) {
            grouped.set(key, { word, suggestions: new Set<string>() });
        }

        const entry = grouped.get(key);
        if (!entry) {
            continue;
        }

        for (const replacement of match.replacements) {
            const suggestion = replacement.value.trim();
            if (suggestion && suggestion.toLowerCase() !== key) {
                entry.suggestions.add(suggestion);
            }
        }
    }

    return Array.from(grouped.values()).map((entry) => ({
        word: entry.word,
        suggestions: Array.from(entry.suggestions).slice(0, 8),
    }));
};

export default function TextFormatter() {
    const [text, setText] = useState<string>("");
    const [spellErrors, setSpellErrors] = useState<SpellcheckMatch[]>([]);
    const [isSpellChecking, setIsSpellChecking] = useState<boolean>(false);
    const [spellCheckMessage, setSpellCheckMessage] = useState<string>("");
    const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("left");
    const [activeListType, setActiveListType] = useState<ListType>("none");
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const spellSegments = buildSpellSegments(text, spellErrors);
    const suggestionLines = buildSuggestionLines(text, spellErrors);

    const handleSpellCheck = async (): Promise<void> => {
        if (!text.trim()) {
            setSpellErrors([]);
            setSpellCheckMessage("Please enter text to check spelling.");
            return;
        }

        setIsSpellChecking(true);
        setSpellCheckMessage("");

        try {
            const response = await fetch("/api/spellcheck", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });

            const data = (await response.json()) as {
                matches?: SpellcheckMatch[];
                message?: string;
            };

            if (!response.ok) {
                setSpellErrors([]);
                setSpellCheckMessage(data.message ?? "Spell check failed. Please try again.");
                return;
            }

            const matches = Array.isArray(data.matches) ? data.matches : [];
            setSpellErrors(matches);
            setSpellCheckMessage(matches.length === 0 ? "No spelling issues found." : "");
        } catch {
            setSpellErrors([]);
            setSpellCheckMessage("Unable to check spelling right now.");
        } finally {
            setIsSpellChecking(false);
        }
    };

    // Save to history on text change
    useEffect(() => {
        if (historyIndex === -1 || history[historyIndex] !== text) {
            const newHistory = history.slice(0, historyIndex + 1);
            newHistory.push(text);
            setHistory(newHistory);
            setHistoryIndex(newHistory.length - 1);
        }
    }, [text]);

    const formatText = (action: FormatAction): void => {
        if (!text && action !== "clear") return;

        let result: string = text;
        let newListType: ListType = activeListType;

        switch (action) {
            case "uppercase":
                result = text.toUpperCase();
                break;
            case "lowercase":
                result = text.toLowerCase();
                break;
            case "titlecase":
                result = text
                    .toLowerCase()
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                break;
            case "propercase":
                result = text
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(" ");
                break;
            case "sentencecase":
                result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
                break;
            case "bold":
                result = `**${text}**`;
                break;
            case "italic":
                result = `*${text}*`;
                break;
            case "underline":
                result = `__${text}__`;
                break;
            case "bullet-list":
                result = formatList(text, "bullet", activeListType);
                newListType = "bullet";
                break;
            case "number-list":
                result = formatList(text, "number", activeListType);
                newListType = "number";
                break;
            case "circle-list":
                result = formatList(text, "circle", activeListType);
                newListType = "circle";
                break;
            case "align-left":
                setTextAlign("left");
                return;
            case "align-center":
                setTextAlign("center");
                return;
            case "align-right":
                setTextAlign("right");
                return;
            case "invert-case":
                result = text
                    .split("")
                    .map((char) => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()))
                    .join("");
                break;
            case "alternating-case":
                result = text
                    .split("")
                    .map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
                    .join("");
                break;
            case "remove-spaces":
                result = normalizeSpaces(text);
                break;
            case "remove-line-breaks":
                result = removeLineBreaks(text);
                break;
            case "reverse-text":
                result = text.split("").reverse().join("");
                break;
            case "slug":
                result = slugify(text);
                break;
            case "clear":
                result = "";
                newListType = "none";
                setSpellErrors([]);
                setSpellCheckMessage("");
                break;
            case "copy":
                navigator.clipboard.writeText(text);
                return;
            default:
                const _exhaustiveCheck: never = action;
                return _exhaustiveCheck;
        }

        setText(result);
        setActiveListType(newListType);
        focusTextarea();
    };

    const formatList = (text: string, newType: ListType, currentType: ListType): string => {
        // Remove existing list formatting
        let unformatted = text;
        if (currentType !== "none") {
            unformatted = text
                .split("\n")
                .map((line) => line.replace(/^(\s*)(•|\d+\.|○)\s/, "$1"))
                .join("\n");
        }

        // Apply new list formatting
        if (newType === currentType) {
            return unformatted; // Toggle off if same type clicked
        }

        return unformatted
            .split("\n")
            .map((line, i) => {
                if (!line.trim()) return line;
                switch (newType) {
                    case "bullet":
                        return line.replace(/^\s*/, "$&• ");
                    case "number":
                        return line.replace(/^\s*/, `$&${i + 1}. `);
                    case "circle":
                        return line.replace(/^\s*/, "$&○ ");
                    default:
                        return line;
                }
            })
            .join("\n");
    };

    const slugify = (input: string): string => {
        return input
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setText(e.target.value);
        setSpellErrors([]);
        setSpellCheckMessage("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        // Handle undo/redo with Ctrl+Z/Ctrl+Y
        if (e.ctrlKey || e.metaKey) {
            if (e.key === "z") {
                e.preventDefault();
                undo();
                return;
            } else if (e.key === "y") {
                e.preventDefault();
                redo();
                return;
            }
        }

        if (e.key === "Tab") {
            e.preventDefault();
            const { selectionStart, selectionEnd } = e.currentTarget;
            const start = selectionStart ?? 0;
            const end = selectionEnd ?? start;
            const newText = text.substring(0, start) + "\t" + text.substring(end);
            setText(newText);

            setTimeout(() => {
                if (textAreaRef.current) {
                    textAreaRef.current.selectionStart = start + 1;
                    textAreaRef.current.selectionEnd = start + 1;
                }
            }, 0);
        }
    };

    const undo = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setText(history[newIndex]);
            // Reset list type when undoing
            const hasList = history[newIndex].split("\n").some((line) => /^(\s*)(•|\d+\.|○)\s/.test(line));
            if (!hasList) setActiveListType("none");
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setText(history[newIndex]);
            // Detect list type when redoing
            const firstLine = history[newIndex].split("\n")[0];
            if (/^(\s*)•\s/.test(firstLine)) setActiveListType("bullet");
            else if (/^(\s*)\d+\.\s/.test(firstLine)) setActiveListType("number");
            else if (/^(\s*)○\s/.test(firstLine)) setActiveListType("circle");
            else setActiveListType("none");
        }
    };

    const focusTextarea = () => {
        setTimeout(() => {
            if (textAreaRef.current) {
                textAreaRef.current.focus();
            }
        }, 0);
    };

    return (

        <div className="max-w-6xl mx-auto px-4">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle as="h1" className="text-2xl font-bold text-center">Advanced Text Formatter</CardTitle>
                </CardHeader>
                <CardContent>


                    {/* Text Area */}
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                            <Label>Edit your text below:</Label>
                            <span className="text-sm text-muted-foreground">
                                {text.length} chars • {text.split(/\s+/).filter(Boolean).length} words
                            </span>
                        </div>
                        <div className="flex justify-between flex-wrap gap-2 pb-2">
                            <div className="flex flex-wrap gap-2">
                                <div className="flex ">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                onClick={undo}
                                                disabled={historyIndex <= 0}
                                                className="gap-2 rounded-r-none"
                                            >
                                                <Undo2 />

                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Undo last action (Ctrl+Z)</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                onClick={redo}
                                                disabled={historyIndex >= history.length - 1}
                                                className="gap-2 rounded-l-none"
                                            >
                                                <Undo2 className="scale-x-[-1]" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Redo last action (Ctrl+Y)</TooltipContent>
                                    </Tooltip>
                                </div>
                                <div className="flex flex-nowrap">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" onClick={() => formatText("uppercase")} className="rounded-r-none border-r-0">
                                                <LucideCaseUpper className="size-6" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Uppercase</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" onClick={() => formatText("lowercase")} className="rounded-none border-r-0">
                                                <LucideCaseLower className="size-6" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Lowercase</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" onClick={() => formatText("propercase")} className="rounded-none border-r-0">
                                                <LucideCaseSensitive className="size-6" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Proper Case</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" onClick={() => formatText("sentencecase")} className="rounded-none border-r-0">
                                                <TbLetterCase className="size-6" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Sentence Case</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" onClick={() => formatText("slug")} className="rounded-l-none">
                                                <TbHash className="size-5" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Slugify</TooltipContent>
                                    </Tooltip>
                                </div>

                                <Tabs
                                    value={textAlign}
                                    onValueChange={(value) =>
                                        formatText(`align-${value}` as FormatAction)
                                    }

                                >
                                    <TabsList className="grid grid-cols-3">
                                        <TabsTrigger value="left">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <TbAlignLeft2 />
                                                </TooltipTrigger>
                                                <TooltipContent>Left Align</TooltipContent>
                                            </Tooltip>
                                        </TabsTrigger>
                                        <TabsTrigger value="center">
                                            <Tooltip><TooltipTrigger asChild>
                                                <TbAlignCenter />
                                            </TooltipTrigger>
                                                <TooltipContent>Center Align</TooltipContent>
                                            </Tooltip>
                                        </TabsTrigger>
                                        <TabsTrigger value="right">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <TbAlignRight2 />
                                                </TooltipTrigger>
                                                <TooltipContent>Right Align</TooltipContent>
                                            </Tooltip>
                                        </TabsTrigger>

                                    </TabsList>
                                </Tabs>
                                <Tabs
                                    value={activeListType}
                                    onValueChange={(value) => formatText(`${value}-list` as FormatAction)}

                                >
                                    <TabsList className="grid grid-cols-3">
                                        <TabsTrigger value="bullet"><FaListUl /></TabsTrigger>
                                        <TabsTrigger value="number"><FaListOl /></TabsTrigger>
                                        <TabsTrigger value="circle"><LiaListSolid /></TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                            <div className="flex flex-wrap gap-2 ">
                                <Button variant="outline" onClick={() => formatText("remove-spaces")}>
                                    Remove Spaces
                                </Button>
                               
                                <Button variant="outline" onClick={() => formatText("reverse-text")}>
                                    Reverse Text
                                </Button>

                            </div>
                        </div>
                        <Textarea
                            ref={textAreaRef}
                            value={text}
                            onChange={handleTextChange}
                            onKeyDown={handleKeyDown}
                            className="min-h-[200px]"
                            style={{ textAlign }}
                            placeholder="Enter your text here..."
                        />
                         <div className="flex flex-wrap gap-5 pt-5">


                            <Button variant="outlineBlue" onClick={() => formatText("uppercase")} className="rounded !uppercase">
                                Uppercase
                            </Button>

                            <Button variant="outlinePurple" onClick={() => formatText("lowercase")} className="rounded lowercase">
                                Lowercase
                            </Button>


                            <Button variant="outlineTeal" onClick={() => formatText("propercase")} className="capitalize">
                                Proper Case
                            </Button>

                            <Button variant="outlineOrange" onClick={() => formatText("sentencecase")} className="rounded">
                                Sentence case
                            </Button>

                             <Button variant="outlineBlue" onClick={() => formatText("remove-line-breaks")}>
                                    Remove Line Breaks
                                </Button>
                               

                            <Button variant="outlineRose" onClick={() => formatText("slug")} className="rounded">
                                Slugify
                            </Button>

                             <Button variant="outlineLime" onClick={handleSpellCheck} disabled={isSpellChecking}>
                                    {isSpellChecking ? "Checking..." : "Check Spelling"}
                                </Button>

                        </div>
                        {spellErrors.length > 0 && (
                            <div className="mt-3 rounded border bg-muted/20 p-3">
                                <p className="mb-2 text-xs text-muted-foreground">Spelling check:</p>
                                <p className="whitespace-pre-wrap break-words text-sm leading-6">
                                    {spellSegments.map((segment, index) => (
                                        <span
                                            key={`${segment.text}-${index}`}
                                            className={segment.isError ? "decoration-red-500 underline decoration-wavy" : ""}
                                        >
                                            {segment.text}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        )}
                        {(spellCheckMessage || spellErrors.length > 0) && (
                            <div className="mt-4 space-y-2">
                                {spellCheckMessage && (
                                    <p className="text-sm text-muted-foreground">{spellCheckMessage}</p>
                                )}
                                {suggestionLines.length > 0 && (
                                    <div className="rounded border p-3">
                                        <p className="mb-2 text-sm font-medium text-foreground">Suggestions for misspelled words:</p>
                                        <div className="space-y-1">
                                            {suggestionLines.map((line) => (
                                                <p key={line.word} className="text-xs text-green-700 font-medium">
                                                    <span className="text-foreground">{line.word}</span>: {line.suggestions.length > 0 ? line.suggestions.join(", ") : "No suggestions"}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                       
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-3 border-t border-gray-200">

                    <Button variant="outlineRed" onClick={() => formatText("clear")}>
                        Clear All
                    </Button>
                    <Button variant="success" onClick={() => formatText("copy")}>
                        Copy Text
                    </Button>
                </CardFooter>
            </Card>
        </div>

    );
}