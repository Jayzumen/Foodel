"use client";

import {
  SignedIn,
  SignedOut,
  UserButton,
  useClerk,
} from "@clerk/nextjs/app-beta/client";

const AuthButtons = () => {
  const { openSignIn } = useClerk();
  return (
    <div className="pl-4">
      <SignedIn>
        <UserButton
          afterSignOutUrl={
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000/"
              : "https://foodel-jn.vercel.app/"
          }
        />
      </SignedIn>
      <SignedOut>
        <button onClick={() => openSignIn()}>Sign In</button>
      </SignedOut>
    </div>
  );
};

export default AuthButtons;
