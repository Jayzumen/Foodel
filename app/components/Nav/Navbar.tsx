import Link from "next/link";
import React from "react";
import AuthButtons from "./AuthButtons";

const Navbar = () => {
  return (
    <nav className="flex h-20 items-center justify-between px-6 py-2 shadow-md shadow-slate-800">
      <Link className="text-xl hover:underline" href={"/"}>
        Foodel
      </Link>
      <div className="flex items-center gap-4">
        <Link href={"/meals"}>Meals</Link>
        <Link href={"/cart"}>Cart</Link>
        <AuthButtons />
      </div>
    </nav>
  );
};

export default Navbar;
