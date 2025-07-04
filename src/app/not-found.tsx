// app/not-found.tsx (or app/404.tsx depending on Next.js version)
'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 text-center">
      {/* AI error illustration */}
      <div className="w-40 h-40 mb-6 relative flex items-center justify-center">
        <div className="text-8xl">🤖</div>
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        404 – Prompt Not Found
      </h1>

      {/* Subtext */}
      <p className="text-muted-foreground mb-6 max-w-md">
        The style you&apos;re looking for doesn&apos;t exist or was removed.
      </p>

      {/* CTA Button */}
      <Link href="/styles">
        <Button variant="default" size="lg" className="rounded-xl">
          Back to Styles
        </Button>
      </Link>
    </div>
  )
}
