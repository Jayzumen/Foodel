"use client";

import Link from "next/link";
import { getCartItemsQ } from "@/app/cart/components/CartItemDisplay";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../loadingFunctions";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { type User } from "next-auth";

const CartLink = ({ user }: { user: User | undefined }) => {
  const { data: cartCount, status } = useQuery(
    ["cartItems", user?.email],
    getCartItemsQ
  );

  return (
    <Link
      aria-label="link to cart page"
      className="group flex items-center gap-1"
      href={"/cart"}
    >
      <p className="transition-colors duration-200 group-hover:text-sky-600">
        {`${user?.name?.split(" ")[0]}'s`}
      </p>

      <div className="relative">
        <AiOutlineShoppingCart
          className="transition-colors duration-200 group-hover:text-sky-600"
          size={30}
        />
        <div className="absolute -top-3 left-4">
          {cartCount?.length === 0 ? null : status === "loading" ? (
            <LoadingSpinner size={20} />
          ) : status === "error" ? (
            <p className="rounded-full bg-red-500 p-1 font-bold"></p>
          ) : (
            <p className="rounded-full bg-sky-500 px-2 py-1 text-xs font-bold transition-colors duration-200 group-hover:bg-sky-600">
              {cartCount && cartCount.reduce((a, b) => a + b.quantity, 0)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CartLink;
