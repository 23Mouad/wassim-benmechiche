"use client"

import { useState, useEffect } from "react"
import { MoonIcon, SunIcon, MenuIcon, XIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },

  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between p-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </Button>
          <a href="#" className="text-lg font-semibold">
            Wassim Benmechiche
          </a>
        </div>
        <ul className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <a href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
            <a href="Wassim-Benmechiche-Resume.pdf" download>
              Download Resume
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild className="sm:hidden">
            <a href="Wassim-Benmechiche-Resume.pdf" download>
              Resume
            </a>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {mounted && theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-background">
          <ul className="py-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="block px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                  onClick={toggleMobileMenu}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.nav>
  )
}

