"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { initializeRazorpay } from "@/lib/razorpay"
import { formatPrice } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

interface CheckoutFormProps {
  courseId: string
  courseTitle: string
  price: number
  image?: string
}

export function CheckoutForm({ courseId, courseTitle, price, image }: CheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCheckout = async () => {
    setIsLoading(true)

    try {
      // Create order
      const response = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          amount: price,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create order")
      }

      // Initialize Razorpay
      await initializeRazorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_YourTestKeyId",
        amount: price * 100, // in paise
        currency: "INR",
        name: "Saksham Learning",
        description: `Enrollment for ${courseTitle}`,
        image: "/logo.png",
        orderId: data.order.id,
        prefill: {
          name: "Student Name",
          email: "student@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3182ce",
        },
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyResponse = await fetch("/api/payments/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
                courseId,
              }),
            })

            const verifyData = await verifyResponse.json()

            if (!verifyResponse.ok) {
              throw new Error(verifyData.error || "Payment verification failed")
            }

            toast({
              title: "Payment successful!",
              description: "You have successfully enrolled in the course.",
            })

            // Redirect to course
            router.push(`/courses/${courseId}/learn`)
          } catch (error) {
            console.error("Payment verification error:", error)
            toast({
              title: "Payment verification failed",
              description: "Please contact support if your payment was deducted.",
              variant: "destructive",
            })
          }
        },
      })
    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "Checkout failed",
        description: "An error occurred during checkout. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Your Purchase</CardTitle>
        <CardDescription>Enroll in {courseTitle} to start learning</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Course Price:</span>
            <span className="font-bold">{formatPrice(price)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>GST (18%):</span>
            <span>{formatPrice(price * 0.18)}</span>
          </div>
          <div className="border-t pt-4 flex items-center justify-between font-bold">
            <span>Total:</span>
            <span>{formatPrice(price * 1.18)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isLoading}>
          {isLoading ? "Processing..." : "Pay Now"}
        </Button>
      </CardFooter>
    </Card>
  )
}
