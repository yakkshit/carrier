"use client"

import type React from "react"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView, useMotionTemplate, useMotionValue } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import content from "@/dic/en.json"

export default function CallToAction() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-24 md:py-32" onMouseMove={onMouseMove}>
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
          background: "radial-gradient(circle at center, rgba(120,70,190,0.15), transparent 70%)",
        }}
      />

      {/* Enhanced corner glow effects */}
      <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container relative z-10 px-4 md:px-6"
      >
        <div className="mx-auto max-w-3xl">
          <div className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-black p-8 text-center backdrop-blur-sm">
            <div
              className="absolute inset-0 z-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23333333'/%3E%3C/svg%3E")`,
                backgroundSize: "20px 20px",
              }}
            />
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

            <div className="relative z-10">
              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
                className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
              >
                {content.cta.title}
              </motion.h2>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut", delay: 0.1 },
                  },
                }}
                className="mt-4 text-gray-400 md:text-lg"
              >
                {content.cta.description}
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
                  },
                }}
                className="mt-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="group relative overflow-hidden rounded-full px-8" asChild>
                  <Link href="#getstarted">
                    <span className="relative z-10 flex items-center gap-2">
                      {content.cta.button}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
