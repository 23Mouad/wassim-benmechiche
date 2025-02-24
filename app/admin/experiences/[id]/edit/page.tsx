"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface Experience {
  _id: string
  company: string
  role: string
  duration: string
  location: string
  description: string
  responsibilities: string[]
  technologies: string[]
  current: boolean
}

export default function EditExperience({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [experience, setExperience] = useState<Experience | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id !== "new") {
      fetch(`/api/experiences/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setExperience(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching experience:", error)
          setLoading(false)
        })
    } else {
      setExperience({
        _id: "",
        company: "",
        role: "",
        duration: "",
        location: "",
        description: "",
        responsibilities: [""],
        technologies: [""],
        current: false,
      })
      setLoading(false)
    }
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (experience) {
      setExperience({ ...experience, [e.target.name]: e.target.value })
    }
  }

  const handleArrayChange = (index: number, field: "responsibilities" | "technologies", value: string) => {
    if (experience) {
      const newArray = [...experience[field]]
      newArray[index] = value
      setExperience({ ...experience, [field]: newArray })
    }
  }

  const addArrayItem = (field: "responsibilities" | "technologies") => {
    if (experience) {
      setExperience({ ...experience, [field]: [...experience[field], ""] })
    }
  }

  const removeArrayItem = (index: number, field: "responsibilities" | "technologies") => {
    if (experience) {
      const newArray = experience[field].filter((_, i) => i !== index)
      setExperience({ ...experience, [field]: newArray })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!experience) return

    const method = params.id === "new" ? "POST" : "PUT"
    const url = params.id === "new" ? "/api/experiences" : `/api/experiences/${params.id}`

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(experience),
    })

    if (res.ok) {
      router.push("/admin/experiences")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!experience) return null

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        {params.id === "new" ? "Add New Experience" : "Edit Experience"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="company" value={experience.company} onChange={handleChange} placeholder="Company" required />
        <Input name="role" value={experience.role} onChange={handleChange} placeholder="Role" required />
        <Input name="duration" value={experience.duration} onChange={handleChange} placeholder="Duration" required />
        <Input name="location" value={experience.location} onChange={handleChange} placeholder="Location" required />
        <Textarea
          name="description"
          value={experience.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <div>
          <Label>Responsibilities</Label>
          {experience.responsibilities.map((resp, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <Input
                value={resp}
                onChange={(e) => handleArrayChange(index, "responsibilities", e.target.value)}
                placeholder={`Responsibility ${index + 1}`}
              />
              <Button type="button" variant="outline" onClick={() => removeArrayItem(index, "responsibilities")}>
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => addArrayItem("responsibilities")} className="mt-2">
            Add Responsibility
          </Button>
        </div>
        <div>
          <Label>Technologies</Label>
          {experience.technologies.map((tech, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <Input
                value={tech}
                onChange={(e) => handleArrayChange(index, "technologies", e.target.value)}
                placeholder={`Technology ${index + 1}`}
              />
              <Button type="button" variant="outline" onClick={() => removeArrayItem(index, "technologies")}>
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => addArrayItem("technologies")} className="mt-2">
            Add Technology
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="current"
            checked={experience.current}
            onCheckedChange={(checked) => setExperience({ ...experience, current: checked })}
          />
          <Label htmlFor="current">Current Position</Label>
        </div>
        <Button type="submit">Save Experience</Button>
      </form>
    </div>
  )
}

