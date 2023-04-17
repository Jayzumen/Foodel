"use client";

import Link from "next/link";
import Image from "next/image";
import QButton from "./QButton";
import RemoveButton from "./RemoveButton";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { CartProduct } from "@prisma/client";

export async function getCartItem(id: string) {
  const res = await fetch(`/api/meals/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data as CartProduct;
}

const CartItem = ({
  item,
  totalRefetch,
}: {
  item: CartProduct;
  totalRefetch: () => Promise<QueryObserverResult<CartProduct[], unknown>>;
}) => {
  const {
    data,
    status,
    refetch: itemRefetch,
  } = useQuery([`${item.name}`], () => getCartItem(item.productId));

  return (
    <>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <p>Error</p>
      ) : (
        <div
          key={data.id}
          className="mx-auto flex min-w-[270px] flex-wrap justify-center gap-8"
        >
          <div className="relative h-[200px] w-[200px]">
            <Image
              fill
              className="object-cover"
              src={data.image}
              alt={data.name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href={`/meals/${data.productId.split("_")[1]}`}
              className="text-2xl hover:underline"
            >
              {data.name}
            </Link>
            <p className="text-xl">Quantity: {data.quantity}</p>
            <p className="text-xl">
              {((Number(data.price) * data.quantity) / 100).toLocaleString(
                "de",
                {
                  style: "currency",
                  currency: "EUR",
                }
              )}
            </p>
            <div className="flex items-center justify-center gap-2">
              <QButton
                data={data}
                itemRefetch={itemRefetch}
                totalRefetch={totalRefetch}
              />
              <RemoveButton
                data={data}
                itemRefetch={itemRefetch}
                totalRefetch={totalRefetch}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;
