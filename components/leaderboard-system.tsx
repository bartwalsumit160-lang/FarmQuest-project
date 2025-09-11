"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AnimatedAvatar } from "./animated-avatar"
import { Trophy, Medal, Crown, TrendingUp, Users, Globe, Calendar, Clock, Target } from "lucide-react"

interface LeaderboardSystemProps {
  userProfile?: {
    name: string
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

export function LeaderboardSystem({ userProfile }: LeaderboardSystemProps) {
  const [selectedCategory, setSelectedCategory] = useState("global")

  const categories = [
    { id: "global", label: "Global", icon: Globe },
    { id: "local", label: "Local", icon: Users },
    { id: "weekly", label: "Weekly", icon: Calendar },
    { id: "monthly", label: "Monthly", icon: Clock },
  ]

  // Mock leaderboard data
  const getLeaderboardData = (category: string) => {
    const baseUsers = [
      {
        id: 1,
        name: "Sarah Chen",
        level: 12,
        xp: 2450,
        credits: 1850,
        avatar: { skin: "light", hair: "brown", clothing: "green" },
        location: "California, USA",
        specialization: "Organic Farming",
        achievements: 18,
        streak: 45,
      },
      {
        id: 2,
        name: "Miguel Rodriguez",
        level: 11,
        xp: 2280,
        credits: 1720,
        avatar: { skin: "medium", hair: "black", clothing: "blue" },
        location: "Texas, USA",
        specialization: "Sustainable Agriculture",
        achievements: 16,
        streak: 38,
      },
      {
        id: 3,
        name: "Emma Thompson",
        level: 10,
        xp: 2150,
        credits: 1650,
        avatar: { skin: "light", hair: "blonde", clothing: "purple" },
        location: "Ontario, Canada",
        specialization: "Permaculture",
        achievements: 15,
        streak: 42,
      },
      {
        id: 4,
        name: userProfile?.name || "You",
        level: 8,
        xp: 1250,
        credits: 1250,
        avatar: userProfile?.avatar || { skin: "medium", hair: "brown", clothing: "green" },
        location: "Your Location",
        specialization: userProfile?.knowledgeLevel || "Beginner",
        achievements: 8,
        streak: 27,
        isCurrentUser: true,
      },
      {
        id: 5,
        name: "Raj Patel",
        level: 9,
        xp: 1850,
        credits: 1420,
        avatar: { skin: "dark", hair: "black", clothing: "orange" },
        location: "Gujarat, India",
        specialization: "Water Conservation",
        achievements: 12,
        streak: 33,
      },
      {
        id: 6,
        name: "Lisa Johnson",
        level: 8,
        xp: 1680,
        credits: 1380,
        avatar: { skin: "light", hair: "red", clothing: "pink" },
        location: "Queensland, Australia",
        specialization: "Crop Rotation",
        achievements: 11,
        streak: 29,
      },
      {
        id: 7,
        name: "Carlos Silva",
        level: 7,
        xp: 1420,
        credits: 1180,
        avatar: { skin: "medium", hair: "brown", clothing: "yellow" },
        location: "São Paulo, Brazil",
        specialization: "Soil Health",
        achievements: 9,
        streak: 24,
      },
      {
        id: 8,
        name: "Aisha Hassan",
        level: 9,
        xp: 1750,
        credits: 1350,
        avatar: { skin: "dark", hair: "black", clothing: "teal" },
        location: "Lagos, Nigeria",
        specialization: "Pest Management",
        achievements: 13,
        streak: 31,
      },
    ]

    // Sort based on category
    let sortedUsers = [...baseUsers]
    if (category === "weekly" || category === "monthly") {
      // For time-based rankings, mix up the order slightly
      sortedUsers = sortedUsers.sort((a, b) => b.streak - a.streak)
    } else {
      sortedUsers = sortedUsers.sort((a, b) => b.xp - a.xp)
    }

    return sortedUsers
  }

  const leaderboardData = getLeaderboardData(selectedCategory)
  const currentUserRank = leaderboardData.findIndex((user) => user.isCurrentUser) + 1

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">#{rank}</span>
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-500 text-white"
      case 2:
        return "bg-gray-400 text-white"
      case 3:
        return "bg-amber-600 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Leaderboard 🏆</h1>
        <p className="text-muted-foreground">See how you rank among fellow sustainable farmers</p>
      </div>

      {/* Category Selection */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Ranking Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2 h-auto p-4"
                >
                  <Icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">{category.label}</div>
                    <div className="text-xs opacity-70">
                      {category.id === "global" && "Worldwide"}
                      {category.id === "local" && "Your Region"}
                      {category.id === "weekly" && "This Week"}
                      {category.id === "monthly" && "This Month"}
                    </div>
                  </div>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Your Current Rank */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Your Current Rank
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadgeColor(currentUserRank)}`}
            >
              {getRankIcon(currentUserRank)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-lg">#{currentUserRank}</span>
                <Badge variant="secondary">
                  {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Ranking
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {currentUserRank <= 3
                  ? "Excellent work! You're in the top 3!"
                  : currentUserRank <= 10
                    ? "Great job! You're in the top 10!"
                    : "Keep farming sustainably to climb the ranks!"}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">1,250</div>
              <div className="text-sm text-muted-foreground">XP Points</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboardData.map((user, index) => {
              const rank = index + 1
              return (
                <div
                  key={user.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                    user.isCurrentUser
                      ? "bg-primary/5 border-primary/20"
                      : rank <= 3
                        ? "bg-secondary/5 border-secondary/20"
                        : "bg-muted/30 border-border"
                  }`}
                >
                  {/* Rank */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadgeColor(rank)}`}>
                    {getRankIcon(rank)}
                  </div>

                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {user.isCurrentUser && userProfile ? (
                      <AnimatedAvatar avatar={user.avatar} size="sm" showAnimations={false} level={user.level} />
                    ) : (
                      <Avatar>
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium truncate">
                        {user.name}
                        {user.isCurrentUser && <span className="text-primary ml-1">(You)</span>}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        Level {user.level}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {user.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        {user.specialization}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-primary">{user.xp.toLocaleString()}</div>
                      <div className="text-muted-foreground">XP</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-secondary">{user.credits.toLocaleString()}</div>
                      <div className="text-muted-foreground">Credits</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-accent">{user.achievements}</div>
                      <div className="text-muted-foreground">Badges</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-chart-2">{user.streak}</div>
                      <div className="text-muted-foreground">Streak</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Load More */}
          <div className="mt-6 text-center">
            <Button variant="outline">Load More Farmers</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
