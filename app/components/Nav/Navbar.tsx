import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex h-20 items-center justify-between px-6 py-2">
      <Link className="text-xl hover:underline" href={"/"}>
        Res
      </Link>
      <div>
        <Link href={"/meals"}>Meals</Link>
      </div>
    </nav>
  );
};

export default Navbar;
