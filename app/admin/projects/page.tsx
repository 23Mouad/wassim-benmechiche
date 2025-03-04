"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"

interface Project {
  _id: string
  title: string
  description: string
}

export default function ManageProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects")
      if (!res.ok) {
        throw new Error("Failed to fetch projects")
      }
      const data = await res.json()
      setProjects(data)
    } catch (error) {
      console.error("Error fetching projects:", error)
      toast({
        title: "Error",
        description: "Failed to load projects. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteProject = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const res = await fetch(`/api/projects/${id}`, { method: "DELETE" })
        if (!res.ok) {
          throw new Error("Failed to delete project")
        }
        setProjects(projects.filter((project) => project._id !== id))
        toast({
          title: "Success",
          description: "Project deleted successfully",
        })
      } catch (error) {
        console.error("Error deleting project:", error)
        toast({
          title: "Error",
          description: "Failed to delete project. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Manage Projects</h1>
        <Button asChild>
          <Link href="/admin/projects/new">Add New Project</Link>
        </Button>
      </div>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project._id}>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.description.substring(0, 100)}...</TableCell>
                <TableCell>
                  <Button asChild variant="outline" className="mr-2">
                    <Link href={`/admin/projects/${project._id}/edit`}>Edit</Link>
                  </Button>
                  <Button variant="destructive" onClick={() => deleteProject(project._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

