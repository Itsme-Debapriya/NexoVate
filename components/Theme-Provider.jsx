"use client"

import { useTheme } from "@/hooks/useTheme"
import { useEffect } from "react"

export function ThemeProvider({ children }) {
  const { theme, mounted } = useTheme()

  useEffect(() => {
    if (mounted) {
      if (theme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [theme, mounted])

  if (!mounted) {
    return <>{children}</>
  }

  return <>{children}</>
}
