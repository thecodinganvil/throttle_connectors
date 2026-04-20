"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

/* ─── Nav ─────────────────────────────────── */
const NAV_LINKS = [
  { label: "About Us", href: "/#about" },
  { label: "Academy", href: "/academy" },
  { label: "Previous Academies", href: "/academy/previous_academies" },
];

/* ─── Data ─────────────────────────────────── */
const HYDERABAD_IMAGES = [
  { src: "/assets/previous_academies/hyderabad_31_1.jpeg", alt: "Hyderabad Karting Academy — 30 March" },
  { src: "/assets/previous_academies/hyderabad_31_2.jpeg", alt: "Hyderabad Karting Academy — track action" },
  { src: "/assets/previous_academies/hyderabad_31_3.jpeg", alt: "Hyderabad Karting Academy — briefing" },
  { src: "/assets/previous_academies/hyderabad_31_4.jpeg", alt: "Hyderabad Karting Academy — 31 March" },
];

const BLR_FORMULA_IMAGES = [
  { src: "/assets/previous_academies/banglore_1300_1.jpeg", alt: "Formula 1300 — Bangalore 2 April" },
  { src: "/assets/previous_academies/banglore_1300_2.jpeg", alt: "Formula 1300 — cockpit view" },
  { src: "/assets/previous_academies/banglore_1300_3.jpeg", alt: "Formula 1300 — on track" },
  { src: "/assets/previous_academies/banglore_1300_4.jpeg", alt: "Formula 1300 — racing line" },
  { src: "/assets/previous_academies/banglore_1300_5.jpeg", alt: "Formula 1300 — pit lane" },
  { src: "/assets/previous_academies/banglore_1300_6.jpeg", alt: "Formula 1300 — 3 April" },
];

const BLR_KARTING_IMAGES = [
  { src: "/assets/previous_academies/bangalore_56_1.jpeg", alt: "Bangalore Karting — 5 January" },
  { src: "/assets/previous_academies/bangalore_56_2.jpeg", alt: "Bangalore Karting — grid" },
  { src: "/assets/previous_academies/bangalore_56_3.jpeg", alt: "Bangalore Karting — race day" },
  { src: "/assets/previous_academies/bangalore_56_4.jpeg", alt: "Bangalore Karting — 6 January" },
];

/* ─── Lightbox ──────────────────────────────── */
interface LightboxProps {
  images: { src: string; alt: string }[];
  startIndex: number;
  onClose: () => void;
}

