"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaChartBar } from "react-icons/fa";
import { Heading } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];
  return (
    <nav className="flex bg-slate-100 space-x-10 mb-10 p-10 h-14 items-center justify-between">
      <Link href="/" className="flex gap-4">
        <FaChartBar size={"2em"} />
        <Heading>TRACKIFY</Heading>
      </Link>
      <ul className="flex space-x-10 rounded-lg bg-transparent">
        {links.map((link) => (
          <Link
            key={link.href}
            className={`${
              link.href === currentPath ? "bg-slate-200" : "bg-transparent"
            } hover:bg-slate-300 p-3 rounded-xl transition-all duration-500`}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
