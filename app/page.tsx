import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import BrandSection from "@/components/home/BrandsSection";
import AboutSection from "@/components/home/AboutSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <main className="relative">

      {/* Hero Banner - Isko highest z-index de diya taaki dropdown sabke upar khule */}
      <div className="relative z-50">
        <Hero />
      </div>

      {/* Browse By Category - Isko lower z-index de diya taaki dropdown ke peeche rahe */}
      <div className="relative z-10">
        <CategorySection />
      </div>

      {/* Browse By Brand */}
      <BrandSection />

      {/* About Infinity */}
      <AboutSection />

      {/* Why Choose Us */}
      <WhyChooseUs />

    </main>
  );
}
