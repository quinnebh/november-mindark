# MainLayout — Application Shell and Navigation

The MainLayout component provides the shared application frame for the Exit Strategy Echo landing site. It renders:
- A glass, sticky top navigation bar with brand logo, anchor links, an account switcher, and responsive collapse behavior.
- A centered content column for page content (children), respecting full-page and no-margins display modes via hooks.
- A dark, luxurious visual language using the Tailwind v4 theme and custom utilities.

This layout is used by the top-level App component to wrap all pages and should only accept a single `children` prop that renders the current screen/page.

---

## Responsibilities

- Render a consistent dark, glassy page shell with a sticky top nav.
- Provide anchor-based navigation for the single-page landing layout.
- Collapse navigation into a mobile panel with an “expand” button.
- Include an account switcher in the main nav.
- Honor layout modes:
  - Fullscreen (hide nav and shared UI) using `useIsInFullPageMode`.
  - No margins (edge-to-edge content) using `useIsNoMarginMode`.

---

## Navigation links

Primary anchor navigation (in-header)
- Hero — /#hero
- Features — /#features
- Echo — /#echo
- Playbook — /#playbook
- Metrics — /#metrics
- How It Works — /#how-it-works
- FAQ — /#faq
- Get a Demo — /#cta (primary CTA button)

Secondary links (typically in footer, not in-header)
- Privacy — /privacy
- Terms — /terms
- X — https://x.com
- LinkedIn — https://www.linkedin.com

Note: The landing is a single statically generated page at /. All primary navigation items are in-page anchors for smooth scrolling.

---

## Component API

Props
- children: React.ReactNode — Required. Renders the current page inside the layout’s content region.

Exports
- Named export: `MainLayout`
- Supporting named exports: `MainNav`, `AccountSwitcher`

---

## Implementation (reference)

Place this file at: src/components/layout/MainLayout.tsx

```tsx
import React, { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/util";
import {
    useIsInFullPageMode,
    useIsNoMarginMode,
} from "@/lib/hooks";
import {
    Menu,
    X,
    ChevronDown,
    Building2,
    LogOut,
    Plus,
} from "lucide-react";

export interface MainLayoutProps {
    children: React.ReactNode;
}

/**
 * Primary navigation items (anchor-based)
 */
const NAV_ITEMS: { label: string; href: `/#${string}` }[] = [
    { label: "Hero", href: "/#hero" },
    { label: "Features", href: "/#features" },
    { label: "Echo", href: "/#echo" },
    { label: "Playbook", href: "/#playbook" },
    { label: "Metrics", href: "/#metrics" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "FAQ", href: "/#faq" },
];

/**
 * Account options for the account/workspace switcher
 * Replace with real data when available.
 */
const ACCOUNT_OPTIONS = [
    { id: "acme", name: "Acme Corp" },
    { id: "northwind", name: "Northwind" },
    { id: "personal", name: "Personal" },
];

export function MainLayout({ children }: MainLayoutProps) {
    const isFull = useIsInFullPageMode();
    const noMargins = useIsNoMarginMode();

    return (
        <div
            className={cn(
                "min-h-dvh bg-page text-[rgb(var(--color-text))] antialiased",
                isFull && "layout--fullpage",
                noMargins && "layout--no-margins"
            )}
        >
            {!isFull && <MainNav />}

            <main
                className={cn(
                    "w-full",
                    noMargins ? "flex flex-col" : "container-page flex flex-col"
                )}
            >
                {children}
            </main>
        </div>
    );
}

/**
 * MainNav — Sticky, glassy top navigation with:
 * - Logo
 * - Anchor links
 * - Get a Demo CTA
 * - Account switcher
 * - Mobile collapse with expand button
 */
export function MainNav() {
    const [open, setOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        const onClick = (e: MouseEvent) => {
            if (!panelRef.current) return;
            if (open && !panelRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        window.addEventListener("keydown", onKey);
        window.addEventListener("click", onClick);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("click", onClick);
        };
    }, [open]);

    return (
        <header className="sticky top-0 z-40">
            <div className="glass hairline backdrop-blur-md">
                <div className="container-page flex items-center justify-between py-3 gap-3">
                    {/* Left: Logo + brand */}
                    <a href="/" className="flex items-center gap-2 focus-ring">
                        <Logo className="w-7 h-7" />
                        <span className="font-semibold tracking-tight">
                            theMindArk.AI
                        </span>
                    </a>

                    {/* Center: Desktop nav */}
                    <nav className="hidden md:flex items-center gap-2">
                        <ul className="flex items-center gap-1">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        className="px-3 py-2 rounded-[var(--radius-xs)] text-sm text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text))] hover:bg-[rgb(255_255_255/0.04)] focus-ring"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Right: CTA + Account switcher + Mobile toggle */}
                    <div className="flex items-center gap-2">
                        <a
                            href="/#cta"
                            className="hidden sm:inline-flex btn btn--primary"
                        >
                            Get a Demo
                        </a>

                        <AccountSwitcher />

                        <button
                            type="button"
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-[var(--radius-xs)] hover:bg-[rgb(255_255_255/0.06)] focus-ring"
                            aria-label="Open navigation"
                            aria-controls="mobile-nav"
                            aria-expanded={open}
                            onClick={() => setOpen((v) => !v)}
                        >
                            {open ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile panel */}
                <div
                    id="mobile-nav"
                    ref={panelRef}
                    className={cn(
                        "md:hidden border-t border-[rgb(255_255_255/0.06)]",
                        open ? "block" : "hidden"
                    )}
                >
                    <div className="container-page py-3">
                        <nav className="flex flex-col gap-1">
                            {NAV_ITEMS.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="px-3 py-2 rounded-[var(--radius-xs)] text-sm text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text))] hover:bg-[rgb(255_255_255/0.05)] focus-ring"
                                    onClick={() => (open ? setOpen(false) : null)}
                                >
                                    {item.label}
                                </a>
                            ))}

                            <a
                                href="/#cta"
                                className="mt-2 btn btn--primary"
                                onClick={() => (open ? setOpen(false) : null)}
                            >
                                Get a Demo
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}

