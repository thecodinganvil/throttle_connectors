"use client";

import Image from "next/image";

export default function AboutUsSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-[#0a0a0a] px-5 py-16 sm:py-20 sm:px-8 md:px-12 md:py-24 lg:px-20 lg:py-28"
    >
      {/* ── Section Label + Heading ── */}
      <div className="flex flex-col md:flex-row md:items-start gap-6 sm:gap-10 md:gap-14 lg:gap-20 mb-12 sm:mb-16 md:mb-20 lg:mb-28">
        <div className="flex items-center gap-3 flex-shrink-0 md:pt-4">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
          </span>
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/70">
            About Us
          </span>
        </div>

        <h2 className="about-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl">
          Your Complete Pathway to Professional Motorsport
        </h2>
      </div>

      {/* ── Content: Big Image + Text with Small Image ── */}
      <div className="grid grid-cols-1 md:grid-cols-[35%_1fr] gap-10 md:gap-12 lg:gap-20 items-start">
        {/* Big Image */}
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl group bg-white/[0.04] border border-white/[0.08]">
          <Image
            src="/assets/about_us_page.jpeg"
            alt="Throttle Connectors Academy"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-center md:pt-8 lg:pt-16 xl:pt-24 gap-6">
          <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-md">
            Throttle Connectors is a motorsport company built to turn racing
            dreams into reality. Our mission is simple: to make motorsport
            affordable and accessible for everyone who has the passion to race.
          </p>

          <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-md">
            From academy programs to driver management and sponsorship support,
            we help racers grow step by step and reach the next level in their
            motorsport journey. We don&apos;t just train drivers. We build
            careers. Throttle Connectors is here to support your racing dream.
          </p>

          <div className="flex flex-col-reverse sm:flex-row items-start sm:items-end justify-between gap-6 mt-6">
            <a href="/academy" className="cta-button group flex-shrink-0">
              <span className="text-sm sm:text-base font-medium tracking-wide z-10">
                Let&apos;s Get Started
              </span>
              <span className="cta-icon-wrapper">
                <svg
                  className="cta-icon-svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </a>

            {/* Small Image */}
            <div className="relative w-full h-44 sm:flex-1 sm:h-44 sm:max-w-[55%] md:h-48 lg:h-[250px] overflow-hidden rounded-2xl border border-white/10 group shadow-2xl shadow-black/50 bg-white/[0.04]">
              <Image
                src="/assets/aboutus_small_image.jpeg"
                alt="Throttle Connectors Team"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
