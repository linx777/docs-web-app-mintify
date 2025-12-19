"use client";

import * as React from "react";

import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import Navbar from "@/components/sections/navbar";
import Sidebar from "@/components/sections/sidebar";
import SearchModal, { SearchDoc } from "@/components/search-modal";
import { SectionGroup } from "@/lib/markdown";
import FeaturesGrid from "./sections/features-grid";
import HeroSection from "./sections/hero-section";

type HomePageProps = {
  sections: SectionGroup[];
};

export default function HomePage({ sections }: HomePageProps) {
  const orderedTabs = ["Overview", "Products", "Infrastructure", "Protocol", "Research"];
  const firstAvailableSection =
    sections.find((section) => orderedTabs.some((tab) => tab === section.title)) ?? sections[0];
  const [activeSlug, setActiveSlug] = React.useState(() => firstAvailableSection?.slug ?? "");
  const [activeDocSlug, setActiveDocSlug] = React.useState<string | undefined>(undefined);
  const [searchOpen, setSearchOpen] = React.useState(false);

  const activeSection = React.useMemo(
    () => sections.find((section) => section.slug === activeSlug) ?? sections[0],
    [activeSlug, sections],
  );
  const activeDoc =
    activeSection?.docs.find((doc) => doc.slug === activeDocSlug) ?? undefined;

  const searchDocs = React.useMemo<SearchDoc[]>(() => {
    return sections.flatMap((section) =>
      section.docs.map((doc) => ({
        id: `${section.slug}-${doc.slug}`,
        sectionTitle: section.title,
        sectionSlug: section.slug,
        docTitle: doc.title,
        docSlug: doc.slug,
        content: doc.content,
      })),
    );
  }, [sections]);

  const navItems = orderedTabs.map((title) => {
    const match = sections.find((section) => section.title === title);
    return {
      title,
      href: match ? `/#${match.slug}` : "/",
      current: match ? match.slug === activeSection?.slug : false,
    };
  });

  function handleTabChange(title: string) {
    const match = sections.find((section) => section.title === title);
    if (match) {
      setActiveSlug(match.slug);
      setActiveDocSlug(undefined);
    }
  }

  function handleDocChange(sectionSlug: string, docSlug: string) {
    const matchSection = sections.find((section) => section.slug === sectionSlug);
    if (!matchSection) return;
    setActiveSlug(matchSection.slug);
    setActiveDocSlug(docSlug);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        navItems={navItems}
        onTabChange={handleTabChange}
        onSearch={() => setSearchOpen(true)}
      />

      <div className="flex pt-14">
        <aside className="fixed left-0 top-14 hidden h-[calc(100vh-3.5rem)] w-[16.5rem] border-r border-border bg-sidebar lg:block">
          <Sidebar
            activeTab={activeSection?.title ?? ""}
            activeDocSlug={activeDoc?.slug}
            sections={sections}
            onSelectDoc={handleDocChange}
            onSearch={() => setSearchOpen(true)}
          />
        </aside>

        <main className="flex-1 lg:ml-[16.5rem]">
          {!activeDoc && (
            <>
              <HeroSection />
              <FeaturesGrid activeTab={activeSection?.title ?? ""} />
            </>
          )}

          <section id={activeSection?.slug ?? "section"} className="mx-auto max-w-4xl px-4 pb-16 pt-4 space-y-10">
            <header className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-text-primary">
                {activeDoc?.title ?? activeSection?.title}
              </h2>
            </header>

            {activeDoc ? (
              <article
                key={activeDoc.slug}
                id={`${activeSection?.slug}-${activeDoc.slug}`}
                className="space-y-3 rounded-xl border border-border bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-text-primary">{activeDoc.title}</h3>
                <MarkdownRenderer content={activeDoc.content} className="max-w-none" />
              </article>
            ) : (
              <div className="text-text-secondary">
                Select a document from the sidebar or the pills above to view its content.
              </div>
            )}
          </section>
        </main>
      </div>

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        docs={searchDocs}
        onSelect={(sectionSlug, docSlug) => {
          handleDocChange(sectionSlug, docSlug);
          setSearchOpen(false);
          window.setTimeout(() => {
            const el = document.getElementById(`${sectionSlug}-${docSlug}`);
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 50);
        }}
      />
    </div>
  );
}
