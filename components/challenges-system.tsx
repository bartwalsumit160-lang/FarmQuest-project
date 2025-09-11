"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Calendar,
  Clock,
  Zap,
  CheckCircle2,
  Gift,
  Award,
  Target,
  Droplets,
  Sprout,
  Sun,
  Shield,
  Coins,
} from "lucide-react"

interface Challenge {
  id: number
  title: string
  description: string
  type: "daily" | "weekly"
  difficulty: "easy" | "medium" | "hard"
  icon: any
  progress: number
  maxProgress: number
  credits: number
  xp: number
  badge?: string
  completed: boolean
  timeLeft: string
}

interface ChallengesSystemProps {
  userCredits?: number
  userBadges?: string[]
}

export function ChallengesSystem({ userCredits = 150, userBadges = [] }: ChallengesSystemProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([
    // Daily Challenges
    {
      id: 1,
      title: "Water Wise Wednesday",
      description: "Check irrigation efficiency in 3 different areas",
      type: "daily",
      difficulty: "easy",
      icon: Droplets,
      progress: 2,
      maxProgress: 3,
      credits: 25,
      xp: 50,
      completed: false,
      timeLeft: "6h 23m",
    },
    {
      id: 2,
      title: "Soil Health Check",
      description: "Test soil pH and moisture levels",
      type: "daily",
      difficulty: "medium",
      icon: Sprout,
      progress: 0,
      maxProgress: 1,
      credits: 35,
      xp: 75,
      badge: "Soil Guardian",
      completed: false,
      timeLeft: "6h 23m",
    },
    {
      id: 3,
      title: "Sustainable Pest Control",
      description: "Apply organic pest management techniques",
      type: "daily",
      difficulty: "hard",
      icon: Shield,
      progress: 1,
      maxProgress: 1,
      credits: 50,
      xp: 100,
      badge: "Eco Defender",
      completed: true,
      timeLeft: "Completed",
    },
    // Weekly Challenges
    {
      id: 4,
      title: "Crop Rotation Master",
      description: "Plan and implement crop rotation for 5 plots",
      type: "weekly",
      difficulty: "medium",
      icon: Sun,
      progress: 3,
      maxProgress: 5,
      credits: 100,
      xp: 200,
      badge: "Rotation Expert",
      completed: false,
      timeLeft: "3d 12h",
    },
    {
      id: 5,
      title: "Community Helper",
      description: "Help 10 fellow farmers with sustainable practices",
      type: "weekly",
      difficulty: "hard",
      icon: Target,
      progress: 7,
      maxProgress: 10,
      credits: 150,
      xp: 300,
      badge: "Community Champion",
      completed: false,
      timeLeft: "3d 12h",
    },
  ])

  const [earnedBadges, setEarnedBadges] = useState<string[]>([
    "Soil Guardian",
    "Water Warrior",
    "Eco Defender",
    ...userBadges,
  ])

  const [credits, setCredits] = useState(userCredits)

  const handleCompleteChallenge = (challengeId: number) => {
    setChallenges((prev) =>
      prev.map((challenge) => {
        if (challenge.id === challengeId && !challenge.completed) {
          // Award credits and badge
          setCredits((prevCredits) => prevCredits + challenge.credits)
          if (challenge.badge && !earnedBadges.includes(challenge.badge)) {
            setEarnedBadges((prev) => [...prev, challenge.badge!])
          }

          return {
            ...challenge,
            completed: true,
            progress: challenge.maxProgress,
            timeLeft: "Completed",
          }
        }
        return challenge
      }),
    )
  }

  const dailyChallenges = challenges.filter((c) => c.type === "daily")
  const weeklyChallenges = challenges.filter((c) => c.type === "weekly")

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "hard":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Farm Challenges 🏆</h1>
        <p className="text-muted-foreground">Complete challenges to earn credits and unlock exclusive badges</p>
      </div>

      {/* Credits and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Coins className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{credits}</p>
                <p className="text-sm text-muted-foreground">Farm Credits</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{earnedBadges.length}</p>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{challenges.filter((c) => c.completed).length}</p>
                <p className="text-sm text-muted-foreground">Completed Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Challenges */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Daily Challenges
            </CardTitle>
            <Badge variant="outline" className="gap-1">
              <Clock className="w-3 h-3" />
              Resets in 6h 23m
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dailyChallenges.map((challenge) => {
              const Icon = challenge.icon
              return (
                <div
                  key={challenge.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    challenge.completed ? "bg-green-50 border-green-200" : "bg-card border-border hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        challenge.completed ? "bg-green-500 text-white" : "bg-muted"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{challenge.title}</h3>
                        <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                        {challenge.badge && (
                          <Badge variant="secondary" className="gap-1">
                            <Award className="w-3 h-3" />
                            {challenge.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>
                              {challenge.progress}/{challenge.maxProgress}
                            </span>
                          </div>
                          <Progress value={(challenge.progress / challenge.maxProgress) * 100} className="h-2" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Coins className="w-4 h-4 text-yellow-600" />
                            {challenge.credits} credits
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="w-4 h-4 text-blue-600" />
                            {challenge.xp} XP
                          </span>
                          <span className="text-muted-foreground">{challenge.timeLeft}</span>
                        </div>

                        <Button
                          size="sm"
                          variant={challenge.completed ? "secondary" : "default"}
                          disabled={challenge.completed || challenge.progress < challenge.maxProgress}
                          onClick={() => handleCompleteChallenge(challenge.id)}
                          className="gap-1"
                        >
                          {challenge.completed ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              Completed
                            </>
                          ) : challenge.progress >= challenge.maxProgress ? (
                            <>
                              <Gift className="w-4 h-4" />
                              Claim Reward
                            </>
                          ) : (
                            "In Progress"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Challenges */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Weekly Challenges
            </CardTitle>
            <Badge variant="outline" className="gap-1">
              <Clock className="w-3 h-3" />
              Resets in 3d 12h
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyChallenges.map((challenge) => {
              const Icon = challenge.icon
              return (
                <div
                  key={challenge.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    challenge.completed ? "bg-green-50 border-green-200" : "bg-card border-border hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        challenge.completed ? "bg-green-500 text-white" : "bg-muted"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{challenge.title}</h3>
                        <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                        {challenge.badge && (
                          <Badge variant="secondary" className="gap-1">
                            <Award className="w-3 h-3" />
                            {challenge.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>
                              {challenge.progress}/{challenge.maxProgress}
                            </span>
                          </div>
                          <Progress value={(challenge.progress / challenge.maxProgress) * 100} className="h-2" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Coins className="w-4 h-4 text-yellow-600" />
                            {challenge.credits} credits
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="w-4 h-4 text-blue-600" />
                            {challenge.xp} XP
                          </span>
                          <span className="text-muted-foreground">{challenge.timeLeft}</span>
                        </div>

                        <Button
                          size="sm"
                          variant={challenge.completed ? "secondary" : "default"}
                          disabled={challenge.completed || challenge.progress < challenge.maxProgress}
                          onClick={() => handleCompleteChallenge(challenge.id)}
                          className="gap-1"
                        >
                          {challenge.completed ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              Completed
                            </>
                          ) : challenge.progress >= challenge.maxProgress ? (
                            <>
                              <Gift className="w-4 h-4" />
                              Claim Reward
                            </>
                          ) : (
                            "In Progress"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Earned Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Your Badge Collection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {earnedBadges.map((badge, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-lg border bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200"
              >
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-2">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-center">{badge}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
