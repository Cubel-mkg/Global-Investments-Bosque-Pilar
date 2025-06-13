"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { ImageOff } from "lucide-react"

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
}

export function ImageWithFallback({ src, alt, fallbackSrc = "/placeholder.svg", ...rest }: ImageWithFallbackProps) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleError = () => {
    setError(true)
    setLoading(false)
  }

  const handleLoad = () => {
    setLoading(false)
  }

  if (error) {
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-gray-100">
        {fallbackSrc ? (
          <Image
            src={fallbackSrc || "/placeholder.svg"}
            alt={alt}
            {...rest}
            className={`${rest.className || ""} transition-opacity`}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
            <ImageOff className="h-8 w-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">{alt || "Imagen no disponible"}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-bosque"></div>
        </div>
      )}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        {...rest}
        onError={handleError}
        onLoad={handleLoad}
        className={`${rest.className || ""} ${loading ? "opacity-0" : "opacity-100"} transition-opacity`}
      />
    </>
  )
}
