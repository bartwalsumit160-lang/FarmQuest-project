"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AnimatedAvatar } from "./animated-avatar"
import { Users, Gift, Star, Trophy, Coins, Send, UserPlus, Search, MapPin, Calendar, Sprout, Award } from "lucide-react"

interface CommunityMember {
  id: number
  name: string
  level: number
  location: string
  joinedDate: string
  popularity: number
  credits: number
  specialization: string
  avatar: {
    type: string
    skin: string
    hair: string
    clothing: string
    hat: string
    tool: string
  }
  stats: {
    habitsCompleted: number
    challengesWon: number
    giftsGiven: number
    helpfulMessages: number
  }
  badges: string[]
  isOnline: boolean
  isFriend: boolean
}

interface CommunitySytemProps {
  userCredits: number
  userPopularity: number
  onCreditsChange: (newCredits: number) => void
  onPopularityChange: (newPopularity: number) => void
}

export function CommunitySystem({
  userCredits,
  userPopularity,
  onCreditsChange,
  onPopularityChange,
}: CommunitySytemProps) {
  const [selectedMember, setSelectedMember] = useState<CommunityMember | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("friends")
  const [giftAmount, setGiftAmount] = useState("")
  const [message, setMessage] = useState("")

  const [communityMembers, setCommunityMembers] = useState<CommunityMember[]>([
    {
      id: 1,
      name: "Sarah Green",
      level: 12,
      location: "California, USA",
      joinedDate: "2023-01-15",
      popularity: 850,
      credits: 2400,
      specialization: "Organic Farming",
      avatar: {
        type: "female",
        skin: "#F4A460",
        hair: "#8B4513",
        clothing: "#228B22",
        hat: "#D2691E",
        tool: "🌾",
      },
      stats: {
        habitsCompleted: 245,
        challengesWon: 18,
        giftsGiven: 32,
        helpfulMessages: 67,
      },
      badges: ["Water Warrior", "Soil Guardian", "Eco Champion", "Community Helper"],
      isOnline: true,
      isFriend: true,
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      level: 9,
      location: "Texas, USA",
      joinedDate: "2023-03-22",
      popularity: 620,
      credits: 1800,
      specialization: "Sustainable Livestock",
      avatar: {
        type: "male",
        skin: "#DEB887",
        hair: "#2F4F4F",
        clothing: "#4682B4",
        hat: "#8B4513",
        tool: "🐄",
      },
      stats: {
        habitsCompleted: 189,
        challengesWon: 12,
        giftsGiven: 28,
        helpfulMessages: 45,
      },
      badges: ["Animal Whisperer", "Green Thumb", "Mentor"],
      isOnline: false,
      isFriend: true,
    },
    {
      id: 3,
      name: "Emma Watson",
      level: 15,
      location: "Ontario, Canada",
      joinedDate: "2022-11-08",
      popularity: 1200,
      credits: 3500,
      specialization: "Permaculture Design",
      avatar: {
        type: "female",
        skin: "#FDBCB4",
        hair: "#FFD700",
        clothing: "#9370DB",
        hat: "#32CD32",
        tool: "🌿",
      },
      stats: {
        habitsCompleted: 356,
        challengesWon: 25,
        giftsGiven: 48,
        helpfulMessages: 89,
      },
      badges: ["Eco Master", "Design Guru", "Community Leader", "Sustainability Champion"],
      isOnline: true,
      isFriend: false,
    },
    {
      id: 4,
      name: "RoboFarm-3000",
      level: 7,
      location: "Digital Farm",
      joinedDate: "2023-06-10",
      popularity: 420,
      credits: 1200,
      specialization: "Smart Agriculture",
      avatar: {
        type: "robot",
        skin: "#C0C0C0",
        hair: "#FF0000",
        clothing: "#000080",
        hat: "#FFD700",
        tool: "🤖",
      },
      stats: {
        habitsCompleted: 156,
        challengesWon: 8,
        giftsGiven: 15,
        helpfulMessages: 23,
      },
      badges: ["Tech Pioneer", "Data Analyst", "Innovation Award"],
      isOnline: true,
      isFriend: false,
    },
  ])

  const filteredMembers = communityMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "friends" ? member.isFriend : !member.isFriend
    return matchesSearch && matchesTab
  })

  const handleSendGift = (memberId: number, amount: number) => {
    if (amount > userCredits) return

    // Update user credits and popularity
    onCreditsChange(userCredits - amount)
    onPopularityChange(userPopularity + Math.floor(amount / 10))

    // Update member credits
    setCommunityMembers((members) =>
      members.map((member) => (member.id === memberId ? { ...member, credits: member.credits + amount } : member)),
    )

    setGiftAmount("")
  }

  const handleSendMessage = (memberId: number, messageText: string) => {
    // In a real app, this would send the message to the backend
    console.log(`Sending message to ${memberId}: ${messageText}`)
    setMessage("")

    // Increase popularity for helpful messages
    onPopularityChange(userPopularity + 5)
  }

  const handleAddFriend = (memberId: number) => {
    setCommunityMembers((members) =>
      members.map((member) => (member.id === memberId ? { ...member, isFriend: true } : member)),
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Community 👥</h1>
        <p className="text-muted-foreground">Connect with fellow farmers and grow together</p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{userPopularity}</p>
                <p className="text-sm text-muted-foreground">Popularity</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Coins className="w-6 h-6 text-secondary" />
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
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {communityMembers.filter((m) => m.isFriend).length}
                </p>
                <p className="text-sm text-muted-foreground">Friends</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Tabs */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Farmer Community
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant={activeTab === "friends" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("friends")}
              >
                Friends ({communityMembers.filter((m) => m.isFriend).length})
              </Button>
              <Button
                variant={activeTab === "discover" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("discover")}
              >
                Discover ({communityMembers.filter((m) => !m.isFriend).length})
              </Button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search farmers by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="relative overflow-hidden">
                <CardContent className="p-6">
                  {/* Online Status */}
                  {member.isOnline && (
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  )}

                  {/* Avatar and Basic Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <AnimatedAvatar
                      avatar={member.avatar}
                      size="md"
                      showAnimations={member.isOnline}
                      level={member.level}
                    />
                    <div>
                      <h3 className="font-semibold text-foreground">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">Level {member.level}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {member.location}
                      </div>
                    </div>
                  </div>

                  {/* Specialization */}
                  <Badge variant="secondary" className="mb-3">
                    {member.specialization}
                  </Badge>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                    <div className="flex items-center gap-1">
                      <Sprout className="w-3 h-3 text-green-500" />
                      {member.stats.habitsCompleted} habits
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-yellow-500" />
                      {member.stats.challengesWon} wins
                    </div>
                    <div className="flex items-center gap-1">
                      <Gift className="w-3 h-3 text-pink-500" />
                      {member.stats.giftsGiven} gifts
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-blue-500" />
                      {member.popularity} popularity
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {member.badges.slice(0, 2).map((badge, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                    {member.badges.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{member.badges.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => setSelectedMember(member)}
                        >
                          View Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-3">
                            <AnimatedAvatar
                              avatar={member.avatar}
                              size="md"
                              showAnimations={true}
                              level={member.level}
                            />
                            <div>
                              <h2 className="text-xl">{member.name}</h2>
                              <p className="text-sm text-muted-foreground">
                                Level {member.level} • {member.specialization}
                              </p>
                            </div>
                          </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-6">
                          {/* Detailed Stats */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium">Farm Statistics</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span>Habits Completed:</span>
                                  <span>{member.stats.habitsCompleted}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Challenges Won:</span>
                                  <span>{member.stats.challengesWon}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Gifts Given:</span>
                                  <span>{member.stats.giftsGiven}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Helpful Messages:</span>
                                  <span>{member.stats.helpfulMessages}</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <h4 className="font-medium">Profile Info</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  {member.location}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  Joined {new Date(member.joinedDate).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Star className="w-4 h-4" />
                                  {member.popularity} popularity
                                </div>
                                <div className="flex items-center gap-2">
                                  <Coins className="w-4 h-4" />
                                  {member.credits} credits
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* All Badges */}
                          <div>
                            <h4 className="font-medium mb-2">Achievements</h4>
                            <div className="flex flex-wrap gap-2">
                              {member.badges.map((badge, index) => (
                                <Badge key={index} variant="secondary" className="gap-1">
                                  <Award className="w-3 h-3" />
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="space-y-4">
                            {/* Send Gift */}
                            <div className="space-y-2">
                              <h4 className="font-medium">Send Gift</h4>
                              <div className="flex gap-2">
                                <Input
                                  type="number"
                                  placeholder="Credits amount"
                                  value={giftAmount}
                                  onChange={(e) => setGiftAmount(e.target.value)}
                                  max={userCredits}
                                />
                                <Button
                                  onClick={() => handleSendGift(member.id, Number.parseInt(giftAmount))}
                                  disabled={!giftAmount || Number.parseInt(giftAmount) > userCredits}
                                  className="gap-2"
                                >
                                  <Gift className="w-4 h-4" />
                                  Send
                                </Button>
                              </div>
                              <p className="text-xs text-muted-foreground">Sending gifts increases your popularity!</p>
                            </div>

                            {/* Send Message */}
                            <div className="space-y-2">
                              <h4 className="font-medium">Send Message</h4>
                              <div className="space-y-2">
                                <Textarea
                                  placeholder="Write a helpful message..."
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                                  rows={3}
                                />
                                <Button
                                  onClick={() => handleSendMessage(member.id, message)}
                                  disabled={!message.trim()}
                                  className="gap-2"
                                >
                                  <Send className="w-4 h-4" />
                                  Send Message
                                </Button>
                              </div>
                            </div>

                            {/* Add Friend */}
                            {!member.isFriend && (
                              <Button
                                onClick={() => handleAddFriend(member.id)}
                                variant="outline"
                                className="w-full gap-2"
                              >
                                <UserPlus className="w-4 h-4" />
                                Add Friend
                              </Button>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {!member.isFriend && (
                      <Button size="sm" onClick={() => handleAddFriend(member.id)} className="gap-1">
                        <UserPlus className="w-3 h-3" />
                        Add
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchTerm ? "No farmers found matching your search." : "No farmers in this category yet."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
