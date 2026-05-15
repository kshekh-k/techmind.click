"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  CaseLower,
  CaseSensitive,
  CaseUpper,
  CircleDot,
  Hash,
  List,
  ListOrdered,
  Loader2,
  SpellCheck,
  Undo2,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { normalizeSpaces, removeLineBreaks } from "@/utils/text";
import type { SpellcheckMatch } from "@/lib/spellcheck";

type FormatAction =
  | "uppercase"
  | "lowercase"
  | "propercase"
  | "sentencecase"
  | "bullet-list"
  | "number-list"
  | "circle-list"
  | "align-left"
  | "align-center"
  | "align-right"
  | "clear"
  | "copy"
  | "remove-spaces"
  | "remove-line-breaks"
  | "reverse-text"
  | "slug"
  | "snakecase";

type ListType = "bullet" | "number" | "circle" | "none";
type TextAlign = "left" | "center" | "right";

const MAX_HISTORY = 120;
const LIST_MARKER_PATTERN = /^(\s*)(•|\d+\.|○)\s/;
const SENTENCE_CASE_PATTERN = /(^\s*\w|[.!?]\s*\w)/g;

const SpellcheckPanel = dynamic(() => import("./text-spellcheck-panel"), {
  loading: () => null,
});

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function snakeify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s_]/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function formatList(text: string, newType: ListType, currentType: ListType): string {
  let unformatted = text;

  if (currentType !== "none") {
    unformatted = text
      .split("\n")
      .map((line) => line.replace(LIST_MARKER_PATTERN, "$1"))
      .join("\n");
  }

  if (newType === currentType) {
    return unformatted;
  }

  return unformatted
    .split("\n")
    .map((line, index) => {
      if (!line.trim()) {
        return line;
      }

      switch (newType) {
        case "bullet":
          return line.replace(/^\s*/, "$&• ");
        case "number":
          return line.replace(/^\s*/, `$&${index + 1}. `);
        case "circle":
          return line.replace(/^\s*/, "$&○ ");
        default:
          return line;
      }
    })
    .join("\n");
}

