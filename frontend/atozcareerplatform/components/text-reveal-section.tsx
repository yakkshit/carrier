"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import ScrollRevealText from "./scroll-reveal-text"

export default function TextRevealSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-20">
      <div className="absolute inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="absolute bottom-0 left-0 right-0 top-1/2 bg-gradient-to-t from-purple-900/10 via-black to-black"></div>
        <div className="absolute bottom-1/2 left-0 right-0 top-0 bg-gradient-to-b from-purple-900/10 via-black to-black"></div>
      </div>

      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
        >
          <ScrollRevealText
            before="It doesn't have"
            after="to taste that way."
            image="/fresh-mint-leaves.png"
            delay={0.2}
          />

          <ScrollRevealText
            before="But it does. It's not your typical."
            after="It's unnecessarily good."
            image="/placeholder.svg?height=40&width=120&query=abstract+wave+pattern"
            delay={0.4}
          />

          <ScrollRevealText
            before="Experience the difference with"
            after="intelligent career guidance."
            image="/placeholder.svg?height=40&width=120&query=glowing+purple+orb"
            delay={0.6}
          />
        </motion.div>
      </div>
    </section>
  )
}
