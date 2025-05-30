"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, Bell } from "lucide-react"
import content from "@/dic/en.json"

export default function HeaderSection() {
  const [isScrolled, setIsScrolled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Add cursor following effect
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-black"
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Custom cursor effect */}
      <motion.div
        className="pointer-events-none fixed z-50 h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mix-blend-screen"
        animate={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{ type: "spring", damping: 10, stiffness: 100, mass: 0.5 }}
      />
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23333333'/%3E%3C/svg%3E")`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Gradient background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(67,67,153,0.15),transparent_70%)]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,0,128,0.1),transparent_70%)]" />

      {/* Notification bar - not sticky, just at the top */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 flex justify-center py-4"
      >
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-6 py-3 backdrop-blur-md shadow-lg">
          <div className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
          </div>
          <span className="text-sm font-medium text-white">{content.hero.updateNotification}</span>
        </div>
      </motion.div>

      {/* Hero content */}
      <div className="container relative z-10 px-4 pt-8 md:px-6">
        <motion.div
          style={{ opacity, scale, y }}
          className="mx-auto max-w-4xl text-center min-h-[80vh] flex flex-col items-center justify-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {content.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-300"
          >
            {content.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" className="rounded-full bg-white px-8 text-black hover:bg-white/90">
              {content.hero.primaryCta}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-gray-600 px-8 text-white hover:bg-white/10"
            >
              {content.hero.secondaryCta}
            </Button>
          </motion.div>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, type: "spring", stiffness: 50 }}
          className="relative mx-auto mt-16 max-w-6xl"
          onMouseMove={onMouseMove}
        >
          <motion.div
            className="pointer-events-none absolute -inset-px z-0 opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  800px circle at ${mouseX}px ${mouseY}px,
                  rgba(120, 120, 255, 0.15),
                  transparent 80%
                )
              `,
            }}
          />

          <div className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/80 shadow-2xl">
            {/* Dashboard header */}
            <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900/80 px-6 py-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800">
                  <span className="font-bold text-white">A</span>
                </div>
                <span className="text-lg font-semibold text-white">AtoZ</span>
              </div>

              <div className="relative flex w-full max-w-md items-center px-4">
                <Search className="absolute left-8 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Type to search"
                  className="w-full rounded-full border border-gray-700 bg-gray-800 py-2 pl-8 pr-4 text-sm text-gray-300 placeholder-gray-500 focus:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
                />
              </div>

              <div className="flex items-center gap-4">
                <button className="relative rounded-full bg-gray-800 p-2 text-gray-400 hover:text-white">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white">
                    2
                  </span>
                </button>
                <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-gray-700">
                  <Image src="/avatar-1.png" alt="User" width={32} height={32} className="h-full w-full object-cover" />
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg text-white">
                  <span className="font-medium">{content.dashboard.greeting}</span>
                </h2>
              </div>

              {/* Stats cards */}
              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {content.dashboard.stats.map((stat, i) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 + i * 0.1 }}
                    className="rounded-xl bg-gray-800/50 p-4 backdrop-blur-sm"
                  >
                    <p className="text-xs font-medium text-gray-400">{stat.title}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <span
                        className={`flex items-center text-xs font-medium ${stat.up ? "text-green-500" : "text-red-500"}`}
                      >
                        {stat.change}
                        <svg
                          className={`ml-1 h-3 w-3 ${!stat.up && "rotate-180"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chart and data section */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  className="col-span-2 rounded-xl border border-gray-800 bg-gray-800/30 p-4 backdrop-blur-sm"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-medium text-white">Application Report</h3>
                    <div className="flex gap-2">
                      {["12 Months", "6 Months", "30 Days", "7 Days"].map((period, i) => (
                        <button
                          key={period}
                          className={`rounded-md px-3 py-1 text-xs ${
                            i === 3 ? "bg-gray-700 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-[200px] w-full">
                    <div className="relative h-full w-full">
                      {/* Placeholder for chart - in a real app you'd use a chart library */}
                      <div className="absolute inset-0 flex items-end">
                        <svg viewBox="0 0 600 200" className="h-full w-full">
                          <path
                            d="M0,180 C100,120 200,160 300,100 C400,40 500,80 600,20"
                            fill="none"
                            stroke="rgba(79, 70, 229, 0.5)"
                            strokeWidth="3"
                          />
                          <path
                            d="M0,180 C100,150 200,180 300,120 C400,60 500,100 600,40"
                            fill="none"
                            stroke="#4F46E5"
                            strokeWidth="3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 }}
                  className="rounded-xl border border-gray-800 bg-gray-800/30 p-4 backdrop-blur-sm"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-medium text-white">Application Sources</h3>
                    <button className="flex items-center gap-1 text-xs text-gray-400">
                      Last 7 Days
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {content.dashboard.trafficSources.map((item, i) => (
                      <div key={item.source} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">{item.source}</span>
                          <span className="text-sm text-gray-300">{item.value}</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-700">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 1, delay: 1.7 + i * 0.1 }}
                            className="h-full rounded-full bg-indigo-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Glow effects */}
          <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        </motion.div>
      </div>
    </div>
  )
}
