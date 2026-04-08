"use client";

import Image from "next/image";
import Link from "next/link";

/* ── Academy data with compact descriptions ── */
const ACADEMIES = [
  {
    title: "HYDERABAD",
    subtitle: "KARTING ACADEMY",
    date: "30–31 March",
    venue: "Tspeedway, Hyderabad",
    description:
      "Two days of high-speed karting — professional coaching, timed laps, and competitive racing at one of South India's premier tracks.",
    image: "/assets/previous_academies/hyderabad_31_1.jpeg",
  },
  {
    title: "BANGALORE",
    subtitle: "FORMULA 1300 ACADEMY",
    date: "2–3 April",
    venue: "Red Riders, Bangalore",
    description:
      "An exclusive Formula 1300 open-wheel experience — cockpit sessions, on-track driving, and pro-level race craft in a real single-seater.",
    image: "/assets/previous_academies/banglore_1300_1.jpeg",
    badge: "FORMULA 1300",
  },
  {
    title: "BANGALORE",
    subtitle: "KARTING ACADEMY",
    date: "5–6 January",
    venue: "Red Riders, Bangalore",
    description:
      "Intense karting boot camp — race technique, data-driven improvement, and wheel-to-wheel battles across two action-packed days.",
    image: "/assets/previous_academies/bangalore_56_1.jpeg",
  },
];



export default function PreviousAcademiesSection() {
  return (
    <section
      id="previous-academies"
      className="relative w-full bg-[#0a0a0a] px-4 py-16 sm:px-8 sm:py-24 md:px-12 md:py-28 lg:px-20 lg:py-36"
    >
      {/* ── Label + Heading ── */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12 mb-10 sm:mb-14">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
            </span>
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/50">
              Archive
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-bebas)] text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
            PREVIOUS
            <br />
            <span className="text-cyan">ACADEMIES</span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base leading-relaxed mt-4 max-w-sm">
            Hyderabad · Bangalore Karting · Bangalore Formula 1300
          </p>
        </div>

        <Link
          href="/academy/previous_academies"
          className="group inline-flex items-center gap-3 border border-white/15 hover:border-cyan/40 rounded-full px-5 py-3 transition-all duration-300 self-start md:self-end flex-shrink-0"
        >
          <span className="font-[family-name:var(--font-bebas)] text-white/60 group-hover:text-cyan text-sm tracking-widest uppercase transition-colors duration-300">
            View All
          </span>
          <div className="w-7 h-7 rounded-full border border-white/10 group-hover:border-cyan/40 group-hover:bg-cyan/10 flex items-center justify-center transition-all duration-300">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="text-white/40 group-hover:text-cyan transition-colors duration-300 group-hover:translate-x-px">
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>


      {/* ── Compact Academy Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-12">
        {ACADEMIES.map((academy, i) => (
          <Link
            key={i}
            href="/academy/previous_academies"
            className="group relative bg-[#111111] border border-white/[0.06] hover:border-cyan/20 rounded-2xl overflow-hidden transition-all duration-400"
          >
            {/* Thumbnail */}
            <div className="relative w-full aspect-[16/9] overflow-hidden">
              <Image
                src={academy.image}
                alt={academy.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/20 to-transparent" />
              {/* Badge */}
              {academy.badge && (
                <span className="absolute top-3 right-3 bg-cyan text-black text-[9px] font-bold tracking-widest uppercase rounded-full px-2.5 py-0.5">
                  {academy.badge}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="px-4 pb-4 pt-2 sm:px-5 sm:pb-5 sm:pt-3">
              <div className="flex items-baseline gap-2 mb-1.5">
                <h3 className="font-[family-name:var(--font-bebas)] text-white group-hover:text-cyan text-lg sm:text-xl tracking-wide leading-none transition-colors duration-300">
                  {academy.title}
                </h3>
                <span className="font-[family-name:var(--font-bebas)] text-cyan/50 text-xs sm:text-sm tracking-wide">
                  {academy.subtitle}
                </span>
              </div>

              {/* Meta pills */}
              <div className="flex items-center gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1 text-white/30 text-[10px] tracking-wider">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan/50 flex-shrink-0">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {academy.date}
                </span>
                <span className="text-white/10">·</span>
                <span className="inline-flex items-center gap-1 text-white/30 text-[10px] tracking-wider">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan/50 flex-shrink-0">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  {academy.venue}
                </span>
              </div>

              {/* Description */}
              <p className="text-white/30 text-[11px] sm:text-xs leading-relaxed line-clamp-2">
                {academy.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* ── CTA row ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-5 border-t border-white/[0.06]">
        <Link href="/academy/previous_academies" className="cta-button group flex-shrink-0">
          <span className="text-sm sm:text-base font-medium tracking-wide z-10">
            Explore Previous Academies
          </span>
          <span className="cta-icon-wrapper">
            <svg className="cta-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
