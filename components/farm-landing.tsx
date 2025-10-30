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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative">
      <AnimatedBackground />

      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-md shadow-sm relative z-10">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src={getAsset("/farmquest-logo.png")} alt="Krishi Quest Logo" width={36} height={36} className="h-9 w-9" />
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent">Krishi Quest</span>
          </div>
          <Button
            onClick={() => setShowAuthModal(true)}
            variant="outline"
            className="border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white bg-white font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative z-10">
        <Badge className="mb-6 bg-teal-100 text-teal-800 hover:bg-teal-100 px-4 py-2 text-base">🌾 सतत कृषि को बनाएं मजेदार</Badge>
        <h1 className="text-6xl font-bold text-slate-900 mb-6 text-balance leading-tight">
          Transform Your Farming Journey with
          <span className="block mt-2 bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent"> Krishi Quest</span>
        </h1>
        <p className="text-xl text-slate-700 mb-10 max-w-3xl mx-auto text-pretty leading-relaxed">
          Join a vibrant community of farmers revolutionizing agriculture through gamified sustainable practices, interactive learning, and meaningful rewards.
        </p>
        <Button
          onClick={() => setShowAuthModal(true)}
          size="lg"
          className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-10 py-6 text-lg shadow-xl hover:shadow-2xl transition-all font-semibold rounded-xl"
        >
          शुरू करें अपना कृषि सफर
          <ArrowRight className="ml-2 h-6 w-6" />
        </Button>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">Why Farmers Trust Krishi Quest</h2>
        <p className="text-center text-slate-600 mb-12 text-lg">Empowering agriculture through innovation and community</p>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-teal-200 hover:shadow-2xl transition-all hover:scale-105 bg-white/80 backdrop-blur">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md">
                <Trophy className="h-10 w-10 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Earn & Grow</h3>
              <p className="text-slate-700 leading-relaxed">
                Complete farming challenges to earn credits, unlock badges, and climb the leaderboard while mastering sustainable techniques.
              </p>
            </CardContent>
          </Card>

          <Card className="border-teal-200 hover:shadow-2xl transition-all hover:scale-105 bg-white/80 backdrop-blur">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md">
                <Target className="h-10 w-10 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Track Progress</h3>
              <p className="text-slate-700 leading-relaxed">
                Monitor daily agricultural practices including water management, soil testing, and organic farming methods with smart analytics.
              </p>
            </CardContent>
          </Card>

          <Card className="border-teal-200 hover:shadow-2xl transition-all hover:scale-105 bg-white/80 backdrop-blur">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md">
                <Users className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Connect & Learn</h3>
              <p className="text-slate-700 leading-relaxed">
                Network with farmers nationwide, exchange knowledge, participate in challenges, and grow together as a community.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sustainable Practices Preview */}
      <section className="bg-gradient-to-br from-white to-teal-50/30 py-20 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-4">Master Sustainable Agricultural Practices</h2>
          <p className="text-center text-slate-600 mb-12 text-lg">Learn cutting-edge techniques for modern farming</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 shadow-md hover:shadow-lg transition-all">
              <Droplets className="h-10 w-10 text-cyan-600" />
              <div>
                <h4 className="font-semibold text-slate-900 text-lg">जल संरक्षण</h4>
                <p className="text-sm text-slate-600">Drip irrigation, rainwater harvesting & smart water management</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 shadow-md hover:shadow-lg transition-all">
              <Sun className="h-10 w-10 text-amber-600" />
              <div>
                <h4 className="font-semibold text-slate-900 text-lg">मृदा स्वास्थ्य</h4>
                <p className="text-sm text-slate-600">Organic composting, soil testing & nutrient management</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 shadow-md hover:shadow-lg transition-all">
              <Leaf className="h-10 w-10 text-emerald-600" />
              <div>
                <h4 className="font-semibold text-slate-900 text-lg">फसल चक्रण</h4>
                <p className="text-sm text-slate-600">Crop rotation planning & biodiversity enhancement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 py-20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Revolutionize Your Farming?</h2>
          <p className="text-teal-50 mb-10 text-xl max-w-2xl mx-auto">
            Join thousands of progressive farmers embracing sustainable agriculture and earning rewards.
          </p>
          <Button
            onClick={() => setShowAuthModal(true)}
            size="lg"
            variant="secondary"
            className="bg-white text-teal-700 hover:bg-teal-50 hover:text-teal-800 px-10 py-6 text-lg shadow-2xl font-semibold rounded-xl hover:scale-105 transition-all"
          >
            अभी शुरू करें
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-100 py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Image src={getAsset("/farmquest-logo.png")} alt="Krishi Quest Logo" width={24} height={24} className="h-6 w-6" />
                <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Krishi Quest</span>
              </div>
              <p className="text-slate-300 mb-4 max-w-md">
                Empowering Indian farmers with cutting-edge sustainable practices through gamification, community learning, and innovative rewards. Transform agriculture, one quest at a time.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-teal-700 transition-all">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-teal-700 transition-all">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-teal-700 transition-all">
                  <Instagram className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    About Krishi Quest
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    Farmer Success Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    Community Forum
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-400 transition-colors">
                    Agricultural Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-3 text-slate-300">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">support@krishiquest.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">New Delhi, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-300">© 2025 Krishi Quest. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-slate-300 mt-4 md:mt-0">
              <a href="#" className="hover:text-teal-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-teal-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-teal-400 transition-colors">
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