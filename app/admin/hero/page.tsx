"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface HeroSection {
  _id?: string
  image: string
}

export default function EditHeroSection() {
  const router = useRouter()
  const [heroSection, setHeroSection] = useState<HeroSection>({
    image: "/placeholder.svg",
  })
  const [newImage, setNewImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => {
        setHeroSection({ image: data.image })
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching hero section:", error)
        setLoading(false)
      })
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setNewImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const formData = new FormData()
    if (newImage) {
      formData.append("image", newImage)
    }

    try {
      const res = await fetch("/api/hero", {
        method: "POST",
        body: formData,
      })
      if (res.ok) {
        toast({
          title: "Success",
          description: "Hero image updated successfully",
        })
        router.push("/admin")
      } else {
        throw new Error("Failed to update hero image")
      }
    } catch (error) {
      console.error("Error updating hero image:", error)
      toast({
        title: "Error",
        description: "Failed to update hero image",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Edit Hero Image</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Profile Image</h3>
            <div className="relative w-48 h-48 mb-4">
              <Image src={imagePreview || heroSection.image} alt="Hero" fill className="rounded-full object-cover" />
            </div>
            <input type="file" onChange={handleImageChange} accept="image/*" className="mb-4" />
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? (
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

