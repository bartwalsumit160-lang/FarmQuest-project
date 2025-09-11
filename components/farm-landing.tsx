"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Trophy,
  Target,
  Users,
  ArrowRight,
  Leaf,
  Droplets,
  Sun,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import { AuthModal } from "./auth-modal"
import { AnimatedBackground } from "./animated-background"
import Image from "next/image"
import { getAsset } from '@/lib/getAsset';

interface FarmLandingProps {
  onGetStarted: () => void
  onSignup: () => void
  onLogin: () => void
}

export function FarmLanding({ onGetStarted, onSignup, onLogin }: FarmLandingProps) {
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handleAuthLogin = () => {
    setShowAuthModal(false)
    onLogin()
  }

  const handleAuthSignup = () => {
    setShowAuthModal(false)
    onSignup()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 relative">
      <AnimatedBackground />

      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={getAsset("/farmquest-logo.png")} alt="FarmQuest Logo" width={32} height={32} className="h-8 w-8" />
            <span className="text-2xl font-bold text-green-800">FarmQuest</span>
          </div>
          <Button
            onClick={() => setShowAuthModal(true)}
            variant="outline"
            className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white bg-white"
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center relative z-10">
        <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-100">🌱 Sustainable Farming Made Fun</Badge>
        <h1 className="text-5xl font-bold text-green-900 mb-6 text-balance">
          Level Up Your Farm with
          <span className="text-green-600"> Sustainable Practices</span>
        </h1>
        <p className="text-xl text-green-700 mb-8 max-w-2xl mx-auto text-pretty">
          Join thousands of farmers building better habits, earning rewards, and creating a more sustainable future
          through gamified farming practices.
        </p>
        <Button
          onClick={() => setShowAuthModal(true)}
          size="lg"
          className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 text-lg shadow-lg"
        >
          Start Your Farm Journey
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <h2 className="text-3xl font-bold text-center text-green-900 mb-12">Why Farmers Choose FarmQuest</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-900 mb-3">Earn Rewards</h3>
              <p className="text-green-700">
                Complete sustainable farming tasks to earn XP, unlock achievements, and level up your farming expertise.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-900 mb-3">Build Habits</h3>
              <p className="text-green-700">
                Track daily sustainable practices like water conservation, soil health checks, and organic methods.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-900 mb-3">Join Community</h3>
              <p className="text-green-700">
                Connect with fellow farmers, share tips, and participate in seasonal challenges together.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sustainable Practices Preview */}
      <section className="bg-white py-16 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-900 mb-12">Sustainable Practices You'll Master</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-green-50">
              <Droplets className="h-8 w-8 text-blue-600" />
              <div>
                <h4 className="font-semibold text-green-900">Water Conservation</h4>
                <p className="text-sm text-green-700">Efficient irrigation and rainwater harvesting</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-amber-50">
              <Sun className="h-8 w-8 text-amber-600" />
              <div>
                <h4 className="font-semibold text-green-900">Soil Health</h4>
                <p className="text-sm text-green-700">Composting and organic matter management</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-green-50">
              <Leaf className="h-8 w-8 text-green-600" />
              <div>
                <h4 className="font-semibold text-green-900">Crop Rotation</h4>
                <p className="text-sm text-green-700">Sustainable planting and biodiversity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 py-16 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Farm?</h2>
          <p className="text-green-100 mb-8 text-lg">
            Join the sustainable farming revolution and start earning rewards today.
          </p>
          <Button
            onClick={() => setShowAuthModal(true)}
            size="lg"
            variant="secondary"
            className="bg-white text-green-700 hover:bg-green-50 hover:text-green-800 px-8 py-3 text-lg shadow-lg"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <footer className="bg-green-900 text-green-100 py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Image src={getAsset("/farmquest-logo.png")} alt="FarmQuest Logo" width={24} height={24} className="h-6 w-6" />
                <span className="text-xl font-bold">FarmQuest</span>
              </div>
              <p className="text-green-200 mb-4 max-w-md">
                Empowering farmers worldwide to build sustainable practices through gamification. Join our community and
                make farming fun while protecting our planet.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="text-green-200 hover:text-white hover:bg-green-800">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-green-200 hover:text-white hover:bg-green-800">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-green-200 hover:text-white hover:bg-green-800">
                  <Instagram className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-green-200">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-3 text-green-200">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">hello@farmquest.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-green-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-green-200">© 2024 FarmQuest. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-green-200 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleAuthLogin}
        onSignup={handleAuthSignup}
      />
    </div>
  )
}