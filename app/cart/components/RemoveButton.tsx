"use client";

import { CartProduct } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type User } from "next-auth";
import { AiOutlineDelete } from "react-icons/ai";

const RemoveButton = ({ data, user }: { data: CartProduct; user: User }) => {
  async function removeItem(id: string) {
    await fetch(`/api/meals/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
  }

  const queryClient = useQueryClient();

  const removeMutation = useMutation(removeItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItems", user?.email]);
    },
  });

  return (
    <button
      aria-label="Remove meal from cart"
      title="Delete"
      onClick={() => removeMutation.mutate(data.productId)}
    >
      <AiOutlineDelete
        size={35}
        className="m-2 transition-colors duration-200 hover:text-green-500"
      />
    </button>
  );
};

export default RemoveButton;
