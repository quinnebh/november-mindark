import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/util";
import { Copy, RotateCcw, Send } from "lucide-react";

/**
 * SectionFour — Measurable Results
 * Left: headline + three KPI counters (fade-in + count up)
 * Right: Laptop mockup (16:9) showing the Executive Assistant chat
 *
 * Visuals
 * - Section background: solid brand magenta (#752E4F)
 * - Subtle traveling black lines in the background for gentle motion (paused on reduced motion)
 * - In-screen accents use brand color tokens: thin borders, rings, small glows, and primary CTA buttons
 *
 * Note: Phone removed per request.
 */
export function SectionFour() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        const m = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduceMotion(m.matches);
        const onChange = () => setReduceMotion(m.matches);
        m.addEventListener?.("change", onChange);
        return () => m.removeEventListener?.("change", onChange);
    }, []);

    useEffect(() => {
        if (!sectionRef.current) return;
        const el = sectionRef.current;
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) if (e.isIntersecting) setInView(true);
            },
            { rootMargin: "0px 0px -20% 0px", threshold: 0.2 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const animateIn = inView && !reduceMotion;

    // Decorative traveling lines configuration
    const lines = useMemo(
        () =>
            Array.from({ length: 14 }).map((_, i) => {
                const top = 6 + i * 6; // 6% → ~90%
                const height = i % 5 === 0 ? 2 : 1;
                const width = 120 + ((i * 37) % 80); // 120–200px
                const duration = 9 + ((i * 7) % 9); // 9–17s
                const delay = (i * 0.7) % 8; // up to 8s initial offset
                const reverse = i % 3 === 0; // some go right-to-left
                const opacity = 0.18 + (((i * 3) % 7) * 0.01); // ~0.18–0.24
                return { id: i, top, height, width, duration, delay, reverse, opacity };
            }),
        []
    );

    return (
        <section
            id="results"
            ref={sectionRef}
            className="section-anchor section-y relative overflow-hidden bg-[#752E4F] text-[rgb(255_255_255)] min-h-[860px]"
            aria-label="Measurable results"
        >
            {/* Traveling black lines layer (behind content) */}
            <div
                className={cn(
                    "pointer-events-none absolute inset-0 overflow-hidden z-0",
                    reduceMotion && "ma-lines-paused"
                )}
                aria-hidden="true"
            >
                {lines.map((l) => (
                    <span
                        key={l.id}
                        className={cn("ma-line-base", l.reverse ? "ma-line-rev" : "ma-line")}
                        style={{
                            top: `${l.top}%`,
                            height: `${l.height}px`,
                            width: `${l.width}px`,
                            opacity: l.opacity,
                            animationDuration: `${l.duration}s`,
                            animationDelay: `${l.delay}s`,
                        }}
                    />
                ))}
            </div>

            <div className="container-page relative z-10 grid grid-cols-1 xl:grid-cols-[1fr_1.5fr] gap-10 xl:gap-14 items-center">
                {/* Left: Headline + Stats (fade-in) */}
                <div className="flex flex-col gap-6">
                    <header
                        className={cn(
                            "grid gap-3 transition-all duration-700 ease-out will-change-transform",
                            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                            reduceMotion && "transition-none opacity-100 translate-y-0"
                        )}
                    >
                        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                            Measurable Results
                        </h2>
                    </header>

                    <ul className="grid gap-4">
                        <li
                            className={cn(
                                "card card--ghost p-4 rounded-[var(--radius-sm)] flex items-center justify-between bg-[rgb(0_0_0/0.12)] border border-[rgb(255_255_255/0.14)] transition-all duration-700 ease-out will-change-transform",
                                animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                                reduceMotion && "transition-none opacity-100 translate-y-0"
                            )}
                            style={{ transitionDelay: animateIn ? "120ms" : "0ms" }}
                        >
                            <div className="flex flex-col">
                                <span className="sr-only">Faster Onboarding</span>
                                <StatNumber
                                    target={70}
                                    suffix="%"
                                    label="Faster Onboarding"
                                    start={inView}
                                    reduceMotion={reduceMotion}
                                />
                            </div>
                        </li>

                        <li
                            className={cn(
                                "card card--ghost p-4 rounded-[var(--radius-sm)] flex items-center justify-between bg-[rgb(0_0_0/0.12)] border border-[rgb(255_255_255/0.14)] transition-all duration-700 ease-out will-change-transform",
                                animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                                reduceMotion && "transition-none opacity-100 translate-y-0"
                            )}
                            style={{ transitionDelay: animateIn ? "240ms" : "0ms" }}
                        >
                            <div className="flex flex-col">
                                <span className="sr-only">Continuity Across Transitions</span>
                                <StatNumber
                                    target={100}
                                    suffix="%"
                                    label="Continuity Across Transitions"
                                    start={inView}
                                    reduceMotion={reduceMotion}
                                />
                            </div>
                        </li>

                        <li
                            className={cn(
                                "card card--ghost p-4 rounded-[var(--radius-sm)] flex items-center justify-between bg-[rgb(0_0_0/0.12)] border border-[rgb(255_255_255/0.14)] transition-all duration-700 ease-out will-change-transform",
                                animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                                reduceMotion && "transition-none opacity-100 translate-y-0"
                            )}
                            style={{ transitionDelay: animateIn ? "360ms" : "0ms" }}
                        >
                            <div className="flex items-baseline gap-2">
                                <span className="sr-only">24/7 Access to expertise</span>
                                <StatNumber
                                    target={24}
                                    suffix="/7"
                                    label="Access to expertise"
                                    start={inView}
                                    reduceMotion={reduceMotion}
                                />
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Right: Laptop mockup — wider, true 16:9 aspect via CSS aspect-ratio */}
                <div className="relative w-full">
                    <div className="relative flex-1 min-w-[520px] max-w-[1200px] w-full mx-auto">
                        {/* Screen with thin bezel */}
                        <div
                            className="relative mx-auto w-full rounded-[16px] bg-[rgb(12_12_12)] border border-[rgb(255_255_255/0.16)] shadow-[0_30px_80px_rgba(0,0,0,0.45)] overflow-hidden"
                            style={{ aspectRatio: "16 / 9", minHeight: 380 }}
                        >
                            {/* Top brand hairline */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-[rgb(var(--color-brand)/0.45)]" />

                            {/* Tiny camera dot */}
                            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[rgb(34_34_34)] ring-2 ring-[rgb(0_0_0/0.35)]"></div>

                            {/* Laptop chat header */}
                            <div className="flex items-center justify-between px-4 py-2.5 bg-[rgb(255_255_255/0.02)] border-b border-[rgb(var(--color-brand)/0.35)]">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/favicon.png"
                                        alt="Echo avatar"
                                        width={28}
                                        height={28}
                                        className="w-7 h-7 rounded-full object-cover ring-1 ring-[rgb(var(--color-brand)/0.4)]"
                                    />
                                    <div className="leading-tight">
                                        <p className="text-[13px] font-medium">Executive Assistant</p>
                                        <p className="text-[11px] text-[rgb(255_255_255/0.7)]">Echo</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-[rgb(255_255_255/0.9)]">
                                    <button
                                        type="button"
                                        className="px-2 py-1 rounded-[8px] text-xs hover:bg-[rgb(var(--color-brand)/0.18)] focus-ring"
                                        aria-label="Copy"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        className="px-2 py-1 rounded-[8px] text-xs hover:bg-[rgb(var(--color-brand)/0.18)] focus-ring"
                                        aria-label="Reset"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Conversation area (space above input) */}
                            <div className="absolute inset-x-0 top-[52px] bottom-[64px] px-4 py-3 overflow-auto">
                                {/* Assistant bubble (brand-accent border + glow) */}
                                <div className="max-w-[78%] p-3 rounded-[12px] border border-[rgb(var(--color-brand)/0.45)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] brand-glow">
                                    <p className="text-[13px] leading-6 text-[rgb(255_255_255/0.92)]">
                                        I’m coordinating across client initiatives to keep projects aligned.
                                        Echoes preserve decision context, while the Playbook helps new teammates
                                        ramp quickly.
                                    </p>
                                </div>

                                {/* User bubble (neutral) */}
                                <div className="max-w-[70%] ml-auto mt-3 p-3 rounded-[12px] bg-[rgb(255_255_255/0.08)] text-[13px]">
                                    What’s the current status of the Bravespace rollout?
                                </div>

                                {/* Assistant bubble (brand-accent) */}
                                <div className="max-w-[78%] mt-3 p-3 rounded-[12px] border border-[rgb(var(--color-brand)/0.45)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] brand-glow">
                                    <p className="text-[13px] leading-6 text-[rgb(255_255_255/0.92)]">
                                        The training sessions are scheduled and materials are finalized.
                                        I can share the checklist and contacts for approvals if needed.
                                    </p>
                                </div>
                            </div>

                            {/* Input row */}
                            <div className="absolute left-0 right-0 bottom-0 px-3 py-3 bg-[rgb(0_0_0/0.35)] border-t border-[rgb(var(--color-brand)/0.35)]">
                                <div className="flex items-center gap-2">
                                    <input
                                        readOnly
                                        aria-label="Type a message"
                                        placeholder="Ask the Echo… Shift+Enter for new line"
                                        className="flex-1 input bg-[rgb(0_0_0/0.35)] border border-[rgb(var(--color-brand)/0.35)] placeholder:text-[rgb(255_255_255/0.65)] caret-[rgb(var(--color-brand))]"
                                        value=""
                                    />
                                    <button type="button" className="btn btn--primary shrink-0" aria-label="Send">
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-[11px] text-[rgb(255_255_255/0.65)] mt-1">
                                    Sessions are saved to your account for this Echo.
                                </p>
                            </div>
                        </div>

                        {/* Laptop base */}
                        <div className="mx-auto w-[96%] h-4 rounded-b-[16px] bg-[linear-gradient(180deg,rgba(0,0,0,0.35),rgba(0,0,0,0.2))] border-x border-b border-[rgb(255_255_255/0.12)] mt-2" />
                        <div className="mx-auto w-[60%] h-1 rounded-full bg-[rgb(0_0_0/0.45)] mt-1" />
                    </div>
                </div>
            </div>

            {/* Global keyframes and helpers for traveling lines */}
            <style jsx global>{`
                @keyframes ma-line {
                    0% {
                        transform: translate3d(-20vw, 0, 0);
                        opacity: 0.16;
                    }
                    10% {
                        opacity: 0.22;
                    }
                    90% {
                        opacity: 0.22;
                    }
                    100% {
                        transform: translate3d(100vw, 0, 0);
                        opacity: 0.12;
                    }
                }
                @keyframes ma-line-rev {
                    0% {
                        transform: translate3d(100vw, 0, 0);
                        opacity: 0.16;
                    }
                    10% {
                        opacity: 0.22;
                    }
                    90% {
                        opacity: 0.22;
                    }
                    100% {
                        transform: translate3d(-20vw, 0, 0);
                        opacity: 0.12;
                    }
                }
                .ma-line-base {
                    position: absolute;
                    left: 0;
                    background: rgba(0, 0, 0, 0.22);
                    box-shadow: 0 0 0.5px rgba(0, 0, 0, 0.18);
                    will-change: transform, opacity;
                }
                .ma-line {
                    animation-name: ma-line;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
                .ma-line-rev {
                    animation-name: ma-line-rev;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite.
                }
                .ma-lines-paused .ma-line,
                .ma-lines-paused .ma-line-rev {
                    animation-play-state: paused !important;
                }
            `}</style>
        </section>
    );
}

/**
 * StatNumber — Animated counter for headline stats
 */
function StatNumber({
    target,
    duration = 1300,
    start,
    suffix,
    label,
    reduceMotion,
}: {
    target: number;
    duration?: number;
    start: boolean;
    suffix?: string;
    label?: string;
    reduceMotion?: boolean;
}) {
    const [val, setVal] = useState(0);

    const ease = useMemo(() => (t: number) => 1 - Math.pow(1 - t, 3), []);

    useEffect(() => {
        if (!start) return;
        if (reduceMotion) {
            setVal(target);
            return;
        }
        let raf = 0;
        const t0 = performance.now();
        const step = (now: number) => {
            const p = Math.min(1, (now - t0) / duration);
            setVal(Math.round(ease(p) * target));
            if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [start, target, duration, ease, reduceMotion]);

    return (
        <div className="flex items-baseline gap-3" aria-live="polite">
            <span className="text-4xl md:text-5xl font-extrabold leading-none">
                {val}
                {suffix || ""}
            </span>
            {label && <span className="text-subtitle">{label}</span>}
        </div>
    );
}