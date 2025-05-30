"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, FileText, Eye, Code, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

interface ResumePreviewProps {
  resumeData: any
  template: string
  latexCode: string
  onLatexChange?: (code: string) => void
}

export default function ResumePreview({ resumeData, template, latexCode, onLatexChange }: ResumePreviewProps) {
  const [pdfUrl, setPdfUrl] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview")
  const [localLatexCode, setLocalLatexCode] = useState(latexCode || generateDefaultLatex(resumeData, template))
  const { toast } = useToast()

  useEffect(() => {
    // Update local state when prop changes
    if (latexCode) {
      setLocalLatexCode(latexCode)
    }
  }, [latexCode])

  useEffect(() => {
    // In a real implementation, this would generate a PDF from the LaTeX code
    // For now, we'll just use a placeholder PDF
    setIsLoading(true)

    // Generate LaTeX code based on template and resume data if not provided
    if (!localLatexCode) {
      const generatedCode = generateDefaultLatex(resumeData, template)
      setLocalLatexCode(generatedCode)
      if (onLatexChange) {
        onLatexChange(generatedCode)
      }
    }

    // Simulate PDF generation delay
    const timer = setTimeout(() => {
      setPdfUrl("/templates/resume/example-resume.pdf")
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [resumeData, template])

  const handleLatexChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value
    setLocalLatexCode(newCode)
    if (onLatexChange) {
      onLatexChange(newCode)
    }
  }

  const handleDownload = () => {
    const firstName = resumeData?.personalInfo?.firstName || "resume"
    const role = resumeData?.targetRole || resumeData?.personalInfo?.title || "position"
    const company = resumeData?.targetCompany || "company"

    const fileName = `${firstName}_${role}_${company}`.toLowerCase().replace(/\s+/g, "_") + ".pdf"

    toast({
      title: "Downloading Resume",
      description: `Your resume "${fileName}" is being prepared for download.`,
    })

    // In a real implementation, this would trigger a download
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div className="flex h-full flex-col" variants={containerVariants} initial="hidden" animate="visible">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Resume Preview</h2>
        </div>
        <div className="flex gap-2">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "preview" | "code")} className="mr-2">
            <TabsList className="h-8">
              <TabsTrigger value="preview" className="h-7 px-2 text-xs">
                <Eye className="h-3.5 w-3.5 mr-1" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="h-7 px-2 text-xs">
                <Code className="h-3.5 w-3.5 mr-1" />
                LaTeX
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button size="sm" onClick={handleDownload} disabled={isLoading}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-lg border border-gray-800 bg-white">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              <p className="text-sm text-gray-500">Generating preview...</p>
            </div>
          </div>
        ) : viewMode === "preview" ? (
          <iframe src={pdfUrl} className="h-full w-full" title="Resume Preview" />
        ) : (
          <div className="h-full overflow-auto bg-gray-900 p-4">
            <Textarea
              value={localLatexCode}
              onChange={handleLatexChange}
              className="h-full min-h-[500px] font-mono text-sm text-gray-300 bg-gray-900 border-gray-700 resize-none"
              placeholder="Enter your LaTeX code here..."
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}

function generateDefaultLatex(resumeData: any, template: string): string {
  // This is a simplified example - in a real app, you'd generate proper LaTeX based on the template and data
  const name = resumeData?.personalInfo?.firstName + " " + resumeData?.personalInfo?.lastName || "John Doe"
  const email = resumeData?.personalInfo?.email || "email@example.com"
  const phone = resumeData?.personalInfo?.phone || "+1 (555) 123-4567"
  const title = resumeData?.personalInfo?.title || "Software Engineer"

  return `\\documentclass[11pt,letterpaper]{article}
\\usepackage[empty]{fullpage}
\\usepackage{hyperref}
\\usepackage{xcolor}
\\usepackage{geometry}
\\geometry{letterpaper,margin=1in}

\\begin{document}

\\begin{center}
  {\\LARGE \\textbf{${name}}}\\\\
  ${title}\\\\
  ${email} | ${phone}
\\end{center}

\\section*{Education}
\\begin{itemize}
  \\item University Name, Degree, Year
\\end{itemize}

\\section*{Experience}
\\begin{itemize}
  \\item Company Name, Position, Date Range
  \\begin{itemize}
    \\item Achievement 1
    \\item Achievement 2
  \\end{itemize}
\\end{itemize}

\\section*{Skills}
\\begin{itemize}
  \\item Skill 1, Skill 2, Skill 3
\\end{itemize}

\\end{document}`
}
