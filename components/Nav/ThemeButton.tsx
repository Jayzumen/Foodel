"use client";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import { BsSun, BsMoon } from "react-icons/bs";

const ThemeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      <button
        aria-label="Toggle Dark Mode"
        type="button"
        title="Toggle Dark Mode"
        className="flex items-center rounded bg-slate-400 p-2 text-white dark:bg-slate-800"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        {resolvedTheme === "dark" ? <BsSun size={20} /> : <BsMoon size={20} />}
      </button>
    </>
  );
};

export default ThemeButton;
