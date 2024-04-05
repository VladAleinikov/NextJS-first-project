"use client";
import { IMenuItem } from "@/types/navbar";
import { useRouter } from "next/navigation";
import React from "react";

const menuItems: IMenuItem[] = [
  { text: "Главная", href: "/" },
  { text: "Список треков", href: "/tracks" },
  { text: "Список альбомов", href: "/albums" },
];
const Navbar = () => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
      <div className="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
        <nav className="text-md leading-6 font-semibold text-slate-700 dark:text-slate-200">
          <ul className="flex space-x-8">
            {menuItems.map(({ text, href }) => (
              <li key={href}>
                <button
                  className="hover:text-sky-500 dark:hover:text-sky-400 ease-in-out duration-300"
                  onClick={() => router.push(href)}
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
