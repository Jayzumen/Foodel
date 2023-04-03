import Image from "next/image";
import Stripe from "stripe";

async function getProduct(id: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET || "", {
    apiVersion: "2022-11-15",
  });
  const res = await stripe.prices.retrieve(`price_${id}`, {
    expand: ["product"],
  });

  return res;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const price = await getProduct(params.id);
  const product = price.product as Stripe.Product;
  return {
    title: product.name,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const stripe = new Stripe(process.env.STRIPE_SECRET || "", {
    apiVersion: "2022-11-15",
  });
  const res = await stripe.prices.list({
    expand: ["data.product"],
  });
  const prices = res.data;
  return prices.map((p) => ({ id: p.id.replace("price_", "") }));
}

export default async function MealPage({ params }: { params: { id: string } }) {
  const price = await getProduct(params.id);
  const product = price.product as Stripe.Product;
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-3xl font-semibold">{product.name}</p>
      <div className="relative h-[350px] w-[350px]">
        <Image
          fill
          className="object-cover"
          src={product.images![0]}
          alt={product.name}
        />
      </div>
      <p className="mx-auto max-w-[500px] text-center text-lg italic">
        {product.description}
      </p>
      <p className="text-xl font-semibold">
        {(price.unit_amount! / 100).toLocaleString("de", {
          style: "currency",
          currency: "EUR",
        })}
      </p>
    </div>
  );
}
