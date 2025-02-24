"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, PlayIcon } from "lucide-react"
import { useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface Project {
  _id: string
  title: string
  description: string
  images: { path: string; isPrimary: boolean }[]
  github?: string
  playstore?: string
  tags: string[]
  backgroundColor: string
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [error, setError] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch projects")
        }
        return res.json()
      })
      .then((data) => setProjects(data))
      .catch((err) => {
        console.error("Error fetching projects:", err)
        setError("Failed to load projects. Please try again later.")
      })
  }, [])

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="projects" className="py-24 bg-muted" ref={ref}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center"
        >
          Featured Projects
        </motion.h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid gap-12 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div key={project._id} variants={item}>
              <Link
                href={project.playstore || `/projects/${project._id}`}
                className="group block"
                target={project.playstore ? "_blank" : undefined}
                rel={project.playstore ? "noopener noreferrer" : undefined}
              >
                <div
                  className="relative p-6 rounded-3xl overflow-hidden mb-4"
                  style={{ backgroundColor: project.backgroundColor }}
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <Image
                      src={project.images.find((img) => img.isPrimary)?.path || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="space-y-3 px-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full hover:bg-muted transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.playstore && (
                        <span className="p-2 rounded-full hover:bg-muted transition-colors">
                          <PlayIcon className="w-5 h-5" />
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-white">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-muted-foreground line-clamp-2">{project.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

