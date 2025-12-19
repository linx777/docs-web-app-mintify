"use client";

import Link from "next/link";
import * as React from "react";

import {
  AutomataLogoMark,
  MenuSolidIcon,
  SearchSolidIcon,
  XIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import ThemeToggle from "../theme-toggle";

type NavItem = {
  title: string;
  href: string;
  current: boolean;
};

export default function Navbar({
  navItems,
  onTabChange,
  onSearch,
}: {
  navItems: NavItem[];
  onTabChange?: (title: string) => void;
  onSearch?: () => void;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const [sheetMounted, setSheetMounted] = React.useState(false);

  React.useEffect(() => {
    if (isMobileMenuOpen) setSheetMounted(true);
    if (!isMobileMenuOpen && sheetMounted) {
      const t = window.setTimeout(() => setSheetMounted(false), 300);
      return () => window.clearTimeout(t);
    }
  }, [isMobileMenuOpen, sheetMounted]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onSearch?.();
      }
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onSearch]);

  return (
    <div
      id="navbar"
      className="fixed top-0 z-30 w-full peer is-not-custom bg-white border-b border-border"
    >
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none" />
      <div className="absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 mx-auto">
        <div className="flex h-14 min-w-0 items-center mx-4 lg:mx-0 lg:px-7">
          <div className="relative flex flex-1 items-center gap-x-4 min-w-0 lg:border-none">
            <div className="flex flex-1 items-center gap-x-4">
              <Link href="/" className="flex items-center gap-2">
                <span className="sr-only">Automata Docs home page</span>
                <AutomataLogoMark />
                <span className="text-xl font-bold text-black">Automata Docs</span>
              </Link>
              <div className="hidden items-center gap-x-2 lg:flex" />
            </div>

            <div className="flex items-center gap-4">
              <div className="relative z-20 hidden flex-1 items-center justify-end gap-x-6 lg:ml-auto lg:flex">
                <div className="h-16 font-semibold">
                  <div className="nav-tabs flex h-full items-center gap-x-6 text-sm">
                    {navItems.map((item) => (
                      <button
                        key={item.title}
                        type="button"
                        className={cn(
                          "link nav-tabs-item group relative flex h-full items-center gap-2 font-medium",
                          item.current
                            ? "text-gray-800 dark:text-gray-200 [text-shadow:-0.2px_0_0_currentColor,0.2px_0_0_currentColor]"
                            : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300",
                        )}
                        onClick={() => onTabChange?.(item.title)}
                      >
                        {item.title}
                        {item.current ? (
                          <div className="absolute bottom-0 left-0 hidden h-[1.5px] w-full bg-primary dark:bg-primary-light" />
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>

                <nav className="text-sm">
                  <ul className="flex items-center gap-x-2">
                    <li className="hidden lg:flex">
                      <ThemeToggle />
                    </li>
                    <li className="hidden lg:flex">
                      <button
                        type="button"
                        className="gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 px-3 py-1.5 flex h-8 items-center text-gray-600 hover:text-gray-800"
                        aria-label="Open search"
                        onClick={onSearch}
                      >
                        <SearchSolidIcon className="h-4 w-4 fill-current" />
                        <span>Search</span>
                        <kbd className="pointer-events-none ml-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
                          <span className="text-xs">⌘</span>K
                        </kbd>
                      </button>
                    </li>
                    <li
                      className="hidden whitespace-nowrap lg:flex"
                      id="topbar-cta-button"
                    >
                      <a
                        className="group relative inline-flex items-center rounded-lg bg-[#E85A30] px-2.5 py-1.5 text-sm font-semibold hover:opacity-[0.9]"
                        href="https://github.com/automata-network"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="z-10 text-white">GitHub</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="flex items-center gap-3 lg:hidden">
                <button
                  id="search-bar-entry-mobile"
                  type="button"
                  className="gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent dark:hover:bg-accent/50 px-4 py-2 has-[>svg]:px-3 flex h-8 w-8 items-center justify-center text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                  aria-label="Open search"
                  onClick={onSearch}
                >
                  <span className="sr-only">Search...</span>
                  <SearchSolidIcon className="h-4 w-4 fill-current" />
                </button>

                <button
                  type="button"
                  className="gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 has-[>svg]:px-3 flex h-7 w-5 items-center justify-end p-0"
                  aria-label="More actions"
                  aria-haspopup="dialog"
                  aria-expanded={isMobileMenuOpen}
                  data-state={isMobileMenuOpen ? "open" : "closed"}
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <MenuSolidIcon className="h-4 w-4 fill-current" />
                </button>

                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      {sheetMounted ? (
        <div
          className={cn("fixed inset-0 z-50", isMobileMenuOpen ? "" : "pointer-events-none")}
          data-state={isMobileMenuOpen ? "open" : "closed"}
        >
          <button
            type="button"
            className={cn(
              "fixed inset-0 z-50 bg-black/50 transition-opacity duration-200 ease-out",
              isMobileMenuOpen ? "opacity-100" : "opacity-0",
            )}
            data-state={isMobileMenuOpen ? "open" : "closed"}
            aria-label="Close navigation"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className={cn(
              "fixed inset-y-0 right-0 z-50 flex h-full w-[300px] flex-col gap-4 border-l bg-background shadow-lg transition-transform duration-300 ease-in-out sm:w-[400px]",
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
            )}
            data-state={isMobileMenuOpen ? "open" : "closed"}
          >
            <div className="flex flex-col gap-1.5 p-4">
              <div className="text-foreground font-semibold">Navigation</div>
              <div className="text-muted-foreground text-sm">
                Explore Automata Network documentation.
              </div>
            </div>

            <div className="px-4">
              {navItems.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className={cn(
                    "block py-2 text-lg font-medium text-left",
                    item.current
                      ? "text-primary"
                      : "text-gray-600 hover:text-gray-800",
                  )}
                  onClick={() => {
                    onTabChange?.(item.title);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.title}
                </button>
              ))}
              <a
                className="block py-2 text-lg font-medium text-gray-600 hover:text-gray-800"
                href="https://github.com/automata-network"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                GitHub
              </a>
            </div>

            <button
              type="button"
              className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none"
              data-state={isMobileMenuOpen ? "open" : "closed"}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close"
            >
              <XIcon className="size-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
