"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  User,
  LogOut,
  Globe,
  HelpCircle,
  FileText,
  MessageCircle,
  Star,
  Award,
  Coins,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Settings,
} from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface SettingsSystemProps {
  userProfile?: {
    knowledgeLevel: string
    farmingExperience: string
    age: string
    avatar: {
      skin: string
      hair: string
      clothing: string
    }
  }
  userCredits: number
  onCreditsChange: (credits: number) => void
  onLogout?: () => void
}

export function SettingsSystem({ userProfile, userCredits, onCreditsChange, onLogout }: SettingsSystemProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@farmquest.com",
    phone: "+1 (555) 123-4567",
    location: "California, USA",
    farmSize: "50 acres",
    farmType: "Organic Vegetables",
    yearsExperience: userProfile?.farmingExperience || "5-10 years",
    specialization: "Sustainable Agriculture",
    bio: "Passionate about sustainable farming practices and helping fellow farmers grow better crops.",
    website: "www.johndoefarm.com",
    completedFields: 8,
  })

  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hello! How can I help you with your farming questions today?", sender: "bot" },
  ])
  const [newMessage, setNewMessage] = useState("")

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
  ]

  const faqs = [
    {
      question: "How do I earn more Farm Credits?",
      answer:
        "You can earn Farm Credits by completing daily habits, finishing challenges, helping community members, and maintaining streaks. Each completed habit gives you XP and credits based on difficulty.",
    },
    {
      question: "What are the different farming levels?",
      answer:
        "FarmQuest has 20 levels: Seedling (1-2), Sprout (3-4), Sapling (5-6), Young Plant (7-8), Mature Plant (9-10), Expert Grower (11-12), Master Farmer (13-14), Sustainable Steward (15-16), Eco Champion (17-18), and Green Guardian (19-20).",
    },
    {
      question: "How do challenges work?",
      answer:
        "Daily challenges refresh every 24 hours and weekly challenges refresh every Monday. Complete them to earn credits, XP, and exclusive badges. Some challenges require specific farming activities or community participation.",
    },
    {
      question: "Can I customize my avatar?",
      answer:
        "Yes! You can customize your avatar's appearance, clothing, farming tools, and accessories. Unlock new items by reaching higher levels and completing special achievements.",
    },
    {
      question: "How do I connect with other farmers?",
      answer:
        "Use the Community tab to find nearby farmers, join farming groups, send gifts, and share experiences. Building connections increases your popularity and unlocks collaborative challenges.",
    },
  ]

  const settingsMenuItems = [
    {
      id: "profile",
      title: "Profile",
      description: "Manage your personal information and farming details",
      icon: User,
    },
    {
      id: "accounts",
      title: "Accounts",
      description: "Language preferences and account settings",
      icon: Settings,
    },
    {
      id: "language",
      title: "Language",
      description: "Change your preferred language",
      icon: Globe,
    },
    {
      id: "help",
      title: "Help",
      description: "Get support through FAQs, docs, and chat",
      icon: HelpCircle,
    },
  ]

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
    // Award credits for completing profile fields
    if (value && !profileData[field as keyof typeof profileData]) {
      onCreditsChange(userCredits + 10)
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    setChatMessages((prev) => [...prev, { id: Date.now(), text: newMessage, sender: "user" }])

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me help you with that farming technique.",
        "Based on your farming experience, I'd recommend checking our Learning section for detailed guides.",
        "You can find more information about this in our Documentation section.",
        "Have you tried the sustainable farming practices in your Habits section?",
        "For specific farming issues, I recommend connecting with experienced farmers in the Community tab.",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setChatMessages((prev) => [...prev, { id: Date.now() + 1, text: randomResponse, sender: "bot" }])
    }, 1000)

    setNewMessage("")
  }

  const profileCompletionPercentage = Math.round((profileData.completedFields / 10) * 100)

  const renderSettingsMenu = () => (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your profile, preferences, and get help</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {settingsMenuItems.map((item) => {
              const IconComponent = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={() => setActiveSection(null)}>
          <ArrowLeft className="w-4 h-4" />
          <span className="ml-2">Back to Settings</span>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your personal information and farming details</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Profile Details
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${profileCompletionPercentage}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground">{profileCompletionPercentage}% complete</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={profileData.fullName}
                onChange={(e) => handleProfileUpdate("fullName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => handleProfileUpdate("email", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => handleProfileUpdate("phone", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profileData.location}
                onChange={(e) => handleProfileUpdate("location", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="farmSize">Farm Size</Label>
              <Input
                id="farmSize"
                value={profileData.farmSize}
                onChange={(e) => handleProfileUpdate("farmSize", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="farmType">Farm Type</Label>
              <Input
                id="farmType"
                value={profileData.farmType}
                onChange={(e) => handleProfileUpdate("farmType", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => handleProfileUpdate("bio", e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex items-center gap-2 p-3 bg-secondary/10 rounded-lg">
            <Coins className="w-4 h-4 text-primary" />
            <span className="text-sm">Complete your profile to earn +10 credits per field!</span>
          </div>

          <Button className="w-full gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Save Profile Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderAccountsSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={() => setActiveSection(null)}>
          <ArrowLeft className="w-4 h-4" />
          <span className="ml-2">Back to Settings</span>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and security</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Account Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-medium">Account Actions</h3>
            <Button variant="destructive" className="w-full gap-2" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
              Log Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderLanguageSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={() => setActiveSection(null)}>
          <ArrowLeft className="w-4 h-4" />
          <span className="ml-2">Back to Settings</span>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Language Settings</h1>
          <p className="text-muted-foreground">Choose your preferred language</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Language Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="language">Select Language</Label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full">Save Language Preference</Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderHelpSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={() => setActiveSection(null)}>
          <ArrowLeft className="w-4 h-4" />
          <span className="ml-2">Back to Settings</span>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Help Center</h1>
          <p className="text-muted-foreground">Get support and find answers to your questions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            Support Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="faq" className="gap-2">
                <HelpCircle className="w-4 h-4" />
                FAQs
              </TabsTrigger>
              <TabsTrigger value="docs" className="gap-2">
                <FileText className="w-4 h-4" />
                Documentation
              </TabsTrigger>
              <TabsTrigger value="chat" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Chat Support
              </TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="mt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="docs" className="mt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-medium">Getting Started Guide</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn the basics of FarmQuest and start your sustainable farming journey.
                    </p>
                    <Button variant="outline" size="sm">
                      View Guide
                    </Button>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <Award className="w-4 h-4 text-secondary" />
                      </div>
                      <h3 className="font-medium">Farming Best Practices</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Comprehensive guide to sustainable farming techniques and methods.
                    </p>
                    <Button variant="outline" size="sm">
                      View Guide
                    </Button>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Star className="w-4 h-4 text-accent" />
                      </div>
                      <h3 className="font-medium">Achievement System</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Understand how to earn XP, credits, and unlock achievements.
                    </p>
                    <Button variant="outline" size="sm">
                      View Guide
                    </Button>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-chart-2/10 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-chart-2" />
                      </div>
                      <h3 className="font-medium">Community Guidelines</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn how to interact with other farmers and build your network.
                    </p>
                    <Button variant="outline" size="sm">
                      View Guide
                    </Button>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="chat" className="mt-6">
              <div className="border rounded-lg">
                <div className="h-64 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                          }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask me anything about farming..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>Send</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )

  if (activeSection === "profile") {
    return renderProfileSettings()
  }

  if (activeSection === "accounts") {
    return renderAccountsSettings()
  }

  if (activeSection === "language") {
    return renderLanguageSettings()
  }

  if (activeSection === "help") {
    return renderHelpSettings()
  }

  return renderSettingsMenu()
}