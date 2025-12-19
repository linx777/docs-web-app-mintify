"use client";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-64 flex-col items-center justify-center overflow-hidden pb-16 pt-24 text-center bg-white">
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-text-primary text-4xl lg:text-5xl font-bold leading-tight max-w-4xl px-4">
          Automata Network
        </h1>
        <p className="text-lg text-text-secondary mt-4 max-w-2xl px-4">
          Enables blockchains to verify real, trusted machines and use that verification to build secure applications.
        </p>
      </div>
    </section>
  );
}

