"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MessageSquare } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })
      if (res.ok) {
        toast({
          title: "Message sent",
          description: "Thank you for your message. We'll get back to you soon!",
        })
        setName("")
        setEmail("")
        setMessage("")
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
      toast({
        title: "Error",
        description: `Failed to send message. Please try again later. ${errorMessage}`,
        variant: "destructive",
      })
    }
  }

  return (
    <section id="contact" className="py-24 bg-muted/50" ref={ref}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12"
        >
          Contact Us
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4">Get in touch</h3>
              <p className="text-muted-foreground">Have a question or want to work together? Feel free to reach out.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-primary" />
                <span>benmechiche.wassim@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-primary" />
                <span>+213 792 33 46 98</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="text-primary" />
                <span>Customer Support</span>
              </div>
            </div>

            {/* <div className="space-y-4">
              <h4 className="font-medium">Support Hours</h4>
              <p className="text-muted-foreground">
                Monday - Friday: 9:00 AM - 6:00 PM
                <br />
                Saturday: 10:00 AM - 2:00 PM
                <br />
                Sunday: Closed
              </p>
            </div> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <Input placeholder="Last name" required />
                  </div>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="flex gap-4">
                    <input className="flex h-10 w-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="+213"/>
                    
                    <Input placeholder="Phone number" className="flex-1" />
                  </div>
                  <Textarea
                    placeholder="How can we help?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="min-h-[120px]"
                  />
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                  {/* <p className="text-xs text-center text-muted-foreground">
                    By contacting us, you agree to our{" "}
                    <a href="#" className="underline">
                      Terms of service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline">
                      Privacy Policy
                    </a>
                  </p> */}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

