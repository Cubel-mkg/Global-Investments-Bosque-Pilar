"use client"

import { motion } from "framer-motion"

interface GeometricShapeProps {
  type: "circle" | "triangle" | "square" | "hexagon"
  className?: string
  animate?: boolean
}

export function GeometricShape({ type, className = "", animate = false }: GeometricShapeProps) {
  // SVG paths for different shapes
  const shapes = {
    circle: <circle cx="50%" cy="50%" r="40%" />,
    triangle: <polygon points="50,10 90,90 10,90" />,
    square: <rect x="10%" y="10%" width="80%" height="80%" />,
    hexagon: <polygon points="50,0 90,25 90,75 50,100 10,75 10,25" />,
  }

  const animation = animate
    ? {
        rotate: [0, 360],
        scale: [1, 1.05, 1],
        opacity: [0.2, 0.3, 0.2],
      }
    : {}

  const transition = {
    duration: 20,
    repeat: Number.POSITIVE_INFINITY,
    ease: "linear",
  }

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={`fill-current ${className}`}
      animate={animation}
      transition={transition}
    >
      {shapes[type]}
    </motion.svg>
  )
}
