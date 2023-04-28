"use client";

import { CartProduct } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "next-auth";
import { useState } from "react";

const AddButton = ({ data, user }: { data: CartProduct; user: User }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(data.quantity);

  async function updateQuantity(props: { id: string; quantity: number }) {
    await fetch(`/api/meals/${props.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.quantity),
    });
    setSelectedQuantity(props.quantity);
  }

  const queryClient = useQueryClient();

  const updateMutation = useMutation(updateQuantity, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItems", user?.email]);
      queryClient.invalidateQueries([`${data.name}`]);
    },
  });

  return (
    <select
      aria-label="Select quantity"
      name="quantity"
      id="product-quantity"
      className="cursor-pointer rounded-sm py-1 text-xs font-medium text-black transition-colors hover:bg-neutral-100 active:bg-white md:text-sm"
      value={selectedQuantity}
      onChange={(e) => {
        setSelectedQuantity(Number(e.target.value));
        updateMutation.mutate({
          id: data.productId,
          quantity: Number(e.target.value),
        });
      }}
    >
      {Array.from({ length: 10 }, (_, i) => i + 1).map((quantity) => (
        <option key={quantity} value={quantity} className="font-medium">
          {quantity}
        </option>
      ))}
    </select>
  );
};

export default AddButton;
