import CartItemDisplay from "./components/CartItemDisplay";

export const metadata = {
  title: "Foodel | Cart",
  description: "Your cart",
};

export default function CartPage() {
  return (
    <div className="flex flex-col gap-4">
      <p className="pt-4 text-center text-3xl capitalize">Your order:</p>
      <CartItemDisplay />
    </div>
  );
}
