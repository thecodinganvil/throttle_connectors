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

export default function DelhiNcrAcademy() {
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
          KARTING ACADEMY
          <br />
          DELHI NCR
        </h1>
        <p className="font-[family-name:var(--font-bebas)] text-cyan/60 text-xl sm:text-2xl md:text-3xl tracking-wide mb-10 sm:mb-14 flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          25–26 MAY {`·`} 2-DAY KARTING TRAINING + RACING EXPERIENCE
        </p>

        {/* ── Hero Banner ── */}
        <div className="academy-banner relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-16 sm:mb-20">
          <Image
            src="/assets/delhi-ncr-banner.jpeg"
            alt="Karting Academy Delhi NCR"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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
            DELHI NCR KARTING ACADEMY
          </h2>

          <div className="max-w-3xl space-y-5 mb-10">
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              For the first time in Delhi NCR, experience a structured Karting Academy designed to give you real exposure to motorsport. This is where your motorsport journey actually begins.
            </p>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              Join our 2 Days Karting Training + Racing Experience and step onto the track, not just as a spectator, but as a driver. This program includes complete Level 1 training along with a race competition, designed for beginners as well as those serious about getting into racing.
            </p>

            <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/30 rounded-full px-4 py-1.5 mt-4">
              <span className="text-cyan text-xs font-bold tracking-widest uppercase">Who Can Join</span>
              <span className="text-white font-bold text-sm">Open for boys and girls. No prior experience required.</span>
            </div>
          </div>

          {/* ── Quick Info Cards ── */}
          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
            <div className="bg-[#111111] rounded-xl p-5 sm:p-6 border border-white/[0.08]">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Venue</p>
              <p className="font-[family-name:var(--font-bebas)] text-white text-lg sm:text-xl tracking-wide">Reveal soon</p>
            </div>
            <div className="bg-[#111111] rounded-xl p-5 sm:p-6 border border-white/[0.08]">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Duration</p>
              <p className="font-[family-name:var(--font-bebas)] text-white text-lg sm:text-xl tracking-wide">2 Days</p>
            </div>
            <div className="bg-[#111111] rounded-xl p-5 sm:p-6 border border-cyan/20">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-2">Dates</p>
              <p className="font-[family-name:var(--font-bebas)] text-cyan text-lg sm:text-xl tracking-wide">25–26 May</p>
            </div>
            <div className="bg-[#111111] rounded-xl p-5 sm:p-6 border border-cyan/20">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-3">Pricing</p>
              <p className="font-[family-name:var(--font-bebas)] text-cyan text-2xl sm:text-3xl tracking-wide">₹13,999</p>
              <p className="text-white/40 text-xs mt-2">Only <span className="text-cyan">10 seats</span> available</p>
            </div>
          </div>

          {/* ── Image Collage ── */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image src="/assets/delhi1.jpeg" alt="Delhi NCR Karting – Training session" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image src="/assets/delhi2.jpeg" alt="Delhi NCR Karting – On track action" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-6 sm:mb-8">
            <Image src="/assets/delhi3.jpeg" alt="Delhi NCR Karting – Race grid" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-16 sm:mb-20">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image src="/assets/delhi4.jpeg" alt="Delhi NCR Karting – Podium ceremony" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image src="/assets/delhi5.jpeg" alt="Delhi NCR Karting – Certificate ceremony" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          {/* ── Program Structure ── */}
          <div className="mb-16 sm:mb-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              </span>
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/70">What You'll Learn &amp; Get</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="bg-[#111111] rounded-2xl p-6 sm:p-8 border border-white/[0.08]">
                <h3 className="font-[family-name:var(--font-bebas)] text-cyan text-2xl tracking-wide mb-6">What You&apos;ll Learn</h3>
                <div className="space-y-4">
                  {[
                    "Basics of karting and racing line",
                    "Braking, cornering and control techniques",
                    "On-track driving sessions",
                    "Race simulation and competition",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="font-[family-name:var(--font-bebas)] text-white/40 text-xl w-6">{index + 1}</span>
                      <p className="text-white/70 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#111111] rounded-2xl p-6 sm:p-8 border border-white/[0.08]">
                <h3 className="font-[family-name:var(--font-bebas)] text-cyan text-2xl tracking-wide mb-6">What You Get</h3>
                <div className="space-y-4">
                  {[
                    "Level 1 Training under real racers",
                    "Real track time and racing experience",
                    "Competitive race environment",
                    "Certificate on completion",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="font-[family-name:var(--font-bebas)] text-white/40 text-xl w-6">{index + 1}</span>
                      <p className="text-white/70 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Registration Info ── */}
          <div className="mb-16 sm:mb-20 bg-[#111111] rounded-2xl p-6 sm:p-8 border border-cyan/20 max-w-2xl">
            <h3 className="font-[family-name:var(--font-bebas)] text-white text-3xl tracking-wide mb-4">Don&apos;t Miss Out</h3>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6">
              Opportunities like this don’t come often. If you’ve been waiting to try motorsport, this is your moment. Secure your seat and get on the track.
            </p>
            <div className="bg-black/30 rounded-xl p-5 border border-white/10 mb-6">
              <p className="text-cyan font-semibold text-lg mb-1">Pricing: ₹13,999 per participant</p>
              <p className="text-white/50 text-sm">Limited seats available (Only 10 participants)</p>
            </div>
            <div className="flex flex-col gap-4">
               {/* Registration open soon button style */}
              <div className="inline-flex justify-center items-center px-8 py-4 bg-cyan/20 border border-cyan/50 rounded-full text-cyan font-bold tracking-wide text-sm sm:text-base uppercase opacity-80 cursor-not-allowed">
                Registration open soon
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ═══════ STICKY REGISTER BAR ═══════ */}
      <div className="fixed bottom-0 left-0 w-full z-[60] bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none pb-4 pt-10 sm:pb-6 sm:pt-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 flex items-center justify-between gap-3 pointer-events-auto">
          <div className="hidden sm:flex flex-col">
            <span className="font-[family-name:var(--font-bebas)] text-white text-lg tracking-wide">DELHI NCR ACADEMY</span>
            <span className="text-white/40 text-xs">Fee <span className="text-cyan font-semibold">₹13,999</span> · 25-26 May</span>
          </div>
          <div className="w-full sm:w-auto bg-cyan/20 border border-cyan/50 text-cyan font-bold text-xs sm:text-sm md:text-base tracking-wide px-4 py-3 sm:px-8 sm:py-4 rounded-full flex items-center justify-center opacity-80 cursor-not-allowed">
            <span>Registration open soon</span>
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