function Lightbox({ images, startIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-all z-10"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 font-[family-name:var(--font-bebas)] text-white/40 text-sm tracking-widest z-10">
        {current + 1} / {images.length}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        aria-label="Previous"
        className="absolute left-3 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all z-10"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Image */}
      <div
        className="relative w-full max-w-5xl mx-12 sm:mx-20 aspect-[16/10] rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[current].src}
          alt={images[current].alt}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        aria-label="Next"
        className="absolute right-3 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all z-10"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Thumbnail strip */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center gap-1.5 px-4 overflow-x-auto scrollbar-none">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className={`relative flex-shrink-0 w-10 h-7 sm:w-14 sm:h-10 rounded overflow-hidden border transition-all duration-200 ${
              i === current ? "border-cyan opacity-100 scale-110" : "border-white/10 opacity-40 hover:opacity-70"
            }`}
          >
            <Image src={img.src} alt="" fill sizes="56px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Collage cell — has NO aspect ratio, lives in a fixed-height grid ── */
function CollageCell({
  image,
  index,
  onOpen,
  gridRow,
  gridColumn,
}: {
  image: { src: string; alt: string };
  index: number;
  onOpen: (i: number) => void;
  gridRow?: string;
  gridColumn?: string;
}) {
  return (
    <button
      onClick={() => onOpen(index)}
      className="relative w-full h-full rounded-lg overflow-hidden bg-[#111111] group cursor-zoom-in"
      aria-label={`View photo ${index + 1}`}
      style={{ gridRow, gridColumn }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 640px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-9 h-9 rounded-full bg-black/60 border border-white/30 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
      </div>
    </button>
  );
}

/* ─── BentoCollage — fixed-height container, explicit grid-template ──── */
interface CollageProps {
  images: { src: string; alt: string }[];
  onOpen: (index: number) => void;
}

function BentoCollage({ images, onOpen }: CollageProps) {
  if (images.length === 0) return null;
  const H = "clamp(240px, 40vw, 500px)";

  // 1 image
  if (images.length === 1) {
    return (
      <div style={{ height: "clamp(200px, 35vw, 420px)" }} className="relative rounded-lg overflow-hidden bg-[#111]">
        <CollageCell image={images[0]} index={0} onOpen={onOpen} />
      </div>
    );
  }

  // 2 images — equal columns
  if (images.length === 2) {
    return (
      <div
        className="grid gap-2 sm:gap-3"
        style={{ gridTemplateColumns: "1fr 1fr", height: H }}
      >
        {images.map((img, i) => <CollageCell key={i} image={img} index={i} onOpen={onOpen} />)}
      </div>
    );
  }

  // 3 images — big left 2/3, two stacked right 1/3
  if (images.length === 3) {
    return (
      <div
        className="grid gap-2 sm:gap-3"
        style={{ gridTemplateColumns: "2fr 1fr", gridTemplateRows: "1fr 1fr", height: H }}
      >
        <CollageCell image={images[0]} index={0} onOpen={onOpen} gridRow="1 / 3" />
        <CollageCell image={images[1]} index={1} onOpen={onOpen} />
        <CollageCell image={images[2]} index={2} onOpen={onOpen} />
      </div>
    );
  }

  // 4 images — tall hero left spanning 2 rows, 3 on the right
  if (images.length === 4) {
    return (
      <div
        className="grid gap-2 sm:gap-3"
        style={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", height: H }}
      >
        <CollageCell image={images[0]} index={0} onOpen={onOpen} gridRow="1 / 3" />
        <CollageCell image={images[1]} index={1} onOpen={onOpen} />
        <CollageCell image={images[2]} index={2} onOpen={onOpen} />
      </div>
    );
  }

  // 5 images — hero top-left spanning 2 rows, 2 right col, 2 bottom row
  if (images.length === 5) {
    const tH = `clamp(280px, 50vw, 580px)`;
    return (
      <div
        className="grid gap-2 sm:gap-3"
        style={{ gridTemplateColumns: "2fr 1fr", gridTemplateRows: "1fr 1fr 1fr", height: tH }}
      >
        <CollageCell image={images[0]} index={0} onOpen={onOpen} gridRow="1 / 3" />
        <CollageCell image={images[1]} index={1} onOpen={onOpen} />
        <CollageCell image={images[2]} index={2} onOpen={onOpen} />
        <CollageCell image={images[3]} index={3} onOpen={onOpen} gridColumn="1 / 2" />
        <CollageCell image={images[4]} index={4} onOpen={onOpen} gridColumn="2 / 3" />
      </div>
    );
  }

  // 6 images — 3 top, 3 bottom equal grid
  const sixH = `clamp(240px, 46vw, 560px)`;
  return (
    <div
      className="grid gap-2 sm:gap-3"
      style={{ gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "1fr 1fr", height: sixH }}
    >
      {/* Big hero left, spans 2 rows */}
      <CollageCell image={images[0]} index={0} onOpen={onOpen} gridRow="1 / 3" />
      {/* Right 2 cols, 2 rows = 4 cells */}
      <CollageCell image={images[1]} index={1} onOpen={onOpen} />
      <CollageCell image={images[2]} index={2} onOpen={onOpen} />
      <CollageCell image={images[3]} index={3} onOpen={onOpen} />
      <CollageCell image={images[4]} index={4} onOpen={onOpen} />
    </div>
  );
}

/* ─── Section Header ─────────────────────────── */
function SectionDots({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
        <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
      </span>
      <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-white/40">{label}</span>
    </div>
  );
}

/* ─── Social Icons ───────────────────────────── */
function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 sm:gap-5 ${className}`}>
      <a href="https://www.instagram.com/throttleconnectors?igsh=c3N4NDc4aHZmYWlr" aria-label="Instagram" className="social-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" />
        </svg>
      </a>
      <a href="https://www.linkedin.com/in/krishna-prajapati-a3aa5a315?utm_source=share_via&utm_content=profile&utm_medium=member_android" aria-label="LinkedIn" className="social-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="18" rx="2" /><line x1="7" y1="8" x2="7" y2="17" /><line x1="11" y1="11" x2="11" y2="17" /><path d="M11 11a3 3 0 0 1 6 0v6" /><circle cx="7" cy="6" r="1" />
        </svg>
      </a>
      <a href="https://www.facebook.com/share/1FvF4bWYsy/" aria-label="Facebook" className="social-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      </a>
    </div>
  );
}

