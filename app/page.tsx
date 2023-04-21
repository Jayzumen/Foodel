import Footer from "./components/Footer";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prismadb";
import { Product } from "@prisma/client";

export default async function Home() {
  async function getProducts() {
    const res = await prisma.product.findMany();
    const randomProducts: Product[] = [];
    while (randomProducts.length < 4) {
      const product = res[Math.floor(Math.random() * res.length)];
      if (!randomProducts.includes(product)) {
        randomProducts.push(product);
      }
    }
    return randomProducts;
  }

  const products = await getProducts();

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col gap-4 pt-8 text-center">
      <h1 className="text-4xl font-semibold">Foodel</h1>
      <p className="mx-auto px-10 text-xl italic md:max-w-[70%] lg:max-w-[50%]">
        Welcome to Foodel, your go-to destination for delicious Italian meals.
        We specialize in providing fresh, homemade dishes delivered straight to
        your doorstep.
      </p>
      <div className="flex flex-wrap justify-center gap-6 px-10 py-4">
        {products.map((p) => (
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
        ))}
      </div>
      <Footer />
    </div>
  );
}
