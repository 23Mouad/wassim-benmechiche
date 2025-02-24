"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Project {
  _id: string
  title: string
  description: string
}

export default function ManageProjects() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
  }, [])

  const deleteProject = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" })
      if (res.ok) {
        setProjects(projects.filter((project) => project._id !== id))
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Manage Projects</h1>
        <Button asChild>
          <Link href="/admin/projects/new">Add New Project</Link>
        </Button>
      </div>
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
    </div>
  )
}

