import Head from "next/head";
import React from "react";
import { useNoMargins } from "@/lib/hooks";
import { Hero } from "@/components/sections/Hero";
import { SectionTwo } from "@/components/sections/SectionTwo";
import { SectionThree } from "@/components/sections/SectionThree";

export default function HomePage() {
    useNoMargins();

    return (
        <div className="page--HomePage bg-page">
            <Head>
                <title>theMindArk.AI — Exit Strategy Echo</title>
                <meta
                    name="description"
                    content="Capture what they know. Keep it working. Replicate departing employees as secure, AI-powered Echos and generate an onboarding playbook that lasts."
                />
            </Head>

            <Hero />

            <SectionTwo />

            <SectionThree />
        </div>
    );
}