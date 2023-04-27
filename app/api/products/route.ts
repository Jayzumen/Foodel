import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (err) {
    console.log(err);
    return new Response("Error", {
      status: 405,
    });
  }
}
