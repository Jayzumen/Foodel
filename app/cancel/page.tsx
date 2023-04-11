import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="flex flex-col items-center gap-4 text-xl">
      <h1>Payment cancelled</h1>
      <Link href={"/cart"}>Go back to Cart</Link>
    </div>
  );
}
