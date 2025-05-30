"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import content from "@/dic/en.json"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10)
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const headerVariants = {
    initial: { y: -100 },
    animate: { y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  const navVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  const linkVariants = {
    initial: { y: -20, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.1 * i, duration: 0.5 },
    }),
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  }

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className={`fixed top-0 z-50 w-full ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      } transition-all duration-300`}
    >
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-heading text-xl font-bold">A</span>
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
            </span>
          </motion.div>
          <span className="font-heading text-2xl font-bold">AtoZ</span>
        </Link>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="hidden rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground md:flex"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </motion.button>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={navVariants}
            className="fixed inset-0 z-40 flex flex-col bg-background pt-20 md:hidden"
          >
            <div className="container flex flex-1 flex-col items-center justify-center gap-8 px-4">
              {Object.entries(content.navigation)
                .slice(0, 4)
                .map(([key, value], i) => (
                  <motion.div
                    key={key}
                    custom={i}
                    variants={linkVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                  >
                    <Link href={`#${key}`} className="text-2xl font-medium" onClick={() => setIsOpen(false)}>
                      {value}
                    </Link>
                  </motion.div>
                ))}
              <div className="mt-8 flex flex-col gap-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="#signin" onClick={() => setIsOpen(false)}>
                    {content.navigation.signIn}
                  </Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="#getstarted" onClick={() => setIsOpen(false)}>
                    {content.navigation.getStarted}
                  </Link>
                </Button>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="mt-8">
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
