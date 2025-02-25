import { NextResponse } from "next/server"
// import { sendEmail } from "@/lib/email" // No need to import anymore

export async function GET() {
  try {
    // Remove or comment out the email sending function
    // await sendEmail(process.env.EMAIL_USER!, "Test Email", "This is a test email from your portfolio website.")

    return NextResponse.json({ message: "Email sending is disabled" })
  } catch (error) {
    console.error("Error sending test email:", error)
    return NextResponse.json({ error: "Failed to execute email logic" }, { status: 500 })
  }
}
