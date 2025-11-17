import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/util";

/**
 * SectionTwo — Metrics & Graphs with floating popups
 * - Sequenced animations (one after another for easier processing):
 *   1) Top-right Gauge (42%) — starts immediately
 *   2) Bottom-left Replacement Cost bars — starts after gauge finishes
 *   3) Bottom-right Turnover Cost — starts after replacement bars finish
 *
 * - Bottom-left popup: Replacement Cost horizontal bars (150%, 275%, 400%) with staggered animation
 *   Labels: Junior, Middle, Senior
 * - Top-right popup: 42% gauge (knowledge in individuals) with simplified title/subtitle
 * - Bottom-right popup: Estimated annual turnover cost viz — $2.5M for a 100-person firm at $50k avg salary
 * - Popups use premium dark glass surfaces with increased opacity for readability.
 */
export function SectionTwo() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (!sectionRef.current) return;
        const el = sectionRef.current;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        setInView(true);
                        io.disconnect();
                    }
                });
            },
            { threshold: 0.25 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Sequenced delays (ms)
    // Gauge anim ~1400ms + path ease; add gap for processing
    const GAUGE_DELAY = 0;
    const COST_DELAY = 1800; // starts after gauge
    // Replacement bars last bar finishes ~980ms after start; add gap
    const TURNOVER_DELAY = 3400; // starts after replacement cost

    return (
        <section
            id="metrics"
            ref={sectionRef as any}
            className={cn("section-anchor section-y relative overflow-hidden bg-section")}
        >
            <BackdropSweep />

            <div className="container-page grid gap-8">
                <header className="flex flex-col gap-2">
                    <p className="text-eyebrow">Metrics</p>
                    <h2 className="text-2xl font-bold">Knowledge risk, made visible</h2>
                    <p className="text-caption">
                        A focused look at what leaves when people do—and how Echo helps close the gap.
                    </p>
                </header>

                {/* Laptop + floating popups */}
                <div className="relative w-full">
                    <div className="relative mx-auto w-full max-w-5xl">
                        <LaptopFrame>
                            <LaptopScreenVideo src="/videos/sectiontwo.mp4" />
                        </LaptopFrame>

                        {/* Floating popups (desktop/tablet) */}
                        <div className="hidden md:block">
                            {/* Bottom-left: Replacement Cost horizontal bars (staggered) */}
                            <PopupCostRange
                                inView={inView}
                                className={cn(
                                    "absolute -left-6 lg:-left-10 bottom-[10%]",
                                    "w-[280px] lg:w-[340px]"
                                )}
                                delay={COST_DELAY}
                            />

                            {/* Top-right: 42% gauge */}
                            <PopupGauge
                                inView={inView}
                                className={cn(
                                    "absolute right-[6%] -top-8",
                                    "w-[260px] lg:w-[300px]"
                                )}
                                delay={GAUGE_DELAY}
                            />

                            {/* Bottom-right: Annual turnover cost — $2.5M */}
                            <PopupTurnoverCost
                                inView={inView}
                                className={cn(
                                    "absolute right-0 bottom-[-18%] lg:bottom-[-10%]",
                                    "w-[280px] lg:w-[340px]"
                                )}
                                delay={TURNOVER_DELAY}
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile fallback — keep the same animation order via delays */}
                <div className="grid md:hidden grid-cols-1 gap-4">
                    <PopupCostRange inView={inView} className="w-full" delay={COST_DELAY} />
                    <PopupTurnoverCost inView={inView} className="w-full" delay={TURNOVER_DELAY} />
                    <PopupGauge inView={inView} className="w-full" delay={GAUGE_DELAY} />
                </div>
            </div>
        </section>
    );
}

/* ================= Helpers & hooks ================= */

function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const listener = () => setReduced(mq.matches);
        listener();
        mq.addEventListener?.("change", listener);
        return () => mq.removeEventListener?.("change", listener);
    }, []);
    return reduced;
}

function BackdropSweep() {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_60%_40%,rgba(117,46,79,0.18),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_20%_80%,rgba(117,46,79,0.10),transparent_70%)]" />
        </div>
    );
}

/* ================= Laptop + Screen ================= */

