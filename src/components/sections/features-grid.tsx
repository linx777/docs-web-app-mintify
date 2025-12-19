"use client";

import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

import {
  BookOpenIcon,
  CpuIcon,
  GlobeIcon,
  LayersIcon,
  ServerIcon,
} from "@/components/icons";

type Feature = {
  title: string;
  description: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  category: string;
};

const features: Feature[] = [
  {
    title: "Overview",
    description:
      "Learn about Automata Network, why it matters, and the core technology behind it",
    href: "/",
    icon: BookOpenIcon,
    category: "Overview",
  },
  {
    title: "Products",
    description:
      "Explore our product suite including DCAP Dashboard, 1RPC, and L2 Faucet",
    href: "/",
    icon: LayersIcon,
    category: "Products",
  },
  {
    title: "Infrastructure",
    description: "Deep dive into TEE, DCAP Verification, and Proof of Machinehood",
    href: "/",
    icon: ServerIcon,
    category: "Infrastructure",
  },
  {
    title: "Protocol",
    description:
      "Technical details on App-Specific Rollups, Network specifications, and more",
    href: "/",
    icon: CpuIcon,
    category: "Protocol",
  },
  {
    title: "Research",
    description:
      "Cutting-edge research on MEV, Account Abstraction, and Decentralized Randomness",
    href: "/",
    icon: GlobeIcon,
    category: "Research",
  },
];

export default function FeaturesGrid({ activeTab }: { activeTab: string }) {
  const filteredFeatures =
    activeTab === "Overview"
      ? features
      : features.filter((feature) => feature.category === activeTab);

  if (filteredFeatures.length === 0) return null;

  return (
    <section className="w-full px-4 pb-16">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 max-w-4xl mx-auto">
        {filteredFeatures.map((feature) => (
          <Link
            key={feature.title}
            href={feature.href}
            className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-[#E85A30]/30 hover:shadow-sm"
          >
            <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <feature.icon className="h-16 w-16 text-[#E85A30]" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 group-hover:text-[#E85A30]">
              {feature.title}
            </h2>
            <p className="mt-1 text-sm text-gray-600">{feature.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
