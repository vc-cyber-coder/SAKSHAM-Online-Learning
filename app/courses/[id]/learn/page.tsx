"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, CheckCircle, ChevronDown, ChevronUp, Clock, Download, List, Play, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { YouTubePlayer } from "@/components/youtube-player"
import { toast } from "@/components/ui/use-toast"

// Mock data for a course curriculum
const courseCurriculum = [
  {
    title: "Introduction to Web Development",
    lessons: [
      { id: 1, title: "Course Overview", duration: "5 min", type: "video", videoId: "pKO9UjSeLew", completed: true },
      {
        id: 2,
        title: "Setting Up Your Development Environment",
        duration: "15 min",
        type: "video",
        videoId: "5oG2Q2GMHA0",
        completed: true,
      },
      {
        id: 3,
        title: "Understanding How the Web Works",
        duration: "20 min",
        type: "video",
        videoId: "hJHvdBlSxug",
        completed: false,
      },
      { id: 4, title: "Introduction Quiz", duration: "10 min", type: "quiz", quizId: "1", completed: false },
    ],
  },
  {
    title: "HTML Fundamentals",
    lessons: [
      {
        id: 5,
        title: "HTML Document Structure",
        duration: "25 min",
        type: "video",
        videoId: "UB1O30fR-EE",
        completed: false,
      },
      {
        id: 6,
        title: "Working with Text Elements",
        duration: "30 min",
        type: "video",
        videoId: "yTHTo28hwTQ",
        completed: false,
      },
      {
        id: 7,
        title: "Creating Lists and Tables",
        duration: "35 min",
        type: "video",
        videoId: "DdYSMumjs8k",
        completed: false,
      },
      {
        id: 8,
        title: "HTML Forms and Input Elements",
        duration: "40 min",
        type: "video",
        videoId: "fNcJuPIZ2WE",
        completed: false,
      },
      { id: 9, title: "HTML Practice Assignment", duration: "60 min", type: "assignment", completed: false },
    ],
  },
  {
    title: "CSS Styling",
    lessons: [
      {
        id: 10,
        title: "Introduction to CSS",
        duration: "20 min",
        type: "video",
        videoId: "1PnVor36_40",
        completed: false,
      },
      {
        id: 11,
        title: "Selectors and Properties",
        duration: "30 min",
        type: "video",
        videoId: "1Rs2ND1ryYc",
        completed: false,
      },
      {
        id: 12,
        title: "Box Model and Layout",
        duration: "35 min",
        type: "video",
        videoId: "rIO5326FgPE",
        completed: false,
      },
      {
        id: 13,
        title: "Flexbox and Grid",
        duration: "45 min",
        type: "video",
        videoId: "JJSoEo8JSnc",
        completed: false,
      },
      {
        id: 14,
        title: "Responsive Design with Media Queries",
        duration: "40 min",
        type: "video",
        videoId: "2KL-z9A56SQ",
        completed: false,
      },
      { id: 15, title: "CSS Challenge", duration: "60 min", type: "assignment", completed: false },
    ],
  },
]

