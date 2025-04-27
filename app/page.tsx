import Link from "next/link"
import { ArrowRight, BookOpen, CheckCircle, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import FeaturedCourses from "@/components/featured-courses"
import { HeroSection } from "@/components/hero-section"
import { TestimonialSection } from "@/components/testimonial-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />

        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Empowering Learning for Everyone
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Saksham offers a wide range of courses designed to help you advance your career, learn new skills, and
              achieve your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <BookOpen className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>Diverse Courses</CardTitle>
                  <CardDescription>Technical and non-technical courses for all skill levels</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>Access hundreds of courses across multiple disciplines, from programming to business management.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Play className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>Video Lectures</CardTitle>
                  <CardDescription>High-quality video content from expert instructors</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>Learn at your own pace with our comprehensive video lectures and supplementary materials.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <CheckCircle className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>Interactive Quizzes</CardTitle>
                  <CardDescription>Test your knowledge with quizzes and assessments</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>Reinforce your learning with interactive quizzes, MCQs, and practical assignments.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Featured Courses</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Explore our most popular courses and start your learning journey today.
            </p>
          </div>

          <FeaturedCourses />

          <div className="flex justify-center mt-12">
            <Button asChild size="lg">
              <Link href="/courses">
                Browse All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <TestimonialSection />

        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Ready to Start Learning?</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Join thousands of students who are already learning on Saksham.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/signup">
                  Sign Up Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/courses">Explore Courses</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
