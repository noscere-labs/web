import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button"
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-brand-blue hover:bg-brand-blue-dark text-white focus:ring-brand-blue": variant === "primary",
            "bg-light-card dark:bg-dark-card hover:bg-light-elevated dark:hover:bg-dark-elevated text-light-text-primary dark:text-dark-text-primary border border-light-elevated dark:border-dark-elevated focus:ring-brand-blue": variant === "secondary",
            "border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white focus:ring-brand-blue": variant === "outline",
            "text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary hover:bg-light-elevated dark:hover:bg-dark-elevated focus:ring-brand-blue": variant === "ghost",
          },
          {
            "px-3 py-1.5 text-sm": size === "sm",
            "px-4 py-2 text-base": size === "md",
            "px-6 py-3 text-lg": size === "lg",
          },
          className
        )}
        ref={ref as any}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }