import Image from "next/image"
import Link from "next/link"
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Logo and contact info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative h-16 w-64 mb-6">
              <Image
                src="/images/global-investments-logo-dark.png"
                alt="Global Investments"
                fill
                className="object-contain"
              />
            </div>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center">
                <MapPin size={18} className="mr-2 text-[#0a3b5c]" />
                <p>Av. del Libertador 2442, CABA</p>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-2 text-[#0a3b5c]" />
                <p>+54 11 5263-0023</p>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="mr-2 text-[#0a3b5c]" />
                <p>info@global-investments.com.ar</p>
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <Link
                href="https://www.instagram.com/globalinvestments.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0a3b5c] hover:text-[#0a3b5c]/80 transition-colors"
                aria-label="Instagram"
              >
                <div className="rounded-full border border-[#0a3b5c] w-8 h-8 flex items-center justify-center">
                  <Instagram size={16} />
                </div>
              </Link>
              <Link
                href="https://www.facebook.com/globalinvestments.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0a3b5c] hover:text-[#0a3b5c]/80 transition-colors"
                aria-label="Facebook"
              >
                <div className="rounded-full border border-[#0a3b5c] w-8 h-8 flex items-center justify-center">
                  <Facebook size={16} />
                </div>
              </Link>
              <Link
                href="https://www.linkedin.com/company/global-investments-ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0a3b5c] hover:text-[#0a3b5c]/80 transition-colors"
                aria-label="LinkedIn"
              >
                <div className="rounded-full border border-[#0a3b5c] w-8 h-8 flex items-center justify-center">
                  <Linkedin size={16} />
                </div>
              </Link>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold text-[#0a3b5c] mb-4">Enlaces</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="https://global-investments.com.ar" className="hover:text-[#0a3b5c] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="https://global-investments.com.ar/empresa"
                  className="hover:text-[#0a3b5c] transition-colors"
                >
                  Empresa
                </Link>
              </li>
              <li>
                <Link
                  href="https://global-investments.com.ar/proyectos"
                  className="hover:text-[#0a3b5c] transition-colors"
                >
                  Proyectos
                </Link>
              </li>
              <li>
                <Link
                  href="https://global-investments.com.ar/prensa"
                  className="hover:text-[#0a3b5c] transition-colors"
                >
                  Prensa
                </Link>
              </li>
              <li>
                <Link
                  href="https://global-investments.com.ar/contacto"
                  className="hover:text-[#0a3b5c] transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="https://global-investments.com.ar/invertir"
                  className="hover:text-[#0a3b5c] transition-colors"
                >
                  Invertí con nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Projects */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold text-[#0a3b5c] mb-4">Proyectos</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link
                  href="https://global-investments.com.ar/portfolio/bosque-tortugas"
                  className="hover:text-[#0a3b5c] transition-colors"
                >
                  Bosque Tortugas
                </Link>
              </li>
              <li>
                <Link
                  href="https://global-investments.com.ar/portfolio/bosque-pilar"
                  className="hover:text-[#0a3b5c] transition-colors font-medium"
                >
                  Bosque Pilar
                </Link>
              </li>
              <li>
                <Link
                  href="https://global-investments.com.ar/portfolio/otros-proyectos"
                  className="hover:text-[#0a3b5c] transition-colors"
                >
                  Otros proyectos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Global Investments. Todos los derechos reservados.</p>
          <p className="mt-2">
            <Link href="/terminos-y-condiciones" className="hover:text-[#0a3b5c] transition-colors">
              Términos y condiciones
            </Link>{" "}
            |{" "}
            <Link href="/politica-de-privacidad" className="hover:text-[#0a3b5c] transition-colors">
              Política de privacidad
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
