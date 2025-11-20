import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/util";

/**
 * SectionThree — Story & Solutions
 * Updates:
 * - Left-third video removed (prior request).
 * - Grid backgrounds removed from visuals.
 * - Adds bold white section title: "The Echo System".
 * - Removes step index labels and "Story & Solutions" text from cards.
 * - Visuals animate like GIFs with refined motion.
 * - Interview visual slowed slightly for subtlety.
 * Route anchor: /#section-three
 */
export function SectionThree() {
    const reducedMotion = usePrefersReducedMotion();

    return (
        <section
            id="section-three"
            className={cn("section-anchor section-y bg-section relative")}
        >
            {/* subtle background gradient sweep spanning full width */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_20%_10%,rgba(117,46,79,0.20),rgba(0,0,0,0)_60%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0)_35%)]"></div>
            </div>

            <div className="container-page grid grid-cols-1 gap-6">
                {/* Section Title */}
                <header className="mb-2 md:mb-4">
                    <h2 className="text-[rgb(255_255_255)] font-bold text-2xl md:text-3xl">
                        The Echo System
                    </h2>
                </header>

                {/* Narrative cards (full-width stacking) */}
                <div className="grid grid-cols-1 gap-6">
                    <NarrativeCard
                        title="Centralize what matters"
                        copy="We gather documents, meeting notes, process flows, and project details to uncover context and centralize information."
                        accentVisual={<DiscoverVisual reducedMotion={reducedMotion} />}
                    />

                    <NarrativeCard
                        title="Interview for the unwritten"
                        copy="Our Interview Agent (IA) engages the expert with organizational context and managerial goals to surface the unwritten know‑how—focusing on the vital 20% that drives 80% of results."
                        accent
                        accentVisual={<InterviewVisual reducedMotion={reducedMotion} />}
                    />

                    <NarrativeCard
                        title="Deploy Echo + Playbook"
                        copy="The Continuity Engine auto‑generates an onboarding playbook and a simple Knowledge Dashboard to empower a new hire—achieving in‑flow in weeks, not months, with significantly reduced onboarding costs."
                        accentVisual={<ActivateVisual reducedMotion={reducedMotion} />}
                    />
                </div>
            </div>
        </section>
    );
}

/* =========================
   Subcomponents & hooks
   ========================= */

