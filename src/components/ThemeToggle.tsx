"use client"

import * as React from "react"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark" | null>(null)

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setTheme(isDark ? "dark" : "light")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  if (!theme) return <div className="size-8" />

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full bg-muted/40 border-border backdrop-blur-sm text-muted-foreground hover:text-foreground hover:bg-muted/80 hover:border-primary/50 transition-all active:scale-90"
      aria-label="Toggle theme"
    >
      <div className="relative size-full flex items-center justify-center">
        <Sun className={`absolute h-4 w-4 transition-all duration-500 ${theme === 'dark' ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100 text-yellow-500'}`} />
        <Moon className={`absolute h-4 w-4 transition-all duration-500 ${theme === 'light' ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100 text-blue-400'}`} />
      </div>
    </Button>
  )
}
