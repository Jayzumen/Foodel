"use client";

import Link from "next/link";
import { User } from "@clerk/nextjs/dist/api";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const ClearCart = ({ user }: { user: User | null }) => {
  const queryClient = useQueryClient();

  async function clearItems() {
    try {
      await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      queryClient.setQueryData([`cartItems for ${user?.id}`], []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      clearItems();
    }
  }, [user, clearItems]);

  return (
    <Link aria-label="Go to home page" className="hover:underline" href={"/"}>
      Homepage
    </Link>
  );
};

export default ClearCart;
