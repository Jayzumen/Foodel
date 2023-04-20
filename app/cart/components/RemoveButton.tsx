"use client";

import { useUser } from "@clerk/nextjs";
import { CartProduct } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AiOutlineDelete } from "react-icons/ai";

const RemoveButton = ({ data }: { data: CartProduct }) => {
  const { user } = useUser();

  async function removeItem(id: string) {
    await fetch(`/api/meals/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
  }

  const queryClient = useQueryClient();

  const removeMutation = useMutation(removeItem, {
    onSuccess: () => {
      queryClient.invalidateQueries([`cartItems for ${user?.id}`]);
    },
  });

  return (
    <button
      aria-label="Remove meal from cart"
      title="Remove Meal"
      onClick={() => removeMutation.mutate(data.productId)}
    >
      <AiOutlineDelete
        size={35}
        className="m-2 rounded-full transition-colors duration-200 hover:text-slate-400"
      />
    </button>
  );
};

export default RemoveButton;