/* ─── Page ───────────────────────────────────── */
export default function PreviousAcademies() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const dividerRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Lightbox state: which gallery + which index
  const [lightbox, setLightbox] = useState<{ images: { src: string; alt: string }[]; index: number } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = useCallback(() => setMenuOpen((p) => !p), []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");
      gsap.fromTo(linkRefs.current.filter(Boolean), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: "power3.out", delay: 0.15 });
      gsap.fromTo(dividerRef.current, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.5, delay: 0.4, ease: "power2.out" });
      gsap.fromTo(socialsRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.5, ease: "power3.out" });
    } else {
      document.body.classList.remove("menu-open");
      gsap.set(linkRefs.current.filter(Boolean), { y: 60, opacity: 0 });
      gsap.set(dividerRef.current, { scaleX: 0, opacity: 0 });
      gsap.set(socialsRef.current, { y: 30, opacity: 0 });
    }
    return () => { document.body.classList.remove("menu-open"); };
  }, [menuOpen]);

  useEffect(() => {
    gsap.fromTo(".pa-hero", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" });
    gsap.fromTo(".pa-block", { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, delay: 0.25, ease: "power3.out" });
  }, []);

  const openLightbox = useCallback((images: { src: string; alt: string }[], index: number) => {
    setLightbox({ images, index });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* Lightbox */}
      {lightbox && (
        <Lightbox images={lightbox.images} startIndex={lightbox.index} onClose={closeLightbox} />
      )}

      {/* ═══ MENU OVERLAY ═══ */}
      <div ref={overlayRef} className={`menu-overlay ${menuOpen ? "open" : ""}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
          <div className="flex flex-col justify-center px-10 md:px-20 py-20">
            <nav className="flex flex-col gap-4 sm:gap-6">
              {NAV_LINKS.map((link, i) => (
                <a key={link.href} ref={(el) => { linkRefs.current[i] = el; }}
                  href={link.href}
                  className="menu-link-large"
                  onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
            </nav>
            <div ref={dividerRef} className="menu-divider-large opacity-20" />
            <div ref={socialsRef} className="menu-socials"><SocialIcons /></div>
          </div>
          <div className="hidden md:flex items-center justify-center relative h-full w-full p-16 lg:p-24 xl:p-32">
            <Image src="/assets/throttle.png" alt="Throttle Connectors logo" width={280} height={280}
              className="h-[200px] w-[200px] lg:h-[240px] lg:w-[240px] xl:h-[280px] xl:w-[280px] object-contain" />
          </div>
        </div>
      </div>

      {/* ═══ HEADER ═══ */}
      <header className={`fixed top-0 left-0 w-full z-[80] transition-all duration-500 px-5 py-2 sm:px-8 sm:py-3 md:px-12 md:py-3 ${scrolled && !menuOpen ? "bg-black/60 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="flex-shrink-0">
            <Image src="/assets/throttle.png" alt="Throttle Connectors" width={130} height={130} priority
              className="h-[80px] w-[80px] object-contain sm:h-[95px] sm:w-[95px] md:h-[120px] md:w-[120px] transition-all duration-500" />
          </Link>
          <nav className={`hidden items-center gap-3 md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <Link href="/#about" className="nav-pill">About Us</Link>
            <Link href="/academy" className="nav-pill">Academy</Link>
            <Link href="/academy/previous_academies" className="nav-pill nav-pill-active">
              Previous Academies
            </Link>
          </nav>
          <button aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={`hamburger-btn z-[70] flex items-center gap-3 ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}>
            {menuOpen && <span className="text-white text-sm font-medium tracking-widest uppercase opacity-80">Close</span>}
            <div className="flex flex-col items-end gap-[7px]">
              <span className="hamburger-line" /><span className="hamburger-line" />
            </div>
          </button>
        </div>
      </header>

      {/* ═══ MAIN ═══ */}
      <main className="pt-28 sm:pt-36 md:pt-40 pb-24 px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1200px] mx-auto">

        {/* Back */}
        <Link href="/academy" className="inline-flex items-center gap-2 text-white/35 hover:text-white transition-colors mb-8 group">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="group-hover:-translate-x-1 transition-transform">
            <path d="M19 12H5m7-7-7 7 7 7" />
          </svg>
          <span className="text-xs tracking-widest uppercase">Back to Academy</span>
        </Link>

        {/* Hero title */}
        <div className="pa-hero mb-14 sm:mb-20">
          <p className="text-white/30 text-[11px] tracking-[0.35em] uppercase mb-3">Archive · Past Programs</p>
          <h1 className="font-[family-name:var(--font-bebas)] text-cyan text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.88] tracking-tight">
            PREVIOUS
            <br />
            ACADEMIES
          </h1>
        </div>

        {/* ═══════════════════════════════════
            HYDERABAD
        ═══════════════════════════════════ */}
        <section className="pa-block mb-16 sm:mb-20">
          {/* Header */}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
            <div>
              <SectionDots label="" />
              <div className="flex flex-wrap items-baseline gap-3 mt-3">
                <h2 className="font-[family-name:var(--font-bebas)] text-white text-3xl sm:text-4xl md:text-5xl tracking-tight leading-none">
                  HYDERABAD
                </h2>
                <span className="font-[family-name:var(--font-bebas)] text-cyan text-lg sm:text-xl tracking-wide">
                  KARTING ACADEMY
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 pb-1">
              <span className="inline-flex items-center gap-1.5 bg-[#111] border border-white/[0.08] rounded-full px-3 py-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan flex-shrink-0">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="text-white/45 text-[10px] tracking-widest uppercase">30–31 March</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#111] border border-white/[0.08] rounded-full px-3 py-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan flex-shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-white/45 text-[10px] tracking-widest uppercase">Tspeedway, Hyderabad</span>
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.06] mb-5" />

          {/* Count + hint */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/25 text-xs tracking-widest">{HYDERABAD_IMAGES.length} photos</span>
            <span className="text-white/25 text-xs tracking-wider flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              Tap to zoom
            </span>
          </div>

          <BentoCollage images={HYDERABAD_IMAGES} onOpen={(i) => openLightbox(HYDERABAD_IMAGES, i)} />
        </section>

        {/* ═══════════════════════════════════
            BANGALORE — separator line
        ═══════════════════════════════════ */}
        <div className="flex items-center gap-4 mb-14 sm:mb-16">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase">Bangalore · Two Sessions</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* ═══ Bangalore — Session 1: Formula 1300 ═══ */}
        <section className="pa-block mb-14 sm:mb-16">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
            <div>
              <SectionDots label="" />
              <div className="flex flex-wrap items-baseline gap-3 mt-3">
                <h2 className="font-[family-name:var(--font-bebas)] text-white text-3xl sm:text-4xl md:text-5xl tracking-tight leading-none">
                  BANGALORE
                </h2>
                <span className="font-[family-name:var(--font-bebas)] text-cyan text-lg sm:text-xl tracking-wide">
                  + FORMULA 1300 ACADEMY
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 pb-1">
              <span className="bg-cyan text-black text-[10px] font-bold tracking-widest uppercase rounded-full px-3 py-1">
                FORMULA 1300
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#111] border border-white/[0.08] rounded-full px-3 py-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan flex-shrink-0">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="text-white/45 text-[10px] tracking-widest uppercase">2–3 April</span>
              </span>
            </div>
          </div>

          <div className="h-px bg-white/[0.06] mb-5" />

          <div className="flex items-center justify-between mb-3">
            <span className="text-white/25 text-xs tracking-widest">{BLR_FORMULA_IMAGES.length} photos</span>
            <span className="text-white/25 text-xs tracking-wider flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              Tap to zoom
            </span>
          </div>

          <BentoCollage images={BLR_FORMULA_IMAGES} onOpen={(i) => openLightbox(BLR_FORMULA_IMAGES, i)} />
        </section>

        {/* ═══ Session divider ═══ */}
        <div className="flex items-center gap-4 mb-14 sm:mb-16">
          <div className="flex-1 h-px bg-white/[0.04]" />
          <span className="text-white/15 text-[10px] tracking-[0.3em] uppercase">Session 2</span>
          <div className="flex-1 h-px bg-white/[0.04]" />
        </div>

        {/* ═══ Bangalore — Session 2: Karting ═══ */}
        <section className="pa-block">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
            <div>
              <SectionDots label="" />
              <div className="flex flex-wrap items-baseline gap-3 mt-3">
                <h2 className="font-[family-name:var(--font-bebas)] text-white text-3xl sm:text-4xl md:text-5xl tracking-tight leading-none">
                  BANGALORE
                </h2>
                <span className="font-[family-name:var(--font-bebas)] text-cyan text-lg sm:text-xl tracking-wide">
                  KARTING ACADEMY
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 pb-1">
              <span className="bg-[#111] border border-cyan/30 text-cyan text-[10px] font-bold tracking-widest uppercase rounded-full px-3 py-1">
                KARTING
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#111] border border-white/[0.08] rounded-full px-3 py-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan flex-shrink-0">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="text-white/45 text-[10px] tracking-widest uppercase">5–6 January</span>
              </span>
            </div>
          </div>

          <div className="h-px bg-white/[0.06] mb-5" />

          <div className="flex items-center justify-between mb-3">
            <span className="text-white/25 text-xs tracking-widest">{BLR_KARTING_IMAGES.length} photos</span>
            <span className="text-white/25 text-xs tracking-wider flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              Tap to zoom
            </span>
          </div>

          <BentoCollage images={BLR_KARTING_IMAGES} onOpen={(i) => openLightbox(BLR_KARTING_IMAGES, i)} />
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="relative w-full bg-black px-4 sm:px-8 md:px-16 lg:px-24 pt-14 sm:pt-20 md:pt-24 pb-12 sm:pb-16 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 sm:gap-16 lg:gap-24 mb-12 sm:mb-16">
          <div className="flex flex-col gap-4 justify-center">
            <Image src="/assets/throttle.png" alt="Throttle Connectors" width={120} height={120}
              className="h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px] object-contain" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-cyan" /><span className="w-1.5 h-1.5 rounded-full bg-cyan" /></span>
                <span className="text-white/60 text-sm tracking-wider">Navigation</span>
              </div>
              <div className="flex flex-col gap-3 mt-2">
                {[["About Us", "/#about"], ["Academy", "/academy"]].map(([label, href]) => (
                  <Link key={href} href={href} className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">{label}</Link>
                ))}
                <Link href="/academy/previous_academies" className="font-[family-name:var(--font-bebas)] text-cyan text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">
                  Previous Academies
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-cyan" /><span className="w-1.5 h-1.5 rounded-full bg-cyan" /></span>
                <span className="text-white/60 text-sm tracking-wider">Socials</span>
              </div>
              <div className="flex flex-col gap-3 mt-2">
                {[["Instagram", "https://www.instagram.com/throttleconnectors?igsh=c3N4NDc4aHZmYWlr"], ["LinkedIn", "https://www.linkedin.com/in/krishna-prajapati-a3aa5a315"], ["Facebook", "https://www.facebook.com/share/1FvF4bWYsy/"]].map(([label, href]) => (
                  <a key={href} href={href} className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">{label}</a>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-cyan" /><span className="w-1.5 h-1.5 rounded-full bg-cyan" /></span>
                <span className="text-white/60 text-sm tracking-wider">Get in touch</span>
              </div>
              <div className="flex flex-col gap-3 mt-2">
                <a href="tel:+918467042523" className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">+91 8467 042 523</a>
                <a href="https://wa.me/918467042523" target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-bebas)] text-cyan text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs tracking-wider">© 2025 Throttle Connectors. All rights reserved.</p>
          <SocialIcons />
        </div>
      </footer>
    </div>
  );
}
