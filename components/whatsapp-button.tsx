"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const whatsappLink =
    "https://wa.me/5491168489534?text=Hola%2C%20vengo%20del%20sitio%20web%20de%20Bosque%20Pilar%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n"

  useEffect(() => {
    // Show the button after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)

    // Show tooltip after the button appears
    const tooltipTimer = setTimeout(() => {
      setIsTooltipVisible(true)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearTimeout(tooltipTimer)
    }
  }, [])

  const handleCloseTooltip = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault() // Prevent any default behavior
    setIsTooltipVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600"
            aria-label="Contactar por WhatsApp"
            onClick={() => setIsTooltipVisible(false)}
          >
            <MessageCircle className="h-7 w-7" />

            {/* Pulse animation */}
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>

            {/* Tooltip */}
            <AnimatePresence>
              {isTooltipVisible && (
                <motion.div
                  className="absolute bottom-full right-0 mb-3 w-64 max-w-[calc(100vw-4rem)] rounded-lg bg-white p-3 shadow-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <button
                    className="absolute right-1 top-1 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    onClick={handleCloseTooltip}
                    aria-label="Cerrar notificación"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <p className="text-sm font-medium text-gray-800">¿Tenés consultas sobre Bosque Pilar?</p>
                  <p className="mt-1 text-xs text-gray-600">
                    Contactanos por WhatsApp y te responderemos a la brevedad.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
