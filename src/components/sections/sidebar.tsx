"use client";

import Link from "next/link";
import * as React from "react";

import { SectionGroup } from "@/lib/markdown";
import {
  BookOpenIcon,
  ChevronDownIcon,
  CpuIcon,
  GlobeIcon,
  HouseIcon,
  LayersIcon,
  SearchIcon,
  ServerIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  slug: string;
  sectionSlug: string;
};

type NavGroup = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  items: NavItem[];
};

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Overview: BookOpenIcon,
  Products: LayersIcon,
  Infrastructure: ServerIcon,
  Protocol: CpuIcon,
  Research: GlobeIcon,
};

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export default function Sidebar({
  activeTab,
  activeDocSlug,
  sections,
  onSelectDoc,
  onSearch,
}: {
  activeTab: string;
  activeDocSlug?: string;
  sections: SectionGroup[];
  onSelectDoc?: (sectionSlug: string, docSlug: string) => void;
  onSearch?: () => void;
}) {
  const sectionLookup = React.useMemo(
    () => new Map(sections.map((section) => [normalize(section.title), section] as const)),
    [sections],
  );

  const navGroups = React.useMemo<NavGroup[]>(() => {
    return sections.map((section) => ({
      title: section.title,
      icon: iconMap[section.title] ?? BookOpenIcon,
      items: section.docs.map((doc) => ({
        title: doc.title,
        slug: doc.slug,
        sectionSlug: section.slug,
      })),
    }));
  }, [sections]);

  const filteredNavGroups = activeTab
    ? navGroups.filter((group) => group.title === activeTab)
    : navGroups;

  const defaultOpenAccordions = React.useMemo(
    () => filteredNavGroups.map((group) => group.title),
    [filteredNavGroups],
  );

  const [openGroups, setOpenGroups] = React.useState<string[]>(defaultOpenAccordions);

  React.useEffect(() => {
    setOpenGroups(defaultOpenAccordions);
  }, [defaultOpenAccordions]);

  function toggleGroup(title: string) {
    setOpenGroups((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  }

  return (
    <div id="sidebar-content" className="flex flex-col h-full w-[16.5rem]">
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="text-sm flex flex-col">
          <div className="relative flex items-center mb-6">
            <button
              type="button"
              className="flex rounded-lg w-full items-center text-sm leading-6 h-9 pl-3 pr-3 text-sidebar-foreground bg-background dark:bg-background/50 ring-1 ring-border hover:ring-ring transition-all justify-between truncate gap-2"
              aria-label="Open search"
              onClick={onSearch}
            >
              <div className="flex items-center gap-2 min-w-0">
                <SearchIcon className="h-4 w-4 text-muted-foreground" />
                <div className="truncate text-muted-foreground">Search...</div>
              </div>
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          </div>

          <div className="mb-4">
            <Link
              href="/"
              className="group flex items-center gap-2.5 px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground rounded-lg text-[#E85A30] bg-secondary"
            >
              <HouseIcon className="h-4 w-4 text-[#E85A30]" />
              <span>Home</span>
            </Link>
          </div>

          <div className="w-full space-y-2" data-orientation="vertical">
            {filteredNavGroups.map((group) => {
              const Icon = group.icon;
              const open = openGroups.includes(group.title);

              return (
                <div
                  key={group.title}
                  className="border-b last:border-b-0 border-none"
                  data-orientation="vertical"
                  data-state={open ? "open" : "closed"}
                >
                  <h3 className="flex" data-orientation="vertical" data-state={open ? "open" : "closed"}>
                    <button
                      type="button"
                      className={cn(
                        "focus-visible:border-ring focus-visible:ring-ring/50 flex-1 justify-between text-left outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180 flex items-center gap-2.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:no-underline hover:text-foreground transition-colors rounded-lg group",
                      )}
                      data-orientation="vertical"
                      data-state={open ? "open" : "closed"}
                      aria-expanded={open}
                      onClick={() => toggleGroup(group.title)}
                    >
                      <Icon className="h-4 w-4 text-[#E85A30]" />
                      <span className="flex-1 text-left">{group.title}</span>
                      <ChevronDownIcon className="lucide lucide-chevron-down text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
                    </button>
                  </h3>

                  <div
                    className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
                    data-orientation="vertical"
                    data-state={open ? "open" : "closed"}
                    hidden={!open}
                  >
                    <div className="pt-0 pb-4">
                      <div className="flex flex-col space-y-1">
                        {group.items.map((item) => {
                          const section = sectionLookup.get(normalize(group.title));
                          const doc =
                            section?.docs.find(
                              (docItem) => normalize(docItem.title) === normalize(item.title),
                            ) ?? section?.docs.find((docItem) => normalize(docItem.slug) === normalize(item.slug));
                          const isActive = doc ? doc.slug === activeDocSlug : false;

                          return (
                            <button
                              key={item.title}
                              type="button"
                              className={cn(
                                "flex items-center px-3 py-1.5 text-sm rounded-md transition-colors text-left",
                                isActive
                                  ? "bg-secondary text-[#E85A30] font-medium"
                                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                              )}
                              onClick={() => {
                                if (section && doc && onSelectDoc) {
                                  onSelectDoc(section.slug, doc.slug);
                                }
                              }}
                            >
                              {item.title}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border bg-sidebar/50">
        <button
          type="button"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm w-full"
        >
          <GlobeIcon className="h-4 w-4" />
          <span>English</span>
          <ChevronDownIcon className="h-4 w-4 ml-auto" />
        </button>
      </div>
    </div>
  );
}
