"use client";

import Stripe from "stripe";
import { toast } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CartButton = ({ price }: { price: Stripe.Response<Stripe.Price> }) => {
  const { user } = useUser();

  const product = price.product as Stripe.Product;
  const productData = {
    id: price.id,
    name: product.name,
    image: product.images[0],
    price: price.unit_amount_decimal as string,
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
      queryClient.invalidateQueries([`cartItems for ${user?.id}`]);
    },
  });

  return (
    <button
      aria-label="Add to cart button"
      className="rounded-lg border border-slate-700 bg-green-700 px-4 py-2 text-2xl font-semibold text-slate-200 hover:bg-green-800 "
      onClick={() => cartMutation.mutate(productData)}
    >
      Add to Cart
    </button>
  );
};

export default CartButton;
