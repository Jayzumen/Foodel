import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export const metadata = {
  title: "Foodel - Impressum",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
      <div className="sm:align-center sm:flex sm:flex-col">
        <h2 className="text-center text-3xl font-extrabold sm:text-4xl">
          Impressum
        </h2>
      </div>
      <div className="mx-auto mt-10 flex flex-col gap-4 text-gray-400">
        <p>
          This website uses images from{" "}
          <Link
            target="_blank"
            aria-label="Link to Unsplash.com"
            className="text-sky-600 hover:underline"
            href={"https://unsplash.com/"}
          >
            Unsplash.com
          </Link>
          , a website that provides free, high-quality images for personal and
          commercial use. The images used on this website are licensed under the
          Unsplash License, which allows for free use, modification, and
          distribution without attribution.
        </p>
        <p>
          Foodel is a fictitious brand created for educational purposes only.
          This website and its content are not affiliated with any real
          restaurant or food service provider.
        </p>
        <p className="flex gap-2">
          This website is a project created by{" "}
          <span className="font-semibold italic">Jan-Niklas Reinhardt</span>
          <Link
            target="_blank"
            className="hover:text-white"
            aria-label="Link to Github"
            href={"https://github.com/Jayzumen"}
          >
            <FaGithub size={25} />
          </Link>
        </p>
      </div>
    </div>
  );
}
