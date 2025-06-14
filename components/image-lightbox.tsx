"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ZoomIn, Download } from "lucide-react"
import { ImageWithFallback } from "@/components/image-with-fallback"

interface ImageLightboxProps {
  images: {
    src: string
    alt: string
    caption?: string
  }[]
  isOpen: boolean
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function ImageLightbox({ images, isOpen, currentIndex, onClose, onNavigate }: ImageLightboxProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isZoomed, setIsZoomed] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          navigateToPrevious()
          break
        case "ArrowRight":
          navigateToNext()
          break
        default:
          break
      }
    },
    [isOpen, currentIndex, images.length],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  useEffect(() => {
    setIsLoading(true)
    setIsZoomed(false)
  }, [currentIndex])

  const navigateToPrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    onNavigate(newIndex)
  }

  const navigateToNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
    onNavigate(newIndex)
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  // Mejorar la detección de gestos táctiles
  const minSwipeDistance = 50

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      navigateToNext()
    }
    if (isRightSwipe) {
      navigateToPrevious()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  if (!isOpen) return null

  const currentImage = images[currentIndex]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-[100]  h-[73%] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            className="absolute right-3 top-3 md:right-4 md:top-4 z-[110] rounded-full bg-white/10 p-1.5 md:p-2 text-white backdrop-blur-md transition-all hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          >
            <X className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          {/* Navigation - Previous */}
          <button
            className="absolute left-2 md:left-4 lg:left-8 z-[110] rounded-full bg-white/10 p-1.5 md:p-2 text-white backdrop-blur-md transition-all hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation()
              navigateToPrevious()
            }}
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          {/* Navigation - Next */}
          <button
            className="absolute right-2 md:right-4 lg:right-8 z-[110] rounded-full bg-white/10 p-1.5 md:p-2 text-white backdrop-blur-md transition-all hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation()
              navigateToNext()
            }}
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          {/* Zoom button */}
          <button
            className="absolute bottom-20 right-4 z-[110] rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:bg-white/20 md:right-8"
            onClick={(e) => {
              e.stopPropagation()
              toggleZoom()
            }}
          >
            <ZoomIn className="h-6 w-6" />
          </button>

          {/* Download button */}
          <a
            href={currentImage.src}
            download
            className="absolute bottom-20 left-4 z-[110] rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:bg-white/20 md:left-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Download className="h-6 w-6" />
          </a>

          {/* Image counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white backdrop-blur-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Image container */}
          <motion.div
            className="relative h-full w-full"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex h-full items-center justify-center">
              <div
                className={`relative flex h-full max-h-[80vh] w-full max-w-5xl items-center justify-center overflow-hidden ${
                  isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                }`}
                onClick={toggleZoom}
              >
                <div className="relative h-full w-full">
                  <motion.div
                    className="relative h-full w-full"
                    animate={{
                      scale: isZoomed ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                      </div>
                    )}
                    <div className="relative h-full w-full">
                      <ImageWithFallback
                        src={currentImage.src || "/placeholder.svg"}
                        alt={currentImage.alt}
                        fill
                        className={`object-contain transition-opacity duration-300 ${
                          isLoading ? "opacity-0" : "opacity-100"
                        }`}
                        onLoad={() => setIsLoading(false)}
                        sizes="(max-width: 768px) 100vw, 80vw"
                        priority
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="absolute bottom-4 left-0 right-0 mx-auto w-full max-w-3xl px-3 md:px-4 text-center">
              <div className="rounded-lg bg-black/60 p-2 md:p-3 backdrop-blur-sm">
                <h3 className="mb-0.5 md:mb-1 text-base md:text-lg font-medium text-white">{currentImage.alt}</h3>
                <p className="text-xs md:text-sm text-white/90 line-clamp-2 md:line-clamp-none">
                  {currentImage.caption}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
