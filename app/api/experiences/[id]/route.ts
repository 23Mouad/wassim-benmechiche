import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Experience from "@/models/Experience"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  await dbConnect()
  const experience = await Experience.findByIdAndUpdate(params.id, body, { new: true })
  return NextResponse.json(experience)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await dbConnect()
  await Experience.findByIdAndDelete(params.id)
  return NextResponse.json({ message: "Experience deleted successfully" })
}

