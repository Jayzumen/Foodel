import Link from "next/link";
import React from "react";
import AuthButtons from "./AuthButtons";

const Navbar = () => {
  return (
    <nav className="flex h-20 items-center justify-between px-6 py-2 shadow-md shadow-slate-800">
      <Link
        aria-label="Link to Homepage"
        className="text-xl hover:underline"
        href={"/"}
      >
        Foodel
      </Link>
      <div className="flex items-center gap-8 text-xl md:gap-6">
        <Link
          aria-label="Link to meals page"
          className="hover:underline"
          href={"/meals"}
        >
          Meals
        </Link>
        <AuthButtons />
      </div>
    </nav>
  );
};

export default Navbar;
