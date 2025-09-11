"use client"

import { useState, useEffect } from "react"

interface AnimatedAvatarProps {
  avatar: {
    type: "male" | "female" | "robot"
    skin: string
    hair: string
    clothing: string
    hat?: string
    tool?: string
  }
  size?: "sm" | "md" | "lg"
  showAnimations?: boolean
  level?: number
}

export function AnimatedAvatar({ avatar, size = "md", showAnimations = true, level = 1 }: AnimatedAvatarProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(false)

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  useEffect(() => {
    if (level > 1) {
      setShowLevelUp(true)
      const timer = setTimeout(() => setShowLevelUp(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [level])

  const renderCharacter = () => {
    const baseSize = size === "sm" ? "text-2xl" : size === "md" ? "text-6xl" : "text-8xl"

    // Safely check avatar and its type before accessing
    if (avatar?.type === "robot") {
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className={`${baseSize} filter drop-shadow-lg`} style={{ color: avatar?.skin }}>
            🤖
          </div>
          {avatar.hat && (
            <div
              className={`absolute -top-2 left-1/2 transform -translate-x-1/2 ${size === "sm" ? "text-lg" : size === "md" ? "text-2xl" : "text-3xl"}`}
            >
              {avatar.hat}
            </div>
          )}
        </div>
      )
    }

    // Human characters (male/female)
    const faceEmoji = avatar?.type === "male" ? "👨" : "👩"
    const skinToneMap: { [key: string]: string } = {
      "#FDBCB4": "🏻", // Light
      "#EEA990": "🏼", // Medium Light
      "#CE967C": "🏽", // Medium
      "#B07948": "🏾", // Medium Dark
      "#8D5524": "🏿", // Dark
    }

    const skinTone = skinToneMap[avatar?.skin] || ""
    const characterEmoji = faceEmoji + skinTone

    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className={`${baseSize} filter drop-shadow-lg`}>{characterEmoji}</div>

        {/* Hair overlay for human characters */}
        {avatar?.hair !== "bald" && (
          <div
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 ${size === "sm" ? "text-lg" : size === "md" ? "text-2xl" : "text-3xl"}`}
          >
            {avatar?.hair}
          </div>
        )}

        {/* Hat */}
        {avatar?.hat && (
          <div
            className={`absolute -top-2 left-1/2 transform -translate-x-1/2 ${size === "sm" ? "text-lg" : size === "md" ? "text-2xl" : "text-3xl"}`}
          >
            {avatar?.hat}
          </div>
        )}

        {/* Clothing overlay */}
        <div
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${size === "sm" ? "text-sm" : size === "md" ? "text-xl" : "text-2xl"}`}
        >
          {avatar?.clothing}
        </div>
      </div>
    )
  }

  const getFarmingTool = () => {
    if (avatar?.tool) return avatar.tool
    if (level >= 15) return "🚜"
    if (level >= 10) return "🔧"
    if (level >= 5) return "🪓"
    return "🌱"
  }

  return (
    <div
      className={`relative ${sizeClasses[size]} ${showAnimations ? "transition-all duration-300" : ""} ${isHovered && showAnimations ? "scale-110" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Avatar Container */}
      <div
        className={`relative ${sizeClasses[size]} rounded-full overflow-hidden border-4 border-green-300 bg-gradient-to-b from-sky-200 to-green-100`}
      >
        {renderCharacter()}

        {/* Farming Tool */}
        <div
          className={`absolute bottom-0 right-0 ${size === "sm" ? "text-sm" : size === "md" ? "text-lg" : "text-xl"} ${showAnimations ? "animate-bounce" : ""}`}
        >
          {getFarmingTool()}
        </div>
      </div>

      {/* Level Badge */}
      <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
        {level}
      </div>

      {/* Floating XP Particles */}
      {showAnimations && isHovered && (
        <>
          <div className="absolute -top-2 -left-2 text-green-500 text-xs font-bold animate-ping">+XP</div>
          <div className="absolute -bottom-2 -right-2 text-yellow-500 text-lg animate-spin">⭐</div>
          <div className="absolute top-0 right-0 text-blue-500 text-sm animate-bounce">💧</div>
        </>
      )}

      {/* Level Up Animation */}
      {showLevelUp && showAnimations && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold animate-pulse border-2 border-yellow-600">
            LEVEL UP! 🎉
          </div>
        </div>
      )}

      {/* Glow Effect for High Levels */}
      {level >= 10 && showAnimations && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-green-400/20 animate-pulse"></div>
      )}
    </div>
  )
}
