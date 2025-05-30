"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FileText, Kanban, MessageSquare, Send, BarChart4, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Define the content directly in the component to avoid import issues
const content = {
  features: {
    title: "Features",
    subtitle: "Tools to enhance your career journey",
    list: [
      {
        title: "Smart Resume Builder",
        description:
          "Create professional resumes tailored to specific job descriptions with AI-powered suggestions and formatting.",
      },
      {
        title: "Job Application Tracker",
        description:
          "Organize and monitor all your job applications in one place with status updates and follow-up reminders.",
      },
      {
        title: "Interview Preparation",
        description:
          "Practice with AI-simulated interviews specific to your industry and receive feedback to improve your performance.",
      },
      {
        title: "Networking Tools",
        description:
          "Connect with professionals in your field and leverage your existing network to discover new opportunities.",
      },
      {
        title: "Career Analytics",
        description:
          "Gain insights into your job search performance and identify areas for improvement with detailed metrics.",
      },
    ],
  },
}

export default function Features() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const featureIcons = [
    <FileText key="filetext" className="h-10 w-10 text-primary" />,
    <Kanban key="kanban" className="h-10 w-10 text-primary" />,
    <MessageSquare key="messagesquare" className="h-10 w-10 text-primary" />,
    <Send key="send" className="h-10 w-10 text-primary" />,
    <BarChart4 key="barchart4" className="h-10 w-10 text-primary" />,
  ]

  return (
    <section id="features" ref={ref} className="relative overflow-hidden py-24 md:py-32">
      {/* Inbound curve at top */}
      <div className="absolute inset-x-0 top-0">
        <svg
          className="w-full text-muted/30"
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 48H60C120 48 240 48 360 48C480 48 600 48 720 48C840 48 960 48 1080 48C1200 48 1320 48 1380 48H1440V0L1380 16C1320 32 1200 64 1080 69.3C960 74.7 840 53.3 720 37.3C600 21.3 480 10.7 360 5.3C240 0 120 0 60 0H0V48Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(to bottom left, transparent, hsl(var(--primary)/0.1))",
        }}
      />

      <div className="container px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={containerVariants} className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {content.features.list.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-xl border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  {featureIcons[i]}
                </div>

                <h3 className="mb-2 font-heading text-xl font-bold">{feature.title}</h3>

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
