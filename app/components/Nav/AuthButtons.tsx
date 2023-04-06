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
    <div>
      <SignedIn>
        <UserButton showName />
      </SignedIn>
      <SignedOut>
        <button onClick={() => openSignIn()}>Sign In</button>
      </SignedOut>
    </div>
  );
};

export default AuthButtons;
