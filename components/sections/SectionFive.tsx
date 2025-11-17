import React, { useCallback, useMemo, useState } from "react";
import { cn } from "@/lib/util";
import {
    Copy,
    Check,
    Target,
    ShieldCheck,
    Braces,
    ArrowRight,
} from "lucide-react";

/**
 * SectionFive — Convo‑Lang: Transparent Agentic Orchestration
 * - Left: glass code panel (mock DSL) with VS Code–like colors
 * - Right: feature cards
 * - Bottom: brand-forward CTA band
 *
 * Renders colored tokens as React nodes (no innerHTML), so raw markup never appears.
 * Fix: Apostrophes in natural language (e.g., What's, isn't) are no longer treated as string delimiters.
 */
export function SectionFive() {
    const code = useMemo(
        () =>
            `> define

Answer = struct(
    # The question asked of the user
    question: string

    # The user's answer
    answer: string

    # The user's sentiment when answering the question
    sentiment: enum('happy' 'sad' 'mad' 'frustrated' 'confused' 'neutral')
)

> submitAnswer(answer:Answer) ->
    record::httpPost("https://api.convo-lang.ai/mock/interview-answers", answer)
    return("answer_id is {{record.id}}")

> system
You are the Interview Agent. Extract tacit knowledge efficiently. Ask concise, high-yield questions and
follow up for clarity. Focus on unwritten rules, hidden risks, and key relationships.

Ask the user:
- What's the one thing you do that isn't in any manual but is critical to success?
- What's the biggest mistake a new person could make in their first 30 days?
- Who are the two people they absolutely must build a relationship with, and why?

> assistant
What's the one thing you do that isn't in any manual but is critical to success?`,
        []
    );

    // VS Code Dark+ inspired token colors
    const COLORS = useMemo(
        () => ({
            keyword: "#569CD6", // struct, enum, return
            type: "#4EC9B0", // Answer, string
            func: "#DCDCAA", // httpPost
            variable: "#9CDCFE", // record
            string: "#CE9178", // strings
            number: "#B5CEA8", // numbers
            comment: "#6A9955", // comments
            directive: "#C586C0", // > define, > system, > assistant
            operator: "#D4D4D4", // = : -> ::
            default: "rgb(230 230 235 / 0.92)",
        }),
        []
    );

    // Small helpers
    const isAlpha = (ch: string) => /[A-Za-z_]/.test(ch);
    const isAlnum = (ch: string) => /[A-Za-z0-9_-]/.test(ch);
    const KEYWORDS = new Set(["struct", "enum", "return"]);
    const TYPES = new Set(["Answer", "string"]);
    const FUNCS = new Set(["httpPost"]);
    const VARS = new Set(["record"]);

    // Tokenize one line and return React nodes with colors
    function renderLine(line: string, lineIndex: number) {
        const nodes: React.ReactNode[] = [];
        let i = 0;
        const L = line.length;

        // Directive at line start: > word
        if (line.startsWith(">")) {
            // capture "> word"
            let j = 1;
            while (j < L && line[j] === " ") j++;
            const startWord = j;
            while (j < L && /[A-Za-z_-]/.test(line[j])) j++;
            if (startWord < j) {
                const directiveChunk = line.slice(0, j);
                nodes.push(
                    <span key={`d-${lineIndex}`} style={{ color: COLORS.directive }}>
                        {directiveChunk}
                    </span>
                );
                i = j; // continue with rest of line
            }
        }

        while (i < L) {
            const ch = line[i];

            // Single quote handling: treat as contraction apostrophe if surrounded by letters
            if (ch === "'") {
                const prev = i > 0 ? line[i - 1] : "";
                const next = i + 1 < L ? line[i + 1] : "";
                const isContraction = /[A-Za-z]/.test(prev) && /[A-Za-z]/.test(next);
                if (isContraction) {
                    nodes.push("'");
                    i += 1;
                    continue;
                }
                // Otherwise it's a string delimiter
                let j = i + 1;
                while (j < L) {
                    if (line[j] === "\\" && j + 1 < L) {
                        j += 2;
                        continue;
                    }
                    if (line[j] === "'") {
                        j++;
                        break;
                    }
                    j++;
                }
                const str = line.slice(i, j);
                nodes.push(
                    <span key={`s1-${lineIndex}-${i}`} style={{ color: COLORS.string }}>
                        {str}
                    </span>
                );
                i = j;
                continue;
            }

            // Double-quoted strings
            if (ch === '"') {
                let j = i + 1;
                while (j < L) {
                    if (line[j] === "\\" && j + 1 < L) {
                        j += 2;
                        continue;
                    }
                    if (line[j] === '"') {
                        j++;
                        break;
                    }
                    j++;
                }
                const str = line.slice(i, j);
                nodes.push(
                    <span key={`s2-${lineIndex}-${i}`} style={{ color: COLORS.string }}>
                        {str}
                    </span>
                );
                i = j;
                continue;
            }

            // Comments (# ... to EOL)
            if (ch === "#") {
                const rest = line.slice(i);
                nodes.push(
                    <span
                        key={`c-${lineIndex}-${i}`}
                        style={{ color: COLORS.comment, fontStyle: "italic" }}
                    >
                        {rest}
                    </span>
                );
                i = L;
                break;
            }

            // Numbers
            if (/\d/.test(ch)) {
                let j = i + 1;
                while (j < L && /[\d.]/.test(line[j])) j++;
                nodes.push(
                    <span key={`n-${lineIndex}-${i}`} style={{ color: COLORS.number }}>
                        {line.slice(i, j)}
                    </span>
                );
                i = j;
                continue;
            }

            // Identifiers
            if (isAlpha(ch)) {
                let j = i + 1;
                while (j < L && isAlnum(line[j])) j++;
                const word = line.slice(i, j);
                let color: string | undefined;
                if (KEYWORDS.has(word)) color = COLORS.keyword;
                else if (TYPES.has(word)) color = COLORS.type;
                else if (FUNCS.has(word)) color = COLORS.func;
                else if (VARS.has(word)) color = COLORS.variable;

                if (color) {
                    nodes.push(
                        <span key={`w-${lineIndex}-${i}`} style={{ color }}>
                            {word}
                        </span>
                    );
                } else {
                    nodes.push(word);
                }
                i = j;
                continue;
            }

            // Two-char operators
            const two = line.slice(i, i + 2);
            if (two === "::" || two === "->") {
                nodes.push(
                    <span key={`op2-${lineIndex}-${i}`} style={{ color: COLORS.operator }}>
                        {two}
                    </span>
                );
                i += 2;
                continue;
            }

            // Single-char operators of interest
            if (ch === "=" || ch === ":") {
                nodes.push(
                    <span key={`op1-${lineIndex}-${i}`} style={{ color: COLORS.operator }}>
                        {ch}
                    </span>
                );
                i += 1;
                continue;
            }

            // Default: single character (spaces, punctuation, etc.)
            nodes.push(ch);
            i += 1;
        }

        return nodes;
    }

    const highlightedNodes = useMemo(() => {
        const lines = code.split("\n");
        const out: React.ReactNode[] = [];
        lines.forEach((ln, idx) => {
            out.push(...renderLine(ln, idx));
            if (idx < lines.length - 1) out.push("\n");
        });
        return out;
    }, [code]);

    const [copied, setCopied] = useState(false);

    const onCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
        } catch {
            setCopied(false);
        }
    }, [code]);

    return (
        <section id="section-five" className="section-anchor section-y">
            <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Code surface */}
                <div className="lg:col-span-7 relative">
                    {/* Floating geometric accent (square with circle) */}
                    <div className="pointer-events-none absolute -top-4 -left-3 size-8 animate-float opacity-70">
                        <div className="relative size-full rounded-[8px] border border-[rgb(255_255_255/0.12)]">
                            <div className="absolute inset-0 rounded-[8px] bg-[radial-gradient(40%_40%_at_50%_50%,rgba(255,255,255,0.08),transparent_70%)]" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-2.5 rounded-full border brand-border" />
                        </div>
                    </div>

                    <div
                        className={cn(
                            "glass card p-4 sm:p-5 lg:p-6 rounded-[var(--radius-sm)]",
                            "border border-[rgb(255_255_255/0.06)] brand-border/30"
                        )}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <span className="text-eyebrow">Example Interview Agent</span>
                                <span className="text-caption text-[rgb(var(--color-text-secondary))]">
                                    Convo‑Lang
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={onCopy}
                                className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-[var(--radius-xs)] text-xs text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text))] hover:bg-[rgb(255_255_255/0.05)] focus-ring"
                                aria-label="Copy code"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        Copy
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="relative rounded-[var(--radius-xs)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] hairline overflow-hidden">
                            <pre className="m-0 p-4 sm:p-5 overflow-auto text-[12.5px] leading-5 tracking-[-0.01em] font-mono">
                                <code style={{ color: COLORS.default }}>{highlightedNodes}</code>
                            </pre>
                            {/* Inner glow border */}
                            <div className="pointer-events-none absolute inset-0 rounded-[var(--radius-xs)] ring-1 ring-inset ring-[rgb(255_255_255/0.05)]" />
                        </div>
                    </div>

                    {/* Centered CTA under the code panel */}
                    <div className="mt-4 flex justify-center">
                        <a
                            href="https://www.convo-lang.ai/"
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn--secondary inline-flex items-center gap-2"
                        >
                            Learn More About Convo-Lang
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Right: Feature bullets */}
                <div className="lg:col-span-5 grid grid-cols-1 gap-4">
                    <header className="grid gap-2 mb-1">
                        <h3 className="text-2xl md:text-3xl font-bold headline-gradient">
                            Convo‑Lang
                        </h3>
                        <p className="text-subtitle">
                            Transparent Agentic Orchestration
                        </p>
                    </header>

                    <article className="card glass p-4 sm:p-5 rounded-[var(--radius-sm)]">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 shrink-0">
                                <Target className="w-5 h-5 text-[rgb(var(--color-text))]" />
                            </div>
                            <div className="grid gap-1">
                                <h4 className="font-medium">Precision Context Engineering</h4>
                                <p className="text-caption">
                                    Curate sources, roles, and guardrails into a single conversation
                                    spec that travels with each Echo—deterministic, versionable, and auditable.
                                </p>
                            </div>
                        </div>
                    </article>

                    <article className="card glass p-4 sm:p-5 rounded-[var(--radius-sm)]">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 shrink-0">
                                <ShieldCheck className="w-5 h-5 text-[rgb(var(--color-text))]" />
                            </div>
                            <div className="grid gap-1">
                                <h4 className="font-medium">Transparent Agentic Behavior</h4>
                                <p className="text-caption">
                                    Plain‑text prompts show what an agent can do, why answers happen, and which
                                    policies apply—clear governance without guesswork.
                                </p>
                            </div>
                        </div>
                    </article>

                    <article className="card card--accent p-4 sm:p-5 rounded-[var(--radius-sm)]">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 shrink-0">
                                <Braces className="w-5 h-5" />
                            </div>
                            <div className="grid gap-1">
                                <h4 className="font-medium">Unified syntax for agentic apps</h4>
                                <p className="text-caption">
                                    One format for system, assistant, and user messages—with structure for tools
                                    and memory hints so complex flows don’t sprawl across files.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>

            {/* CTA band */}
            <div className="container-page mt-10">
                <div className="cta glass card rounded-[var(--radius-md)] p-6 sm:p-8 lg:p-10 border border-[rgb(255_255_255/0.06)] brand-border/40">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="max-w-[60ch]">
                            <h3 className="text-2xl md:text-3xl font-extrabold mb-2 headline-gradient">
                                The company that remembers.
                            </h3>
                            <p className="text-caption">
                                Exit Strategy Echo captures tacit expertise, generates playbooks,
                                and powers AI Echoes for continuity.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <a href="/#cta" className="btn btn--primary">
                                Book a Demo
                            </a>
                            <a href="/#echo" className="btn btn--secondary inline-flex items-center gap-2">
                                Explore ECHO System
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                    <p className="text-center md:text-left text-[12.5px] mt-4 text-[rgb(var(--color-text-secondary))]">
                        Or email hello@mindark.ai to request a walkthrough.
                    </p>
                </div>
            </div>
        </section>
    );
}