"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, GraduationCap, Home, LayoutDashboard, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="flex items-center mb-6">
          <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
            <GraduationCap className="h-6 w-6" />
            <span className="font-bold">Saksham</span>
          </Link>
          <Button variant="ghost" className="ml-auto h-8 w-8 p-0" onClick={() => setOpen(false)}>
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground",
            )}
            onClick={() => setOpen(false)}
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link
            href="/courses"
            className={cn(
              "flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary",
              pathname === "/courses" || pathname.startsWith("/courses/") ? "text-primary" : "text-muted-foreground",
            )}
            onClick={() => setOpen(false)}
          >
            <BookOpen className="h-5 w-5" />
            <span>Courses</span>
          </Link>
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary",
              pathname === "/dashboard" ? "text-primary" : "text-muted-foreground",
            )}
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
