"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

interface Message {
  _id: string
  name: string
  email: string
  message: string
  createdAt: string
  read: boolean
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
  }, [])

  const handleReadToggle = async (id: string, read: boolean) => {
    const res = await fetch("/api/messages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read }),
    })
    if (res.ok) {
      setMessages(messages.map((msg) => (msg._id === id ? { ...msg, read } : msg)))
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Messages</h1>
      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message._id} className={message.read ? "opacity-50" : ""}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{message.name}</span>
                <Checkbox
                  checked={message.read}
                  onCheckedChange={(checked) => handleReadToggle(message._id, checked as boolean)}
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">{message.email}</p>
              <p>{message.message}</p>
              <p className="text-xs text-gray-400 mt-2">{new Date(message.createdAt).toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

