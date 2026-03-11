"use client";

import Image from "next/image";
import Link from "next/link";

const ACADEMY_PROGRAMS = [
  {
    city: "HYDERABAD",
    slug: "hyderabad",
    title: "KARTING ACADEMY",
    status: "30–31 March",
    location: "Tspeedway, Hyderabad",
    image: "/assets/hyderabad.jpeg",
  },
  {
    city: "BANGALORE",
    slug: "bangalore",
    title: "KARTING & FORMULA CAR ACADEMY",
    status: "2 – 3 April",
    location: "Red Riders Go Karting, Bangalore",
    image: "/assets/bangalore.jpeg",
    heading: "BANGALORE ACADEMY",
  },
  {
    city: "COIMBATORE",
    slug: "coimbatore",
    title: "FORMULA CAR ACADEMY",
    status: "13–14 April",
    location: "Kari Motor Speedway, Coimbatore",
    image: "/assets/coimbatore.jpeg",
    heading: "COIMBATORE FORMULA CAR ACADEMY",
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

export default function AcademyProgramsSection() {
  return (
    <section
      id="academy"
      className="relative w-full bg-[#0a0a0a] px-4 py-16 sm:px-8 sm:py-24 md:px-12 md:py-28 lg:py-40 flex flex-col items-center justify-center"
    >
      <h2 className="font-[family-name:var(--font-bebas)] text-cyan text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl leading-none tracking-tight text-left w-full max-w-6xl mb-12 sm:mb-16 md:mb-24 lg:mb-32">
        <div>OUR</div>
        <div>UPCOMING</div>
        <div>ACADEMY</div>
        <div>PROGRAMS</div>
        <div>AROUND</div>
        <div>INDIA</div>
      </h2>

      {/* Academy Cards Grid - 2x2 */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {ACADEMY_PROGRAMS.map((program, idx) => (
          <div key={idx} className="w-full">
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
                        {program.heading ?? `${program.city} ACADEMY`}
                      </h3>
                      <p className="font-[family-name:var(--font-bebas)] text-cyan/50 group-hover:text-black/50 text-base sm:text-lg md:text-xl tracking-wide flex items-center gap-1.5 transition-colors duration-500">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="flex-shrink-0"
                        >
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
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="group-hover:stroke-cyan transition-colors duration-500"
                      >
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
  );
}
