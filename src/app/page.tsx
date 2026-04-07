import Navbar from "@/components/navbar/Navbar";
import HeroSection from "@/components/hero_section/HeroSection";
import AboutUsSection from "@/components/sections/aboutus/AboutUsSection";
import AcademyProgramsSection from "@/components/sections/academy/AcademyProgramsSection";
import PreviousAcademiesSection from "@/components/sections/previous_academies/PreviousAcademiesSection";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Footer from "@/components/sections/footer/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutUsSection />
      <AcademyProgramsSection />
      <PreviousAcademiesSection />
      <TestimonialsCarousel />
      <Footer />
    </div>
  );
}
