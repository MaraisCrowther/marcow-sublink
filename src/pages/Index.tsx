import { Header } from "@/components/Layout/Header";
import { HeroSection } from "@/components/Hero/HeroSection";
import { FeaturesSection } from "@/components/Features/FeaturesSection";
import { PricingSection } from "@/components/Pricing/PricingSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
      </main>
    </div>
  );
};

export default Index;
