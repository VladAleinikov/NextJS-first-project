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
    <div>
      {menuItems.map(({ text, href }) => (
        <button key={href} onClick={() => router.push(href)}>
          {text}
        </button>
      ))}
    </div>
  );
};

export default Navbar;
