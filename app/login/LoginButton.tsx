"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { LoadingPage } from "../../components/loadingFunctions";

const LoginButton = () => {
  const { status } = useSession();
  const router = useRouter();

  const handleLogin = (name?: string) => {
    signIn(name, {
      redirect: false,
    })
      .then(() => router.refresh())
      .catch(console.error);
  };

  const testLogin = async () => {
    await signIn("credentials", {
      email: "test@test.com",
      username: "TestUser",
      redirect: false,
    })
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
        className="mx-auto flex gap-4 rounded-lg border border-slate-800 px-4 py-2 text-2xl transition duration-300 hover:scale-105 hover:bg-slate-800 hover:text-white"
      >
        Login with <FaGithub size={30} />
      </button>
      <button
        onClick={() => handleLogin("google")}
        className="mx-auto flex gap-4 rounded-lg border border-slate-800 px-4 py-2 text-2xl transition duration-300 hover:scale-105 hover:bg-slate-800 hover:text-white"
      >
        Login with <FcGoogle size={30} />
      </button>

      <button
        onClick={testLogin}
        className="flex gap-4 rounded-lg border border-slate-800 px-4 py-2 text-2xl transition duration-300 hover:scale-105 hover:bg-slate-800 hover:text-white"
      >
        Login as TestUser
      </button>
    </div>
  );
};

export default LoginButton;
