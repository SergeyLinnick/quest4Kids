"use client";

export const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative inline-flex">
        <div className="bg-primary w-8 rounded-full dark:bg-gray-300"></div>
        <div className="bg-primary absolute left-0 top-0 h-8 w-8 animate-ping rounded-full dark:bg-gray-300"></div>
        <div className="bg-primary absolute left-0 top-0 h-8 w-8 animate-pulse rounded-full dark:bg-gray-300"></div>
      </div>
    </div>
  );
};
