"use client";

import { CalendarDays, DoorOpen, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { safeFetch } from "@/helpers/utils";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/helpers/config";

function TopNav({ user }: { user: User }) {
  const [loading, setLoading] = useState(false);
  const r = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await safeFetch("/api/auth/logout", {
        method: "POST",
        body: JSON.stringify({}),
      });
      r.push("/login");
    } catch (e: any) {
      setError("Could not Logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DoorOpen className="h-5 w-5" />
          <span className="font-semibold tracking-tight">Campus Rooms</span>
          <Badge variant="outline" className="ml-2">
            MVP
          </Badge>
        </div>
        <div className="hidden md:flex items-center gap-2">
          {/* <Button variant="ghost" size="sm" className="gap-2">
            <CalendarDays className="h-4 w-4" />
            Calendar
          </Button> */}
          {/* <Button variant="ghost" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Admin
          </Button> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full p-0"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="./none.png" alt="User" />
                  <AvatarFallback>
                    {user.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default TopNav;
