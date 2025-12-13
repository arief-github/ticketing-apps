"use client";

import { Tickets } from "lucide-react";
import Link from "next/link";

import { useAuth } from "@/hooks/use-auth";
import { homePath, signInPath, signUpPath } from "@/paths";

import { ThemeSwitcher } from "../../components/theme/theme-switcher";
import { buttonVariants } from "../../components/ui/button";
import { AccountDropdown } from "./AccountDropdown";

const Navigation = () => {
  const { user, isFetched } = useAuth();

  if (!isFetched) return null;

  const navItems = user ? (
    <AccountDropdown user={user} />
  ) : (
    <>
      <Link
        href={signUpPath()}
        className={buttonVariants({ variant: "outline" })}
      >
        Sign Up
      </Link>

      <Link
        href={signInPath()}
        className={buttonVariants({ variant: "outline" })}
      >
        Sign In
      </Link>
    </>
  );

  return (
    <nav
      className="
          animate-header-from-top
          supports-backdrop-blur:bg-background/60
          fixed left-0 right-0 top-0 z-20
          border-b bg-background/95 backdrop-blur
          w-full flex py-2.5 px-5 justify-between
        "
    >
      <Link href={homePath()} className={buttonVariants({ variant: "ghost" })}>
        <Tickets />
        <h1 className="ml-2 text-lg font-semibold">TicketsHome</h1>
      </Link>
      <div className="flex items-center gap-x-1.5">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
};

export default Navigation;
