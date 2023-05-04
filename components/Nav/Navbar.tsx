import Link from "next/link";
import React from "react";
import AuthButtons from "./AuthButtons";
import ThemeButton from "./ThemeButton";

const Navbar = () => {
  return (
    <nav className="flex h-20 items-center justify-between px-20 py-2 shadow-md shadow-slate-800">
      <Link
        aria-label="Link to Homepage"
        className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-xl font-bold text-transparent hover:text-green-400 md:text-2xl"
        href={"/"}
      >
        Foodel
      </Link>
      <div className="flex items-center gap-8 text-xl md:gap-6">
        <Link
          aria-label="Link to meals page "
          className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-xl font-bold text-transparent hover:text-green-400 md:text-2xl"
          href={"/meals"}
        >
          Meals
        </Link>
        <AuthButtons />
        <ThemeButton />
      </div>
    </nav>
  );
};

export default Navbar;
