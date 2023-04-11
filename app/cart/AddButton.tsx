"use client";

import { AiOutlinePlusCircle } from "react-icons/ai";

const AddButton = ({ id }: { id: string }) => {
  async function addItem() {
    await fetch(`/api/db/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
  }

  return (
    <button title="Add 1 to cart" onClick={addItem}>
      <AiOutlinePlusCircle
        size={35}
        className="m-2 rounded-full transition-colors duration-200 hover:text-slate-400"
      />
    </button>
  );
};

export default AddButton;
