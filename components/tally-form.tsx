"use client"

import { useEffect, useRef } from "react"

interface TallyFormProps {
  formId: string
  height?: number
}

export function TallyForm({ formId, height = 500 }: TallyFormProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const scriptLoaded = useRef(false)

  useEffect(() => {
    // Función para cargar el script de Tally
    const loadTallyScript = () => {
      if (scriptLoaded.current) return

      const script = document.createElement("script")
      script.src = "https://tally.so/widgets/embed.js"
      script.async = true
      script.onload = () => {
        scriptLoaded.current = true
        // @ts-ignore - Tally es una variable global inyectada por el script
        if (typeof Tally !== "undefined") {
          // @ts-ignore
          Tally.loadEmbeds()
        }
      }
      document.body.appendChild(script)
    }

    // Cargar el script cuando el componente se monta
    loadTallyScript()

    // Función para manejar el redimensionamiento en dispositivos móviles
    const handleResize = () => {
      if (iframeRef.current) {
        const width = Math.min(window.innerWidth - 40, 600) // Ajustar ancho para móviles
        iframeRef.current.style.width = `${width}px`
      }
    }

    // Configurar el listener de redimensionamiento
    window.addEventListener("resize", handleResize)
    handleResize() // Llamar inicialmente

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="w-full overflow-hidden">
      <iframe
        ref={iframeRef}
        data-tally-src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
        loading="lazy"
        width="100%"
        height={height}
        title="Formulario de contacto"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        style={{ maxWidth: "100%", borderRadius: "8px" }}
      ></iframe>
    </div>
  )
}
