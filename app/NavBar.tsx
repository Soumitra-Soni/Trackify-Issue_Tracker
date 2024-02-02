"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaChartBar, FaGoogle } from "react-icons/fa";
import Skeleton from "@/app/components/Skeleton";
import {
  DropdownMenu,
  Avatar,
  Box,
  Text,
  Heading,
  DropdownMenuRoot,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const NavBar = () => {
  return (
    <nav className="flex flex-col bg-slate-100 mb-10 p-10 h-screen justify- gap-20">
      <Link href="/" className="flex gap-4">
        <FaChartBar size={"2em"} />
        <Heading>TRACKIFY</Heading>
      </Link>
      <NavLinks />
      <AuthSatus />
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <div className="flex flex-col rounded-lg bg-transparent gap-10 text-lg w-full">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={`${
              link.href === currentPath ? "bg-slate-200" : "bg-transparent"
            } hover:bg-slate-300 p-3 rounded-xl transition-all duration-500`}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </div>
  );
};

const AuthSatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width={100} height={20} />;

  if (status === "unauthenticated")
    return (
      <div className="mt-auto hover:bg-slate-300 p-3 rounded-xl transition-all duration-500">
        <Link
          href="/api/auth/signin"
          className="flex flex-row text-center text-xl gap-4"
        >
          <FaGoogle size="2rem" />
          Log in
        </Link>
      </div>
    );

  return (
    <Box className="mt-auto hover:bg-slate-300 p-3 rounded-xl transition-all duration-500">
      <DropdownMenuRoot>
        <DropdownMenu.Trigger>
          <div className="flex flex-row items-center gap-5 cursor-pointer">
            <Avatar
              src={session!.user!.image!}
              fallback="?"
              size="4"
              radius="full"
            />
            <Text>{session!.user!.name}</Text>
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <Text size="4">{session!.user!.email}</Text>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenuRoot>
    </Box>
  );
};

export default NavBar;
