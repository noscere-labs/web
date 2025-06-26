import * as React from "react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

const LoadingSpinner = ({ className, size = "md" }: LoadingSpinnerProps) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        {
          "h-4 w-4": size === "sm",
          "h-6 w-6": size === "md",
          "h-8 w-8": size === "lg",
        },
        className
      )}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

interface LoadingSkeletonProps {
  className?: string
}

const LoadingSkeleton = ({ className }: LoadingSkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-light-elevated dark:bg-dark-elevated",
        className
      )}
    />
  )
}

interface LoadingDotsProps {
  className?: string
}

const LoadingDots = ({ className }: LoadingDotsProps) => {
  return (
    <div className={cn("flex space-x-1", className)}>
      <div className="h-2 w-2 animate-pulse rounded-full bg-current"></div>
      <div className="h-2 w-2 animate-pulse rounded-full bg-current animation-delay-75"></div>
      <div className="h-2 w-2 animate-pulse rounded-full bg-current animation-delay-150"></div>
    </div>
  )
}

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4 text-brand-blue" />
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Loading...
        </p>
      </div>
    </div>
  )
}

export { LoadingSpinner, LoadingSkeleton, LoadingDots, LoadingPage }