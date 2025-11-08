"use client"

import { useEffect, useState } from "react"
import { themeStorage } from "@/lib/storage"

export function useTheme() {
  const [theme, setTheme] = useState("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTheme(themeStorage.getTheme())
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    themeStorage.setTheme(newTheme)
  }

  return { theme, toggleTheme, mounted }
}
