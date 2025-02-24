import type React from "react"
import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { AdminHeader } from "@/components/admin-header"
import { LayoutDashboard, FolderKanban, Image, MessageSquare, Briefcase } from "lucide-react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold">Portfolio Admin</h2>
        </div>
        <nav className="mt-5 px-2 space-y-1">
          <Link
            href="/admin"
            className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-900 hover:text-gray-900 hover:bg-gray-50"
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/admin/projects"
            className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <FolderKanban className="mr-3 h-5 w-5" />
            Manage Projects
          </Link>
          <Link
            href="/admin/experiences"
            className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <Briefcase className="mr-3 h-5 w-5" />
            Manage Experience
          </Link>
          <Link
            href="/admin/hero"
            className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <Image className="mr-3 h-5 w-5"  />
            Edit Hero Section
          </Link>
          <Link
            href="/admin/messages"
            className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <MessageSquare className="mr-3 h-5 w-5" />
            Messages
          </Link>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

