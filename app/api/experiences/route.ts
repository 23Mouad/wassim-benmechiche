import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Experience from "@/models/Experience"

export async function GET() {
  await dbConnect()
  const experiences = await Experience.find().sort({ order: 1 })
  return NextResponse.json(experiences)
}

export async function POST(request: Request) {
  const body = await request.json()
  await dbConnect()
  const experience = await Experience.create(body)
  return NextResponse.json(experience)
}

