import { prisma } from "@/lib/prismadb";
import FilterMenu from "./FilterMenu";

async function getProducts() {
  const res = await prisma.product.findMany();
  return res;
}

export const metadata = {
  title: "Foodel | Meals",
  description: "All products",
};

export default async function MealsPage() {
  const products = await getProducts();

  return (
    <div className="flex flex-col gap-4">
      <FilterMenu products={products} />
    </div>
  );
}
