import Link from "next/link"
import { ArrowLeft, BookOpen, Calendar, Clock, Play, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { formatPrice } from "@/lib/utils"

// Mock data for a single course
const course = {
  id: 1,
  title: "Web Development Fundamentals",
  description:
    "Learn HTML, CSS, and JavaScript to build modern websites from scratch. This comprehensive course covers everything you need to know to start your journey as a web developer.",
  category: "Web Development",
  price: 1999,
  rating: 4.8,
  reviews: 245,
  students: 1245,
  duration: "10 hours",
  lastUpdated: "March 2023",
  instructor: {
    name: "Rahul Sharma",
    bio: "Senior Web Developer with 10+ years of experience. Worked with companies like TCS, Infosys, and Google.",
    courses: 12,
    students: 15000,
    rating: 4.9,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  image: "/placeholder.svg?height=400&width=800",
  whatYouWillLearn: [
    "Build websites using HTML, CSS, and JavaScript",
    "Understand responsive design principles",
    "Create interactive web pages",
    "Deploy websites to the internet",
    "Optimize websites for performance",
    "Debug common web development issues",
  ],
  requirements: [
    "Basic computer knowledge",
    "No prior programming experience required",
    "A computer with internet access",
  ],
  curriculum: [
    {
      title: "Introduction to Web Development",
      lessons: [
        { title: "Course Overview", duration: "5 min", type: "video", videoId: "pKO9UjSeLew" },
        { title: "Setting Up Your Development Environment", duration: "15 min", type: "video", videoId: "5oG2Q2GMHA0" },
        { title: "Understanding How the Web Works", duration: "20 min", type: "video", videoId: "hJHvdBlSxug" },
        { title: "Introduction Quiz", duration: "10 min", type: "quiz" },
      ],
    },
    {
      title: "HTML Fundamentals",
      lessons: [
        { title: "HTML Document Structure", duration: "25 min", type: "video", videoId: "UB1O30fR-EE" },
        { title: "Working with Text Elements", duration: "30 min", type: "video", videoId: "yTHTo28hwTQ" },
        { title: "Creating Lists and Tables", duration: "35 min", type: "video", videoId: "DdYSMumjs8k" },
        { title: "HTML Forms and Input Elements", duration: "40 min", type: "video", videoId: "fNcJuPIZ2WE" },
        { title: "HTML Practice Assignment", duration: "60 min", type: "assignment" },
      ],
    },
    {
      title: "CSS Styling",
      lessons: [
        { title: "Introduction to CSS", duration: "20 min", type: "video", videoId: "1PnVor36_40" },
        { title: "Selectors and Properties", duration: "30 min", type: "video", videoId: "1Rs2ND1ryYc" },
        { title: "Box Model and Layout", duration: "35 min", type: "video", videoId: "rIO5326FgPE" },
        { title: "Flexbox and Grid", duration: "45 min", type: "video", videoId: "JJSoEo8JSnc" },
        { title: "Responsive Design with Media Queries", duration: "40 min", type: "video", videoId: "2KL-z9A56SQ" },
        { title: "CSS Challenge", duration: "60 min", type: "assignment" },
      ],
    },
    {
      title: "JavaScript Basics",
      lessons: [
        { title: "Introduction to JavaScript", duration: "25 min", type: "video", videoId: "W6NZfCO5SIk" },
        { title: "Variables and Data Types", duration: "30 min", type: "video", videoId: "edlFjlzxkSI" },
        { title: "Functions and Control Flow", duration: "40 min", type: "video", videoId: "AY6X5jZZ_JE" },
        { title: "DOM Manipulation", duration: "45 min", type: "video", videoId: "y17RuWkWdn8" },
        { title: "Event Handling", duration: "35 min", type: "video", videoId: "XF1_MlZ5l6M" },
        { title: "JavaScript Quiz", duration: "20 min", type: "quiz" },
      ],
    },
    {
      title: "Building a Complete Website",
      lessons: [
        { title: "Project Overview", duration: "15 min", type: "video", videoId: "PkZNo7MFNFg" },
        { title: "Setting Up the Project Structure", duration: "25 min", type: "video", videoId: "QA0XpGhiz5w" },
        { title: "Creating the HTML Structure", duration: "35 min", type: "video", videoId: "PlxWf493en4" },
        { title: "Styling with CSS", duration: "45 min", type: "video", videoId: "1Rs2ND1ryYc" },
        { title: "Adding Interactivity with JavaScript", duration: "50 min", type: "video", videoId: "jS4aFq5-91M" },
        { title: "Deploying Your Website", duration: "30 min", type: "video", videoId: "rgupXKxGLjI" },
        { title: "Final Project Submission", duration: "120 min", type: "assignment" },
      ],
    },
  ],
}

export default function CoursePage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/courses">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Courses
                    </Link>
                  </Button>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{course.title}</h1>
                <p className="text-muted-foreground md:text-xl">{course.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <Badge variant="outline">{course.category}</Badge>
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
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>Last updated {course.lastUpdated}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-2">
                    <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} alt={course.instructor.name} />
                    <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{course.instructor.name}</div>
                    <div className="text-sm text-muted-foreground">Instructor</div>
                  </div>
                </div>
              </div>
              <div className="lg:row-span-2">
                <Card>
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="text-3xl font-bold">{formatPrice(course.price)}</div>
                    </div>
                    <div className="space-y-4">
                      <Button className="w-full" size="lg" asChild>
                        <Link href={`/courses/${params.id}/enroll`}>Enroll Now</Link>
                      </Button>
                      <Button variant="outline" className="w-full">
                        Add to Wishlist
                      </Button>
                    </div>
                    <div className="mt-6 space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>This course includes:</span>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Play className="mr-2 h-4 w-4" />
                          {course.duration} of on-demand video
                        </li>
                        <li className="flex items-center">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Full lifetime access
                        </li>
                        <li className="flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          Access on mobile and TV
                        </li>
                        <li className="flex items-center">
                          <Star className="mr-2 h-4 w-4" />
                          Certificate of completion
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24 lg:py-32">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">What You Will Learn</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {course.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-2 mt-1">
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
                          className="h-5 w-5 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div>{item}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-2xl font-bold mb-4">Requirements</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {course.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-2xl font-bold mb-4">Description</h3>
                <div className="space-y-4">
                  <p>
                    This comprehensive course is designed to take you from a complete beginner to a confident web
                    developer. You'll learn all the essential skills needed to build modern, responsive websites from
                    scratch.
                  </p>
                  <p>
                    Starting with the fundamentals of HTML, you'll learn how to structure web content properly. Then,
                    you'll dive into CSS to style your websites and make them visually appealing. Finally, you'll
                    explore JavaScript to add interactivity and dynamic features to your sites.
                  </p>
                  <p>
                    By the end of this course, you'll have built several projects that you can add to your portfolio,
                    and you'll have the skills needed to start your journey as a web developer.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="curriculum" className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Course Content</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-muted-foreground">
                    {course.curriculum.reduce((acc, section) => acc + section.lessons.length, 0)} lessons •{" "}
                    {course.duration} total length
                  </div>
                  <Button variant="ghost" size="sm">
                    Expand All Sections
                  </Button>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {course.curriculum.map((section, sectionIndex) => (
                    <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex flex-col items-start text-left">
                          <div>{section.title}</div>
                          <div className="text-sm text-muted-foreground">
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
                        <div className="space-y-2">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lessonIndex}
                              className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                            >
                              <div className="flex items-center">
                                {lesson.type === "video" ? (
                                  <Play className="mr-2 h-4 w-4" />
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
                                    className="mr-2 h-4 w-4"
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
                                    className="mr-2 h-4 w-4"
                                  >
                                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                    <polyline points="14 2 14 8 20 8" />
                                  </svg>
                                )}
                                <span>{lesson.title}</span>
                              </div>
                              <div className="text-sm text-muted-foreground">{lesson.duration}</div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
            <TabsContent value="instructor" className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} alt={course.instructor.name} />
                    <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="md:w-2/3 space-y-4">
                  <h3 className="text-2xl font-bold">{course.instructor.name}</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center">
                      <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                      <span>{course.instructor.rating} Instructor Rating</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      <span>{course.instructor.students.toLocaleString()} Students</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="mr-1 h-4 w-4" />
                      <span>{course.instructor.courses} Courses</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p>{course.instructor.bio}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Student Reviews</h3>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3 space-y-4">
                    <div className="text-5xl font-bold text-center">{course.rating}</div>
                    <div className="flex justify-center">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(course.rating) ? "fill-primary text-primary" : "text-muted"}`}
                          />
                        ))}
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      Course Rating • {course.reviews} Reviews
                    </div>
                  </div>
                  <div className="md:w-2/3 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-sm">5 stars</div>
                      <Progress value={75} className="h-2 flex-1" />
                      <div className="w-12 text-sm text-right">75%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-sm">4 stars</div>
                      <Progress value={20} className="h-2 flex-1" />
                      <div className="w-12 text-sm text-right">20%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-sm">3 stars</div>
                      <Progress value={3} className="h-2 flex-1" />
                      <div className="w-12 text-sm text-right">3%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-sm">2 stars</div>
                      <Progress value={1} className="h-2 flex-1" />
                      <div className="w-12 text-sm text-right">1%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-sm">1 star</div>
                      <Progress value={1} className="h-2 flex-1" />
                      <div className="w-12 text-sm text-right">1%</div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-6">
                {/* Sample reviews */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Reviewer" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="font-medium">John Doe</div>
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                      </div>
                      <div className="text-sm text-muted-foreground">2 months ago</div>
                      <p className="text-sm mt-2">
                        This course is amazing! I had no prior experience in web development, but the instructor
                        explained everything clearly. The projects were challenging but doable, and I feel confident in
                        my skills now.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Reviewer" />
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="font-medium">Anita Singh</div>
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < 4 ? "fill-primary text-primary" : "text-muted"}`} />
                          ))}
                      </div>
                      <div className="text-sm text-muted-foreground">1 month ago</div>
                      <p className="text-sm mt-2">
                        Great course with detailed explanations. The instructor is knowledgeable and responsive to
                        questions. I would have liked more advanced topics, but it's perfect for beginners.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Reviewer" />
                      <AvatarFallback>RK</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="font-medium">Raj Kumar</div>
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < 5 ? "fill-primary text-primary" : "text-muted"}`} />
                          ))}
                      </div>
                      <div className="text-sm text-muted-foreground">3 weeks ago</div>
                      <p className="text-sm mt-2">
                        I've taken several web development courses, and this is by far the best one. The curriculum is
                        well-structured, and the projects are practical and relevant to real-world scenarios.
                      </p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Load More Reviews
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  )
}
