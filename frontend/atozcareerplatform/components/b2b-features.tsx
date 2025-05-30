"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useMotionValue, AnimatePresence, useSpring, useTransform } from "framer-motion"
import {
  Code,
  Database,
  Zap,
  BarChart4,
  Check,
  ChevronLeft,
  ChevronRight,
  Search,
  Calendar,
  FileText,
  MessageSquare,
  Filter,
  Settings,
  PlusCircle,
  Sparkles,
  Globe,
  Shield,
  Terminal,
  Webhook,
  FileJson,
} from "lucide-react"

export default function B2BFeatures() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeFeature, setActiveFeature] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { stiffness: 100, damping: 30 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  // Dashboard state
  const [activeTab, setActiveTab] = useState("candidates")
  const [searchQuery, setSearchQuery] = useState("")
  const [isFiltering, setIsFiltering] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isHoveringRight, setIsHoveringRight] = useState(false)
  const [isHoveringAPI, setIsHoveringAPI] = useState(false)

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  // Auto-rotate through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % integrationFeatures.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const integrationFeatures = [
    {
      title: "API Integration",
      description: "Seamlessly integrate our platform with your existing HR systems and workflows",
      icon: <Code className="h-5 w-5" />,
      color: "from-blue-400 to-indigo-500",
      iconBg: "bg-blue-500/20",
      benefits: [
        "RESTful API with comprehensive documentation",
        "Secure OAuth 2.0 authentication",
        "Webhooks for real-time event notifications",
      ],
    },
    {
      title: "Talent Database",
      description: "Access a vast pool of pre-screened candidates matching your requirements",
      icon: <Database className="h-5 w-5" />,
      color: "from-purple-400 to-pink-500",
      iconBg: "bg-purple-500/20",
      benefits: [
        "Over 1 million pre-vetted candidates",
        "Advanced filtering and search capabilities",
        "AI-powered candidate recommendations",
      ],
    },
    {
      title: "Automated Matching",
      description: "AI-powered matching of candidates to your open positions",
      icon: <Zap className="h-5 w-5" />,
      color: "from-green-400 to-emerald-500",
      iconBg: "bg-green-500/20",
      benefits: [
        "Machine learning algorithms for precise matching",
        "Skill-based compatibility scoring",
        "Continuous learning from hiring outcomes",
      ],
    },
    {
      title: "Analytics Dashboard",
      description: "Comprehensive hiring analytics and performance metrics",
      icon: <BarChart4 className="h-5 w-5" />,
      color: "from-amber-400 to-yellow-500",
      iconBg: "bg-amber-500/20",
      benefits: [
        "Real-time hiring funnel visualization",
        "Custom reporting and data export",
        "Benchmark against industry standards",
      ],
    },
    {
      title: "Global Talent",
      description: "Access talent from around the world with multilingual support",
      icon: <Globe className="h-5 w-5" />,
      color: "from-cyan-400 to-blue-500",
      iconBg: "bg-cyan-500/20",
      benefits: ["Support for 20+ languages", "Region-specific compliance tools", "International payment processing"],
    },
    {
      title: "Enterprise Security",
      description: "Top-tier security with role-based access and data encryption",
      icon: <Shield className="h-5 w-5" />,
      color: "from-fuchsia-400 to-purple-500",
      iconBg: "bg-fuchsia-500/20",
      benefits: ["SOC 2 Type II compliance", "End-to-end encryption", "Granular permission controls"],
    },
  ]

  const candidates = [
    {
      name: "Alex Morgan",
      role: "Senior Frontend Developer",
      image: "/testimonial-1.png",
      match: 95,
      status: "New",
      skills: ["React", "TypeScript", "Next.js"],
      experience: "8 years",
    },
    {
      name: "Sarah Chen",
      role: "UX/UI Designer",
      image: "/testimonial-2.png",
      match: 92,
      status: "Interviewed",
      skills: ["Figma", "User Research", "Prototyping"],
      experience: "6 years",
    },
    {
      name: "Michael Johnson",
      role: "Backend Engineer",
      image: "/testimonial-3.png",
      match: 88,
      status: "New",
      skills: ["Node.js", "Python", "AWS"],
      experience: "5 years",
    },
  ]

  const dashboardStats = [
    { label: "Open Positions", value: "24", change: "+3", up: true },
    { label: "Active Candidates", value: "189", change: "+12", up: true },
    { label: "Interviews This Week", value: "32", change: "-5", up: false },
    { label: "Time to Hire", value: "18d", change: "-2d", up: true },
  ]

  const handlePrevFeature = () => {
    setActiveFeature((prev) => (prev - 1 + integrationFeatures.length) % integrationFeatures.length)
  }

  const handleNextFeature = () => {
    setActiveFeature((prev) => (prev + 1) % integrationFeatures.length)
  }

  // Parallax effect for dashboard elements
  const dashboardY = useTransform(scrollYProgress, [0.1, 0.6], [0, -30])
  const cardsY = useTransform(scrollYProgress, [0.1, 0.6], [30, 0])

  return (
    <section
      id="b2b-features"
      ref={containerRef}
      className="relative overflow-hidden bg-black py-16 md:py-24"
      onMouseMove={onMouseMove}
    >
      {/* Background with subtle grid and gradients */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-grid opacity-20"></div>
        <div className="absolute bottom-0 left-0 right-0 top-1/2 bg-gradient-to-t from-indigo-900/10 via-black to-black"></div>
        <div className="absolute bottom-1/2 left-0 right-0 top-0 bg-gradient-to-b from-indigo-900/10 via-black to-black"></div>
      </div>

      {/* Large blurred gradient orbs for atmosphere */}
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 20, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 2,
        }}
      />

      <div className="container relative z-10 px-4 md:px-6">
        {/* Section title */}
        <div className="mx-auto max-w-2xl text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full bg-white/5 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-sm font-medium text-transparent">
              B2B Solutions
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-6 font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Enterprise Hiring Platform
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 mx-auto max-w-2xl text-gray-400 text-base sm:text-lg"
          >
            Streamline your recruitment process with our AI-powered hiring platform and robust API integrations.
          </motion.p>
        </div>

        {/* Main content with split layout */}
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            {/* Left side - Hiring Dashboard */}
            <motion.div
              style={{ y: dashboardY }}
              className="relative h-[400px] sm:h-[450px] md:h-[500px] rounded-2xl border border-white/10 bg-black/60 p-4 md:p-5 backdrop-blur-lg overflow-hidden"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">Hiring Dashboard</h3>
                  <p className="text-gray-400 text-xs">Manage your recruitment pipeline</p>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 rounded-lg bg-indigo-500/20 px-2.5 py-1 text-xs font-medium text-indigo-400"
                  >
                    <PlusCircle className="h-3 w-3" />
                    <span>New Job</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full bg-gray-800 p-1.5 text-gray-400 hover:text-white"
                  >
                    <Settings className="h-3.5 w-3.5" />
                  </motion.button>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                {dashboardStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="rounded-lg bg-gray-900/50 p-2 backdrop-blur-sm"
                  >
                    <div className="text-xs text-gray-400 mb-0.5">{stat.label}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-base font-bold text-white">{stat.value}</div>
                      <div
                        className={`flex items-center text-xs font-medium ${
                          stat.up ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {stat.change}
                        <svg
                          className={`ml-1 h-2.5 w-2.5 ${!stat.up && "rotate-180"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex items-center border-b border-gray-800 mb-3">
                {["candidates", "jobs", "interviews", "analytics"].map((tab) => (
                  <button
                    key={tab}
                    className={`relative px-3 py-1.5 text-xs font-medium ${
                      activeTab === tab ? "text-white" : "text-gray-400 hover:text-gray-300"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Search and Filter */}
              <div className="flex items-center justify-between mb-3">
                <div className="relative flex-1 max-w-xs">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-gray-800 bg-gray-900/50 py-1.5 pl-8 pr-3 text-xs text-gray-300 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFiltering(!isFiltering)}
                  className={`flex items-center gap-1.5 rounded-lg border ${
                    isFiltering ? "border-indigo-500 bg-indigo-500/20 text-indigo-400" : "border-gray-800 text-gray-400"
                  } px-2.5 py-1.5 text-xs`}
                >
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filter</span>
                </motion.button>
              </div>

              {/* Candidates List */}
              <div className="space-y-2 mb-3 overflow-y-auto max-h-[220px] md:max-h-[270px] pr-1 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                {candidates.map((candidate, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                    viewport={{ once: true }}
                    className={`relative rounded-lg border ${
                      selectedCandidate === i
                        ? "border-indigo-500 bg-indigo-500/10"
                        : "border-gray-800 bg-gray-900/50 hover:border-gray-700"
                    } p-2.5 transition-all duration-200`}
                    onClick={() => setSelectedCandidate(i)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                        <Image
                          src={candidate.image || "/placeholder.svg?height=40&width=40&query=person"}
                          alt={candidate.name}
                          fill
                          className="object-cover"
                        />
                        <div
                          className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-gray-900 ${
                            candidate.status === "New"
                              ? "bg-green-500"
                              : candidate.status === "Interviewed"
                                ? "bg-blue-500"
                                : "bg-purple-500"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="truncate text-xs font-medium text-white">{candidate.name}</h4>
                          <div className="flex items-center">
                            <div className="text-xs font-medium text-indigo-400">{candidate.match}%</div>
                          </div>
                        </div>
                        <div className="mt-0.5 flex items-center justify-between">
                          <p className="truncate text-xs text-gray-400">{candidate.role}</p>
                          <span
                            className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                              candidate.status === "New"
                                ? "bg-green-500/20 text-green-400"
                                : candidate.status === "Interviewed"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-purple-500/20 text-purple-400"
                            }`}
                          >
                            {candidate.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Skills - Only show when selected */}
                    {selectedCandidate === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 pt-2 border-t border-gray-800"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="text-[10px] text-gray-400">Experience: {candidate.experience}</div>
                          <div className="flex gap-1.5">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
                            >
                              <Calendar className="h-3 w-3" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
                            >
                              <MessageSquare className="h-3 w-3" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white"
                            >
                              <FileText className="h-3 w-3" />
                            </motion.button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {candidate.skills.map((skill, j) => (
                            <span key={j} className="rounded-full bg-gray-800 px-2 py-0.5 text-[10px] text-gray-300">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Dashboard Footer */}
              <div className="flex items-center justify-between absolute bottom-4 left-4 right-4">
                <div className="text-[10px] text-gray-400">Showing 3 of 189 candidates</div>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg border border-gray-800 px-2 py-1 text-[10px] text-gray-400 hover:border-gray-700 hover:text-gray-300">
                    Previous
                  </button>
                  <button className="rounded-lg border border-gray-800 px-2 py-1 text-[10px] text-gray-400 hover:border-gray-700 hover:text-gray-300">
                    Next
                  </button>
                </div>
              </div>

              {/* Animated gradient border */}
              <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    background: [
                      "linear-gradient(to right, #4f46e5, #8b5cf6, #4f46e5)",
                      "linear-gradient(to right, #8b5cf6, #4f46e5, #8b5cf6)",
                    ],
                    backgroundSize: ["200% 200%", "200% 200%"],
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                />
              </div>

              {/* Interactive glow effect on hover */}
              <motion.div
                className="absolute inset-0 -z-10 rounded-2xl opacity-0 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 blur-xl"
                animate={{
                  opacity: isHovering ? 0.5 : 0,
                  scale: isHovering ? 1.02 : 1,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Floating particles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-indigo-500/50"
                  style={{
                    top: `${10 + Math.random() * 80}%`,
                    left: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </motion.div>

            {/* Right side - Flipping Cards */}
            <motion.div
              style={{ y: cardsY }}
              className="relative h-[400px] sm:h-[450px] md:h-[500px]"
              onMouseEnter={() => setIsHoveringRight(true)}
              onMouseLeave={() => setIsHoveringRight(false)}
            >
              {/* Card stack with 3D perspective */}
              <div className="relative h-full perspective-1000">
                {/* Render cards in reverse order so the active one is on top */}
                {integrationFeatures.map((feature, index) => {
                  // Calculate z-index and position based on distance from active card
                  const distance = Math.abs(index - activeFeature)
                  const isActive = index === activeFeature
                  const zIndex = integrationFeatures.length - distance

                  // Calculate offset for stacked appearance
                  const offset = isActive ? 0 : -8 * distance

                  return (
                    <AnimatePresence key={feature.title} mode="wait">
                      <motion.div
                        className="absolute inset-0 rounded-2xl border border-white/10 bg-gray-900/80 backdrop-blur-md overflow-hidden"
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
                          <div className="p-5 h-full flex flex-col">
                            <div className="flex flex-col gap-4 flex-1">
                              {/* Header with icon */}
                              <div className="flex items-center gap-4">
                                <motion.div
                                  className={`flex h-12 w-12 items-center justify-center rounded-full ${feature.iconBg}`}
                                  animate={{
                                    boxShadow: [
                                      `0 0 0 rgba(${feature.iconBg.includes("blue") ? "59, 130, 246" : feature.iconBg.includes("purple") ? "139, 92, 246" : feature.iconBg.includes("green") ? "16, 185, 129" : feature.iconBg.includes("amber") ? "245, 158, 11" : feature.iconBg.includes("cyan") ? "6, 182, 212" : "217, 70, 239"}, 0.5)`,
                                      `0 0 20px rgba(${feature.iconBg.includes("blue") ? "59, 130, 246" : feature.iconBg.includes("purple") ? "139, 92, 246" : feature.iconBg.includes("green") ? "16, 185, 129" : feature.iconBg.includes("amber") ? "245, 158, 11" : feature.iconBg.includes("cyan") ? "6, 182, 212" : "217, 70, 239"}, 0.5)`,
                                      `0 0 0 rgba(${feature.iconBg.includes("blue") ? "59, 130, 246" : feature.iconBg.includes("purple") ? "139, 92, 246" : feature.iconBg.includes("green") ? "16, 185, 129" : feature.iconBg.includes("amber") ? "245, 158, 11" : feature.iconBg.includes("cyan") ? "6, 182, 212" : "217, 70, 239"}, 0.5)`,
                                    ],
                                  }}
                                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                >
                                  <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                    className="h-6 w-6 text-white"
                                  >
                                    {feature.icon}
                                  </motion.div>
                                </motion.div>
                                <motion.h3
                                  className="text-xl font-bold text-white"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 }}
                                >
                                  {feature.title}
                                </motion.h3>
                              </div>

                              {/* Description */}
                              <motion.p
                                className="text-gray-300 text-sm"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                              >
                                {feature.description}
                              </motion.p>

                              {/* Benefits */}
                              <motion.div
                                className="space-y-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                              >
                                {feature.benefits.map((benefit, i) => (
                                  <motion.div
                                    key={i}
                                    className="flex items-start gap-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                  >
                                    <div
                                      className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br ${feature.color}`}
                                    >
                                      <Check className="h-2.5 w-2.5 text-white" />
                                    </div>
                                    <span className="text-gray-300 text-xs">{benefit}</span>
                                  </motion.div>
                                ))}
                              </motion.div>

                              {/* Stats or metrics */}
                              <motion.div
                                className="mt-auto grid grid-cols-2 gap-3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                              >
                                <div className="rounded-lg bg-black/30 p-3 backdrop-blur-sm">
                                  <div
                                    className={`text-xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                                  >
                                    {index === 0
                                      ? "100%"
                                      : index === 1
                                        ? "10M+"
                                        : index === 2
                                          ? "95%"
                                          : index === 3
                                            ? "60%"
                                            : index === 4
                                              ? "20+"
                                              : "99.9%"}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {index === 0
                                      ? "API Coverage"
                                      : index === 1
                                        ? "Candidates"
                                        : index === 2
                                          ? "Match Accuracy"
                                          : index === 3
                                            ? "Data Insights"
                                            : index === 4
                                              ? "Languages"
                                              : "Uptime"}
                                  </div>
                                </div>
                                <div className="rounded-lg bg-black/30 p-3 backdrop-blur-sm">
                                  <div
                                    className={`text-xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                                  >
                                    {index === 0
                                      ? "50+"
                                      : index === 1
                                        ? "45%"
                                        : index === 2
                                          ? "2x"
                                          : index === 3
                                            ? "30+"
                                            : index === 4
                                              ? "100+"
                                              : "256-bit"}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {index === 0
                                      ? "Integrations"
                                      : index === 1
                                        ? "Faster Hiring"
                                        : index === 2
                                          ? "Better Matches"
                                          : index === 3
                                            ? "Report Types"
                                            : index === 4
                                              ? "Countries"
                                              : "Encryption"}
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  )
                })}
              </div>

              {/* Navigation controls */}
              <div className="absolute -bottom-12 left-0 right-0 flex items-center justify-center gap-4">
                <motion.button
                  onClick={handlePrevFeature}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </motion.button>

                <div className="flex items-center gap-1.5">
                  {integrationFeatures.map((_, i) => (
                    <button
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeFeature ? "w-5 bg-indigo-500" : "w-1.5 bg-gray-700"
                      }`}
                      onClick={() => setActiveFeature(i)}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={handleNextFeature}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-500/20 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.div
                className="absolute -left-8 bottom-16 h-16 w-16 rounded-full bg-blue-500/20 blur-lg"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 5, delay: 1, repeat: Number.POSITIVE_INFINITY }}
              />

              {/* Interactive glow effect on hover */}
              <motion.div
                className="absolute inset-0 -z-10 rounded-2xl opacity-0 bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-purple-500/30 blur-xl"
                animate={{
                  opacity: isHoveringRight ? 0.5 : 0,
                  scale: isHoveringRight ? 1.02 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>

          {/* API Documentation Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16 mx-auto max-w-7xl rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md relative overflow-hidden"
            onMouseEnter={() => setIsHoveringAPI(true)}
            onMouseLeave={() => setIsHoveringAPI(false)}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-400" />
                API Integration
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/20"
              >
                <Code className="h-4 w-4" />
                <span>View Documentation</span>
              </motion.button>
            </div>

            <div className="rounded-lg border border-gray-800 bg-gray-900/70 p-4 font-mono text-sm text-gray-300 overflow-x-auto">
              <pre className="language-javascript">
                <code>
                  {`// Example API request to fetch candidates
const response = await fetch('https://api.atoz.com/v1/candidates', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const candidates = await response.json();
console.log(candidates);`}
                </code>
              </pre>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="rounded-lg border border-white/10 bg-gray-900/50 p-3 backdrop-blur-sm"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(79, 70, 229, 0.2)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
                    <Terminal className="h-4 w-4 text-blue-400" />
                  </div>
                  <h4 className="font-medium text-white">RESTful API</h4>
                </div>
                <p className="text-xs text-gray-400">
                  Comprehensive API with endpoints for candidates, jobs, and analytics.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="rounded-lg border border-white/10 bg-gray-900/50 p-3 backdrop-blur-sm"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20">
                    <Webhook className="h-4 w-4 text-purple-400" />
                  </div>
                  <h4 className="font-medium text-white">Webhooks</h4>
                </div>
                <p className="text-xs text-gray-400">
                  Real-time event notifications for candidate updates and job changes.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="rounded-lg border border-white/10 bg-gray-900/50 p-3 backdrop-blur-sm"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                    <FileJson className="h-4 w-4 text-green-400" />
                  </div>
                  <h4 className="font-medium text-white">Data Export</h4>
                </div>
                <p className="text-xs text-gray-400">
                  Export candidate data and analytics in multiple formats (JSON, CSV, Excel).
                </p>
              </motion.div>
            </div>

            {/* Interactive glow effect on hover */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-2xl opacity-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20 blur-xl"
              animate={{
                opacity: isHoveringAPI ? 0.4 : 0,
                scale: isHoveringAPI ? 1.01 : 1,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Animated corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-0.5 h-8 bg-indigo-500"
                animate={{ height: [0, 16, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
              />
              <motion.div
                className="absolute top-0 left-0 w-8 h-0.5 bg-indigo-500"
                animate={{ width: [0, 16, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
              />
            </div>

            <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden">
              <motion.div
                className="absolute bottom-0 right-0 w-0.5 h-8 bg-purple-500"
                animate={{ height: [0, 16, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2, delay: 1.5 }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-8 h-0.5 bg-purple-500"
                animate={{ width: [0, 16, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2, delay: 1.5 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
