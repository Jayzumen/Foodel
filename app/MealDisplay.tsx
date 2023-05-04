"use client";

import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { LoadingSpinner } from "../components/loadingFunctions";

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

  const { data: products, status } = useQuery(["products"], getProducts, {
    refetchInterval: 30000,
  });

  return (
    <div className="flex flex-wrap justify-center gap-6 px-10 py-4">
      {status === "loading" ? (
        <LoadingSpinner size={100} />
      ) : status === "error" ? (
        <p>Error</p>
      ) : (
        products.map((p) => (
          <Link
            key={p.id}
            href={`/meals/${p.id.split("_")[1]}`}
            className="flex flex-col gap-2"
          >
            <div className="relative h-[300px] w-[300px]">
              <Image fill className="object-cover" src={p.image} alt={p.name} />
            </div>
            <p className="text-xl">{`${p.name} (${(
              p.price / 100
            ).toLocaleString("de", {
              style: "currency",
              currency: "EUR",
            })})`}</p>
          </Link>
        ))
      )}
    </div>
  );
};

export default MealDisplay;
