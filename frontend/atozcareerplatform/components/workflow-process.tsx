"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, Users, FileText, MessageSquare, Calendar, ChevronRight, ChevronLeft } from "lucide-react"

export default function WorkflowProcess() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right

  // Manual navigation
  const goToStep = (step: number) => {
    if (step >= 0 && step < workflowSteps.length) {
      setDirection(step > activeStep ? 1 : -1)
      setActiveStep(step)
    }
  }

  const workflowSteps = [
    {
      id: "connect",
      title: "Connect",
      description: "Create your profile and connect your existing resume and job preferences.",
      icon: <Users className="h-6 w-6" />,
      color: "from-blue-400 to-blue-600",
      glowColor: "bg-blue-500/20",
      features: [
        "Create a detailed profile with your skills, experience, education, and career preferences",
        "Upload existing resumes to jumpstart your profile creation",
        "Set your job search preferences and career goals",
      ],
    },
    {
      id: "analyze",
      title: "Analyze",
      description: "Our AI analyzes your skills, experience, and career goals.",
      icon: <FileText className="h-6 w-6" />,
      color: "from-purple-400 to-purple-600",
      glowColor: "bg-purple-500/20",
      features: [
        "AI generates tailored resumes based on your profile and specific job descriptions",
        "Customize and edit your resume with our integrated editor",
        "Generate matching cover letters optimized for each application",
      ],
    },
    {
      id: "optimize",
      title: "Optimize",
      description: "Receive tailored resumes, cover letters, and interview preparation.",
      icon: <MessageSquare className="h-6 w-6" />,
      color: "from-green-400 to-green-600",
      glowColor: "bg-green-500/20",
      features: [
        "Automatically track applications with our Kanban board system",
        "Move applications through stages: Applied, Interview, and Decision",
        "Get reminders for follow-ups and next steps",
      ],
    },
    {
      id: "apply",
      title: "Apply",
      description: "Apply to jobs with confidence and track your applications.",
      icon: <Calendar className="h-6 w-6" />,
      color: "from-amber-400 to-amber-600",
      glowColor: "bg-amber-500/20",
      features: [
        "AI predicts potential interview questions based on the job description",
        "Get suggested answers tailored to your experience and skills",
        "Practice with our interactive interview simulator",
      ],
    },
  ]

  // Card flip variants
  const cardVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
      },
    }),
  }

  return (
    <section id="workflow-process" ref={containerRef} className="relative overflow-hidden bg-black py-16 md:py-24">
      {/* Background with subtle grid and gradients */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-grid opacity-20"></div>
        <div className="absolute bottom-0 left-0 right-0 top-1/2 bg-gradient-to-t from-blue-900/10 via-black to-black"></div>
        <div className="absolute bottom-1/2 left-0 right-0 top-0 bg-gradient-to-b from-blue-900/10 via-black to-black"></div>
      </div>

      {/* Large blurred gradient orbs for atmosphere */}
      <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="absolute -right-32 top-3/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

      {/* Animated particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 10,
          }}
        />
      ))}

      <div className="container relative z-10 px-4 md:px-6">
        {/* Section title */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full bg-white/5 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-sm font-medium text-transparent">
              Process
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            3 Simple steps and
            <br />
            kickstart
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 mx-auto max-w-2xl text-gray-400 text-base sm:text-lg"
          >
            Our platform guides you through every step of your job search process with AI-powered tools and intuitive
            interfaces.
          </motion.p>
        </div>

        {/* Main content with cards */}
        <div className="relative">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            {/* Left side - Card with icon */}
            <div className="w-full md:w-5/12">
              <div className="w-full h-[500px] md:h-[600px] perspective-1000">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeStep}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-sm shadow-xl h-full flex flex-col"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)`,
                      boxShadow: `0 0 40px 5px ${workflowSteps[activeStep].color.split(" ")[0].replace("from-", "")}15`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Step indicator */}
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm">
                        <span className="text-white font-bold">{activeStep + 1}</span>
                      </div>
                      <div className="h-0.5 w-12 bg-gradient-to-r from-white/50 to-white/0"></div>
                    </div>

                    {/* Progress indicator */}
                    <div className="absolute top-6 right-6 flex items-center gap-1.5">
                      {workflowSteps.map((_, i) => (
                        <motion.button
                          key={i}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === activeStep ? "w-6 bg-white" : "w-1.5 bg-white/30"
                          }`}
                          whileHover={{ scale: 1.5 }}
                          onClick={() => goToStep(i)}
                        />
                      ))}
                    </div>

                    {/* Enhanced glowing orbit around icon */}
                    <div className="flex items-center justify-center relative h-36 w-36 mx-auto mt-8 mb-6">
                      {/* Multiple orbiting particles */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute h-3 w-3 rounded-full"
                          style={{
                            background: `linear-gradient(135deg, ${workflowSteps[activeStep].color.split(" ")[0].replace("from-", "")}, ${workflowSteps[activeStep].color.split(" ")[1].replace("to-", "")})`,
                            top: "50%",
                            left: "50%",
                            x: "-50%",
                            y: "-50%",
                          }}
                          animate={{
                            x: `calc(${Math.cos(i * (Math.PI / 4)) * 60}px - 50%)`,
                            y: `calc(${Math.sin(i * (Math.PI / 4)) * 60}px - 50%)`,
                            scale: [1, 1.2, 1],
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 8,
                            delay: i * 0.5,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                          }}
                        />
                      ))}

                      {/* Rotating gradient ring */}
                      <motion.div
                        className="absolute h-32 w-32 rounded-full"
                        style={{
                          background: `conic-gradient(from 0deg, transparent, ${workflowSteps[activeStep].color.split(" ")[0].replace("from-", "")}, ${workflowSteps[activeStep].color.split(" ")[1].replace("to-", "")}, transparent)`,
                          opacity: 0.3,
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />

                      {/* Center icon background */}
                      <div className="absolute h-24 w-24 rounded-full bg-black/80 flex items-center justify-center z-10">
                        <div
                          className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${workflowSteps[activeStep].color}`}
                        >
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black">
                            <motion.div
                              animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                              }}
                            >
                              {workflowSteps[activeStep].icon}
                            </motion.div>
                          </div>
                        </div>
                      </div>

                      {/* Animated pulse */}
                      <motion.div
                        className="absolute h-full w-full rounded-full"
                        initial={{ opacity: 0.7, scale: 0.9 }}
                        animate={{ opacity: 0, scale: 1.2 }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <div className={`h-full w-full rounded-full ${workflowSteps[activeStep].glowColor} blur-md`} />
                      </motion.div>
                    </div>

                    <motion.h3
                      className="text-center text-2xl font-bold text-white mb-4"
                      animate={{
                        textShadow: [
                          "0 0 8px rgba(255,255,255,0)",
                          "0 0 16px rgba(255,255,255,0.3)",
                          "0 0 8px rgba(255,255,255,0)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    >
                      {workflowSteps[activeStep].title}
                    </motion.h3>

                    <p className="text-center text-gray-400 mb-6">{workflowSteps[activeStep].description}</p>

                    {/* Feature list */}
                    <div className="space-y-3 mt-auto mb-6">
                      {workflowSteps[activeStep].features.map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 + 0.1 * i }}
                        >
                          <div
                            className={`mt-1 rounded-full bg-${workflowSteps[activeStep].color.split("-")[1].split(" ")[0]}-500/20 p-1`}
                          >
                            <Check
                              className={`h-3 w-3 text-${workflowSteps[activeStep].color.split("-")[1].split(" ")[0]}-500`}
                            />
                          </div>
                          <p className="text-gray-300 text-sm">{feature}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex justify-between mt-auto">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm ${
                          activeStep === 0
                            ? "opacity-50 cursor-not-allowed bg-white/10"
                            : "bg-white/20 hover:bg-white/30"
                        }`}
                        onClick={() => goToStep(activeStep - 1)}
                        disabled={activeStep === 0}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span>Previous</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm ${
                          activeStep === workflowSteps.length - 1
                            ? "opacity-50 cursor-not-allowed bg-white/10"
                            : "bg-white/20 hover:bg-white/30"
                        }`}
                        onClick={() => goToStep(activeStep + 1)}
                        disabled={activeStep === workflowSteps.length - 1}
                      >
                        <span>Next</span>
                        <ChevronRight className="h-4 w-4" />
                      </motion.button>
                    </div>

                    {/* Notification badge - only on optimize step */}
                    {activeStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute top-4 right-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/80 px-4 py-2 backdrop-blur-sm"
                      >
                        <div className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
                        </div>
                        <span className="text-xs font-medium text-white">New update v.1.2.0 is live</span>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right side - Stacked cards (hidden on mobile) */}
            <div className="w-full md:w-7/12 relative hidden md:block">
              <div className="relative h-[500px] md:h-[600px] perspective-1000">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeStep}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:border-white/20 h-full flex flex-col"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%)`,
                        boxShadow: `0 0 40px 5px ${workflowSteps[activeStep].color.split(" ")[0].replace("from-", "")}15`,
                      }}
                    >
                      {/* Step number */}
                      <div className="absolute -left-8 top-0 hidden text-8xl font-bold text-white/5 md:block">
                        {activeStep + 1}
                      </div>

                      {/* Animated corner accent */}
                      <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                        <div
                          className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-br ${workflowSteps[activeStep].color} rotate-45 translate-x-6 -translate-y-6`}
                          style={{
                            opacity: 0.7,
                          }}
                        ></div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <span
                          className={`inline-block w-8 h-8 rounded-full mr-3 bg-gradient-to-br ${workflowSteps[activeStep].color} flex items-center justify-center text-sm`}
                        >
                          {activeStep + 1}
                        </span>
                        {workflowSteps[activeStep].title}
                      </h3>

                      <p className="text-gray-300 mb-6">{workflowSteps[activeStep].description}</p>

                      <div className="space-y-4 mb-6">
                        {workflowSteps[activeStep].features.map((feature, i) => (
                          <motion.div
                            key={i}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 + 0.1 * i }}
                          >
                            <div
                              className={`mt-1 rounded-full bg-${workflowSteps[activeStep].color.split("-")[1].split(" ")[0]}-500/20 p-1`}
                            >
                              <Check
                                className={`h-4 w-4 text-${workflowSteps[activeStep].color.split("-")[1].split(" ")[0]}-500`}
                              />
                            </div>
                            <p className="text-gray-300">{feature}</p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Screenshot or illustration - Now with proper containment */}
                      <div className="mt-auto">
                        <motion.div
                          className="rounded-lg overflow-hidden border border-white/10"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="aspect-video bg-black/40 backdrop-blur-sm flex items-center justify-center relative overflow-hidden">
                            {/* Animated background */}
                            <motion.div
                              className="absolute inset-0 opacity-20"
                              style={{
                                background: `linear-gradient(135deg, transparent, ${workflowSteps[activeStep].color.split(" ")[0].replace("from-", "")}, ${workflowSteps[activeStep].color.split(" ")[1].replace("to-", "")}, transparent)`,
                              }}
                              animate={{
                                backgroundPosition: ["0% 0%", "100% 100%"],
                              }}
                              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                            />

                            <motion.div
                              className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${workflowSteps[activeStep].color} px-4 py-2 text-white`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span>View Demo</span>
                              <ArrowRight className="h-4 w-4" />
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
