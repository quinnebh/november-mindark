import React, { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/util";
import { useIsInFullPageMode, useIsNoMarginMode } from "@/lib/hooks";
import { ChevronDown, Building2, LogOut, Plus } from "lucide-react";

export interface MainLayoutProps {
    children: React.ReactNode;
}

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
 * MainNav — Minimal, glassy top navigation:
 * - Left: Logo + MindArk label (with a touch of extra right padding)
 * - Right: Primary CTA only (mailto)
 * - No anchor links, no org/account switcher, no mobile hamburger
 */
export function MainNav() {
    return (
        <header className="sticky top-0 z-40">
            <div className="glass hairline backdrop-blur-md">
                <div className="container-page flex items-center justify-between py-3 gap-3">
                    {/* Left: Logo + brand (add a bit more right padding for balance) */}
                    <a href="/" className="flex items-center gap-2 pr-3 focus-ring">
                        <Logo className="w-7 h-7" />
                        <span className="font-semibold tracking-tight">MindArk</span>
                    </a>

                    {/* Right: Primary CTA only */}
                    <div className="flex items-center gap-2">
                        <a href="mailto:hello@mindark.ai" className="inline-flex btn btn--primary">
                            <span className="sr-only">Open demo request</span>
                            Get a Demo
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}

/**
 * AccountSwitcher — Exported for future use; not rendered in MainNav.
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

const ACCOUNT_OPTIONS = [
    { id: "acme", name: "Acme Corp" },
    { id: "northwind", name: "Northwind" },
    { id: "personal", name: "Personal" },
];