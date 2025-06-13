"use client"

import { motion } from "framer-motion"

interface NeonLineProps {
  className?: string
  color?: "blue" | "purple"
  width?: string
  animated?: boolean
}

export function NeonLine({ className = "", color = "blue", width = "40px", animated = true }: NeonLineProps) {
  const neonColor = color === "blue" ? "neon-blue" : "neon-purple"

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className={`h-0.5 bg-${neonColor} rounded-full`}
        style={{ width }}
        animate={
          animated
            ? {
                boxShadow: [
                  `0 0 5px 2px var(--${neonColor})`,
                  `0 0 10px 4px var(--${neonColor})`,
                  `0 0 5px 2px var(--${neonColor})`,
                ],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
