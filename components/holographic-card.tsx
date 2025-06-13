"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"

interface HolographicCardProps {
  children: ReactNode
  className?: string
}

export function HolographicCard({ children, className = "" }: HolographicCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate mouse position relative to card center
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Calculate rotation (limited to small angles)
    const rotateX = (mouseY / (rect.height / 2)) * -5
    const rotateY = (mouseX / (rect.width / 2)) * 5

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

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl bg-space-black/30 backdrop-blur-md border border-neon-blue/30 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Holographic gradient overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + mouseX / 20}% ${50 + mouseY / 20}%, rgba(79, 172, 254, 0.8), rgba(163, 130, 209, 0.6), rgba(0, 242, 254, 0.4))`,
          transform: `translateZ(10px)`,
          mixBlendMode: "screen",
        }}
      />

      {/* Edge highlight */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 20px 5px rgba(79, 172, 254, 0.5)`,
          transform: `translateZ(5px)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
