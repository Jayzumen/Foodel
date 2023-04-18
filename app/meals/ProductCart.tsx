import Image from "next/image";
import Link from "next/link";
import React from "react";
import Stripe from "stripe";

const ProductCart = ({ product }: { product: Stripe.Price }) => {
  const productInfo = product.product as Stripe.Product;

  return (
    <Link
      href={`/meals/${product.id.split("_")[1]}`}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative h-[275px] w-[275px]">
        <Image
          className="object-cover"
          fill
          src={productInfo.images[0]}
          alt={productInfo.name}
        />
      </div>
      <p className="text-xl">{`${productInfo.name} (${(
        product.unit_amount! / 100
      ).toLocaleString("de", {
        style: "currency",
        currency: "EUR",
      })})`}</p>
    </Link>
  );
};

export default ProductCart;
