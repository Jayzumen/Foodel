import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCart = ({ product }: { product: Product }) => {
  return (
    <Link
      aria-label="Go to meal page"
      href={`/meals/${product.id.split("_")[1]}`}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative h-[275px] w-[275px]">
        <Image
          className="object-cover"
          fill
          src={product.image}
          alt={product.name}
        />
      </div>
      <p className="text-xl">{`${product.name} (${(
        product.price / 100
      ).toLocaleString("de", {
        style: "currency",
        currency: "EUR",
      })})`}</p>
    </Link>
  );
};

export default ProductCart;
