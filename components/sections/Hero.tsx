import React from "react";
import { Mail, ChevronRight } from "lucide-react";

export function Hero() {
    return (
        <section id="hero" className="section-anchor section-y">
            <div className="relative hero-frame grid grid-cols-1 lg:grid-cols-3 min-h-[560px]">
                {/* Right: Video spans two-thirds on large screens */}
                <div className="col-span-1 lg:col-span-2 relative order-2 lg:order-2">
                    <video
                        className="hero-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        src="/videos/hero.mp4"
                    />
                    <div className="hero-video__overlay" />

                    {/* Geometric motif: square with a circle inside (brand-accented, floating) */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute right-[6%] top-[14%] hidden lg:block animate-float"
                    >
                        <svg
                            width="220"
                            height="220"
                            viewBox="0 0 220 220"
                            className="opacity-60"
                        >
                            <defs>
                                <linearGradient id="m" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="rgb(255 255 255 / 0.35)" />
                                    <stop offset="100%" stopColor="rgb(255 255 255 / 0.12)" />
                                </linearGradient>
                            </defs>
                            <rect
                                x="6"
                                y="6"
                                width="208"
                                height="208"
                                rx="8"
                                fill="none"
                                stroke="url(#m)"
                                strokeWidth="1"
                                className="brand-border"
                            />
                            <circle
                                cx="110"
                                cy="110"
                                r="54"
                                fill="none"
                                stroke="rgb(var(--color-brand))"
                                strokeOpacity="0.5"
                                strokeWidth="1"
                            />
                        </svg>
                    </div>
                </div>

                {/* Left: Text overlay panel; sits over video on small screens */}
                <div className="absolute inset-0 lg:static lg:col-span-1 order-1 lg:order-1 flex">
                    <div className="flex flex-col justify-center w-full">
                        <div className="container-page">
                            <div className="flex flex-col justify-center gap-6 px-6 py-10 lg:px-0 lg:py-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.65),rgba(0,0,0,0.25)_35%,transparent_65%)] lg:bg-transparent rounded-[var(--radius-sm)]">
                                <p className="text-eyebrow">Exit Strategy Echo</p>
                                <h1 className="text-hero headline-gradient">
                                    We Automate Wisdom
                                </h1>
                                <p className="text-subtitle max-w-prose">
                                    Onboarding and Offboarding Made Easy
                                </p>

                                <div className="flex items-center gap-4">
                                    <a href="#cta" className="btn btn--primary">
                                        <Mail className="w-4 h-4" />
                                        Get a Demo
                                    </a>
                                    <a href="#how-it-works" className="btn btn--secondary">
                                        See How It Works
                                        <ChevronRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}