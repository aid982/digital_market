"use client";

import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { User } from "@/payload-types";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
type Props = {
    user:User
};

const UserAccountNav = (props: Props) => {
  const {signOut} = useAuth();  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button variant="ghost" size="sm" className="relative">
           My Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <div className="flex  gap-2 p-2">
            <div className="flex flex-col space-y-0.5 leading-none">
                <p className="font-medium text-sm text-black">{props.user.email}</p>

            </div>

        </div>
        <DropdownMenuSeparator/>
        <DropdownMenuItem className="">
            <Link href={'/sell'}>Seller Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
            Log out
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
