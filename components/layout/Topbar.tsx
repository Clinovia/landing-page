"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/lib/supabase/auth";

export default function Topbar() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const email = user?.email ?? "";
  const initials = email ? email.slice(0, 2).toUpperCase() : "U";

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-white">

      <div className="flex items-center gap-4">
        <div className="text-lg font-semibold text-[#1B4D3E]">
          Clinovia Workspace
        </div>

        <Link href="/#hero">
          <Button variant="ghost" size="sm">
            Home
          </Button>
        </Link>
      </div>

      {!isLoading && user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span className="hidden md:block text-sm text-gray-700">
                {email}
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>
              Signed in as
              <div className="text-xs text-gray-500">{email}</div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              Account Settings
            </DropdownMenuItem>

            <DropdownMenuItem>
              Support
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}