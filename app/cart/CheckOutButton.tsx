"use client";
import { Cart } from "@/types/db";
import { useRouter } from "next/navigation";
import React from "react";

const CheckOutButton = ({ cartItems }: { cartItems: Cart[] }) => {
  const router = useRouter();
  if (cartItems[0].items?.length === 0) return null;

  async function checkOut() {
    const lineItems = cartItems[0].items?.map((item) => {
      return {
        price: item.id,
        quantity: item.quantity,
      };
    });
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lineItems }),
    });
    const data = await res.json();
    router.push(data.session.url);
  }

  return (
    <button
      className="mx-auto w-fit rounded-lg bg-lime-700 px-4 py-2 text-xl transition-colors duration-200 hover:bg-lime-800"
      onClick={checkOut}
    >
      Check Out
    </button>
  );
};

export default CheckOutButton;
