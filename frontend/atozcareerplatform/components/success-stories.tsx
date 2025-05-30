"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote } from "lucide-react"

export default function SuccessStories() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStory, setActiveStory] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-rotate through testimonials
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Pause auto-rotation when user interacts
  const pauseAutoPlay = () => {
    setIsAutoPlaying(false)
    // Resume after 30 seconds of inactivity
    const timeout = setTimeout(() => setIsAutoPlaying(true), 30000)
    return () => clearTimeout(timeout)
  }

  const testimonials = [
    {
      title: "Max's SaaS Revolution",
      quote:
        "Max, the founder of CloudFlow, implemented AI automation in their processes. This move slashed operational costs by 50% and boosted team productivity by 75%, empowering the company to accelerate growth and expand faster.",
      author: "Max Rodriguez",
      role: "Founder & CEO",
      company: "CloudFlow",
      image: "/testimonial-1.png",
      rating: 5,
      metrics: [
        { value: "60%", label: "increase in ROI" },
        { value: "45%", label: "boost in revenue" },
      ],
    },
    {
      title: "Emily's Marketing Breakthrough",
      quote:
        "Emily transformed her agency's approach by integrating our AI tools into their workflow. The results were immediate - client satisfaction soared and campaign performance metrics exceeded all expectations.",
      author: "Emily Zhang",
      role: "Marketing Director",
      company: "Futuresync",
      image: "/testimonial-2.png",
      rating: 5,
      metrics: [
        { value: "3x", label: "client retention" },
        { value: "70%", label: "faster delivery" },
      ],
    },
    {
      title: "James' Productivity Leap",
      quote:
        "AtoZ's AI tools revolutionized how we work, saving time and driving our productivity forward. The automated workflows eliminated repetitive tasks and let our team focus on strategic initiatives.",
      author: "James Carter",
      role: "Operations Manager",
      company: "Innolystic",
      image: "/testimonial-3.png",
      rating: 5,
      metrics: [
        { value: "85%", label: "task automation" },
        { value: "40%", label: "cost reduction" },
      ],
    },
    {
      title: "Liam's Integration Success",
      quote:
        "Working with AtoZ has been seamless. Their solutions integrated perfectly with our existing systems, and the transition was smoother than we could have hoped for.",
      author: "Liam Walker",
      role: "Product Manager",
      company: "Brightpath",
      image: "/testimonial-4.png",
      rating: 4,
      metrics: [
        { value: "2 weeks", label: "implementation time" },
        { value: "100%", label: "system compatibility" },
      ],
    },
    {
      title: "Miguel's Growth Story",
      quote:
        "Thanks to AtoZ, we've achieved incredible growth by automating tasks and improving accuracy. Our client base has expanded significantly while our operational overhead decreased.",
      author: "Miguel Torres",
      role: "IT Consultant",
      company: "Alphaedge",
      image: "/testimonial-5.png",
      rating: 5,
      metrics: [
        { value: "200%", label: "client growth" },
        { value: "30%", label: "overhead reduction" },
      ],
    },
    {
      title: "Priya's Startup Journey",
      quote:
        "The team at AtoZ delivered outstanding results, improving our efficiency beyond what we imagined! As a startup founder, finding the right tools is crucial, and AtoZ exceeded all expectations.",
      author: "Priya Sharma",
      role: "Founder",
      company: "NexGen",
      image: "/testimonial-6.png",
      rating: 5,
      metrics: [
        { value: "90%", label: "investor confidence" },
        { value: "4x", label: "growth acceleration" },
      ],
    },
  ]

  const metrics = [
    { value: "85%", label: "Success Rate", description: "of users find a job within 3 months" },
    { value: "32%", label: "Higher Salary", description: "average increase compared to previous roles" },
    { value: "10K+", label: "Active Users", description: "transforming their careers with AtoZ" },
    { value: "24/7", label: "AI Support", description: "helping you every step of the way" },
  ]

  const handlePrevStory = () => {
    pauseAutoPlay()
    setActiveStory((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNextStory = () => {
    pauseAutoPlay()
    setActiveStory((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section id="success-stories" ref={containerRef} className="relative overflow-hidden bg-black py-24 md:py-32">
      {/* Background with subtle grid and gradients */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-grid opacity-20"></div>
        <div className="absolute bottom-0 left-0 right-0 top-1/2 bg-gradient-to-t from-green-900/10 via-black to-black"></div>
        <div className="absolute bottom-1/2 left-0 right-0 top-0 bg-gradient-to-b from-purple-900/10 via-black to-black"></div>
      </div>

      {/* Large blurred gradient orbs for atmosphere */}
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-green-600/10 blur-[120px]" />

      <div className="container relative z-10 px-4 md:px-6">
        {/* Section title */}
        <div className="mx-auto max-w-2xl text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full bg-white/5 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-sm font-medium text-transparent">
              Testimonials
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Success Stories <span className="italic text-gray-300">to Inspire</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 mx-auto max-w-2xl text-gray-400 text-base sm:text-lg"
          >
            Discover how businesses and creators achieve results with our platform.
          </motion.p>
        </div>

        {/* Stacked testimonial cards */}
        <div className="relative mx-auto max-w-5xl mb-16">
          <div className="relative h-[550px] md:h-[450px]">
            {/* Card stack with 3D perspective */}
            <div className="relative mx-auto w-full max-w-4xl perspective-1000">
              {/* Render cards in reverse order so the active one is on top */}
              {testimonials.map((testimonial, index) => {
                // Calculate z-index and position based on distance from active card
                const distance = Math.abs(index - activeStory)
                const isActive = index === activeStory
                const zIndex = testimonials.length - distance

                // Calculate offset for stacked appearance
                const offset = isActive ? 0 : -10 * distance

                return (
                  <AnimatePresence key={testimonial.author} mode="wait">
                    <motion.div
                      className="absolute left-0 right-0 mx-auto w-full rounded-2xl border border-white/10 bg-gray-900/80 backdrop-blur-md overflow-hidden"
                      style={{ zIndex }}
                      initial={{
                        y: isActive ? 20 : offset,
                        opacity: isActive ? 0 : 0.7 - distance * 0.15,
                        scale: isActive ? 0.95 : 1 - distance * 0.05,
                        rotateX: isActive ? 10 : 0,
                      }}
                      animate={{
                        y: isActive ? 0 : offset,
                        opacity: isActive ? 1 : 0.7 - distance * 0.15,
                        scale: isActive ? 1 : 1 - distance * 0.05,
                        rotateX: 0,
                        rotateY: isActive ? [5, -5, 0] : 0,
                      }}
                      exit={{
                        y: 20,
                        opacity: 0,
                        rotateX: -10,
                        transition: { duration: 0.3 },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        duration: 0.5,
                      }}
                    >
                      {isActive && (
                        <div className="p-4 md:p-6">
                          {/* Card header with user info */}
                          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                            {/* Left side - Image and user info */}
                            <div className="flex-shrink-0 md:w-1/3">
                              <div className="relative">
                                <motion.div
                                  className="relative h-52 w-full overflow-hidden rounded-xl border border-white/10"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  <Image
                                    src={testimonial.image || "/placeholder.svg?height=256&width=256&query=person"}
                                    alt={testimonial.author}
                                    fill
                                    className="object-cover"
                                  />

                                  {/* Gradient overlay */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />

                                  {/* User info positioned at bottom */}
                                  <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <h4 className="text-lg font-semibold text-white">{testimonial.author}</h4>
                                    <p className="text-sm text-gray-300">
                                      {testimonial.role} · {testimonial.company}
                                    </p>
                                  </div>
                                </motion.div>

                                {/* Rating stars */}
                                <motion.div
                                  className="absolute -top-3 -right-3 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1.5 backdrop-blur-sm"
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.3, type: "spring" }}
                                >
                                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <motion.div
                                      key={i}
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                                    >
                                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                    </motion.div>
                                  ))}
                                </motion.div>
                              </div>
                            </div>

                            {/* Right side - Content */}
                            <div className="flex-1">
                              <motion.h3
                                className="text-2xl font-bold text-white mb-4"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                              >
                                {testimonial.title}
                              </motion.h3>

                              {/* Quote */}
                              <motion.div
                                className="relative mb-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  animate={{ opacity: 0.2, scale: 1 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <Quote className="absolute -left-1 -top-1 h-10 w-10 text-purple-500" />
                                </motion.div>
                                <motion.p
                                  className="text-gray-300 relative z-10 pl-6 leading-relaxed"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                  "{testimonial.quote}"
                                </motion.p>
                              </motion.div>

                              {/* Metrics */}
                              <motion.div
                                className="mt-8 grid grid-cols-2 gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                              >
                                {testimonial.metrics.map((metric, i) => (
                                  <motion.div
                                    key={i}
                                    className="rounded-lg border border-white/10 bg-black/30 p-4 backdrop-blur-sm"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                    whileHover={{ scale: 1.03 }}
                                  >
                                    <motion.div
                                      className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent"
                                      animate={{
                                        textShadow: [
                                          "0 0 0px rgba(168, 85, 247, 0)",
                                          "0 0 8px rgba(168, 85, 247, 0.5)",
                                          "0 0 0px rgba(168, 85, 247, 0)",
                                        ],
                                      }}
                                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: i * 0.5 }}
                                    >
                                      {metric.value}
                                    </motion.div>
                                    <div className="text-sm text-gray-400 mt-1">{metric.label}</div>
                                  </motion.div>
                                ))}
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                )
              })}
            </div>
          </div>
        </div>

        {/* Overall metrics section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-md"
        >
          <h3 className="text-xl font-semibold text-white mb-8 text-center">Platform Success Metrics</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                className="rounded-xl border border-white/10 bg-gray-900/30 p-6 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <motion.div
                  className="text-3xl font-bold text-white mb-2"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(168, 85, 247, 0)",
                      "0 0 8px rgba(168, 85, 247, 0.5)",
                      "0 0 0px rgba(168, 85, 247, 0)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: i * 0.5 }}
                >
                  {metric.value}
                </motion.div>
                <div className="text-lg font-medium text-purple-400 mb-1">{metric.label}</div>
                <div className="text-sm text-gray-400">{metric.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
