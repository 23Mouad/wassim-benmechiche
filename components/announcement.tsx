"use client"

import { useEffect, useState } from "react"

export function Announcement() {
  const [announcement, setAnnouncement] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.text) {
          setAnnouncement(data.text)
        }
      })
  }, [])

  if (!announcement) return null

  return <div className="bg-primary text-primary-foreground py-2 px-4 text-center">{announcement}</div>
}

