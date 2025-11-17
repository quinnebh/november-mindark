import React, { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/util";
import { useIsInFullPageMode, useIsNoMarginMode } from "@/lib/hooks";
import { Menu, X, ChevronDown, Building2, LogOut, Plus } from "lucide-react";

export interface MainLayoutProps {
    children: React.ReactNode;
}

/**
 * Primary in-page navigation items (anchors)
 */
const NAV_ITEMS: { label: string; href: `/#${string}` }[] = [
];

/**
 * Mock account/workspace options for the switcher
 */

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

            <main className={cn("w-full", noMargins ? "flex flex-col" : "container-page flex flex-col")}>
                {children}
            </main>
        </div>
    );
}

/**
 * MainNav — Glassy, sticky top navigation with:
 * - Logo and brand
 * - Anchor-based primary links
 * - Primary CTA (Get a Demo)
 * - Account switcher
 * - Mobile collapse (hamburger)
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
                    {/* Brand */}
                    <a href="/" className="flex items-center gap-2 focus-ring">
                        <Logo className="w-7 h-7" />
                        <span className="font-semibold tracking-tight">MindArk</span>
                    </a>

                    {/* Desktop Nav */}
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

                    {/* Right: CTA + Account + Mobile Toggle */}
                    <div className="flex items-center gap-2">
                        <a href="/#cta" className="hidden sm:inline-flex btn btn--primary">
                            Get a Demo
                        </a>


                        <button
                            type="button"
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-[var(--radius-xs)] hover:bg-[rgb(255_255_255/0.06)] focus-ring"
                            aria-label="Open navigation"
                            aria-controls="mobile-nav"
                            aria-expanded={open}
                            onClick={() => setOpen((v) => !v)}
                        >
                            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Panel */}
                <div
                    id="mobile-nav"
                    ref={panelRef}
                    className={cn("md:hidden border-t border-[rgb(255_255_255/0.06)]", open ? "block" : "hidden")}
                >
                    <div className="container-page py-3">
                        <nav className="flex flex-col gap-1">
                            {NAV_ITEMS.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="px-3 py-2 rounded-[var(--radius-xs)] text-sm text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-text))] hover:bg-[rgb(255_255_255/0.05)] focus-ring"
                                    onClick={() => setOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <a href="/#cta" className="mt-2 btn btn--primary" onClick={() => setOpen(false)}>
                                Get a Demo
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}