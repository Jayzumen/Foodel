import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

export const LoadingPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
      <BiLoaderCircle size={150} className="animate-spin text-green-500" />
    </div>
  );
};

export const LoadingSpinner = ({ size }: { size: number }) => {
  return (
    <div className="flex items-center">
      <BiLoaderCircle size={size} className="animate-spin text-green-500" />
    </div>
  );
};
