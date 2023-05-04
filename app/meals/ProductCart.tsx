import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCart = ({ product }: { product: Product }) => {
  return (
    <Link
      aria-label="Go to meal page"
      href={`/meals/${product.id.split("_")[1]}`}
      className="group flex flex-col items-center gap-2"
    >
      <div className="relative h-[275px] w-[275px]">
        <Image
          className="object-cover transition duration-200 group-hover:opacity-80"
          fill
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="flex flex-col items-center transition duration-200 group-hover:text-green-800 dark:group-hover:text-green-500">
        <p className="text-xl group-hover:underline">{product.name}</p>
        <span className="text-xl">
          (
          {(product.price / 100).toLocaleString("de", {
            style: "currency",
            currency: "EUR",
          })}
          )
        </span>
      </div>
    </Link>
  );
};

export default ProductCart;