export default function TextFormatter() {
  const [text, setText] = useState("");
  const [textAlign, setTextAlign] = useState<TextAlign>("left");
  const [activeListType, setActiveListType] = useState<ListType>("none");

  const [spellErrors, setSpellErrors] = useState<SpellcheckMatch[]>([]);
  const [isSpellChecking, setIsSpellChecking] = useState(false);
  const [spellCheckMessage, setSpellCheckMessage] = useState("");

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const historyRef = useRef<string[]>([""]);
  const historyIndexRef = useRef(0);

  const wordCount = useMemo(() => text.trim().split(/\s+/).filter(Boolean).length, [text]);

  const updateHistoryButtons = useCallback(() => {
    const index = historyIndexRef.current;
    const total = historyRef.current.length;
    setCanUndo(index > 0);
    setCanRedo(index < total - 1);
  }, []);

  const pushHistory = useCallback(
    (nextValue: string) => {
      const current = historyRef.current[historyIndexRef.current] ?? "";
      if (current === nextValue) {
        return;
      }

      const nextHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
      nextHistory.push(nextValue);

      if (nextHistory.length > MAX_HISTORY) {
        nextHistory.splice(0, nextHistory.length - MAX_HISTORY);
      }

      historyRef.current = nextHistory;
      historyIndexRef.current = nextHistory.length - 1;
      updateHistoryButtons();
    },
    [updateHistoryButtons]
  );

  const focusTextarea = useCallback(() => {
    requestAnimationFrame(() => textAreaRef.current?.focus());
  }, []);

  const resetSpellState = useCallback(() => {
    if (spellErrors.length > 0) {
      setSpellErrors([]);
    }
    if (spellCheckMessage) {
      setSpellCheckMessage("");
    }
  }, [spellErrors.length, spellCheckMessage]);

  const applyText = useCallback(
    (nextValue: string, nextListType: ListType = activeListType) => {
      setText(nextValue);
      setActiveListType(nextListType);
      pushHistory(nextValue);
      focusTextarea();
    },
    [activeListType, focusTextarea, pushHistory]
  );

  const detectListType = useCallback((value: string): ListType => {
    const firstNonEmpty = value.split("\n").find((line) => line.trim().length > 0) ?? "";

    if (/^(\s*)•\s/.test(firstNonEmpty)) {
      return "bullet";
    }
    if (/^(\s*)\d+\.\s/.test(firstNonEmpty)) {
      return "number";
    }
    if (/^(\s*)○\s/.test(firstNonEmpty)) {
      return "circle";
    }
    return "none";
  }, []);

  const handleSpellCheck = useCallback(async () => {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = (await response.json()) as { matches?: SpellcheckMatch[]; message?: string };

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
  }, [text]);

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const nextValue = event.target.value;
      setText(nextValue);
      resetSpellState();
      pushHistory(nextValue);
    },
    [pushHistory, resetSpellState]
  );

  const undo = useCallback(() => {
    if (historyIndexRef.current <= 0) {
      return;
    }

    historyIndexRef.current -= 1;
    const previous = historyRef.current[historyIndexRef.current] ?? "";
    setText(previous);
    setActiveListType(detectListType(previous));
    updateHistoryButtons();
    resetSpellState();
  }, [detectListType, resetSpellState, updateHistoryButtons]);

  const redo = useCallback(() => {
    if (historyIndexRef.current >= historyRef.current.length - 1) {
      return;
    }

    historyIndexRef.current += 1;
    const next = historyRef.current[historyIndexRef.current] ?? "";
    setText(next);
    setActiveListType(detectListType(next));
    updateHistoryButtons();
    resetSpellState();
  }, [detectListType, resetSpellState, updateHistoryButtons]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key.toLowerCase() === "z") {
          event.preventDefault();
          undo();
          return;
        }

        if (event.key.toLowerCase() === "y") {
          event.preventDefault();
          redo();
          return;
        }
      }

      if (event.key === "Tab") {
        event.preventDefault();
        const target = event.currentTarget;
        const start = target.selectionStart ?? 0;
        const end = target.selectionEnd ?? start;

        setText((previous) => {
          const next = `${previous.slice(0, start)}\t${previous.slice(end)}`;
          pushHistory(next);
          resetSpellState();
          return next;
        });

        requestAnimationFrame(() => {
          if (textAreaRef.current) {
            textAreaRef.current.selectionStart = start + 1;
            textAreaRef.current.selectionEnd = start + 1;
          }
        });
      }
    },
    [pushHistory, redo, resetSpellState, undo]
  );

  const formatText = useCallback(
    (action: FormatAction) => {
      if (!text && action !== "clear") {
        return;
      }

      let nextText = text;
      let nextListType = activeListType;

      switch (action) {
        case "uppercase":
          nextText = text.toUpperCase();
          break;
        case "lowercase":
          nextText = text.toLowerCase();
          break;
        case "propercase":
          nextText = text
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
          break;
        case "sentencecase":
          nextText = text.toLowerCase().replace(SENTENCE_CASE_PATTERN, (char) => char.toUpperCase());
          break;
        case "bullet-list":
          nextText = formatList(text, "bullet", activeListType);
          nextListType = nextText === text ? "none" : "bullet";
          break;
        case "number-list":
          nextText = formatList(text, "number", activeListType);
          nextListType = nextText === text ? "none" : "number";
          break;
        case "circle-list":
          nextText = formatList(text, "circle", activeListType);
          nextListType = nextText === text ? "none" : "circle";
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
        case "remove-spaces":
          nextText = normalizeSpaces(text);
          break;
        case "remove-line-breaks":
          nextText = removeLineBreaks(text);
          break;
        case "reverse-text":
          nextText = Array.from(text).reverse().join("");
          break;
        case "slug":
          nextText = slugify(text);
          break;
        case "snakecase":
          nextText = snakeify(text);
          break;
        case "clear":
          nextText = "";
          nextListType = "none";
          setSpellErrors([]);
          setSpellCheckMessage("");
          break;
        case "copy":
          void navigator.clipboard.writeText(text).catch(() => undefined);
          return;
        default:
          return;
      }

      resetSpellState();
      applyText(nextText, nextListType);
    },
    [activeListType, applyText, resetSpellState, text]
  );

  return (
    
      <Card className="shadow-sm !border-none">
        <CardHeader>
          <CardTitle as="p" className="text-2xl font-bold text-center">
            Advanced Case Converter
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="text-formatter-input">Edit your text below:</Label>
              <span className="text-sm text-muted-foreground" aria-live="polite">
                {text.length} chars • {wordCount} words
              </span>
            </div>

            <div className="flex justify-between flex-wrap gap-2 pb-2">
              <div className="flex flex-wrap gap-2">
                <div className="flex">
                  <Button
                    variant="outline"
                    onClick={undo}
                    disabled={!canUndo}
                    className="rounded-r-none"
                    aria-label="Undo last action"
                    title="Undo (Ctrl+Z)"
                  >
                    <Undo2 className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={redo}
                    disabled={!canRedo}
                    className="rounded-l-none"
                    aria-label="Redo last action"
                    title="Redo (Ctrl+Y)"
                  >
                    <Undo2 className="size-4 scale-x-[-1]" />
                  </Button>
                </div>

                <div className="flex flex-nowrap">
                  <Button variant="outline" onClick={() => formatText("uppercase")} className="rounded-r-none border-r-0" aria-label="Convert to uppercase" title="Uppercase">
                    <CaseUpper className="size-5" />
                  </Button>
                  <Button variant="outline" onClick={() => formatText("lowercase")} className="rounded-none border-r-0" aria-label="Convert to lowercase" title="Lowercase">
                    <CaseLower className="size-5" />
                  </Button>
                  <Button variant="outline" onClick={() => formatText("propercase")} className="rounded-none border-r-0" aria-label="Convert to proper case" title="Proper Case">
                    <CaseSensitive className="size-5" />
                  </Button>
                  <Button variant="outline" onClick={() => formatText("sentencecase")} className="rounded-none border-r-0" aria-label="Convert to sentence case" title="Sentence Case">
                    <SpellCheck className="size-5" />
                  </Button>
                  <Button variant="outline" onClick={() => formatText("slug")} className="rounded-none border-r-0" aria-label="Convert text to slug" title="Slugify">
                    <Hash className="size-5" />
                  </Button>
                  <Button variant="outline" onClick={() => formatText("snakecase")} className="rounded-l-none" aria-label="Convert text to snake case" title="Snake Case">
                    _
                  </Button>
                </div>

                <div className="flex" role="group" aria-label="Text alignment">
                  <Button
                    variant={"outline"}
                    onClick={() => formatText("align-left")}
                    className="rounded-r-none border-r-0"
                    aria-pressed={textAlign === "left"}
                    aria-label="Align left"
                  >
                    <AlignLeft className="size-4" />
                  </Button>
                  <Button
                    variant={"outline"}
                    onClick={() => formatText("align-center")}
                    className="rounded-none border-r-0"
                    aria-pressed={textAlign === "center"}
                    aria-label="Align center"
                  >
                    <AlignCenter className="size-4" />
                  </Button>
                  <Button
                    variant={"outline"}
                    onClick={() => formatText("align-right")}
                    className="rounded-l-none"
                    aria-pressed={textAlign === "right"}
                    aria-label="Align right"
                  >
                    <AlignRight className="size-4" />
                  </Button>
                </div>

                <div className="flex" role="group" aria-label="List formatting">
                  <Button
                    variant={"outline"}
                    onClick={() => formatText("bullet-list")}
                    className="rounded-r-none border-r-0"
                    aria-pressed={activeListType === "bullet"}
                    aria-label="Toggle bullet list"
                  >
                    <List className="size-4" />
                  </Button>
                  <Button
                    variant={"outline"}
                    onClick={() => formatText("number-list")}
                    className="rounded-none border-r-0"
                    aria-pressed={activeListType === "number"}
                    aria-label="Toggle numbered list"
                  >
                    <ListOrdered className="size-4" />
                  </Button>
                  <Button
                    variant={"outline"}
                    onClick={() => formatText("circle-list")}
                    className="rounded-l-none"
                    aria-pressed={activeListType === "circle"}
                    aria-label="Toggle circle list"
                  >
                    <CircleDot className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => formatText("remove-spaces")}>Remove Spaces</Button>
                <Button variant="outline" onClick={() => formatText("reverse-text")}>Reverse Text</Button>
              </div>
            </div>

            <Textarea
              id="text-formatter-input"
              ref={textAreaRef}
              value={text}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              className="min-h-[280px]"
              style={{ textAlign }}
              placeholder="Enter your text here..."
            />

            <div className="flex flex-wrap gap-5 pt-5">
              <Button variant="outlineBlue" onClick={() => formatText("uppercase")} className="rounded !uppercase">Uppercase</Button>
              <Button variant="outlinePurple" onClick={() => formatText("lowercase")} className="rounded lowercase">Lowercase</Button>
              <Button variant="outlineTeal" onClick={() => formatText("propercase")} className="capitalize">Proper Case</Button>
              <Button variant="outlineOrange" onClick={() => formatText("sentencecase")} className="rounded">Sentence Case</Button>              
              <Button variant="outlineRose" onClick={() => formatText("slug")} className="rounded">Slugify</Button>
              <Button variant="outlineCyan" onClick={() => formatText("snakecase")} className="rounded">Snake Case</Button>
              <Button variant="outlineBlue" onClick={() => formatText("remove-line-breaks")}>Remove Line Breaks</Button>
              <Button variant="outlineLime" onClick={handleSpellCheck} disabled={isSpellChecking}>
                {isSpellChecking ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" /> Checking...
                  </span>
                ) : (
                  "Check Spelling"
                )}
              </Button>
            </div>

            {(spellCheckMessage || spellErrors.length > 0) && (
              <SpellcheckPanel
                text={text}
                spellErrors={spellErrors}
                spellCheckMessage={spellCheckMessage}
              />
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
    
  );
}
