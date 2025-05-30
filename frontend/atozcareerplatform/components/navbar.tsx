"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useTheme } from "next-themes"
import content from "@/dic/en.json"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [timeZone, setTimeZone] = useState("")
  const { theme } = useTheme()

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      const seconds = now.getSeconds().toString().padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}:${seconds}`)

      // Get timezone offset in hours
      const offset = -(now.getTimezoneOffset() / 60)
      const sign = offset >= 0 ? "+" : ""
      setTimeZone(`(GMT${sign}${offset})`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Handle body scroll when menu is open
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

  const toggleMenu = () => setIsOpen(!isOpen)

  const socialLinks = [
    { name: "WA", href: "https://whatsapp.com" },
    { name: "X", href: "https://x.com" },
    { name: "IG", href: "https://instagram.com" },
    { name: "LI", href: "https://linkedin.com" },
    { name: "EMAIL", href: `mailto:${content.footer.contact.email}` },
  ]

  const menuLinks = [
    { name: content.navigation.home, href: "/" },
    { name: content.navigation.about, href: "#about" },
    { name: content.navigation.features, href: "#features" },
    { name: content.navigation.getStarted, href: "#getstarted", highlight: true },
    { name: content.navigation.contact, href: "#contact" },
  ]

  const footerLinks = content.footer.legalLinks

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  }

  const itemVariants = {
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.1 + i * 0.1,
        ease: [0.76, 0, 0.24, 1],
      },
    }),
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-transparent border border-white/10 backdrop-blur-xl shadow-lg"
        aria-label="Toggle Menu"
      >
        <motion.div animate={isOpen ? "open" : "closed"} className="relative h-6 w-6">
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 8 },
            }}
            className="absolute left-0 top-0 h-0.5 w-6 bg-white"
          ></motion.span>
          <motion.span
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            className="absolute left-0 top-2.5 h-0.5 w-6 bg-white"
          ></motion.span>
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -8 },
            }}
            className="absolute bottom-0 left-0 h-0.5 w-6 bg-white"
          ></motion.span>
        </motion.div>
      </button>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 flex flex-col bg-black/80 backdrop-blur-xl border-t border-white/10 text-white"
          >
            {/* Close Button */}
            <motion.button
              onClick={toggleMenu}
              className="absolute right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-6 w-6 text-white" />
            </motion.button>

            {/* Top Social Links */}
            <div className="flex items-center gap-6 p-8">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  custom={i}
                  variants={itemVariants}
                  className="text-sm font-light tracking-wider text-purple-400 hover:text-purple-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-1 flex-col justify-between p-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Left Column - Location and Time */}
                <div className="flex flex-col justify-center">
                  <motion.div
                    custom={0}
                    variants={itemVariants}
                    className="text-4xl font-light md:text-5xl lg:text-6xl"
                  >
                    We are based in <span className="text-purple-400">New York</span> and work remotely.
                  </motion.div>

                  <motion.div custom={1} variants={itemVariants} className="mt-12">
                    <div className="text-5xl font-light md:text-6xl lg:text-7xl">{currentTime}</div>
                    <div className="mt-2 text-sm font-light uppercase tracking-wider text-gray-400">
                      CURRENT TIME ZONE {timeZone}
                    </div>
                    <Button
                      className="mt-4 rounded-full bg-white/10 px-6 py-2 text-white hover:bg-white/20 backdrop-blur-sm"
                      onClick={toggleMenu}
                    >
                      Login
                    </Button>
                  </motion.div>
                </div>

                {/* Right Column - Navigation Links */}
                <div className="flex flex-col items-end justify-center space-y-4 text-right">
                  {menuLinks.map((link, i) => (
                    <motion.div key={link.name} custom={i} variants={itemVariants} className="overflow-hidden">
                      <Link
                        href={link.href}
                        onClick={toggleMenu}
                        className={`text-4xl font-light transition-colors duration-300 hover:text-purple-400 md:text-5xl lg:text-6xl ${
                          link.highlight ? "text-purple-400" : "text-white"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer Links */}
              <div className="flex justify-end gap-8 pt-8 text-right">
                {footerLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    custom={i + menuLinks.length}
                    variants={itemVariants}
                    className="text-sm font-light text-gray-400 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
