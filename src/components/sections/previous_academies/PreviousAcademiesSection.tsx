"use client";

import Image from "next/image";
import Link from "next/link";

const PREVIEW_IMAGES = [
  { src: "/assets/previous_academies/hyderabad_31_1.jpeg", alt: "Hyderabad Karting Academy" },
  { src: "/assets/previous_academies/banglore_1300_1.jpeg", alt: "Bangalore Formula 1300" },
  { src: "/assets/previous_academies/banglore_1300_3.jpeg", alt: "Formula 1300 on track" },
  { src: "/assets/previous_academies/bangalore_56_1.jpeg", alt: "Bangalore Karting" },
  { src: "/assets/previous_academies/hyderabad_31_2.jpeg", alt: "Hyderabad track action" },
  { src: "/assets/previous_academies/banglore_1300_5.jpeg", alt: "Formula 1300 pit lane" },
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

      {/* ── Photo Mosaic ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-8 sm:mb-10">
        {PREVIEW_IMAGES.map((img, i) => (
          <Link
            key={i}
            href="/academy/previous_academies"
            className={`relative overflow-hidden rounded-xl bg-[#111111] group block ${
              i === 0 ? "col-span-2 sm:col-span-1 row-span-2 aspect-[4/5]" :
              i === 1 ? "aspect-[4/3]" :
              "aspect-[4/3]"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </Link>
        ))}
      </div>

      {/* ── CTA row ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-5 border-t border-white/[0.06]">
        <div>
          <p className="text-white/50 text-sm sm:text-base">
            <span className="text-cyan font-medium">3 academies</span>
            {" "}completed · {" "}
            <span className="text-cyan font-medium">14 photos</span>
            {" "}across Hyderabad & Bangalore
          </p>
        </div>
        <Link href="/academy/previous_academies" className="cta-button group flex-shrink-0">
          <span className="text-sm sm:text-base font-medium tracking-wide z-10">
            Explore Gallery
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
