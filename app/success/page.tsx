import ClearCart from "./ClearCart";

export const metadata = {
  title: "Foodel - Payment successful",
};

export default function SuccessPage() {
  return (
    <div className="mt-8 flex flex-col gap-4 text-center text-2xl">
      <h1 className="text-4xl">Payment successful</h1>
      <p>Thank you for your purchase</p>
      <p>Enjoy your meal</p>
      <ClearCart />
    </div>
  );
}
