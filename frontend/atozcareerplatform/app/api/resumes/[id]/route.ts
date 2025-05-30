import { NextResponse } from "next/server"

// Mock resume data (same as in route.ts)
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

// GET - Get a specific resume by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const resumeId = params.id

  // In a real implementation, this would get the user ID from the session
  // and fetch the resume from the database
  const userId = "user_123" // Mock user ID

  const resume = mockResumes.find((r) => r.id === resumeId && r.userId === userId)

  if (!resume) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 })
  }

  return NextResponse.json(resume)
}

// PUT - Update a specific resume by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const resumeId = params.id
    const body = await request.json()
    const { title, data } = body

    // In a real implementation, this would get the user ID from the session
    // and update the resume in the database
    const userId = "user_123" // Mock user ID

    const resumeIndex = mockResumes.findIndex((r) => r.id === resumeId && r.userId === userId)

    if (resumeIndex === -1) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 })
    }

    const updatedResume = {
      ...mockResumes[resumeIndex],
      title: title || mockResumes[resumeIndex].title,
      data: data || mockResumes[resumeIndex].data,
      updatedAt: new Date().toISOString(),
    }

    // In a real implementation, this would update the database
    // mockResumes[resumeIndex] = updatedResume

    return NextResponse.json(updatedResume)
  } catch (error) {
    console.error("Update resume error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE - Delete a specific resume by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const resumeId = params.id

  // In a real implementation, this would get the user ID from the session
  // and delete the resume from the database
  const userId = "user_123" // Mock user ID

  const resumeIndex = mockResumes.findIndex((r) => r.id === resumeId && r.userId === userId)

  if (resumeIndex === -1) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 })
  }

  // In a real implementation, this would delete from the database
  // mockResumes.splice(resumeIndex, 1)

  return NextResponse.json({ success: true })
}
