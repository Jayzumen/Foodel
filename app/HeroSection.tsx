import React from "react";

const HeroSection = () => {
  return (
    <div
      className="relative flex min-h-[400px] flex-col items-center justify-center bg-center text-white"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <h1 className="relative z-10 text-6xl font-bold">Welcome to Foodel</h1>
      <p className="relative z-10 mx-auto px-10 text-xl italic md:max-w-[70%] lg:max-w-[50%]">
        Welcome to Foodel, your go-to destination for delicious Italian meals.
        We specialize in providing fresh, homemade dishes delivered straight to
        your doorstep.
      </p>
    </div>
  );
};

export default HeroSection;
