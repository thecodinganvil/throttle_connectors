"use client";

import { useRef, useState, useCallback } from "react";

const TESTIMONIALS = [
  {
    num: "01",
    quote:
      "Throttle Connectors have been investing hugely in bringing more drivers into motorsport through affordable programs. Spreading awareness about the pathways to success in motorsport along with training newer generations of drivers through more scientific and data driven methods. As a coach, I am very happy with the progress we have seen in our students and the platform at which we are able to bring them up to.",
    name: "Mr Vineet Mane",
    role: "Coach & Driver partner of Throttle Connectors",
    initials: "VM",
  },
  {
    num: "02",
    quote:
      "The academy program significantly improved my driving style, especially my cornering technique and racing lines. I learned many valuable skills that I will continue to apply in my racing journey.",
    name: "Sadatul",
    role: "Participant, Bangalore Academy",
    initials: "S",
  },
  {
    num: "03",
    quote:
      "This is the best opportunity I've ever got. Crazy people, best coach I've ever had, learned a lot.",
    name: "Vikram",
    role: "Participant of Bangalore Academy",
    initials: "V",
  },
  {
    num: "04",
    quote:
      "I have been part of other training programs that were bigger organizations compared to this one, but they were unable to provide a structured schedule like this academy.",
    name: "Pranav",
    role: "Participant, Bangalore Karting Academy",
    initials: "P",
  },
  {
    num: "05",
    quote:
      "It was amazing training. The amount of knowledge we gained in these two days was incredible. It was a very good event with a fantastic coach.",
    name: "Avishek",
    role: "Participant of Bangalore Academy",
    initials: "A",
  },
  {
    num: "06",
    quote:
      "I'm very happy with the affordability of the program and the effort put into teaching more about pathways to a motorsport career, rather than focusing only on lap times or performance.",
    name: "Madhavkrishna B",
    role: "Participant of Bangalore Karting Academy",
    initials: "MB",
  },
];

/* Duplicate for seamless loop in vertical marquee */
const DOUBLE_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS];
const REVERSE_TESTIMONIALS = [...TESTIMONIALS].reverse();
const DOUBLE_REVERSE = [...REVERSE_TESTIMONIALS, ...REVERSE_TESTIMONIALS];

