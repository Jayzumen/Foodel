"use client";

import { CartProduct } from "@prisma/client";
import { QueryObserverResult } from "@tanstack/react-query";
import { AiOutlineDelete } from "react-icons/ai";

const RemoveButton = ({
  data,
  itemRefetch,
  totalRefetch,
}: {
  data: CartProduct;
  itemRefetch: () => Promise<QueryObserverResult<CartProduct, unknown>>;
  totalRefetch: () => Promise<QueryObserverResult<CartProduct[], unknown>>;
}) => {
  async function removeItem(id: string) {
    await fetch(`/api/meals/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
    totalRefetch();
    itemRefetch();
  }

  return (
    <button title="Remove Meal" onClick={() => removeItem(data.productId)}>
      <AiOutlineDelete
        size={35}
        className="m-2 rounded-full transition-colors duration-200 hover:text-slate-400"
      />
    </button>
  );
};

export default RemoveButton;
