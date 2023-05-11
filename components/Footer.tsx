import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto flex h-20 flex-col items-center justify-center gap-2 border-t border-t-slate-700 py-4">
      <div className="flex gap-4">
        <Link
          aria-label="link to About page"
          className="transition duration-200 hover:text-green-500 hover:underline"
          href={"/about"}
        >
          About
        </Link>
        <Link
          aria-label="link to Impressum page"
          className="transition duration-200 hover:text-green-500 hover:underline"
          href={"/impressum"}
        >
          Impressum
        </Link>
      </div>
      <p className="text-sm text-slate-400">
        &copy; 2023 Foodel | All rights reserved
      </p>
    </footer>
  );
}
