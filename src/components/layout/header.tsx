"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Lab", href: "/lab" },
  { name: "Blog", href: "/blog" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setIsDarkMode(isDark)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark')
      setIsDarkMode(true)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-light-elevated dark:border-dark-elevated bg-light-bg/95 dark:bg-dark-bg/95 backdrop-blur supports-[backdrop-filter]:bg-light-bg/60 dark:supports-[backdrop-filter]:bg-dark-bg/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
              Noscere
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand-blue",
                pathname === item.href
                  ? "text-brand-blue"
                  : "text-light-text-secondary dark:text-dark-text-secondary"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className="h-9 w-9 px-0"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button asChild>
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>

        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="h-9 w-9 px-0"
          >
            {isMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-light-elevated dark:border-dark-elevated bg-light-bg dark:bg-dark-bg">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                  pathname === item.href
                    ? "text-brand-blue bg-light-elevated dark:bg-dark-elevated"
                    : "text-light-text-secondary dark:text-dark-text-secondary hover:text-brand-blue hover:bg-light-elevated dark:hover:bg-dark-elevated"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center justify-between px-3 py-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="h-9 w-9 px-0"
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button asChild size="sm">
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}