theMindArk.AI Tailwind Theme — Style Guide

Overview
- Purpose: Guide engineers and designers to build the Exit Strategy Echo landing page using the provided Tailwind v4 theme and custom utilities/components.
- Principles: Dark, modern, luxurious; glassmorphism; minimal; gradient backgrounds; sharp rounding; brand used sparingly (mostly for CTAs and thin borders).

Setup
- Ensure globals.css (or equivalent global stylesheet) uses Tailwind v4 top-level imports and includes the provided theme and utilities (as in tailwind-theme).
- Typography plugin is already enabled in the theme; use the .prose class for long-form content.

File header (globals.css)
- Confirm this header is at the top of your global stylesheet:
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300..900&family=Space+Grotesk:wght@400..700&display=swap");
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

Design tokens and usage
- Brand: rgb(var(--color-brand)) => #752E4F; use for primary CTAs/backgrounds and subtle borders.
- Dark scales and surfaces: --color-ink-900 for backgrounds; glass surfaces via .glass, .glass-strong.
- Typography: Display font for hero via .text-hero and .headline-gradient; body via Inter.
- Motion: .animate-float / .animate-float-lg; shimmer for loading placeholders.

Core custom utilities/components (use directly in className)
- Layout and background: container-page, section-y, bg-page, bg-section, section-anchor
- Surfaces: glass, glass-strong, card (card--accent, card--ghost), hairline, border-strong, brand-border
- Typography: text-hero, headline-gradient, text-subtitle, text-caption, text-eyebrow, prose
- Buttons: btn, btn--primary, btn--secondary, btn--muted
- Inputs: input (input--invalid)
- Hero video: hero-frame, hero-video, hero-video__overlay
- Graphs: graph-surface, graph-accent, grid-ticks, brand-glow
- Helpers: focus-ring, divider, sr-only, container-page
- Layout modes (applied by layout when hooks are active): layout--fullpage, layout--no-margins

Rules and tips
- Use stacking layouts (flex-col) to avoid width overflow; prefer responsive blocks over wide grids.
- Brand color is reserved for primary CTAs and thin border accents; avoid large solid brand fills except CTA.
- For arbitrary values with spaces, replace spaces with underscores per Tailwind v4 rule.
- Utilities cannot contain pseudo-selectors; apply hover/focus/active at element level or rely on component styles.

Example: Page shell with anchors
```html
<!-- Home page wrapper (Next.js page root div should include page--{PageName}) -->
<div class="page--HomePage bg-page">
    <!-- Top-level container for content width -->
    <main class="container-page flex flex-col gap-16">
        <!-- Sections go here -->
    </main>
</div>
```

Hero section (video right two-thirds, text overlay on top)
```html
<section id="hero" class="section-anchor section-y">
    <div class="relative hero-frame grid grid-cols-1 lg:grid-cols-3 min-h-[520px]">
        <!-- Video spans right two-thirds on large screens -->
        <div class="col-span-1 lg:col-span-2 relative order-2 lg:order-2">
            <video class="hero-video" autoplay muted loop playsinline src="/videos/hero.mp4"></video>
            <div class="hero-video__overlay"></div>
        </div>

        <!-- Text overlay panel spans left third; overlay across video via absolute on small screens -->
        <div class="absolute inset-0 lg:static lg:col-span-1 order-1 lg:order-1 flex">
            <div class="flex flex-col justify-center gap-6 px-6 py-10 lg:px-8 lg:py-12 bg-[linear-gradient(90deg,rgba(0,0,0,0.65),rgba(0,0,0,0.25)_35%,transparent_65%)] lg:bg-transparent">
                <p class="text-eyebrow">Exit Strategy Echo</p>
                <h1 class="text-hero headline-gradient">Capture what they know. Keep it working.</h1>
                <p class="text-subtitle max-w-prose">Replicate departing employees as secure, AI-powered Echos and generate an onboarding playbook that lasts.</p>

                <div class="flex items-center gap-4">
                    <a href="#cta" class="btn btn--primary">Get a Demo</a>
                    <a href="#how-it-works" class="btn btn--secondary">See How It Works</a>
                </div>
            </div>
        </div>
    </div>
</section>
```

Features overview (Echo + Playbook)
```html
<section id="features" class="section-anchor section-y">
    <div class="container-page">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article class="card p-6">
                <h3 class="font-semibold text-xl mb-2">Echo</h3>
                <p class="text-caption mb-4">A digital extension of your departing expert—available on demand.</p>
                <ul class="list-disc list-inside text-sm text-[rgb(var(--color-text-secondary))]">
                    <li>Mirrors knowledge, tone, and decision context</li>
                    <li>Answers role-specific questions after departure</li>
                </ul>
            </article>

            <article class="card p-6">
                <h3 class="font-semibold text-xl mb-2">Onboarding Playbook</h3>
                <p class="text-caption mb-4">A clear, portable, markdown guide for new hires.</p>
                <ul class="list-disc list-inside text-sm text-[rgb(var(--color-text-secondary))]">
                    <li>Responsibilities, SOPs, tools, FAQs</li>
                    <li>Day-one actionable; complements the Echo</li>
                </ul>
            </article>
        </div>
    </div>
</section>
```

Echo (AI assistant) examples
```html
<section id="echo" class="section-anchor section-y">
    <div class="container-page grid gap-6">
        <header class="flex flex-col gap-2">
            <p class="text-eyebrow">Echo</p>
            <h2 class="text-2xl font-bold">Your exiting employee, as an assistant</h2>
            <p class="text-caption">Continuity across projects, processes, and tribal knowledge.</p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="card p-5">
                <p class="text-sm text-[rgb(var(--color-text-secondary))]">“What’s the escalation path for Vendor X?”</p>
            </div>
            <div class="card p-5">
                <p class="text-sm text-[rgb(var(--color-text-secondary))]">“How do we deploy the Q3 reporting pipeline?”</p>
            </div>
            <div class="card p-5">
                <p class="text-sm text-[rgb(var(--color-text-secondary))]">“Which stakeholders must approve this contract?”</p>
            </div>
        </div>
    </div>
</section>
```

Onboarding Playbook outline
```html
<section id="playbook" class="section-anchor section-y">
    <div class="container-page grid gap-6">
        <header class="flex flex-col gap-2">
            <p class="text-eyebrow">Playbook</p>
            <h2 class="text-2xl font-bold">Markdown, structured for speed</h2>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="card p-6">
                <ol class="list-decimal list-inside text-sm leading-7 text-[rgb(var(--color-text-secondary))]">
                    <li>Role Overview</li>
                    <li>Core Responsibilities</li>
                    <li>Daily/Weekly/Monthly Routines</li>
                    <li>Key Systems and Access</li>
                    <li>Processes and SOPs</li>
                    <li>Stakeholders and Communication</li>
                    <li>FAQs and Troubleshooting</li>
                </ol>
            </div>
            <div class="card p-6 prose">
                <h4>Example Entry: Q3 Reporting</h4>
                <p>Deploy via <code>scripts/deploy-q3.sh</code> after approvals from Ops and Finance.</p>
                <ul>
                    <li>Owner: Data Engineering</li>
                    <li>Access: Snowflake, GitHub, Metabase</li>
                    <li>Escalation: VP Analytics</li>
                </ul>
            </div>
        </div>
    </div>
</section>
```

