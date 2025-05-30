"use client"

import { useEffect } from "react"

export default function ScrollAnimations() {
  useEffect(() => {
    // Create a smooth scroll effect
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll("[data-scroll]")

      scrollElements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0

        if (isVisible) {
          element.classList.add("scroll-visible")
        }
      })
    }

    // Add parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const parallaxElements = document.querySelectorAll("[data-parallax]")

      parallaxElements.forEach((element) => {
        const speed = Number.parseFloat(element.getAttribute("data-parallax") || "0.1")
        const x = (window.innerWidth / 2 - e.clientX) * speed
        const y = (window.innerHeight / 2 - e.clientY) * speed

        element.setAttribute("style", `transform: translate(${x}px, ${y}px);`)
      })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return null
}
