"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "../loadingFunctions";
import CartLink from "./CartLink";
import { User } from "next-auth";

const AuthLinks = () => {
  const { data: session, status } = useSession();
  const user = session?.user as User;

  const router = useRouter();

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
        <div className="flex items-center gap-6">
          <CartLink user={user} />
          <button
            className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-xl font-bold text-transparent hover:text-green-400 md:text-2xl"
            onClick={handleSignOut}
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-xl font-bold text-transparent hover:text-green-400 md:text-2xl"
          href={"/login"}
        >
          Login
        </Link>
      )}
    </>
  );
};

export default AuthLinks;
