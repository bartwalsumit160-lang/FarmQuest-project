"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CheckCircle2,
  Plus,
  Trash2,
  Droplets,
  Sprout,
  Sun,
  Shield,
  Leaf,
  Tractor,
  Bug,
  Thermometer,
} from "lucide-react"

interface Habit {
  id: number
  name: string
  description: string
  icon: any
  streak: number
  completed: boolean
  xp: number
  category: string
}

interface HabitManagementProps {
  habits: Habit[]
  onAddHabit: (habit: Omit<Habit, "id" | "streak" | "completed">) => void
  onDeleteHabit: (id: number) => void
  onToggleHabit: (id: number) => void
}

const habitIcons = {
  Droplets,
  Sprout,
  Sun,
  Shield,
  Leaf,
  Tractor,
  Bug,
  Thermometer,
}

const habitCategories = [
  "Water Management",
  "Soil Care",
  "Crop Management",
  "Plant Protection",
  "Equipment Maintenance",
  "Pest Control",
  "Climate Monitoring",
  "Organic Practices",
]

export function HabitManagement({ habits, onAddHabit, onDeleteHabit, onToggleHabit }: HabitManagementProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newHabit, setNewHabit] = useState({
    name: "",
    description: "",
    icon: "Sprout",
    xp: 25,
    category: "",
  })

  const handleAddHabit = () => {
    if (newHabit.name && newHabit.description && newHabit.category) {
      onAddHabit({
        ...newHabit,
        icon: habitIcons[newHabit.icon as keyof typeof habitIcons],
      })
      setNewHabit({
        name: "",
        description: "",
        icon: "Sprout",
        xp: 25,
        category: "",
      })
      setIsAddDialogOpen(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            My Farming Habits
          </CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add New Habit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Farming Habit</DialogTitle>
                <DialogDescription>Create a new sustainable farming habit to track your progress.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Habit Name</Label>
                  <Input
                    id="name"
                    value={newHabit.name}
                    onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                    placeholder="e.g., Daily Soil Moisture Check"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newHabit.description}
                    onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                    placeholder="Describe what this habit involves..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newHabit.category}
                    onValueChange={(value) => setNewHabit({ ...newHabit, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {habitCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="icon">Icon</Label>
                  <Select value={newHabit.icon} onValueChange={(value) => setNewHabit({ ...newHabit, icon: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(habitIcons).map((iconName) => {
                        const Icon = habitIcons[iconName as keyof typeof habitIcons]
                        return (
                          <SelectItem key={iconName} value={iconName}>
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              {iconName}
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="xp">XP Reward</Label>
                  <Select
                    value={newHabit.xp.toString()}
                    onValueChange={(value) => setNewHabit({ ...newHabit, xp: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 XP - Easy</SelectItem>
                      <SelectItem value="25">25 XP - Medium</SelectItem>
                      <SelectItem value="35">35 XP - Hard</SelectItem>
                      <SelectItem value="50">50 XP - Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddHabit}>
                  Add Habit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {habits.length === 0 ? (
            <div className="text-center py-8">
              <Sprout className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">No habits yet!</p>
              <p className="text-sm text-muted-foreground">Add your first farming habit to get started.</p>
            </div>
          ) : (
            habits.map((habit) => {
              const Icon = habit.icon
              return (
                <div
                  key={habit.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                    habit.completed ? "bg-secondary/10 border-secondary/20" : "bg-card border-border hover:bg-muted/50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      habit.completed ? "bg-secondary text-secondary-foreground" : "bg-muted"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-medium ${habit.completed ? "line-through text-muted-foreground" : ""}`}>
                        {habit.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {habit.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{habit.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right mr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">🔥 {habit.streak}</span>
                        <span className="text-sm text-muted-foreground">+{habit.xp} XP</span>
                      </div>
                      <Button
                        size="sm"
                        variant={habit.completed ? "secondary" : "default"}
                        className="gap-1"
                        onClick={() => onToggleHabit(habit.id)}
                      >
                        {habit.completed ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Done
                          </>
                        ) : (
                          "Complete"
                        )}
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => onDeleteHabit(habit.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
