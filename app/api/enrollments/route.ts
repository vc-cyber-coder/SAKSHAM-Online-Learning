import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { courseId } = await req.json()

    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("saksham")

    // Check if the course exists
    const course = await db.collection("courses").findOne({
      _id: new ObjectId(courseId),
    })

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Check if the user is already enrolled
    const existingEnrollment = await db.collection("enrollments").findOne({
      userId: session.user.id,
      courseId: new ObjectId(courseId),
    })

    if (existingEnrollment) {
      return NextResponse.json({ error: "Already enrolled in this course" }, { status: 409 })
    }

    // Create the enrollment
    const result = await db.collection("enrollments").insertOne({
      userId: session.user.id,
      courseId: new ObjectId(courseId),
      progress: 0,
      status: "active",
      enrolledAt: new Date(),
    })

    return NextResponse.json(
      {
        message: "Enrolled successfully",
        enrollmentId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error enrolling in course:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db("saksham")

    // Get user's enrollments with course details
    const enrollments = await db
      .collection("enrollments")
      .aggregate([
        {
          $match: {
            userId: session.user.id,
          },
        },
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "course",
          },
        },
        {
          $unwind: "$course",
        },
        {
          $sort: {
            enrolledAt: -1,
          },
        },
      ])
      .toArray()

    return NextResponse.json({ enrollments })
  } catch (error) {
    console.error("Error fetching enrollments:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
