import { db } from "@/db/db";
import { cart } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/app-beta";
import { eq } from "drizzle-orm/expressions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import CheckOutButton from "./CheckOutButton";
import RemoveButton from "./RemoveButton";

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
      <div className="flex flex-col gap-8 px-10 py-4">
        {!cartItems[0] ? (
          <p className="text-center text-2xl">Your cart is empty</p>
        ) : (
          <>
            {cartItems[0]?.items?.map((item) => (
              <div
                key={item.id}
                className="flex w-[500px] min-w-[70%] items-center justify-between gap-2 lg:min-w-[50%] "
              >
                <div className="flex gap-2">
                  <div className="relative h-[200px] w-[200px]">
                    <Image
                      fill
                      className="object-cover"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <Link
                    href={`/meals/${item.id.split("_")[1]}`}
                    className="text-2xl hover:underline"
                  >
                    {item.name}
                  </Link>
                </div>
                <div>
                  <p className="text-xl">Quantity: {item.quantity}</p>
                  <p className="text-xl">
                    {(
                      (Number(item.price) * item.quantity) /
                      100
                    ).toLocaleString("de", {
                      style: "currency",
                      currency: "EUR",
                    })}
                  </p>
                </div>
                <RemoveButton id={item.id} />
              </div>
            ))}
            <CheckOutButton cartItems={cartItems} />
          </>
        )}
      </div>
    </div>
  );
}
