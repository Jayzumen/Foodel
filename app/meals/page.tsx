import Stripe from "stripe";
import FilterMenu from "./FilterMenu";

async function getStripeProducts() {
  const stripe = new Stripe(process.env.STRIPE_SECRET || "", {
    apiVersion: "2022-11-15",
  });
  const res = await stripe.prices.list({
    expand: ["data.product"],
    limit: 100,
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
    <div className="flex flex-col gap-4">
      <FilterMenu prices={products} />
    </div>
  );
}
