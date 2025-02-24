"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Github, Linkedin, Briefcase } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface HeroData {
  image: string
}

export function Hero() {
  const [heroData, setHeroData] = useState<HeroData>({
    image: "/placeholder.svg",
  })

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => setHeroData({ image: data.image }))
      .catch((error) => console.error("Error fetching hero data:", error))
  }, [])

  return (
    <section id="home" className="py-20 bg-muted mt-0">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-48 h-48"
              >
                <Image
                  src={heroData.image || "/placeholder.svg"}
                  alt="Wassime Benmachich"
                  fill
                  className="rounded-full object-cover border-4 border-background shadow-xl"
                />
                <Badge className="absolute bottom-4 right-4 bg-blue-500 text-white">
                  <span className="sr-only">Verified</span>✓
                </Badge>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-4xl">
                Flutter Developer | Mobile App Specialist
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                I'm Wassim benmechiche, a dedicated Flutter Developer with a passion for creating beautiful and
                performant mobile applications. Specializing in cross-platform development and user-centric design.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4"
            >
              <a
                href="https://github.com/wassimebenmachich"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/in/wassimebenmachich"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-muted transition-colors">
                <Briefcase size={24} />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex-1 p-36 hidden sm:block"
          >
            <Image
              src="/images/Development-amico.svg"
              alt="Laptop Illustration"
              width={200}
              height={200}
              className="w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

