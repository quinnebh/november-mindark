import React, { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/util";

/**
 * SectionTwo — Metrics & Impact
 * - Animated counters
 * - Semi-circle gauge (42%)
 * - Branded, glassy graph surfaces
 *
 * Rules:
 * - Root element is <section>
 * - No props on the section export
 * - Named export using function keyword
 * - Content centered via container-page
 */
export function SectionTwo() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (!sectionRef.current) return;
        const el = sectionRef.current;
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        setActive(true);
                        // Only animate once
                        obs.disconnect();
                    }
                });
            },
            { threshold: 0.25 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <section
            id="metrics"
            ref={sectionRef as any}
            className={cn(
                "section-anchor section-y relative overflow-hidden",
                // subtle full-bleed background
                "bg-section"
            )}
        >
            {/* Ambient brand-tinted backdrop sweep */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 opacity-40"
            >
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full blur-3xl bg-[radial-gradient(closest-side,rgba(117,46,79,0.25),transparent_70%)]"></div>
                <div className="absolute bottom-0 right-0 w-[720px] h-[720px] rounded-full blur-3xl bg-[radial-gradient(closest-side,rgba(117,46,79,0.18),transparent_70%)]"></div>
            </div>

            <div className="container-page grid gap-8">
                <header className="flex flex-col gap-2">
                    <p className="text-eyebrow">Metrics</p>
                    <h2 className="text-2xl font-bold">Make continuity measurable</h2>
                    <p className="text-caption">
                        Animated values convey impact at a glance. Glassy, brand-aligned graphs keep the focus on clarity.
                    </p>
                </header>

                {/* Top: Gauge + Metric tiles */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <GaugeCard active={active} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <MetricTile
                            label="Knowledge Retained"
                            target={92}
                            suffix="%"
                            active={active}
                            caption="Coverage captured across roles"
                        />
                        <MetricTile
                            label="Days Faster Onboarding"
                            target={45}
                            suffix=""
                            active={active}
                            caption="Clarity and repeatability"
                        />
                        <MetricTile
                            label="Weeks to Competency"
                            target={3}
                            suffix=""
                            active={active}
                            caption="Accelerated ramp for new hires"
                        />
                        <MetricTile
                            label="Answer Confidence"
                            target={96}
                            suffix="%"
                            active={active}
                            caption="Echo responses with traceable context"
                        />
                    </div>
                </div>

                {/* Graph surfaces */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <KnowledgeRetainedBars active={active} />
                    <OnboardingReductionArea active={active} />
                </div>
            </div>
        </section>
    );
}

/* ========== Hooks and utilities ========== */

function useCountUp(active: boolean, to: number, duration = 1400) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!active) return;
        let raf = 0;
        let start = 0;
        const from = 0;
        const animate = (ts: number) => {
            if (!start) start = ts;
            const elapsed = ts - start;
            const t = Math.min(1, elapsed / duration);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(from + (to - from) * eased));
            if (t < 1) {
                raf = requestAnimationFrame(animate);
            }
        };
        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [active, to, duration]);
    return val;
}

/* ========== Components (internal) ========== */

function MetricTile(props: {
    label: string;
    target: number;
    suffix: string;
    active: boolean;
    caption?: string;
}) {
    const value = useCountUp(props.active, props.target, 1300);
    return (
        <div className="card p-5">
            <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-semibold tabular-nums">{value}</span>
                {props.suffix && (
                    <span className="text-lg text-[rgb(var(--color-text-secondary))]">
                        {props.suffix}
                    </span>
                )}
            </div>
            <div className="text-sm font-medium">{props.label}</div>
            {props.caption && (
                <div className="text-caption mt-1">{props.caption}</div>
            )}
        </div>
    );
}

