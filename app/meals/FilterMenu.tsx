"use client";

import Stripe from "stripe";
import { useState } from "react";
import ProductCart from "./ProductCart";

const Filter = [
  {
    id: "1",
    name: "All",
    filter: (productData: Stripe.Price[]) => productData,
  },
  {
    id: "2",
    name: "Appetizers",
    filter: (productData: Stripe.Price[]) =>
      productData.filter(
        (p): p is Stripe.Price & { product: Stripe.Product } =>
          typeof p.product !== "string" &&
          "metadata" in p.product &&
          p.product.metadata.category === "Appetizers"
      ),
  },
  {
    id: "3",
    name: "Pizza",
    filter: (productData: Stripe.Price[]) =>
      productData.filter(
        (p): p is Stripe.Price & { product: Stripe.Product } =>
          typeof p.product !== "string" &&
          "metadata" in p.product &&
          p.product.metadata.category === "Pizza"
      ),
  },
  {
    id: "4",
    name: "Pasta",
    filter: (productData: Stripe.Price[]) =>
      productData.filter(
        (p): p is Stripe.Price & { product: Stripe.Product } =>
          typeof p.product !== "string" &&
          "metadata" in p.product &&
          p.product.metadata.category === "Pasta"
      ),
  },
  {
    id: "5",
    name: "Meat",
    filter: (productData: Stripe.Price[]) =>
      productData.filter(
        (p): p is Stripe.Price & { product: Stripe.Product } =>
          typeof p.product !== "string" &&
          "metadata" in p.product &&
          p.product.metadata.category === "Meat"
      ),
  },
  {
    id: "6",
    name: "Desserts",
    filter: (productData: Stripe.Price[]) =>
      productData.filter(
        (p): p is Stripe.Price & { product: Stripe.Product } =>
          typeof p.product !== "string" &&
          "metadata" in p.product &&
          p.product.metadata.category === "Desserts"
      ),
  },
];

const FilterMenu = ({ prices }: { prices: Stripe.Price[] }) => {
  const [filteredData, setFilteredData] = useState<Stripe.Price[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const handleFilterClick = (
    filter: (productData: Stripe.Price[]) => Stripe.Price[],
    name: string
  ) => {
    setFilteredData(filter(prices));
    setActiveFilter(name);
  };

  return (
    <div>
      <ul className="mt-4 flex flex-wrap justify-center gap-2">
        {Filter.map(({ id, name, filter }) => (
          <li key={id}>
            <button
              onClick={() => handleFilterClick(filter, name)}
              className={`rounded-lg px-4 py-2 ${
                name === activeFilter
                  ? "bg-sky-700 hover:bg-sky-600"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
      <div className="my-4">
        {filteredData.length > 0 ? (
          <div className="mx-auto flex max-w-[1300px] flex-wrap justify-center gap-8 py-4">
            {filteredData.map((product) => (
              <ProductCart key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mx-auto flex max-w-[1300px] flex-wrap justify-center gap-8 py-4">
            {prices.map((p) => (
              <ProductCart key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterMenu;
