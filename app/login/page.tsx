import LoginButton from "./LoginButton";

export const metadata = {
  title: "Foodel | Login",
  description: "Login to Foodel",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-8 px-8 pt-24">
      <h1 className="text-4xl font-semibold">Login</h1>
      <LoginButton />
    </div>
  );
}
