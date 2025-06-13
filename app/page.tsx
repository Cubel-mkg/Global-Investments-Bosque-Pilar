"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ChevronRight, Leaf, Waves, Dumbbell, Users, Heart, ChevronDown, ArrowRight } from "lucide-react"
import { motion, useAnimation, useInView, useScroll, useTransform } from "framer-motion"

import { Button, buttonVariants } from "@/components/ui/button"
import { GlassCard } from "@/components/glass-card"
import { GallerySection } from "@/components/gallery-section"
import { cn } from "@/lib/utils"
import { AnimatedSection } from "@/components/animated-section"
import { AmenityCard } from "@/components/amenity-card"
import { ScrollProgress } from "@/components/scroll-progress"
import { ParallaxBackground } from "@/components/parallax-background"
import { useIsMobile } from "@/hooks/use-mobile"
import { ImageWithFallback } from "@/components/image-with-fallback"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useIsMobile()

  // Refs for scroll animations
  const aboutRef = useRef(null)
  const typologiesRef = useRef(null)
  const amenitiesRef = useRef(null)
  const locationRef = useRef(null)
  const heroRef = useRef(null)
  const sustainabilityRef = useRef(null)

  const aboutInView = useInView(aboutRef, { once: true, amount: "some" })
  const typologiesInView = useInView(typologiesRef, { once: true, amount: "some" })
  const amenitiesInView = useInView(amenitiesRef, { once: true, amount: "some" })
  const locationInView = useInView(locationRef, { once: true, amount: "some" })
  const sustainabilityInView = useInView(sustainabilityRef, { once: true, amount: "some" })

  const aboutControls = useAnimation()
  const typologiesControls = useAnimation()
  const amenitiesControls = useAnimation()
  const locationControls = useAnimation()
  const sustainabilityControls = useAnimation()

  // Parallax effect for hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "15%"] : ["0%", "30%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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

  // window resize
  useEffect(() => {
    const sendHeight = () => {
      window.parent.postMessage(
        {
          type: 'setHeight',
          height: document.documentElement.scrollHeight,
        },
        '*'
      );
    };

    sendHeight(); // On load
    const observer = new ResizeObserver(sendHeight);
    observer.observe(document.body);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (aboutInView) {
      aboutControls.start("visible")
    }
    if (typologiesInView) {
      typologiesControls.start("visible")
    }
    if (amenitiesInView) {
      amenitiesControls.start("visible")
    }
    if (locationInView) {
      locationControls.start("visible")
    }
    if (sustainabilityInView) {
      sustainabilityControls.start("visible")
    }
  }, [
    aboutInView,
    typologiesInView,
    amenitiesInView,
    locationInView,
    sustainabilityInView,
    aboutControls,
    typologiesControls,
    amenitiesControls,
    locationControls,
    sustainabilityControls,
  ])

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
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

  const amenities = [
    {
      title: "Spa y Áreas de Relajación",
      description:
        "Un santuario para cuerpo y mente con sauna, jacuzzi y espacios de relax con vistas panorámicas a la naturaleza.",
      icon: <Waves className="h-5 w-5 text-bosque" />,
      image: "/images/indoor-pool.png",
    },
    {
      title: "Complejo de Piscinas",
      description:
        "Piscina in/out con áreas seguras para niños y exclusivo jacuzzi para adultos, diseñada para disfrutar todo el año.",
      icon: <Waves className="h-5 w-5 text-bosque" />,
      image: "/images/outdoor-pool.png",
    },
    {
      title: "Deporte y Recreación",
      description:
        "Gimnasio equipado, canchas de paddle, espacio de yoga y circuito aeróbico de 700m en amplios espacios verdes.",
      icon: <Dumbbell className="h-5 w-5 text-bosque" />,
      image: "/images/tenis bosque.jpg",
    },
    {
      title: "Espacios de Convivencia",
      description:
        "Confitería, quincho y cafetería exclusivos para propietarios, integrados armoniosamente con el entorno natural.",
      icon: <Users className="h-5 w-5 text-bosque" />,
      image: "/images/restaurant.png",
    },
    {
      title: "Yoga y Wellness",
      description:
        "Espacio dedicado para yoga y meditación con vistas inspiradoras, diseñado para nutrir cuerpo y espíritu.",
      icon: <Heart className="h-5 w-5 text-bosque" />,
      image: "/images/yoga in the park resized.png",
    },
    {
      title: "Espacios Verdes",
      description:
        "Parque arbolado, jardines diseñados y circuitos peatonales que potencian la conexión con la naturaleza.",
      icon: <Leaf className="h-5 w-5 text-bosque" />,
      image: "/images/Running in the park resized.png",
    },
  ]

  const typologies = [
    {
      title: "1 Ambiente – 71 m² aprox.",
      image: "/images/bedroom-view.png",
    },
    {
      title: "2 Ambientes – 84 m² aprox.",
      image: "/images/living-space.png",
    },
    {
      title: "3 Ambientes – 156 m² aprox.",
      image: "/images/3 AMBIENTES.png",
    },
    {
      title: "4 Ambientes – 153 m² aprox.",
      image: "/images/4 ambientes.png",
    },
    {
      title: "5 Ambientes – 287 m² aprox.",
      image: "/images/5 ambientes.png",
    },
  ]

  return (
    <div className="min-h-screen bg-arena-light text-bosque">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      <main className="flex-1">
        {/* Project Title Section - Enhanced as main header */}
        <AnimatedSection className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-6">
              <motion.h1
                className="text-5xl md:text-6xl font-serif font-bold text-[#0a3b5c] mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                BOSQUE PILAR
              </motion.h1>
              <motion.div
                className="w-20 h-1 bg-tierra mx-auto mb-6 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              <motion.p
                className="text-xl md:text-2xl text-[#0a3b5c] uppercase tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                LIBERTAD JUNTO A LA NATURALEZA
              </motion.p>
            </div>
          </div>
        </AnimatedSection>

        {/* Hero Section - Enhanced for standalone presentation */}
        <section className="relative min-h-[8vh] overflow-hidden flex items-center" ref={heroRef}>
            <motion.div className="absolute inset-0 z-0" style={{ y: heroY, opacity: heroOpacity }}>
              <div className="relative h-full w-full">
                <ImageWithFallback
                  src="/images/Render Home Nuevo.jpg"
                  alt="Bosque Pilar Residencias de Lujo"
                  fill
                  className="object-cover brightness-[0.85]"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-bosque/70 via-bosque/50 to-bosque/40" />
              </div>
            </motion.div>

            <ParallaxBackground />

            <motion.div
              className="container relative z-10 py-32 md:py-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smoother animation
              }}
              style={{
                // Prevent visual artifacts on mobile during scroll
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                perspective: 1000,
              }}
            >
              <div className="enhanced-glass-card max-w-2xl p-8 md:p-14 mx-auto rounded-xl">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-1 bg-tierra rounded-full"></div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-4 w-6 h-6 text-tierra-light"
                  >
                    <path d="M12 2L7 7H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h2l5 5 5-5h2c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2h-2l-5-5z" />
                    <path d="M12 6v14" />
                    <path d="M8 10c1.5 1 3.5 1 5 0 1.5-1 3.5-1 5 0" />
                    <path d="M8 14c1.5 1 3.5 1 5 0 1.5-1 3.5-1 5 0" />
                  </svg>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.15] text-white drop-shadow-sm">
                  Donde <span className="text-tierra-light">Naturaleza</span> y{" "}
                  <span className="text-arena-light">Lujo</span> se Encuentran
                </h1>
                <p className="mt-6 text-lg md:text-xl text-white/95 drop-shadow-sm">
                  Bienvenido a Bosque Pilar, un concepto residencial único que fusiona diseño de vanguardia, confort
                  premium y compromiso ambiental en un entorno natural incomparable.
                </p>
                <motion.div
                  className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Button
                    size="lg"
                    className="bg-[#2E3E20] hover:bg-[#3a4f29] text-white font-medium border-0 rounded-md transition-all duration-300 px-8 py-7 h-auto w-full sm:w-auto text-lg"
                    onClick={() => {
                      const typologiesSection = document.getElementById("typologies")
                      typologiesSection?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    Descubrir Residencias
                  </Button>
                  <Button
                    size="lg"
                    className="bg-transparent hover:bg-white/20 text-white font-medium border border-white/40 rounded-md transition-all duration-300 px-8 py-7 h-auto w-full sm:w-auto text-lg"
                    onClick={() => {
                      window.open(
                        "https://drive.google.com/file/d/1Cro4oTzHoxuZ5Ns8XJPHbbRNSR7KGL04/view?usp=sharing",
                        "_blank",
                      )
                    }}
                  >
                    Descargar Brochure
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            >
              <Link href="#about">
                <ChevronDown className="h-8 w-8 text-white drop-shadow-md" />
              </Link>
            </motion.div>
        </section>

        {/* Key Data Points */}
        <section className="py-6 bg-white/80 border-y border-bosque/10 relative z-10">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Mobile view - stacked cards */}
              {isMobile ? (
                <div className="space-y-4 px-4">
                  <motion.div
                    className="flex items-center p-4 hover-lift bg-white/50 rounded-lg shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="rounded-full bg-bosque/10 p-2 mr-3 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5 text-bosque"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                        />
                      </svg>
                    </div>
                    <p className="text-bosque font-medium">5 minutos de Panamericana y Acceso Norte</p>
                  </motion.div>

                  <motion.div
                    className="flex items-center p-4 hover-lift bg-white/50 rounded-lg shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="rounded-full bg-bosque/10 p-2 mr-3 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5 text-bosque"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    </div>
                    <p className="text-bosque font-medium">Seguridad 24hs</p>
                  </motion.div>

                  <motion.div
                    className="flex items-center p-4 hover-lift bg-white/50 rounded-lg shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="rounded-full bg-bosque/10 p-2 mr-3 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5 text-bosque"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                        />
                      </svg>
                    </div>
                    <p className="text-bosque font-medium">Full Amenities</p>
                  </motion.div>
                </div>
              ) : (
                // Desktop view - horizontal layout
                <>
                  <motion.div
                    className="flex items-center justify-center p-4 hover-lift"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="rounded-full bg-bosque/10 p-2 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5 text-bosque"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                        />
                      </svg>
                    </div>
                    <p className="text-bosque font-medium">5 minutos de Panamericana y Acceso Norte</p>
                  </motion.div>
                  <motion.div
                    className="flex items-center justify-center p-4 hover-lift"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="rounded-full bg-bosque/10 p-2 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5 text-bosque"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    </div>
                    <p className="text-bosque font-medium">Seguridad 24hs</p>
                  </motion.div>
                  <motion.div
                    className="flex items-center justify-center p-4 hover-lift"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="rounded-full bg-bosque/10 p-2 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5 text-bosque"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                        />
                      </svg>
                    </div>
                    <p className="text-bosque font-medium">Full Amenities</p>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 relative overflow-hidden section-gradient" ref={aboutRef}>
          <div className="container relative z-10">
            <AnimatedSection className="grid gap-12 md:grid-cols-2 items-center">
              <GlassCard className="p-8" variant="light">
                <div className="w-20 h-1 bg-tierra mb-6 rounded-full"></div>
                <h2 className="text-3xl font-serif font-bold tracking-wide text-bosque md:text-4xl">
                  Espacios que <span className="text-tierra">Inspiran</span> Vida
                </h2>
                <p className="mt-6 text-lg text-bosque/80">
                  Cada residencia en Bosque Pilar es un refugio de bienestar y sofisticación, ofreciendo:
                </p>
                <ul className="mt-4 space-y-4 text-lg text-bosque/80">
                  <motion.li
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ChevronRight className="mr-2 h-5 w-5 text-tierra mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-bosque">Exclusividad:</strong> Unidades tipo "Houses" con jardines
                      privados en planta baja y modernos rooftops con vistas panorámicas en planta alta.
                    </span>
                  </motion.li>
                  <motion.li
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <ChevronRight className="mr-2 h-5 w-5 text-tierra mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-bosque">Diseño Luminoso:</strong> Terrazas y balcones que extienden el
                      espacio interior hacia el exterior, maximizando la luz natural y las vistas al bosque.
                    </span>
                  </motion.li>
                  <motion.li
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <ChevronRight className="mr-2 h-5 w-5 text-tierra mt-1 flex-shrink-0" />
                    <span>
                      <strong className="text-bosque">Tecnología Inteligente:</strong> Sistemas de eficiencia
                      energética, calefacción por losa radiante y preparación para domótica que elevan la experiencia de
                      vida.
                    </span>
                  </motion.li>
                </ul>
                <Button
                  variant="glass"
                  className="mt-8 group"
                  onClick={() => {
                    const typologiesSection = document.getElementById("typologies")
                    typologiesSection?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Descubrir Más
                  <motion.span
                    className="inline-block ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.span>
                </Button>
              </GlassCard>
              <motion.div
                className="relative h-[300px] md:h-[500px] overflow-hidden rounded-xl shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <ImageWithFallback
                  src="/images/Entrada.png"
                  alt="Concepto Bosque Pilar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bosque/70 to-transparent"></div>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        {/* Typologies Section */}
        <section id="typologies" className="py-20 relative overflow-hidden bg-white/50" ref={typologiesRef}>
          <div className="container relative z-10">
            <AnimatedSection className="text-center mb-12">
              <div className="inline-block px-12 py-6 mb-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                <motion.div
                  className="w-20 h-1 bg-tierra mx-auto mb-6 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                />
                <h2 className="text-3xl font-serif font-bold tracking-wide text-bosque md:text-4xl">
                  Nuestras <span className="text-tierra">Tipologías</span>
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-bosque/80">
                  Descubra los diferentes estilos de vida que Bosque Pilar tiene para ofrecer, desde espacios íntimos
                  hasta residencias familiares amplias.
                </p>
              </div>
            </AnimatedSection>

            <div className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
              {typologies.map((typology, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 will-change-transform"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={typology.image || "/placeholder.svg"}
                      alt={typology.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bosque/60 to-transparent opacity-40"></div>

                    {/* Colored top border that animates on hover */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bosque to-tierra transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-bosque mb-3">{typology.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Button
                className="bg-[#2E3E20] hover:bg-[#3a4f29] text-white font-medium border-0 rounded-md transition-all duration-300 px-8 py-6 h-auto"
                onClick={() => {
                  window.open(
                    "https://drive.google.com/file/d/1kIC2rW0y-9YYFU0LavEyIm8t5idF0kxM/view?usp=sharing",
                    "_blank",
                  )
                }}
              >
                Ver Planos Detallados
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Amenities Section - Enhanced */}
        <section id="amenities" className="py-20 relative overflow-hidden section-gradient" ref={amenitiesRef}>
          <div className="container relative z-10">
            <AnimatedSection className="text-center mb-12">
              <div className="inline-block px-12 py-6 mb-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                <motion.div
                  className="w-20 h-1 bg-tierra mx-auto mb-6 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                />
                <h2 className="text-3xl font-serif font-bold tracking-wide text-bosque md:text-4xl">
                  Experiencias <span className="text-tierra">Exclusivas</span> para Cada Momento
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-bosque/80">
                  Bosque Pilar redefine el concepto de bienestar con espacios diseñados para el disfrute, la conexión y
                  el equilibrio en cada etapa de su vida.
                </p>
              </div>
            </AnimatedSection>

            <div className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
              {amenities.map((amenity, index) => (
                <AmenityCard
                  key={index}
                  title={amenity.title}
                  description={amenity.description}
                  icon={amenity.icon}
                  image={amenity.image}
                  index={index}
                />
              ))}
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Button
                className="bg-[#2E3E20] hover:bg-[#3a4f29] text-white font-medium border-0 rounded-md transition-all duration-300 px-8 py-6 h-auto"
                onClick={() => {
                  const amenitiesSection = document.getElementById("amenities")
                  amenitiesSection?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Ver Todas las Amenidades
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Sustainability Section */}
        <section id="sustainability" className="py-20 relative overflow-hidden bg-white/50" ref={sustainabilityRef}>
          <div className="container relative z-10">
            <AnimatedSection className="grid gap-12 md:grid-cols-2 items-center">
              <motion.div
                className="relative h-[300px] md:h-[500px] overflow-hidden rounded-xl shadow-lg order-2 md:order-1"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <ImageWithFallback
                  src="/images/PB-COMERCIAL.jpg"
                  alt="Sustentabilidad Bosque Pilar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bosque/70 to-transparent"></div>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-tierra/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4">
                    <Leaf className="h-8 w-8 text-white" />
                  </div>
                </motion.div>
              </motion.div>
              <GlassCard className="p-8 order-1 md:order-2" variant="light">
                <div className="w-20 h-1 bg-tierra mb-6 rounded-full"></div>
                <h2 className="text-3xl font-serif font-bold tracking-wide text-bosque md:text-4xl">
                  Vivir en <span className="text-tierra">Armonía</span> con el Planeta
                </h2>
                <p className="mt-6 text-lg text-bosque/80">
                  Bosque Pilar lidera la innovación ecológica con soluciones que cuidan el entorno:
                </p>
                <ul className="mt-4 space-y-3 text-bosque/80">
                  <motion.li
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ChevronRight className="mr-2 h-5 w-5 text-tierra mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-bosque">Energía Inteligente:</strong> Sistemas solares para áreas comunes
                      y tecnologías de ahorro energético en todas las viviendas.
                    </span>
                  </motion.li>
                  <motion.li
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <ChevronRight className="mr-2 h-5 w-5 text-tierra mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-bosque">Gestión Responsable:</strong> Sistemas de recolección de aguas
                      pluviales y separación de residuos que minimizan nuestra huella ambiental.
                    </span>
                  </motion.li>
                </ul>
                <p className="mt-6 text-lg text-bosque/80">Innovaciones para un futuro mejor:</p>
                <ul className="mt-4 space-y-3 text-bosque/80">
                  <motion.li
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <ChevronRight className="mr-2 h-5 w-5 text-tierra mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-bosque">Materiales Certificados:</strong> Uso de madera FSC y bambú que
                      protegen los bosques y promueven recursos renovables.
                    </span>
                  </motion.li>
                  <motion.li
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <ChevronRight className="mr-2 h-5 w-5 text-tierra mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-bosque">Huella de Carbono:</strong> Medición y reducción activa de nuestro
                      impacto en el calentamiento global.
                    </span>
                  </motion.li>
                  <motion.li
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <ChevronRight className="mr-2 h-5 w-5 text-tierra mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-bosque">Economía Circular:</strong> Sistemas de gestión de residuos que
                      maximizan el reciclaje y minimizan el desperdicio.
                    </span>
                  </motion.li>
                </ul>
              </GlassCard>
            </AnimatedSection>
          </div>
        </section>

        {/* Gallery Section - Now using the GallerySection component */}
        <GallerySection />

        {/* Specifications Section */}
        <section id="specifications" className="py-20 relative overflow-hidden section-gradient">
          <div className="container relative z-10">
            <AnimatedSection className="text-center mb-12">
              <GlassCard className="inline-block px-12 py-6" variant="light">
                <div className="w-20 h-1 bg-tierra mx-auto mb-6 rounded-full"></div>
                <h2 className="text-3xl font-serif font-bold tracking-wide text-bosque md:text-4xl">
                  Calidad <span className="text-tierra">Superior</span> en Cada Detalle
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-bosque/80">
                  Materiales premium y acabados de excelencia que definen el estándar de Bosque Pilar.
                </p>
              </GlassCard>
            </AnimatedSection>

            <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <GlassCard className="p-6 hover:shadow-lg transition-all duration-300" variant="light">
                  <h3 className="text-xl font-serif font-bold text-tierra mb-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-tierra/10 flex items-center justify-center mr-3">
                      <span className="text-tierra font-bold">01</span>
                    </div>
                    Terminaciones Premium
                  </h3>
                  <ul className="space-y-3 text-bosque/80">
                    <li>
                      <strong className="text-bosque">Solados Interior:</strong> Savane madera honey 19x115 rt
                    </li>
                    <li>
                      <strong className="text-bosque">Solados Exterior:</strong> Savane concreto externo 74x74
                    </li>
                    <li>
                      <strong className="text-bosque">Revestimiento Baños:</strong> Lume cerámica 32x59 branco cetim
                    </li>
                    <li>
                      <strong className="text-bosque">Mesadas:</strong> Quarella quartz clasico en baños y cocinas
                    </li>
                  </ul>
                </GlassCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <GlassCard className="p-6 hover:shadow-lg transition-all duration-300" variant="light">
                  <h3 className="text-xl font-serif font-bold text-tierra mb-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-tierra/10 flex items-center justify-center mr-3">
                      <span className="text-tierra font-bold">02</span>
                    </div>
                    Equipamiento de Alta Gama
                  </h3>
                  <ul className="space-y-3 text-bosque/80">
                    <li>
                      <strong className="text-bosque">Cocina:</strong> Piletas Johnson de acero inoxidable y griferías
                      FV de diseño contemporáneo
                    </li>
                    <li>
                      <strong className="text-bosque">Sanitarios:</strong> Línea Roca dama senso con griferías FV puelo
                      monocomando
                    </li>
                    <li>
                      <strong className="text-bosque">Tecnología:</strong> Preparación para sistemas inteligentes de
                      iluminación y climatización
                    </li>
                  </ul>
                </GlassCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <GlassCard className="p-6 hover:shadow-lg transition-all duration-300" variant="light">
                  <h3 className="text-xl font-serif font-bold text-tierra mb-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-tierra/10 flex items-center justify-center mr-3">
                      <span className="text-tierra font-bold">03</span>
                    </div>
                    Carpinterías Selectas
                  </h3>
                  <ul className="space-y-3 text-bosque/80">
                    <li>
                      <strong className="text-bosque">Aberturas:</strong> PVC con DVH (doble vidriado hermético) para
                      máximo aislamiento
                    </li>
                    <li>
                      <strong className="text-bosque">Puertas de Acceso:</strong> Chapa F60 con alta seguridad
                    </li>
                    <li>
                      <strong className="text-bosque">Muebles:</strong> Cocinas y placards con melamina de 18mm y
                      herrajes de cierre suave
                    </li>
                  </ul>
                </GlassCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <GlassCard className="p-6 hover:shadow-lg transition-all duration-300" variant="light">
                  <h3 className="text-xl font-serif font-bold text-tierra mb-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-tierra/10 flex items-center justify-center mr-3">
                      <span className="text-tierra font-bold">04</span>
                    </div>
                    Confort Climático
                  </h3>
                  <ul className="space-y-3 text-bosque/80">
                    <li>
                      <strong className="text-bosque">Calefacción:</strong> Sistema de losa radiante para máximo confort
                    </li>
                    <li>
                      <strong className="text-bosque">Aire Acondicionado:</strong> Pre instalación para unidades en
                      todos los ambientes
                    </li>
                    <li>
                      <strong className="text-bosque">Aislación:</strong> Sistemas térmicos y acústicos de alta
                      performance
                    </li>
                  </ul>
                </GlassCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <GlassCard className="p-6 hover:shadow-lg transition-all duration-300" variant="light">
                  <h3 className="text-xl font-serif font-bold text-tierra mb-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-tierra/10 flex items-center justify-center mr-3">
                      <span className="text-tierra font-bold">05</span>
                    </div>
                    Acabados Arquitectónicos
                  </h3>
                  <ul className="space-y-3 text-bosque/80">
                    <li>
                      <strong className="text-bosque">Muros Exteriores:</strong> Revoque plástico aplicado con llana
                    </li>
                    <li>
                      <strong className="text-bosque">Muros Interiores:</strong> Yeso aplicado con pintura látex premium
                    </li>
                    <li>
                      <strong className="text-bosque">Cielorrasos:</strong> Estructura de perfiles galvanizados con
                      placa de yeso y pintura látex
                    </li>
                  </ul>
                </GlassCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <GlassCard className="p-6 hover:shadow-lg transition-all duration-300" variant="light">
                  <h3 className="text-xl font-serif font-bold text-tierra mb-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-tierra/10 flex items-center justify-center mr-3">
                      <span className="text-tierra font-bold">06</span>
                    </div>
                    Servicios Exclusivos
                  </h3>
                  <ul className="space-y-3 text-bosque/80">
                    <li>
                      <strong className="text-bosque">Seguridad:</strong> Sistema integral 24/7 con tecnología avanzada
                    </li>
                    <li>
                      <strong className="text-bosque">Estacionamiento:</strong> Cocheras individuales en subsuelo con
                      acceso directo
                    </li>
                    <li>
                      <strong className="text-bosque">Amenidades:</strong> Servicio de limpieza, jardinería y
                      mantenimiento de espacios comunes
                    </li>
                    <li>
                      <strong className="text-bosque">Extras:</strong> Bauleras individuales y parrillas privadas en
                      cada unidad
                    </li>
                  </ul>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="location" className="py-20 relative overflow-hidden bg-white/50" ref={locationRef}>
          <div className="container relative z-10">
            <AnimatedSection className="grid gap-12 md:grid-cols-2 items-center">
              <motion.div
                className="relative h-[250px] md:h-[400px] overflow-hidden rounded-xl shadow-lg order-2 md:order-1"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <ImageWithFallback
                  src="/images/master-plan.png"
                  alt="Ubicación Bosque Pilar"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bosque/50 to-transparent"></div>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg inline-block">
                    <p className="text-bosque font-medium">Juan Bautista Cabral 517, Pilar, Buenos Aires</p>
                  </div>
                </motion.div>
              </motion.div>
              <GlassCard className="p-8 order-1 md:order-2" variant="light">
                <div className="w-20 h-1 bg-tierra mb-6 rounded-full"></div>
                <h2 className="text-3xl font-serif font-bold tracking-wide text-bosque md:text-4xl">
                  Ubicación <span className="text-tierra">Estratégica</span>
                </h2>
                <p className="mt-6 text-lg text-bosque/80">
                  Bosque Pilar combina la serenidad de un entorno natural con la conveniencia urbana. A minutos de
                  centros comerciales, colegios de prestigio y vías principales, ofrece una conexión perfecta con todo
                  lo que necesita.
                </p>
                <div className="mt-6 space-y-4">
                  <motion.div
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="mr-3 p-2 rounded-full bg-arena/50 border border-bosque/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5 text-bosque"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-bosque">Dirección</h3>
                      <p className="text-bosque/80 font-bold text-tierra">
                        JUAN BAUTISTA CABRAL 517, PILAR, BUENOS AIRES
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="mr-3 p-2 rounded-full bg-arena/50 border border-bosque/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5 text-bosque"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-bosque">Accesos</h3>
                      <p className="text-bosque/80">A 5 minutos de Panamericana y Acceso Norte</p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="mr-3 p-2 rounded-full bg-arena/50 border border-bosque/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5 text-bosque"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-bosque">Cercanías</h3>
                      <p className="text-bosque/80">Centros comerciales, colegios y servicios a minutos de distancia</p>
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="mt-8"
                >
                  <a
                    href="https://maps.app.goo.gl/5sRxqzZ5F2fKYdCc9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "glass" }), "group")}
                  >
                    Ver en Mapa
                    <motion.span
                      className="inline-block ml-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </a>
                </motion.div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 relative overflow-hidden section-gradient">
          <div className="container relative z-10">
            <div className="grid gap-8 md:gap-12 md:grid-cols-1 px-4 md:px-0">
              <AnimatedSection>
                <GlassCard className="p-8" variant="light">
                  <div className="w-20 h-1 bg-tierra mb-6 rounded-full"></div>
                  <h2 className="text-3xl font-serif font-bold tracking-wide md:text-4xl text-bosque">
                    Tu Futuro <span className="text-tierra">Comienza Acá</span>
                  </h2>
                  <p className="mt-4 text-lg text-bosque/80">
                    Bosque Pilar representa una nueva forma de vivir donde el lujo se encuentra con la sustentabilidad.
                    Unite a una comunidad exclusiva que valora el bienestar, la naturaleza y la excelencia en cada
                    detalle.
                  </p>
                  <div className="mt-8 space-y-4">
                    <motion.div
                      className="flex items-start hover-lift"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="mr-4 rounded-full bg-arena p-2 border border-bosque/10 shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-5 w-5 text-bosque"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-bosque">Email</h3>
                        <p className="text-bosque/80">recepcion@global-investments.com.ar</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-start hover-lift"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="mr-4 rounded-full bg-arena p-2 border border-bosque/10 shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-5 w-5 text-bosque"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-bosque">Teléfono</h3>
                        <p className="text-bosque/80">+(54) 11 4519-6686</p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-start hover-lift"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="mr-4 rounded-full bg-arena p-2 border border-bosque/10 shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-5 w-5 text-bosque"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-bosque">Oficina de Ventas</h3>
                        <p className="text-bosque/80">Paraná 297 Martinez, Buenos Aires, Argentina</p>
                        <p className="text-bosque/80">Lunes a Viernes: 10:00 - 18:00</p>
                        <p className="text-bosque/80">Sábados: 10:00 - 14:00</p>
                      </div>
                    </motion.div>
                  </div>
                  <motion.div
                    className="mt-8 p-4 bg-bosque/5 rounded-lg border border-bosque/10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-lg font-medium text-bosque mb-2">Horario de Atención</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-bosque/80">
                        <p className="font-medium">Lunes a Viernes</p>
                        <p>10:00 - 18:00</p>
                      </div>
                      <div className="text-bosque/80">
                        <p className="font-medium">Sábados</p>
                        <p>10:00 - 14:00</p>
                      </div>
                    </div>
                  </motion.div>
                </GlassCard>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
