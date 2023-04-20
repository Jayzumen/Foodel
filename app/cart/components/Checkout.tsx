"use client";

import { useQuery } from "@tanstack/react-query";
import CheckOutButton from "./CheckOutButton";
import { getCartItemsQ } from "./CartItemDisplay";
import { CartProduct } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { LoadingSpinner } from "../../components/loadingFunctions";

const Checkout = () => {
  const { user } = useUser();
  const { data: cartTotal, status } = useQuery(
    [`cartItems for ${user?.id}`],
    getCartItemsQ
  );

  return (
    <div className="flex flex-col gap-2">
      {status === "loading" ? (
        <LoadingSpinner size={30} />
      ) : status === "error" ? (
        <p>Error</p>
      ) : (
        cartTotal && (
          <div className="flex flex-row gap-2 md:flex-col lg:flex-row">
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
      {cartTotal && <CheckOutButton cartItems={cartTotal} />}
    </div>
  );
};

export default Checkout;
