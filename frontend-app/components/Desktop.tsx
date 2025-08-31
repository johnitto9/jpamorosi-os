"use client"

import { ReactNode, Suspense } from "react"
import { ConditionalBackground3D } from "../packages/three-react/src/ConditionalBackground3D"

interface DesktopProps {
  children?: ReactNode
}

export default function Desktop({ children }: DesktopProps) {
  return (
    <div className="h-full w-full relative">
      {/* 3D Background Layer - Completely isolated with absolute positioning and z-index 0 */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={
          <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-surface-dark to-surface-medium">
            {/* Fallback gradient while 3D loads */}
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-accent-cyan rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        }>
          <ConditionalBackground3D 
            density={1500}
            color="#00f2ff"
            speed={0.05}
          />
        </Suspense>
      </div>

      {/* Enhanced background overlay for when 3D is disabled */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-surface-dark to-surface-medium opacity-80" style={{ zIndex: 1 }}>
        {/* Animated particles overlay */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {Array.from({ length: 40 }, (_, i) => {
            const colors = ['bg-accent-cyan', 'bg-accent-magenta', 'bg-accent-purple'];
            const color = colors[i % colors.length];
            const size = Math.random() > 0.8 ? 'w-2 h-2' : 'w-1 h-1';
            
            return (
              <div
                key={i}
                className={`absolute ${size} ${color} rounded-full animate-pulse-slow`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 3}s`
                }}
              />
            );
          })}
        </div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px'
             }}
        />
      </div>

      {/* Main content area - Completely separate with relative positioning and z-index 10 */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  )
}