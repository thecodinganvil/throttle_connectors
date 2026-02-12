"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const connectorsRef = useRef<HTMLSpanElement>(null);

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

  return (
    <div ref={wrapperRef}>
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
        <header className="relative z-10 flex w-full items-center justify-between px-8 py-6 md:px-12 md:py-8">
          <div className="flex-shrink-0">
            <Image
              src="/assets/throttle.png"
              alt="Throttle Connectors logo"
              width={110}
              height={110}
              priority
              className="h-[110px] w-[110px] object-contain"
            />
          </div>

          <nav className="hidden items-center gap-4 md:flex">
            <a href="#about" className="nav-pill">About Us</a>
            <a href="#academy" className="nav-pill">Academy</a>
            <a href="#contact" className="nav-pill">Contact</a>
          </nav>

          <button
            aria-label="Open menu"
            className="flex flex-col items-end gap-[7px] p-2 transition-opacity hover:opacity-70"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </header>

        {/* ── Hero Centre ── */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6">
          <h1 className="throttle-title text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
            THROTTLE
          </h1>
          <span
            ref={connectorsRef}
            className="connectors-text text-6xl sm:text-7xl md:text-8xl lg:text-9xl"
          >
            CONNECTORS
          </span>
        </div>

        {/* ── Bottom Bar ── */}
        <footer className="relative z-10 flex w-full items-center justify-center px-8 pb-8 md:px-12 md:pb-10">
          <div className="flex items-center gap-5">
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
        </footer>
      </section>
    </div>
  );
}
