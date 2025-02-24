import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Announcement from "@/models/Announcement"

export async function GET() {
  await dbConnect()
  const announcement = await Announcement.findOne({ isActive: true }).sort({ createdAt: -1 })
  return NextResponse.json(announcement)
}

export async function POST(request: Request) {
  const body = await request.json()
  await dbConnect()
  await Announcement.updateMany({}, { isActive: false })
  const announcement = await Announcement.create({ ...body, isActive: true })
  return NextResponse.json(announcement)
}

export async function PUT(request: Request) {
  const body = await request.json()
  await dbConnect()
  const announcement = await Announcement.findByIdAndUpdate(body._id, body, { new: true })
  return NextResponse.json(announcement)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  await dbConnect()
  await Announcement.findByIdAndDelete(id)
  return NextResponse.json({ message: "Announcement deleted successfully" })
}

