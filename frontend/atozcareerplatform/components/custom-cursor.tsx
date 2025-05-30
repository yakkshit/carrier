"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Compass, MousePointer, Zap, Code } from "lucide-react"

type CursorType = "default" | "compass" | "zap" | "code"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [cursorType, setCursorType] = useState<CursorType>("default")
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Check which section we're in based on data attributes
      const target = e.target as HTMLElement
      const section = target.closest("[data-cursor]")

      if (section) {
        const type = section.getAttribute("data-cursor") as CursorType
        setCursorType(type)
        setIsVisible(true)
        setIsHovering(
          target.tagName === "BUTTON" ||
            target.tagName === "A" ||
            target.closest("button") !== null ||
            target.closest("a") !== null,
        )
      } else {
        setIsVisible(false)
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  const getCursorContent = () => {
    switch (cursorType) {
      case "compass":
        return <Compass className="h-5 w-5 text-white" />
      case "zap":
        return <Zap className="h-5 w-5 text-white" />
      case "code":
        return <Code className="h-5 w-5 text-white" />
      default:
        return <MousePointer className="h-5 w-5 text-white" />
    }
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed z-50 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mix-blend-screen"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isVisible ? (isHovering ? 1.5 : 1) : 0,
          opacity: isVisible ? 0.8 : 0,
        }}
        transition={{ type: "spring", damping: 10, stiffness: 100, mass: 0.5 }}
      >
        {getCursorContent()}
      </motion.div>

      {/* Cursor trail */}
      <motion.div
        className="pointer-events-none fixed z-40 h-4 w-4 rounded-full bg-white/30 mix-blend-screen"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 100, mass: 0.3, delay: 0.05 }}
      />

      <motion.div
        className="pointer-events-none fixed z-30 h-3 w-3 rounded-full bg-white/20 mix-blend-screen"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 0.3 : 0,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 100, mass: 0.2, delay: 0.1 }}
      />
    </>
  )
}
