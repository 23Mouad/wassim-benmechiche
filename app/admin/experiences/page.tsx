"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Plus, X } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Experience {
  _id?: string
  company: string
  role: string
  duration: string
  responsibilities: string[]
  order: number
}

export default function ManageExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState<Experience>({
    company: "",
    role: "",
    duration: "",
    responsibilities: [""],
    order: 0,
  })

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const res = await fetch("/api/experiences")
      const data = await res.json()
      setExperiences(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching experiences:", error)
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        toast({ title: "Success", description: "Experience added successfully" })
        setFormData({
          company: "",
          role: "",
          duration: "",
          responsibilities: [""],
          order: experiences.length,
        })
        fetchExperiences()
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
      toast({
        title: "Error",
        description: `Failed to add experience: ${errorMessage}`,
        variant: "destructive",
      })
    }
  }

  const handleUpdate = async (id: string) => {
    try {
      const res = await fetch(`/api/experiences/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        toast({ title: "Success", description: "Experience updated successfully" })
        setEditingId(null)
        fetchExperiences()
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
      toast({
        title: "Error",
        description: `Failed to update experience: ${errorMessage}`,
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return
    try {
      const res = await fetch(`/api/experiences/${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        toast({ title: "Success", description: "Experience deleted successfully" })
        fetchExperiences()
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
      toast({
        title: "Error",
        description: `Failed to delete experience: ${errorMessage}`,
        variant: "destructive",
      })
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
            />
            <Input
              placeholder="Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            />
            <Input
              placeholder="Duration (e.g., 2021 - Present)"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              required
            />
            <div className="space-y-2">
              {formData.responsibilities.map((resp, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Responsibility"
                    value={resp}
                    onChange={(e) => {
                      const newResp = [...formData.responsibilities]
                      newResp[index] = e.target.value
                      setFormData({ ...formData, responsibilities: newResp })
                    }}
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newResp = formData.responsibilities.filter((_, i) => i !== index)
                      setFormData({ ...formData, responsibilities: newResp })
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData({ ...formData, responsibilities: [...formData.responsibilities, ""] })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Responsibility
              </Button>
            </div>
            <Button type="submit">Add Experience</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <Card key={exp._id}>
            <CardContent className="pt-6">
              {editingId === exp._id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleUpdate(exp._id!)
                  }}
                  className="space-y-4"
                >
                  <Input
                    placeholder="Company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                  />
                  <div className="space-y-2">
                    {formData.responsibilities.map((resp, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="Responsibility"
                          value={resp}
                          onChange={(e) => {
                            const newResp = [...formData.responsibilities]
                            newResp[index] = e.target.value
                            setFormData({ ...formData, responsibilities: newResp })
                          }}
                          required
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const newResp = formData.responsibilities.filter((_, i) => i !== index)
                            setFormData({ ...formData, responsibilities: newResp })
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setFormData({ ...formData, responsibilities: [...formData.responsibilities, ""] })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Responsibility
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">Save</Button>
                    <Button type="button" variant="outline" onClick={() => setEditingId(null)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold">{exp.company}</h3>
                  <p className="text-muted-foreground">{exp.role}</p>
                  <p className="text-sm text-muted-foreground">{exp.duration}</p>
                  <ul className="mt-2 space-y-1">
                    {exp.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFormData(exp)
                        setEditingId(exp._id!)
                      }}
                    >
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete(exp._id!)}>
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

