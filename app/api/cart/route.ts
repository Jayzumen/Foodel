import { prisma } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

// Need to use PUT instead of DELETE because of Next problem
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  try {
    const cart = await prisma.cart.findUnique({
      where: {
        userId: user?.email!,
      },
    });

    if (!cart) return NextResponse.json("No cart to delete");

    await prisma.cart.delete({
      where: {
        userId: user?.email!,
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
