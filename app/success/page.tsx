import { currentUser } from "@clerk/nextjs/app-beta";
import ClearCart from "./ClearCart";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Foodel - Payment successful",
};

export default async function SuccessPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="mt-8 flex flex-col gap-4 text-center text-2xl">
      <h1 className="text-4xl">Payment successful</h1>

      <p>Thank you for your purchase</p>
      <p>Enjoy your meal</p>
      <ClearCart user={user} />
    </div>
  );
}
