import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/app-beta";
import Link from "next/link";

export default function SuccessPage() {
  const { userId } = auth();

  async function clearItems() {
    try {
      await prisma.cart.deleteMany({
        where: {
          userId: userId!,
        },
      });
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
