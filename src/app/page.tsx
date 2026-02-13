"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Menu link data ── */
const NAV_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Academy", href: "#academy" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const connectorsRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const dividerRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);

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

  /* ── Hero scroll animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(connectorsRef.current, {
        opacity: 0,
        y: 140,
        scale: 0.88,
        filter: "blur(10px)",
      });

      // ScrollTrigger-driven timeline pinned to the hero
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=150%", // pins for 150vh of scroll
          pin: sectionRef.current,
          scrub: 1.8, // smooth scrubbing — higher = more buttery
          anticipatePin: 1,
        },
      });

      // Small dead space — nothing happens for the first 15% of scroll
      tl.to({}, { duration: 0.15 });

      // CONNECTORS slides up, fades in, un-blurs, and scales up
      tl.to(
        connectorsRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power3.out",
        }
      );

      // Hold fully visible for a beat
      tl.to({}, { duration: 0.15 });
    });

    return () => ctx.revert();
  }, []);

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
    <div ref={wrapperRef}>
      {/* ═══════ FIXED HAMBURGER BUTTON (always on top) ═══════ */}
      <button
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        className={`hamburger-btn fixed top-4 right-4 sm:top-6 sm:right-8 md:top-8 md:right-12 z-[60] ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>

      {/* ═══════ FULL-SCREEN MENU OVERLAY ═══════ */}
      <div
        ref={overlayRef}
        className={`menu-overlay ${menuOpen ? "open" : ""}`}
      >
        <nav className="flex flex-col gap-2">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              ref={(el) => { linkRefs.current[i] = el; }}
              href={link.href}
              className="menu-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div ref={dividerRef} className="menu-divider origin-left" />

        <div ref={socialsRef} className="menu-socials">
          <SocialIcons />
        </div>
      </div>

      {/* ═══════ HERO SECTION ═══════ */}
      <section
        ref={sectionRef}
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

        {/* ── Header / Navigation ── */}
        <header className="relative z-10 flex w-full items-center px-5 py-4 sm:px-8 sm:py-6 md:px-12 md:py-8">
          <div className="flex-shrink-0">
            <Image
              src="/assets/throttle.png"
              alt="Throttle Connectors logo"
              width={110}
              height={110}
              priority
              className="h-[70px] w-[70px] object-contain sm:h-[90px] sm:w-[90px] md:h-[110px] md:w-[110px]"
            />
          </div>

          {/* Centered nav pills */}
          <nav className="hidden items-center gap-4 md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <a href="#about" className="nav-pill">About Us</a>
            <a href="#academy" className="nav-pill">Academy</a>
            <a href="#contact" className="nav-pill">Contact</a>
          </nav>
        </header>

        {/* ── Hero Centre ── */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 sm:px-6">
          <h1 className="throttle-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
            THROTTLE
          </h1>
          <span
            ref={connectorsRef}
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
        {/* Heading Row: Label + Large Text */}
        <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-20 mb-56 md:mb-72">
          {/* Section label (Left) */}
          <div className="flex items-center gap-3 flex-shrink-0 md:pt-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
            </span>
            <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/70">
              About Us
            </span>
          </div>

          {/* Large heading (Right) */}
          <h2 className="about-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl">
            Your Complete Pathway to Professional Motorsport
          </h2>
        </div>

        {/* Content grid: photo left + text right */}
        <div className="grid grid-cols-1 md:grid-cols-[35%_1fr] gap-10 md:gap-12 lg:gap-20 items-start">
          {/* Left — photo placeholder */}
          <div className="relative w-full aspect-[4/5] overflow-hidden">
            <div className="absolute inset-0 bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
              <span className="text-white/20 text-sm tracking-widest uppercase">Photo</span>
            </div>
          </div>

          {/* Right — text + small photo */}
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

            {/* CTA + small photo row */}
            <div className="flex items-end justify-between gap-6 mt-6">
              {/* CTA button */}
              {/* CTA button */}
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

              {/* Small photo placeholder */}
              <div className="relative w-32 h-24 sm:w-40 sm:h-28 md:w-44 md:h-32 overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                  <span className="text-white/20 text-xs tracking-widest uppercase">Photo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
