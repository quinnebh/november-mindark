import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/util";

/**
 * SectionTwo — Metrics & Graphs (Laptop with pop-up gauges)
 *
 * Updates requested:
 * - Lighter, more defined laptop edges and bezels
 * - Replace the screen's internal light lines with a real video (/images/hero.mp4)
 *
 * Conventions:
 * - Root element is <section>
 * - Content centered via container-page
 * - Named export; no props
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
                    <h2 className="text-2xl font-bold">Knowledge risk, made visible</h2>
                    <p className="text-caption">
                        A focused look at what leaves when people do—and how Echo helps close the gap.
                    </p>
                </header>

                {/* Laptop mock with pop-up cards */}
                <div className="relative w-full">
                    <div className="relative mx-auto w-full max-w-5xl">
                        <LaptopFrame>
                            <LaptopScreenVideo src="/videos/sectiontwo.mp4" />
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

function LaptopFrame({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative mx-auto">
            {/* Outer shell with lighter metallic edges */}
            <div
                className={cn(
                    "relative rounded-[18px] overflow-hidden",
                    // Brighter edge with subtle metallic gradient
                    "bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(220,220,225,0.22)_40%,rgba(180,180,190,0.18))]",
                    "border-2 border-[rgb(255_255_255/0.35)]",
                    "shadow-[0_28px_80px_rgba(0,0,0,0.55)]"
                )}
            >
                {/* Edge highlights (top/left/right glints) */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0.85),rgba(255,255,255,0.35),rgba(255,255,255,0.85))]" />
                    <div className="absolute left-0 top-0 h-full w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.6),transparent)]" />
                    <div className="absolute right-0 top-0 h-full w-px bg-[linear-gradient(180deg,rgba(255,255,255,0.6),transparent)]" />
                </div>

                {/* Bezel with camera (lighter, more obvious) */}
                <div className="relative h-8 bg-[linear-gradient(180deg,rgba(240,240,245,0.75),rgba(210,210,220,0.65))] flex items-center justify-center">
                    <div className="absolute left-6 w-16 h-2 rounded-full bg-[rgb(0_0_0/0.15)]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[rgb(18_18_20)] border border-[rgb(255_255_255/0.7)] shadow-[0_0_0_2px_rgba(0,0,0,0.5)_inset]" />
                </div>

                {/* Screen */}
                <div className="relative bg-black">
                    <div className="aspect-[16/9] overflow-hidden">{children}</div>
                </div>

                {/* Bottom bezel (lighter) */}
                <div className="h-3 bg-[linear-gradient(180deg,rgba(240,240,245,0.65),rgba(210,210,220,0.55))] hairline" />
            </div>

            {/* Base/foot with metallic shine */}
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
            {/* Readability overlays (subtle vignettes + brand-tint sweep) */}
            <div className="absolute inset-0 hero-video__overlay pointer-events-none"></div>
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(800px_320px_at_50%_60%,rgba(117,46,79,0.22),transparent_70%)]" />
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(0deg,rgba(0,0,0,0.32),rgba(0,0,0,0.12)_30%,rgba(0,0,0,0)_55%)]" />
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
                // Light popup card to closely match the reference
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
                        {/* Progress (purple/brand gradient) */}
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