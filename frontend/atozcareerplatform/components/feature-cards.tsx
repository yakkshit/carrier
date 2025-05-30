"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FileText, Kanban, MessageSquare, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FeatureCards() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const featureCards = [
    {
      title: "AI Resume Builder",
      description: "Generate tailored resumes based on your profile and job descriptions",
      icon: <FileText className="h-10 w-10 text-primary" />,
    },
    {
      title: "Job Tracking",
      description: "Track applications with an automated Kanban board system",
      icon: <Kanban className="h-10 w-10 text-primary" />,
    },
    {
      title: "Interview Prep",
      description: "AI-powered interview questions and preparation strategies",
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
    },
  ]

  return (
    <section id="features" ref={ref} className="relative overflow-hidden py-24 md:py-32">
      {/* Background with blur gradient */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="absolute bottom-0 left-0 right-0 top-1/2 bg-gradient-to-t from-purple-900/20 via-black to-black"></div>
        <div className="absolute bottom-1/2 left-0 right-0 top-0 bg-gradient-to-b from-purple-900/20 via-black to-black"></div>
      </div>

      <div className="container px-4 md:px-6">
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
          className="mx-auto max-w-6xl"
        >
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
            className="mt-16 grid gap-8 md:grid-cols-3"
          >
            {featureCards.map((feature, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  {feature.icon}
                </div>

                <h3 className="mb-2 font-heading text-xl font-bold text-white">{feature.title}</h3>

                <p className="text-muted-foreground">{feature.description}</p>

                <motion.div
                  className="mt-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button variant="ghost" size="sm" className="group/btn p-0">
                    <span className="flex items-center gap-1 text-primary">
                      Learn more
                      <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
