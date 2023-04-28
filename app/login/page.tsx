import LoginButton from "./LoginButton";

export default function LoginPage() {
  return (
    <div className="mt-24 flex min-h-[calc(100vh-80px)] flex-col items-center gap-8 px-8">
      <h1 className="text-4xl font-semibold">Login</h1>
      <LoginButton />
    </div>
  );
}
