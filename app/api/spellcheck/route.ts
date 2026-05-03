import { NextResponse } from "next/server";
import { mapLanguageToolMatches } from "@/lib/spellcheck";

type SpellcheckRequestBody = {
    text?: unknown;
};

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as SpellcheckRequestBody;
        const text = typeof body.text === "string" ? body.text : "";

        if (!text.trim()) {
            return NextResponse.json({ matches: [], message: "Text is empty" }, { status: 200 });
        }

        const payload = new URLSearchParams({
            text,
            language: "en-US",
        });

        const response = await fetch("https://api.languagetool.org/v2/check", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: payload.toString(),
        });

        if (!response.ok) {
            return NextResponse.json(
                { message: "Failed to check spelling", matches: [] },
                { status: 502 }
            );
        }

        const data = (await response.json()) as { matches?: unknown };
        const matches = mapLanguageToolMatches(data.matches);

        return NextResponse.json({ matches }, { status: 200 });
    } catch {
        return NextResponse.json(
            { message: "Unexpected error during spell check", matches: [] },
            { status: 500 }
        );
    }
}