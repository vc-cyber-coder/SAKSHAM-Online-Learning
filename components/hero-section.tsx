"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Saksham: Empowering Your Learning Journey
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Access quality education with courses designed for students and professionals. Learn at your own pace
                with video lectures, quizzes, and interactive content.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for courses..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button asChild>
                <Link href={searchQuery ? `/courses?search=${encodeURIComponent(searchQuery)}` : "/courses"}>
                  Search
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/courses">Explore Courses</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[450px] w-full overflow-hidden rounded-xl">
              <img
                src="/placeholder.svg?height=450&width=600"
                alt="Students learning online"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
