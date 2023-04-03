import Image from "next/image";
import Link from "next/link";
import React from "react";
import Stripe from "stripe";

const FilteredProductCart = ({ product }: { product: Stripe.Price }) => {
  const productInfo = product.product as Stripe.Product;

  return (
    <Link
      href={`/meals/${product.id.split("_")[1]}`}
      className="flex flex-col items-center gap-2 px-8 py-4"
    >
      <div className="relative h-[250px] w-[250px]">
        <Image
          className="object-cover"
          fill
          src={productInfo.images[0]}
          alt={productInfo.name}
        />
      </div>
      <p>{productInfo.name}</p>
      <p>
        {(product.unit_amount! / 100).toLocaleString("de", {
          style: "currency",
          currency: "EUR",
        })}
      </p>
    </Link>
  );
};

export default FilteredProductCart;
