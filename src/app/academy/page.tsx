"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

/* ── Academy program data ── */
const PROGRAMS = [
  {
    city: "BANGALORE",
    slug: "bangalore",
    title: "KARTING & FORMULA CAR ACADEMY",
    status: "3-Day Program",
    location: "Red Riders Go Karting, Bangalore",
    image: "/assets/bangalore.jpeg",
  },
  {
    city: "HYDERABAD",
    slug: "hyderabad",
    title: "KARTING ACADEMY",
    status: "30–31 March",
    location: "Tspeedway, Hyderabad",
    image: "/assets/hyderabad.jpeg",
  },
  {
    city: "COIMBATORE",
    slug: "coimbatore",
    title: "FORMULA CAR ACADEMY",
    status: "Now Open",
    location: "Kari Motor Speedway, Coimbatore",
    image: "/assets/coimbatore.jpeg",
  },
  {
    city: "AHMEDABAD",
    slug: "ahmedabad",
    title: "KARTING ACADEMY",
    status: "Launching Soon",
    location: "Venue TBA",
    image: "/assets/ahmedabad.jpeg",
  },
];

/* ── Nav links ── */
const NAV_LINKS = [
  { label: "About Us", href: "/#about" },
  { label: "Academy", href: "/academy" },
];

export default function AcademyPage() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const dividerRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const hrRef = useRef<HTMLHRElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ── Track Scroll for Navbar ── */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Page load animations ── */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headingRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9 }
    );

    tl.fromTo(
      hrRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.7 },
      "-=0.4"
    );

    tl.fromTo(
      cardsRef.current.filter(Boolean),
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
      "-=0.3"
    );
  }, []);

  /* ── Toggle menu ── */
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  /* ── Lock body scroll & animate overlay ── */
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");

      gsap.fromTo(
        linkRefs.current.filter(Boolean),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.15,
        }
      );

      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.5, delay: 0.4, ease: "power2.out" }
      );

      gsap.fromTo(
        socialsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.5, ease: "power3.out" }
      );
    } else {
      document.body.classList.remove("menu-open");

      gsap.set(linkRefs.current.filter(Boolean), { y: 60, opacity: 0 });
      gsap.set(dividerRef.current, { scaleX: 0, opacity: 0 });
      gsap.set(socialsRef.current, { y: 30, opacity: 0 });
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  /* ── Social icon SVGs ── */
  const SocialIcons = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center gap-4 sm:gap-5 ${className}`}>
      <a href="#" aria-label="Twitter / X" className="social-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" />
        </svg>
      </a>
      <a href="mailto:throttleconnectors@gmail.com" aria-label="Email" className="social-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </a>
      <a href="#" aria-label="Facebook" className="social-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      </a>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* ═══════ FULL-SCREEN MENU OVERLAY ═══════ */}
      <div
        ref={overlayRef}
        className={`menu-overlay ${menuOpen ? "open" : ""}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
          <div className="flex flex-col justify-center px-10 md:px-20 py-20">
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  ref={(el) => { linkRefs.current[i] = el; }}
                  href={link.href}
                  className="menu-link-large"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div ref={dividerRef} className="menu-divider-large opacity-20" />

            <div ref={socialsRef} className="menu-socials">
              <SocialIcons />
            </div>
          </div>

          <div className="hidden md:block relative h-full w-full overflow-hidden p-24 lg:p-32 xl:p-48">
            <div className="w-full h-full relative rounded-2xl overflow-hidden group/menu-img">
              <Image
                src="/assets/academy_page1.jpeg"
                alt="Racing"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover/menu-img:scale-100"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ FIXED HEADER ═══════ */}
      <header
        className={`fixed top-0 left-0 w-full z-[80] transition-all duration-500 px-5 py-2 sm:px-8 sm:py-3 md:px-12 md:py-3 ${
          scrolled && !menuOpen ? "bg-black/60 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/assets/throttle.png"
                alt="Throttle Connectors logo"
                width={100}
                height={100}
                priority
                className="h-[65px] w-[65px] object-contain sm:h-[80px] sm:w-[80px] md:h-[100px] md:w-[100px] transition-all duration-500"
              />
            </Link>
          </div>

          {/* Centered nav pills */}
          <nav className={`hidden items-center gap-4 md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
            menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}>
            <Link href="/#about" className="nav-pill">About Us</Link>
            <Link href="/academy" className="nav-pill nav-pill-active">Academy</Link>
          </nav>

          {/* Hamburger */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={`hamburger-btn z-[70] flex items-center gap-3 ${menuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            {menuOpen && (
              <span className="text-white text-sm font-medium tracking-widest uppercase opacity-80">
                Close
              </span>
            )}
            <div className="flex flex-col items-end gap-[7px]">
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </div>
          </button>
        </div>
      </header>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <main className="pt-28 sm:pt-36 md:pt-40 pb-20 sm:pb-28 md:pb-36 px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        {/* ── HEADING ── */}
        <h1
          ref={headingRef}
          className="font-[family-name:var(--font-bebas)] text-cyan text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight mb-8 sm:mb-12"
        >
          ACADEMY<br />PROGRAMS
        </h1>

        {/* ── Divider ── */}
        <hr
          ref={hrRef}
          className="border-0 h-[1px] bg-white/15 mb-10 sm:mb-16 md:mb-20"
        />

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {PROGRAMS.map((program, idx) => (
            <div
              key={program.slug}
              ref={(el) => { cardsRef.current[idx] = el; }}
            >
              <Link href={`/academy/${program.slug}`} className="block">
                <article className="w-full group bg-[#0e0e0e] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.8)] hover:border-cyan/30 transition-all duration-500">
                  {/* Banner Image */}
                  <div className="relative w-full aspect-[16/9] bg-[#1a1a1a] overflow-hidden">
                    <Image
                      src={program.image}
                      alt={`${program.city} Academy`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  {/* Content Section */}
                  <div className="p-3 sm:p-4 bg-[#0e0e0e]">
                    <div className="flex items-center justify-between p-5 sm:p-6 bg-[#222222] rounded-[1.5rem] group-hover:bg-cyan transition-colors duration-500">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-[family-name:var(--font-bebas)] text-cyan group-hover:text-black text-xl sm:text-2xl md:text-3xl tracking-wide transition-colors duration-500">
                          {program.city} ACADEMY
                        </h3>
                        <p className="font-[family-name:var(--font-bebas)] text-cyan/50 group-hover:text-black/50 text-base sm:text-lg md:text-xl tracking-wide flex items-center gap-1.5 transition-colors duration-500">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {program.location}
                        </p>
                        <p className="text-white/30 group-hover:text-black/30 text-xs mt-0.5 transition-colors duration-500">
                          {program.status}
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#333333] group-hover:bg-black flex items-center justify-center transition-all duration-500">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-cyan transition-colors duration-500">
                          <path d="M5 12h14m-7-7 7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="relative w-full bg-black px-4 sm:px-8 md:px-16 lg:px-24 pt-14 sm:pt-20 md:pt-28 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 sm:gap-16 lg:gap-24 mb-12 sm:mb-20">
          {/* Left: Logo */}
          <div className="flex flex-col gap-4 justify-center">
            <Image src="/assets/throttle.png" alt="Throttle Connectors" width={120} height={120} className="h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px] object-contain" />
          </div>

          {/* Right: Three columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
            {/* Navigation */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                </span>
                <span className="text-white/60 text-sm tracking-wider">Navigation</span>
              </div>
              <div className="flex flex-col gap-3 mt-2">
                <Link href="/#about" className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">About Us</Link>
                <Link href="/academy" className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">Academy</Link>
              </div>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                </span>
                <span className="text-white/60 text-sm tracking-wider">Socials</span>
              </div>
              <div className="flex flex-col gap-3 mt-2">
                <a href="#" className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">X. Twitter</a>
                <a href="#" className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">Instagram</a>
                <a href="#" className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">LinkedIn</a>
              </div>
            </div>

            {/* Get in touch */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                </span>
                <span className="text-white/60 text-sm tracking-wider">Get in touch</span>
              </div>
              <div className="flex flex-col gap-3 mt-2">
                <span className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase">+91 8467042523</span>
                <span className="font-[family-name:var(--font-bebas)] text-white text-sm sm:text-base md:text-lg tracking-wide uppercase break-all">throttleconnectors@gmail.com</span>
                <span className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase">Uttar Pradesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/40 text-sm tracking-wide">
            ©2026 Copyright All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
