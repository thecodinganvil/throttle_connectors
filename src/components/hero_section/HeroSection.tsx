"use client";

import SocialIcons from "../shared/SocialIcons";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0a0a0a]">
      {/* ── Video Background ── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/assets/landing_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* ── Hero Centre ── */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 sm:px-6">
        <p className="text-white/70 text-sm sm:text-base tracking-[0.35em] uppercase mb-3">
          Welcome to the world of
        </p>
        <h1 className="throttle-title text-[2.6rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
          THROTTLE
        </h1>
        <span className="connectors-text text-[2.6rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
          CONNECTORS
        </span>
      </div>

      {/* ── Bottom Bar ── */}
      <footer className="relative z-10 flex w-full items-center justify-center px-5 pb-6 sm:px-8 sm:pb-8 md:px-12 md:pb-10">
        <SocialIcons />
      </footer>
    </section>
  );
}
