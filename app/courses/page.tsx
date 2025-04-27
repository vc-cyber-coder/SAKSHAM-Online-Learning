import { Suspense } from "react"
import { BookOpen, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CourseList from "@/components/course-list"

export default function CoursesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore Our Courses</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Discover a wide range of courses designed to help you achieve your goals.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search courses..." className="w-full pl-8" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[250px_1fr]">
            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-medium">Categories</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    All Courses
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Web Development
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Data Science
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Mobile Development
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Business
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Marketing
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Design
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-medium">Price Range</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    All Prices
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Free
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Under ₹1000
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    ₹1000 - ₹2000
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    ₹2000 - ₹3000
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Above ₹3000
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-medium">Duration</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    Any Duration
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Under 5 hours
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    5-10 hours
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    10-20 hours
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Over 20 hours
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold">All Courses</h2>
                  <p className="text-muted-foreground">Showing 24 of 256 courses</p>
                </div>
                <div className="flex items-center gap-4">
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Suspense fallback={<CoursesLoadingSkeleton />}>
                <CourseList />
              </Suspense>

              <div className="flex justify-center">
                <Button variant="outline" className="w-full sm:w-auto">
                  Load More Courses
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function CoursesLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-video w-full">
              <Skeleton className="h-full w-full" />
            </div>
            <CardHeader>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </CardFooter>
          </Card>
        ))}
    </div>
  )
}
