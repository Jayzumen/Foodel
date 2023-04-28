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
          <button className="hover:underline" onClick={handleSignOut}>
            Logout
          </button>
        </div>
      ) : (
        <Link className="hover:underline" href={"/login"}>
          Login
        </Link>
      )}
    </>
  );
};

export default AuthLinks;
