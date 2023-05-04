import Link from "next/link";
import React from "react";
import Menu from "./Menu";

const Navbar = () => {
  return (
    <nav className="flex h-20 items-center justify-between px-4 py-2 text-xl md:px-20 lg:text-2xl">
      <Link
        aria-label="Link to Homepage"
        className="font-bold transition-colors duration-200 hover:text-green-500 hover:underline"
        href={"/"}
      >
        Foodel
      </Link>
      <Menu />
    </nav>
  );
};

export default Navbar;
