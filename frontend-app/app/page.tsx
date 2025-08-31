"use client"

import { useEffect, useState } from "react"
import Desktop from "../components/Desktop"
import { Dock } from "../packages/desktop/components/Dock"
import { Window } from "../packages/desktop/components/Window"
import { useDesktopStore } from "../packages/desktop/store"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const { windows } = useDesktopStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-full bg-dark-bg flex items-center justify-center">
        <div className="text-accent-cyan animate-pulse font-mono">Iniciando jpamorosi.os...</div>
      </div>
    )
  }

  return (
    <Desktop>
      {/* Top Bar */}
      <header className="flex items-center justify-between p-4 glass-card border-b border-accent-cyan border-opacity-20">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-magenta animate-pulse" />
          <span className="font-mono text-sm text-primary-text">jpamorosi.os</span>
        </div>
        <div className="text-xs text-secondary-text font-mono">
          {new Date().toLocaleTimeString()}
        </div>
      </header>

      {/* Desktop Content */}
      <main className="flex-1 px-8 py-12 overflow-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-text mb-4">
              <span className="text-accent-cyan">jp</span>
              <span className="text-accent-magenta">amorosi</span>
              <span className="text-accent-purple">.os</span>
            </h1>
            <p className="text-secondary-text font-mono">Sistema operativo personal • Interactive CV</p>
            <p className="text-secondary-text opacity-70 text-sm mt-2">
              Click on the dock icons below to open applications
            </p>
          </div>

          {/* Welcome Card */}
          <div className="glass-card p-6 rounded-lg inline-block mb-8">
            <h2 className="text-lg font-semibold text-accent-cyan mb-3">Welcome to jpamorosi.os</h2>
            <p className="text-secondary-text text-sm max-w-md mx-auto leading-relaxed">
              This is an interactive CV built as a desktop environment. Click the dock icons to 
              open different applications with my professional information.
            </p>
          </div>

          {/* Status */}
          {windows.length > 0 && (
            <div className="text-sm text-secondary-text mb-8">
              {windows.length} window{windows.length > 1 ? 's' : ''} open
            </div>
          )}
        </div>
      </main>

      {/* Windows */}
      {windows.map((window) => (
        <Window key={window.id} window={window} />
      ))}

      {/* Functional Dock */}
      <Dock />
    </Desktop>
  )
}