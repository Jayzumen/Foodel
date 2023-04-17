import { currentUser } from "@clerk/nextjs/app-beta";
import { redirect } from "next/navigation";
import CartItemDisplay from "./CartItemDisplay";
import { prisma } from "@/lib/prismadb";

export const revalidate = 1;

async function getCartItems() {
  const user = await currentUser();
  const cart = await prisma.cart.findFirst({
    where: {
      userId: user?.id,
    },
  });
  const cartItems = await prisma.cartProduct.findMany({
    where: {
      cartId: cart?.id,
    },
  });
  return cartItems;
}

export default async function CartPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const cartItems = await getCartItems();

  return (
    <div className="flex flex-col gap-4">
      <p className="pt-4 text-center text-3xl capitalize">Your order:</p>
      <CartItemDisplay cartItems={cartItems} />
    </div>
  );
}