function NarrativeCard(props: {
    title: string;
    copy: string;
    accent?: boolean;
    accentVisual?: React.ReactNode;
}) {
    const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });

    return (
        <article
            ref={ref}
            className={cn(
                "card p-0 overflow-hidden rounded-[var(--radius-sm)]",
                props.accent ? "card--accent brand-border" : ""
            )}
        >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-0">
                {/* Copy block */}
                <div
                    className={cn(
                        "p-6 md:p-7 flex flex-col gap-3 transition-all duration-700 ease-out",
                        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                    )}
                >
                    <h3 className="font-semibold text-base md:text-lg">{props.title}</h3>
                    <p className="text-caption">{props.copy}</p>
                </div>

                {/* Visual block (glass only, no grid) */}
                <div className="relative min-h-[160px] md:min-h-[100%]">
                    <div className="absolute inset-0 glass rounded-none md:rounded-l-[var(--radius-sm)] overflow-hidden">
                        {/* shimmer placeholder layer */}
                        <div
                            aria-hidden="true"
                            className={cn(
                                "absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04),rgba(255,255,255,0.08),rgba(255,255,255,0.04))] translate-x-[-120%]",
                                "transition-transform duration-[1800ms] ease-out",
                                inView ? "translate-x-[120%]" : ""
                            )}
                        ></div>

                        {/* accent visual content */}
                        <div className="absolute inset-0 p-3 md:p-4">
                            {props.accentVisual}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

/* -------------------------
   Inline accent visuals (animated like GIFs)
   ------------------------- */

function DiscoverVisual({ reducedMotion }: { reducedMotion: boolean }) {
    // Animated inward "light" traveling from outer dots into the center node
    const nodes = useMemo(() => new Array(14).fill(0).map((_, i) => i), []);
    return (
        <div className="relative w-full h-full">
            <svg
                viewBox="0 0 300 200"
                className="w-full h-full"
                data-paused={reducedMotion ? "true" : "false"}
            >
                <style>{`
                    @keyframes dash-in {
                        from { stroke-dashoffset: 120; }
                        to   { stroke-dashoffset: 0; }
                    }
                    @keyframes center-glow {
                        0%, 90%, 100% { r: 10; opacity: .85; }
                        40% { r: 13; opacity: 1; }
                    }
                    @keyframes outer-pulse {
                        0%, 100% { opacity: .45; }
                        50% { opacity: .95; }
                    }
                    svg[data-paused="true"] * { animation-play-state: paused !important; }
                `}</style>

                <defs>
                    <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgb(var(--color-brand))" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="rgb(var(--color-brand-700))" stopOpacity="0.0" />
                    </radialGradient>
                </defs>

                {/* base spokes */}
                {nodes.map((i) => {
                    const angle = (i / nodes.length) * Math.PI * 2;
                    const x = 150 + Math.cos(angle) * 92;
                    const y = 100 + Math.sin(angle) * 68;
                    return (
                        <g key={`base-${i}`}>
                            <line x1={x} y1={y} x2={150} y2={100} stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
                        </g>
                    );
                })}

                {/* animated "light" traveling inward */}
                {nodes.map((i) => {
                    const angle = (i / nodes.length) * Math.PI * 2;
                    const x = 150 + Math.cos(angle) * 92;
                    const y = 100 + Math.sin(angle) * 68;
                    const delay = (i % nodes.length) * 0.08; // stagger
                    return (
                        <line
                            key={`pulse-${i}`}
                            x1={x}
                            y1={y}
                            x2={150}
                            y2={100}
                            stroke="rgb(var(--color-brand))"
                            strokeOpacity="0.85"
                            strokeWidth="2"
                            strokeLinecap="round"
                            style={{
                                strokeDasharray: "120 160",
                                strokeDashoffset: 120,
                                animation: `dash-in 1.6s ease-in-out ${delay}s infinite`,
                                filter: "drop-shadow(0 0 6px rgba(117,46,79,0.8))",
                            }}
                        />
                    );
                })}

                {/* outer dots */}
                {nodes.map((i) => {
                    const angle = (i / nodes.length) * Math.PI * 2;
                    const x = 150 + Math.cos(angle) * 92;
                    const y = 100 + Math.sin(angle) * 68;
                    const delay = (i % nodes.length) * 0.08;
                    return (
                        <circle
                            key={`dot-${i}`}
                            cx={x}
                            cy={y}
                            r="4"
                            fill="url(#dotGlow)"
                            style={{ animation: `outer-pulse 1.6s ease-in-out ${delay}s infinite` }}
                        />
                    );
                })}

                {/* center */}
                <circle
                    cx="150"
                    cy="100"
                    r="10"
                    fill="white"
                    opacity="0.9"
                    style={{ animation: "center-glow 1.6s ease-in-out infinite" }}
                />
            </svg>
        </div>
    );
}

function InterviewVisual({ reducedMotion }: { reducedMotion: boolean }) {
    // Slower, more subtle square motion (slightly reduced speed; same path)
    const squares = useMemo(() => [0, 1, 2, 3, 4].map((i) => 12 + i * 10), []);
    return (
        <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_85%_15%,rgba(117,46,79,0.20),transparent_60%)]"></div>

            <div
                className="absolute inset-0"
                data-paused={reducedMotion ? "true" : "false"}
            >
                <style>{`
                    @keyframes square-move {
                        0%   { transform: translate(-20px, -14px) rotate(-4deg) scale(0.94); opacity: .85; }
                        50%  { transform: translate(6px, 2px) rotate(6deg) scale(1.06); opacity: 1; }
                        100% { transform: translate(22px, 14px) rotate(10deg) scale(1.12); opacity: .95; }
                    }
                    [data-paused="true"] * { animation-play-state: paused !important; }
                `}</style>

                <div className="absolute inset-0 grid place-items-center">
                    {squares.map((size, i) => (
                        <div
                            key={i}
                            className={cn("border hairline absolute")}
                            style={{
                                width: `${size + 90}px`,
                                height: `${size + 56}px`,
                                // Slightly slower and staggered for subtlety (was 1 + i*0.15s, delay i*0.06s)
                                animation: `square-move ${1.5 + i * 0.2}s ease-in-out ${i * 0.08}s infinite alternate`,
                                willChange: "transform, opacity",
                            }}
                        />
                    ))}
                    <div className="absolute w-16 h-16 rounded-full border brand-border"></div>
                </div>
            </div>
        </div>
    );
}

