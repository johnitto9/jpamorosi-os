import { create } from "zustand"
import type { DesktopState, WindowApp, WindowInstance } from "./types"

export const useDesktopStore = create<DesktopState>((set, get) => ({
  windows: [],
  nextZIndex: 1000,

  openWindow: (app: WindowApp) => {
    const { windows, nextZIndex } = get()

    // Check if window is already open
    const existingWindow = windows.find((w) => w.app.id === app.id)
    if (existingWindow) {
      get().focusWindow(existingWindow.id)
      return
    }

    const newWindow: WindowInstance = {
      id: `${app.id}-${Date.now()}`,
      app,
      position: app.defaultPosition || { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
      size: app.defaultSize || { width: 600, height: 400 },
      zIndex: nextZIndex,
      isMinimized: false,
    }

    set({
      windows: [...windows, newWindow],
      nextZIndex: nextZIndex + 1,
    })
  },

  closeWindow: (id: string) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    }))
  },

  focusWindow: (id: string) => {
    const { windows, nextZIndex } = get()
    const window = windows.find((w) => w.id === id)
    if (!window) return

    set({
      windows: windows.map((w) => (w.id === id ? { ...w, zIndex: nextZIndex, isMinimized: false } : w)),
      nextZIndex: nextZIndex + 1,
    })
  },

  updateWindow: (id: string, updates: Partial<WindowInstance>) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, ...updates } : w)),
    }))
  },

  minimizeWindow: (id: string) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
    }))
  },
}))
