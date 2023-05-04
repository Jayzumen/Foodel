"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "../loadingFunctions";
import CartLink from "./CartLink";
import { User } from "next-auth";
import { useNavMenu } from "@/stores/navMenu";

const AuthLinks = () => {
  const { data: session, status } = useSession();
  const user = session?.user as User;

  const router = useRouter();
  const menuStore = useNavMenu();

  const handleSignOut = () => {
    signOut()
      .then(() => router.refresh())
      .catch(console.error);
  };
  return (
    <>
      {status === "loading" ? (
        <LoadingSpinner size={25} />
      ) : status === "authenticated" ? (
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <CartLink user={user} />
          <button
            className="font-bold transition duration-200 hover:text-green-500 hover:underline"
            onClick={() => {
              handleSignOut;
              menuStore.toggle();
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          className="font-bold transition duration-200 hover:text-green-500 hover:underline"
          href={"/login"}
          onClick={() => menuStore.toggle()}
        >
          Login
        </Link>
      )}
    </>
  );
};

export default AuthLinks;
