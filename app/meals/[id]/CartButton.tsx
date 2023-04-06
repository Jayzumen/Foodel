"use client";

import React from "react";
import Stripe from "stripe";
import { toast } from "react-hot-toast";

const CartButton = ({ price }: { price: Stripe.Response<Stripe.Price> }) => {
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
      await fetch("/api/db", {
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

  return (
    <button
      onClick={() =>
        toast.promise(addToCart(productData), {
          loading: "Adding to cart",
          success: "Added to cart",
          error: "Failed to add to cart",
        })
      }
    >
      Add to Cart
    </button>
  );
};

export default CartButton;
