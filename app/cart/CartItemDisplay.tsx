"use client";
import CartItem from "./CartItem";
import { useQuery } from "@tanstack/react-query";
import Checkout from "./Checkout";
import { CartProduct } from "@prisma/client";

export async function getCartItemsQ() {
  const res = await fetch("/api/meals", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data as CartProduct[];
}

const CartItemDisplay = ({ cartItems }: { cartItems: CartProduct[] }) => {
  const { data, status } = useQuery(["cartItems"], getCartItemsQ, {
    initialData: cartItems,
  });

  const { data: cartTotal, refetch } = useQuery(["cartTotal"], getCartItemsQ, {
    initialData: data,
  });

  return (
    <div className="my-4 flex flex-col items-center gap-4">
      {status === "error" ? (
        <p>Error</p>
      ) : !data ? (
        <p className="text-center text-2xl">Your cart is empty</p>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-8 px-10 py-4">
            {data.map((item) => (
              <CartItem key={item.id} item={item} totalRefetch={refetch} />
            ))}
          </div>
          <Checkout cartItems={cartTotal} />
        </>
      )}
    </div>
  );
};

export default CartItemDisplay;
