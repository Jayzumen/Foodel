import MealDisplay from "./MealDisplay";
import Footer from "../components/Footer";
import HeroSection from "./HeroSection";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col gap-4 text-center">
      <HeroSection />

      <MealDisplay />
      <Footer />
    </div>
  );
}
