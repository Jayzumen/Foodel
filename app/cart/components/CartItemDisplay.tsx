"use client";
import CartItem from "./CartItem";
import { useQuery } from "@tanstack/react-query";
import Checkout from "./Checkout";
import { CartProduct } from "@prisma/client";
import { LoadingPage } from "@/components/loadingFunctions";
import { useSession } from "next-auth/react";
import { type User } from "next-auth";

export async function getCartItemsQ() {
  const res = await fetch("/api/meals", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = (await res.json()) as CartProduct[];
  return data;
}

const CartItemDisplay = () => {
  const { data: session } = useSession();

  const user = session?.user as User;

  const { data, status } = useQuery(["cartItems", user?.email], getCartItemsQ);

  return (
    <div className="my-4 flex flex-col items-center gap-4">
      {status === "loading" ? (
        <LoadingPage />
      ) : status === "error" ? (
        <p>Error</p>
      ) : data.length === 0 ? (
        <p className="text-center text-2xl">Your cart is empty</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {data && <Checkout user={user} />}
          <div className="flex flex-col justify-center gap-8 px-10 py-4">
            {data
              ?.sort((a, b) => a.name.toLowerCase().localeCompare(b.name))
              .map((item) => (
                <CartItem key={item.id} item={item} user={user} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItemDisplay;
