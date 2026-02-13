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
  const testimonialSectionRef = useRef<HTMLElement>(null);
  const testimonialTrackRef = useRef<HTMLDivElement>(null);

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

  /* ── Academy stacking animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".academy-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        
        gsap.to(card, {
          scale: 0.95,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: `top ${100 + (i * 40) + 40}px`,
            scrub: true,
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  /* ── Testimonial horizontal scroll ── */
  useEffect(() => {
    const section = testimonialSectionRef.current;
    const track = testimonialTrackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const totalScroll = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
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
              className="h-[55px] w-[55px] object-contain sm:h-[70px] sm:w-[70px] md:h-[85px] md:w-[85px] transition-all duration-500"
            />
          </div>

          {/* Centered nav pills (Hidden when menu is open) */}
          <nav className={`hidden items-center gap-4 md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
            menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}>
            <a href="#about" className="nav-pill">About Us</a>
            <a href="#academy" className="nav-pill">Academy</a>
            <a href="#contact" className="nav-pill">Contact</a>
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
        <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-20 mb-56 md:mb-72">
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
          <div className="relative w-full aspect-[4/5] overflow-hidden">
            <div className="absolute inset-0 bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
              <span className="text-white/20 text-sm tracking-widest uppercase">Photo</span>
            </div>
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

              <div className="relative w-32 h-24 sm:w-40 sm:h-28 md:w-44 md:h-32 overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                  <span className="text-white/20 text-xs tracking-widest uppercase">Photo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ ACADEMY PROGRAMS SECTION ═══════ */}
      <section id="academy" className="relative w-full bg-[#0a0a0a] px-5 py-24 sm:px-8 md:px-12 md:py-40 flex flex-col items-center justify-center pb-[20vh]">
        <h2 className="font-[family-name:var(--font-bebas)] text-cyan text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none tracking-tight text-left w-full max-w-6xl mb-20 md:mb-32">
          <div>OUR</div>
          <div>UPCOMING</div>
          <div>ACADEMY</div>
          <div>PROGRAMS</div>
          <div>AROUND</div>
          <div>INDIA</div>
        </h2>

        {/* Academy Cards List */}
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
          {[
            { city: "BANGALORE", title: "KARTING & FORMULA CAR", status: "Starts Soon" },
            { city: "HYDERABAD", title: "KARTING & FORMULA CAR", status: "Coming Soon" },
            { city: "AHMEDABAD", title: "KARTING & FORMULA CAR", status: "Coming Soon" },
            { city: "COIMBATORE", title: "KARTING & FORMULA CAR", status: "Coming Soon" }
          ].map((program, idx) => (
            <div
              key={idx}
              className="academy-card sticky w-full mb-8 md:mb-12"
              style={{ 
                top: `${100 + (idx * 40)}px`,
                zIndex: idx + 1
              }}
            >
              <article className="w-full group bg-[#0e0e0e] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
                {/* Banner Image */}
                <div className="relative w-full aspect-[21/7] md:aspect-[24/7] bg-[#1a1a1a] overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/placeholder-racing.jpg')] bg-cover bg-center opacity-60 grayscale-[20%]" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center select-none">
                    <div className="font-[family-name:var(--font-bebas)] italic tracking-tight scale-90 sm:scale-100">
                      <div className="text-[#f1b42f] text-3xl sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">
                        {program.city} BE READY FOR
                      </div>
                      <div className="relative mt-2 items-center justify-center inline-flex">
                        <div className="absolute inset-0 bg-black/90 -skew-x-12 translate-y-1" />
                        <div className="relative text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl px-8 py-2 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
                          {program.title}
                        </div>
                      </div>
                      <div className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-1 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
                        ACADEMY
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-3 sm:p-4 md:p-5 bg-[#0e0e0e]">
                  <div className="flex items-center justify-between p-6 sm:p-7 md:p-8 bg-[#222222] rounded-[1.5rem] group-hover:bg-cyan transition-colors duration-500">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-[family-name:var(--font-bebas)] text-cyan group-hover:text-black text-2xl sm:text-3xl md:text-4xl tracking-wide transition-colors duration-500">
                        {program.city} ACADEMY
                      </h3>
                      <p className="text-white/40 group-hover:text-black/40 text-base transition-colors duration-500">{program.status}</p>
                    </div>
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#333333] group-hover:bg-black flex items-center justify-center transition-all duration-500">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-cyan transition-colors duration-500">
                        <path d="M5 12h14m-7-7 7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ TESTIMONIALS — HORIZONTAL SCROLL ═══════ */}
      <section
        ref={testimonialSectionRef}
        id="testimonials"
        className="relative w-full bg-[#0a0a0a] overflow-hidden"
      >
        <div
          ref={testimonialTrackRef}
          className="flex items-center gap-0 h-screen will-change-transform"
          style={{ width: "fit-content" }}
        >
          {/* ── First panel: Section heading ── */}
          <div className="flex-shrink-0 w-screen h-screen flex flex-col justify-center px-8 sm:px-12 md:px-20 lg:px-28">
            <div className="flex items-center gap-3 mb-8">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              </span>
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/70">
                Testimonials
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-bebas)] text-cyan text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.95] tracking-tight uppercase max-w-4xl">
              What Our<br />Racers<br />Say About Us
            </h2>
            <div className="mt-10 flex items-center gap-3">
              <div className="w-16 h-[1px] bg-cyan/40" />
              <span className="text-white/40 text-sm tracking-widest uppercase">Scroll →</span>
            </div>
          </div>

          {/* ── Testimonial cards ── */}
          {[
            {
              num: "01",
              quote: "Throttle Connectors gave me the platform I had been dreaming of. The coaching is world-class and the team genuinely cares about every racer's growth.",
              name: "Christopher L. Morgan",
              role: "Formula Racer",
              initials: "CM",
            },
            {
              num: "02",
              quote: "From my very first session, I knew this was different. The structured programs and mentorship helped me shave seconds off my lap times within weeks.",
              name: "Arjun Patel",
              role: "Karting Champion",
              initials: "AP",
            },
            {
              num: "03",
              quote: "The academy completely transformed my approach to racing. I went from a hobbyist to competing in national-level karting events. This is the real deal.",
              name: "Sneha Reddy",
              role: "National Competitor",
              initials: "SR",
            },
            {
              num: "04",
              quote: "What sets them apart is their holistic approach — it's not just driving fast, it's understanding the science of racing. Best investment I've ever made.",
              name: "Rohan Kapoor",
              role: "Motorsport Engineer",
              initials: "RK",
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[42vw] h-screen flex items-center px-4 sm:px-6"
            >
              <div className="relative w-full rounded-[2.5rem] border border-white/10 bg-white/[0.04] backdrop-blur-sm p-8 sm:p-10 md:p-12 flex flex-col justify-between min-h-[420px] md:min-h-[480px] group hover:scale-[1.02] hover:bg-white/[0.07] transition-all duration-500">
                {/* Decorative large quote */}
                <div className="absolute top-6 right-8 font-[family-name:var(--font-bebas)] text-white/[0.04] text-[12rem] leading-none select-none pointer-events-none">
                  &ldquo;
                </div>

                {/* Number */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-[family-name:var(--font-bebas)] text-white/20 text-6xl sm:text-7xl md:text-8xl tracking-tighter leading-none">
                    {t.num}
                  </span>
                  <div className="flex gap-1">
                    {[0,1,2,3].map(dot => (
                      <span key={dot} className={`w-2 h-2 rounded-full ${dot <= idx ? 'bg-cyan' : 'bg-white/15'}`} />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <p className="text-white/80 text-lg sm:text-xl md:text-2xl leading-relaxed font-light flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Divider */}
                <div className="w-full h-[1px] bg-white/10 my-8" />

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold tracking-wide">
                      {t.initials}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-[family-name:var(--font-bebas)] text-white text-xl tracking-wide uppercase">
                      {t.name}
                    </span>
                    <span className="text-white/40 text-sm tracking-wider uppercase">
                      {t.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* ── Last panel: CTA ── */}
          <div className="flex-shrink-0 w-[60vw] sm:w-[50vw] h-screen flex flex-col items-center justify-center px-8">
            <span className="font-[family-name:var(--font-bebas)] text-white/10 text-[10rem] sm:text-[14rem] leading-none select-none">
              ★
            </span>
            <p className="font-[family-name:var(--font-bebas)] text-white text-3xl sm:text-4xl md:text-5xl tracking-wide uppercase text-center mt-6">
              Join 50+ Racers
            </p>
            <p className="text-white/40 text-sm tracking-widest uppercase mt-3">
              Who Trust Throttle Connectors
            </p>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="relative w-full bg-black px-8 sm:px-12 md:px-16 lg:px-24 pt-20 md:pt-28 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 mb-20">
          {/* Left: Newsletter */}
          <div className="flex flex-col gap-6">
            <h3 className="font-[family-name:var(--font-bebas)] text-white text-xl sm:text-2xl tracking-wide uppercase">
              Receive Update News
            </h3>
            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your mail"
                className="bg-transparent border-b border-white/20 text-white/70 text-sm pb-3 outline-none focus:border-white/50 transition-colors placeholder:text-white/30 w-full max-w-xs"
              />
              <a href="#" className="cta-button group mt-2 self-start">
                <span className="text-sm font-medium tracking-wide z-10">
                  Subscribe
                </span>
                <span className="cta-icon-wrapper">
                  <svg className="cta-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </a>
            </div>
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
                <a href="#academy" className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">Academy</a>
                <a href="#contact" className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity">Contact</a>
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
                <span className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase">throttleconnectors@gmail.com</span>
                <span className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase">Uttar Pradesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/40 text-sm tracking-wide">
            ©2026 Throttle Connectors Copyright All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