function LaptopFrame({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative mx-auto">
            {/* Outer shell with lighter metallic edges */}
            <div
                className={cn(
                    "relative rounded-[18px] overflow-hidden",
                    "bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(220,220,225,0.22)_40%,rgba(180,180,190,0.18))]",
                    "border-2 border-[rgb(255_255_255/0.35)]",
                    "shadow-[0_28px_80px_rgba(0,0,0,0.55)]"
                )}
            >
                {/* Edge highlights */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0.85),rgba(255,255,255,0.35),rgba(255,255,255,0.85))]" />
                    <div className="absolute left-0 top-0 h-full w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.6),transparent)]" />
                    <div className="absolute right-0 top-0 h-full w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.6),transparent)]" />
                </div>

                {/* Bezel with camera */}
                <div className="relative h-8 bg-[linear-gradient(180deg,rgba(240,240,245,0.75),rgba(210,210,220,0.65))] flex items-center justify-center">
                    <div className="absolute left-6 w-16 h-2 rounded-full bg-[rgb(0_0_0/0.15)]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[rgb(18_18_20)] border border-[rgb(255_255_255/0.7)] shadow-[0_0_0_2px_rgba(0,0,0,0.5)_inset]" />
                </div>

                {/* Screen */}
                <div className="relative bg-black">
                    <div className="aspect-[16/9] overflow-hidden">{children}</div>
                </div>

                {/* Bottom bezel */}
                <div className="h-3 bg-[linear-gradient(180deg,rgba(240,240,245,0.65),rgba(210,210,220,0.55))] hairline" />
            </div>

            {/* Base */}
            <div className="mx-auto mt-2 h-1.5 w-[72%] rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.7),rgba(200,200,210,0.35),rgba(255,255,255,0.7))]" />
        </div>
    );
}

function LaptopScreenVideo({ src }: { src: string }) {
    return (
        <div className="relative w-full h-full">
            <video
                className="absolute inset-0 w-full h-full object-cover"
                src={src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
            />
            {/* Subtle overlays for depth and legibility */}
            <div className="absolute inset-0 hero-video__overlay pointer-events-none"></div>
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(800px_320px_at_50%_60%,rgba(117,46,79,0.22),transparent_70%)]" />
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(0deg,rgba(0,0,0,0.32),rgba(0,0,0,0.12)_30%,rgba(0,0,0,0)_55%)]" />
        </div>
    );
}

/* ================= Popup: Replacement Cost — Horizontal Bars (150%, 275%, 400%) ================= */

