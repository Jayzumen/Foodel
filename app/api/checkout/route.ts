import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      success_url:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}"
          : "https://foodel-jn.vercel.app/success?session_id={CHECKOUT_SESSION_ID}",
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
