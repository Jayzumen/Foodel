"use client";

import Link from "next/link";
import AuthLinks from "./AuthLinks";
import { useNavMenu } from "@/stores/navMenu";
import { GiHamburgerMenu } from "react-icons/gi";
import ThemeButton from "./ThemeButton";

const Menu = () => {
  const menuStore = useNavMenu();

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex items-center justify-between px-4 py-2 md:hidden">
        <GiHamburgerMenu
          className="cursor-pointer transition-colors duration-200 hover:text-green-500"
          onClick={() => menuStore.toggle()}
          size={30}
        />

        {menuStore.isOpen && (
          <div className="absolute right-2 top-10 z-20 flex flex-col gap-4 rounded-lg bg-slate-300 px-4 py-2 dark:bg-slate-800">
            <Link
              aria-label="Link to meals page "
              className="font-bold hover:text-green-500 hover:underline"
              href={"/meals"}
              onClick={() => menuStore.toggle()}
            >
              Meals
            </Link>
            <AuthLinks />
          </div>
        )}
      </div>
      <div className="hidden items-center gap-4 md:flex md:gap-6">
        <Link
          aria-label="Link to meals page"
          className="font-bold hover:text-green-500 hover:underline"
          href={"/meals"}
        >
          Meals
        </Link>
        <AuthLinks />
      </div>
      <ThemeButton />
    </div>
  );
};

export default Menu;
