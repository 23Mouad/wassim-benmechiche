import { NextResponse } from "next/server"
import { sendAdminNotification, sendUserConfirmation } from "@/lib/email"
import dbConnect from "@/lib/mongodb"
import Message from "@/models/Message"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Save message to database
    await dbConnect()
    const savedMessage = await Message.create({ name, email, message })

    // Send emails
    await Promise.all([sendAdminNotification(name, email, message), sendUserConfirmation(name, email)])

    return NextResponse.json({
      message: "Message sent successfully",
      id: savedMessage._id,
    })
  } catch (error) {
    console.error("Error processing message:", error)
    return NextResponse.json({ error: "Failed to process message. Please try again later." }, { status: 500 })
  }
}

