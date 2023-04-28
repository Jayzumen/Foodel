import ClearCart from "./ClearCart";
import { redirect } from "next/navigation";
import OrderDetails from "./OrderDetails";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const metadata = {
  title: "Foodel - Payment successful",
};

export default async function SuccessPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="mt-8 flex flex-col gap-4 text-center text-2xl">
      <h1 className="text-4xl">Payment successful</h1>
      <OrderDetails />
      <p>Thank you for your purchase</p>
      <p>Enjoy your meal</p>
      <ClearCart session={session} />
    </div>
  );
}