Metrics and impact (graphs with dark glass surfaces)
```html
<section id="metrics" class="section-anchor section-y">
    <div class="container-page grid gap-8">
        <header class="flex flex-col gap-2">
            <p class="text-eyebrow">Metrics</p>
            <h2 class="text-2xl font-bold">Make continuity measurable</h2>
            <p class="text-caption">Animated values from 0 to target (implement via IntersectionObserver).</p>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Metric cards -->
            <div class="card p-5">
                <div class="metric">
                    <span class="metric__value" data-animate="count" data-target="92">0</span>
                    <span class="metric__label">% Knowledge Retained</span>
                </div>
            </div>
            <div class="card p-5">
                <div class="metric">
                    <span class="metric__value" data-animate="count" data-target="45">0</span>
                    <span class="metric__label">Days Faster Onboarding</span>
                </div>
            </div>
            <div class="card p-5">
                <div class="metric">
                    <span class="metric__value" data-animate="count" data-target="3">0</span>
                    <span class="metric__label">Weeks to Competency</span>
                </div>
            </div>
            <div class="card p-5">
                <div class="metric">
                    <span class="metric__value" data-animate="count" data-target="96">0</span>
                    <span class="metric__label">% Answer Confidence</span>
                </div>
            </div>
        </div>

        <!-- Graph surfaces -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="graph-surface grid-ticks p-4 rounded-[var(--radius-sm)] min-h-[220px]">
                <h3 class="text-sm font-semibold mb-3">Knowledge Retained</h3>
                <div class="flex-1 relative rounded-[var(--radius-sm)] overflow-hidden">
                    <div class="absolute inset-0 opacity-70"></div>
                    <div class="absolute left-0 bottom-0 h-[60%] w-[12%] bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.06))]"></div>
                    <div class="absolute left-[14%] bottom-0 h-[76%] w-[12%] bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.06))]"></div>
                    <div class="absolute left-[28%] bottom-0 h-[84%] w-[12%] bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.06))]"></div>
                    <div class="absolute left-[42%] bottom-0 h-[88%] w-[12%] bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.06))]"></div>
                    <div class="absolute left-[56%] bottom-0 h-[92%] w-[12%] bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.06))]"></div>
                    <div class="absolute left-[70%] bottom-0 h-[96%] w-[12%] bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.06))]"></div>
                </div>
            </div>

            <div class="graph-surface p-4 rounded-[var(--radius-sm)] min-h-[220px] brand-glow">
                <h3 class="text-sm font-semibold mb-3">Onboarding Time Reduction</h3>
                <div class="relative h-[160px] grid-ticks rounded-[var(--radius-sm)] overflow-hidden">
                    <div class="absolute inset-0">
                        <svg viewBox="0 0 400 160" class="w-full h-full">
                            <defs>
                                <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stop-color="rgb(var(--color-brand))" stop-opacity="0.65"></stop>
                                    <stop offset="100%" stop-color="rgb(var(--color-brand-700))" stop-opacity="0.1"></stop>
                                </linearGradient>
                            </defs>
                            <path d="M0,140 C60,120 120,110 180,90 C240,70 300,40 360,30 L400,160 L0,160 Z" fill="url(#g)"></path>
                            <path d="M0,140 C60,120 120,110 180,90 C240,70 300,40 360,30" stroke="rgb(var(--color-brand))" stroke-opacity="0.8" fill="none" stroke-width="2"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

How it works (three-steps, minimal, icon-friendly)
```html
<section id="how-it-works" class="section-anchor section-y">
    <div class="container-page grid gap-8">
        <header class="flex flex-col gap-2">
            <p class="text-eyebrow">Process</p>
            <h2 class="text-2xl font-bold">From exit to enablement in three steps</h2>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="card p-6">
                <div class="mb-3 text-caption">Step 1</div>
                <h3 class="font-semibold mb-2">Capture Knowledge</h3>
                <p class="text-caption">Interviews, document imports, structured Q&A with the exiting employee.</p>
            </div>
            <div class="card p-6">
                <div class="mb-3 text-caption">Step 2</div>
                <h3 class="font-semibold mb-2">Create Echo + Playbook</h3>
                <p class="text-caption">Echo becomes the assistant; Playbook generates a day-one reference.</p>
            </div>
            <div class="card p-6">
                <div class="mb-3 text-caption">Step 3</div>
                <h3 class="font-semibold mb-2">Deploy to Team</h3>
                <p class="text-caption">Share Echo access and onboard new hires with the Playbook.</p>
            </div>
        </div>
    </div>
</section>
```

CTA (brand-forward, strong emphasis)
```html
<section id="cta" class="section-anchor section-y">
    <div class="container-page">
        <div class="cta p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="max-w-prose">
                <h3 class="text-xl font-bold mb-2">Ready to preserve what matters?</h3>
                <p class="text-caption">Get a Demo and see how Echo + Playbook reduces onboarding time and retains knowledge.</p>
            </div>
            <div class="flex items-center gap-4">
                <a href="#footer" class="btn btn--primary">Get a Demo</a>
                <a href="#how-it-works" class="btn btn--secondary">See How It Works</a>
            </div>
        </div>
    </div>
