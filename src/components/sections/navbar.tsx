"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import {
  AutomataLogoMark,
  MenuSolidIcon,
  SearchIcon,
  SearchSolidIcon,
  XIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  href: string;
  current: boolean;
};

type CommandItem = {
  label: string;
  href: string;
};

const commandItems: CommandItem[] = [
  { label: "Understanding Automata", href: "/" },
  { label: "TEE Coprocessor", href: "/" },
  { label: "DCAP Dashboard", href: "/" },
  { label: "Protocol", href: "/" },
];

export default function Navbar({
  navItems,
  onTabChange,
}: {
  navItems: NavItem[];
  onTabChange?: (title: string) => void;
}) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = React.useState(false);

  const [commandMounted, setCommandMounted] = React.useState(false);
  const [sheetMounted, setSheetMounted] = React.useState(false);

  React.useEffect(() => {
    if (isCommandMenuOpen) setCommandMounted(true);
    if (!isCommandMenuOpen && commandMounted) {
      const t = window.setTimeout(() => setCommandMounted(false), 200);
      return () => window.clearTimeout(t);
    }
  }, [isCommandMenuOpen, commandMounted]);

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
        setIsCommandMenuOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsCommandMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div
      id="navbar"
      className="fixed top-0 z-30 w-full peer is-not-custom bg-white border-b border-border"
    >
      <div className="absolute inset-0 z-10 w-full h-full" />
      <div className="absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto">
        <div className="flex h-14 min-w-0 items-center mx-4 lg:mx-0 lg:px-7">
          <div className="relative flex flex-1 items-center gap-x-4 min-w-0 lg:border-none">
            <div className="flex flex-1 items-center gap-x-4">
              <Link href="/" className="flex items-center gap-2">
                <span className="sr-only">Automata Network home page</span>
                <AutomataLogoMark />
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Automata
                </span>
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
                  onClick={() => setIsCommandMenuOpen(true)}
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      {sheetMounted ? (
        <div className="fixed inset-0 z-50" data-state={isMobileMenuOpen ? "open" : "closed"}>
          <button
            type="button"
            className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50"
            data-state={isMobileMenuOpen ? "open" : "closed"}
            aria-label="Close navigation"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className={cn(
              "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
              "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
              "w-[300px] sm:w-[400px]",
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

      {/* Command dialog */}
      {commandMounted ? (
        <CommandDialog
          open={isCommandMenuOpen}
          onOpenChange={setIsCommandMenuOpen}
          onSelect={(href) => router.push(href)}
        />
      ) : null}
    </div>
  );
}

function CommandDialog({
  open,
  onOpenChange,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (href: string) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commandItems;
    return commandItems.filter((item) => item.label.toLowerCase().includes(q));
  }, [query]);

  React.useEffect(() => {
    if (!open) return;
    setQuery("");
    setSelectedIndex(0);
    inputRef.current?.focus();
  }, [open]);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  function selectCurrent() {
    const item = filtered[selectedIndex];
    if (!item) return;
    onSelect(item.href);
    onOpenChange(false);
  }

  if (!open && query === "") {
    // Keep mounted while closing animations run.
  }

  return (
    <div className="fixed inset-0 z-50" data-state={open ? "open" : "closed"}>
      <button
        type="button"
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50"
        data-state={open ? "open" : "closed"}
        aria-label="Close command palette"
        onClick={() => onOpenChange(false)}
      />

      <div
        role="dialog"
        aria-modal="true"
        className="bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-lg overflow-hidden p-0"
        data-state={open ? "open" : "closed"}
      >
        <div className="sr-only flex flex-col gap-2 text-center sm:text-left">
          <h2 className="text-lg leading-none font-semibold">Command Palette</h2>
          <p className="text-muted-foreground text-sm">
            Search for a command to run...
          </p>
        </div>

        <div
          data-slot="command"
          className="bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md"
        >
          <div
            data-slot="command-input-wrapper"
            className="flex h-9 items-center gap-2 border-b px-3"
          >
            <SearchIcon className="size-4 shrink-0 opacity-50" />
            <input
              ref={inputRef}
              data-slot="command-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documentation..."
              className="placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
              onKeyDown={(e) => {
                if (e.key === "Escape") onOpenChange(false);
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setSelectedIndex((i) =>
                    Math.min(i + 1, Math.max(0, filtered.length - 1)),
                  );
                }
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setSelectedIndex((i) => Math.max(0, i - 1));
                }
                if (e.key === "Enter") {
                  e.preventDefault();
                  selectCurrent();
                }
              }}
            />
          </div>

          <div
            data-slot="command-list"
            className="max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto"
          >
            {filtered.length === 0 ? (
              <div data-slot="command-empty" className="py-6 text-center text-sm">
                No results found.
              </div>
            ) : (
              <div
                data-slot="command-group"
                className="text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium"
              >
                <div cmdk-group-heading="" className="px-2 py-1.5 text-xs font-medium">
                  Documentation
                </div>
                {filtered.map((item, idx) => (
                  <button
                    key={item.label}
                    type="button"
                    data-slot="command-item"
                    data-selected={idx === selectedIndex}
                    className="data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => {
                      onSelect(item.href);
                      onOpenChange(false);
                    }}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}

            <div data-slot="command-separator" className="bg-border -mx-1 h-px" />
          </div>
        </div>

        <button
          type="button"
          className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          data-state={open ? "open" : "closed"}
          onClick={() => onOpenChange(false)}
          aria-label="Close"
        >
          <XIcon />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
}
