import { loadScript } from "@/lib/utils"

export interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description?: string
  image?: string
  orderId: string
  prefill?: {
    name?: string
    email?: string
    contact?: string
  }
  theme?: {
    color?: string
  }
  handler: (response: any) => void
}

export async function initializeRazorpay(options: RazorpayOptions) {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?")
    return
  }

  const razorpay = new (window as any).Razorpay(options)
  razorpay.open()
}
