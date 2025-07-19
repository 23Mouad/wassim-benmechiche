import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Announcement } from "@/components/announcement"
import { Suspense } from "react"
import Loading from "./loading"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wassim Benmachiche - Flutter Developer",
  description:
    "Portfolio of Wassim Benmachiche, a skilled Flutter app developer building scalable and beautiful mobile applications.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Announcement />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

