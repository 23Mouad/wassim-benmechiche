import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // If the user is authenticated and trying to access login page,
    // redirect them to admin dashboard
    if (req.nextUrl.pathname === "/admin/login" && req.nextauth.token) {
      return NextResponse.redirect(new URL("/admin", req.url))
    }
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Only require auth for admin routes, except the login page
        if (req.nextUrl.pathname.startsWith("/admin") && req.nextUrl.pathname !== "/admin/login") {
          return !!token
        }
        return true
      },
    },
  },
)

export const config = {
  matcher: ["/admin/:path*"],
}

