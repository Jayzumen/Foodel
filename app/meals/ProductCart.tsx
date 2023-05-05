"use client";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ProductCart = ({ product }: { product: Product }) => {
  return (
    <motion.div
      transition={{ delay: 0.2 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
    </motion.div>
  );
};

export default ProductCart;
