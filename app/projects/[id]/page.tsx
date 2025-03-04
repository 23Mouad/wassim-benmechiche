import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Github, PlayIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import dbConnect from "@/lib/mongodb"
import Project from "@/models/Project"

interface ProjectImage {
  path: string
  isPrimary: boolean
}

interface Project {
  _id: string
  title: string
  description: string
  tags: string[]
  images: ProjectImage[]
  github?: string
  playstore?: string
  backgroundColor: string
}

async function getProject(id: string) {
  await dbConnect()
  try {
    const project = await Project.findById(id).lean()
    if (!project) return null
    return JSON.parse(JSON.stringify(project))
  } catch (error) {
    console.error("Error fetching project:", error)
    return null
  }
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project: Project | null = await getProject(params.id)

  if (!project) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              <div className="flex justify-center gap-2 mb-4">
                {project.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-lg text-muted-foreground">{project.description}</p>
            </div>

            {/* Main Image */}
            <div className="mb-8 p-8 rounded-3xl overflow-hidden" style={{ backgroundColor: project.backgroundColor }}>
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                <Image
                  src={project.images?.find((img: ProjectImage) => img.isPrimary)?.path || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {project.images
                ?.filter((img: ProjectImage) => !img.isPrimary)
                .map((image: ProjectImage, index: number) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-xl overflow-hidden"
                    style={{ backgroundColor: project.backgroundColor }}
                  >
                    <Image src={image.path || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                  </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4">
              {project.github && (
                <Button asChild size="lg">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Github className="mr-2 h-5 w-5" />
                    View on GitHub
                  </a>
                </Button>
              )}
              {project.playstore && (
                <Button asChild size="lg" variant="outline">
                  <a href={project.playstore} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <PlayIcon className="mr-2 h-5 w-5" />
                    Get on Play Store
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

