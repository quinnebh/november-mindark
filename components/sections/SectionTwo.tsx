import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/util";

/**
 * SectionTwo — Metrics & Graphs (Laptop with pop-up gauges)
 *
 * Requirements met:
 * - Root element is <section>
 * - Content centered via container-page
 * - Full-bleed background allowed; section content stays centered
 * - Named export; no props
 * - Laptop mock with neon “X” screen and three pop-up gauge cards (as in reference)
 * - Animated count-up and gauge fill when in view; respects reduced motion
 * - Dark, luxurious style with glass + subtle brand accents (#752E4F used sparingly)
 */
export function SectionTwo() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(false);
    const prefersReducedMotion = usePrefersReducedMotion();

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

    return (
        <section
            id="metrics"
            ref={sectionRef as any}
            className={cn(
                "section-anchor section-y relative overflow-hidden bg-section"
            )}
        >
            {/* Ambient brand-tinted backdrop */}
            <BackdropSweep />

            <div className="container-page grid gap-8">
                <header className="flex flex-col gap-2">
                    <p className="text-eyebrow">Metrics</p>
                    <h2 className="text-2xl font-bold">
                        Knowledge risk, made visible
                    </h2>
                    <p className="text-caption">
                        A focused look at what leaves when people do—and how Echo helps close the gap.
                    </p>
                </header>

                {/* Laptop mock with pop-up cards */}
                <div className="relative w-full">
                    <div className="relative mx-auto w-full max-w-5xl">
                        <LaptopFrame animate={!prefersReducedMotion}>
                            <NeonXScreen animate={!prefersReducedMotion} />
                        </LaptopFrame>

                        {/* Floating popups (desktop/tablet) */}
                        <div className="hidden md:block">
                            <PopupGauge
                                inView={inView}
                                className={cn(
                                    "absolute -left-6 lg:-left-10 bottom-[10%]",
                                    "w-[280px] lg:w-[340px]"
                                )}
                                delay={0}
                            />

                            <PopupGauge
                                inView={inView}
                                className={cn(
                                    "absolute right-[6%] -top-8",
                                    "w-[260px] lg:w-[300px]"
                                )}
                                delay={120}
                            />

                            <PopupGauge
                                inView={inView}
                                className={cn(
                                    "absolute right-0 bottom-[-18%] lg:bottom-[-10%]",
                                    "w-[260px] lg:w-[300px]"
                                )}
                                delay={240}
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile fallback: stack the popups below */}
                <div className="grid md:hidden grid-cols-1 gap-4">
                    <PopupGauge inView={inView} className="w-full" delay={0} />
                    <PopupGauge inView={inView} className="w-full" delay={80} />
                    <PopupGauge inView={inView} className="w-full" delay={160} />
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

function LaptopFrame({
    children,
    animate = true,
}: {
    children: React.ReactNode;
    animate?: boolean;
}) {
    return (
        <div
            className={cn(
                "relative mx-auto",
                "rounded-[18px] border border-[rgb(255_255_255/0.08)]",
                "bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]",
                "shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
                "overflow-hidden"
            )}
        >
            {/* Top bezel with camera */}
            <div className="relative h-8 bg-[rgb(16_16_18)] flex items-center justify-center">
                <div className="absolute left-6 w-16 h-2 rounded-full bg-[rgb(255_255_255/0.06)]" />
                <div className="w-2 h-2 rounded-full bg-[rgb(0_0_0)] border border-[rgb(255_255_255/0.15)] shadow-[0_0_0_2px_rgba(0,0,0,0.6)_inset]" />
            </div>

            {/* Screen */}
            <div className="relative bg-black">
                <div className="aspect-[16/9] overflow-hidden">{children}</div>
            </div>

            {/* Bottom bar (laptop body hint) */}
            <div className="h-3 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] hairline" />
            {/* Base/foot */}
            <div
                className={cn(
                    "mx-auto mt-2 h-1.5 w-[70%] rounded-full",
                    "bg-[linear-gradient(90deg,rgba(255,255,255,0.28),rgba(255,255,255,0.06),rgba(255,255,255,0.28))]"
                )}
            />
        </div>
    );
}

