"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

interface ScrollRevealTextProps {
  before: string
  after: string
  image: string
  imageAlt?: string
  delay?: number
}

export default function ScrollRevealText({
  before,
  after,
  image,
  imageAlt = "Visual element",
  delay = 0.2,
}: ScrollRevealTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <div ref={ref} className="relative flex flex-col space-y-4 py-8">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay, duration: 0.8 }}
        className="text-lg font-medium text-white"
      >
        {before}
        <span className="mx-2 inline-flex h-10 w-32 items-center justify-center overflow-hidden rounded-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={imageAlt}
            width={120}
            height={40}
            className="h-full w-full object-cover"
          />
        </span>
        {after}
      </motion.p>
    </div>
  )
}
