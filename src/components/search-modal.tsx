"use client";

import Fuse from "fuse.js";
import * as React from "react";

import { SearchSolidIcon, XIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export type SearchDoc = {
  id: string;
  sectionTitle: string;
  sectionSlug: string;
  docTitle: string;
  docSlug: string;
  content: string;
};

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
  docs: SearchDoc[];
  onSelect: (sectionSlug: string, docSlug: string) => void;
};

export default function SearchModal({ open, onClose, docs, onSelect }: SearchModalProps) {
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  const fuse = React.useMemo(
    () =>
      new Fuse(docs, {
        keys: [
          { name: "docTitle", weight: 0.7 },
          { name: "content", weight: 0.3 },
        ],
        threshold: 0.35,
        includeScore: true,
        minMatchCharLength: 2,
      }),
    [docs],
  );

  const results = React.useMemo(() => {
    if (!query.trim()) return docs.slice(0, 6);
    return fuse.search(query).map((r) => r.item).slice(0, 10);
  }, [docs, fuse, query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 py-10 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl border border-border">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <SearchSolidIcon className="h-4 w-4 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search docs..."
            className="flex-1 bg-transparent outline-none text-sm text-text-primary placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Close search"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="px-3 py-6 text-sm text-muted-foreground">No results found.</div>
          ) : (
            <ul className="space-y-1">
              {results.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={cn(
                      "w-full rounded-lg border border-transparent px-3 py-2 text-left transition hover:border-border hover:bg-secondary",
                    )}
                    onClick={() => {
                      onSelect(item.sectionSlug, item.docSlug);
                      onClose();
                      setQuery("");
                    }}
                  >
                    <div className="text-sm font-semibold text-text-primary">{item.docTitle}</div>
                    <div className="text-xs text-muted-foreground">{item.sectionTitle}</div>
                    <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {item.content.replace(/\s+/g, " ").slice(0, 160)}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
