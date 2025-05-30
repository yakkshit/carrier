"use client"

import type React from "react"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView, useMotionTemplate, useMotionValue } from "framer-motion"

export default function FeatureSections() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  // Feature cards data
  const featureCards = [
    {
      title: "Multi-Channel Sync",
      description: "Seamlessly integrate and sync inventory across e-commerce, POS, and warehouses.",
      icon: "/icons/sync-icon.png",
      iconColor: "from-emerald-400 to-cyan-400",
      connections: ["center"],
    },
    {
      title: "AI Assistance for Smarter Decisions",
      description: "Get AI-driven recommendations on purchasing, pricing, and inventory optimization.",
      icon: "/icons/ai-icon.png",
      iconColor: "from-rose-400 to-purple-400",
      glowColor: "rgba(255, 100, 150, 0.15)",
    },
  ]

  // Intelligence management cards
  const intelligenceCards = [
    {
      title: "Real-Time Tracking",
      description: "Stay updated with live stock levels across multiple locations.",
      icon: "/icons/tracking-icon.png",
      iconColor: "from-cyan-400 to-blue-400",
      stats: [
        { value: "234", color: "from-cyan-400 to-blue-400" },
        { value: "145", color: "from-purple-400 to-orange-400" },
      ],
      liveTag: true,
    },
    {
      title: "Automated Stock",
      description: "Never run out of stock—AI detects low levels and automates restocking.",
      icon: "/icons/stock-icon.png",
      iconColor: "from-purple-400 to-indigo-400",
      confirmations: ["Confirmation", "Confirmation", "Confirmation"],
    },
    {
      title: "AI Forecasting",
      description: "Predict future inventory needs with intelligent analytics and insights.",
      icon: "/icons/forecast-icon.png",
      iconColor: "from-indigo-400 to-purple-400",
      stats: [
        { value: "60%", color: "from-white to-white" },
        { value: "45%", color: "from-purple-400 to-purple-400" },
        { value: "80%", color: "from-white to-white" },
      ],
    },
  ]

  // Process steps
  const processSteps = [
    {
      number: "1",
      title: "Connect your store",
      description: "Integrate with your existing e-commerce platforms and POS systems.",
    },
    {
      number: "2",
      title: "Import inventory",
      description: "Automatically sync your current inventory across all channels.",
    },
    {
      number: "3",
      title: "Activate AI features",
      description: "Enable intelligent forecasting and automated stock management.",
    },
  ]

  return (
    <>
      {/* Feature Cards Section */}
      <section
        ref={ref}
        className="relative overflow-hidden bg-black py-24"
        onMouseMove={onMouseMove}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23333333'/%3E%3C/svg%3E")`,
          backgroundSize: "20px 20px",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: "radial-gradient(circle at center, rgba(67,67,153,0.15), transparent 70%)",
          }}
        />

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {featureCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-black/50 p-8 backdrop-blur-sm"
                onMouseMove={onMouseMove}
              >
                {/* Glow effect */}
                <motion.div
                  className="pointer-events-none absolute -inset-px z-0 opacity-0 transition duration-300 group-hover:opacity-100"
                  style={{
                    background: useMotionTemplate`
                      radial-gradient(
                        650px circle at ${mouseX}px ${mouseY}px,
                        ${card.glowColor || "rgba(120, 120, 255, 0.15)"},
                        transparent 80%
                      )
                    `,
                  }}
                />

                {/* Card content */}
                <div className="relative z-10">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gray-900 p-3 shadow-lg">
                    <div className={`h-full w-full rounded-lg bg-gradient-to-br ${card.iconColor} p-2 shadow-inner`}>
                      <div className="h-full w-full rounded-md bg-black/30 p-1.5 backdrop-blur-sm">
                        <Image
                          src={card.icon || "/placeholder.svg?height=40&width=40&query=icon"}
                          alt={card.title}
                          width={40}
                          height={40}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="mb-2 text-xl font-semibold text-white">{card.title}</h3>
                  <p className="text-gray-400">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Process Section */}
          <div className="mt-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-block rounded-full bg-gray-800/50 px-6 py-2 backdrop-blur-sm"
            >
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-sm font-medium text-transparent">
                Process
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl"
            >
              3 Simple steps and
              <br />
              kickstart
            </motion.h2>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 blur transition duration-300 group-hover:opacity-100" />
                  <div className="relative flex flex-col items-center rounded-lg border border-gray-800 bg-black/50 p-6 backdrop-blur-sm">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-xl font-bold text-white">
                      {step.number}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">{step.title}</h3>
                    <p className="text-center text-sm text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence Management Section */}
      <section className="relative overflow-hidden bg-black py-24">
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23333333'/%3E%3C/svg%3E")`,
            backgroundSize: "20px 20px",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: "radial-gradient(circle at center, rgba(120,70,190,0.15), transparent 70%)",
          }}
        />

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="inline-block rounded-full bg-gray-800/50 px-6 py-2 backdrop-blur-sm"
            >
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-sm font-medium text-transparent">
                Experience
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mt-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl"
            >
              Intelligence Management
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mx-auto mt-6 max-w-2xl text-gray-400"
            >
              Experience seamless stock tracking, predictive insights, and automation-driven efficiency.
            </motion.p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {intelligenceCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-black/50 p-6 backdrop-blur-sm"
                onMouseMove={onMouseMove}
              >
                {/* Glow effect */}
                <motion.div
                  className="pointer-events-none absolute -inset-px z-0 opacity-0 transition duration-300 group-hover:opacity-100"
                  style={{
                    background: useMotionTemplate`
                      radial-gradient(
                        450px circle at ${mouseX}px ${mouseY}px,
                        rgba(120, 120, 255, 0.15),
                        transparent 80%
                      )
                    `,
                  }}
                />

                {/* Card content */}
                <div className="relative z-10">
                  {/* Live tag */}
                  {card.liveTag && (
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gray-800/70 px-3 py-1 backdrop-blur-sm">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-xs font-medium text-white">Live</span>
                    </div>
                  )}

                  {/* Stats visualization */}
                  {card.stats && (
                    <div className="mb-6 space-y-3 rounded-lg bg-gray-900/70 p-4 backdrop-blur-sm">
                      {card.stats.map((stat, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: stat.value.replace("%", "") + "%" }}
                                transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                                viewport={{ once: true }}
                                className={`h-full rounded-full bg-gradient-to-r ${stat.color}`}
                              />
                            </div>
                            <span className="ml-2 text-sm font-medium text-white">{stat.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Confirmation bubbles */}
                  {card.confirmations && (
                    <div className="mb-6 h-32 rounded-lg bg-gray-900/70 p-4 backdrop-blur-sm">
                      <div className="relative h-full w-full">
                        {card.confirmations.map((text, i) => {
                          const positions = [
                            { top: "10%", left: "50%" },
                            { top: "40%", left: "70%" },
                            { top: "70%", left: "30%" },
                          ]
                          return (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
                              viewport={{ once: true }}
                              className="absolute flex h-10 items-center rounded-full border border-gray-700 bg-black/70 px-4 py-1 text-xs font-medium text-white backdrop-blur-sm"
                              style={{
                                top: positions[i].top,
                                left: positions[i].left,
                                transform: "translate(-50%, -50%)",
                              }}
                            >
                              {text}
                            </motion.div>
                          )
                        })}
                        <svg
                          className="absolute inset-0 h-full w-full"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M50,10 C60,30 70,50 50,70 C30,50 40,30 50,10"
                            fill="none"
                            stroke="rgba(120, 120, 255, 0.2)"
                            strokeWidth="1"
                          />
                        </svg>
                      </div>
                    </div>
                  )}

                  <h3 className="mb-2 text-xl font-semibold text-white">{card.title}</h3>
                  <p className="text-gray-400">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Feature Cards */}
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-black/50 p-8 backdrop-blur-sm"
              onMouseMove={onMouseMove}
            >
              {/* Glow effect */}
              <motion.div
                className="pointer-events-none absolute -inset-px z-0 opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                  background: useMotionTemplate`
                    radial-gradient(
                      650px circle at ${mouseX}px ${mouseY}px,
                      rgba(120, 120, 255, 0.15),
                      transparent 80%
                    )
                  `,
                }}
              />

              {/* Connection diagram */}
              <div className="relative z-10 flex h-64 items-center justify-center">
                <div className="relative">
                  {/* Center icon */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gray-900 p-3 shadow-lg">
                      <div className="h-full w-full rounded-lg bg-gradient-to-br from-yellow-400 to-cyan-400 p-2 shadow-inner">
                        <div className="h-full w-full rounded-md bg-black/30 p-1.5 backdrop-blur-sm">
                          <Image
                            src="/icons/central-icon.png"
                            alt="Central Icon"
                            width={40}
                            height={40}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top icon */}
                  <div className="absolute left-1/2 top-0 -translate-x-1/2">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-900 p-2 shadow-lg">
                      <div className="h-full w-full rounded-lg bg-gradient-to-br from-cyan-400 to-blue-400 p-1.5 shadow-inner">
                        <div className="h-full w-full rounded-md bg-black/30 p-1 backdrop-blur-sm">
                          <Image
                            src="/icons/top-icon.png"
                            alt="Top Icon"
                            width={30}
                            height={30}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right icon */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-900 p-2 shadow-lg">
                      <div className="h-full w-full rounded-lg bg-gradient-to-br from-rose-400 to-red-400 p-1.5 shadow-inner">
                        <div className="h-full w-full rounded-md bg-black/30 p-1 backdrop-blur-sm">
                          <Image
                            src="/icons/right-icon.png"
                            alt="Right Icon"
                            width={30}
                            height={30}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom icon */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-900 p-2 shadow-lg">
                      <div className="h-full w-full rounded-lg bg-gradient-to-br from-emerald-400 to-green-400 p-1.5 shadow-inner">
                        <div className="h-full w-full rounded-md bg-black/30 p-1 backdrop-blur-sm">
                          <Image
                            src="/icons/bottom-icon.png"
                            alt="Bottom Icon"
                            width={30}
                            height={30}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Left icon */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-900 p-2 shadow-lg">
                      <div className="h-full w-full rounded-lg bg-gradient-to-br from-amber-400 to-yellow-400 p-1.5 shadow-inner">
                        <div className="h-full w-full rounded-md bg-black/30 p-1 backdrop-blur-sm">
                          <Image
                            src="/icons/left-icon.png"
                            alt="Left Icon"
                            width={30}
                            height={30}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connection lines */}
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 200">
                    <path d="M100,40 L100,80" stroke="rgba(120, 120, 255, 0.3)" strokeWidth="2" strokeDasharray="5,5" />
                    <path
                      d="M120,100 L160,100"
                      stroke="rgba(120, 120, 255, 0.3)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                    <path
                      d="M100,120 L100,160"
                      stroke="rgba(120, 120, 255, 0.3)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                    <path d="M80,100 L40,100" stroke="rgba(120, 120, 255, 0.3)" strokeWidth="2" strokeDasharray="5,5" />
                  </svg>
                </div>
              </div>

              <h3 className="mb-2 text-xl font-semibold text-white">Multi-Channel Sync</h3>
              <p className="text-gray-400">
                Seamlessly integrate and sync inventory across e-commerce, POS, and warehouses.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-black/50 p-8 backdrop-blur-sm"
              onMouseMove={onMouseMove}
            >
              {/* Glow effect */}
              <motion.div
                className="pointer-events-none absolute -inset-px z-0 opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                  background: useMotionTemplate`
                    radial-gradient(
                      650px circle at ${mouseX}px ${mouseY}px,
                      rgba(255, 100, 150, 0.15),
                      transparent 80%
                    )
                  `,
                }}
              />

              {/* Radial pulse animation */}
              <div className="relative z-10 flex h-64 items-center justify-center">
                <div className="relative">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 p-3 shadow-lg">
                      <div className="h-full w-full rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 p-1.5 shadow-inner">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
                          <Image
                            src="/icons/sparkle-icon.png"
                            alt="AI Icon"
                            width={24}
                            height={24}
                            className="h-6 w-6 object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pulse rings */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      initial={{ opacity: 0.7, scale: 1 }}
                      animate={{ opacity: 0, scale: 2 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                      className="h-16 w-16 rounded-full bg-gradient-to-r from-rose-500/20 to-purple-500/20 blur-sm"
                    />
                  </div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      initial={{ opacity: 0.7, scale: 1 }}
                      animate={{ opacity: 0, scale: 2 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 0.5 }}
                      className="h-16 w-16 rounded-full bg-gradient-to-r from-rose-500/20 to-purple-500/20 blur-sm"
                    />
                  </div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      initial={{ opacity: 0.7, scale: 1 }}
                      animate={{ opacity: 0, scale: 2 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 1 }}
                      className="h-16 w-16 rounded-full bg-gradient-to-r from-rose-500/20 to-purple-500/20 blur-sm"
                    />
                  </div>
                </div>
              </div>

              <h3 className="mb-2 text-xl font-semibold text-white">AI Assistance for Smarter Decisions</h3>
              <p className="text-gray-400">
                Get AI-driven recommendations on purchasing, pricing, and inventory optimization.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
