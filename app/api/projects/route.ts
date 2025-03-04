import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Project from "@/models/Project"
import { uploadToCloudinary } from "@/lib/server-utils"

export async function GET() {
  try {
    await dbConnect()
    const projects = await Project.find().sort({ createdAt: -1 })
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const github = formData.get("github") as string
    const playstore = formData.get("playstore") as string
    const tags = JSON.parse(formData.get("tags") as string) as string[]
    const backgroundColor = formData.get("backgroundColor") as string
    const images = formData.getAll("images") as File[]
    const primaryImageIndex = Number.parseInt(formData.get("primaryImageIndex") as string)

    const projectImages = []

    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      const result = await uploadToCloudinary(image)
      projectImages.push({
        path: result.secure_url,
        isPrimary: i === primaryImageIndex,
      })
    }

    await dbConnect()
    const project = await Project.create({
      title,
      description,
      github,
      playstore,
      tags,
      backgroundColor,
      images: projectImages,
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}

