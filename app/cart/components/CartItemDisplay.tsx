"use client";
import CartItem from "./CartItem";
import { useQuery } from "@tanstack/react-query";
import Checkout from "./Checkout";
import { CartProduct } from "@prisma/client";
import { useUser } from "@clerk/nextjs";

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
  const { user } = useUser();

  const { data, status } = useQuery(
    [`cartItems for ${user?.id}`],
    getCartItemsQ,
    {
      initialData: cartItems,
    }
  );

  return (
    <div className="my-4 flex flex-col items-center gap-4">
      {cartItems.length === 0 ? (
        <p className="text-center text-2xl">Your cart is empty</p>
      ) : status === "error" ? (
        <p>Error</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {data && <Checkout />}
          <div className="flex flex-col justify-center gap-8 px-10 py-4">
            {data
              ?.sort((a, b) => a.name.toLowerCase().localeCompare(b.name))
              .map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItemDisplay;
