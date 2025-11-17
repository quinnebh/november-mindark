import React from "react";
import { Mail } from "lucide-react";

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
                        {/* Keep base overlay for readability */}
                        <div className="hero-video__overlay pointer-events-none" />
                        {/* Right third: force solid black to match panel */}
                        <div
                            aria-hidden="true"
                            className="absolute inset-y-0 right-0 w-1/3 bg-[rgb(0_0_0)] pointer-events-none"
                        />
                    </div>
                </div>

                {/* Headline + subtitle: left-aligned, positioned in the bottom third */}
                <div className="absolute inset-x-0 bottom-[22%] md:bottom-[24%] lg:bottom-[26%] z-10">
                    <div className="container-page">
                        <div className="px-6 lg:px-0 max-w-[900px] text-left">
                            <h1 className="headline-gradient font-bold leading-[1.05] tracking-tight text-[28px] sm:text-[34px] lg:text-[52px] relative -translate-y-[10px] md:-translate-y-[12px] lg:-translate-y-[16px]">
                                We Automate Wisdom
                            </h1>
                            <p className="text-subtitle mt-2 max-w-prose">
                                Onboarding and Offboarding Made Easy
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA: placed lower in the section */}
                <div className="absolute inset-x-0 bottom-[8%] md:bottom-[9%] lg:bottom-[10%] z-10">
                    <div className="container-page">
                        <div className="px-6 lg:px-0 flex items-center gap-4">
                            <a href="mailto:hello@mindark.ai" className="btn btn--primary">
                                <Mail className="w-4 h-4" />
                                Get a Demo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}