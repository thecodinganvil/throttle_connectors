"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import gsap from "gsap";
import SocialIcons from "../shared/SocialIcons";

const NAV_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Academy", href: "/academy" },
  { label: "Previous Academies", href: "/academy/previous_academies", accent: true },
];

export default function Navbar() {
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
        },
      );

      // Animate divider
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.5,
          delay: 0.4,
          ease: "power2.out",
        },
      );

      // Animate socials
      gsap.fromTo(
        socialsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.5, ease: "power3.out" },
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

  return (
    <>
      {/* ═══════ FULL-SCREEN MENU OVERLAY ═══════ */}
      <div
        ref={overlayRef}
        className={`menu-overlay ${menuOpen ? "open" : ""}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
          {/* Left Column: Links */}
          <div className="flex flex-col justify-center px-10 md:px-20 py-20">
            <nav className="flex flex-col gap-4 sm:gap-6">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  ref={(el) => {
                    linkRefs.current[i] = el;
                  }}
                  href={link.href}
                  className={`menu-link-large ${
                    link.accent ? "!text-cyan/70 hover:!text-cyan" : ""
                  }`}
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
          <div className="hidden md:flex items-center justify-center relative h-full w-full p-16 lg:p-24 xl:p-32">
            <Image
              src="/assets/throttle.png"
              alt="Throttle Connectors logo"
              width={320}
              height={320}
              className="h-[200px] w-[200px] lg:h-[240px] lg:w-[240px] xl:h-[280px] xl:w-[280px] object-contain"
            />
          </div>
        </div>
      </div>

      {/* ═══════ FIXED HEADER ═══════ */}
      <header
        className={`fixed top-0 left-0 w-full z-[80] transition-all duration-500 px-5 py-2 sm:px-8 sm:py-3 md:px-12 md:py-3 ${
          scrolled && !menuOpen
            ? "bg-black/60 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Image
                src="/assets/throttle.png"
                alt="Throttle Connectors logo"
                width={130}
                height={130}
                priority
                className="h-[80px] w-[80px] object-contain sm:h-[95px] sm:w-[95px] md:h-[120px] md:w-[120px] transition-all duration-500"
              />
            </Link>
          </div>

          {/* Centered nav pills (Hidden when menu is open) */}
          <nav
            className={`hidden items-center gap-3 md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
              menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <a href="#about" className="nav-pill">
              About Us
            </a>
            <Link href="/academy" className="nav-pill">
              Academy
            </Link>
            <Link href="/academy/previous_academies" className="nav-pill" style={{borderColor: "rgba(89,224,247,0.35)", color: "rgba(89,224,247,0.85)"}}>
              Previous Academies
            </Link>
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
    </>
  );
}
