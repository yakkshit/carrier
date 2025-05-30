import { NextResponse } from "next/server"

// Mock AI chat response
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { messages, model, useProfileData } = body

    // In a real implementation, this would call an AI API like OpenAI
    // For demo purposes, we'll return mock responses

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages are required and must be an array" }, { status: 400 })
    }

    const lastMessage = messages[messages.length - 1]

    if (lastMessage.role !== "user") {
      return NextResponse.json({ error: "Last message must be from the user" }, { status: 400 })
    }

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate a mock response based on the user's message
    let response = ""
    const userMessage = lastMessage.content.toLowerCase()

    if (userMessage.includes("help") || userMessage.includes("start")) {
      response =
        "I can help you create a professional resume. Would you like me to help you with your summary, experience, or skills section?"
    } else if (userMessage.includes("summary")) {
      response =
        'For your professional summary, I recommend highlighting your key skills and experience. Here\'s a draft based on your profile:\n\n"Experienced software engineer with a strong background in full-stack development and cloud technologies. Proven track record of delivering scalable solutions and optimizing application performance."\n\nWould you like me to apply this to your resume?'
    } else if (userMessage.includes("experience")) {
      response =
        "I can help you format your work experience to highlight your achievements. Make sure to use action verbs and quantify your results when possible. Would you like me to help you with a specific job entry?"
    } else if (userMessage.includes("skills")) {
      response =
        "Based on your profile and the job market trends, I recommend highlighting these technical skills: JavaScript, React, Node.js, TypeScript, and AWS. For soft skills, emphasize problem-solving, communication, and teamwork. Would you like me to update your skills section?"
    } else if (userMessage.includes("template") || userMessage.includes("design")) {
      response =
        "I recommend using the 'Professional' template for corporate jobs or 'Modern' for creative roles. The 'Minimal' template works well for academic positions. Would you like me to apply one of these templates to your resume?"
    } else {
      response =
        "I understand you're interested in improving your resume. Could you specify which section you'd like help with? I can assist with your summary, experience, skills, education, or overall layout."
    }

    return NextResponse.json({
      message: {
        role: "assistant",
        content: response,
      },
    })
  } catch (error) {
    console.error("AI chat error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
