import { currentUser } from "@clerk/nextjs/app-beta";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prismadb";
import CartItemDisplay from "./components/CartItemDisplay";

async function getCartItems() {
  const user = await currentUser();
  if (!user) return [];
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        userId: user?.id,
      },
    });
    if (!cart) {
      return [];
    }
    const cartItems = await prisma.cartProduct.findMany({
      where: {
        userId: user?.id,
        cartId: cart.id,
      },
    });
    if (!cartItems) {
      return [];
    }
    return cartItems;
  } catch (error) {
    console.log(error);
  }
}

export const metadata = {
  title: "Foodel - Cart",
};

export default async function CartPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const cartItems = await getCartItems();

  return (
    <div className="flex flex-col gap-4">
      <p className="pt-4 text-center text-3xl capitalize">Your order:</p>
      {cartItems && <CartItemDisplay cartItems={cartItems} />}
    </div>
  );
}
