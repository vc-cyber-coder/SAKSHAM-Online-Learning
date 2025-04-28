import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import clientPromise from "@/lib/mongodb"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    // Validate the data
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("Saksham_DataBase")

    // Check if user already exists
    const existingUser = await db.collection("Users").findOne({ email })

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Hash the password
    const hashedPassword = await hash(password, 10)

    // Create the user
    const result = await db.collection("Users").insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    })

    return NextResponse.json(
      {
        message: "User created successfully",
        userId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
