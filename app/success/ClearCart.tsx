"use client";

import { useUser } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";

const ClearCart = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  async function clearItems() {
    try {
      await fetch("/api/checkout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      queryClient.setQueryData([`cartItems for ${user?.id}`], []);

      console.log("cart deleted");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    clearItems();
  }, []);

  return (
    <Link aria-label="Go to home page" className="hover:underline" href={"/"}>
      Go back to Home
    </Link>
  );
};

export default ClearCart;
