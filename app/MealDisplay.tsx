"use client";

import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { LoadingSpinner } from "../components/loadingFunctions";
import { motion } from "framer-motion";

const MealDisplay = () => {
  async function getProducts() {
    const res = await fetch("/api/products");
    const productsData = (await res.json()) as Product[];
    const randomProducts = [] as Product[];
    while (randomProducts.length < 4) {
      const product =
        productsData[Math.floor(Math.random() * productsData.length)];
      if (!randomProducts.includes(product)) {
        randomProducts.push(product);
      }
    }
    return randomProducts;
  }

  const { data: products, status } = useQuery(
    ["products of the day"],
    getProducts,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
    }
  );

  return (
    <div>
      <h2 className="my-6 text-3xl font-semibold text-green-500">
        Specialties of the day:
      </h2>
      <div className="flex flex-wrap justify-center gap-6 px-10 py-4">
        {status === "loading" ? (
          <div className="min-h-[600px]">
            <LoadingSpinner size={100} />
          </div>
        ) : status === "error" ? (
          <p>Error</p>
        ) : (
          products.map((p) => (
            <motion.div
              transition={{ delay: 0.2 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              key={p.id}
            >
              <Link
                href={`/meals/${p.id.split("_")[1]}`}
                className="group flex flex-col gap-2"
              >
                <div className="relative h-[300px] w-[300px]">
                  <Image
                    fill
                    className="object-cover transition duration-200 group-hover:opacity-80"
                    src={p.image}
                    alt={p.name}
                  />
                </div>
                <div className="flex flex-col items-center transition duration-200 group-hover:text-green-800 dark:group-hover:text-green-500">
                  <p className="text-xl group-hover:underline">{p.name}</p>
                  <span className="text-xl">
                    (
                    {(p.price / 100).toLocaleString("de", {
                      style: "currency",
                      currency: "EUR",
                    })}
                    )
                  </span>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default MealDisplay;
