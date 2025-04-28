
"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res?.ok) {
      console.log("Login successful");
      // Optionally redirect after login
    } else {
      console.error("Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 py-12">
      <Card className="mx-auto max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Login to Saksham</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john.doe@example.com" required onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/auth/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} required onChange={handleChange} />
                <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Remember me
              </label>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Separator />
            <Button variant="outline" className="w-full" onClick={() => signIn('github')}>
              <Github className="mr-2 h-4 w-4" />
              Login with GitHub
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex flex-wrap items-center justify-center gap-1">
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-primary underline-offset-4 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}