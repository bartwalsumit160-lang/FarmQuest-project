"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Play,
  CheckCircle2,
  Clock,
  Star,
  Award,
  ChevronRight,
  Video,
  FileText,
  Brain,
  Leaf,
  Droplets,
  Sun,
  Shield,
  Sprout,
} from "lucide-react"

interface LearningSystemProps {
  userProfile?: {
    knowledgeLevel: string
    farmingExperience: string
  }
}

export function LearningSystem({ userProfile }: LearningSystemProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [completedLessons, setCompletedLessons] = useState<string[]>([
    "water-basics-1",
    "soil-intro-1",
    "crop-rotation-1",
  ])
  const [quizResults, setQuizResults] = useState<Record<string, number>>({
    "water-basics-1": 85,
    "soil-intro-1": 92,
    "crop-rotation-1": 78,
  })

  const courses = [
    {
      id: "water-management",
      title: "Water Management & Conservation",
      description: "Learn sustainable water practices for your farm",
      icon: Droplets,
      level: "Beginner",
      lessons: 8,
      duration: "2h 30m",
      progress: 37,
      color: "bg-blue-500",
      lessons_data: [
        {
          id: "water-basics-1",
          title: "Introduction to Water Conservation",
          duration: "15 min",
          type: "video",
          completed: true,
          quiz: true,
        },
        {
          id: "water-basics-2",
          title: "Drip Irrigation Systems",
          duration: "20 min",
          type: "video",
          completed: false,
          quiz: true,
        },
        {
          id: "water-basics-3",
          title: "Rainwater Harvesting",
          duration: "18 min",
          type: "video",
          completed: false,
          quiz: false,
        },
      ],
    },
    {
      id: "soil-health",
      title: "Soil Health & Fertility",
      description: "Master soil management for sustainable farming",
      icon: Sprout,
      level: "Intermediate",
      lessons: 12,
      duration: "4h 15m",
      progress: 25,
      color: "bg-green-500",
      lessons_data: [
        {
          id: "soil-intro-1",
          title: "Understanding Soil Composition",
          duration: "22 min",
          type: "video",
          completed: true,
          quiz: true,
        },
        {
          id: "soil-intro-2",
          title: "pH Testing and Management",
          duration: "25 min",
          type: "video",
          completed: false,
          quiz: true,
        },
        {
          id: "soil-intro-3",
          title: "Organic Matter and Composting",
          duration: "30 min",
          type: "video",
          completed: false,
          quiz: true,
        },
      ],
    },
    {
      id: "crop-rotation",
      title: "Crop Rotation & Planning",
      description: "Optimize your crop cycles for maximum yield",
      icon: Sun,
      level: "Advanced",
      lessons: 10,
      duration: "3h 45m",
      progress: 10,
      color: "bg-yellow-500",
      lessons_data: [
        {
          id: "crop-rotation-1",
          title: "Principles of Crop Rotation",
          duration: "28 min",
          type: "video",
          completed: true,
          quiz: true,
        },
        {
          id: "crop-rotation-2",
          title: "Nitrogen-Fixing Crops",
          duration: "24 min",
          type: "video",
          completed: false,
          quiz: true,
        },
      ],
    },
    {
      id: "pest-management",
      title: "Integrated Pest Management",
      description: "Sustainable approaches to pest control",
      icon: Shield,
      level: "Intermediate",
      lessons: 9,
      duration: "3h 20m",
      progress: 0,
      color: "bg-red-500",
      lessons_data: [
        {
          id: "pest-intro-1",
          title: "IPM Fundamentals",
          duration: "20 min",
          type: "video",
          completed: false,
          quiz: true,
        },
        {
          id: "pest-intro-2",
          title: "Beneficial Insects",
          duration: "25 min",
          type: "video",
          completed: false,
          quiz: false,
        },
      ],
    },
  ]

  const selectedCourseData = courses.find((c) => c.id === selectedCourse)
  const selectedLessonData = selectedCourseData?.lessons_data.find((l) => l.id === selectedLesson)

  const handleLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId])
    }
  }

  const handleQuizComplete = (lessonId: string, score: number) => {
    setQuizResults({ ...quizResults, [lessonId]: score })
    handleLessonComplete(lessonId)
  }

  if (selectedLesson && selectedLessonData) {
    return (
      <div className="space-y-6">
        {/* Lesson Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setSelectedLesson(null)} className="gap-2">
            ← Back to Course
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{selectedLessonData.title}</h2>
            <p className="text-muted-foreground">{selectedCourseData?.title}</p>
          </div>
        </div>

        {/* Video Player */}
        <Card>
          <CardContent className="p-0">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">{selectedLessonData.title}</h3>
                <p className="text-muted-foreground mb-4">Duration: {selectedLessonData.duration}</p>
                <Button className="gap-2">
                  <Play className="w-4 h-4" />
                  {completedLessons.includes(selectedLessonData.id) ? "Rewatch" : "Start Lesson"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lesson Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Lesson Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <h4>Key Learning Points:</h4>
                  <ul>
                    <li>Understanding the importance of water conservation in sustainable farming</li>
                    <li>Identifying water waste sources on your farm</li>
                    <li>Implementing basic water-saving techniques</li>
                    <li>Monitoring and measuring water usage effectively</li>
                  </ul>

                  <h4>Practical Applications:</h4>
                  <p>
                    This lesson covers fundamental water conservation principles that can be immediately applied to your
                    farming operations. You'll learn how to assess your current water usage and identify opportunities
                    for improvement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Lesson Progress</span>
                    <span className="text-sm font-medium">
                      {completedLessons.includes(selectedLessonData.id) ? "100%" : "0%"}
                    </span>
                  </div>
                  <Progress value={completedLessons.includes(selectedLessonData.id) ? 100 : 0} className="h-2" />

                  {selectedLessonData.quiz && (
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Quiz Score</span>
                        {quizResults[selectedLessonData.id] && (
                          <Badge variant="secondary">{quizResults[selectedLessonData.id]}%</Badge>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        className="w-full gap-2 bg-transparent"
                        onClick={() => handleQuizComplete(selectedLessonData.id, 85)}
                      >
                        <Brain className="w-4 h-4" />
                        {quizResults[selectedLessonData.id] ? "Retake Quiz" : "Take Quiz"}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="p-4">
                <Button
                  className="w-full gap-2 mb-3"
                  onClick={() => handleLessonComplete(selectedLessonData.id)}
                  disabled={completedLessons.includes(selectedLessonData.id)}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {completedLessons.includes(selectedLessonData.id) ? "Completed" : "Mark Complete"}
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Add to My Habits
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (selectedCourse && selectedCourseData) {
    return (
      <div className="space-y-6">
        {/* Course Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setSelectedCourse(null)} className="gap-2">
            ← Back to Courses
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-12 h-12 ${selectedCourseData.color} rounded-lg flex items-center justify-center`}>
                <selectedCourseData.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{selectedCourseData.title}</h2>
                <p className="text-muted-foreground">{selectedCourseData.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{selectedCourseData.lessons} lessons</span>
              <span>{selectedCourseData.duration}</span>
              <Badge variant="outline">{selectedCourseData.level}</Badge>
            </div>
          </div>
        </div>

        {/* Course Progress */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Course Progress</span>
              <span className="text-sm text-muted-foreground">{selectedCourseData.progress}% Complete</span>
            </div>
            <Progress value={selectedCourseData.progress} className="h-3" />
          </CardContent>
        </Card>

        {/* Lessons List */}
        <Card>
          <CardHeader>
            <CardTitle>Course Lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedCourseData.lessons_data.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                    completedLessons.includes(lesson.id) ? "bg-secondary/10 border-secondary/20" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedLesson(lesson.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        completedLessons.includes(lesson.id)
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {completedLessons.includes(lesson.id) ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                    </div>
                    <Video className="w-4 h-4 text-muted-foreground" />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-medium">{lesson.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                      {lesson.quiz && (
                        <span className="flex items-center gap-1">
                          <Brain className="w-3 h-3" />
                          Quiz
                        </span>
                      )}
                      {quizResults[lesson.id] && (
                        <Badge variant="secondary" className="text-xs">
                          {quizResults[lesson.id]}%
                        </Badge>
                      )}
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Learning Center</h2>
          <p className="text-muted-foreground">Expand your sustainable farming knowledge</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Award className="w-3 h-3" />
            {completedLessons.length} lessons completed
          </Badge>
        </div>
      </div>

      {/* Learning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xl font-bold">{courses.length}</p>
                <p className="text-sm text-muted-foreground">Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-xl font-bold">{completedLessons.length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-xl font-bold">2.5h</p>
                <p className="text-sm text-muted-foreground">Watch Time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-xl font-bold">85%</p>
                <p className="text-sm text-muted-foreground">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended for You */}
      {userProfile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-primary" />
              Recommended for {userProfile.knowledgeLevel} Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses
                .filter(
                  (course) =>
                    (userProfile.knowledgeLevel === "beginner" && course.level === "Beginner") ||
                    (userProfile.knowledgeLevel === "intermediate" && course.level !== "Advanced") ||
                    userProfile.knowledgeLevel === "advanced",
                )
                .slice(0, 2)
                .map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center gap-4 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setSelectedCourse(course.id)}
                  >
                    <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center`}>
                      <course.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{course.title}</h4>
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {course.level}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{course.lessons} lessons</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Courses */}
      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="group cursor-pointer" onClick={() => setSelectedCourse(course.id)}>
                <Card className="transition-all group-hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center`}>
                        <course.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{course.lessons} lessons</span>
                          <span>{course.duration}</span>
                          <Badge variant="outline" className="text-xs">
                            {course.level}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
