"use client";

import Image from "next/image";
import CartButton from "./CartButton";
import { Product } from "@prisma/client";
import { motion } from "framer-motion";

const Product = ({ product }: { product: Product }) => {
  return (
    <motion.div
      transition={{ delay: 0.2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex flex-col items-center gap-2"
    >
      <p className="text-3xl font-semibold">{product.name}</p>
      <div className="relative h-[350px] w-[350px]">
        <Image
          fill
          className="object-cover"
          src={product.image}
          alt={product.name}
        />
      </div>
      <p className="mx-auto max-w-[500px] text-center text-lg italic">
        {product.description}
      </p>
      <p className="text-xl font-semibold">
        {(product.price / 100).toLocaleString("de", {
          style: "currency",
          currency: "EUR",
        })}
      </p>
      <CartButton product={product} />
    </motion.div>
  );
};

export default Product;
