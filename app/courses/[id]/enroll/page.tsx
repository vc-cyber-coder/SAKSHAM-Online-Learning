"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, Clock, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckoutForm } from "@/components/checkout-form"

// Mock function to fetch course data
const fetchCourse = async (id: string) => {
  // In a real app, this would fetch from your API
  return {
    id,
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript to build modern websites from scratch.",
    category: "Web Development",
    price: 1999,
    rating: 4.8,
    reviews: 245,
    students: 1245,
    duration: "10 hours",
    lastUpdated: "March 2023",
    instructor: {
      name: "Rahul Sharma",
      bio: "Senior Web Developer with 10+ years of experience.",
    },
    image: "/placeholder.svg?height=200&width=300",
  }
}

export default function EnrollPage({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const courseData = await fetchCourse(params.id)
        setCourse(courseData)
      } catch (error) {
        console.error("Error loading course:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCourse()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            <div className="h-8 w-64 bg-muted animate-pulse rounded mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="h-6 w-full bg-muted animate-pulse rounded"></div>
                <div className="h-24 w-full bg-muted animate-pulse rounded"></div>
                <div className="h-6 w-3/4 bg-muted animate-pulse rounded"></div>
              </div>
              <div className="h-64 w-full bg-muted animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container py-12">
        <div className="flex justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
            <p className="mb-4">The course you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/courses/${params.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-muted-foreground mt-2">{course.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center">
              <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
              <span>{course.rating}</span>
              <span className="ml-1 text-muted-foreground">({course.reviews} reviews)</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4" />
              <span>{course.students} students</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{course.duration}</span>
            </div>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                  {course.instructor.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{course.instructor.name}</div>
                  <div className="text-sm text-muted-foreground">Instructor</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-xl font-bold mb-4">What You'll Learn</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
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
                  className="h-5 w-5 text-primary mr-2 mt-0.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Build websites using HTML, CSS, and JavaScript</span>
              </li>
              <li className="flex items-start">
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
                  className="h-5 w-5 text-primary mr-2 mt-0.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Understand responsive design principles</span>
              </li>
              <li className="flex items-start">
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
                  className="h-5 w-5 text-primary mr-2 mt-0.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Create interactive web pages</span>
              </li>
              <li className="flex items-start">
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
                  className="h-5 w-5 text-primary mr-2 mt-0.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Deploy websites to the internet</span>
              </li>
            </ul>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-bold mb-4">This Course Includes</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                <span>{course.duration} of on-demand video</span>
              </li>
              <li className="flex items-center">
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
                  className="h-4 w-4 mr-2"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span>5 downloadable resources</span>
              </li>
              <li className="flex items-center">
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
                  className="h-4 w-4 mr-2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
                <span>10 quizzes and assignments</span>
              </li>
              <li className="flex items-center">
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
                  className="h-4 w-4 mr-2"
                >
                  <path d="M21 15V6" />
                  <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  <path d="M12 12H3" />
                  <path d="M16 6H3" />
                  <path d="M12 18H3" />
                </svg>
                <span>Full lifetime access</span>
              </li>
              <li className="flex items-center">
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
                  className="h-4 w-4 mr-2"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>Certificate of completion</span>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div className="sticky top-20">
            <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="object-cover w-full h-full" />
            </div>

            <CheckoutForm courseId={course.id} courseTitle={course.title} price={course.price} image={course.image} />

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>30-Day Money-Back Guarantee</p>
              <p className="mt-2">Secure Payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
