import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Project from "@/models/Project"
import { uploadToCloudinary } from "@/lib/server-utils"
import cloudinary from "@/lib/cloudinary"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect()
  const project = await Project.findById(params.id)

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 })
  }

  return NextResponse.json(project)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const formData = await request.formData()
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const github = formData.get("github") as string
  const playstore = formData.get("playstore") as string
  const tags = JSON.parse(formData.get("tags") as string) as string[]
  const backgroundColor = formData.get("backgroundColor") as string
  const existingImages = JSON.parse(formData.get("existingImages") as string)
  const newImages = formData.getAll("newImages") as File[]
  const primaryImageIndex = Number.parseInt(formData.get("primaryImageIndex") as string)

  await dbConnect()
  const project = await Project.findById(params.id)

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 })
  }

  // Handle existing images
  const updatedImages = existingImages.map((image: { path: string }, index: number) => ({
    path: image.path,
    isPrimary: index === primaryImageIndex,
  }))

  // Handle new images
  for (const image of newImages) {
    const result = await uploadToCloudinary(image)
    updatedImages.push({
      path: result.secure_url,
      isPrimary: updatedImages.length === primaryImageIndex,
    })
  }

  // Update project
  project.title = title
  project.description = description
  project.github = github
  project.playstore = playstore
  project.tags = tags
  project.backgroundColor = backgroundColor
  project.images = updatedImages
  project.updatedAt = new Date()

  await project.save()

  return NextResponse.json(project)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await dbConnect()
  const project = await Project.findById(params.id)

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 })
  }

  // Delete associated image files from Cloudinary
  for (const image of project.images) {
    const publicId = image.path.split("/").pop()?.split(".")[0]
    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId)
        console.log(`Deleted image ${publicId} from Cloudinary`)
      } catch (error) {
        console.error(`Failed to delete image ${publicId} from Cloudinary:`, error)
      }
    }
  }

  await Project.findByIdAndDelete(params.id)
  return NextResponse.json({ message: "Project and associated images deleted successfully" })
}

