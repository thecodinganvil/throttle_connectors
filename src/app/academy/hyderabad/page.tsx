"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "About Us", href: "/#about" },
  { label: "Academy", href: "/academy" },
  { label: "Previous Academies", href: "/academy/previous_academies" },
];

export default function HyderabadAcademy() {
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
            <Link href="/academy/previous_academies" className="nav-pill">Previous Academies</Link>
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
          HYDERABAD MOTORSPORT
          <br />
          ACADEMY
        </h1>
        <p className="font-[family-name:var(--font-bebas)] text-cyan/60 text-xl sm:text-2xl md:text-3xl tracking-wide mb-10 sm:mb-14 flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          13–14 MAY {`·`} 2-DAY MOTORSPORT EXPERIENCE
        </p>

        {/* ── Hero Banner ── */}
        <div className="academy-banner relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-16 sm:mb-20">
          <Image
            src="/assets/hyderabad_new2.jpeg"
            alt="Hyderabad Motorsport Academy – Karting Action on Track"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
            <span className="text-white/50 text-xs tracking-[0.25em] uppercase">Presented by Throttle Connectors</span>
            <p className="font-[family-name:var(--font-bebas)] text-cyan text-2xl sm:text-4xl tracking-wide mt-1">Hyderabad Motorsport Academy</p>
          </div>
        </div>

        {/* ── Description ── */}
        <div className="academy-content">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
            </span>
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/70">Program Overview</span>
          </div>

          <h2 className="font-[family-name:var(--font-bebas)] text-white text-2xl sm:text-3xl md:text-4xl tracking-wide mb-6">
            HYDERABAD MOTORSPORT ACADEMY
          </h2>

          <div className="max-w-3xl space-y-5 mb-10">
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              A high-performance motorsport program designed to combine professional karting training with a real race experience — all within a structured 2-day format. This academy provides participants with both technical driving skills and real racing exposure.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-2 text-white/80 text-sm sm:text-base">
                <span className="text-cyan font-semibold flex-shrink-0">01 –</span>
                <span>Complete Level 1 Karting Training</span>
              </div>
              <div className="flex items-start gap-2 text-white/80 text-sm sm:text-base">
                <span className="text-cyan font-semibold flex-shrink-0">02 –</span>
                <span>Competitive Race Simulation</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/30 rounded-full px-4 py-1.5">
                <span className="text-cyan text-xs font-bold tracking-widest uppercase">Winner</span>
                <span className="text-white font-bold text-sm">₹10,000 Cash Prize</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/30 rounded-full px-4 py-1.5">
                <span className="text-cyan text-xs font-bold tracking-widest uppercase">Age</span>
                <span className="text-white font-bold text-sm">9+ · Boys & Girls</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#111111] border border-white/[0.08] rounded-full px-4 py-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan flex-shrink-0">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="text-white/70 text-sm">Certification awarded to all participants upon completion</span>
            </div>
          </div>

          {/* ── Quick Info Cards ── */}
          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
            <div className="bg-[#111111] rounded-xl p-5 sm:p-6 border border-white/[0.08]">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Venue</p>
              <p className="font-[family-name:var(--font-bebas)] text-white text-lg sm:text-xl tracking-wide">Tspeedway, Hyderabad</p>
            </div>
            <div className="bg-[#111111] rounded-xl p-5 sm:p-6 border border-white/[0.08]">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Duration</p>
              <p className="font-[family-name:var(--font-bebas)] text-white text-lg sm:text-xl tracking-wide">2-Day Program</p>
            </div>
            <div className="bg-[#111111] rounded-xl p-5 sm:p-6 border border-cyan/20">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Dates</p>
              <p className="font-[family-name:var(--font-bebas)] text-cyan text-lg sm:text-xl tracking-wide">13–14 May</p>
            </div>
            <div className="bg-[#111111] rounded-xl p-5 sm:p-6 border border-cyan/20">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-3">Pricing</p>
              <div className="space-y-2">
                <div>
                  <p className="text-white/60 text-xs tracking-wide">Early Bird</p>
                  <p className="font-[family-name:var(--font-bebas)] text-cyan text-lg sm:text-xl tracking-wide">₹13,499</p>
                </div>
                <div className="border-t border-white/10 pt-2">
                  <p className="text-white/60 text-xs tracking-wide">Regular Price</p>
                  <p className="font-[family-name:var(--font-bebas)] text-white text-lg sm:text-xl tracking-wide">₹15,000</p>
                </div>
              </div>
              <p className="text-white/40 text-xs mt-3">Limited <span className="text-cyan">batch size</span></p>
            </div>
          </div>

          {/* ── Image Grid – unique layout: 1 large left + 2 stacked right ── */}
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-4 sm:gap-6 mb-16 sm:mb-20">
            <div className="relative aspect-[4/5] md:aspect-auto rounded-xl overflow-hidden">
              <Image src="/assets/hyderabad_new3.jpeg" alt="Hyderabad Academy – Karts lined up on the race grid" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image src="/assets/hyderabad_new1.jpeg" alt="Hyderabad Academy – Track briefing with the coach" fill className="object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image src="/assets/hyderabad_new4.jpeg" alt="Hyderabad Academy – Race grid formation" fill className="object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
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

            {/* Day 1 – Level 1 Training Phase */}
            <div className="bg-[#111111] rounded-2xl p-6 sm:p-8 border border-white/[0.08] mb-8 md:mb-12">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-[family-name:var(--font-bebas)] text-cyan text-5xl sm:text-6xl leading-none">01</span>
                <div>
                  <p className="text-white/40 text-xs tracking-widest uppercase">Day</p>
                  <p className="font-[family-name:var(--font-bebas)] text-white text-xl tracking-wide">Day 1 – Level 1 Training Phase</p>
                </div>
              </div>
              <p className="text-white/40 text-xs mb-6 mt-1">Venue: Tspeedway, Hyderabad</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {[
                  "Racing lines & track awareness",
                  "Braking techniques & vehicle control",
                  "Speed, consistency & control fundamentals",
                  "Structured coaching sessions",
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
              <Image src="/assets/hyderabad_new2.jpeg" alt="Race action – Hyderabad Motorsport Academy" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8">
                <p className="text-white/50 text-xs tracking-[0.25em] uppercase mb-1">Day 2</p>
                <p className="font-[family-name:var(--font-bebas)] text-cyan text-2xl sm:text-4xl tracking-wide">Race Competition Day</p>
              </div>
            </div>

            {/* Day 2 – Race Competition */}
            <div className="bg-gradient-to-br from-[#111111] to-[#0d1a1a] rounded-2xl p-6 sm:p-8 border border-cyan/20">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-[family-name:var(--font-bebas)] text-cyan text-5xl sm:text-6xl leading-none">02</span>
                <div>
                  <p className="text-white/40 text-xs tracking-widest uppercase">Day</p>
                  <p className="font-[family-name:var(--font-bebas)] text-white text-xl tracking-wide">Day 2 – Race Competition</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                    The final day puts everything to the test. Participants compete in timed sessions with performance-based rankings — and a chance to win the <span className="text-cyan font-semibold">₹10,000 cash prize</span>.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    { icon: "check", text: "Timed practice sessions" },
                    { icon: "star", text: "Race execution under pressure" },
                    { icon: "trophy", text: "Performance-based rankings — Top Performer wins ₹10,000" },
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

          {/* ── Who Can Participate ── */}
          <div className="mb-16 sm:mb-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              </span>
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/70">Who Can Participate</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: "age", label: "Age", value: "9+ years" },
                { icon: "gender", label: "Open For", value: "Boys & Girls" },
                { icon: "level", label: "Level", value: "Beginners & Aspiring Racers" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="bg-[#111111] rounded-2xl p-6 border border-white/[0.08] flex items-start gap-4">
                  <span className="text-cyan mt-0.5">
                    {icon === "age" && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    )}
                    {icon === "gender" && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    )}
                    {icon === "level" && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                    )}
                  </span>
                  <div>
                    <p className="text-white/40 text-xs tracking-widest uppercase mb-1">{label}</p>
                    <p className="text-white/90 text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
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
                { num: "01", text: "Level 1 Training + Live Race Experience" },
                { num: "02", text: "Certificate of Completion awarded to all participants" },
                { num: "03", text: "Limited participants for maximum track time" },
                { num: "04", text: "Safe & professionally managed environment" },
                { num: "05", text: "Ideal entry into grassroots motorsport" },
              ].map(({ num, text }) => (
                <div key={num} className="bg-[#111111] rounded-2xl p-6 border border-white/[0.08] flex flex-col gap-3">
                  <span className="font-[family-name:var(--font-bebas)] text-cyan text-4xl leading-none">{num}</span>
                  <p className="text-white/60 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Awards / Group image ── */}
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-16 sm:mb-20 group">
            <Image src="/assets/hyderabad_new5.jpeg" alt="Hyderabad Motorsport Academy – Awards ceremony & group photo" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* ── Why Join This Academy ── */}
          <div className="mb-16 sm:mb-20 bg-gradient-to-br from-[#111111] to-[#0d1a1a] rounded-2xl p-6 sm:p-8 border border-cyan/10">
            <div className="flex items-center gap-3 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/70">Why Join This Academy?</span>
            </div>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              This is not just a karting session — it&apos;s a structured entry into motorsport, designed for <span className="text-cyan font-medium">skill development</span>, <span className="text-cyan font-medium">race exposure</span>, and <span className="text-cyan font-medium">competitive mindset building</span>.
            </p>
          </div>

          {/* ── Pricing ── */}
          <div className="mb-16 sm:mb-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              </span>
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/70">Pricing &amp; Slots</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
              <div className="bg-[#111111] rounded-2xl p-6 sm:p-8 border border-cyan/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-cyan text-black text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-bl-lg">
                  Early Bird
                </div>
                <p className="text-white/40 text-xs tracking-widest uppercase mb-3">Limited Seats</p>
                <p className="font-[family-name:var(--font-bebas)] text-cyan text-4xl sm:text-5xl tracking-wide mb-2">₹13,499</p>
                <p className="text-white/50 text-sm">Grab this special pricing now</p>
              </div>
              <div className="bg-[#111111] rounded-2xl p-6 sm:p-8 border border-white/[0.08]">
                <p className="text-white/40 text-xs tracking-widest uppercase mb-3">Regular Price</p>
                <p className="font-[family-name:var(--font-bebas)] text-white text-4xl sm:text-5xl tracking-wide mb-2">₹15,000</p>
                <p className="text-white/50 text-sm">Standard pricing after early bird</p>
              </div>
            </div>
            <div className="mt-6 bg-[#111111] rounded-2xl p-6 sm:p-8 border border-white/[0.08]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan/60 flex-shrink-0" />
                  <p className="text-white/60 text-sm">Limited <span className="text-white font-semibold">batch size</span></p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan/60 flex-shrink-0" />
                  <p className="text-white/60 text-sm">Early booking recommended</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan/60 flex-shrink-0" />
                  <p className="text-white/60 text-sm">Registrations filling fast</p>
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
            <div className="rounded-xl border border-white/10 bg-black/30 p-5 sm:p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                </span>
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/60">Registration</span>
              </div>
              <div className="space-y-3 text-white/70 text-sm sm:text-base leading-relaxed">
                <p>
                  For registration, please click on <span className="text-white font-medium">&quot;Register Now&quot;</span>, fill out the Google Form, and complete the payment.
                </p>
                <p>
                  After making the payment, kindly send us a screenshot on WhatsApp for seat confirmation.
                </p>
                <p>
                  Banking name - <span className="text-white font-semibold tracking-wide">VASU ENTERPRISES</span>
                </p>
                <p>
                  Please checkout this name before making payment.
                </p>
              </div>
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
            <p className="text-white/50 text-sm mb-3 tracking-wide">
              Spots are limited and filling fast. Secure your slot today!
            </p>
            <p className="text-white/40 text-xs mb-6 tracking-wide">
              Limited batch size — early booking recommended
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="cta-button group inline-flex mx-auto cursor-default opacity-90">
                <span className="text-sm sm:text-base font-medium tracking-wide z-10">
                  Registrations Will Open Soon
                </span>
                <span className="cta-icon-wrapper">
                  <svg className="cta-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                </span>
              </div>
              <a href="https://wa.me/918467042523" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#111111] border border-white/[0.08] text-white/80 hover:text-cyan hover:border-cyan/30 font-medium text-sm tracking-wide px-6 py-3 rounded-full transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                Contact on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* ═══════ STICKY REGISTER BAR ═══════ */}
      <div className="fixed bottom-0 left-0 w-full z-[60] bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none pb-4 pt-10 sm:pb-6 sm:pt-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 flex items-center justify-between gap-3 pointer-events-auto">
          <div className="hidden sm:flex flex-col">
            <span className="font-[family-name:var(--font-bebas)] text-white text-lg tracking-wide">HYDERABAD MOTORSPORT ACADEMY</span>
            <span className="text-white/40 text-xs">Early Bird <span className="text-cyan font-semibold">₹13,499</span> · Regular <span className="text-cyan font-semibold">₹15,000</span> · 13–14 May</span>
          </div>
          <div className="w-full sm:w-auto bg-cyan text-black font-bold text-xs sm:text-sm md:text-base tracking-wide px-4 py-3 sm:px-8 sm:py-4 rounded-full flex items-center justify-center gap-2 cursor-default">
            <span>Registrations Will Open Soon</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="5 12 19 12"></polyline><polyline points="12 5 19 12 12 19"></polyline>
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
