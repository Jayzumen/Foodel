"use client";

import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { type Session, User } from "next-auth";

const ClearCart = ({ session }: { session: Session | null }) => {
  const queryClient = useQueryClient();

  const user = session?.user as User;

  async function clearItems() {
    try {
      await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      queryClient.setQueryData(["cartItems", user?.email], []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (session) {
      clearItems();
    }
  }, [session]);

  return (
    <Link aria-label="Go to home page" className="hover:underline" href={"/"}>
      Homepage
    </Link>
  );
};

export default ClearCart;
