import React from "react";
import { Mail, ChevronRight } from "lucide-react";

export function Hero() {
    return (
        <section id="hero" className="section-anchor section-y">
            <div className="relative hero-frame min-h-[72svh]">
                {/* Centered video background */}
                <div className="absolute inset-0">
                    <div className="relative h-full flex items-center justify-center">
                        <video
                            className="hero-video w-[92vw] max-w-[1200px] lg:w-[70vw]"
                            autoPlay
                            muted
                            loop
                            playsInline
                            src="/videos/hero.mp4"
                        />
                        <div className="hero-video__overlay pointer-events-none" />
                    </div>
                </div>

                {/* Headline + subtitle: left-aligned, positioned in the bottom third */}
                <div className="absolute inset-x-0 bottom-[22%] md:bottom-[24%] lg:bottom-[26%] z-10">
                    <div className="container-page">
                        <div className="px-6 lg:px-0 max-w-[900px] text-left">
                            <h1 className="headline-gradient font-bold leading-[1.05] tracking-tight text-[38px] sm:text-[44px] lg:text-[62px]">
                                We Automate Wisdom
                            </h1>
                            <p className="text-subtitle mt-2 max-w-prose">
                                Onboarding and Offboarding Made Easy
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTAs: placed lower in the section */}
                <div className="absolute inset-x-0 bottom-[8%] md:bottom-[9%] lg:bottom-[10%] z-10">
                    <div className="container-page">
                        <div className="px-6 lg:px-0 flex items-center gap-4">
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
        </section>
    );
}