/* ── Shared Card Component ── */
function TestimonialCard({
  t,
  idx,
  size = "normal",
}: {
  t: (typeof TESTIMONIALS)[0];
  idx: number;
  size?: "normal" | "compact";
}) {
  const isCompact = size === "compact";
  return (
    <div
      className={`relative w-full rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-sm flex flex-col group hover:bg-white/[0.07] transition-all duration-500 select-none ${
        isCompact
          ? "p-5 sm:p-6 md:p-8 gap-5 sm:gap-6"
          : "p-5 sm:p-8 md:p-10 gap-5 sm:gap-6 justify-between min-h-[320px] sm:min-h-[380px] md:min-h-[440px]"
      }`}
    >
      {/* Decorative large quote */}
      <div
        className={`absolute top-4 right-6 font-[family-name:var(--font-bebas)] text-white/[0.04] leading-none select-none pointer-events-none ${
          isCompact ? "text-[8rem]" : "text-[10rem]"
        }`}
      >
        &ldquo;
      </div>

      <div>
        {/* Number */}
        <div className="flex items-center justify-between mb-6">
          <span
            className={`font-[family-name:var(--font-bebas)] text-white/20 tracking-tighter leading-none ${
              isCompact ? "text-4xl sm:text-5xl" : "text-6xl sm:text-7xl"
            }`}
          >
            {t.num}
          </span>
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((dot) => (
              <span
                key={dot}
                className={`w-2 h-2 rounded-full ${
                  dot <= idx % 4 ? "bg-cyan" : "bg-white/15"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quote */}
        <p
          className={`text-white/80 leading-relaxed font-light ${
            isCompact
              ? "text-base sm:text-lg"
              : "text-lg sm:text-xl md:text-2xl"
          }`}
        >
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>

      {/* Bottom section */}
      <div>
        <div
          className={`w-full h-[1px] bg-white/10 ${isCompact ? "my-0 mb-6" : "my-8"}`}
        />
        <div className="flex items-center gap-4">
          <div
            className={`rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 ${
              isCompact ? "w-10 h-10" : "w-12 h-12"
            }`}
          >
            <span
              className={`text-white font-bold tracking-wide ${
                isCompact ? "text-xs" : "text-sm"
              }`}
            >
              {t.initials}
            </span>
          </div>
          <div className="flex flex-col">
            <span
              className={`font-[family-name:var(--font-bebas)] text-white tracking-wide uppercase ${
                isCompact ? "text-lg" : "text-xl"
              }`}
            >
              {t.name}
            </span>
            <span
              className={`text-white/40 tracking-wider uppercase ${
                isCompact ? "text-xs" : "text-sm"
              }`}
            >
              {t.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  const totalCards = TESTIMONIALS.length;

  /* ── Update active dot based on scroll position ── */
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.children[0]?.clientWidth ?? 0;
    const gap = 24;
    const index = Math.round(track.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, totalCards - 1));
  }, [totalCards]);

  /* ── Scroll to a specific card ── */
  const scrollToCard = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.children[0]?.clientWidth ?? 0;
    const gap = 24;
    track.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    });
  }, []);

  /* ── Navigate left / right ── */
  const goNext = useCallback(() => {
    const next = activeIndex < totalCards - 1 ? activeIndex + 1 : 0;
    scrollToCard(next);
  }, [activeIndex, totalCards, scrollToCard]);

  const goPrev = useCallback(() => {
    const prev = activeIndex > 0 ? activeIndex - 1 : totalCards - 1;
    scrollToCard(prev);
  }, [activeIndex, totalCards, scrollToCard]);

  /* ── Mouse drag support (mobile swipe) ── */
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    scrollStartX.current = trackRef.current?.scrollLeft ?? 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const diff = e.clientX - dragStartX.current;
    if (trackRef.current) {
      trackRef.current.scrollLeft = scrollStartX.current - diff;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#0a0a0a] py-16 sm:py-24 md:py-40 overflow-hidden"
    >
      {/* Section heading */}
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 max-w-7xl mx-auto mb-8 sm:mb-12 md:mb-20">
        <div className="flex items-center gap-3 mb-8">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
          </span>
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/70">
            Testimonials
          </span>
        </div>
        <h2 className="font-[family-name:var(--font-bebas)] text-cyan text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight uppercase max-w-4xl">
          What Our Racers Say About Us
        </h2>
      </div>

      {/* ═══ MOBILE: Horizontal Swipe Carousel ═══ */}
      <div className="md:hidden">
        <div className="relative">
          {/* Side fades */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

          <div
            ref={trackRef}
            className="testimonial-track flex gap-4 sm:gap-6 overflow-x-auto px-4 sm:px-8 pb-4 cursor-grab active:cursor-grabbing select-none"
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="testimonial-card flex-shrink-0 w-[82vw] sm:w-[75vw]"
              >
                <TestimonialCard t={t} idx={idx} size="normal" />
              </div>
            ))}
            {/* End spacer */}
            <div className="flex-shrink-0 w-4" aria-hidden="true" />
          </div>
        </div>

        {/* Mobile navigation: arrows + dots */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 px-4 sm:px-5">
          <button
            onClick={goPrev}
            aria-label="Previous review"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 active:text-white active:border-white/50 transition-all"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5m7-7-7 7 7 7" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToCard(idx)}
                aria-label={`Go to review ${idx + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "w-8 h-2.5 bg-cyan"
                    : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="Next review"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 active:text-white active:border-white/50 transition-all"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* ═══ DESKTOP: Vertical Marquee Animation (two columns) ═══ */}
      <div className="hidden md:block px-5 sm:px-8 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-8">
          {/* Left column - scrolls up */}
          <div className="relative h-[700px] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="testimonial-marquee-up flex flex-col gap-6">
              {DOUBLE_TESTIMONIALS.map((t, idx) => (
                <TestimonialCard key={idx} t={t} idx={idx} size="compact" />
              ))}
            </div>
          </div>

          {/* Right column - scrolls down */}
          <div className="relative h-[700px] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="testimonial-marquee-down flex flex-col gap-6">
              {DOUBLE_REVERSE.map((t, idx) => (
                <TestimonialCard key={idx} t={t} idx={idx} size="compact" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA at bottom */}
      <div className="max-w-7xl mx-auto mt-16 md:mt-24 flex flex-col items-center text-center px-5">
        <span className="font-[family-name:var(--font-bebas)] text-white/10 text-[6rem] sm:text-[8rem] leading-none select-none">
          ★
        </span>
        <p className="font-[family-name:var(--font-bebas)] text-white text-3xl sm:text-4xl md:text-5xl tracking-wide uppercase mt-4">
          Join 50+ Racers
        </p>
        <p className="text-white/40 text-sm tracking-widest uppercase mt-3">
          Who Trust Throttle Connectors
        </p>
      </div>
    </section>
  );
}