function ActivateVisual({ reducedMotion }: { reducedMotion: boolean }) {
    // Lines pulse outward from center repeatedly
    const rays = useMemo(() => new Array(24).fill(0).map((_, i) => i), []);
    return (
        <div className="relative w-full h-full">
            <svg
                viewBox="0 0 300 200"
                className="w-full h-full"
                data-paused={reducedMotion ? "true" : "false"}
            >
                <style>{`
                    @keyframes dash-out {
                        0%   { stroke-dashoffset: 120; opacity: .0; }
                        30%  { opacity: .85; }
                        100% { stroke-dashoffset: 0; opacity: .0; }
                    }
                    svg[data-paused="true"] * { animation-play-state: paused !important; }
                `}</style>

                <defs>
                    <radialGradient id="burst" cx="50%" cy="50%" r="60%">
                        <stop offset="0%" stopColor="rgb(var(--color-brand))" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="rgba(117,46,79,0)" stopOpacity="0" />
                    </radialGradient>
                </defs>

                <rect width="300" height="200" fill="url(#burst)"></rect>

                {/* base faint rays */}
                {rays.map((i) => {
                    const angle = (i / rays.length) * Math.PI * 2;
                    const x2 = 150 + Math.cos(angle) * 96;
                    const y2 = 100 + Math.sin(angle) * 72;
                    return (
                        <line
                            key={`base-${i}`}
                            x1="150"
                            y1="100"
                            x2={x2}
                            y2={y2}
                            stroke="rgba(255,255,255,0.15)"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* animated pulses */}
                {rays.map((i) => {
                    const angle = (i / rays.length) * Math.PI * 2;
                    const x2 = 150 + Math.cos(angle) * 96;
                    const y2 = 100 + Math.sin(angle) * 72;
                    const delay = (i % rays.length) * 0.06;
                    return (
                        <line
                            key={`pulse-${i}`}
                            x1="150"
                            y1="100"
                            x2={x2}
                            y2={y2}
                            stroke="rgb(var(--color-brand))"
                            strokeWidth="2"
                            strokeOpacity="0.9"
                            strokeLinecap="round"
                            style={{
                                strokeDasharray: "120 160",
                                strokeDashoffset: 120,
                                animation: `dash-out 1.4s ease-out ${delay}s infinite`,
                                filter: "drop-shadow(0 0 6px rgba(117,46,79,0.8))",
                            }}
                        />
                    );
                })}

                <circle cx="150" cy="100" r="10" fill="white" opacity="0.9"></circle>
            </svg>
        </div>
    );
}

/* -------------------------
   Hooks & utilities
   ------------------------- */

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node || typeof IntersectionObserver === "undefined") return;

        const obs = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        setInView(true);
                        obs.unobserve(e.target);
                    }
                }
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.2, ...(options || {}) }
        );

        obs.observe(node);
        return () => {
            try {
                if (node) obs.unobserve(node);
            } catch {
                // noop
            }
        };
    }, [options]);

    return { ref, inView };
}

function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return;
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduced(!!mq.matches);
        update();
        mq.addEventListener?.("change", update);
        return () => mq.removeEventListener?.("change", update);
    }, []);
    return reduced;
}