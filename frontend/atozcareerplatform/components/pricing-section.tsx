"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView, useMotionTemplate, useMotionValue } from "framer-motion"
import { Check, X, ArrowRight, Users, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import content from "@/dic/en.json"

export default function PricingSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isAnnual, setIsAnnual] = useState(true)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const [activeTab, setActiveTab] = useState("individual")

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-24 md:py-32" onMouseMove={onMouseMove}>
      {/* Background with blur gradient */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="absolute bottom-0 left-0 right-0 top-1/2 bg-gradient-to-t from-blue-900/20 via-black to-black"></div>
        <div className="absolute bottom-1/2 left-0 right-0 top-0 bg-gradient-to-b from-blue-900/20 via-black to-black"></div>
      </div>

      {/* Enhanced corner glow effects */}
      <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px]" />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="mx-auto mb-6 inline-flex items-center rounded-full bg-white/5 px-4 py-1.5 backdrop-blur-md">
              <span className="text-gradient text-sm font-medium">{content.pricing.title}</span>
            </div>
            <h2 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              {content.pricing.heading} <span className="italic text-gray-300">{content.pricing.subheading}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400 md:text-lg">{content.pricing.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-8 flex justify-center"
          >
            <div className="inline-flex rounded-full bg-white/5 p-1 backdrop-blur-md">
              <button
                onClick={() => setActiveTab("individual")}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === "individual"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Users className="h-4 w-4" />
                <span>{content.pricing.tabs.individual}</span>
              </button>
              <button
                onClick={() => setActiveTab("business")}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === "business"
                    ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Building2 className="h-4 w-4" />
                <span>{content.pricing.tabs.business}</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 p-1 backdrop-blur-md">
              <span className={`text-sm ${isAnnual ? "text-gray-400" : "text-white"}`}>
                {content.pricing.billing.monthly}
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnnual ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`flex items-center gap-1 text-sm ${isAnnual ? "text-white" : "text-gray-400"}`}>
                {content.pricing.billing.yearly}{" "}
                <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-400">
                  {content.pricing.billing.discount}
                </span>
              </span>
            </div>
          </motion.div>

          <div className="mt-16">
            {activeTab === "individual" ? (
              <div className="grid gap-8 md:grid-cols-3">
                {content.pricing.individual.map((plan, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    viewport={{ once: true }}
                    className={`group relative overflow-hidden rounded-xl border ${
                      plan.popular ? "border-purple-500/50 bg-white/10" : "border-white/10 bg-white/5"
                    } backdrop-blur-md ${plan.popular ? "ring-2 ring-purple-500/50" : ""}`}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    {plan.popular && (
                      <div className="absolute -right-12 top-7 w-40 rotate-45 bg-gradient-to-r from-purple-500 to-blue-500 py-1 text-center text-xs font-medium text-white">
                        {content.pricing.popularLabel}
                      </div>
                    )}

                    <motion.div
                      className="pointer-events-none absolute -inset-px z-0 opacity-0 transition duration-300 group-hover:opacity-100"
                      style={{
                        background: useMotionTemplate`
                          radial-gradient(
                            250px circle at ${mouseX}px ${mouseY}px,
                            rgba(120, 120, 255, 0.15),
                            transparent 80%
                          )
                        `,
                      }}
                    />

                    <div className="relative z-10 p-6">
                      <h3 className="font-heading text-xl font-bold text-white">{plan.name}</h3>
                      <p className="mt-2 text-sm text-gray-400">{plan.description}</p>

                      <div className="mt-6">
                        <div className="flex items-end">
                          <span className="text-3xl font-bold text-white">$</span>
                          <span className="font-heading text-5xl font-bold text-white">
                            {isAnnual ? plan.annual : plan.monthly}
                          </span>
                          {plan.period && (
                            <span className="ml-1 text-sm text-gray-400">
                              {isAnnual ? content.pricing.billingPeriod.annual : content.pricing.billingPeriod.monthly}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button
                          className={`group relative w-full overflow-hidden rounded-full bg-gradient-to-r ${plan.color} text-white hover:from-purple-600 hover:to-blue-600`}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {plan.cta}
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                          <span className="absolute inset-0 z-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </Button>
                      </div>

                      <div className="mt-8 space-y-4">
                        {plan.features.map((feature, j) => (
                          <div key={j} className="flex items-start gap-3">
                            {feature.included ? (
                              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/20">
                                <Check className="h-3 w-3 text-green-500" />
                              </div>
                            ) : (
                              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-800">
                                <X className="h-3 w-3 text-gray-500" />
                              </div>
                            )}
                            <span className={feature.included ? "text-gray-300" : "text-gray-500"}>{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-3">
                {content.pricing.business.map((plan, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    viewport={{ once: true }}
                    className={`group relative overflow-hidden rounded-xl border ${
                      plan.popular ? "border-indigo-500/50 bg-white/10" : "border-white/10 bg-white/5"
                    } backdrop-blur-md ${plan.popular ? "ring-2 ring-indigo-500/50" : ""}`}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    {plan.popular && (
                      <div className="absolute -right-12 top-7 w-40 rotate-45 bg-gradient-to-r from-indigo-500 to-blue-500 py-1 text-center text-xs font-medium text-white">
                        {content.pricing.popularLabel}
                      </div>
                    )}

                    <motion.div
                      className="pointer-events-none absolute -inset-px z-0 opacity-0 transition duration-300 group-hover:opacity-100"
                      style={{
                        background: useMotionTemplate`
                          radial-gradient(
                            250px circle at ${mouseX}px ${mouseY}px,
                            rgba(120, 120, 255, 0.15),
                            transparent 80%
                          )
                        `,
                      }}
                    />

                    <div className="relative z-10 p-6">
                      <div className="flex items-center gap-2">
                        <div
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${plan.color} p-1.5`}
                        >
                          <div className="flex h-full w-full items-center justify-center rounded-full bg-black/50">
                            <Building2 className="h-5 w-5" />
                          </div>
                        </div>
                        <h3 className="font-heading text-xl font-bold text-white">{plan.name}</h3>
                      </div>
                      <p className="mt-2 text-sm text-gray-400">{plan.description}</p>

                      <div className="mt-6">
                        <div className="flex items-end">
                          {plan.price !== "Custom" && <span className="text-3xl font-bold text-white">$</span>}
                          <span className="font-heading text-5xl font-bold text-white">{plan.price}</span>
                          {plan.period && (
                            <span className="ml-1 text-sm text-gray-400">
                              {isAnnual ? content.pricing.billingPeriod.annual : content.pricing.billingPeriod.monthly}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button
                          className={`group relative w-full overflow-hidden rounded-full bg-gradient-to-r ${plan.color} text-white hover:from-indigo-600 hover:to-blue-600`}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {plan.cta}
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                          <span className="absolute inset-0 z-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </Button>
                      </div>

                      <div className="mt-8 space-y-4">
                        {plan.features.map((feature, j) => (
                          <div key={j} className="flex items-start gap-3">
                            {feature.included ? (
                              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/20">
                                <Check className="h-3 w-3 text-green-500" />
                              </div>
                            ) : (
                              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-800">
                                <X className="h-3 w-3 text-gray-500" />
                              </div>
                            )}
                            <span className={feature.included ? "text-gray-300" : "text-gray-500"}>{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 rounded-xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md"
          >
            <h3 className="font-heading text-2xl font-bold text-white">{content.pricing.custom.title}</h3>
            <p className="mx-auto mt-2 max-w-2xl text-gray-400">{content.pricing.custom.description}</p>
            <div className="mt-6">
              <Button
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
                size="lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {content.pricing.custom.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 z-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
