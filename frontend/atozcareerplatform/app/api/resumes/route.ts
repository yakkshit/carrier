import { NextResponse } from "next/server"

// Mock resume data
const mockResumes = [
  {
    id: "resume_1",
    userId: "user_123",
    title: "Software Engineer Resume",
    createdAt: "2023-01-15T12:00:00Z",
    updatedAt: "2023-02-20T15:30:00Z",
    data: {
      personalInfo: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "(123) 456-7890",
        location: "San Francisco, CA",
        linkedin: "linkedin.com/in/johndoe",
        github: "github.com/johndoe",
        website: "johndoe.com",
        visible: true,
      },
      summary: {
        content: "Experienced software engineer with 5+ years of expertise in full-stack development...",
        visible: true,
      },
      // Other resume sections...
    },
  },
  {
    id: "resume_2",
    userId: "user_123",
    title: "Product Manager Resume",
    createdAt: "2023-03-10T09:15:00Z",
    updatedAt: "2023-03-10T09:15:00Z",
    data: {
      // Resume data...
    },
  },
]

// GET - Get all resumes for a user
export async function GET(request: Request) {
  // In a real implementation, this would get the user ID from the session
  // and fetch their resumes from the database
  const userId = "user_123" // Mock user ID

  const userResumes = mockResumes.filter((resume) => resume.userId === userId)

  return NextResponse.json(userResumes)
}

// POST - Create a new resume
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, data } = body

    // In a real implementation, this would get the user ID from the session
    // and create a new resume in the database
    const userId = "user_123" // Mock user ID

    if (!title) {
      return NextResponse.json({ error: "Resume title is required" }, { status: 400 })
    }

    const newResume = {
      id: "resume_" + Math.floor(Math.random() * 1000),
      userId,
      title,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      data: data || {},
    }

    // In a real implementation, this would save to the database
    // mockResumes.push(newResume)

    return NextResponse.json(newResume)
  } catch (error) {
    console.error("Create resume error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
