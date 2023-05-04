"use client";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import { BsSun, BsMoon } from "react-icons/bs";

const ThemeButton = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { resolvedTheme, setTheme } = useTheme();

  return (
    <>
      {mounted && (
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          title="Toggle Dark Mode"
          className="flex items-center rounded bg-gradient-to-r from-green-400 to-blue-500 p-2"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {resolvedTheme === "dark" ? (
            <BsSun size={20} />
          ) : (
            <BsMoon size={20} />
          )}
        </button>
      )}
    </>
  );
};

export default ThemeButton;
