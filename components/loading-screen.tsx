"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 1,
          ease: "easeInOut",
        }}
      >
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </motion.div>
    </motion.div>
  )
}

