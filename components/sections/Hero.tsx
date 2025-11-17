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
                </div>

                {/* Left: Text overlay area (no panel) */}
                <div className="absolute inset-0 lg:static lg:col-span-1 order-1 lg:order-1 flex">
                    <div className="flex flex-col justify-center w-full">
                        <div className="container-page">
                            <div className="flex flex-col justify-center gap-6 px-6 py-10 lg:px-0 lg:py-0">
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