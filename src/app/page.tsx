"use client";

import * as React from "react";

import FeaturesGrid from "@/components/sections/features-grid";
import HeroSection from "@/components/sections/hero-section";
import Navbar from "@/components/sections/navbar";
import Sidebar from "@/components/sections/sidebar";

const navTabs = ["Overview", "Products", "Infrastructure", "Protocol", "Research"];

export default function Home() {
  const [activeTab, setActiveTab] = React.useState("Overview");

  const navItems = navTabs.map((title) => ({
    title,
    href: "/",
    current: title === activeTab,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar navItems={navItems} onTabChange={setActiveTab} />

      <div className="flex pt-14">
        <aside className="fixed left-0 top-14 hidden h-[calc(100vh-3.5rem)] w-[16.5rem] border-r border-border bg-sidebar lg:block">
          <Sidebar activeTab={activeTab} />
        </aside>

        <main className="flex-1 lg:ml-[16.5rem]">
          <HeroSection />
          <FeaturesGrid activeTab={activeTab} />
        </main>
      </div>
    </div>
  );
}
