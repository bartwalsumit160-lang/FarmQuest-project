"use client"

import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  type: "leaf" | "seed" | "drop"
}

export function AnimatedBackground() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    // Initialize floating elements
    const initialElements: FloatingElement[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.3 + 0.1,
      type: ["leaf", "seed", "drop"][Math.floor(Math.random() * 3)] as "leaf" | "seed" | "drop",
    }))

    setElements(initialElements)

    // Animate elements
    const interval = setInterval(() => {
      setElements((prev) =>
        prev.map((element) => ({
          ...element,
          y: element.y > 100 ? -10 : element.y + element.speed,
          x: element.x + Math.sin(element.y * 0.01) * 0.1,
        })),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const getElementIcon = (type: string) => {
    const baseClasses = "w-full h-full"

    switch (type) {
      case "leaf":
        return (
          <svg className={baseClasses} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
          </svg>
        )
      case "seed":
        return (
          <svg className={baseClasses} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14A7,7 0 0,1 14,21H10A7,7 0 0,1 3,14A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M10,9A5,5 0 0,0 5,14A5,5 0 0,0 10,19H14A5,5 0 0,0 19,14A5,5 0 0,0 14,9H10Z" />
          </svg>
        )
      case "drop":
        return (
          <svg className={baseClasses} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2C13.11,7.18 16.11,9.12 16.11,12.11C16.11,15.1 14.1,17.11 12,17.11C9.9,17.11 7.89,15.1 7.89,12.11C7.89,9.12 10.89,7.18 12,2M12,4.36C11.06,6.9 9.11,8.44 9.11,12.11C9.11,14.43 10.57,15.89 12,15.89C13.43,15.89 14.89,14.43 14.89,12.11C14.89,8.44 12.94,6.9 12,4.36Z" />
          </svg>
        )
      default:
        return (
          <svg className={baseClasses} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
          </svg>
        )
    }
  }

  const getElementColor = (type: string) => {
    switch (type) {
      case "leaf":
        return "text-green-400"
      case "seed":
        return "text-green-500"
      case "drop":
        return "text-blue-400"
      default:
        return "text-green-400"
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => (
        <div
          key={element.id}
          className={`absolute transition-all duration-75 ease-linear ${getElementColor(element.type)}`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            opacity: element.opacity,
            transform: `rotate(${element.y * 2}deg)`,
          }}
        >
          {getElementIcon(element.type)}
        </div>
      ))}
    </div>
  )
}
