"use client";

import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "@prisma/client";
import { type User } from "next-auth";
import { useSession } from "next-auth/react";

const CartButton = ({ product }: { product: Product }) => {
  const { data: session } = useSession();

  const user = session?.user as User;

  const productData = {
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price.toString(),
    quantity: 1,
  };

  const addToCart = async (productData: CartItem) => {
    if (!user) {
      toast.error("You must be logged in to add items to cart");
      return;
    }
    try {
      await fetch("/api/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      toast.success("Added to cart");
    } catch (error) {
      console.log(error);
    }
  };

  const queryClient = useQueryClient();

  const cartMutation = useMutation(addToCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItems", user?.email]);
    },
  });

  return (
    <button
      aria-label="Add to cart button"
      className="my-4 rounded-lg border border-slate-700 bg-green-700 px-4 py-2 text-2xl font-semibold text-slate-200 hover:bg-green-800 "
      onClick={() => cartMutation.mutate(productData)}
    >
      Add to Cart
    </button>
  );
};

export default CartButton;
