"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Plus, X } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

interface ProjectImage {
  _id?: string
  path: string
  isPrimary: boolean
}

interface Project {
  _id: string
  title: string
  description: string
  github: string
  playstore: string
  images: ProjectImage[]
  tags: string[]
  backgroundColor: string
}

interface NewImage {
  file: File
  preview: string
}

export default function EditProject({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [newImages, setNewImages] = useState<NewImage[]>([])
  const [hasGithub, setHasGithub] = useState(false)
  const [hasPlaystore, setHasPlaystore] = useState(false)
  const [primaryImageIndex, setPrimaryImageIndex] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [backgroundColor, setBackgroundColor] = useState("#f5f5f5")

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${params.id}`)
        if (!res.ok) throw new Error("Failed to fetch project")
        const data = await res.json()
        setProject(data)
        setHasGithub(!!data.github)
        setHasPlaystore(!!data.playstore)
        setPrimaryImageIndex(data.images.findIndex((img: ProjectImage) => img.isPrimary))
        setTags(data.tags || [])
        setBackgroundColor(data.backgroundColor || "#f5f5f5")
      } catch (error) {
        console.error("Error fetching project:", error)
        toast({
          title: "Error",
          description: "Failed to load project. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (project) {
      setProject({ ...project, [e.target.name]: e.target.value })
    }
  }

  const handleNewImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImageFiles = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }))
      setNewImages([...newImages, ...newImageFiles])
    }
  }

  const removeExistingImage = (index: number) => {
    if (project) {
      const newImages = project.images.filter((_, i) => i !== index)
      setProject({ ...project, images: newImages })
      if (primaryImageIndex === index) {
        setPrimaryImageIndex(0)
      } else if (primaryImageIndex > index) {
        setPrimaryImageIndex(primaryImageIndex - 1)
      }
    }
  }

  const removeNewImage = (index: number) => {
    const updatedNewImages = newImages.filter((_, i) => i !== index)
    setNewImages(updatedNewImages)
    if (project && primaryImageIndex === project.images.length + index) {
      setPrimaryImageIndex(0)
    }
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault()
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()])
      }
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!project) return
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("title", project.title)
    formData.append("description", project.description)
    if (hasGithub) formData.append("github", project.github)
    if (hasPlaystore) formData.append("playstore", project.playstore)
    formData.append("backgroundColor", backgroundColor)
    formData.append("tags", JSON.stringify(tags))
    formData.append("existingImages", JSON.stringify(project.images))
    formData.append("primaryImageIndex", primaryImageIndex.toString())

    newImages.forEach((image) => {
      formData.append("newImages", image.file)
    })

    try {
      const res = await fetch(`/api/projects/${params.id}`, {
        method: "PUT",
        body: formData,
      })
      if (!res.ok) throw new Error("Failed to update project")

      toast({
        title: "Success",
        description: "Project updated successfully",
      })
      router.push("/admin/projects")
    } catch (error) {
      console.error("Error updating project:", error)
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!project) return <div>Project not found</div>

  const totalImages = project.images.length + newImages.length

  return (
    <Card>
      <CardContent className="pt-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Edit Project</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input name="title" value={project.title} onChange={handleChange} placeholder="Project Title" required />
            <Textarea
              name="description"
              value={project.description}
              onChange={handleChange}
              placeholder="Project Description"
              required
            />
          </div>

          {/* Tags Input */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Input
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Type a tag and press Enter"
            />
          </div>

          {/* Color Picker */}
          <div className="space-y-2">
            <Label>Background Color</Label>
            <Input type="color" value={backgroundColor} onChange={handleColorChange} className="h-10 w-20" />
          </div>

          {/* Existing Images */}
          <div className="space-y-4">
            <Label>Images</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.images.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image src={image.path || "/placeholder.svg"} alt="Project image" fill className="object-cover" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <RadioGroup
                      value={primaryImageIndex.toString()}
                      onValueChange={(value) => setPrimaryImageIndex(Number.parseInt(value))}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={index.toString()}
                          id={`primary-existing-${index}`}
                          className="bg-white"
                        />
                        <Label htmlFor={`primary-existing-${index}`} className="text-white">
                          Primary
                        </Label>
                      </div>
                    </RadioGroup>
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeExistingImage(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {/* New Images */}
              {newImages.map((image, index) => (
                <div key={`new-${index}`} className="relative group">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={image.preview || "/placeholder.svg"}
                      alt="New image preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <RadioGroup
                      value={primaryImageIndex.toString()}
                      onValueChange={(value) => setPrimaryImageIndex(Number.parseInt(value))}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={(project.images.length + index).toString()}
                          id={`primary-new-${index}`}
                          className="bg-white"
                        />
                        <Label htmlFor={`primary-new-${index}`} className="text-white">
                          Primary
                        </Label>
                      </div>
                    </RadioGroup>
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeNewImage(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {totalImages < 6 && (
                <div className="relative aspect-video rounded-lg border-2 border-dashed flex items-center justify-center">
                  <Input
                    type="file"
                    onChange={handleNewImageUpload}
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    multiple
                  />
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="github-switch" checked={hasGithub} onCheckedChange={setHasGithub} />
              <Label htmlFor="github-switch">Has GitHub Link</Label>
            </div>
            {hasGithub && (
              <Input name="github" value={project.github} onChange={handleChange} placeholder="GitHub URL" />
            )}

            <div className="flex items-center space-x-2">
              <Switch id="playstore-switch" checked={hasPlaystore} onCheckedChange={setHasPlaystore} />
              <Label htmlFor="playstore-switch">Has Play Store Link</Label>
            </div>
            {hasPlaystore && (
              <Input name="playstore" value={project.playstore} onChange={handleChange} placeholder="Play Store URL" />
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/projects")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

