import { db } from "@/db/db";
import { cart } from "@/db/schema";
import { auth } from "@clerk/nextjs/app-beta";
import { eq } from "drizzle-orm/expressions";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();

  const cartUser = await db.select().from(cart).where(eq(cart.userId, userId!));

  if (!cartUser.length) {
    return NextResponse.json([]);
  }

  const cartItems = cartUser[0].items;

  const cartItem = cartItems?.find((item) => item.id === params.id);

  if (cartItem) {
    cartItem.quantity += 1;
  }

  const updatedCartItems = cartItems?.filter((item) => item.quantity > 0);

  try {
    await db.update(cart).set({
      items: updatedCartItems,
      updatedAt: new Date(),
    });

    return NextResponse.json(updatedCartItems);
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();

  const cartUser = await db.select().from(cart).where(eq(cart.userId, userId!));

  if (!cartUser.length) {
    return NextResponse.json([]);
  }

  const cartItems = cartUser[0].items;
  const cartItem = cartItems?.find((item) => item.id === params.id);

  if (cartItem) {
    cartItem.quantity -= 1;
  }
  const updatedCartItems = cartItems?.filter((item) => item.quantity > 0);

  try {
    await db.update(cart).set({
      items: updatedCartItems,
      updatedAt: new Date(),
    });

    return NextResponse.json(updatedCartItems);
  } catch (error) {
    console.log(error);
  }
}
