import { db } from "@/db/db";
import { cart } from "@/db/schema";
import { auth } from "@clerk/nextjs/app-beta";
import { eq } from "drizzle-orm/expressions";
import Link from "next/link";

export default function SuccessPage() {
  const { userId } = auth();

  async function clearItems() {
    try {
      await db.delete(cart).where(eq(cart.userId, userId!));
      console.log("cart deleted");
    } catch (error) {
      console.log(error);
    }
  }

  clearItems();

  return (
    <div className="mt-8 flex flex-col items-center gap-4 text-2xl">
      <h1>Payment successful</h1>
      <Link href={"/"}>Go back to Home</Link>
    </div>
  );
}
