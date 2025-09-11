"use client"

import { useState } from "react"
import { FarmDashboard } from "@/components/farm-dashboard"
import { FarmLanding } from "@/components/farm-landing"
import { OnboardingFlow } from "@/components/onboarding-flow"

interface UserProfile {
  knowledgeLevel: string
  farmingExperience: string
  age: string
  avatar: {
    skin: string
    hair: string
    clothing: string
  }
  specialization: string
}

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  const handleGetStarted = () => {
    setShowDashboard(true)
  }

  const handleBackToLanding = () => {
    setShowDashboard(false)
  }

  const handleSignup = () => {
    setShowOnboarding(true)
  }

  const handleLogin = () => {
    setShowDashboard(true)
  }

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile)
    setShowOnboarding(false)
    setShowDashboard(true)
  }

  return (
    <>
      {showOnboarding && <OnboardingFlow isOpen={showOnboarding} onComplete={handleOnboardingComplete} />}
      {showDashboard ? (
        <FarmDashboard onBackToLanding={handleBackToLanding} userProfile={userProfile} />
      ) : (
        <FarmLanding onGetStarted={handleGetStarted} onSignup={handleSignup} onLogin={handleLogin} />
      )}
    </>
  )
}
