"use client"

import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle } from "lucide-react"

interface ConsoleOutputProps {
  errors: string[]
}

export default function ConsoleOutput({ errors }: ConsoleOutputProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <motion.div className="h-full font-mono text-sm" variants={containerVariants} initial="hidden" animate="visible">
      {errors.length > 0 ? (
        <div className="space-y-2">
          {errors.map((error, index) => (
            <div key={index} className="flex items-start gap-2 text-red-400">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2 text-green-400">
          <CheckCircle className="h-4 w-4" />
          <span>No LaTeX errors detected.</span>
        </div>
      )}
    </motion.div>
  )
}
