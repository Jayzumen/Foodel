import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto flex flex-col items-center justify-center gap-2 border-t border-t-slate-700 py-4">
      <div className="flex gap-4">
        <Link className="hover:underline" href={"/about"}>
          About
        </Link>
        <Link className="hover:underline" href={"/impressum"}>
          Impressum
        </Link>
      </div>
      <p className="text-sm text-slate-400">
        &copy; 2023 Foodel | All rights reserved
      </p>
    </footer>
  );
}
