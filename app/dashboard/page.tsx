import Link from "next/link"
import { BookOpen, Clock, GraduationCap, LineChart, Play, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button>My Courses</Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">+1 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hours Learned</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28.5</div>
                  <p className="text-xs text-muted-foreground">+8.2 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">+1 from last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[200px] w-full">
                    {/* Placeholder for chart */}
                    <div className="flex h-full items-center justify-center rounded-md border border-dashed">
                      <LineChart className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Your recent learning activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <Play className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Watched "Introduction to JavaScript"</p>
                        <p className="text-sm text-muted-foreground">Web Development Fundamentals</p>
                      </div>
                      <div className="text-sm text-muted-foreground">2h ago</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <Star className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Completed "HTML Basics Quiz"</p>
                        <p className="text-sm text-muted-foreground">Web Development Fundamentals</p>
                      </div>
                      <div className="text-sm text-muted-foreground">5h ago</div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Enrolled in "Data Science with Python"</p>
                        <p className="text-sm text-muted-foreground">New course added</p>
                      </div>
                      <div className="text-sm text-muted-foreground">1d ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Continue Learning</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img
                      src="/placeholder.svg?height=200&width=300"
                      alt="Web Development Fundamentals"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Web Development Fundamentals</CardTitle>
                    <CardDescription>Learn HTML, CSS, and JavaScript</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href="/courses/1/learn">Continue Learning</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img
                      src="/placeholder.svg?height=200&width=300"
                      alt="Data Science with Python"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Data Science with Python</CardTitle>
                    <CardDescription>Master data analysis and visualization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>20%</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href="/courses/2/learn">Continue Learning</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img
                      src="/placeholder.svg?height=200&width=300"
                      alt="Business Communication Skills"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Business Communication Skills</CardTitle>
                    <CardDescription>Enhance your professional communication</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>10%</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href="/courses/3/learn">Continue Learning</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            <h3 className="text-lg font-medium mb-4">My Enrolled Courses</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Course cards would go here - similar to the ones above */}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <h3 className="text-lg font-medium mb-4">Learning Analytics</h3>
            <div className="grid gap-4 md:grid-cols-2">{/* Analytics content would go here */}</div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <h3 className="text-lg font-medium mb-4">Account Settings</h3>
            <div className="space-y-4">{/* Settings content would go here */}</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
