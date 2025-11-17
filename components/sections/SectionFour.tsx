import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/util";
import { Copy, RotateCcw, Send } from "lucide-react";

/**
 * SectionFour — Measurable Results
 * Left: bold headline + three key outcome stats (fade-in)
 * Right: glass chat preview card with avatar image
 *
 * Background: Solid brand magenta (#752E4F) so the section pops from the rest of the page.
 * Motion:
 * - Left column fades in when entering viewport
 * - Counters animate 0 → target (respects reduced motion)
 * - Subtle traveling black lines in the background (global keyframes; paused on reduced motion)
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
                for (const e of entries) {
                    if (e.isIntersecting) setInView(true);
                }
            },
            { rootMargin: "0px 0px -20% 0px", threshold: 0.2 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const animateIn = inView && !reduceMotion;

    // Parameters for gentle traveling lines (purely decorative, behind content)
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
            className="section-anchor section-y relative overflow-hidden bg-[#752E4F] text-[rgb(255_255_255)]"
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

            <div className="container-page relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
                            <div className="flex flex-col">
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

                {/* Right: Chat Preview */}
                <div className="relative">
                    {/* Decorative floating accent (square with circle) */}
                    <div
                        aria-hidden="true"
                        className={cn(
                            "absolute -top-6 -left-6 w-20 h-20 rounded-[12px] border border-[rgb(255_255_255/0.35)] grid place-items-center opacity-80",
                            !reduceMotion && "animate-float"
                        )}
                    >
                        <div className="w-10 h-10 rounded-full border border-[rgb(255_255_255/0.35)]"></div>
                    </div>

                    <div className="glass card p-4 sm:p-5 rounded-[var(--radius-md)] shadow-[0_16px_48px_rgba(0,0,0,0.45)] border border-[rgb(255_255_255/0.18)] bg-[rgb(0_0_0/0.2)]">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <img
                                    src="/favicon.png" /* served from /public/favicon.png */
                                    alt="Echo avatar"
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 rounded-full object-cover ring-1 ring-[rgb(255_255_255/0.25)]"
                                />
                                <div className="leading-tight">
                                    <p className="text-sm font-medium">Executive Assistant</p>
                                    <p className="text-caption text-[12px] text-[rgb(255_255_255/0.85)]">Echo</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-[rgb(255_255_255/0.9)]">
                                <button
                                    type="button"
                                    className="px-2.5 py-1.5 rounded-[var(--radius-xs)] text-xs hover:bg-[rgb(255_255_255/0.12)] focus-ring"
                                    aria-label="Copy"
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                                <button
                                    type="button"
                                    className="px-2.5 py-1.5 rounded-[var(--radius-xs)] text-xs hover:bg-[rgb(255_255_255/0.12)] focus-ring"
                                    aria-label="Reset"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="p-3 sm:p-4 rounded-[var(--radius-sm)] border border-[rgb(255_255_255/0.25)] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]">
                            <p className="text-sm text-[rgb(255_255_255/0.9)] leading-6">
                                I’m currently collaborating across client initiatives to ensure
                                seamless handoffs. Echoes assist with day-to-day decision
                                context, while the Playbook gives new teammates a clear,
                                portable guide to hit the ground running.
                            </p>
                            <p className="text-sm text-[rgb(255_255_255/0.9)] leading-6 mt-3">
                                The combination reduces onboarding time and preserves critical
                                knowledge—making continuity measurable and dependable.
                            </p>
                        </div>

                        {/* Input */}
                        <div className="mt-4 flex items-center gap-2">
                            <input
                                readOnly
                                aria-label="Ask the Echo"
                                placeholder="Ask the Echo… Shift+Enter for new line"
                                className="flex-1 input bg-[rgb(0_0_0/0.25)] border border-[rgb(255_255_255/0.2)] placeholder:text-[rgb(255_255_255/0.65)]"
                                value=""
                            />
                            <button
                                type="button"
                                className="btn btn--secondary shrink-0"
                                aria-label="Send"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>

                        <p className="text-caption mt-2 text-[12px] text-[rgb(255_255_255/0.85)]">
                            Sessions are saved to your account for this Echo.
                        </p>
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
                    animation-iteration-count: infinite;
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