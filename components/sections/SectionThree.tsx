import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/util";

/**
 * SectionThree — Story & Solutions
 * Updates applied:
 * - Left-third video removed previously.
 * - Grid backgrounds on visuals removed (glass only).
 * - Adds bold white section title: "The Echo System".
 * - Removes step index labels and "Story & Solutions" footer text from cards.
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

                {/* Visual block (no grid background) */}
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
   Inline accent visuals
   ------------------------- */

function DiscoverVisual({ reducedMotion }: { reducedMotion: boolean }) {
    // simple concentric network with brand tint
    return (
        <div className="relative w-full h-full">
            <svg viewBox="0 0 300 200" className="w-full h-full">
                <defs>
                    <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgb(var(--color-brand))" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="rgb(var(--color-brand-700))" stopOpacity="0.05" />
                    </radialGradient>
                </defs>
                {/* nodes */}
                {new Array(14).fill(0).map((_, i) => {
                    const angle = (i / 14) * Math.PI * 2;
                    const x = 150 + Math.cos(angle) * 70;
                    const y = 100 + Math.sin(angle) * 50;
                    return (
                        <g key={i}>
                            <line x1={150} y1={100} x2={x} y2={y} stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
                            <circle cx={x} cy={y} r="4" fill="url(#dotGlow)" />
                        </g>
                    );
                })}
                <circle cx="150" cy="100" r="18" fill="url(#dotGlow)" opacity="0.8" />
                <circle
                    cx="150"
                    cy="100"
                    r="34"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1"
                    fill="none"
                    className={cn(reducedMotion ? "" : "animate-float")}
                />
            </svg>
        </div>
    );
}

function InterviewVisual({ reducedMotion }: { reducedMotion: boolean }) {
    // overlapping squares motif (square with circle center implied)
    const squares = useMemo(() => [0, 1, 2, 3, 4].map((i) => 12 + i * 10), []);
    return (
        <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_85%_15%,rgba(117,46,79,0.20),transparent_60%)]"></div>
            <div className="absolute inset-0 grid place-items-center">
                {squares.map((size, i) => (
                    <div
                        key={i}
                        className={cn("border hairline", "absolute", reducedMotion ? "" : "animate-float")}
                        style={{
                            width: `${size + 80}px`,
                            height: `${size + 50}px`,
                            transform: `translate(${i * 6 - 20}px, ${i * 3 - 16}px)`,
                        }}
                    />
                ))}
                <div className="absolute w-16 h-16 rounded-full border brand-border"></div>
            </div>
        </div>
    );
}

function ActivateVisual({ reducedMotion }: { reducedMotion: boolean }) {
    return (
        <div className="relative w-full h-full">
            <svg viewBox="0 0 300 200" className="w-full h-full">
                <defs>
                    <radialGradient id="burst" cx="50%" cy="50%" r="60%">
                        <stop offset="0%" stopColor="rgb(var(--color-brand))" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="rgba(117,46,79,0)" stopOpacity="0" />
                    </radialGradient>
                </defs>
                <rect width="300" height="200" fill="url(#burst)"></rect>
                {new Array(24).fill(0).map((_, i) => {
                    const angle = (i / 24) * Math.PI * 2;
                    const x2 = 150 + Math.cos(angle) * 90;
                    const y2 = 100 + Math.sin(angle) * 70;
                    return (
                        <line
                            key={i}
                            x1="150"
                            y1="100"
                            x2={x2}
                            y2={y2}
                            stroke="rgba(255,255,255,0.35)"
                            strokeWidth="1"
                            className={cn(!reducedMotion ? "brand-glow" : "")}
                        />
                    );
                })}
                <circle cx="150" cy="100" r="10" fill="rgb(255,255,255)" opacity="0.85"></circle>
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