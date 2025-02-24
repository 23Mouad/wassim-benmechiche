import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Message from "@/models/Message"

export async function GET() {
  await dbConnect()
  const messages = await Message.find().sort({ createdAt: -1 })
  return NextResponse.json(messages)
}

export async function POST(request: Request) {
  const body = await request.json()
  await dbConnect()
  const message = await Message.create(body)
  return NextResponse.json(message)
}

export async function PUT(request: Request) {
  const { id, read } = await request.json()
  await dbConnect()
  const message = await Message.findByIdAndUpdate(id, { read }, { new: true })
  return NextResponse.json(message)
}

