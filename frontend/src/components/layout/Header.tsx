"use client";

import { logout } from "@/lib/api/auth";
import { useSession } from "@/lib/context/session/provider";
import { SessionStatus } from "@/lib/context/session/type";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import LogoutButton from "../forms/Logout";

export default function Header() {
  const currentPath = usePathname();
  const isActive = (path: string) => path === currentPath;
  const session = useSession();
  return (
    <div className="w-full z-50 bg-neutral-50/75 backdrop-blur-sm sticky top-0 left-0 border-b border-b-input inline-flex items-center justify-between px-2 md:px-8 py-2">
      <Link href="/">
        <h1 className="font-bold text-2xl">FnD.</h1>
      </Link>

      <nav className="inline-flex items-center gap-4">
        {session.status === SessionStatus.Authenticated ? (
          <>
            <Link
              className={twMerge(
                "text-sm hover:underline underline-offset-4",
                isActive("/seller") &&
                  "font-medium underline underline-offset-4"
              )}
              href="/seller"
            >
              Dashboard
            </Link>

            <form action={logout}>
              <LogoutButton />
            </form>
          </>
        ) : session.status === SessionStatus.Pending ? (
          <Loader2Icon className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Link
              className={twMerge(
                "text-sm hover:underline underline-offset-4",
                isActive("/auth/login") &&
                  "font-medium underline underline-offset-4"
              )}
              href="/auth/login"
            >
              Masuk
            </Link>
            <Link
              className={twMerge(
                "text-sm hover:underline underline-offset-4",
                isActive("/auth/register") &&
                  "font-medium underline underline-offset-4"
              )}
              href="/auth/register"
            >
              Daftar
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}
