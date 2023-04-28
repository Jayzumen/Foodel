import Image from "next/image";
import CartButton from "./CartButton";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { prisma } from "@/lib/prismadb";

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
      {product && (
        <div className="flex flex-col items-center gap-2">
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
        </div>
      )}
    </div>
  );
}
