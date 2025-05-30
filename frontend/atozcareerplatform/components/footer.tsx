"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import content from "@/dic/en.json"

export default function Footer() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <footer className="relative bg-white text-gray-800 transition-colors duration-300 dark:bg-black dark:text-white">
      {/* Dot pattern background - visible only in dark mode */}
      <div
        className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 dark:opacity-100"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23333333'/%3E%3C/svg%3E")`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Gradient background - visible only in dark mode */}
      <div
        className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 dark:opacity-100"
        style={{
          background: "radial-gradient(circle at bottom, rgba(120,70,190,0.1), transparent 70%)",
        }}
      />

      {/* Light mode subtle pattern */}
      <div
        className="absolute inset-0 z-0 opacity-100 transition-opacity duration-300 dark:opacity-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23EEEEEE'/%3E%3C/svg%3E")`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="container relative z-10 px-4 py-16 md:px-6 md:py-24">
        <div className="flex items-center justify-between border-b border-gray-200 pb-8 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900">
              <span className="font-heading text-xl font-bold">A</span>
            </div>
            <span className="font-heading text-2xl font-bold">AtoZ</span>
          </div>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="group flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          )}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-4"
        >
          {/* Company Links */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {content.footer.company}
            </h3>
            <ul className="space-y-6">
              {content.footer.companyLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.url}
                    className="group flex items-center gap-2 text-base transition-colors hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Product Links */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {content.footer.product}
            </h3>
            <ul className="space-y-6">
              {content.footer.productLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.url}
                    className="group flex items-center gap-2 text-base transition-colors hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {content.footer.resources}
            </h3>
            <ul className="space-y-6">
              {content.footer.resourcesLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.url}
                    className="group flex items-center gap-2 text-base transition-colors hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {content.footer.contact.title}
            </h3>
            <div className="space-y-4">
              <p className="text-xl font-light md:text-2xl">{content.footer.contact.email}</p>
              <p className="text-xl font-light md:text-2xl">{content.footer.contact.phone}</p>
            </div>
            <div className="flex gap-4">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom section with logo and copyright */}
        <div className="relative mt-24">
          {/* Large gradient logo text - different styling for light/dark mode */}
          <div className="absolute inset-x-0 -bottom-10 flex justify-center overflow-hidden">
            <h2
              className="text-[12rem] font-bold tracking-tighter opacity-10 transition-all duration-300 dark:opacity-20 md:text-[16rem]"
              style={{
                background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                className: "dark:hidden",
              }}
            >
              ATOZ
            </h2>
            <h2
              className="hidden text-[12rem] font-bold tracking-tighter opacity-0 transition-all duration-300 dark:block dark:opacity-20 md:text-[16rem]"
              style={{
                background: "linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.1))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ATOZ
            </h2>
          </div>

          {/* Copyright and legal links */}
          <div className="relative z-10 flex flex-col justify-between border-t border-gray-200 pt-8 dark:border-gray-800 md:flex-row">
            <motion.div variants={itemVariants} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span>{content.footer.copyright}</span>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-4 flex flex-wrap gap-6 md:mt-0">
              {content.footer.legalLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.url}
                  className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
