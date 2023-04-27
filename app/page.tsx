import MealDisplay from "./MealDisplay";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col gap-4 pt-8 text-center">
      <h1 className="text-4xl font-semibold">Foodel</h1>
      <p className="mx-auto px-10 text-xl italic md:max-w-[70%] lg:max-w-[50%]">
        Welcome to Foodel, your go-to destination for delicious Italian meals.
        We specialize in providing fresh, homemade dishes delivered straight to
        your doorstep.
      </p>
      <MealDisplay />
      <Footer />
    </div>
  );
}
