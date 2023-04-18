"use client";

import { useUser } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuccessPage() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    router.push("/");
  }

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
    <div className="mt-8 flex flex-col items-center gap-4 text-2xl">
      <h1>Payment successful</h1>
      <Link href={"/"}>Go back to Home</Link>
    </div>
  );
}