</section>
```

FAQ (simple accordion-ready structure)
```html
<section id="faq" class="section-anchor section-y">
    <div class="container-page grid gap-6">
        <header class="flex flex-col gap-2">
            <p class="text-eyebrow">FAQ</p>
            <h2 class="text-2xl font-bold">Answers at a glance</h2>
        </header>

        <div class="grid grid-cols-1 gap-4">
            <details class="card p-5">
                <summary class="cursor-pointer font-medium">What happens when the exiting employee is unavailable for clarifications?</summary>
                <p class="mt-3 text-caption">The Echo is built from captured interviews, documents, and Q&A sessions, so it remains available post-departure.</p>
            </details>
            <details class="card p-5">
                <summary class="cursor-pointer font-medium">Is the Echo limited to predefined topics?</summary>
                <p class="mt-3 text-caption">Echo generalizes within the captured domain and references the Playbook to answer evolving questions.</p>
            </details>
            <details class="card p-5">
                <summary class="cursor-pointer font-medium">How is the Playbook maintained over time?</summary>
                <p class="mt-3 text-caption">Teams can update the markdown source as workflows evolve; Echo and Playbook complement each other.</p>
            </details>
        </div>
    </div>
</section>
```

Footer
```html
<footer id="footer" class="footer section-y">
    <div class="container-page flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="text-caption">© theMindArk.AI — Exit Strategy Echo</div>
        <nav class="flex items-center gap-4">
            <a href="/privacy" class="link link-underline">Privacy</a>
            <a href="/terms" class="link link-underline">Terms</a>
            <a href="https://x.com" class="link link-underline">X</a>
            <a href="https://www.linkedin.com" class="link link-underline">LinkedIn</a>
        </nav>
    </div>
</footer>
```

Cards and glass surfaces
```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="card p-6">
        <h4 class="font-semibold mb-1">Default Card</h4>
        <p class="text-caption">Use for standard content blocks.</p>
    </div>
    <div class="card card--accent p-6">
        <h4 class="font-semibold mb-1">Accent Card</h4>
        <p class="text-caption">Uses brand border for subtle emphasis.</p>
    </div>
    <div class="card card--ghost p-6">
        <h4 class="font-semibold mb-1">Ghost Card</h4>
        <p class="text-caption">Ultra-subtle background; low visual weight.</p>
    </div>
</div>
```

Buttons and interactions
```html
<div class="flex items-center gap-4">
    <button class="btn btn--primary">Primary CTA</button>
    <button class="btn btn--secondary">Secondary</button>
    <button class="btn btn--muted">Muted</button>
    <button class="btn btn--primary" disabled aria-disabled="true">Disabled</button>
</div>
```

Inputs (glass, focused ring, invalid state)
```html
<form class="grid gap-3 w-full max-w-md">
    <label class="text-caption">Email</label>
    <input type="email" class="input" placeholder="you@company.com" />
    <p class="text-caption">We’ll never share your email.</p>

    <label class="text-caption mt-4">Promo Code (invalid)</label>
    <input type="text" class="input input--invalid" placeholder="ECHO-2025" />
</form>
```

Dividers and spacing
```html
<div class="grid gap-6">
    <p class="text-caption">Above</p>
    <div class="divider"></div>
    <p class="text-caption">Below</p>
</div>
```

Graph accents and brand glow
```html
<div class="graph-surface grid-ticks p-4 rounded-[var(--radius-sm)]">
    <div class="graph-accent p-3 rounded-[var(--radius-sm)] brand-glow">
        <p class="text-caption">Subtle brand-tinted surface inside graph</p>
    </div>
</div>
```

Headline and typography helpers
```html
<header class="grid gap-3">
    <p class="text-eyebrow">Case Study</p>
    <h2 class="text-hero headline-gradient">A luxurious, legible hero headline</h2>
    <p class="text-subtitle">Subtitle optimized for scanning on all devices.</p>
    <p class="text-caption">Caption for extra context or metadata.</p>
