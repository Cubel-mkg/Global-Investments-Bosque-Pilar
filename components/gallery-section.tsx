"use client"

import { useState, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { ArrowRight, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/glass-card"
import { ImageLightbox } from "@/components/image-lightbox"
import { useIsMobile } from "@/hooks/use-mobile"
import { ImageWithFallback } from "@/components/image-with-fallback"

// Real gallery images from the project
const galleryImages = [
  {
    src: "/images/bedroom-view.png",
    alt: "Dormitorio con Vista Panorámica",
    caption:
      "Amplios dormitorios con ventanales de piso a techo que enmarcan vistas espectaculares al lago y entorno natural.",
    thumbnail: "/images/bedroom-view.png",
  },
  {
    src: "/images/living-space.png",
    alt: "Espacios Integrados de Estar",
    caption:
      "Diseño de planta abierta con sala de estar, comedor y terraza que maximiza la luz natural y la conexión con el exterior.",
    thumbnail: "/images/living-space.png",
  },
  {
    src: "/images/master-plan.png",
    alt: "Plan Maestro Bosque Pilar",
    caption:
      "Implantación general del proyecto con edificios distribuidos estratégicamente alrededor de un lago central y amplias áreas verdes.",
    thumbnail: "/images/master-plan.png",
  },
  {
    src: "/images/gym-pool.png",
    alt: "Gimnasio y Piscina Cubierta",
    caption: "Centro de fitness de última generación con vistas a la piscina cubierta y jardines exteriores.",
    thumbnail: "/images/gym-pool.png",
  },
  {
    src: "/images/restaurant.png",
    alt: "Área Gastronómica",
    caption:
      "Espacio gastronómico con terraza exterior rodeada de vegetación para una experiencia culinaria en contacto con la naturaleza.",
    thumbnail: "/images/restaurant.png",
  },
  {
    src: "/images/outdoor-pool.png",
    alt: "Piscina Exterior",
    caption: "Piscina exterior con solarium, reposeras y áreas de relax integradas al paisajismo natural del entorno.",
    thumbnail: "/images/outdoor-pool.png",
  },
  {
    src: "/images/indoor-pool.png",
    alt: "Complejo de Piscinas",
    caption: "Piscina interior/exterior con diseño minimalista y acabados premium en piedra natural y madera.",
    thumbnail: "/images/indoor-pool.png",
  },
  {
    src: "/images/building-exterior.png",
    alt: "Fachada de Edificios",
    caption:
      "Arquitectura contemporánea con amplios balcones, terrazas y pérgolas que se integran armoniosamente con el paisaje.",
    thumbnail: "/images/building-exterior.png",
  },
  {
    src: "/images/lakeside-view.png",
    alt: "Vista al Lago",
    caption:
      "Perspectiva de los edificios desde el lago, mostrando la integración perfecta entre arquitectura y naturaleza.",
    thumbnail: "/images/lakeside-view.png",
  },
]

export function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const isMobile = useIsMobile()
  const carouselRef = useRef<HTMLDivElement>(null)

  const galleryRef = useRef(null)
  const galleryInView = useInView(galleryRef, { once: true, amount: "some" })
  const galleryControls = useAnimation()

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 60,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  if (galleryInView && !galleryControls.isAnimating) {
    galleryControls.start("visible")
  }

  const openLightbox = (index: number) => {
    parent.postMessage({ type: "disableScroll" }, "*");
    console.log("disableScroll")
    const gallerySection = document.getElementById("gallery")
    gallerySection?.scrollIntoView()
    document.body.classList.add('no-scroll');
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    parent.postMessage({ type: "enableScroll" }, "*");
    document.body.classList.remove('no-scroll');
    setLightboxOpen(false)
  }

  const navigateLightbox = (index: number) => {
    setCurrentImageIndex(index)
  }

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280 // Width of a card + gap
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <section id="gallery" className="relative overflow-hidden bg-white/50 py-20" ref={galleryRef}>
      <div className="container relative z-10">
        <motion.div className="text-center px-4 md:px-0" variants={fadeInUp} initial="hidden" animate={galleryControls}>
          <GlassCard className="mb-6 md:mb-8 inline-block px-6 md:px-12 py-4 md:py-6" variant="light">
            <div className="mb-6 h-1 w-20 rounded-full bg-tierra mx-auto"></div>
            <h2 className="text-3xl font-serif font-bold tracking-wide text-bosque md:text-4xl">
              Viva la <span className="text-tierra">Experiencia</span> Bosque Pilar
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-bosque/80">
              Descubra la belleza y elegancia de nuestras residencias a través de imágenes que capturan la esencia de
              este proyecto único.
            </p>
          </GlassCard>
        </motion.div>

        {isMobile ? (
          // Mobile carousel view
          <div className="mt-8 relative px-4">
            <div ref={carouselRef} className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory hide-scrollbar">
              {galleryImages.map((image, index) => (
                <div key={index} className="min-w-[280px] snap-center" onClick={() => openLightbox(index)}>
                  <motion.div
                    className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer h-48"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative h-full w-full">
                      <ImageWithFallback
                        src={image.thumbnail || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="280px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bosque/70 via-bosque/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

                      {/* Zoom icon overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="rounded-full bg-white/20 p-3 backdrop-blur-md">
                          <ZoomIn className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  <div className="mt-2 bg-white/80 backdrop-blur-sm p-3 rounded-lg">
                    <h3 className="text-bosque font-medium text-sm">{image.alt}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <button
              onClick={() => scrollCarousel("left")}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md"
              aria-label="Ver imagen anterior"
            >
              <ChevronLeft className="h-5 w-5 text-bosque" />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md"
              aria-label="Ver siguiente imagen"
            >
              <ChevronRight className="h-5 w-5 text-bosque" />
            </button>
          </div>
        ) : (
          // Desktop grid view
          <motion.div
            className="mt-8 md:mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 px-4 md:px-0"
            variants={staggerChildren}
            initial="hidden"
            animate={galleryControls}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                onClick={() => openLightbox(index)}
              >
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <ImageWithFallback
                    src={image.thumbnail || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bosque/70 via-bosque/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

                  {/* Zoom icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="rounded-full bg-white/20 p-3 backdrop-blur-md">
                      <ZoomIn className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg">
                    <h3 className="text-bosque font-medium">{image.alt}</h3>
                    <p className="text-sm text-bosque/80 line-clamp-2">{image.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-8 md:mt-10 text-center px-4 md:px-0">
          <Button variant="glass">
            Ver Galería Completa
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Lightbox component */}
      <ImageLightbox
        images={galleryImages}
        isOpen={lightboxOpen}
        currentIndex={currentImageIndex}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </section>
  )
}
