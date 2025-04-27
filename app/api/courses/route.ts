import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const client = await clientPromise
    const db = client.db("saksham")

    // Build the query
    const query: any = {}

    if (category) {
      query.category = category
    }

    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    // Get total count for pagination
    const total = await db.collection("courses").countDocuments(query)

    // Get the courses
    const courses = await db
      .collection("courses")
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    return NextResponse.json({
      courses,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const courseData = await req.json()

    // Validate the data
    if (!courseData.title || !courseData.description || !courseData.price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("saksham")

    // Create the course
    const result = await db.collection("courses").insertOne({
      ...courseData,
      createdAt: new Date(),
    })

    return NextResponse.json(
      {
        message: "Course created successfully",
        courseId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating course:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
