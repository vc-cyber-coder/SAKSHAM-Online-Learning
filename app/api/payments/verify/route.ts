import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// In production, you would verify the payment signature
const verifyPaymentSignature = (paymentId: string, orderId: string, signature: string) => {
  // This is a mock implementation
  // In production, you would use crypto to verify the signature
  return true
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { paymentId, orderId, signature, courseId } = await req.json()

    if (!paymentId || !orderId || !signature || !courseId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verify payment signature
    const isValid = verifyPaymentSignature(paymentId, orderId, signature)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("saksham")

    // Update order status
    await db.collection("orders").updateOne(
      { orderId },
      {
        $set: {
          status: "paid",
          paymentId,
          updatedAt: new Date(),
        },
      },
    )

    // Create enrollment
    await db.collection("enrollments").insertOne({
      userId: session.user.id,
      courseId: new ObjectId(courseId),
      progress: 0,
      status: "active",
      enrolledAt: new Date(),
      paymentId,
      orderId,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
