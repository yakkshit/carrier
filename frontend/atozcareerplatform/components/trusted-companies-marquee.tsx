"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import content from "@/dic/en.json"

export default function TrustedCompaniesMarquee() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Double the companies array to ensure seamless looping
  const companies = [...content.trustedBy.companies, ...content.trustedBy.companies]

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-16 w-full">
      {/* Background with blur gradient */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="absolute bottom-0 left-0 right-0 top-1/2 bg-gradient-to-t from-blue-900/10 via-black to-black"></div>
        <div className="absolute bottom-1/2 left-0 right-0 top-0 bg-gradient-to-b from-blue-900/10 via-black to-black"></div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center text-xl font-light text-white"
      >
        {content.trustedBy.title}
      </motion.h2>

      <div className="relative w-full overflow-hidden">
        {/* First marquee row */}
        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />

          <div className="flex animate-marquee whitespace-nowrap">
            {companies.map((company, i) => (
              <div key={`${company.name}-${i}`} className="mx-8 h-12 w-32 flex-shrink-0">
                <Image
                  src={company.logo || "/placeholder.svg"}
                  alt={company.name}
                  width={128}
                  height={48}
                  className="h-full w-full object-contain brightness-0 invert opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Second marquee row going in the opposite direction */}
        <div className="relative mt-8 w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />

          <div className="flex animate-marquee-reverse whitespace-nowrap">
            {[...companies].reverse().map((company, i) => (
              <div key={`reverse-${company.name}-${i}`} className="mx-8 h-12 w-32 flex-shrink-0">
                <Image
                  src={company.logo || "/placeholder.svg"}
                  alt={company.name}
                  width={128}
                  height={48}
                  className="h-full w-full object-contain brightness-0 invert opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
