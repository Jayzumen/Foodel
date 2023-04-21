import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/app-beta";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { userId } = auth();

  try {
    const cart = await prisma.cart.findUnique({
      where: {
        userId: userId!,
      },
    });

    if (!cart) return NextResponse.json("No cart to delete");

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
