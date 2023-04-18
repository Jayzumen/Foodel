"use client";

import React from "react";
import Stripe from "stripe";
import { toast } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

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
    try {
      await fetch("/api/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const cartHandler = () => {
    if (!user) {
      toast.error("You must be logged in to add items to cart");
      return;
    }
    toast.promise(addToCart(productData), {
      loading: "Adding to cart",
      success: "Added to cart",
      error: "Failed to add to cart",
    });
  };

  return (
    <button
      className="rounded-lg border border-slate-700 bg-green-700 px-4 py-2 text-2xl font-semibold text-slate-200 hover:bg-green-800 "
      onClick={() => cartHandler()}
    >
      Add to Cart
    </button>
  );
};

export default CartButton;
