"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { HolographicCard } from "@/components/holographic-card"

interface Amenity {
  title: string
  description: string
  icon: React.ReactNode
  image: string
}

interface AmenityCarouselProps {
  amenities: Amenity[]
}

export function AmenityCarousel({ amenities }: AmenityCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % amenities.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + amenities.length) % amenities.length)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return
    setIsDragging(true)
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollLeft(carouselRef.current?.scrollLeft || 0)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2 // Scroll speed multiplier
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
  }

  if (isMobile) {
    return (
      <div className="overflow-x-auto pb-6 hide-scrollbar" ref={carouselRef}>
        <div className="flex gap-6 min-w-max px-4">
          {amenities.map((amenity, index) => (
            <HolographicCard key={index} className="min-w-[280px] max-w-[280px] overflow-hidden flex flex-col">
              <div className="relative h-48 w-full">
                <Image src={amenity.image || "/placeholder.svg"} alt={amenity.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-space-black/80 to-transparent"></div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4 flex items-center">
                  {amenity.icon}
                  <h3 className="ml-2 text-xl font-bold text-space-white">{amenity.title}</h3>
                </div>
                <p className="text-space-white/80 flex-1">{amenity.description}</p>
                <Button variant="neon-outline" className="mt-4">
                  Saber Más
                </Button>
              </div>
            </HolographicCard>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 absolute w-full"
          >
            <div className="col-span-1 md:col-span-1 lg:col-span-2 futuristic-image-container overflow-hidden">
              <div className="relative h-[400px] w-full">
                <Image
                  src={amenities[currentIndex].image || "/placeholder.svg"}
                  alt={amenities[currentIndex].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-black/80 to-transparent flex items-end">
                  <div className="p-8 text-space-white futuristic-overlay">
                    <h3 className="text-2xl font-bold mb-2">{amenities[currentIndex].title}</h3>
                    <p className="text-space-white/90 max-w-xl">{amenities[currentIndex].description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    index === currentIndex ? "futuristic-card-selected" : "futuristic-card-option hover:bg-neon-blue/10"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-full ${index === currentIndex ? "bg-neon-blue/20" : "bg-neon-purple/10"}`}
                    >
                      {amenity.icon}
                    </div>
                    <h3 className="ml-3 font-semibold">{amenity.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
        <button onClick={prevSlide} className="futuristic-nav-button" aria-label="Amenidad anterior">
          <ChevronLeft className="h-6 w-6 text-neon-blue" />
        </button>
      </div>
      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
        <button onClick={nextSlide} className="futuristic-nav-button" aria-label="Siguiente amenidad">
          <ChevronRight className="h-6 w-6 text-neon-blue" />
        </button>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {amenities.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-neon-blue" : "w-2 bg-space-white/30 hover:bg-space-white/50"
            }`}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>

      {/* Empty div for spacing to accommodate absolute positioned carousel */}
      <div className="h-[500px]"></div>
    </div>
  )
}
