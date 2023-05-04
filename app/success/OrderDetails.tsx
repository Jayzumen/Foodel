"use client";
import Stripe from "stripe";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { LoadingSpinner } from "../../components/loadingFunctions";

const OrderDetails = () => {
  const searchParams = useSearchParams();

  const sessionId = searchParams?.get("session_id");

  async function getOrderDetails() {
    try {
      const response = await fetch(`/api/checkout/${sessionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const {
    data: orderDetails,
    status,
    error,
  } = useQuery<Stripe.LineItem[], Error>(
    ["orderDetails", sessionId],
    getOrderDetails
  );

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="mx-auto flex w-fit justify-center gap-4 rounded-lg border border-green-500 p-4">
      <p>Your Order:</p>
      <div className="flex flex-col justify-center gap-4 px-10 py-4">
        {status === "loading" ? (
          <LoadingSpinner size={100} />
        ) : (
          orderDetails?.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <p className="text-xl font-semibold">{item.quantity}x</p>
              <p className="text-xl">{item.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
