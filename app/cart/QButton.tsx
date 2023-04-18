"use client";

import { CartProduct } from "@prisma/client";
import { QueryObserverResult } from "@tanstack/react-query";
import { useState } from "react";

const AddButton = ({
  data,
  itemRefetch,
  totalRefetch,
}: {
  data: CartProduct;
  itemRefetch: () => Promise<QueryObserverResult<CartProduct, unknown>>;
  totalRefetch: () => Promise<QueryObserverResult<CartProduct[], unknown>>;
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(data.quantity);

  async function updateQuantity(id: string, quantity: number) {
    await fetch(`/api/meals/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quantity),
    });
    itemRefetch();
    totalRefetch();
    setSelectedQuantity(quantity);
  }

  return (
    <select
      aria-label="Select quantity"
      name="quantity"
      id="product-quantity"
      className="cursor-pointer rounded-sm py-1 text-xs font-medium text-black transition-colors hover:bg-neutral-100 active:bg-white md:text-sm"
      value={selectedQuantity}
      onChange={(e) => {
        setSelectedQuantity(Number(e.target.value));
        updateQuantity(data.productId, Number(e.target.value));
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
