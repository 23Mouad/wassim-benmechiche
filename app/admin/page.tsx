"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderKanban, Mail, GitPullRequest } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Announcement {
  _id: string
  text: string
  isActive: boolean
}

export default function AdminDashboard() {
  const [announcement, setAnnouncement] = useState("")
  const [projectCount, setProjectCount] = useState(0)
  const [currentAnnouncement, setCurrentAnnouncement] = useState<Announcement | null>(null)

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjectCount(data.length))

    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => setCurrentAnnouncement(data))
  }, [])

  const handleAnnouncementSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: announcement }),
    })
    if (res.ok) {
      const data = await res.json()
      setCurrentAnnouncement(data)
      setAnnouncement("")
    }
  }

  const handleAnnouncementEdit = async () => {
    if (!currentAnnouncement) return
    const res = await fetch("/api/announcements", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentAnnouncement),
    })
    if (res.ok) {
      const data = await res.json()
      setCurrentAnnouncement(data)
    }
  }

  const handleAnnouncementDelete = async () => {
    if (!currentAnnouncement) return
    const res = await fetch("/api/announcements", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: currentAnnouncement._id }),
    })
    if (res.ok) {
      setCurrentAnnouncement(null)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard Overview</h1>
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Deployments</CardTitle>
            <GitPullRequest className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Received</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Announcement</CardTitle>
        </CardHeader>
        <CardContent>
          {currentAnnouncement ? (
            <div className="space-y-4">
              <Textarea
                value={currentAnnouncement.text}
                onChange={(e) => setCurrentAnnouncement({ ...currentAnnouncement, text: e.target.value })}
                placeholder="Edit announcement text"
                required
              />
              <div className="flex space-x-2">
                <Button onClick={handleAnnouncementEdit}>Update Announcement</Button>
                <Button variant="destructive" onClick={handleAnnouncementDelete}>
                  Delete Announcement
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
              <Input
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                placeholder="Enter announcement text"
                required
              />
              <Button type="submit">Set Announcement</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

