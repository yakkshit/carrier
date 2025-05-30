import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function GET(req: NextRequest) {
  try {
    // In a real app, you would check for a session token or JWT
    // For now, we'll simulate an authenticated user

    // This is a placeholder - in a real app, you'd extract the user ID from a token
    const userId = req.headers.get("x-user-id")

    if (userId) {
      await connectDB()
      const user = await User.findById(userId)

      if (user) {
        return NextResponse.json({
          authenticated: true,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        })
      }
    }

    return NextResponse.json({ authenticated: false })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Something went wrong", authenticated: false }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ authenticated: false }, { status: 400 })
    }

    await connectDB()
    const user = await User.findOne({ email })

    if (user) {
      return NextResponse.json({
        authenticated: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      })
    }

    return NextResponse.json({ authenticated: false })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Something went wrong", authenticated: false }, { status: 500 })
  }
}