export default function CourseLearnPage({ params }: { params: { id: string } }) {
  const [currentLessonId, setCurrentLessonId] = useState(3)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [lessonProgress, setLessonProgress] = useState<Record<number, boolean>>({})

  // Find the current lesson
  let currentLesson = null
  let currentSectionTitle = ""

  for (const section of courseCurriculum) {
    for (const lesson of section.lessons) {
      if (lesson.id === currentLessonId) {
        currentLesson = lesson
        currentSectionTitle = section.title
        break
      }
    }
    if (currentLesson) break
  }

  // Calculate progress
  const totalLessons = courseCurriculum.reduce((acc, section) => acc + section.lessons.length, 0)
  const completedLessons = courseCurriculum.reduce(
    (acc, section) => acc + section.lessons.filter((lesson) => lesson.completed || lessonProgress[lesson.id]).length,
    0,
  )
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100)

  const handleLessonComplete = async () => {
    // In a real app, this would call an API to update progress
    setLessonProgress((prev) => ({ ...prev, [currentLessonId]: true }))
    toast({
      title: "Lesson completed!",
      description: "Your progress has been saved.",
    })
  }

  const goToNextLesson = () => {
    let foundCurrent = false
    let nextLessonId = null

    // Find the next lesson
    for (const section of courseCurriculum) {
      for (const lesson of section.lessons) {
        if (foundCurrent) {
          nextLessonId = lesson.id
          break
        }
        if (lesson.id === currentLessonId) {
          foundCurrent = true
        }
      }
      if (nextLessonId) break
    }

    if (nextLessonId) {
      setCurrentLessonId(nextLessonId)
    }
  }

  const goToPreviousLesson = () => {
    let previousLessonId = null

    // Find the previous lesson
    for (const section of courseCurriculum) {
      for (const lesson of section.lessons) {
        if (lesson.id === currentLessonId) {
          break
        }
        previousLessonId = lesson.id
      }
      if (previousLessonId) break
    }

    if (previousLessonId) {
      setCurrentLessonId(previousLessonId)
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-14 items-center border-b px-4 lg:h-[60px]">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href={`/courses/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to course</span>
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Web Development Fundamentals</h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>{currentSectionTitle}</span>
            <span className="mx-2">•</span>
            <span>{currentLesson?.title}</span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto mr-2 hidden md:flex"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
          {sidebarOpen ? "Hide" : "Show"} Curriculum
        </Button>
        <Button variant="outline" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-4 w-4" /> : <List className="h-4 w-4" />}
        </Button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="container max-w-6xl py-6">
            {currentLesson?.type === "video" && currentLesson?.videoId ? (
              <YouTubePlayer videoId={currentLesson.videoId} onComplete={handleLessonComplete} />
            ) : currentLesson?.type === "quiz" ? (
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted flex items-center justify-center">
                <Link href={`/quiz/${currentLesson.quizId}`} className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-4"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                  <Button size="lg">Start Quiz</Button>
                </Link>
              </div>
            ) : (
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted flex items-center justify-center">
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mx-auto mb-4"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <h2 className="text-xl font-bold mb-2">Assignment</h2>
                  <Button size="lg">Download Assignment</Button>
                </div>
              </div>
            )}

            <div className="mt-6">
              <Tabs defaultValue="content">
                <TabsList>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                </TabsList>
                <TabsContent value="content" className="mt-4">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">{currentLesson?.title}</h2>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{currentLesson?.duration}</span>
                    </div>
                    <div className="prose max-w-none">
                      <p>
                        In this lesson, we'll explore how the web works at a fundamental level. You'll learn about the
                        client-server model, HTTP requests and responses, and how browsers render web pages.
                      </p>
                      <h3>Key Concepts</h3>
                      <ul>
                        <li>Client-Server Architecture</li>
                        <li>HTTP Protocol</li>
                        <li>DNS Resolution</li>
                        <li>Browser Rendering Process</li>
                      </ul>
                      <p>
                        Understanding these concepts will provide you with a solid foundation for web development,
                        helping you make informed decisions as you build websites and web applications.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="notes" className="mt-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-lg font-medium">Your Notes</h3>
                    <textarea
                      className="min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                      placeholder="Take notes on this lesson..."
                    />
                    <Button className="mt-2">Save Notes</Button>
                  </div>
                </TabsContent>
                <TabsContent value="resources" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Lesson Resources</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center">
                          <BookOpen className="mr-2 h-4 w-4" />
                          <span>Lesson Slides</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center">
                          <BookOpen className="mr-2 h-4 w-4" />
                          <span>Code Examples</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center">
                          <BookOpen className="mr-2 h-4 w-4" />
                          <span>Additional Reading</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="discussion" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Discussion</h3>
                    <div className="rounded-lg border p-4">
                      <textarea
                        className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                        placeholder="Ask a question or share your thoughts..."
                      />
                      <Button className="mt-2">Post</Button>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-muted p-2">
                            <span className="text-xs font-medium">AS</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Anita Singh</span>
                              <span className="text-xs text-muted-foreground">2 days ago</span>
                            </div>
                            <p className="mt-2 text-sm">
                              Can someone explain the difference between HTTP and HTTPS in more detail?
                            </p>
                            <Button variant="ghost" size="sm" className="mt-2">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="flex items-start gap-4">
                          <div className="rounded-full bg-muted p-2">
                            <span className="text-xs font-medium">RK</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Raj Kumar</span>
                              <span className="text-xs text-muted-foreground">1 day ago</span>
                            </div>
                            <p className="mt-2 text-sm">
                              Great explanation of the client-server model! It really helped me understand how websites
                              work.
                            </p>
                            <Button variant="ghost" size="sm" className="mt-2">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <Button variant="outline" onClick={goToPreviousLesson}>
                Previous Lesson
              </Button>
              <Button onClick={goToNextLesson}>Next Lesson</Button>
            </div>
          </div>
        </main>

        {sidebarOpen && (
          <aside className="w-full border-l md:w-[350px]">
            <div className="flex h-full flex-col">
              <div className="border-b p-4">
                <h2 className="font-semibold">Course Content</h2>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <Progress value={progressPercentage} className="h-2 flex-1" />
                  <span className="ml-2">{progressPercentage}% complete</span>
                </div>
              </div>
              <div className="flex-1 overflow-auto p-4">
                <Accordion type="multiple" defaultValue={["section-0"]} className="w-full">
                  {courseCurriculum.map((section, sectionIndex) => (
                    <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex flex-col items-start text-left">
                          <div>{section.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {section.lessons.length} lessons •
                            {section.lessons.reduce((acc, lesson) => {
                              const [mins] = lesson.duration.split(" ")
                              return acc + Number.parseInt(mins)
                            }, 0)}{" "}
                            min
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1">
                          {section.lessons.map((lesson) => (
                            <Button
                              key={lesson.id}
                              variant="ghost"
                              className={`w-full justify-start ${lesson.id === currentLessonId ? "bg-muted" : ""}`}
                              onClick={() => setCurrentLessonId(lesson.id)}
                            >
                              <div className="flex w-full items-center">
                                <div className="mr-2">
                                  {lesson.completed || lessonProgress[lesson.id] ? (
                                    <CheckCircle className="h-4 w-4 text-primary" />
                                  ) : lesson.type === "video" ? (
                                    <Play className="h-4 w-4" />
                                  ) : lesson.type === "quiz" ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="h-4 w-4"
                                    >
                                      <circle cx="12" cy="12" r="10" />
                                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                      <path d="M12 17h.01" />
                                    </svg>
                                  ) : (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="h-4 w-4"
                                    >
                                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                      <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                  )}
                                </div>
                                <div className="flex flex-1 items-center justify-between">
                                  <span className="text-sm">{lesson.title}</span>
                                  <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                                </div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
