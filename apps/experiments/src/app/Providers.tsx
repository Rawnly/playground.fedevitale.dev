"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { ThemeProvider, useTheme } from "next-themes"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider forcedTheme="dark" attribute="class">
      {children}
    </ThemeProvider>
  )
}

function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      className="py-2 px-4 fixed top-5 right-5 rounded-lg hover:bg-[rgba(255,255,255,.1)]"
      onClick={() =>
        setTheme(
          theme === "dark"
            ? "light"
            : theme === "system"
              ? "dark"
              : theme === "light"
                ? "system"
                : "dark"
        )
      }
    >
      {theme === "system" ? (
        <Monitor className="w-4" />
      ) : theme === "dark" ? (
        <Sun className="w-4" />
      ) : (
        <Moon className="w-4" />
      )}
    </button>
  )
}
