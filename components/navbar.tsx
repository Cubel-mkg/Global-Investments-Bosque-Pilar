"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Instagram, Facebook, Linkedin, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-[#0a3b5c] shadow-md py-2" : "bg-[#0a3b5c] py-4",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center">
          <Link
            href="https://global-investments.com.ar/invertir"
            className="border border-white text-white px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors mr-8 hidden md:block"
          >
            INVERTÍ CON NOSOTROS
          </Link>
          <div className="hidden md:flex space-x-6 text-white text-sm font-medium">
            <Link href="https://global-investments.com.ar/proyectos" className="hover:text-gray-300 transition-colors">
              PROYECTOS
            </Link>
            <Link href="https://global-investments.com.ar/contacto" className="hover:text-gray-300 transition-colors">
              CONTACTO
            </Link>
          </div>
        </div>

        {/* Center logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="https://global-investments.com.ar">
            <div className="relative h-10 w-40">
              <Image
                src="/images/global-investments-logo.png"
                alt="Global Investments"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Right section */}
        <div className="flex items-center">
          <div className="hidden md:flex space-x-6 text-white text-sm font-medium mr-6">
            <Link href="https://global-investments.com.ar" className="hover:text-gray-300 transition-colors">
              HOME
            </Link>
            <Link href="https://global-investments.com.ar/empresa" className="hover:text-gray-300 transition-colors">
              EMPRESA
            </Link>
            <Link href="https://global-investments.com.ar/prensa" className="hover:text-gray-300 transition-colors">
              PRENSA
            </Link>
          </div>
          <div className="hidden md:flex space-x-3">
            <Link
              href="https://www.instagram.com/globalinvestments.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Instagram"
            >
              <div className="rounded-full border border-white w-7 h-7 flex items-center justify-center">
                <Instagram size={16} />
              </div>
            </Link>
            <Link
              href="https://www.facebook.com/globalinvestments.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Facebook"
            >
              <div className="rounded-full border border-white w-7 h-7 flex items-center justify-center">
                <Facebook size={16} />
              </div>
            </Link>
            <Link
              href="https://www.linkedin.com/company/global-investments-ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="LinkedIn"
            >
              <div className="rounded-full border border-white w-7 h-7 flex items-center justify-center">
                <Linkedin size={16} />
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a3b5c] border-t border-white/20 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link
              href="https://global-investments.com.ar/invertir"
              className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              INVERTÍ CON NOSOTROS
            </Link>
            <Link
              href="https://global-investments.com.ar/proyectos"
              className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              PROYECTOS
            </Link>
            <Link
              href="https://global-investments.com.ar/contacto"
              className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              CONTACTO
            </Link>
            <Link
              href="https://global-investments.com.ar"
              className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              href="https://global-investments.com.ar/empresa"
              className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              EMPRESA
            </Link>
            <Link
              href="https://global-investments.com.ar/prensa"
              className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              PRENSA
            </Link>
            <div className="flex space-x-3 pt-2">
              <Link
                href="https://www.instagram.com/globalinvestments.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Instagram"
              >
                <div className="rounded-full border border-white w-7 h-7 flex items-center justify-center">
                  <Instagram size={16} />
                </div>
              </Link>
              <Link
                href="https://www.facebook.com/globalinvestments.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Facebook"
              >
                <div className="rounded-full border border-white w-7 h-7 flex items-center justify-center">
                  <Facebook size={16} />
                </div>
              </Link>
              <Link
                href="https://www.linkedin.com/company/global-investments-ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="LinkedIn"
              >
                <div className="rounded-full border border-white w-7 h-7 flex items-center justify-center">
                  <Linkedin size={16} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
