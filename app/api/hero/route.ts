import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import HeroSection from "@/models/HeroSection"
import { uploadToCloudinary } from "@/lib/server-utils"

export async function POST(request: Request) {
  const formData = await request.formData()
  const image = formData.get("image") as File | null

  let imagePath = ""
  if (image) {
    try {
      const result = await uploadToCloudinary(image, "hero")
      imagePath = result.secure_url
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

