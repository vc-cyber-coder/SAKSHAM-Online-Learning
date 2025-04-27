"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for featured courses
const featuredCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript to build modern websites",
    category: "Technical",
    price: 1999,
    rating: 4.8,
    students: 1245,
    duration: "10 hours",
    instructor: "Rahul Sharma",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Data Science with Python",
    description: "Master data analysis, visualization, and machine learning",
    category: "Technical",
    price: 2499,
    rating: 4.9,
    students: 987,
    duration: "15 hours",
    instructor: "Priya Patel",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Business Communication Skills",
    description: "Enhance your professional communication for career growth",
    category: "Non-Technical",
    price: 1499,
    rating: 4.7,
    students: 1532,
    duration: "8 hours",
    instructor: "Amit Kumar",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile apps for iOS and Android",
    category: "Technical",
    price: 2999,
    rating: 4.8,
    students: 756,
    duration: "12 hours",
    instructor: "Neha Gupta",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Digital Marketing Masterclass",
    description: "Learn SEO, social media marketing, and content strategy",
    category: "Non-Technical",
    price: 1799,
    rating: 4.6,
    students: 1089,
    duration: "9 hours",
    instructor: "Vikram Singh",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Cloud Computing with AWS",
    description: "Master cloud infrastructure and services on Amazon Web Services",
    category: "Technical",
    price: 2799,
    rating: 4.9,
    students: 678,
    duration: "14 hours",
    instructor: "Anjali Desai",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function FeaturedCourses() {
  const [filter, setFilter] = useState("All")

  const filteredCourses =
    filter === "All" ? featuredCourses : featuredCourses.filter((course) => course.category === filter)

  return (
    <div className="mt-12">
      <div className="flex justify-center gap-4 mb-8">
        <Button variant={filter === "All" ? "default" : "outline"} onClick={() => setFilter("All")}>
          All
        </Button>
        <Button variant={filter === "Technical" ? "default" : "outline"} onClick={() => setFilter("Technical")}>
          Technical
        </Button>
        <Button variant={filter === "Non-Technical" ? "default" : "outline"} onClick={() => setFilter("Non-Technical")}>
          Non-Technical
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="object-cover w-full h-full transition-all hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="outline">{course.category}</Badge>
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-primary text-primary mr-1" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
              </div>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {course.students} students
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.duration}
                </div>
              </div>
              <div className="mt-3 font-bold text-lg">₹{course.price.toLocaleString()}</div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild variant="outline">
                <Link href={`/courses/${course.id}`}>Details</Link>
              </Button>
              <Button asChild>
                <Link href={`/courses/${course.id}/enroll`}>Enroll Now</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
