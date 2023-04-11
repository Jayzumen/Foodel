import CartItem from "./CartItem";
import CheckOutButton from "./CheckOutButton";
import { Cart } from "@/types/db";

const CartItemDisplay = ({ cartItems }: { cartItems: Cart[] }) => {
  return (
    <div className="my-4 flex flex-col items-center gap-4">
      {!cartItems[0] ? (
        <p className="text-center text-2xl">Your cart is empty</p>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-8 px-10 py-4">
            {cartItems[0]?.items?.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <CheckOutButton cartItems={cartItems} />
        </>
      )}
    </div>
  );
};

export default CartItemDisplay;
