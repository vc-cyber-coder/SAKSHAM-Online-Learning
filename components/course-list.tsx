import Link from "next/link"
import { Clock, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for courses
const courses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript to build modern websites",
    category: "Web Development",
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
    category: "Data Science",
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
    category: "Business",
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
    category: "Mobile Development",
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
    category: "Marketing",
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
    category: "Cloud Computing",
    price: 2799,
    rating: 4.9,
    students: 678,
    duration: "14 hours",
    instructor: "Anjali Desai",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 7,
    title: "UI/UX Design Principles",
    description: "Create user-friendly interfaces and engaging user experiences",
    category: "Design",
    price: 2199,
    rating: 4.7,
    students: 892,
    duration: "11 hours",
    instructor: "Karan Malhotra",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 8,
    title: "Artificial Intelligence Fundamentals",
    description: "Understand AI concepts, algorithms, and applications",
    category: "Data Science",
    price: 2899,
    rating: 4.8,
    students: 543,
    duration: "16 hours",
    instructor: "Sanjay Mehta",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 9,
    title: "Financial Management",
    description: "Learn financial planning, analysis, and investment strategies",
    category: "Business",
    price: 1999,
    rating: 4.5,
    students: 765,
    duration: "10 hours",
    instructor: "Meera Kapoor",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function CourseList() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
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
  )
}
