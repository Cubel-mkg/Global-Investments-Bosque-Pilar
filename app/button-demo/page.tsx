import { ButtonDemo } from "@/components/button-demo"

export default function ButtonDemoPage() {
  return (
    <div className="container py-20">
      <h1 className="text-3xl font-bold mb-8 text-primary-dark">Button Component Demo</h1>
      <p className="mb-8 text-gray-700">
        This page demonstrates the various button styles, sizes, and states available in the Bosque Pilar design system.
        The buttons have been refined to work seamlessly with the glassmorphism aesthetic while maintaining
        accessibility and responsiveness.
      </p>
      <ButtonDemo />
    </div>
  )
}
