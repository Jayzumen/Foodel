import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { prisma } from "@/lib/prismadb";
import Product from "./Product";

async function getProduct(id: string) {
  const res = await prisma.product.findUnique({
    where: {
      id: `price_${id}`,
    },
  });

  return res;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  return {
    title: product?.name,
    description: product?.description,
  };
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany();
  return products.map((p) => ({ id: p.id.split("_")[1] }));
}

export default async function MealPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  return (
    <div className="flex flex-col gap-2">
      <Link
        className="flex w-fit items-center gap-4 px-20 py-4 transition-colors duration-200 hover:text-sky-500"
        href={"/meals"}
      >
        <AiOutlineArrowLeft size={30} />
        <p className="text-xl">Go to Meals</p>
      </Link>
      {product && <Product product={product} />}
    </div>
  );
}