</header>
```

Anchors and smooth scrolling
```html
<nav class="sticky top-0 z-40 glass p-3">
    <ul class="flex gap-4">
        <li><a href="#hero" class="link link-underline">Hero</a></li>
        <li><a href="#features" class="link link-underline">Features</a></li>
        <li><a href="#metrics" class="link link-underline">Metrics</a></li>
        <li><a href="#how-it-works" class="link link-underline">How It Works</a></li>
        <li><a href="#faq" class="link link-underline">FAQ</a></li>
    </ul>
</nav>

<section id="hero" class="section-anchor">...</section>
<section id="features" class="section-anchor">...</section>
<section id="metrics" class="section-anchor">...</section>
<section id="how-it-works" class="section-anchor">...</section>
<section id="faq" class="section-anchor">...</section>
```

Brand usage guidance
- Use brand color primarily for:
  - btn--primary backgrounds
  - CTA surfaces (cta component)
  - Thin borders or highlights (brand-border, brand-glow) in non-CTA elements
- Avoid full brand fills on large areas except in primary CTA contexts (e.g., CTA card chart fill).

Arbitrary values with Tailwind v4
- Replace spaces with underscores. Example background image class:
```html
<div class='bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]'></div>
```
- Use CSS variable color tokens where appropriate:
```html
<div class="border-[rgb(var(--color-brand)/0.35)]"></div>
<p class="text-[rgb(var(--color-text-secondary))]">Secondary text via theme token.</p>
```

Motion and micro-interactions
- Buttons already include hover/active behaviors and a shimmer on btn--primary.
- Use animate-float or animate-float-lg for small floating accents.
```html
<div class="card p-6 animate-float">
    <p class="text-caption">Subtle floating accent</p>
</div>
```

Hero motif (square with a circle inside)
- Use hero-frame and the overlay for legibility over video:
```html
<div class="hero-frame relative min-h-[360px]">
    <video class="hero-video" autoplay muted loop playsinline src="/videos/hero.mp4"></video>
    <div class="hero-video__overlay"></div>
    <!-- Place overlayed text in an absolutely positioned child if needed -->
</div>
```

Accessibility helpers
```html
<button class="btn btn--primary">
    <span class="sr-only">Open demo request form</span>
    Get a Demo
</button>
```

Composing sections with glass and gradients
```html
<section class="section-y bg-section">
    <div class="container-page">
        <div class="glass p-6 rounded-[var(--radius-sm)]">
            <h3 class="font-semibold mb-2">Glassy Section</h3>
            <p class="text-caption">Use glass to elevate content without heavy contrast.</p>
        </div>
    </div>
</section>
```

Do and don’t
- Do: Keep layouts vertically stacked and responsive.
- Do: Use brand color sparingly; prefer borders and CTA backgrounds.
- Do: Rely on glass/gradients for depth and separation instead of heavy shadows.
- Don’t: Hardcode fixed button widths when using text.
- Don’t: Overuse brand fills or saturated gradients in non-CTA elements.

Implementation notes for this theme
- All classes in examples are ready to use with Tailwind v4 and the provided theme.
- Pseudo-classes should be applied on elements (e.g., hover:) or rely on component rules defined in the theme.
- For animated metrics, use a small client-side script to count from 0 to target when elements intersect the viewport; keep durations around 1.2–1.6s with smooth ease-out for legibility.

Reference checklist per landing sections
- Hero: hero-frame, hero-video, hero-video__overlay, text-hero, headline-gradient, btn--primary
- Features: card, text-caption, container-page
- Echo: card, text-eyebrow, section-anchor
- Playbook: prose, card, list styles
- Metrics: metric component, graph-surface, grid-ticks, brand-glow sparingly
- How It Works: card, text-caption
- CTA: cta component, btn--primary, btn--secondary
- FAQ: card, details/summary structure
- Footer: footer component, link classes

By following the utilities and components above, you can implement the full Exit Strategy Echo landing page with a cohesive dark, glassy, luxurious visual language that’s consistent, accessible, and fast.