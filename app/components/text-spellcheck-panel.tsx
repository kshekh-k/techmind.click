"use client";

import { useMemo } from "react";
import type { SpellcheckMatch } from "@/lib/spellcheck";

type SpellSegment = {
  text: string;
  isError: boolean;
};

type SuggestionLine = {
  word: string;
  suggestions: string[];
};

type SpellcheckPanelProps = {
  text: string;
  spellErrors: SpellcheckMatch[];
  spellCheckMessage: string;
};

function buildSpellSegments(inputText: string, matches: SpellcheckMatch[]): SpellSegment[] {
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
}

function buildSuggestionLines(inputText: string, matches: SpellcheckMatch[]): SuggestionLine[] {
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
}

export default function SpellcheckPanel({ text, spellErrors, spellCheckMessage }: SpellcheckPanelProps) {
  const spellSegments = useMemo(() => buildSpellSegments(text, spellErrors), [text, spellErrors]);
  const suggestionLines = useMemo(() => buildSuggestionLines(text, spellErrors), [text, spellErrors]);

  return (
    <div className="mt-4 space-y-2">
      {spellErrors.length > 0 && (
        <div className="rounded border bg-muted/20 p-3">
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

      {spellCheckMessage && <p className="text-sm text-muted-foreground">{spellCheckMessage}</p>}

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
  );
}
