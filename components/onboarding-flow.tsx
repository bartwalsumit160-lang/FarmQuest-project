"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ChevronLeft, User, BookOpen, Calendar, Palette, UserCheck } from "lucide-react"
import { AnimatedAvatar } from "./animated-avatar"
import { getAsset } from '@/lib/getAsset';

interface OnboardingFlowProps {
  isOpen: boolean
  onComplete: (userData: UserProfile) => void
}

interface UserProfile {
  name: string
  knowledgeLevel: string
  farmingExperience: string
  age: string
  avatar: {
    type: "male" | "female" | "robot"
    skin: string
    hair: string
    clothing: string
    hat?: string
    tool?: string
  }
  specialization: string
  level: number
  xp: number
  credits: number
  popularity: number
  achievements: string[]
}

export function OnboardingFlow({ isOpen, onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [userData, setUserData] = useState<UserProfile>({
    name: "",
    knowledgeLevel: "",
    farmingExperience: "",
    age: "",
    avatar: {
      type: "male",
      skin: "#FDBCB4",
      hair: "👨‍🦱",
      clothing: "👕",
      hat: "",
      tool: "",
    },
    specialization: "",
    level: 1,
    xp: 100,
    credits: 100,
    popularity: 100,
    achievements: ["Nature Conscious", "Farm Starter", "Green Thumb Beginner"],
  })

  if (!isOpen) return null

  const totalSteps = 6
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      const completeUserData = {
        ...userData,
        level: 1,
        xp: 100,
        credits: 100,
        popularity: 100,
        achievements: ["Nature Conscious", "Farm Starter", "Green Thumb Beginner"],
      }
      onComplete(completeUserData)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkipAvatar = () => {
    const defaultAvatar = {
      type: "male" as const,
      skin: "#FDBCB4",
      hair: "👨‍🦱",
      clothing: "👕",
      hat: "🧢",
      tool: "🌱",
    }
    setUserData((prev) => ({ ...prev, avatar: defaultAvatar }))
    setCurrentStep(6)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return userData.name.trim() !== ""
      case 2:
        return userData.knowledgeLevel !== ""
      case 3:
        return userData.farmingExperience !== ""
      case 4:
        return userData.age !== ""
      case 5:
        return userData.avatar.type !== "" && userData.avatar.skin !== ""
      case 6:
        return userData.specialization !== ""
      default:
        return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <UserCheck className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-900 mb-2">What's your name?</h3>
              <p className="text-green-700">Let's personalize your farming journey</p>
            </div>
            <div className="space-y-4">
              <Label htmlFor="name" className="text-green-800 font-semibold">
                Your Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={userData.name}
                onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                className="border-green-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-900 mb-2">What's your farming knowledge level?</h3>
              <p className="text-green-700">This helps us customize your learning experience</p>
            </div>
            <RadioGroup
              value={userData.knowledgeLevel}
              onValueChange={(value) => setUserData((prev) => ({ ...prev, knowledgeLevel: value }))}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2 p-3 border border-green-200 rounded-lg hover:bg-green-50">
                <RadioGroupItem value="beginner" id="beginner" />
                <Label htmlFor="beginner" className="flex-1 cursor-pointer">
                  <div className="font-medium">Beginner</div>
                  <div className="text-sm text-green-600">Just starting my farming journey</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-green-200 rounded-lg hover:bg-green-50">
                <RadioGroupItem value="intermediate" id="intermediate" />
                <Label htmlFor="intermediate" className="flex-1 cursor-pointer">
                  <div className="font-medium">Intermediate</div>
                  <div className="text-sm text-green-600">Some farming experience and knowledge</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-green-200 rounded-lg hover:bg-green-50">
                <RadioGroupItem value="advanced" id="advanced" />
                <Label htmlFor="advanced" className="flex-1 cursor-pointer">
                  <div className="font-medium">Advanced</div>
                  <div className="text-sm text-green-600">Experienced farmer with deep knowledge</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-900 mb-2">How long have you been farming?</h3>
              <p className="text-green-700">This helps us understand your practical experience</p>
            </div>
            <RadioGroup
              value={userData.farmingExperience}
              onValueChange={(value) => setUserData((prev) => ({ ...prev, farmingExperience: value }))}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2 p-3 border border-green-200 rounded-lg hover:bg-green-50">
                <RadioGroupItem value="new" id="new" />
                <Label htmlFor="new" className="flex-1 cursor-pointer">
                  <div className="font-medium">New to farming</div>
                  <div className="text-sm text-green-600">Less than 1 year</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-green-200 rounded-lg hover:bg-green-50">
                <RadioGroupItem value="1-3years" id="1-3years" />
                <Label htmlFor="1-3years" className="flex-1 cursor-pointer">
                  <div className="font-medium">Getting started</div>
                  <div className="text-sm text-green-600">1-3 years of experience</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-green-200 rounded-lg hover:bg-green-50">
                <RadioGroupItem value="3-10years" id="3-10years" />
                <Label htmlFor="3-10years" className="flex-1 cursor-pointer">
                  <div className="font-medium">Experienced</div>
                  <div className="text-sm text-green-600">3-10 years of experience</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-green-200 rounded-lg hover:bg-green-50">
                <RadioGroupItem value="10+years" id="10+years" />
                <Label htmlFor="10+years" className="flex-1 cursor-pointer">
                  <div className="font-medium">Veteran farmer</div>
                  <div className="text-sm text-green-600">More than 10 years</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-900 mb-2">What's your age range?</h3>
              <p className="text-green-700">This helps us tailor content and challenges</p>
            </div>
            <RadioGroup
              value={userData.age}
              onValueChange={(value) => setUserData((prev) => ({ ...prev, age: value }))}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2 p-3 border border-green-200 rounded-lg hover:bg-green-50">
                <RadioGroupItem value="18-25" id="18-25" />
                <Label htmlFor="18-25" className="flex-1 cursor-pointer">
                  18-25 years old
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-green-200 rounded-lg hover:bg-green-50">
                <RadioGroupItem value="26-35" id="26-35" />
                <Label htmlFor="26-35" className="flex-1 cursor-pointer">
                  26-35 years old
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-green-200 rounded-lg hover:bg-green-50">
                <RadioGroupItem value="36-50" id="36-50" />
                <Label htmlFor="36-50" className="flex-1 cursor-pointer">
                  36-50 years old
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-green-200 rounded-lg hover:bg-green-50">
                <RadioGroupItem value="50+" id="50+" />
                <Label htmlFor="50+" className="flex-1 cursor-pointer">
                  50+ years old
                </Label>
              </div>
            </RadioGroup>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Palette className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-900 mb-2">Customize Your Farming Avatar</h3>
              <p className="text-green-700">Create your unique farming character!</p>
            </div>

            <div className="flex justify-center mb-6">
              <AnimatedAvatar avatar={userData.avatar} size="lg" showAnimations={true} level={1} />
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-green-800 mb-3 block font-semibold">👤 Character Type</Label>
                <div className="flex gap-3 justify-center">
                  {[
                    { type: "male", emoji: "👨", label: "Male" },
                    { type: "female", emoji: "👩", label: "Female" },
                    { type: "robot", emoji: "🤖", label: "Robot" },
                  ].map(({ type, emoji, label }) => (
                    <button
                      key={type}
                      className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                        userData.avatar.type === type
                          ? "border-green-600 bg-green-50 shadow-lg"
                          : "border-gray-300 hover:border-green-400"
                      }`}
                      onClick={() =>
                        setUserData((prev) => ({
                          ...prev,
                          avatar: { ...prev.avatar, type: type as "male" | "female" | "robot" },
                        }))
                      }
                    >
                      <div className="text-2xl mb-1">{emoji}</div>
                      <div className="text-sm font-medium">{label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-green-800 mb-3 block font-semibold">🌾 Skin Tone</Label>
                <div className="flex gap-3 justify-center flex-wrap">
                  {[
                    { color: "#FDBCB4", label: "Light" },
                    { color: "#EEA990", label: "Medium Light" },
                    { color: "#CE967C", label: "Medium" },
                    { color: "#B07948", label: "Medium Dark" },
                    { color: "#8D5524", label: "Dark" },
                    { color: "#708090", label: "Robot Gray" },
                  ].map(({ color, label }) => (
                    <button
                      key={color}
                      className={`w-12 h-12 rounded-full border-3 transition-all hover:scale-110 ${
                        userData.avatar.skin === color
                          ? "border-green-600 ring-2 ring-green-300 shadow-lg"
                          : "border-gray-300 hover:border-green-400"
                      }`}
                      style={{ backgroundColor: color }}
                      title={label}
                      onClick={() => setUserData((prev) => ({ ...prev, avatar: { ...prev.avatar, skin: color } }))}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-green-800 mb-3 block font-semibold">💇 Hair Style</Label>
                <div className="flex gap-3 justify-center flex-wrap">
                  {["👨‍🦱", "👨‍🦰", "👨‍🦳", "👨‍🦲", "👩‍🦱", "👩‍🦰", "👩‍🦳", "👩‍🦲", "bald"].map((hair) => (
                    <button
                      key={hair}
                      className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 flex items-center justify-center ${
                        userData.avatar.hair === hair
                          ? "border-green-600 bg-green-50 shadow-lg"
                          : "border-gray-300 hover:border-green-400"
                      }`}
                      onClick={() => setUserData((prev) => ({ ...prev, avatar: { ...prev.avatar, hair } }))}
                    >
                      <span className="text-lg">{hair === "bald" ? "🥚" : hair}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-green-800 mb-3 block font-semibold">👕 Farming Outfit</Label>
                <div className="flex gap-3 justify-center flex-wrap">
                  {["👕", "👔", "🦺", "👗", "👚", "🥼"].map((clothing) => (
                    <button
                      key={clothing}
                      className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 flex items-center justify-center ${
                        userData.avatar.clothing === clothing
                          ? "border-green-600 bg-green-50 shadow-lg"
                          : "border-gray-300 hover:border-green-400"
                      }`}
                      onClick={() => setUserData((prev) => ({ ...prev, avatar: { ...prev.avatar, clothing } }))}
                    >
                      <span className="text-lg">{clothing}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-green-800 mb-3 block font-semibold">🎩 Hat (Optional)</Label>
                <div className="flex gap-3 justify-center flex-wrap">
                  {["", "🧢", "👒", "🎩", "⛑️", "👑"].map((hat) => (
                    <button
                      key={hat || "none"}
                      className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 flex items-center justify-center ${
                        userData.avatar.hat === hat
                          ? "border-green-600 bg-green-50 shadow-lg"
                          : "border-gray-300 hover:border-green-400"
                      }`}
                      onClick={() => setUserData((prev) => ({ ...prev, avatar: { ...prev.avatar, hat } }))}
                    >
                      <span className="text-lg">{hat || "❌"}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-green-800 mb-3 block font-semibold">🔧 Farming Tool (Optional)</Label>
                <div className="flex gap-3 justify-center flex-wrap">
                  {["", "🌱", "🪓", "🔧", "🚜", "⚒️"].map((tool) => (
                    <button
                      key={tool || "none"}
                      className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 flex items-center justify-center ${
                        userData.avatar.tool === tool
                          ? "border-green-600 bg-green-50 shadow-lg"
                          : "border-gray-300 hover:border-green-400"
                      }`}
                      onClick={() => setUserData((prev) => ({ ...prev, avatar: { ...prev.avatar, tool } }))}
                    >
                      <span className="text-lg">{tool || "❌"}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center pt-4 border-t border-green-200">
                <Button
                  variant="outline"
                  onClick={handleSkipAvatar}
                  className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                >
                  Skip Customization & Use Default Avatar
                </Button>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Palette className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-900 mb-2">Choose Your Farming Specialization</h3>
              <p className="text-green-700">Select your area of expertise to gain special abilities!</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <Label className="text-green-800 mb-3 block font-semibold">🚜 Specialization</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="p-3 bg-white border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors text-left"
                  onClick={() => setUserData((prev) => ({ ...prev, specialization: "Crop Master" }))}
                >
                  <div className="text-2xl mb-1">🌱</div>
                  <div className="font-medium text-green-800">Crop Master</div>
                  <div className="text-xs text-green-600">+10% XP from crop habits</div>
                </button>
                <button
                  className="p-3 bg-white border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors text-left"
                  onClick={() => setUserData((prev) => ({ ...prev, specialization: "Water Guardian" }))}
                >
                  <div className="text-2xl mb-1">💧</div>
                  <div className="font-medium text-green-800">Water Guardian</div>
                  <div className="text-xs text-green-600">+10% XP from water habits</div>
                </button>
                <button
                  className="p-3 bg-white border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors text-left"
                  onClick={() => setUserData((prev) => ({ ...prev, specialization: "Soil Scientist" }))}
                >
                  <div className="text-2xl mb-1">🌍</div>
                  <div className="font-medium text-green-800">Soil Scientist</div>
                  <div className="text-xs text-green-600">+10% XP from soil habits</div>
                </button>
                <button
                  className="p-3 bg-white border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors text-left"
                  onClick={() => setUserData((prev) => ({ ...prev, specialization: "Eco Protector" }))}
                >
                  <div className="text-2xl mb-1">🦋</div>
                  <div className="font-medium text-green-800">Eco Protector</div>
                  <div className="text-xs text-green-600">+10% XP from eco habits</div>
                </button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={getAsset("/farmquest-logo.png")} alt="FarmQuest" className="h-8 w-8" />
            <span className="text-xl font-bold text-green-800">FarmQuest</span>
          </div>
          <CardTitle className="text-2xl text-green-900">Welcome to Your Farm!</CardTitle>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-green-600 mt-2">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </CardHeader>

        <CardContent>
          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {currentStep === totalSteps ? "Complete Setup" : "Next"}
              {currentStep !== totalSteps && <ChevronRight className="h-4 w-4 ml-1" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}