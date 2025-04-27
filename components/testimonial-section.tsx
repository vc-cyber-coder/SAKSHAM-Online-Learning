"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    id: 1,
    name: "Ananya Sharma",
    role: "Software Engineer",
    content:
      "Saksham helped me transition from a junior to a senior developer role. The courses are comprehensive and the instructors are extremely knowledgeable.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "College Student",
    content:
      "As a student, I found Saksham's courses to be incredibly helpful in supplementing my college education. The quizzes and practical assignments helped me understand concepts better.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Marketing Manager",
    content:
      "The digital marketing courses on Saksham helped me upskill and take on more responsibilities at work. The platform is user-friendly and the content is up-to-date.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Entrepreneur",
    content:
      "Saksham's business courses provided me with the knowledge I needed to start my own company. The practical insights from industry experts were invaluable.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayCount, setDisplayCount] = useState(getDisplayCount())

  function getDisplayCount() {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3
      if (window.innerWidth >= 768) return 2
      return 1
    }
    return 1
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : testimonials.length - displayCount))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < testimonials.length - displayCount ? prev + 1 : 0))
  }

  const visibleTestimonials = []
  for (let i = 0; i < displayCount; i++) {
    const index = (currentIndex + i) % testimonials.length
    visibleTestimonials.push(testimonials[index])
  }

  return (
    <section className="py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Students Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from our students who have transformed their careers with Saksham.
            </p>
          </div>
        </div>

        <div className="relative mt-12">
          <div className="flex space-x-6 overflow-hidden">
            {visibleTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="min-w-[300px] flex-1">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary mb-4 opacity-50" />
                  <p className="mb-6">{testimonial.content}</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <Button variant="outline" size="icon" onClick={handlePrev}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button variant="outline" size="icon" onClick={handleNext}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
