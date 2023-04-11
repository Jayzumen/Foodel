import { db } from "@/db/db";
import { cart } from "@/db/schema";
import { Cart } from "@/types/db";
import { auth } from "@clerk/nextjs/app-beta";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { and, eq } from "drizzle-orm/expressions";

export async function GET(req: Request) {
  const { userId } = auth();

  const cartUser = await db.select().from(cart).where(eq(cart.userId, userId!));

  if (!cartUser.length) {
    return NextResponse.json([]);
  }

  return NextResponse.json(cartUser[0].items);
}

export async function POST(req: Request) {
  const { userId } = auth();
  const { id, name, image, price } = await req.json();

  const productData = {
    id: id,
    name: name,
    image: image,
    price: price,
    quantity: 1,
  };

  const cartData: Cart = {
    id: uuidv4(),
    userId: userId!,
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [productData],
  };

  const cartUser = await db.select().from(cart).where(eq(cart.userId, userId!));

  if (!cartUser.length) {
    try {
      await db.insert(cart).values(cartData).execute();
      return NextResponse.json(productData);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const cartItems = cartUser[0].items;
      const cartItem = cartItems?.find((item) => item.id === id);

      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        cartItems?.push(productData);
      }

      await db
        .update(cart)
        .set({
          items: cartItems,
          updatedAt: new Date(),
        })
        .where(eq(cart.userId, userId!))
        .execute();

      return NextResponse.json(productData);
    } catch (error) {
      console.log(error);
    }
  }
}
