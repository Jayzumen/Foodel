import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const session = await stripe.checkout.sessions.listLineItems(id);
  return NextResponse.json(session.data);
}