/**
 * AccountSwitcher — Minimal account/workspace switcher for the main nav.
 * Uses a glass dropdown with focus management and keyboard escape.
 */
export function AccountSwitcher() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(ACCOUNT_OPTIONS[0]);
    const panelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        const onClick = (e: MouseEvent) => {
            if (!panelRef.current) return;
            if (open && !panelRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        window.addEventListener("keydown", onKey);
        window.addEventListener("click", onClick);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("click", onClick);
        };
    }, [open]);

    return (
        <div className="relative" ref={panelRef}>
            <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                className={cn(
                    "inline-flex items-center gap-2 px-2.5 py-2 rounded-[var(--radius-xs)]",
                    "text-sm text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text))]",
                    "hover:bg-[rgb(255_255_255/0.05)] focus-ring"
                )}
                onClick={() => setOpen((v) => !v)}
            >
                <Building2 className="w-4 h-4" />
                <span className="max-w-[12ch] truncate">{active.name}</span>
                <ChevronDown className="w-4 h-4 opacity-80" />
            </button>

            {open && (
                <div
                    role="menu"
                    className="absolute right-0 mt-2 w-[220px] glass card p-2 rounded-[var(--radius-sm)] shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
                >
                    <div className="grid gap-1">
                        {ACCOUNT_OPTIONS.map((acc) => {
                            const isActive = acc.id === active.id;
                            return (
                                <button
                                    key={acc.id}
                                    role="menuitemradio"
                                    aria-checked={isActive}
                                    className={cn(
                                        "w-full text-left px-3 py-2 rounded-[var(--radius-xs)] text-sm",
                                        isActive
                                            ? "bg-[rgb(255_255_255/0.06)]"
                                            : "hover:bg-[rgb(255_255_255/0.05)]"
                                    )}
                                    onClick={() => {
                                        setActive(acc);
                                        setOpen(false);
                                    }}
                                >
                                    {acc.name}
                                </button>
                            );
                        })}
                    </div>

                    <div className="divider my-2" />

                    <div className="grid gap-1">
                        <a
                            role="menuitem"
                            href="/accounts/new"
                            className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-xs)] text-sm hover:bg-[rgb(255_255_255/0.05)] focus-ring"
                            onClick={() => setOpen(false)}
                        >
                            <Plus className="w-4 h-4" />
                            Create new workspace
                        </a>
                        <a
                            role="menuitem"
                            href="/logout"
                            className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-xs)] text-sm text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text))] hover:bg-[rgb(255_255_255/0.05)] focus-ring"
                            onClick={() => setOpen(false)}
                        >
                            <LogOut className="w-4 h-4" />
                            Sign out
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
```

---

## Display modes and layout behavior

- Fullscreen mode
  - When `useIsInFullPageMode()` returns true:
    - Hide the main navigation and any shared UI.
    - Keep the page content mounted; do not change render order.

- No margins mode
  - When `useIsNoMarginMode()` returns true:
    - Remove default content margins and paddings.
    - Allow pages to span edge-to-edge (useful for full-bleed sections, e.g., hero video).

- Default mode
  - Pages render within a centered column using `container-page` and vertical stacking (`flex flex-col`) to avoid overflow.

- The layout applies theme utilities:
  - Root: `bg-page` for background, dark theme, and global typography.
  - Navbar: `glass`, `hairline` for glassmorphism and a subtle top divider.
  - Buttons: `btn`, `btn--primary` for CTAs, respecting the brand rule (brand color used sparingly).

---

## Accessibility

- The mobile expand button uses:
  - aria-controls and aria-expanded
  - sr-friendly labels via button aria-label
- The account switcher uses:
  - role="menu" and role="menuitem" semantics
  - Esc to close the dropdown
  - Click outside to dismiss
- Links and interactive elements have `focus-ring` for keyboard navigation.

---

## Usage in the Next.js App component

Place this file at: pages/_app.tsx

```tsx
import type { AppProps } from "next/app";
import { MainLayout } from "@/components/layout/MainLayout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MainLayout>
            <Component {...pageProps} />
        </MainLayout>
    );
}
```

---

## Visual and theming notes

- Use brand color (#752E4F) sparingly. It is applied mainly to:
  - Primary CTA backgrounds (Get a Demo button).
  - Thin borders or subtle accents (brand-border) where needed.
- Prefer stacking layouts (`flex-col`) and responsive blocks over wide grids to prevent overflow.
- The navbar is glassy and minimal with sharp rounding and thin borders, aligning to the style guide.
- Smooth scrolling and anchor linking are supported by the in-page anchors
  - /#hero, /#features, /#echo, /#playbook, /#metrics, /#how-it-works, /#faq, /#cta.

---

## Checklist

- Named exports for layout components (MainLayout, MainNav, AccountSwitcher).
- Single `children` prop renders current page.
- Sticky, glass, responsive nav with:
  - Logo
  - Anchor links
  - Primary “Get a Demo” CTA
  - Account switcher
  - Mobile expand/collapse
- Honors layout modes via hooks:
  - Fullscreen hides nav.
  - No-margins removes container spacing.
- Compliant with Tailwind v4 theme utilities and dark, glassy, luxurious visual language.