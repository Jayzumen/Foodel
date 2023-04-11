"use client";

import Link from "next/link";
import Image from "next/image";
import AddButton from "./AddButton";
import RemoveButton from "./RemoveButton";
import { useEffect, useState } from "react";

const CartItem = ({ item }: { item: CartItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [price, setPrice] = useState(item.price);

  useEffect(() => {
    setQuantity(item.quantity);
    setPrice(item.price);
  }, [item.quantity, item.price]);

  return (
    <div key={item.id} className="mx-auto flex min-w-[400px] gap-8">
      <div className="relative h-[200px] w-[200px]">
        <Image fill className="object-cover" src={item.image} alt={item.name} />
      </div>
      <div className="flex flex-col gap-2">
        <Link
          href={`/meals/${item.id.split("_")[1]}`}
          className="text-2xl hover:underline"
        >
          {item.name}
        </Link>
        <p className="text-xl">Quantity: {quantity}</p>
        <p className="text-xl">
          {((Number(price) * quantity) / 100).toLocaleString("de", {
            style: "currency",
            currency: "EUR",
          })}
        </p>
        <div className="flex justify-center gap-2">
          <AddButton id={item.id} />
          <RemoveButton id={item.id} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
