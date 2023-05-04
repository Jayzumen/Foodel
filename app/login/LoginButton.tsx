"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { LoadingPage } from "../../components/loadingFunctions";

const LoginButton = () => {
  const { status } = useSession();
  const router = useRouter();

  const handleLogin = (name: string) => {
    signIn(name)
      .then(() => router.refresh())
      .catch(console.error);
  };

  if (status === "loading") {
    return <LoadingPage />;
  }

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="flex flex-col gap-6">
      <button
        onClick={() => handleLogin("github")}
        className="flex gap-4 rounded-lg border px-4 py-2 text-2xl transition duration-300 hover:scale-105"
      >
        Login with <FaGithub size={30} />
      </button>
      <button
        onClick={() => handleLogin("google")}
        className="flex gap-4 rounded-lg border px-4 py-2 text-2xl transition duration-300 hover:scale-105"
      >
        Login with <FcGoogle size={30} />
      </button>
    </div>
  );
};

export default LoginButton;
