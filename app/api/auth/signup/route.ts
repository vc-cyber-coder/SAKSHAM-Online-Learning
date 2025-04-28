import { hash } from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const usersCollection = client.db("saksham").collection("Users"); // 👈 Important: collection name 'Users' Capital U

    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = {
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      createdAt: new Date(),

      // ✨ Adding fields helpful for LMS:
      role: "student", // (default) can be "student" or "instructor" later
      enrolledCourses: [], // user has no enrolled courses initially
      profileImage: "", // for future profile picture uploads
      bio: "", // short user bio
    };

    await usersCollection.insertOne(newUser);

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
