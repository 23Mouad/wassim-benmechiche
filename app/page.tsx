import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
// import { Experience } from "@/components/experience"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Projects />
      {/* <Experience /> */}
      <About />
      <Contact />
    </main>
  )
}

