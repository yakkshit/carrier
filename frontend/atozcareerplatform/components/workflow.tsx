"use client"

import type React from "react"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, useMotionValue } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import content from "@/dic/en.json"

export default function Workflow() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [activeStep, setActiveStep] = useState(0)

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  // Generate icons for each step
  const stepIcons = [
    "/icons/connect-icon.png",
    "/icons/analyze-icon.png",
    "/icons/optimize-icon.png",
    "/icons/scale-icon.png",
  ]

  return (
    <section
      id="workflow"
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
          background: "radial-gradient(circle at top left, rgba(120,70,190,0.15), transparent 70%)",
        }}
      />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          {/* Process label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto mb-6 inline-flex items-center rounded-full bg-gray-800/50 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-sm font-medium text-transparent">
              Process
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              {content.features.process.heading}
            </h2>
          </motion.div>

          <div className="mt-20">
            <div className="grid gap-12 md:grid-cols-2">
              {/* Left side - Steps */}
              <div className="space-y-8">
                {content.workflow.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className={`group relative cursor-pointer`}
                    onClick={() => setActiveStep(i)}
                  >
                    <div
                      className={`absolute -inset-4 rounded-xl transition-colors ${
                        activeStep === i ? "bg-gray-800/50 backdrop-blur-sm" : "bg-transparent"
                      }`}
                    />
                    <div className="relative flex items-start gap-4 p-4">
                      <div
                        className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full ${
                          activeStep === i
                            ? "bg-gradient-to-br from-purple-500 to-blue-500"
                            : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {activeStep === i ? (
                          <div className="flex h-full w-full items-center justify-center">
                            <Image
                              src={stepIcons[i] || "/placeholder.svg?height=40&width=40&query=icon"}
                              alt={step.title}
                              width={40}
                              height={40}
                              className="h-8 w-8 object-contain"
                            />
                          </div>
                        ) : (
                          <span className="font-heading text-xl font-bold">{step.number}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`font-heading text-xl font-bold ${
                            activeStep === i ? "text-white" : "text-gray-300"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className={`mt-2 ${activeStep === i ? "text-gray-300" : "text-gray-500"} transition-colors`}>
                          {step.description}
                        </p>
                        {activeStep === i && (
                          <div className="mt-4 flex items-center gap-2 text-sm text-purple-400">
                            <Check className="h-4 w-4" />
                            <span>Active step</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right side - Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative flex items-center justify-center"
              >
                <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-full border border-gray-800 p-1">
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-xl" />
                  <div className="relative h-full w-full overflow-hidden rounded-full bg-gray-900/80 backdrop-blur-sm">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative h-48 w-48">
                        <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-xl" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image
                            src={stepIcons[activeStep] || "/placeholder.svg?height=120&width=120&query=icon"}
                            alt={content.workflow.steps[activeStep].title}
                            width={120}
                            height={120}
                            className="h-24 w-24 object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Animated rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0.7, scale: 0.8 }}
                        animate={{ opacity: 0, scale: 1.2 }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                        className="absolute h-48 w-48 rounded-full border border-purple-500/30"
                      />
                      <motion.div
                        initial={{ opacity: 0.7, scale: 0.8 }}
                        animate={{ opacity: 0, scale: 1.2 }}
                        transition={{ duration: 3, delay: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                        className="absolute h-48 w-48 rounded-full border border-blue-500/30"
                      />
                      <motion.div
                        initial={{ opacity: 0.7, scale: 0.8 }}
                        animate={{ opacity: 0, scale: 1.2 }}
                        transition={{ duration: 3, delay: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                        className="absolute h-48 w-48 rounded-full border border-pink-500/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Dashboard preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-16 -right-8 w-64 overflow-hidden rounded-lg border border-gray-800 bg-gray-900/80 shadow-xl backdrop-blur-sm md:-right-16 md:w-80"
                >
                  <div className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500" />
                        <div className="h-2 w-2 rounded-full bg-yellow-500" />
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                      </div>
                      <div className="text-xs text-gray-400">
                        Step {Number.parseInt(content.workflow.steps[activeStep].number)}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-3/4 rounded-full bg-gray-800" />
                      <div className="h-2 w-full rounded-full bg-gray-800" />
                      <div className="h-2 w-2/3 rounded-full bg-gray-800" />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="h-16 rounded-md bg-gray-800" />
                      <div className="h-16 rounded-md bg-gray-800" />
                    </div>
                    <div className="mt-3 flex justify-end">
                      <div className="h-6 w-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-32 flex justify-center"
          >
            <Button
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-8 text-white hover:from-purple-600 hover:to-blue-600"
              size="lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Now
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
