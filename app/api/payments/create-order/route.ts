import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// This would be replaced with actual Razorpay SDK in production
const mockCreateOrder = async (options: any) => {
  // In production, this would call Razorpay API
  return {
    id: "order_" + Math.random().toString(36).substring(2, 15),
    amount: options.amount,
    currency: options.currency,
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { courseId, amount } = await req.json()

    if (!courseId || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In production, you would use the actual Razorpay SDK
    // const razorpay = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID || "",
    //   key_secret: process.env.RAZORPAY_KEY_SECRET || "",
    // })

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_order_${courseId}_${session.user.id}`,
      payment_capture: 1,
    }

    // Create order
    const order = await mockCreateOrder(options)

    // Save order details to database
    const client = await clientPromise
    const db = client.db("saksham")

    await db.collection("orders").insertOne({
      orderId: order.id,
      courseId: new ObjectId(courseId),
      userId: session.user.id,
      amount: amount,
      currency: "INR",
      status: "created",
      createdAt: new Date(),
    })

    return NextResponse.json({ order })
  } catch (error) {
    console.error("Error creating payment order:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