function NeonXScreen({ animate = true }: { animate?: boolean }) {
    // An SVG “X” with neon glow; animation is a slow pulse/float
    return (
        <div className="relative w-full h-full">
            <svg viewBox="0 0 1600 900" className="w-full h-full">
                <defs>
                    <linearGradient id="xLine" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="rgb(255 80 180)" stopOpacity="0.85" />
                        <stop offset="50%" stopColor="rgb(255 140 220)" stopOpacity="1" />
                        <stop offset="100%" stopColor="rgb(255 80 180)" stopOpacity="0.85" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="8" result="b1" />
                        <feGaussianBlur stdDeviation="18" result="b2" />
                        <feMerge>
                            <feMergeNode in="b2" />
                            <feMergeNode in="b1" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Soft star at center */}
                <radialGradient id="pulse" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgb(255 150 220)" stopOpacity="0.9" />
                    <stop offset="40%" stopColor="rgb(255 80 180)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <rect width="1600" height="900" fill="url(#pulse)">
                    {/* noop */}
                </rect>

                {/* X curves */}
                <g filter="url(#glow)">
                    {/* Curve A */}
                    <path
                        d="M 0 650 C 300 600, 650 520, 800 450 C 950 380, 1250 320, 1600 260"
                        stroke="url(#xLine)"
                        strokeWidth="16"
                        fill="none"
                        opacity="0.9"
                    />
                    {/* Curve B */}
                    <path
                        d="M 0 240 C 360 300, 650 380, 800 450 C 950 520, 1240 600, 1600 640"
                        stroke="url(#xLine)"
                        strokeWidth="16"
                        fill="none"
                        opacity="0.9"
                    />
                </g>
            </svg>

            {/* Gentle animated bloom */}
            <div
                className={cn(
                    "absolute inset-0 pointer-events-none",
                    animate && "animate-float"
                )}
            >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full blur-[80px] bg-[radial-gradient(closest-side,rgba(255,120,200,0.25),transparent_70%)]" />
            </div>
        </div>
    );
}

/* ================= Popup Gauge Card ================= */

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
                // Light popup card to closely match reference image
                "rounded-[12px] bg-[rgb(255_255_255)] text-[rgb(17_17_17)]",
                "shadow-[0_16px_44px_rgba(0,0,0,0.50)] border border-[rgb(0_0_0/0.08)]",
                "p-4 sm:p-5",
                "will-change-transform will-change-opacity",
                inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6",
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
                            <linearGradient id={`gfill-${arcId}`} x1="0" x2="1" y1="0" y2="0">
                                <stop offset="0%" stopColor="rgb(216 130 190)" />
                                <stop offset="100%" stopColor="rgb(0 0 0)" />
                            </linearGradient>
                            <linearGradient id={`brand-${arcId}`} x1="0" x2="1" y1="0" y2="0">
                                <stop offset="0%" stopColor="rgb(216 130 190)" />
                                <stop offset="100%" stopColor="rgb(117 46 79)" />
                            </linearGradient>
                        </defs>

                        {/* Track (black) */}
                        <path
                            d={describeSemiArc(100, 100, r)}
                            stroke="rgb(0 0 0)"
                            strokeWidth={18}
                            fill="none"
                            strokeLinecap="round"
                            opacity="0.86"
                        />
                        {/* Progress (purple brand-ish gradient) */}
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
                            fill="rgb(0 0 0)"
                            fontSize="28"
                        >
                            {value}%
                        </text>
                    </svg>
                </div>

                <div className="grid gap-1">
                    <p className="font-semibold leading-tight">
                        Of organizational knowledge held in individuals.
                    </p>
                    <ul className="text-sm leading-5">
                        <li className="list-disc list-inside">
                            When they leave, it leaves with them
                        </li>
                    </ul>
                </div>
            </div>
        </article>
    );
}

/* ================= Animations ================= */

function useCountUp(
    active: boolean,
    to: number,
    duration = 1400,
    delay = 0
) {
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

/* ================= SVG helpers ================= */

function describeSemiArc(cx: number, cy: number, r: number) {
    const startX = cx - r;
    const startY = cy;
    const endX = cx + r;
    const endY = cy;
    return `M ${startX} ${startY} A ${r} ${r} 0 1 1 ${endX} ${endY}`;
}