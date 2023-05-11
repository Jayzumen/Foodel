import MealDisplay from "./MealDisplay";
import HeroSection from "./HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 text-center">
      <HeroSection />

      <MealDisplay />
    </div>
  );
}
