"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import content from "@/dic/en.json"

export default function TrustedCompanies() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-12 w-full">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center text-xl font-light text-white"
      >
        {content.trustedBy.title}
      </motion.h2>

      <div className="relative overflow-hidden py-6 w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />

        <div className="flex animate-marquee gap-12 opacity-70 w-full">
          {[...content.trustedBy.companies, ...content.trustedBy.companies, ...content.trustedBy.companies].map(
            (company, i) => (
              <div key={`${company.name}-${i}`} className="h-12 w-32 flex-shrink-0">
                <Image
                  src={company.logo || "/placeholder.svg"}
                  alt={company.name}
                  width={128}
                  height={48}
                  className="h-full w-full object-contain brightness-0 invert opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
