import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-brand-blue text-white": variant === "default",
          "bg-light-elevated dark:bg-dark-elevated text-light-text-secondary dark:text-dark-text-secondary": variant === "secondary",
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300": variant === "success",
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300": variant === "warning",
          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300": variant === "danger",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }