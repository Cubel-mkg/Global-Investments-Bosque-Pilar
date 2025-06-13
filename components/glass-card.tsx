"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"

interface GlassCardProps {
  children: ReactNode
  className?: string
  variant?: "light" | "dark" | "accent"
  interactive?: boolean
}

export function GlassCard({ children, className = "", variant = "light", interactive = true }: GlassCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !interactive) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate mouse position relative to card center
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Calculate rotation (limited to small angles)
    const rotateX = (mouseY / (rect.height / 2)) * -3
    const rotateY = (mouseX / (rect.width / 2)) * 3

    setRotateX(rotateX)
    setRotateY(rotateY)
    setMouseX(mouseX)
    setMouseY(mouseY)
  }

  const handleMouseLeave = () => {
    // Reset rotation when mouse leaves
    setRotateX(0)
    setRotateY(0)
  }

  const baseClasses = {
    light: "bg-white/30 backdrop-blur-md border border-white/20 shadow-lg",
    dark: "bg-bosque-dark/30 backdrop-blur-md border border-bosque-lightest/20 shadow-lg",
    accent: "bg-tierra/20 backdrop-blur-md border border-tierra-light/20 shadow-lg",
  }

  const gradientClasses = {
    light: "bg-gradient-to-br from-white/40 to-white/20",
    dark: "bg-gradient-to-br from-bosque-dark/40 to-bosque-dark/20",
    accent: "bg-gradient-to-br from-tierra/30 to-tierra/10",
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl ${baseClasses[variant]} ${gradientClasses[variant]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      animate={
        interactive
          ? {
              rotateX,
              rotateY,
            }
          : {}
      }
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Edge highlight */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 20px 5px rgba(255, 255, 255, 0.2)`,
          transform: `translateZ(5px)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
