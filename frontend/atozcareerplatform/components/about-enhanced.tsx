"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useMotionTemplate, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion"
import { ArrowUpRight, Check, MousePointer, FileText, Users, MessageSquare, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import content from "@/dic/en.json"

export default function AboutEnhanced() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  // Smooth spring animation for the cursor
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorX = useSpring(cursorPosition.x, springConfig)
  const cursorY = useSpring(cursorPosition.y, springConfig)

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
    setCursorPosition({ x: clientX, y: clientY })
  }

  // Scroll reveal configurations
  const { scrollY } = useScroll()
  const titleOpacity = useTransform(scrollY, [0, 200, 250], [0, 0, 1])
  const titleY = useTransform(scrollY, [0, 200, 250], [60, 60, 0])

  // Cycle through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      name: content.about.features[0].title,
      description: content.about.features[0].description,
      icon: <FileText className="h-6 w-6" />,
      color: "from-blue-400 to-indigo-400",
    },
    {
      name: content.about.features[1].title,
      description: content.about.features[1].description,
      icon: <Users className="h-6 w-6" />,
      color: "from-purple-400 to-pink-400",
    },
    {
      name: content.about.features[2].title,
      description: content.about.features[2].description,
      icon: <MessageSquare className="h-6 w-6" />,
      color: "from-green-400 to-emerald-400",
    },
    {
      name: content.about.features[3].title,
      description: content.about.features[3].description,
      icon: <Calendar className="h-6 w-6" />,
      color: "from-amber-400 to-yellow-400",
    },
  ]

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-black py-24 md:py-32"
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      data-cursor="compass"
    >
      {/* Background with blur gradient */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="absolute bottom-0 left-0 right-0 top-1/2 bg-gradient-to-t from-purple-900/20 via-black to-black"></div>
        <div className="absolute bottom-1/2 left-0 right-0 top-0 bg-gradient-to-b from-purple-900/20 via-black to-black"></div>
      </div>

      {/* Enhanced corner glow effects */}
      <div
        className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]"
        data-parallax="0.05"
      />
      <div
        className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]"
        data-parallax="0.08"
      />

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

      {/* Mouse pointer guide */}
      <motion.div
        className="pointer-events-none fixed z-50 flex items-center gap-2 rounded-full bg-black/80 px-3 py-1.5 text-xs text-white backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovering ? 1 : 0,
          x: cursorPosition.x + 16,
          y: cursorPosition.y - 16,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      >
        <MousePointer className="h-3 w-3" />
        <span>Explore features</span>
      </motion.div>

      <div className="mx-auto w-full max-w-[90%] px-4 md:px-6 2xl:max-w-7xl">
        <div className="relative">
          {/* Section Badge - With scroll reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute -top-12 left-0 inline-flex items-center rounded-full bg-white/5 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="text-gradient text-sm font-medium">{content.about.title}</span>
          </motion.div>

          {/* Main Title - With scroll reveal */}
          <motion.h2
            style={{ opacity: titleOpacity, y: titleY }}
            className="mt-12 text-left text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            data-scroll
          >
            AI-Powered <span className="italic text-gray-300">Career Management</span>
          </motion.h2>

          <div className="mt-20 grid gap-16 lg:grid-cols-2">
            {/* Left side - Features list */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-10 pr-4"
            >
              {/* Feature list with scroll reveal */}
              <div className="space-y-8">
                {content.about.featuresList.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="group flex items-start gap-4"
                    whileHover={{ x: 5 }}
                  >
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/20 transition-colors duration-300 group-hover:bg-purple-500/40">
                      <Check className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <span className="text-xl font-semibold text-gray-300 transition-colors duration-300 group-hover:text-white">
                        {feature.title}
                      </span>
                      {feature.description && (
                        <p className="mt-2 text-sm leading-relaxed text-gray-400 group-hover:text-gray-300">
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                {content.about.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
                    onMouseMove={onMouseMove}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <motion.div
                      className="pointer-events-none absolute -inset-px z-0 opacity-0 transition duration-300 group-hover:opacity-100"
                      style={{
                        background: useMotionTemplate`
                          radial-gradient(
                            250px circle at ${mouseX}px ${mouseY}px,
                            rgba(120, 120, 255, 0.15),
                            transparent 80%
                          )
                        `,
                      }}
                    />
                    <div className="relative z-10">
                      <div className="text-gradient font-heading text-3xl font-bold">{stat.value}</div>
                      <div className="mt-1 text-xs text-gray-400">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mt-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
                  size="lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {content.about.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                  <span className="absolute inset-0 z-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Right side - Platform visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative flex items-center justify-center"
            >
              <div className="relative mx-auto w-full max-w-2xl">
                {/* Central dashboard mockup */}
                <motion.div
                  className="relative z-20 mx-auto w-full overflow-hidden rounded-xl border border-white/10 bg-gray-900/80 shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900/80 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-sm text-gray-400">AtoZ Dashboard</div>
                  </div>

                  <div className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-white">Career Progress</h4>
                    </div>

                    <div className="space-y-2">
                      <div className="h-2.5 w-full rounded-full bg-gray-800">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                          initial={{ width: "0%" }}
                          whileInView={{ width: "65%" }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          viewport={{ once: true }}
                        ></motion.div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Profile</span>
                        <span className="text-gray-400">65% Complete</span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-gray-800/50 p-3">
                        <div className="text-sm text-gray-400">Applications</div>
                        <div className="text-2xl font-bold text-white">24</div>
                      </div>
                      <div className="rounded-lg bg-gray-800/50 p-3">
                        <div className="text-sm text-gray-400">Interviews</div>
                        <div className="text-2xl font-bold text-white">8</div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="text-sm font-medium text-gray-400 mb-3">Recent Activity</div>
                      <div className="space-y-3">
                        {[
                          "Resume updated for Software Engineer position",
                          "Interview scheduled with TechCorp",
                          "Applied to 3 new positions",
                        ].map((activity, i) => (
                          <motion.div
                            key={i}
                            className="text-sm text-gray-300 bg-gray-800/30 p-3 rounded-lg"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 + i * 0.2 }}
                            viewport={{ once: true }}
                          >
                            {activity}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Feature cards around the dashboard */}
                {features.map((feature, i) => {
                  // Calculate positions around the center
                  const positions = [
                    { top: "8%", left: "50%" },
                    { top: "50%", left: "90%" },
                    { top: "90%", left: "50%" },
                    { top: "50%", left: "10%" },
                  ]
                  return (
                    <motion.div
                      key={i}
                      className={`absolute rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-3 sm:p-4 md:p-5 w-48 sm:w-56 md:w-64 lg:w-72 ${
                        activeFeature === i ? "ring-2 ring-purple-500" : ""
                      }`}
                      style={{ top: positions[i].top, left: positions[i].left, transform: "translate(-50%, -50%)" }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                      onClick={() => setActiveFeature(i)}
                    >
                      <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${feature.color} p-2 mb-3`}>
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-900/80">
                          {feature.icon}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{feature.name}</h3>
                      <p className="text-sm text-gray-400">{feature.description}</p>

                      {/* Connection lines to center */}
                      <motion.div
                        className="absolute inset-0 z-10 pointer-events-none"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 + i * 0.2 }}
                        viewport={{ once: true }}
                      >
                        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
                          <motion.path
                            d={`M50,50 L${i % 2 === 0 ? "50,0" : i === 1 ? "100,50" : "0,50"}`}
                            stroke={activeFeature === i ? "rgba(139, 92, 246, 0.8)" : "rgba(139, 92, 246, 0.3)"}
                            strokeWidth={activeFeature === i ? "2" : "1"}
                            strokeDasharray="5,5"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, delay: 0.5 }}
                          />
                        </svg>
                      </motion.div>
                    </motion.div>
                  )
                })}

                {/* Animated pulse */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <motion.div
                    initial={{ opacity: 0.7, scale: 1 }}
                    animate={{ opacity: 0, scale: 2.2 }}
                    transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                    className="h-20 w-20 rounded-full bg-purple-500/10"
                  />
                  <motion.div
                    initial={{ opacity: 0.7, scale: 1 }}
                    animate={{ opacity: 0, scale: 2.2 }}
                    transition={{ duration: 2.5, delay: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                    className="absolute inset-0 h-20 w-20 rounded-full bg-blue-500/10"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
