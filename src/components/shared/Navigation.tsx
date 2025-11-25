"use client";

import { Tickets } from "lucide-react";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { signOut } from "@/features/auth/actions/sign-out";
import { useAuth } from "@/hooks/use-auth";
import { homePath, signInPath, signUpPath, ticketsPath } from "@/paths";

import { ThemeSwitcher } from "../theme/theme-switcher";
import { buttonVariants } from "../ui/button";
import { SubmitButton } from "./SubmitButton";

const Navigation = () => {
  const { user, isFetched } = useAuth();

  if (!isFetched) return null;

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
        {user ? (
          <>
            <Link
              href={ticketsPath()}
              className={buttonVariants({ variant: "default" })}
            >
              Tickets
            </Link>
            <form action={signOut}>
              <SubmitButton label="Sign Out" icon={<LogOut />} />
            </form>
          </>
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
        )}
      </div>
    </nav>
  );
};

export default Navigation;
