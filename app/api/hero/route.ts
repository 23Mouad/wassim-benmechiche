import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import dbConnect from "@/lib/mongodb"
import HeroSection from "@/models/HeroSection"

export async function GET() {
  await dbConnect()
  const heroSection = await HeroSection.findOne()
  if (!heroSection) {
    // Return default values if no hero section exists
    return NextResponse.json({
      image: "/placeholder.svg",
    })
  }
  return NextResponse.json(heroSection)
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const image = formData.get("image") as File | null

  let imagePath = ""
  if (image) {
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filename = `${Date.now()}-${image.name}`
    const uploadDir = join(process.cwd(), "public", "uploads")

    try {
      await writeFile(join(uploadDir, filename), buffer)
      imagePath = `/uploads/${filename}`
    } catch (error) {
      console.error("Error saving image:", error)
      return NextResponse.json({ error: "Failed to save image" }, { status: 500 })
    }
  }

  await dbConnect()
  const heroSection = await HeroSection.findOneAndUpdate(
    {},
    {
      ...(imagePath && { image: imagePath }),
    },
    { upsert: true, new: true },
  )

  return NextResponse.json(heroSection)
}

