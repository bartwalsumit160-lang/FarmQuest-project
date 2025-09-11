"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Sword,
  Target,
  Clock,
  Star,
  Trophy,
  Zap,
  Users,
  Sprout,
  Droplets,
  Sun,
  Shield,
  MapPin,
  Gift,
} from "lucide-react"

interface Quest {
  id: number
  title: string
  description: string
  type: "main" | "side" | "daily" | "weekly"
  difficulty: "easy" | "medium" | "hard" | "legendary"
  progress: number
  maxProgress: number
  rewards: {
    xp: number
    credits: number
    items?: string[]
  }
  timeLimit?: string
  location?: string
  completed: boolean
  icon: any
}

export function QuestsSystem() {
  const [activeQuests, setActiveQuests] = useState<Quest[]>([
    {
      id: 1,
      title: "The Water Guardian's Trial",
      description: "Master water conservation techniques across 5 different farm zones",
      type: "main",
      difficulty: "hard",
      progress: 3,
      maxProgress: 5,
      rewards: { xp: 500, credits: 200, items: ["Water Master Badge", "Irrigation Blueprint"] },
      location: "Farm Zones 1-5",
      completed: false,
      icon: Droplets,
    },
    {
      id: 2,
      title: "Soil Whisperer Challenge",
      description: "Achieve perfect soil pH balance in 3 crop fields",
      type: "main",
      difficulty: "medium",
      progress: 1,
      maxProgress: 3,
      rewards: { xp: 300, credits: 150, items: ["Soil Sage Title"] },
      location: "Crop Fields A, B, C",
      completed: false,
      icon: Sprout,
    },
    {
      id: 3,
      title: "Daily Harvest Inspection",
      description: "Check crop health and document findings",
      type: "daily",
      difficulty: "easy",
      progress: 0,
      maxProgress: 1,
      rewards: { xp: 50, credits: 25 },
      timeLimit: "Resets in 18h 32m",
      completed: false,
      icon: Sun,
    },
    {
      id: 4,
      title: "Community Helper",
      description: "Assist 3 fellow farmers with their sustainable practices",
      type: "weekly",
      difficulty: "medium",
      progress: 1,
      maxProgress: 3,
      rewards: { xp: 200, credits: 100, items: ["Helper's Crown"] },
      timeLimit: "Resets in 4d 12h",
      completed: false,
      icon: Users,
    },
    {
      id: 5,
      title: "Pest Defense Strategy",
      description: "Implement organic pest control methods for 7 consecutive days",
      type: "side",
      difficulty: "medium",
      progress: 4,
      maxProgress: 7,
      rewards: { xp: 250, credits: 120, items: ["Organic Defender Badge"] },
      completed: false,
      icon: Shield,
    },
  ])

  const [completedQuests, setCompletedQuests] = useState<Quest[]>([
    {
      id: 6,
      title: "First Steps to Sustainability",
      description: "Complete your first sustainable farming practice",
      type: "main",
      difficulty: "easy",
      progress: 1,
      maxProgress: 1,
      rewards: { xp: 100, credits: 50, items: ["Novice Farmer Badge"] },
      completed: true,
      icon: Target,
    },
    {
      id: 7,
      title: "Green Energy Pioneer",
      description: "Install and use renewable energy for 30 days",
      type: "side",
      difficulty: "hard",
      progress: 30,
      maxProgress: 30,
      rewards: { xp: 400, credits: 250, items: ["Solar Champion Title", "Energy Crystal"] },
      completed: true,
      icon: Zap,
    },
  ])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "hard":
        return "bg-red-100 text-red-800 border-red-200"
      case "legendary":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "main":
        return "bg-blue-100 text-blue-800"
      case "side":
        return "bg-green-100 text-green-800"
      case "daily":
        return "bg-orange-100 text-orange-800"
      case "weekly":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCompleteQuest = (questId: number) => {
    const quest = activeQuests.find((q) => q.id === questId)
    if (quest && quest.progress >= quest.maxProgress) {
      setActiveQuests(activeQuests.filter((q) => q.id !== questId))
      setCompletedQuests([...completedQuests, { ...quest, completed: true }])
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Farm Quests ⚔️</h1>
        <p className="text-muted-foreground">Embark on epic farming adventures and earn legendary rewards</p>
      </div>

      {/* Quest Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Sword className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeQuests.length}</p>
                <p className="text-sm text-muted-foreground">Active Quests</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{completedQuests.length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">1,250</p>
                <p className="text-sm text-muted-foreground">Quest XP Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-sm text-muted-foreground">Legendary Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Quests */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sword className="w-5 h-5 text-primary" />
            Active Quests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeQuests.map((quest) => {
              const Icon = quest.icon
              return (
                <div key={quest.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{quest.title}</h3>
                          <Badge className={getDifficultyColor(quest.difficulty)} variant="outline">
                            {quest.difficulty}
                          </Badge>
                          <Badge className={getTypeColor(quest.type)} variant="secondary">
                            {quest.type}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{quest.description}</p>

                        {quest.location && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                            <MapPin className="w-4 h-4" />
                            {quest.location}
                          </div>
                        )}

                        {quest.timeLimit && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                            <Clock className="w-4 h-4" />
                            {quest.timeLimit}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">Progress</div>
                      <div className="text-lg font-bold">
                        {quest.progress}/{quest.maxProgress}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <Progress value={(quest.progress / quest.maxProgress) * 100} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{quest.rewards.xp} XP</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4 text-blue-500" />
                        <span>{quest.rewards.credits} Credits</span>
                      </div>
                      {quest.rewards.items && (
                        <div className="flex items-center gap-1">
                          <Gift className="w-4 h-4 text-purple-500" />
                          <span>{quest.rewards.items.length} Items</span>
                        </div>
                      )}
                    </div>

                    <Button
                      size="sm"
                      disabled={quest.progress < quest.maxProgress}
                      onClick={() => handleCompleteQuest(quest.id)}
                    >
                      {quest.progress >= quest.maxProgress ? "Complete Quest" : "In Progress"}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Completed Quests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-green-600" />
            Completed Quests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completedQuests.map((quest) => {
              const Icon = quest.icon
              return (
                <div key={quest.id} className="border rounded-lg p-6 bg-green-50/50 opacity-75">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{quest.title}</h3>
                          <Badge className="bg-green-100 text-green-800" variant="secondary">
                            Completed ✓
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{quest.description}</p>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{quest.rewards.xp} XP</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Zap className="w-4 h-4 text-blue-500" />
                            <span>{quest.rewards.credits} Credits</span>
                          </div>
                          {quest.rewards.items && (
                            <div className="flex items-center gap-1">
                              <Gift className="w-4 h-4 text-purple-500" />
                              <span>{quest.rewards.items.join(", ")}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
