import { prisma } from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/app-beta";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId } = auth();

  const cartData = await prisma.cart.findFirst({
    where: {
      userId: userId!,
    },
  });

  return NextResponse.json(cartData);
}

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      success_url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/success"
          : "https://foodel-jn.vercel.app/success",
      cancel_url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/cart"
          : "https://foodel-jn.vercel.app/cart",
      line_items: body.lineItems,
      mode: "payment",
    });
    return NextResponse.json({ session });
  } catch (err) {
    console.log(err);
    return new Response("Error", {
      status: 405,
    });
  }
}

export async function DELETE(req: Request) {
  const { userId } = auth();

  try {
    await prisma.cart.delete({
      where: {
        userId: userId!,
      },
    });
    return NextResponse.json("Deleted");
  } catch (err) {
    console.log(err);
    return new Response("Error", {
      status: 405,
    });
  }
}
