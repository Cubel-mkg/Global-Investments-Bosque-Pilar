"use client"

import { motion, useScroll, useTransform } from "framer-motion"

export function ParallaxBackground() {
  const { scrollYProgress } = useScroll()

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "35%"])

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Decorative elements that move at different speeds */}
      <motion.div
        className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-tierra/10 blur-3xl"
        style={{ y: y1, opacity }}
      />

      <motion.div
        className="absolute top-[40%] right-[15%] w-48 h-48 rounded-full bg-bosque/10 blur-3xl"
        style={{ y: y2, opacity }}
      />

      <motion.div
        className="absolute bottom-[30%] left-[30%] w-40 h-40 rounded-full bg-arena/20 blur-3xl"
        style={{ y: y3, opacity }}
      />
    </div>
  )
}
