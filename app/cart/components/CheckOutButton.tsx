"use client";
import { CartProduct } from "@prisma/client";
import { useRouter } from "next/navigation";

const CheckOutButton = ({ cartItems }: { cartItems: CartProduct[] }) => {
  const router = useRouter();
  if (cartItems.length === 0) return null;

  async function checkOut() {
    const lineItems = cartItems.map((item) => {
      return {
        price: item.productId,
        quantity: item.quantity,
      };
    });
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lineItems }),
    });
    const data = await res.json();
    router.push(data.session.url);
  }

  return (
    <button
      aria-label="Checkout button"
      className="mx-auto w-fit rounded-lg bg-lime-700 px-4 py-2 text-xl transition-colors duration-200 hover:bg-lime-800"
      onClick={checkOut}
    >
      Checkout
    </button>
  );
};

export default CheckOutButton;