function PopupCostRange({
    className,
    inView,
    delay = 0,
}: {
    className?: string;
    inView: boolean;
    delay?: number;
}) {
    const prefersReducedMotion = usePrefersReducedMotion();
    const duration = prefersReducedMotion ? 0 : 700;

    const MAX = 400;
    bigIntMathCheck();
    const LOW = 150;
    const MED = 275;
    const HIGH = 400;

    // Staggered bar animations (low -> medium -> high)
    const pLow = useProgress(inView, duration, delay + 0);
    const pMed = useProgress(inView, duration, delay + 140);
    const pHigh = useProgress(inView, duration, delay + 280);

    const wLow = (LOW / MAX) * 100 * pLow;
    const wMed = (MED / MAX) * 100 * pMed;
    const wHigh = (HIGH / MAX) * 100 * pHigh;

    return (
        <article
            className={cn(
                // Dark glass surface with subtle brand accent border
                "rounded-[12px] glass-strong card card--accent brand-border",
                "bg-[rgb(255_255_255/0.075)] backdrop-blur-md border border-[rgb(255_255_255/0.08)]",
                "shadow-[0_16px_44px_rgba(0,0,0,0.55)]",
                "p-4 sm:p-5 text-[rgb(var(--color-text))]",
                "will-change-transform will-change-opacity",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                className
            )}
            style={{ transitionDelay: `${delay}ms` }}
            aria-label="Replacement cost of a knowledge worker"
        >
            <div className="grid gap-3">
                <header className="grid gap-1">
                    <h3 className="font-semibold leading-tight">
                        Replacement Cost of a Knowledge Worker
                    </h3>
                </header>

                {/* Horizontal bar chart */}
                <div className="grid gap-3">
                    {/* Rows */}
                    <div className="grid gap-2">
                        {/* Low (Junior) */}
                        <div className="grid grid-cols-[72px_1fr] items-center gap-2">
                            <div className="text-xs text-[rgb(var(--color-text-secondary))]">Junior</div>
                            <div className="relative h-3 rounded-[8px] bg-[rgb(255_255_255/0.075)] overflow-hidden">
                                <div className="pointer-events-none absolute inset-0 flex justify-between">
                                    <span className="w-px h-full bg-[rgb(255_255_255/0.12)]" />
                                    <span className="w-px h-full bg-[rgb(255_255_255/0.12)]" />
                                    <span className="w-px h-full bg-[rgb(255_255_255/0.12)]" />
                                    <span className="w-px h-full bg-[rgb(255_255_255/0.12)]" />
                                </div>
                                <div
                                    className="h-full rounded-[8px] bg-[linear-gradient(90deg,rgba(216,130,190,1),rgba(117,46,79,1))] shadow-[0_0_0_1px_rgba(117,46,79,0.35)_inset]"
                                    style={{
                                        width: `${wLow}%`,
                                        transition: "width 700ms cubic-bezier(0.22,1,0.36,1)",
                                    }}
                                    aria-hidden="true"
                                />
                            </div>
                        </div>

                        {/* Medium */}
                        <div className="grid grid-cols-[72px_1fr] items-center gap-2">
                            <div className="text-xs text-[rgb(var(--color-text-secondary))]">Middle</div>
                            <div className="relative h-3 rounded-[8px] bg-[rgb(255_255_255/0.075)] overflow-hidden">
                                <div className="pointer-events-none absolute inset-0 flex justify-between">
                                    <span className="w-px h-full bg-[rgb(255_255_255/0.12)]" />
                                    <span className="w-px h-full bg-[rgb(255_255_255/0.12)]" />
                                    <span className="w-px h-full bg-[rgb(255_255_255/0.12)]" />
                                    <span className="w-px h-full bg-[rgb(255_255_255/0.12)]" />
                                </div>
                                <div
                                    className="h-full rounded-[8px] bg-[linear-gradient(90deg,rgba(216,130,190,1),rgba(117,46,79,1))] shadow-[0_0_0_1px_rgba(117,46,79,0.35)_inset]"
                                    style={{
                                        width: `${wMed}%`,
                                        transition: "width 700ms cubic-bezier(0.22,1,0.36,1)",
                                    }}
                                    aria-hidden="true"
                                />
                            </div>
                        </div>

                        {/* High */}
                        <div className="grid grid-cols-[72px_1fr] items-center gap-2">
                            <div className="text-xs text-[rgb(var(--color-text-secondary))]">Senior</div>
                            <div className="relative h-3 rounded-[8px] bg-[rgb(255_255_255/0.075)] overflow-hidden">
                                <div className="pointer-events-none absolute inset-0 flex justify-between">
                                    <span className="w-px h-full bg-[rgb(255_255_255/0.12)]" />
                                    <span className="w-px h-full bg-[rgb(255_255_255/0.12)]" />
                                    <span className="w-px h-full bg-[rgb(255_255_255/0.12)]" />
                                    <span className="w-px h-full bg-[rgb(255_255_255/0.12)]" />
                                </div>
                                <div
                                    className="h-full rounded-[8px] bg-[linear-gradient(90deg,rgba(216,130,190,1),rgba(117,46,79,1))] shadow-[0_0_0_1px_rgba(117,46,79,0.35)_inset]"
                                    style={{
                                        width: `${wHigh}%`,
                                        transition: "width 700ms cubic-bezier(0.22,1,0.36,1)",
                                    }}
                                    aria-hidden="true"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Summary: compact spacing */}
                    <div className="flex items-baseline gap-2">
                        <div className="text-[22px] font-bold tracking-tight">150–400%</div>
                        <div className="text-sm text-[rgb(var(--color-text-secondary))]">
                            of yearly salary
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

/* ================= Popup: Gauge (42%) ================= */

function PopupGauge({
    className,
    inView,
    delay = 0,
}: {
    className?: string;
    inView: boolean;
    delay?: number;
}) {
    const target = 42;
    const prefersReducedMotion = usePrefersReducedMotion();
    const value = useCountUp(inView, target, prefersReducedMotion ? 0 : 1400, delay);
    const arcId = useId();

    // Gauge geometry (semi-circle)
    const r = 64;
    const circumference = Math.PI * r;
    const progress = (inView ? value : 0) / 100;
    const dashOffset = useMemo(
        () => circumference * (1 - progress),
        [circumference, progress]
    );

    return (
        <article
            className={cn(
                "rounded-[12px] glass-strong card card--accent brand-border",
                "bg-[rgb(255_255_255/0.075)] backdrop-blur-md border border-[rgb(255_255_255/0.08)]",
                "shadow-[0_16px_44px_rgba(0,0,0,0.55)]",
                "p-4 sm:p-5 text-[rgb(var(--color-text))]",
                "will-change-transform will-change-opacity",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                className
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="grid gap-3">
                <div className="relative mx-auto">
                    <svg
                        viewBox="0 0 200 120"
                        className="w-[260px] max-w-full h-[140px]"
                        role="img"
                        aria-labelledby={`g-${arcId}`}
                    >
                        <title id={`g-${arcId}`}>Knowledge held in individuals</title>
                        <defs>
                            <linearGradient id={`brand-${arcId}`} x1="0" x2="1" y1="0" y2="0">
                                <stop offset="0%" stopColor="rgb(216 130 190)" />
                                <stop offset="100%" stopColor="rgb(117 46 79)" />
                            </linearGradient>
                        </defs>

                        {/* Track (muted light on dark) */}
                        <path
                            d={describeSemiArc(100, 100, r)}
                            stroke="rgb(255 255 255 / 0.2)"
                            strokeWidth={18}
                            fill="none"
                            strokeLinecap="round"
                        />
                        {/* Progress (brand gradient) */}
                        <path
                            d={describeSemiArc(100, 100, r)}
                            stroke={`url(#brand-${arcId})`}
                            strokeWidth={18}
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={dashOffset}
                            style={{
                                transition: "stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)",
                            }}
                        />
                        {/* Value */}
                        <text
                            x="100"
                            y="92"
                            textAnchor="middle"
                            className="font-semibold"
                            fill="rgb(255 255 255)"
                            fontSize="28"
                        >
                            {value}%
                        </text>
                    </svg>
                </div>

                {/* Updated copy: title + subtitle */}
                <div className="grid gap-1">
                    <h4 className="font-semibold leading-tight">
                        Of organizational knowledge is held in individuals.
                    </h4>
                    <p className="text-sm text-[rgb(var(--color-text-secondary))]">
                        When they leave it leaves with them.
                    </p>
                </div>
            </div>
        </article>
    );
}

/* ================= Popup: Annual Turnover Cost ($2.5M) ================= */

function PopupTurnoverCost({
    className,
    inView,
    delay = 0,
}: {
    className?: string;
    inView: boolean;
    delay?: number;
}) {
    const prefersReducedMotion = usePrefersReducedMotion();
    const duration = prefersReducedMotion ? 0 : 1200;

    const MAX = 3_000_000; // $3.0M scale max for the bar
    const TARGET = 2_500_000; // $2.5M emphasized figure

    const progress = useProgress(inView, duration, delay); // 0..1
    const fillPct = (TARGET / MAX) * 100 * progress;

    const money = useCountUp(inView, TARGET, prefersReducedMotion ? 0 : 1200, delay + 150);

    return (
        <article
            className={cn(
                "rounded-[12px] glass-strong card card--accent brand-border",
                "bg-[rgb(255_255_255/0.075)] backdrop-blur-md border border-[rgb(255_255_255/0.08)]",
                "shadow-[0_16px_44px_rgba(0,0,0,0.55)]",
                "p-4 sm:p-5 text-[rgb(var(--color-text))]",
                "will-change-transform will-change-opacity",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                className
            )}
            style={{ transitionDelay: `${delay}ms` }}
            aria-label="Estimated annual turnover cost visualization"
        >
            <div className="grid gap-3">
                <header className="grid gap-1">
                    <h3 className="font-semibold leading-tight">
                        Estimated Annual Turnover Cost
                    </h3>
                    <p className="text-sm text-[rgb(var(--color-text-secondary))]">
                        100-person firm • $50k average salary
                    </p>
                </header>

                {/* Emphasized figure */}
                <div className="flex items-baseline justify-between">
                    <div className="text-[28px] sm:text-[30px] font-extrabold tracking-tight">
                        <span className="text-transparent bg-[linear-gradient(90deg,rgb(117_46_79),rgb(216_130_190))] bg-clip-text">
                            {formatMoneyCompact(money)}
                        </span>
                    </div>
                    <div className="text-sm font-medium text-[rgb(var(--color-text-secondary))]">
                        per year
                    </div>
                </div>

                {/* Bar to 3.0M with alarm emphasis */}
                <div className="grid gap-2">
                    <div className="relative h-3 rounded-[8px] bg-[rgb(255_255_255/0.075)] overflow-hidden">
                        {/* grid ticks at 1M, 2M, 3M */}
                        <div className="pointer-events-none absolute inset-0 flex justify-between">
                            <span className="w-px h-full bg-[rgb(255_255_255/0.12)]" />
                            <span className="w-px h-full bg-[rgb(255_255_255/0.12)]" />
                            <span className="w-px h-full bg-[rgb(255_255_255/0.12)]" />
                        </div>

                        {/* Filled portion */}
                        <div
                            className="absolute top-0 left-0 h-full rounded-[8px] bg-[linear-gradient(90deg,rgba(117,46,79,1),rgba(216,130,190,1))] shadow-[0_0_0_1px_rgba(117,46,79,0.35)_inset]"
                            style={{
                                width: `${fillPct}%`,
                                transition: "width 800ms cubic-bezier(0.22,1,0.36,1)",
                            }}
                        />

                        {/* Marker dot */}
                        <span
                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border border-[rgb(117_46_79/0.7)]"
                            style={{
                                left: `${fillPct}%`,
                                transition: "left 800ms cubic-bezier(0.22,1,0.36,1)",
                            }}
                            aria-hidden="true"
                        />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[rgb(var(--color-text-secondary))]">
                        <span>$0</span>
                        <span>$1.0M</span>
                        <span>$2.0M</span>
                        <span>$3.0M</span>
                    </div>
                </div>

                <p className="text-sm text-[rgb(var(--color-text-secondary))]">
                    Recruiting, ramp time, and loss of continuity compound rapidly.
                </p>
            </div>
        </article>
    );
}

/* ================= Animation utilities ================= */

function useCountUp(active: boolean, to: number, duration = 1400, delay = 0) {
    const [val, setVal] = useState(0);

    useEffect(() => {
        if (!active) return;
        let raf = 0;
        let start = 0;
        const from = 0;

        const tick = (ts: number) => {
            if (!start) start = ts;
            const t = Math.max(0, ts - start - delay);
            const p = Math.min(1, duration === 0 ? 1 : t / duration);
            const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
            setVal(Math.round(from + (to - from) * eased));
            if (p < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [active, to, duration, delay]);

    return val;
}

function useProgress(active: boolean, duration = 1000, delay = 0) {
    const [p, setP] = useState(0);

    useEffect(() => {
        if (!active) return;
        let raf = 0;
        let start = 0;

        const tick = (ts: number) => {
            if (!start) start = ts;
            const t = Math.max(0, ts - start - delay);
            const ratio = Math.min(1, duration === 0 ? 1 : t / duration);
            const eased = 1 - Math.pow(1 - ratio, 3); // easeOutCubic
            setP(eased);
            if (ratio < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [active, duration, delay]);

    return p;
}

/* ================= Format helpers ================= */

function formatMoneyCompact(n: number) {
    if (n >= 1_000_000) {
        const m = n / 1_000_000;
        const s = (Math.round(m * 10) / 10).toFixed(1);
        return `$${stripTrailingZero(s)}M`;
    }
    if (n >= 1_000) {
        const k = n / 1_000;
        const s = (Math.round(k * 10) / 10).toFixed(1);
        return `$${stripTrailingZero(s)}k`;
    }
    return `$${n}`;
}
function stripTrailingZero(s: string) {
    return s.endsWith(".0") ? s.slice(0, -2) : s;
}

/* ================= SVG helper ================= */

function describeSemiArc(cx: number, cy: number, r: number) {
    const startX = cx - r;
    const startY = cy;
    const endX = cx + r;
    const endY = cy;
    return `M ${startX} ${startY} A ${r} ${r} 0 1 1 ${endX} ${endY}`;
}

/* Local helper (no-op, ensures TS keeps MAX as number and not bigint) */
function bigIntMathCheck() {
    return;
}