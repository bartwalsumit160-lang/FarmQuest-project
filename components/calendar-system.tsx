"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Calendar,
  Clock,
  Plus,
  Bell,
  Trash2,
  MapPin,
  Users,
  Sprout,
  Droplets,
  Sun,
  Shield,
  Tractor,
  Wheat,
} from "lucide-react"

interface CalendarEvent {
  id: number
  title: string
  description: string
  date: string
  time: string
  type: "task" | "event"
  category: string
  icon: any
  reminder?: {
    enabled: boolean
    timing: "same-day" | "day-before"
    time: string
  }
  location?: string
  attendees?: string[]
}

export function CalendarSystem() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: "Soil pH Testing",
      description: "Test soil acidity levels in the north field",
      date: "2024-03-15",
      time: "09:00",
      type: "task",
      category: "Soil Care",
      icon: Sprout,
      reminder: { enabled: true, timing: "same-day", time: "08:00" },
      location: "North Field",
    },
    {
      id: 2,
      title: "Irrigation System Check",
      description: "Weekly maintenance of drip irrigation",
      date: "2024-03-16",
      time: "14:00",
      type: "task",
      category: "Water Management",
      icon: Droplets,
      reminder: { enabled: true, timing: "day-before", time: "18:00" },
    },
    {
      id: 3,
      title: "Farmers Market",
      description: "Weekly produce sale at downtown market",
      date: "2024-03-17",
      time: "06:00",
      type: "event",
      category: "Marketing",
      icon: Users,
      reminder: { enabled: true, timing: "day-before", time: "20:00" },
      location: "Downtown Market Square",
      attendees: ["Sarah", "Mike", "Local Customers"],
    },
    {
      id: 4,
      title: "Crop Rotation Planning",
      description: "Plan next season's crop rotation schedule",
      date: "2024-03-20",
      time: "10:00",
      type: "task",
      category: "Crop Management",
      icon: Sun,
      reminder: { enabled: false, timing: "same-day", time: "09:00" },
    },
  ])

  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: "",
    description: "",
    date: selectedDate,
    time: "09:00",
    type: "task",
    category: "General",
    icon: Calendar,
    reminder: { enabled: false, timing: "same-day", time: "09:00" },
  })

  const categoryIcons = {
    "Soil Care": Sprout,
    "Water Management": Droplets,
    "Crop Management": Sun,
    "Plant Protection": Shield,
    Equipment: Tractor,
    Harvest: Wheat,
    Marketing: Users,
    General: Calendar,
  }

  const getTimeRemaining = (date: string, time: string) => {
    const eventDateTime = new Date(`${date}T${time}`)
    const now = new Date()
    const diff = eventDateTime.getTime() - now.getTime()

    if (diff < 0) return "Past due"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}d ${hours}h remaining`
    if (hours > 0) return `${hours}h ${minutes}m remaining`
    return `${minutes}m remaining`
  }

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) return

    const event: CalendarEvent = {
      id: Math.max(...events.map((e) => e.id), 0) + 1,
      title: newEvent.title!,
      description: newEvent.description || "",
      date: newEvent.date!,
      time: newEvent.time!,
      type: newEvent.type as "task" | "event",
      category: newEvent.category!,
      icon: categoryIcons[newEvent.category as keyof typeof categoryIcons] || Calendar,
      reminder: newEvent.reminder,
      location: newEvent.location,
      attendees: newEvent.attendees,
    }

    setEvents([...events, event])
    setNewEvent({
      title: "",
      description: "",
      date: selectedDate,
      time: "09:00",
      type: "task",
      category: "General",
      icon: Calendar,
      reminder: { enabled: false, timing: "same-day", time: "09:00" },
    })
    setShowAddEvent(false)
  }

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  const upcomingEvents = events
    .filter((event) => new Date(`${event.date}T${event.time}`) >= new Date())
    .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime())
    .slice(0, 5)

  const todayEvents = events.filter((event) => event.date === new Date().toISOString().split("T")[0])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Farm Calendar 📅</h1>
          <p className="text-muted-foreground">Manage your farming tasks and events</p>
        </div>
        <Dialog open={showAddEvent} onOpenChange={setShowAddEvent}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Event title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Event description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Type</Label>
                  <Select
                    value={newEvent.type}
                    onValueChange={(value) => setNewEvent({ ...newEvent, type: value as "task" | "event" })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="task">Task</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select
                    value={newEvent.category}
                    onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(categoryIcons).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location (Optional)</Label>
                <Input
                  id="location"
                  value={newEvent.location || ""}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder="Event location"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="reminder"
                    checked={newEvent.reminder?.enabled}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        reminder: { ...newEvent.reminder!, enabled: e.target.checked },
                      })
                    }
                  />
                  <Label htmlFor="reminder">Set Reminder</Label>
                </div>
                {newEvent.reminder?.enabled && (
                  <div className="grid grid-cols-2 gap-4 ml-6">
                    <div>
                      <Label>When</Label>
                      <Select
                        value={newEvent.reminder.timing}
                        onValueChange={(value) =>
                          setNewEvent({
                            ...newEvent,
                            reminder: { ...newEvent.reminder!, timing: value as "same-day" | "day-before" },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="same-day">Same Day</SelectItem>
                          <SelectItem value="day-before">Day Before</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Time</Label>
                      <Input
                        type="time"
                        value={newEvent.reminder.time}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            reminder: { ...newEvent.reminder!, time: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
              <Button onClick={handleAddEvent} className="w-full">
                Add Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todayEvents.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No events scheduled for today</p>
            ) : (
              <div className="space-y-3">
                {todayEvents.map((event) => {
                  const Icon = event.icon
                  return (
                    <div key={event.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.time}</p>
                      </div>
                      <Badge variant={event.type === "task" ? "default" : "secondary"} className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => {
                const Icon = event.icon
                const timeRemaining = getTimeRemaining(event.date, event.time)
                return (
                  <div key={event.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{event.title}</h3>
                        <Badge variant={event.type === "task" ? "default" : "secondary"} className="text-xs">
                          {event.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {event.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                        <span>🕐 {event.time}</span>
                        {event.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </span>
                        )}
                        {event.reminder?.enabled && (
                          <span className="flex items-center gap-1">
                            <Bell className="w-3 h-3" />
                            Reminder set
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary mb-2">{timeRemaining}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Calendar View
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }, (_, i) => {
              const date = new Date()
              date.setDate(date.getDate() - date.getDay() + i)
              const dateString = date.toISOString().split("T")[0]
              const dayEvents = events.filter((event) => event.date === dateString)
              const isToday = dateString === new Date().toISOString().split("T")[0]
              const isSelected = dateString === selectedDate

              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(dateString)}
                  className={`p-2 text-sm rounded-lg border transition-colors ${
                    isToday
                      ? "bg-primary text-primary-foreground border-primary"
                      : isSelected
                        ? "bg-secondary text-secondary-foreground border-secondary"
                        : "hover:bg-muted border-transparent"
                  }`}
                >
                  <div className="font-medium">{date.getDate()}</div>
                  {dayEvents.length > 0 && (
                    <div className="flex justify-center mt-1">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
