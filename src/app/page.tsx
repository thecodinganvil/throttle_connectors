import Navbar from "@/components/navbar/Navbar";
import HeroSection from "@/components/hero_section/HeroSection";
import AboutUsSection from "@/components/sections/aboutus/AboutUsSection";
import AcademyProgramsSection from "@/components/sections/academy/AcademyProgramsSection";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Footer from "@/components/sections/footer/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutUsSection />
      <AcademyProgramsSection />
      <TestimonialsCarousel />
      <Footer />
    </div>
  );
}
