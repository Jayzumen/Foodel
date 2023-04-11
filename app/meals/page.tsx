import FilterMenu from "./FilterMenu";
import { stripe } from "@/lib/stripe";

async function getStripeProducts() {
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
