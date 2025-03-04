"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function AdminHeader() {
  return (
    <header className="bg-white border-b px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <Button
        variant="ghost"
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="flex items-center gap-2"
      >
        <LogOut size={18} />
        Logout
      </Button>
    </header>
  )
}

