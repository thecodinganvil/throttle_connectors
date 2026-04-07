"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full bg-black px-4 sm:px-8 md:px-16 lg:px-24 pt-14 sm:pt-20 md:pt-28 pb-8 sm:pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 sm:gap-16 lg:gap-24 mb-12 sm:mb-20">
        {/* Left: Logo */}
        <div className="flex flex-col gap-4 justify-center">
          <Image
            src="/assets/throttle.png"
            alt="Throttle Connectors"
            width={120}
            height={120}
            className="h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px] object-contain"
          />
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
              <span className="text-white/60 text-sm tracking-wider">
                Navigation
              </span>
            </div>
            <div className="flex flex-col gap-3 mt-2">
              <a
                href="#about"
                className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity"
              >
                About Us
              </a>
              <Link
                href="/academy"
                className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity"
              >
                Academy
              </Link>
              <Link
                href="/academy/previous_academies"
                className="font-[family-name:var(--font-bebas)] text-cyan text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity"
              >
                Previous Academies
              </Link>
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              </span>
              <span className="text-white/60 text-sm tracking-wider">
                Socials
              </span>
            </div>
            <div className="flex flex-col gap-3 mt-2">
              <a
                href="https://www.instagram.com/throttleconnectors?igsh=c3N4NDc4aHZmYWlr"
                className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/krishna-prajapati-a3aa5a315?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity"
              >
                LinkedIn
              </a>
              <a
                href="https://www.facebook.com/share/1FvF4bWYsy/"
                className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Get in touch */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              </span>
              <span className="text-white/60 text-sm tracking-wider">
                Get in touch
              </span>
            </div>
            <div className="flex flex-col gap-3 mt-2">
              <a
                href="tel:+918467042523"
                className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase hover:opacity-50 transition-opacity"
              >
                +91 8467042523
              </a>
              <a
                href="mailto:throttleconnectors@gmail.com"
                className="font-[family-name:var(--font-bebas)] text-white text-sm sm:text-base md:text-lg tracking-wide uppercase break-all hover:opacity-50 transition-opacity"
              >
                throttleconnectors@gmail.com
              </a>
              <span className="font-[family-name:var(--font-bebas)] text-white text-base sm:text-lg tracking-wide uppercase">
                Office - Kanpur, Uttar Pradesh
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-white/10 pt-8 pb-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-[family-name:var(--font-bebas)] text-white/40 text-base sm:text-lg tracking-wider">
          Developed & Designed by <span className="text-cyan">Osman</span> and{" "}
          <span className="text-cyan">Arbaaz</span>
        </p>
        <p className="font-[family-name:var(--font-bebas)] text-white/30 text-base sm:text-lg tracking-wider">
          ©2026 Copyright All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
