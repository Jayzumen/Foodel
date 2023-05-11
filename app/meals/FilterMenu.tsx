"use client";

import { useState } from "react";
import ProductCart from "./ProductCart";
import { Product } from "@prisma/client";

const Filter = [
  {
    id: "1",
    name: "All",
    filter: (productData: Product[]) => productData,
  },
  {
    id: "2",
    name: "Appetizers",
    filter: (productData: Product[]) =>
      productData.filter((p) => p.category === "Appetizers"),
  },
  {
    id: "3",
    name: "Pizza",
    filter: (productData: Product[]) =>
      productData.filter((p) => p.category === "Pizza"),
  },
  {
    id: "4",
    name: "Pasta",
    filter: (productData: Product[]) =>
      productData.filter((p) => p.category === "Pasta"),
  },
  {
    id: "5",
    name: "Meat",
    filter: (productData: Product[]) =>
      productData.filter((p) => p.category === "Meat"),
  },
  {
    id: "6",
    name: "Desserts",
    filter: (productData: Product[]) =>
      productData.filter((p) => p.category === "Desserts"),
  },
];

const FilterMenu = ({ products }: { products: Product[] }) => {
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const handleFilterClick = (
    filter: (productData: Product[]) => Product[],
    name: string
  ) => {
    setFilteredData(filter(products));
    setActiveFilter(name);
  };

  return (
    <>
      <ul className="flex flex-wrap justify-center gap-2 p-4">
        {Filter.map(({ id, name, filter }) => (
          <li key={id}>
            <button
              onClick={() => handleFilterClick(filter, name)}
              className={`rounded-lg px-4 py-2 text-white ${
                name === activeFilter
                  ? "bg-green-700 hover:bg-green-600"
                  : "bg-zinc-800 hover:bg-zinc-700"
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
            {filteredData
              .sort((a, b) =>
                a.name.toLowerCase().localeCompare(b.name.toLowerCase())
              )
              .map((product) => (
                <ProductCart key={product.id} product={product} />
              ))}
          </div>
        ) : (
          <div className="mx-auto flex max-w-[1300px] flex-wrap justify-center gap-8 py-4">
            {products &&
              products
                .sort((a, b) =>
                  a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                )
                .map((p) => <ProductCart key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </>
  );
};

export default FilterMenu;
