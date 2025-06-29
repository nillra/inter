"use client"

import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") || "light"
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (newTheme) => {
    const root = document.documentElement

    if (newTheme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    applyTheme(newTheme)
  }

  if (!mounted) return null

  return (
    <Card className="fixed top-20 right-4 z-50 shadow-2xl border-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg animate-in slide-in-from-right-4 duration-700">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Theme:</span>

          <Button
            variant={theme === "light" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleThemeChange("light")}
            className={`transform hover:scale-110 transition-all duration-300 ${
              theme === "light"
                ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white shadow-lg animate-gradient-x bg-300%"
                : "hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
            }`}
          >
            <Sun className="w-4 h-4" />
          </Button>

          <Button
            variant={theme === "dark" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleThemeChange("dark")}
            className={`transform hover:scale-110 transition-all duration-300 ${
              theme === "dark"
                ? "bg-gradient-to-r from-purple-600 via-blue-600 via-indigo-600 to-violet-700 text-white shadow-lg animate-gradient-x bg-300%"
                : "hover:bg-purple-50 dark:hover:bg-purple-900/20"
            }`}
          >
            <Moon className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
