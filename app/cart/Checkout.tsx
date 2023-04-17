"use client";

import { useQuery } from "@tanstack/react-query";
import CheckOutButton from "./CheckOutButton";
import { getCartItemsQ } from "./CartItemDisplay";
import { CartProduct } from "@prisma/client";

const Checkout = ({ cartItems }: { cartItems: CartProduct[] }) => {
  const { data: cartTotal, status } = useQuery(["cartTotal"], getCartItemsQ);

  return (
    <div className="flex flex-col gap-2">
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <p>Error</p>
      ) : (
        cartTotal && (
          <div className="flex flex-wrap gap-2">
            <p>
              Subtotal{" "}
              <span>{`(${cartTotal.reduce(
                (acc: number, item: CartProduct) => acc + item.quantity,
                0
              )} items):`}</span>
            </p>
            <p className="font-bold">
              {(
                cartTotal.reduce(
                  (acc: number, item: CartProduct) =>
                    acc + Number(item.price) * item.quantity,
                  0
                ) / 100
              ).toLocaleString("de", {
                style: "currency",
                currency: "EUR",
              })}
            </p>
          </div>
        )
      )}
      <CheckOutButton cartItems={cartItems} />
    </div>
  );
};

export default Checkout;
