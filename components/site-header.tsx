import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { UserNav } from "@/components/user-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="relative w-full max-w-[200px] md:max-w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search courses..." className="w-full pl-8" />
          </div>
          <nav className="flex items-center space-x-2">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">Sign up</Button>
            </Link>
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  )
}
