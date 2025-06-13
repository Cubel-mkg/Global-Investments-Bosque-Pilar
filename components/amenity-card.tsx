"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ImageWithFallback } from "@/components/image-with-fallback"

interface AmenityCardProps {
  title: string
  description: string
  icon: React.ReactNode
  image: string
  index: number
}

export function AmenityCard({ title, description, icon, image, index }: AmenityCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 will-change-transform"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bosque/70 to-transparent opacity-60"></div>

        {/* Colored top border that animates on hover */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bosque to-tierra transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"></div>
      </div>

      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-full bg-arena mr-3 shadow-sm">{icon}</div>
          <h3 className="text-xl font-serif font-bold">{title}</h3>
        </div>

        <p className="text-bosque/80">{description}</p>
      </div>
    </motion.div>
  )
}
