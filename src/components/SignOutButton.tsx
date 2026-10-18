"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="bg-slate-700 px-3 py-1 rounded hover:bg-slate-600">
      Выйти
    </button>
  );
}