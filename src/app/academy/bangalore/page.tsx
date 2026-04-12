"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "About Us", href: "/#about" },
  { label: "Academy", href: "/academy" },
];

export default function BangaloreAcademy() {
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
      gsap.fromTo(
        linkRefs.current.filter(Boolean),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: "power3.out", delay: 0.15 },
      );
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.5, delay: 0.4, ease: "power2.out" },
      );
      gsap.fromTo(
        socialsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.5, ease: "power3.out" },
      );
    } else {
      document.body.classList.remove("menu-open");
      gsap.set(linkRefs.current.filter(Boolean), { y: 60, opacity: 0 });
      gsap.set(dividerRef.current, { scaleX: 0, opacity: 0 });
      gsap.set(socialsRef.current, { y: 30, opacity: 0 });
    }
    return () => { document.body.classList.remove("menu-open"); };
  }, [menuOpen]);

  useEffect(() => {
    gsap.fromTo(".academy-hero-title", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
    gsap.fromTo(".academy-banner", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.15, ease: "power3.out" });
    gsap.fromTo(".academy-content", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.3, ease: "power3.out" });
  }, []);

  const SocialIcons = ({ className = "" }: { className?: string }) => (
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

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* ═══════ MENU OVERLAY ═══════ */}
      <div ref={overlayRef} className={`menu-overlay ${menuOpen ? "open" : ""}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
          <div className="flex flex-col justify-center px-10 md:px-20 py-20">
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <a key={link.href} ref={(el) => { linkRefs.current[i] = el; }} href={link.href} className="menu-link-large" onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
            </nav>
            <div ref={dividerRef} className="menu-divider-large opacity-20" />
            <div ref={socialsRef} className="menu-socials"><SocialIcons /></div>
          </div>
          <div className="hidden md:flex items-center justify-center relative h-full w-full p-16 lg:p-24 xl:p-32">
            <Image src="/assets/throttle.png" alt="Throttle Connectors logo" width={320} height={320} className="h-[200px] w-[200px] lg:h-[240px] lg:w-[240px] xl:h-[280px] xl:w-[280px] object-contain" />
          </div>
        </div>
      </div>

      {/* ═══════ HEADER ═══════ */}
      <header className={`fixed top-0 left-0 w-full z-[80] transition-all duration-500 px-5 py-2 sm:px-8 sm:py-3 md:px-12 md:py-3 ${scrolled && !menuOpen ? "bg-black/60 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="flex items-center justify-between w-full">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src="/assets/throttle.png" alt="Throttle Connectors logo" width={130} height={130} priority className="h-[80px] w-[80px] object-contain sm:h-[95px] sm:w-[95px] md:h-[120px] md:w-[120px] transition-all duration-500" />
            </Link>
          </div>
          <nav className={`hidden items-center gap-4 md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <Link href="/#about" className="nav-pill">About Us</Link>
            <Link href="/academy" className="nav-pill nav-pill-active">Academy</Link>
          </nav>
          <button aria-label={menuOpen ? "Close menu" : "Open menu"} className={`hamburger-btn z-[70] flex items-center gap-3 ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
            {menuOpen && <span className="text-white text-sm font-medium tracking-widest uppercase opacity-80">Close</span>}
            <div className="flex flex-col items-end gap-[7px]">
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </div>
          </button>
        </div>
      </header>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <main className="pt-28 sm:pt-36 md:pt-40 pb-20 sm:pb-28 md:pb-36 px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1200px] mx-auto">
        {/* ── Back link ── */}
        <Link href="/academy" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
            <path d="M19 12H5m7-7-7 7 7 7" />
          </svg>
          <span className="text-sm tracking-wider uppercase">Back to Academy</span>
        </Link>

        {/* ── Title ── */}
        <h1 className="academy-hero-title font-[family-name:var(--font-bebas)] text-cyan text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-4 sm:mb-6">
          SUMMER MOTORSPORT
          <br />
          CAMP – BANGALORE
        </h1>
        <p className="font-[family-name:var(--font-bebas)] text-cyan/60 text-xl sm:text-2xl md:text-3xl tracking-wide mb-10 sm:mb-14 flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          17–19 MAY {`·`} 3-DAY MOTORSPORT EXPERIENCE
        </p>

        {/* ── Hero Banner ── */}
        <div className="academy-banner relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-16 sm:mb-20">
          <Image
            src="/assets/new_bangalore_academy4.jpeg"
            alt="Summer Motorsport Camp Bangalore – Race Grid"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
            <span className="text-white/50 text-xs tracking-[0.25em] uppercase">Throttle Connectors Presents</span>
            <p className="font-[family-name:var(--font-bebas)] text-cyan text-2xl sm:text-4xl tracking-wide mt-1">Summer Motorsport Camp</p>
          </div>
        </div>

        {/* ── Description ── */}
        <div className="academy-content">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
            </span>
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/70">Overview</span>
          </div>

          <h2 className="font-[family-name:var(--font-bebas)] text-white text-2xl sm:text-3xl md:text-4xl tracking-wide mb-6">
            SUMMER MOTORSPORT CAMP – BANGALORE
          </h2>

          <div className="max-w-3xl space-y-5 mb-10">
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              A professionally structured motorsport program designed to combine skill development with real on-track racing experience. Train like a racer, compete like a champion.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-2 text-white/80 text-sm sm:text-base">
                <span className="text-cyan font-semibold flex-shrink-0">01 –</span>
                <span>2 Days of Professional Karting Training</span>
              </div>
              <div className="flex items-start gap-2 text-white/80 text-sm sm:text-base">
                <span className="text-cyan font-semibold flex-shrink-0">02 –</span>
                <span>1 Day Competitive Race Event</span>
              </div>
              <div className="flex items-start gap-2 text-white/80 text-sm sm:text-base">
                <span className="text-cyan font-semibold flex-shrink-0">03 –</span>
                <span>Top performers will be awarded <span className="text-cyan font-semibold">cash prizes</span></span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/30 rounded-full px-4 py-1.5">
              <span className="text-cyan text-xs font-bold tracking-widest uppercase">Age</span>
              <span className="text-white font-bold text-sm">9+ · Boys & Girls</span>
            </div>
          </div>

          {/* ── Quick Info Cards ── */}
          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
            <div className="bg-[#111111] rounded-xl p-5 sm:p-6 border border-white/[0.08]">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Venue</p>
              <p className="font-[family-name:var(--font-bebas)] text-white text-lg sm:text-xl tracking-wide">Red Riders Go Karting, Bangalore</p>
            </div>
            <div className="bg-[#111111] rounded-xl p-5 sm:p-6 border border-white/[0.08]">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Duration</p>
              <p className="font-[family-name:var(--font-bebas)] text-white text-lg sm:text-xl tracking-wide">3-Day Camp</p>
            </div>
            <div className="bg-[#111111] rounded-xl p-5 sm:p-6 border border-cyan/20">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Dates</p>
              <p className="font-[family-name:var(--font-bebas)] text-cyan text-lg sm:text-xl tracking-wide">17–19 May</p>
            </div>
            <div className="bg-[#111111] rounded-xl p-5 sm:p-6 border border-white/[0.08]">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Starting From</p>
              <p className="font-[family-name:var(--font-bebas)] text-cyan text-lg sm:text-xl tracking-wide">₹15,999</p>
              <p className="text-white/40 text-xs mt-1">Only <span className="text-cyan">10 seats</span> available</p>
            </div>
          </div>

          {/* ── Image Grid ── */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image src="/assets/new_bangalore_academy.jpeg" alt="Summer Camp – Track briefing session" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image src="/assets/new_bangalore_academy2.jpeg" alt="Summer Camp – Trophies and prizes" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-16 sm:mb-20">
            <Image src="/assets/new_bangalore_academy3.jpeg" alt="Summer Camp – Karting race action" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>

          {/* ── Program Structure ── */}
          <div className="mb-16 sm:mb-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              </span>
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/70">Program Structure</span>
            </div>

            <h2 className="font-[family-name:var(--font-bebas)] text-white text-2xl sm:text-3xl md:text-4xl tracking-wide mb-10">
              WHAT YOU&apos;LL EXPERIENCE
            </h2>

            {/* Day 1 & 2 – Training Phase */}
            <div className="bg-[#111111] rounded-2xl p-6 sm:p-8 border border-white/[0.08] mb-8 md:mb-12">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-[family-name:var(--font-bebas)] text-cyan text-5xl sm:text-6xl leading-none">01</span>
                <div>
                  <p className="text-white/40 text-xs tracking-widest uppercase">Days</p>
                  <p className="font-[family-name:var(--font-bebas)] text-white text-xl tracking-wide">Day 1 &amp; 2 – Training Phase</p>
                </div>
              </div>
              <p className="text-white/40 text-xs mb-6 mt-1">Track: Red Riders Go Karting, Bangalore</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {[
                  "Racing lines and track awareness",
                  "Braking techniques and vehicle control",
                  "Consistency, speed, and confidence building",
                  "Structured coaching sessions",
                  "Timed practice laps",
                  "Performance feedback and improvement",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/60 text-sm list-none">
                    <span className="w-1 h-1 rounded-full bg-cyan mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </div>
              <p className="text-white/40 text-xs mt-6 italic">All sessions are conducted in a safe, structured, and professionally supervised environment.</p>
            </div>

            {/* Cinematic divider image */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden my-8 md:my-12 group">
              <Image src="/assets/new_bangalore_academy5.jpeg" alt="Race grid – Summer Motorsport Camp Bangalore" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8">
                <p className="text-white/50 text-xs tracking-[0.25em] uppercase mb-1">Day 3</p>
                <p className="font-[family-name:var(--font-bebas)] text-cyan text-2xl sm:text-4xl tracking-wide">Final Race Event</p>
              </div>
            </div>

            {/* Day 3 – Race Event */}
            <div className="bg-gradient-to-br from-[#111111] to-[#0d1a1a] rounded-2xl p-6 sm:p-8 border border-cyan/20">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-[family-name:var(--font-bebas)] text-cyan text-5xl sm:text-6xl leading-none">02</span>
                <div>
                  <p className="text-white/40 text-xs tracking-widest uppercase">Day</p>
                  <p className="font-[family-name:var(--font-bebas)] text-white text-xl tracking-wide">Day 3 – Final Race Event</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                    The final day puts everything to the test. Participants compete in timed sessions with performance-based rankings — and a chance to win <span className="text-cyan font-semibold">cash prizes</span>.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    { icon: "check", text: "Timed sessions and race execution" },
                    { icon: "star", text: "Performance-based rankings" },
                    { icon: "trophy", text: "Cash prizes for top performers" },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-start gap-3 bg-black/30 rounded-xl p-4 border border-cyan/10">
                      <span className="text-cyan mt-0.5">
                        {icon === "check" && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        )}
                        {icon === "star" && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        )}
                        {icon === "trophy" && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4a2 2 0 0 1-2-2V5h4" /><path d="M18 9h2a2 2 0 0 0 2-2V5h-4" /><path d="M12 17v4" /><path d="M8 21h8" /><path d="M6 9a6 6 0 0 0 12 0V3H6v6z" /></svg>
                        )}
                      </span>
                      <p className="text-white/70 text-sm leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Key Highlights ── */}
          <div className="mb-16 sm:mb-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              </span>
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/70">Key Highlights</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { num: "01", text: "Limited batch ensures focused attention and maximum track time" },
                { num: "02", text: "Combination of training and real race experience" },
                { num: "03", text: "Professional, safety-oriented environment" },
              ].map(({ num, text }) => (
                <div key={num} className="bg-[#111111] rounded-2xl p-6 border border-white/[0.08] flex flex-col gap-3">
                  <span className="font-[family-name:var(--font-bebas)] text-cyan text-4xl leading-none">{num}</span>
                  <p className="text-white/60 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Awards image ── */}
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-16 sm:mb-20 group">
            <Image src="/assets/new_bangalore_academy6.jpeg" alt="Summer Camp – Award ceremony and certificates" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* ── Pricing ── */}
          <div className="mb-16 sm:mb-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              </span>
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/70">Fees &amp; Availability</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
              <div className="bg-[#111111] rounded-2xl p-6 sm:p-8 border border-cyan/20 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-cyan text-black text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-bl-lg">
                  Limited Seats
                </div>
                <p className="text-white/40 text-xs tracking-widest uppercase mb-3">Starting From</p>
                <p className="font-[family-name:var(--font-bebas)] text-cyan text-3xl sm:text-4xl tracking-wide">₹15,999</p>
              </div>
              <div className="bg-[#111111] rounded-2xl p-6 sm:p-8 border border-white/[0.08] flex flex-col justify-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan/60" />
                  <p className="text-white/60 text-sm">Only <span className="text-white font-semibold">10 seats</span> available</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan/60" />
                  <p className="text-white/60 text-sm">Registrations filling fast</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan/60" />
                  <p className="text-white/60 text-sm">Limited slots remaining</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Registration Info ── */}
          <div className="mb-16 sm:mb-20 bg-[#111111] rounded-2xl p-6 sm:p-8 border border-white/[0.08] max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              </span>
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/70">Contact &amp; Registration</span>
            </div>
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#132c2c] to-[#111111] border border-cyan/30 p-6 sm:p-8 mb-8 shadow-[0_0_30px_rgba(0,255,255,0.08)] hover:shadow-[0_0_40px_rgba(0,255,255,0.15)] transition-all duration-500 group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-cyan/20 transition-colors duration-500" />
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan via-cyan/50 to-transparent" />
              <div className="flex flex-col gap-3 relative z-10">
                <a href="tel:+918467042523" className="flex items-center gap-3 text-white/70 hover:text-cyan transition-colors text-sm sm:text-base">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan flex-shrink-0">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  +91 84670 42523
                </a>
                <a href="tel:+918303861485" className="flex items-center gap-3 text-white/70 hover:text-cyan transition-colors text-sm sm:text-base">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan flex-shrink-0">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  +91 83038 61485
                </a>
                <a href="https://throttleconnectors.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-cyan transition-colors text-sm sm:text-base">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan flex-shrink-0">
                    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  throttleconnectors.in
                </a>
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="text-center">
            <p className="text-white/50 text-sm mb-6 tracking-wide">
              Registrations opening soon — secure your slot early.
            </p>
            <div className="cta-button group inline-flex mx-auto opacity-60 cursor-not-allowed select-none">
              <span className="text-sm sm:text-base font-medium tracking-wide z-10">
                Registration Opening Soon
              </span>
              <span className="cta-icon-wrapper">
                <svg className="cta-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* ═══════ STICKY REGISTER BAR ═══════ */}
      <div className="fixed bottom-0 left-0 w-full z-[60] bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none pb-4 pt-10 sm:pb-6 sm:pt-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 flex items-center justify-between gap-3 pointer-events-auto">
          <div className="hidden sm:flex flex-col">
            <span className="font-[family-name:var(--font-bebas)] text-white text-lg tracking-wide">SUMMER MOTORSPORT CAMP</span>
            <span className="text-white/40 text-xs">Starting from <span className="text-cyan font-semibold">₹15,999</span> · 17–19 May</span>
          </div>
          <div className="w-full sm:w-auto bg-white/10 border border-white/20 text-white/60 font-bold text-xs sm:text-sm md:text-base tracking-wide px-4 py-3 sm:px-8 sm:py-4 rounded-full flex items-center justify-center gap-2 cursor-not-allowed select-none">
            <span>Registration Opening Soon</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>
      </div>

      {/* ═══════ FOOTER ═══════ */}
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
                <a href="tel:+918467042523" className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">+91 84670 42523</a>
                <a href="tel:+918303861485" className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">+91 83038 61485</a>
                <a href="mailto:throttleconnectors@gmail.com" className="font-[family-name:var(--font-bebas)] text-white text-sm sm:text-base md:text-lg tracking-wide uppercase break-all hover:opacity-50 transition-opacity">throttleconnectors@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 pb-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-[family-name:var(--font-bebas)] text-white/40 text-base sm:text-lg tracking-wider">
            Developed &amp; Designed by <span className="text-cyan">Osman</span> and <span className="text-cyan">Arbaaz</span>
          </p>
          <p className="font-[family-name:var(--font-bebas)] text-white/30 text-base sm:text-lg tracking-wider">©2026 Copyright All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}