function GaugeCard({ active }: { active: boolean }) {
    const target = 42;
    const value = useCountUp(active, target, 1500);
    const id = useId();
    // Semi-circle gauge calculations
    const r = 56;
    const circumference = Math.PI * r;
    const progress = (active ? value : 0) / 100;
    const dashOffset = circumference * (1 - progress);

    return (
        <article className="card card--accent p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="relative mx-auto">
                    <svg
                        viewBox="0 0 160 100"
                        width="100%"
                        className="w-[240px] h-[150px]"
                        aria-labelledby={`gaugeTitle-${id}`}
                        role="img"
                    >
                        <title id={`gaugeTitle-${id}`}>
                            42 percent of organizational knowledge is held in individuals
                        </title>
                        <defs>
                            <linearGradient id={`brandGrad-${id}`} x1="0" x2="1" y1="0" y2="0">
                                <stop offset="0%" stopColor="rgb(var(--color-brand))" stopOpacity="0.85" />
                                <stop offset="100%" stopColor="rgb(255 255 255)" stopOpacity="0.55" />
                            </linearGradient>
                        </defs>
                        {/* Track */}
                        <path
                            d={describeSemiArc(80, 90, r)}
                            stroke="rgb(255 255 255 / 0.12)"
                            strokeWidth={16}
                            fill="none"
                            strokeLinecap="round"
                        />
                        {/* Progress */}
                        <path
                            d={describeSemiArc(80, 90, r)}
                            stroke={`url(#brandGrad-${id})`}
                            className="brand-glow"
                            strokeWidth={16}
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={dashOffset}
                            style={{
                                transition: "stroke-dashoffset 1200ms cubic-bezier(0.22,1,0.36,1)",
                            }}
                        />
                        {/* Value */}
                        <text
                            x="80"
                            y="78"
                            textAnchor="middle"
                            className="font-semibold"
                            fill="currentColor"
                            fontSize="28"
                        >
                            {value}%
                        </text>
                    </svg>
                </div>

                <div>
                    <h3 className="font-semibold mb-1">
                        Knowledge locked in individuals
                    </h3>
                    <p className="text-caption">
                        An estimated 42% of organizational knowledge is held in individuals.
                        When they leave, it leaves with them. Echo captures, preserves, and
                        makes it accessible.
                    </p>
                </div>
            </div>
        </article>
    );
}

function KnowledgeRetainedBars({ active }: { active: boolean }) {
    // Example monthly progression (percent retained as Echo + Playbook mature)
    const bars = [
        { x: "0%", h: 0.58 },
        { x: "14%", h: 0.72 },
        { x: "28%", h: 0.81 },
        { x: "42%", h: 0.86 },
        { x: "56%", h: 0.91 },
        { x: "70%", h: 0.95 },
        { x: "84%", h: 0.97 },
    ];

    return (
        <div className="graph-surface grid-ticks p-4 rounded-[var(--radius-sm)] min-h-[220px]">
            <h3 className="text-sm font-semibold mb-3">Knowledge Retained (coverage)</h3>
            <div className="relative h-[160px] rounded-[var(--radius-sm)] overflow-hidden">
                {/* Bars */}
                {bars.map((b, i) => (
                    <div
                        key={i}
                        className="absolute bottom-0 w-[10%] rounded-[var(--radius-xs)] bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.06))]"
                        style={{
                            left: b.x,
                            height: active ? `${b.h * 100}%` : "8%",
                            transition: `height 900ms cubic-bezier(0.22,1,0.36,1) ${i * 70}ms`,
                        }}
                    />
                ))}
                {/* Thin brand accent line at top */}
                <div className="absolute inset-x-0 top-0 h-px bg-[rgb(var(--color-brand)/0.25)]" />
            </div>
        </div>
    );
}

function OnboardingReductionArea({ active }: { active: boolean }) {
    // Simple path reveal by clipping width
    return (
        <div className="graph-surface p-4 rounded-[var(--radius-sm)] min-h-[220px] brand-glow">
            <h3 className="text-sm font-semibold mb-3">Onboarding Time Reduction</h3>
            <div className="relative h-[160px] grid-ticks rounded-[var(--radius-sm)] overflow-hidden">
                <div
                    className="absolute inset-0 transition-[clip-path] duration-1000 ease-out"
                    style={{
                        clipPath: active
                            ? "inset(0% 0% 0% 0%)"
                            : "inset(0% 100% 0% 0%)",
                    }}
                >
                    <svg viewBox="0 0 400 160" className="w-full h-full">
                        <defs>
                            <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="rgb(var(--color-brand))" stopOpacity="0.65"></stop>
                                <stop offset="100%" stopColor="rgb(255 255 255)" stopOpacity="0.06"></stop>
                            </linearGradient>
                        </defs>
                        <path
                            d="M0,140 C60,120 120,110 180,90 C240,70 300,40 360,30 L400,160 L0,160 Z"
                            fill="url(#areaGrad)"
                        />
                        <path
                            d="M0,140 C60,120 120,110 180,90 C240,70 300,40 360,30"
                            stroke="rgb(var(--color-brand))"
                            strokeOpacity="0.85"
                            fill="none"
                            strokeWidth="2.5"
                        />
                    </svg>
                </div>
            </div>
            <p className="text-caption mt-2">
                Typical teams see 30–45 day reductions as tribal knowledge becomes searchable and structured.
            </p>
        </div>
    );
}

/* ========== SVG helpers ========== */

/**
 * describeSemiArc
 * Returns an SVG arc path for a 180° semicircle.
 * cx, cy are the center point; r is radius.
 */
function describeSemiArc(cx: number, cy: number, r: number) {
    const startX = cx - r;
    const startY = cy;
    const endX = cx + r;
    const endY = cy;
    // large-arc-flag = 1 for 180°, sweep-flag = 1 (clockwise)
    return `M ${startX} ${startY} A ${r} ${r} 0 1 1 ${endX} ${endY}`;
}