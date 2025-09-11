"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { AnimatedAvatar } from "./animated-avatar"
import { Trophy, Star, Coins, Shield, Sprout, Sun, Users, Droplets, BarChart3, Target, BookOpen, Sword, Award, Calendar, Clock, Zap, Settings, WandSparkles, Palette, Scissors, Smile, Sparkles, Shirt, ShoppingCart, Box } from "lucide-react"
import { LearningSystem } from "./learning-system" // Import LearningSystem component
import { HabitManagement } from "./habit-management" // Added HabitManagement import
import { ChallengesSystem } from "./challenges-system" // Added ChallengesSystem import
import { CommunitySystem } from "./community-system" // Added CommunitySystem import
import { CalendarSystem } from "./calendar-system" // Added CalendarSystem import
import { QuestsSystem } from "./quests-system" // Added QuestsSystem import
import { LeaderboardSystem } from "./leaderboard-system" // Added LeaderboardSystem import
import { SettingsSystem } from "./settings-system"

interface FarmDashboardProps {
  userProfile?: {
    name: string // Added name field to userProfile interface
    knowledgeLevel: string
    farmingExperience: string
    age: string
    avatar: {
      skin: string
      hair: string
      clothing: string
    }
  }
}

export function FarmDashboard({ userProfile }: FarmDashboardProps) {
  const [selectedTab, setSelectedTab] = useState("dashboard")
  const [userCredits, setUserCredits] = useState(1250)
  const [userPopularity, setUserPopularity] = useState(420)
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const [showAvatarDialog, setShowAvatarDialog] = useState(false)

  // Diverse avatars (no customization)
  const avatarChoices = [
    { image: "/farmer-avatar.png" },
    { image: "/placeholder-user.jpg" },
    { image: "/placeholder.jpg" },
    { image: "/placeholder-logo.png" },
    { image: "/placeholder-logo.svg" },
    { image: "/placeholder-user.jpg" },
    { image: "/placeholder.jpg" },
    { image: "/farmer-avatar.png" },
  ]
  const [selectedAvatarIdx, setSelectedAvatarIdx] = useState(0)

  // Example accessory options
  const accessories = [
    { name: "Hat", icon: <Smile className="w-6 h-6 text-yellow-500" /> },
    { name: "Glasses", icon: <Scissors className="w-6 h-6 text-blue-500" /> },
    { name: "Scarf", icon: <Shirt className="w-6 h-6 text-red-500" /> },
    { name: "Magic Wand", icon: <WandSparkles className="w-6 h-6 text-purple-500 animate-spin" /> },
    { name: "Sparkles", icon: <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" /> },
  ]
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const formatDateTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return date.toLocaleDateString("en-US", options)
  }

  const formatGreeting = (date: Date) => {
    const hour = date.getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
  }

  const [habits, setHabits] = useState([
    {
      id: 1,
      name: "Water Conservation Check",
      description: "Monitor and optimize water usage",
      icon: Droplets,
      streak: 7,
      completed: true,
      xp: 25,
      category: "Water Management",
    },
    {
      id: 2,
      name: "Soil Health Assessment",
      description: "Test soil pH and nutrient levels",
      icon: Sprout,
      streak: 3,
      completed: false,
      xp: 30,
      category: "Soil Care",
    },
    {
      id: 3,
      name: "Crop Rotation Planning",
      description: "Plan next season crop rotation",
      icon: Sun,
      streak: 12,
      completed: true,
      xp: 40,
      category: "Crop Management",
    },
    {
      id: 4,
      name: "Pest Control Review",
      description: "Check for sustainable pest solutions",
      icon: Shield,
      streak: 5,
      completed: false,
      xp: 35,
      category: "Plant Protection",
    },
  ])

  const handleAddHabit = (newHabit: Omit<(typeof habits)[0], "id" | "streak" | "completed">) => {
    const habit = {
      ...newHabit,
      id: Math.max(...habits.map((h) => h.id), 0) + 1,
      streak: 0,
      completed: false,
    }
    setHabits([...habits, habit])
  }

  const handleDeleteHabit = (id: number) => {
    setHabits(habits.filter((habit) => habit.id !== id))
  }

  const handleToggleHabit = (id: number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? { ...habit, completed: !habit.completed, streak: habit.completed ? habit.streak : habit.streak + 1 }
          : habit,
      )
    )
  }

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "habits", label: "My Habits", icon: Target },
    { id: "learn", label: "Learn", icon: BookOpen }, // Added Learn tab after My Habits
    { id: "quests", label: "Quests", icon: Sword }, // Added Quests tab
    { id: "challenges", label: "Challenges", icon: Trophy }, // Added Challenges tab
    { id: "community", label: "Community", icon: Users },
    { id: "leaderboard", label: "Leaderboard", icon: Award }, // Added Leaderboard tab
    { id: "achievements", label: "Achievements & Contributions", icon: Star }, // Updated label
    { id: "calendar", label: "Calendar", icon: Calendar }, // Added Calendar tab
  ]

  const achievements = [
    { name: "Water Warrior", description: "7-day water conservation streak", earned: true },
    { name: "Soil Guardian", description: "Complete 10 soil assessments", earned: true },
    { name: "Green Thumb", description: "Maintain 5 sustainable habits", earned: false },
    { name: "Eco Champion", description: "Reach Level 10", earned: false },
    { name: "Crop Master", description: "Successfully rotate 3 crop cycles", earned: true },
    { name: "Pest Defender", description: "Use organic pest control for 30 days", earned: false },
    { name: "Community Helper", description: "Help 10 fellow farmers", earned: true },
    { name: "Learning Enthusiast", description: "Complete 5 learning modules", earned: false },
    { name: "Challenge Champion", description: "Complete 20 daily challenges", earned: false },
  ]

  const getUserFirstName = () => {
    if (userProfile?.name) {
      return userProfile.name.split(" ")[0]
    }
    return "Farmer"
  }

  const getUserFullName = () => {
    return userProfile?.name || "Farmer"
  }

  // Add a logout handler that reloads the page (fallback to landing)
  const handleLogout = () => {
    window.location.reload()
  }

  // Handler for avatar customization (stub)
  const handleAvatarChange = (newAvatar: any) => {
    // setCustomAvatar(newAvatar)
    // Optionally update userProfile/avatar in parent state
  }

  const handleAccessoryToggle = (name: string) => {
    setSelectedAccessories((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    )
  }

  // Example collections (badges, items, etc.)
  const userCollections = [
    { name: "Water Warrior", icon: <Trophy className="w-5 h-5 text-blue-600" />, type: "badge" },
    { name: "Soil Guardian", icon: <Sprout className="w-5 h-5 text-green-600" />, type: "badge" },
    { name: "Eco Defender", icon: <Shield className="w-5 h-5 text-green-600" />, type: "badge" },
    { name: "Crop Master", icon: <Sun className="w-5 h-5 text-yellow-600" />, type: "badge" },
    { name: "Community Helper", icon: <Users className="w-5 h-5 text-blue-600" />, type: "badge" },
    // Add more collections as needed
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="flex flex-col w-80 h-full border-r border-border bg-card items-center pt-8 fixed left-0 top-0 bottom-0 z-30">
          {/* Avatar selection (no customization) */}
          <Dialog open={showAvatarDialog} onOpenChange={setShowAvatarDialog}>
            <DialogTrigger asChild>
              <button
                className="focus:outline-none group"
                onClick={() => setShowAvatarDialog(true)}
                title="Choose Your Character"
              >
                <div className="relative flex flex-col items-center">
                  <img
                    src={avatarChoices[selectedAvatarIdx].image}
                    alt="avatar"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <h2 className="text-xl font-bold mb-4 text-foreground text-center">Choose Your Character</h2>
              <div className="grid grid-cols-4 gap-4 mb-4">
                {avatarChoices.map((choice, idx) => (
                  <button
                    key={idx}
                    className={`flex flex-col items-center gap-2 p-2 rounded-lg border transition ${selectedAvatarIdx === idx
                      ? "border-primary bg-accent/20 scale-105"
                      : "border-muted bg-card hover:scale-105"
                      }`}
                    onClick={() => setSelectedAvatarIdx(idx)}
                    type="button"
                  >
                    <img
                      src={choice.image}
                      alt="avatar"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </button>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <button
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold shadow-lg hover:bg-primary/80 transition"
                  onClick={() => setShowAvatarDialog(false)}
                >
                  Select
                </button>
              </div>
            </DialogContent>
          </Dialog>
          {/* Show user name below avatar */}
          <div className="mt-2 text-center font-bold text-foreground text-lg">
            {userProfile?.name || "Farmer"}
          </div>

          <div className="p-6 w-full">
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${selectedTab === item.id
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-80 flex flex-col">
          {/* Top Navbar */}
          <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-background z-20">
            {/* Logo and App Name at the left */}
            <div className="flex items-center gap-4">
              <img
                src="/farmquest-logo.png"
                alt="FarmQuest Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-bold text-primary" style={{ marginRight: "2rem" }}>
                FarmQuest
              </span>
              {/* Inventory and Shop tabs */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTab("inventory")}
                className={`gap-2 ${selectedTab === "inventory" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"}`}
              >
                <Box className="w-5 h-5" />
                Inventory
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTab("shop")}
                className={`gap-2 ${selectedTab === "shop" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"}`}
              >
                <ShoppingCart className="w-5 h-5" />
                Shop
              </Button>
            </div>
            {/* Right side: Credits, XP, Streak, Settings */}
            <div className="flex items-center gap-6">
              {/* Credits */}
              <div className="flex items-center gap-1">
                <span title="Credits">
                  {/* Coins SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-coins w-6 h-6 text-yellow-600">
                    <circle cx="8" cy="8" r="6"></circle>
                    <path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path>
                    <path d="M7 6h1v4"></path>
                    <path d="m16.71 13.88.7.71-2.82 2.82"></path>
                  </svg>
                </span>
                <span className="font-bold text-primary">{userCredits}</span>
              </div>
              {/* XP */}
              <div className="flex items-center gap-1">
                <span title="XP">
                  {/* Star SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-6 h-6 text-purple-600">
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                </span>
                <span className="font-bold text-secondary">1250</span>
              </div>
              {/* Streak */}
              <div className="flex items-center gap-1">
                <span title="Streak">
                  {/* Clock SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock w-6 h-6 text-accent">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </span>
                <span className="font-bold text-accent">27</span>
              </div>
              {/* Settings Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTab("settings")}
                className={`gap-2 ${selectedTab === "settings" ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"}`}
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </div>
          </div>

          <div className="p-8 flex-1">
            {/* Conditional rendering for different tabs */}
            {selectedTab === "inventory" ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Box className="w-5 h-5 text-primary" />
                    Inventory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground">Your inventory items will appear here.</div>
                </CardContent>
              </Card>
            ) : selectedTab === "shop" ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                    Shop
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground">Shop for new items and upgrades here.</div>
                </CardContent>
              </Card>
            ) : selectedTab === "settings" ? (
              <SettingsSystem
                userProfile={userProfile}
                userCredits={userCredits}
                onCreditsChange={setUserCredits}
                onLogout={handleLogout}
              />
            ) : selectedTab === "learn" ? (
              <LearningSystem userProfile={userProfile} />
            ) : selectedTab === "habits" ? (
              <div>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-foreground mb-2">My Farming Habits 🌱</h1>
                  <p className="text-muted-foreground">Track and manage your sustainable farming practices</p>
                </div>
                <HabitManagement
                  habits={habits}
                  onAddHabit={handleAddHabit}
                  onDeleteHabit={handleDeleteHabit}
                  onToggleHabit={handleToggleHabit}
                />
              </div>
            ) : selectedTab === "quests" ? (
              <QuestsSystem />
            ) : selectedTab === "challenges" ? (
              <ChallengesSystem userCredits={userCredits} userBadges={["Water Warrior", "Soil Guardian"]} />
            ) : selectedTab === "community" ? (
              <CommunitySystem
                userCredits={userCredits}
                userPopularity={userPopularity}
                onCreditsChange={setUserCredits}
                onPopularityChange={setUserPopularity}
              />
            ) : selectedTab === "leaderboard" ? (
              <LeaderboardSystem userProfile={userProfile} />
            ) : selectedTab === "achievements" ? (
              <div>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-foreground mb-2">Achievements & Contributions 🏆</h1>
                  <p className="text-muted-foreground">Track your farming milestones and environmental impact</p>
                </div>

                {/* Recent Achievements */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-primary" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.slice(0, 4).map((achievement, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-3 p-4 rounded-lg border ${achievement.earned
                            ? "bg-secondary/10 border-secondary/20"
                            : "bg-muted/50 border-border opacity-60"
                            }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.earned ? "bg-secondary text-secondary-foreground" : "bg-muted"
                              }`}
                          >
                            <Trophy className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium">{achievement.name}</p>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            {achievement.earned && (
                              <Badge variant="secondary" className="mt-1 text-xs">
                                Earned
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* All Achievements */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-primary" />
                      All Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          name: "Water Warrior",
                          description: "7-day water conservation streak",
                          earned: true,
                          category: "Water",
                        },
                        {
                          name: "Soil Guardian",
                          description: "Complete 10 soil assessments",
                          earned: true,
                          category: "Soil",
                        },
                        {
                          name: "Green Thumb",
                          description: "Maintain 5 sustainable habits",
                          earned: false,
                          category: "Habits",
                        },
                        { name: "Eco Champion", description: "Reach Level 10", earned: false, category: "Level" },
                        {
                          name: "Crop Master",
                          description: "Successfully rotate 3 crop cycles",
                          earned: true,
                          category: "Crops",
                        },
                        {
                          name: "Pest Defender",
                          description: "Use organic pest control for 30 days",
                          earned: false,
                          category: "Protection",
                        },
                        {
                          name: "Community Helper",
                          description: "Help 10 fellow farmers",
                          earned: true,
                          category: "Community",
                        },
                        {
                          name: "Learning Enthusiast",
                          description: "Complete 5 learning modules",
                          earned: false,
                          category: "Education",
                        },
                        {
                          name: "Challenge Champion",
                          description: "Complete 20 daily challenges",
                          earned: false,
                          category: "Challenges",
                        },
                      ].map((achievement, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border text-center ${achievement.earned
                            ? "bg-secondary/10 border-secondary/20"
                            : "bg-muted/50 border-border opacity-60"
                            }`}
                        >
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${achievement.earned ? "bg-secondary text-secondary-foreground" : "bg-muted"
                              }`}
                          >
                            <Trophy className="w-6 h-6" />
                          </div>
                          <h3 className="font-medium mb-1">{achievement.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {achievement.category}
                          </Badge>
                          {achievement.earned && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              ✓ Earned
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Contribution to Nature */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sprout className="w-5 h-5 text-green-600" />
                      Your Contribution to Nature
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-foreground">Environmental Impact</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Droplets className="w-4 h-4 text-blue-600" />
                              <span className="text-sm">Water Saved</span>
                            </div>
                            <span className="font-medium text-blue-600">2,450 L</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Sprout className="w-4 h-4 text-green-600" />
                              <span className="text-sm">CO₂ Reduced</span>
                            </div>
                            <span className="font-medium text-green-600">180 kg</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Sun className="w-4 h-4 text-yellow-600" />
                              <span className="text-sm">Renewable Energy</span>
                            </div>
                            <span className="font-medium text-yellow-600">340 kWh</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-semibold text-foreground">Sustainable Practices</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4 text-green-600" />
                              <span className="text-sm">Organic Methods</span>
                            </div>
                            <span className="font-medium text-green-600">45 days</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Target className="w-4 h-4 text-purple-600" />
                              <span className="text-sm">Habits Maintained</span>
                            </div>
                            <span className="font-medium text-purple-600">12 active</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-blue-600" />
                              <span className="text-sm">Farmers Helped</span>
                            </div>
                            <span className="font-medium text-blue-600">8 people</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border">
                      <div className="text-center">
                        <h4 className="font-semibold text-lg mb-2">🌍 Nature Impact Score</h4>
                        <div className="text-3xl font-bold text-green-600 mb-2">850</div>
                        <p className="text-sm text-muted-foreground">
                          Your sustainable farming practices have made a positive impact equivalent to planting 12 trees!
                        </p>
                        <Badge variant="secondary" className="mt-2">
                          Top 15% of Eco Farmers
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : selectedTab === "calendar" ? (
              <CalendarSystem />
            ) : (
              <>
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground mb-2">
                        {formatGreeting(currentDateTime)}, {getUserFirstName()}! 🌱
                      </h1>
                      <p className="text-muted-foreground">
                        {formatDateTime(currentDateTime)} - Let's grow sustainably today
                      </p>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Zap className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-foreground">{userCredits}</p>
                            <p className="text-sm text-muted-foreground">Farm Credits</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                            <Target className="w-6 h-6 text-secondary" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-foreground">12</p>
                            <p className="text-sm text-muted-foreground">Active Habits</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                            <Clock className="w-6 h-6 text-accent" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-foreground">27</p>
                            <p className="text-sm text-muted-foreground">Day Streak</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center">
                            <Trophy className="w-6 h-6 text-chart-2" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-foreground">8</p>
                            <p className="text-sm text-muted-foreground">Achievements</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Level Progress */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-primary" />
                      Level Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Level 8 - Sustainable Steward</span>
                      <span className="text-sm text-muted-foreground">1,250 / 1,500 XP</span>
                    </div>
                    <Progress value={83} className="h-3" />
                    <p className="text-sm text-muted-foreground mt-2">250 XP until Level 9 - Eco Master</p>
                  </CardContent>
                </Card>

                {/* User Statistics */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      Your Farm Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Experience & Level */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-foreground">Experience & Level</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Current Level</span>
                            <Badge variant="secondary">Level 8</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Total XP</span>
                            <span className="font-medium">1,250 XP</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">XP to Next Level</span>
                            <span className="font-medium text-primary">250 XP</span>
                          </div>
                        </div>
                      </div>

                      {/* Credits & Contributions */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-foreground">Credits & Contributions</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Farm Credits</span>
                            <span className="font-medium text-primary">{userCredits}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Popularity Score</span>
                            <span className="font-medium">{userPopularity}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Community Rank</span>
                            <Badge variant="outline">#42</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Badges & Achievements */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-foreground">Badges & Achievements</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Badges Earned</span>
                            <span className="font-medium">8 / 15</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Achievements</span>
                            <span className="font-medium">12 / 20</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Completion Rate</span>
                            <Badge variant="secondary">60%</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Badges */}
                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="font-medium mb-3">Recent Badges</h4>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline" className="gap-1">
                          <Trophy className="w-3 h-3" />
                          Water Warrior
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          <Sprout className="w-3 h-3" />
                          Soil Guardian
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          <Sun className="w-3 h-3" />
                          Crop Master
                        </Badge>
                        <Badge variant="outline" className="gap-1">
                          <Shield className="w-3 h-3" />
                          Eco Defender
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-primary" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.slice(0, 4).map((achievement, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-3 p-3 rounded-lg border ${achievement.earned
                            ? "bg-secondary/10 border-secondary/20"
                            : "bg-muted/50 border-border opacity-60"
                            }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${achievement.earned ? "bg-secondary text-secondary-foreground" : "bg-muted"
                              }`}
                          >
                            <Trophy className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{achievement.name}</p>
                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer
        className="w-full bg-card border-t border-border py-6"
        style={{ marginLeft: "20rem", paddingLeft: "2rem", paddingRight: "2rem" }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          <div className="flex items-center gap-3 mb-2 md:mb-0">
            <img
              src="/farmquest-logo.png"
              alt="FarmQuest Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} FarmQuest. All rights reserved.
            </span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-primary hover:underline">Privacy Policy</a>
            <a href="#" className="text-sm text-primary hover:underline">Terms of Service</a>
            <a href="#" className="text-sm text-primary hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
