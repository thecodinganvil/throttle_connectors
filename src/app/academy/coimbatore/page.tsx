"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const REGISTER_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdsYqezO-UMTAV7ZmW1vVu0hxuaqiayGtYKUOQ-BNaQ34L53w/viewform?usp=header";

const NAV_LINKS = [
  { label: "About Us", href: "/#about" },
  { label: "Academy", href: "/academy" },
  { label: "Previous Academies", href: "/academy/previous_academies", accent: true },
];

const GALLERY = [
  { src: "/assets/coimbatore_new_1.jpeg", alt: "Formula 1300 on track – Coimbatore" },
  { src: "/assets/coimbatore_new_2.jpeg", alt: "Pit lane session – Kari Motor Speedway" },
  { src: "/assets/coimbatore_new_3.jpeg", alt: "Professional coaching briefing" },
  { src: "/assets/coimbatore_new_4.jpeg", alt: "Talent evaluation – Formula 1300 Academy" },
];

export default function CoimbatoreAcademy() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const dividerRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    gsap.fromTo(".coimb-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
    gsap.fromTo(".coimb-banner", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.15, ease: "power3.out" });
    gsap.fromTo(".coimb-content", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.3, ease: "power3.out" });
  }, []);

  const SocialIcons = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center gap-4 sm:gap-5 ${className}`}>
      <a href="https://www.instagram.com/throttleconnectors?igsh=c3N4NDc4aHZmYWlr" aria-label="Instagram" className="social-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>
      </a>
      <a href="https://www.linkedin.com/in/krishna-prajapati-a3aa5a315?utm_source=share_via&utm_content=profile&utm_medium=member_android" aria-label="LinkedIn" className="social-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2" /><line x1="7" y1="8" x2="7" y2="17" /><line x1="11" y1="11" x2="11" y2="17" /><path d="M11 11a3 3 0 0 1 6 0v6" /><circle cx="7" cy="6" r="1" /></svg>
      </a>
      <a href="https://www.facebook.com/share/1FvF4bWYsy/" aria-label="Facebook" className="social-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
      </a>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* ═══ MENU OVERLAY ═══ */}
      <div ref={overlayRef} className={`menu-overlay ${menuOpen ? "open" : ""}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
          <div className="flex flex-col justify-center px-10 md:px-20 py-20">
            <nav className="flex flex-col gap-4 sm:gap-6">
              {NAV_LINKS.map((link, i) => (
                <a key={link.href} ref={(el) => { linkRefs.current[i] = el; }}
                  href={link.href}
                  className={`menu-link-large ${link.accent ? "!text-cyan/70 hover:!text-cyan" : ""}`}
                  onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
            </nav>
            <div ref={dividerRef} className="menu-divider-large opacity-20" />
            <div ref={socialsRef} className="menu-socials"><SocialIcons /></div>
          </div>
          <div className="hidden md:flex items-center justify-center relative h-full w-full p-16 lg:p-24 xl:p-32">
            <Image src="/assets/throttle.png" alt="Throttle Connectors logo" width={280} height={280} className="h-[200px] w-[200px] lg:h-[240px] lg:w-[240px] xl:h-[280px] xl:w-[280px] object-contain" />
          </div>
        </div>
      </div>

      {/* ═══ HEADER ═══ */}
      <header className={`fixed top-0 left-0 w-full z-[80] transition-all duration-500 px-5 py-2 sm:px-8 sm:py-3 md:px-12 md:py-3 ${scrolled && !menuOpen ? "bg-black/60 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="flex items-center justify-between w-full">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src="/assets/throttle.png" alt="Throttle Connectors logo" width={130} height={130} priority className="h-[80px] w-[80px] object-contain sm:h-[95px] sm:w-[95px] md:h-[120px] md:w-[120px] transition-all duration-500" />
            </Link>
          </div>
          <nav className={`hidden items-center gap-3 md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <Link href="/#about" className="nav-pill">About Us</Link>
            <Link href="/academy" className="nav-pill nav-pill-active">Academy</Link>
            <Link href="/academy/previous_academies" className="nav-pill" style={{ borderColor: "rgba(89,224,247,0.35)", color: "rgba(89,224,247,0.9)" }}>Previous Academies</Link>
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
      <main className="pt-28 sm:pt-36 md:pt-40 pb-20 sm:pb-28 md:pb-36 px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1200px] mx-auto">

        {/* Back */}
        <Link href="/academy" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5m7-7-7 7 7 7" /></svg>
          <span className="text-sm tracking-wider uppercase">Back to Academy</span>
        </Link>

        {/* ── Title ── */}
        <div className="coimb-title mb-3">
          <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-3">Formula 1300 · Scholarship Program</p>
          <h1 className="font-[family-name:var(--font-bebas)] text-cyan text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight">
            FORMULA 1300 ACADEMY
            <br />
            <span className="text-white">+ SCHOLARSHIP</span>
            <br />
            PROGRAM
          </h1>
        </div>

        {/* Sub-headline */}
        <p className="text-white/50 text-sm sm:text-base tracking-wide mb-4 max-w-xl">
          Train. Perform. Get Selected.
        </p>

        {/* Tag pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <span className="inline-flex items-center gap-1.5 bg-cyan/10 border border-cyan/30 rounded-full px-3 py-1 text-cyan text-xs font-bold tracking-widest uppercase">2-Day Intensive</span>
          <span className="inline-flex items-center gap-1.5 bg-[#111] border border-white/[0.08] rounded-full px-3 py-1 text-white/50 text-xs tracking-wider uppercase">Real Race Car</span>
          <span className="inline-flex items-center gap-1.5 bg-[#111] border border-white/[0.08] rounded-full px-3 py-1 text-white/50 text-xs tracking-wider uppercase">Talent Evaluation</span>
          <span className="inline-flex items-center gap-1.5 bg-[#111] border border-cyan/20 rounded-full px-3 py-1 text-cyan/70 text-xs tracking-wider uppercase">50% Scholarship for Top 2</span>
        </div>

        {/* ── Hero Banner ── */}
        <div className="coimb-banner relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8">
          <Image src="/assets/coimbatore_new_banner.jpeg" alt="Formula 1300 Academy – Kari Motor Speedway, Coimbatore" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            {/* location badge */}
            <div>
              <p className="text-white/50 text-xs tracking-[0.22em] uppercase mb-1">Venue</p>
              <p className="font-[family-name:var(--font-bebas)] text-cyan text-xl sm:text-3xl tracking-wide flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                Kari Motor Speedway, Coimbatore
              </p>
            </div>
            {/* date badge */}
            <div className="sm:text-right">
              <p className="text-white/50 text-xs tracking-[0.22em] uppercase mb-1">Dates</p>
              <p className="font-[family-name:var(--font-bebas)] text-white text-xl sm:text-3xl tracking-wide">5–6 May</p>
            </div>
          </div>
        </div>

        {/* ── Quick Info cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12 coimb-content">
          {[
            { label: "Format", value: "2 Days Training + Evaluation" },
            { label: "Location", value: "Kari Motor Speedway, Coimbatore" },
            { label: "Dates", value: "5–6 May", highlight: true },
            { label: "Program Fee", value: "₹75,000", highlight: true },
          ].map(({ label, value, highlight }) => (
            <div key={label} className={`rounded-xl p-4 sm:p-5 border ${highlight ? "border-cyan/25 bg-[#0d1a1a]" : "border-white/[0.08] bg-[#111111]"}`}>
              <p className="text-white/40 text-[10px] tracking-widest uppercase mb-1.5">{label}</p>
              <p className={`font-[family-name:var(--font-bebas)] text-base sm:text-lg tracking-wide leading-snug ${highlight ? "text-cyan" : "text-white"}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* ── Photo Collage ── */}
        <div className="coimb-content mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan" /><span className="w-1.5 h-1.5 rounded-full bg-cyan" /></span>
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/60">Gallery</span>
          </div>
          {/*
            Bento collage — fixed height container, no aspect-ratio tricks.
            Layout: [BIG | sm1 sm2]
                    [BIG | sm3    ]
            We use two explicitly equal rows so every cell is flush.
          */}
          <div
            className="grid gap-2 sm:gap-3 w-full"
            style={{
              gridTemplateColumns: "2fr 1fr",
              gridTemplateRows: "1fr 1fr",
              height: "clamp(280px, 44vw, 540px)",
            }}
          >
            {/* Big hero – spans both rows */}
            <div className="relative rounded-xl overflow-hidden bg-[#111]" style={{ gridRow: "1 / 3" }}>
              <Image src={GALLERY[0].src} alt={GALLERY[0].alt} fill sizes="66vw" className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            {/* Three thumbnails stacked in right column */}
            {GALLERY.slice(1).map((img, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden bg-[#111]">
                <Image src={img.src} alt={img.alt} fill sizes="33vw" className="object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Introduction ── */}
        <div className="coimb-content mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan" /><span className="w-1.5 h-1.5 rounded-full bg-cyan" /></span>
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/60">Introduction</span>
          </div>
          <div className="bg-[#111111] rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-4">
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              This is not just an academy. This is a <span className="text-cyan font-medium">performance-based program</span> designed to identify serious racing talent.
            </p>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              Over 2 days, you&apos;ll train in a real Formula 1300 car, work with experienced coaches, and get evaluated based on your on-track performance.
            </p>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              If you&apos;re aiming to step into competitive motorsport, <span className="text-white font-medium">this is where it starts.</span>
            </p>
          </div>
        </div>

        {/* ── What You'll Experience ── */}
        <div className="coimb-content mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan" /><span className="w-1.5 h-1.5 rounded-full bg-cyan" /></span>
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/60">What You&apos;ll Experience</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Formula 1300 Car Driving Sessions",
              "Professional Coaching & Guidance",
              "Real Track Time at Kari Motor Speedway",
              "Performance Analysis & Feedback",
              "Final Evaluation & Ranking",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-[#111111] rounded-xl p-4 border border-white/[0.07]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan mt-1.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Who This Is For ── */}
        <div className="coimb-content mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan" /><span className="w-1.5 h-1.5 rounded-full bg-cyan" /></span>
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/60">Who This Is For</span>
          </div>
          <div className="bg-[#111111] rounded-2xl p-6 sm:p-8 border border-white/[0.08]">
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              Aspiring racers who want more than just basic training.
            </p>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed mt-3">
              If you&apos;re serious about motorsport and ready to perform under pressure, <span className="text-cyan font-medium">this program is built for you.</span>
            </p>
          </div>
        </div>

        {/* ── Scholarship Opportunity ── */}
        <div className="coimb-content mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan" /><span className="w-1.5 h-1.5 rounded-full bg-cyan" /></span>
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/60">Scholarship Opportunity</span>
          </div>
          {/* Scholarship hero card */}
          <div className="relative bg-[#0d1a1a] rounded-2xl p-6 sm:p-8 border border-cyan/30 overflow-hidden">
            {/* top badge */}
            <div className="absolute top-0 right-0 bg-cyan text-black text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-bl-xl">
              Top 2 Performers
            </div>
            <div className="absolute -top-12 -right-12 w-44 h-44 bg-cyan/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black/40 border border-cyan/30 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              </div>
              <div>
                <p className="font-[family-name:var(--font-bebas)] text-cyan text-2xl sm:text-3xl tracking-wide mb-2">50% SCHOLARSHIP</p>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                  Top 2 performers from the program will receive a <span className="text-cyan font-semibold">50% Scholarship for the Championship Season.</span>
                </p>
                <p className="text-white/50 text-sm mt-3 leading-relaxed">
                  This is a direct pathway to competitive racing. <span className="text-white/80 font-medium">Performance matters. Results decide.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Program Details ── */}
        <div className="coimb-content mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan" /><span className="w-1.5 h-1.5 rounded-full bg-cyan" /></span>
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/60">Program Details</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Dates", value: "5–6 May", highlight: true },
              { label: "Location", value: "Kari Motor Speedway, Coimbatore" },
              { label: "Format", value: "2 Days Training + Talent Evaluation" },
            ].map(({ label, value, highlight }) => (
              <div key={label} className={`rounded-xl p-5 border ${highlight ? "border-cyan/25 bg-[#0d1a1a]" : "border-white/[0.08] bg-[#111111]"}`}>
                <p className="text-white/40 text-xs tracking-widest uppercase mb-2">{label}</p>
                <p className={`font-[family-name:var(--font-bebas)] text-lg tracking-wide ${highlight ? "text-cyan" : "text-white"}`}>{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-[#111111] rounded-xl p-4 border border-white/[0.06] flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan flex-shrink-0"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            <p className="text-white/50 text-xs tracking-wide">Limited Seats. No last-minute entries.</p>
          </div>
        </div>

        {/* ── Pricing ── */}
        <div className="coimb-content mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan" /><span className="w-1.5 h-1.5 rounded-full bg-cyan" /></span>
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/60">Pricing</span>
          </div>
          <div className="bg-[#111111] rounded-2xl p-6 sm:p-8 border border-cyan/20 max-w-lg">
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Program Fee</p>
                <p className="font-[family-name:var(--font-bebas)] text-cyan text-4xl sm:text-5xl tracking-wide">₹75,000</p>
              </div>
            </div>
            <div className="border-t border-white/[0.06] pt-4">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-3">Includes</p>
              <div className="space-y-2">
                {["Formula 1300 car access", "Track sessions", "Coaching & evaluation"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/60 text-sm">
                    <span className="w-1 h-1 rounded-full bg-cyan flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Final CTA ── */}
        <div className="coimb-content">
          <div className="bg-[#111111] rounded-2xl p-6 sm:p-8 border border-white/[0.08] max-w-2xl mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan" /><span className="w-1.5 h-1.5 rounded-full bg-cyan" /></span>
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/60">Registration</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Click &quot;Register Now&quot;, fill out the Google Form, and complete the payment. After payment, send us a screenshot on WhatsApp for confirmation.
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              Banking name — <span className="text-white font-semibold tracking-wide">VASU ENTERPRISES</span><br />
              Please verify this name before making payment.
            </p>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-white/40 text-sm mb-2 tracking-wide italic">
              Serious about racing? Prove it on track.
            </p>
            <p className="text-white/30 text-xs mb-6 tracking-wide">
              This isn&apos;t for everyone. Only for those ready to perform.
            </p>
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="cta-button group inline-flex">
              <span className="text-sm sm:text-base font-medium tracking-wide z-10">Register Now</span>
              <span className="cta-icon-wrapper">
                <svg className="cta-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </main>

      {/* ═══ STICKY BAR ═══ */}
      <div className="fixed bottom-0 left-0 w-full z-[60] bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none pb-4 pt-10 sm:pb-6 sm:pt-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 flex items-center justify-between gap-3 pointer-events-auto">
          <div className="hidden sm:flex flex-col">
            <span className="font-[family-name:var(--font-bebas)] text-white text-lg tracking-wide">FORMULA 1300 ACADEMY · COIMBATORE</span>
            <span className="text-white/40 text-xs">5–6 May · <span className="text-cyan font-semibold">₹75,000</span> · Limited Seats</span>
          </div>
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer"
            className="w-full sm:w-auto bg-cyan hover:bg-cyan/90 text-black font-bold text-xs sm:text-sm md:text-base tracking-wide px-4 py-3 sm:px-8 sm:py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]">
            <span>Register Now</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
          </a>
        </div>
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer className="relative w-full bg-black px-4 sm:px-8 md:px-16 lg:px-24 pt-14 sm:pt-20 md:pt-28 pb-24 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 sm:gap-16 lg:gap-24 mb-12 sm:mb-20">
          <div className="flex flex-col gap-4 justify-center">
            <Image src="/assets/throttle.png" alt="Throttle Connectors" width={120} height={120} className="h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px] object-contain" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-cyan" /><span className="w-1.5 h-1.5 rounded-full bg-cyan" /></span>
                <span className="text-white/60 text-sm tracking-wider">Navigation</span>
              </div>
              <div className="flex flex-col gap-3 mt-2">
                <Link href="/#about" className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">About Us</Link>
                <Link href="/academy" className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">Academy</Link>
                <Link href="/academy/previous_academies" className="font-[family-name:var(--font-bebas)] text-cyan text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">Previous Academies</Link>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-cyan" /><span className="w-1.5 h-1.5 rounded-full bg-cyan" /></span>
                <span className="text-white/60 text-sm tracking-wider">Socials</span>
              </div>
              <div className="flex flex-col gap-3 mt-2">
                <a href="https://www.instagram.com/throttleconnectors?igsh=c3N4NDc4aHZmYWlr" className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">Instagram</a>
                <a href="https://www.linkedin.com/in/krishna-prajapati-a3aa5a315?utm_source=share_via&utm_content=profile&utm_medium=member_android" className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">LinkedIn</a>
                <a href="https://www.facebook.com/share/1FvF4bWYsy/" className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">Facebook</a>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-cyan" /><span className="w-1.5 h-1.5 rounded-full bg-cyan" /></span>
                <span className="text-white/60 text-sm tracking-wider">Get in touch</span>
              </div>
              <div className="flex flex-col gap-3 mt-2">
                <a href="tel:+918467042523" className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">+91 8467042523</a>
                <a href="mailto:throttleconnectors@gmail.com" className="font-[family-name:var(--font-bebas)] text-white text-sm sm:text-base md:text-lg tracking-wide uppercase break-all hover:opacity-50 transition-opacity">throttleconnectors@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 pb-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-[family-name:var(--font-bebas)] text-white/40 text-base sm:text-lg tracking-wider">Developed &amp; Designed by <span className="text-cyan">Osman</span> and <span className="text-cyan">Arbaaz</span></p>
          <p className="font-[family-name:var(--font-bebas)] text-white/30 text-base sm:text-lg tracking-wider">©2026 Copyright All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}
