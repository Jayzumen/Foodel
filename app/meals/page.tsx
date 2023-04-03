import Stripe from "stripe";
import ProductCart from "./ProductCart";

async function getStripeProducts() {
  const stripe = new Stripe(process.env.STRIPE_SECRET || "", {
    apiVersion: "2022-11-15",
  });
  const res = await stripe.prices.list({
    expand: ["data.product"],
  });
  const prices = res.data;
  return prices;
}

export const metadata = {
  title: "Foodel | Meals",
  description: "All products",
};

export default async function MealsPage() {
  const products = await getStripeProducts();
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {products.map((p) => (
        <ProductCart key={p.id} product={p} />
      ))}
    </div>
  );
}
