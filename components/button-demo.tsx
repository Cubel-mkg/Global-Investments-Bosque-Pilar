"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, Mail, Loader2, ArrowRight } from "lucide-react"

export function ButtonDemo() {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleLoadingDemo = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="glass-card p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary-dark">Button Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="glass">Glass</Button>
          <Button variant="glass-primary">Glass Primary</Button>
          <Button variant="glass-outline">Glass Outline</Button>
          <Button variant="glass-dark">Glass Dark</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary-dark">Button Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="glass" size="sm">
            Small
          </Button>
          <Button variant="glass">Default</Button>
          <Button variant="glass" size="lg">
            Large
          </Button>
          <Button variant="glass" size="icon">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary-dark">Button Rounded</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="glass" rounded="default">
            Default
          </Button>
          <Button variant="glass" rounded="lg">
            Large
          </Button>
          <Button variant="glass" rounded="xl">
            Extra Large
          </Button>
          <Button variant="glass" rounded="full">
            Full
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary-dark">Button States</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="glass">Normal</Button>
          <Button variant="glass" disabled>
            Disabled
          </Button>
          <Button variant="glass" loading>
            Loading
          </Button>
          <Button variant="glass" loading={isLoading} onClick={handleLoadingDemo}>
            {isLoading ? "Loading..." : "Click to Load"}
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary-dark">Button with Icons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="glass" leftIcon={<Mail className="h-4 w-4" />}>
            Email Us
          </Button>
          <Button variant="glass-primary" rightIcon={<ChevronRight className="h-4 w-4" />}>
            Learn More
          </Button>
          <Button
            variant="glass-outline"
            leftIcon={<Loader2 className="h-4 w-4" />}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Process
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary-dark">Button Animations</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="glass" animation="pulse">
            Pulse
          </Button>
          <Button variant="glass-primary" animation="bounce">
            Bounce
          </Button>
        </div>
      </div>
    </div>
  )
}
