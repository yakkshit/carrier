"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-20 md:py-32"
    >
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Career Platform
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground md:text-xl"
            >
              Applying. Tracking. Succeeding. Our comprehensive AI-powered career platform is designed to meet all your
              job search needs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <Button size="lg" className="group rounded-full bg-primary/90 px-8 text-white hover:bg-primary" asChild>
                <Link href="#getstarted" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16"
            >
              <Link
                href="#workflow"
                className="group flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                Your Path Starts Here
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Image with Interactive Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mt-10 md:mt-0"
          >
            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src="/career-hero-image.png"
                alt="AtoZ Career Platform"
                width={800}
                height={600}
                className="h-full w-full object-cover"
                priority
              />

              {/* Interactive Elements */}

              {/* +10K Users Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute right-4 top-4 z-10"
              >
                <Link
                  href="#about"
                  className="flex items-center gap-2 rounded-full bg-purple-200/90 px-4 py-2 text-sm font-medium text-purple-900 backdrop-blur-sm transition-transform hover:scale-105"
                >
                  +10K Users
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              {/* Speech Bubble */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute left-4 top-1/2 z-10 max-w-[200px] rounded-xl bg-white/90 p-4 shadow-lg backdrop-blur-sm"
              >
                <p className="text-sm font-medium text-gray-900">
                  Unlock your true potential with our AI-powered platform
                </p>
              </motion.div>

              {/* User Avatars and Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-4 right-4 z-10 overflow-hidden rounded-full bg-white/90 p-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <Image
                      src="/avatar-1.png"
                      alt="User"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full border-2 border-white object-cover"
                    />
                    <Image
                      src="/avatar-2.png"
                      alt="User"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full border-2 border-white object-cover"
                    />
                    <Image
                      src="/avatar-3.png"
                      alt="User"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full border-2 border-white object-cover"
                    />
                    <Image
                      src="/avatar-4.png"
                      alt="User"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full border-2 border-white object-cover"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-2xl font-bold">85%+</p>
                      <p className="text-xs text-gray-600">Success rate with our platform</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
                      <ArrowRight className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Smaller Image with Reflection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -bottom-10 left-10 z-0 w-[200px] overflow-hidden rounded-lg shadow-xl"
              >
                <Image
                  src="/career-dashboard-small.png"
                  alt="Career Dashboard"
                  width={200}
                  height={150}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
