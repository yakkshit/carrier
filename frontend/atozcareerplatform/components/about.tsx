"use client"

import type React from "react"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView, useMotionTemplate, useMotionValue } from "framer-motion"
import { ArrowUpRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import content from "@/dic/en.json"

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const features = [
    "Real-time inventory tracking",
    "AI-powered forecasting",
    "Multi-channel integration",
    "Automated restocking",
    "Comprehensive analytics",
    "Seamless third-party connections",
  ]

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-black py-24 md:py-32 dark:bg-black"
      onMouseMove={onMouseMove}
    >
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23333333'/%3E%3C/svg%3E")`,
          backgroundSize: "20px 20px",
        }}
      />

      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at bottom right, rgba(67,67,153,0.15), transparent 70%)",
        }}
      />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          {/* Integration label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto mb-6 inline-flex items-center rounded-full bg-gray-800/50 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-sm font-medium text-transparent">
              Integration
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Seamless Integrations
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 max-w-3xl text-gray-400 md:text-lg"
          >
            Connect with e-commerce, logistics, and customer care tools to streamline your operations.
          </motion.p>

          <div className="mt-16 grid gap-12 md:grid-cols-2 lg:gap-16">
            {/* Left side - Features list */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Integration list */}
              <div className="space-y-4">
                {[
                  "Unicommerce Integration",
                  "Logistics Partner Integration",
                  "Customer Care Tools Integration",
                  "Accounting & Finance Integration",
                ].map((integration, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20">
                      <Check className="h-3.5 w-3.5 text-purple-400" />
                    </div>
                    <span className="text-gray-300">{integration}</span>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 gap-6">
                {content.about.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/30 p-6 backdrop-blur-sm"
                    onMouseMove={onMouseMove}
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
                      <div className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text font-heading text-4xl font-bold text-transparent">
                        {stat.value}
                      </div>
                      <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <Button
                  className="group rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
                  size="lg"
                >
                  <span className="flex items-center gap-2">
                    {content.about.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right side - Integration visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-center"
            >
              <div className="relative h-[400px] w-[400px]">
                {/* Outer circle */}
                <div className="absolute inset-0 rounded-full border border-gray-800 bg-gray-900/20 backdrop-blur-sm" />

                {/* Center icon */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gray-800 bg-gray-900/80 p-4 backdrop-blur-sm">
                    <div className="h-full w-full rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-2">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-900">
                        <Image
                          src="/icons/central-icon.png"
                          alt="Central Hub"
                          width={32}
                          height={32}
                          className="h-8 w-8 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Integration icons */}
                {[
                  { top: "10%", left: "50%", color: "from-blue-400 to-indigo-400", icon: "/icons/sync-icon.png" },
                  { top: "50%", left: "90%", color: "from-purple-400 to-pink-400", icon: "/icons/ai-icon.png" },
                  { top: "90%", left: "50%", color: "from-green-400 to-emerald-400", icon: "/icons/tracking-icon.png" },
                  { top: "50%", left: "10%", color: "from-amber-400 to-yellow-400", icon: "/icons/forecast-icon.png" },
                  { top: "25%", left: "85%", color: "from-cyan-400 to-blue-400", icon: "/icons/stock-icon.png" },
                  { top: "75%", left: "85%", color: "from-rose-400 to-red-400", icon: "/icons/left-icon.png" },
                  { top: "75%", left: "15%", color: "from-emerald-400 to-teal-400", icon: "/icons/right-icon.png" },
                  { top: "25%", left: "15%", color: "from-orange-400 to-amber-400", icon: "/icons/bottom-icon.png" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="absolute flex h-12 w-12 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/80 p-2 backdrop-blur-sm"
                    style={{ top: item.top, left: item.left, transform: "translate(-50%, -50%)" }}
                  >
                    <div className={`h-full w-full rounded bg-gradient-to-br ${item.color} p-1.5`}>
                      <div className="flex h-full w-full items-center justify-center rounded bg-gray-900/80">
                        <Image
                          src={item.icon || "/placeholder.svg?height=24&width=24&query=icon"}
                          alt={`Integration ${i + 1}`}
                          width={24}
                          height={24}
                          className="h-5 w-5 object-contain"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Connection lines */}
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400">
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                    viewport={{ once: true }}
                    d="M200,80 L200,160"
                    stroke="rgba(139, 92, 246, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    fill="none"
                  />
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    viewport={{ once: true }}
                    d="M200,240 L200,320"
                    stroke="rgba(139, 92, 246, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    fill="none"
                  />
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.9 }}
                    viewport={{ once: true }}
                    d="M240,200 L320,200"
                    stroke="rgba(139, 92, 246, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    fill="none"
                  />
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                    viewport={{ once: true }}
                    d="M80,200 L160,200"
                    stroke="rgba(139, 92, 246, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    fill="none"
                  />
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.1 }}
                    viewport={{ once: true }}
                    d="M140,140 L180,180"
                    stroke="rgba(139, 92, 246, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    fill="none"
                  />
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                    viewport={{ once: true }}
                    d="M260,180 L300,140"
                    stroke="rgba(139, 92, 246, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    fill="none"
                  />
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.3 }}
                    viewport={{ once: true }}
                    d="M260,220 L300,260"
                    stroke="rgba(139, 92, 246, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    fill="none"
                  />
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.4 }}
                    viewport={{ once: true }}
                    d="M140,260 L180,220"
                    stroke="rgba(139, 92, 246, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    fill="none"
                  />
                </svg>

                {/* Animated pulse */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    initial={{ opacity: 0.7, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.8 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                    className="h-20 w-20 rounded-full bg-purple-500/10"
                  />
                  <motion.div
                    initial={{ opacity: 0.7, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.8 }}
                    transition={{ duration: 2, delay: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                    className="absolute inset-0 h-20 w-20 rounded-full bg-blue-500/10"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Integration cards */}
          <div className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "AI Chatbot & CRM",
                description: "Connect with AI chatbots to improve engagement.",
                icon: "/icons/ai-icon.png",
              },
              {
                title: "ERP System Integration",
                description: "Sync inventory with enterprise resource (ERP) systems.",
                icon: "/icons/sync-icon.png",
              },
              {
                title: "Supplier & Procurement",
                description: "Seamlessly connect with for automated restocking.",
                icon: "/icons/stock-icon.png",
              },
              {
                title: "POS Integration",
                description: "Sync inventory with POS for real-time updates.",
                icon: "/icons/tracking-icon.png",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/30 p-6 backdrop-blur-sm"
                onMouseMove={onMouseMove}
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
                  <div className="mb-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-800">
                    <div className="h-full w-full rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-2">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-900">
                        <Image
                          src={card.icon || "/placeholder.svg?height=24&width=24&query=icon"}
                          alt={card.title}
                          width={24}
                          height={24}
                          className="h-6 w-6 object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="mb-2 font-heading text-lg font-bold text-white">{card.title}</h3>
                  <p className="text-sm text-gray-400">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
