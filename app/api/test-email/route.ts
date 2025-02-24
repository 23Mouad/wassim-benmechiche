import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"

export async function GET() {
  try {
    await sendEmail(process.env.EMAIL_USER!, "Test Email", "This is a test email from your portfolio website.")
    return NextResponse.json({ message: "Test email sent successfully" })
  } catch (error) {
    console.error("Error sending test email:", error)
    return NextResponse.json({ error: "Failed to send test email" }, { status: 500 })
  }
}

