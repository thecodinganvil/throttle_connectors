"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import TestimonialsCarousel from "../components/TestimonialsCarousel";

/* ── Menu link data ── */
const NAV_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Academy", href: "/academy" },
];

export default function Home() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const dividerRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

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

  /* ── Toggle menu ── */
  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  /* ── Lock body scroll & animate overlay ── */
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");

      // Animate links in
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

      // Animate divider
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.5, delay: 0.4, ease: "power2.out" }
      );

      // Animate socials
      gsap.fromTo(
        socialsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.5, ease: "power3.out" }
      );
    } else {
      document.body.classList.remove("menu-open");

      // Reset animations for next open
      gsap.set(linkRefs.current.filter(Boolean), { y: 60, opacity: 0 });
      gsap.set(dividerRef.current, { scaleX: 0, opacity: 0 });
      gsap.set(socialsRef.current, { y: 30, opacity: 0 });
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);



  /* ── Social icon SVGs (shared between footer & menu) ── */
  const SocialIcons = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center gap-4 sm:gap-5 ${className}`}>
      <a href="#" aria-label="Twitter / X" className="social-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
          <path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" />
        </svg>
      </a>
      <a href="mailto:hello@throttle.com" aria-label="Email" className="social-icon">
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
    <div>
      {/* ═══════ FULL-SCREEN MENU OVERLAY ═══════ */}
      <div
        ref={overlayRef}
        className={`menu-overlay ${menuOpen ? "open" : ""}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
          {/* Left Column: Links */}
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

          {/* Right Column: Image (Desktop Only) */}
          <div className="hidden md:block relative h-full w-full overflow-hidden p-24 lg:p-32 xl:p-48">
            <div className="w-full h-full relative rounded-2xl overflow-hidden group/menu-img">
              <Image 
                src="/assets/racing-team.jpg" 
                alt="Racing team" 
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
            <Image
              src="/assets/throttle.png"
              alt="Throttle Connectors logo"
              width={100}
              height={100}
              priority
              className="h-[65px] w-[65px] object-contain sm:h-[80px] sm:w-[80px] md:h-[100px] md:w-[100px] transition-all duration-500"
            />
          </div>

          {/* Centered nav pills (Hidden when menu is open) */}
          <nav className={`hidden items-center gap-4 md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
            menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}>
            <a href="#about" className="nav-pill">About Us</a>
            <Link href="/academy" className="nav-pill">Academy</Link>
          </nav>

          {/* Hamburger Button (Aligned with nav) */}
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

      {/* ═══════ HERO SECTION ═══════ */}
      <section
        className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0a0a0a]"
      >
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
          <h1 className="throttle-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
            THROTTLE
          </h1>
          <span
            className="connectors-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
          >
            CONNECTORS
          </span>
        </div>

        {/* ── Bottom Bar ── */}
        <footer className="relative z-10 flex w-full items-center justify-center px-5 pb-6 sm:px-8 sm:pb-8 md:px-12 md:pb-10">
          <SocialIcons />
        </footer>
      </section>

      {/* ═══════ ABOUT US SECTION ═══════ */}
      <section id="about" className="relative w-full bg-[#0a0a0a] px-5 py-20 sm:px-8 md:px-12 lg:px-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-start gap-8 sm:gap-12 md:gap-20 mb-20 sm:mb-36 md:mb-56 lg:mb-72">
          <div className="flex items-center gap-3 flex-shrink-0 md:pt-4">
            <span className="flex items-center gap-1.5">
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

        <div className="grid grid-cols-1 md:grid-cols-[35%_1fr] gap-10 md:gap-12 lg:gap-20 items-start">
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl group">
            <div className="absolute inset-0 bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
              <Image 
                src="/assets/academy_page2.jpeg" 
                alt="Throttle Connectors Academy Students" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          </div>

          <div className="flex flex-col justify-center md:pt-16 lg:pt-24 gap-6">
            <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-md">
              Throttle Connectors is a motorsport company built to turn
              racing dreams into reality. Our mission is simple: to make
              motorsport affordable and accessible for everyone who has
              the passion to race.
            </p>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-md">
              From academy programs to driver management and
              sponsorship support, we help racers grow step by step and
              reach the next level in their motorsport journey. We don&apos;t just
              train drivers. We build careers. Throttle Connectors is
              here to support your racing dream.
            </p>

            <div className="flex items-end justify-between gap-6 mt-6">
              <a href="#contact" className="cta-button group flex-shrink-0">
                <span className="text-sm sm:text-base font-medium tracking-wide z-10">
                  Let&apos;s Get Started
                </span>
                <span className="cta-icon-wrapper">
                  <svg className="cta-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </a>

              <div className="relative w-56 h-36 sm:w-80 sm:h-52 md:w-[400px] md:h-[250px] overflow-hidden flex-shrink-0 rounded-2xl border border-white/10 group shadow-2xl shadow-black/50">
                <Image 
                  src="/assets/bangalore_page5.jpeg" 
                  alt="Racing Action" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ ACADEMY PROGRAMS SECTION ═══════ */}
      <section id="academy" className="relative w-full bg-[#0a0a0a] px-4 py-16 sm:px-8 sm:py-24 md:px-12 md:py-40 flex flex-col items-center justify-center">
        <h2 className="font-[family-name:var(--font-bebas)] text-cyan text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-none tracking-tight text-left w-full max-w-6xl mb-12 sm:mb-20 md:mb-32">
          <div>OUR</div>
          <div>UPCOMING</div>
          <div>ACADEMY</div>
          <div>PROGRAMS</div>
          <div>AROUND</div>
          <div>INDIA</div>
        </h2>

        {/* Academy Cards Grid - 2x2 */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {[
            { city: "BANGALORE", slug: "bangalore", title: "KARTING & FORMULA CAR ACADEMY", status: "3-Day Program", location: "Red Riders Go Karting, Bangalore", image: "/assets/bangalore.jpeg" },
            { city: "HYDERABAD", slug: "hyderabad", title: "KARTING ACADEMY", status: "30–31 March", location: "Tspeedway, Hyderabad", image: "/assets/hyderabad.jpeg" },
            { city: "COIMBATORE", slug: "coimbatore", title: "FORMULA CAR ACADEMY", status: "Now Open", location: "Kari Motor Speedway, Coimbatore", image: "/assets/coimbatore.jpeg" },
            { city: "AHMEDABAD", slug: "ahmedabad", title: "KARTING ACADEMY", status: "Launching Soon", location: "Venue TBA", image: "/assets/ahmedabad.jpeg" }
          ].map((program, idx) => (
            <div
              key={idx}
              className="w-full"
            >
              <Link href={`/academy/${program.slug}`}>
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
      </section>

      {/* ═══════ TESTIMONIALS — HORIZONTAL SWIPE CAROUSEL ═══════ */}
      <TestimonialsCarousel />

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
                <a href="#about" className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">About Us</a>
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
