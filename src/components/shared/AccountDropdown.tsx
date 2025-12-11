import { User as AuthUser } from "lucia";
import { LucideLock, LucideLogOut, LucideUser } from "lucide-react";
import Link from "next/link";

import { signOut } from "@/features/auth/actions/sign-out";
import { accountPasswordPath, accountProfilePath } from "@/paths";

import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SubmitButton } from "./SubmitButton";

type AccountDropdownProps = {
  user: AuthUser;
};

const AccountDropdown = ({ user }: AccountDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback>
            {user.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={accountProfilePath()}>
            <LucideUser className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={accountPasswordPath()}>
            <LucideLock className="mr-2 h-4 w-4" />
            <span>Change Password</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <form action={signOut}>
            <SubmitButton label="Sign Out" icon={<LucideLogOut />} />
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { AccountDropdown };
