"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, GraduationCap, Home, LayoutDashboard } from "lucide-react"

import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <GraduationCap className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">Saksham</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-primary",
            pathname === "/" ? "text-primary" : "text-muted-foreground",
          )}
        >
          <div className="flex items-center gap-1">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </div>
        </Link>
        <Link
          href="/courses"
          className={cn(
            "transition-colors hover:text-primary",
            pathname === "/courses" || pathname.startsWith("/courses/") ? "text-primary" : "text-muted-foreground",
          )}
        >
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>Courses</span>
          </div>
        </Link>
        <Link
          href="/dashboard"
          className={cn(
            "transition-colors hover:text-primary",
            pathname === "/dashboard" ? "text-primary" : "text-muted-foreground",
          )}
        >
          <div className="flex items-center gap-1">
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </div>
        </Link>
      </nav>
    </div>
  )
}
