import { currentUser } from "@clerk/nextjs/app-beta";
import { redirect } from "next/navigation";
import CartItemDisplay from "./CartItemDisplay";
import { db } from "@/db/db";
import { cart } from "@/db/schema";
import { eq } from "drizzle-orm/expressions";

export const revalidate = 1;

export default async function CartPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  async function getCartItems() {
    const res = await db.select().from(cart).where(eq(cart.userId, user?.id!));
    return res;
  }

  const cartItems = await getCartItems();

  return (
    <div className="flex flex-col gap-4">
      <p className="pt-4 text-center text-3xl capitalize">Your order:</p>
      <CartItemDisplay cartItems={cartItems} />
    </div>
  );
}
