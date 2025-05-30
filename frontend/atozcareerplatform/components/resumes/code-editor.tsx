"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Save, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  const [code, setCode] = useState(
    value ||
      `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{lmodern}
\\usepackage{textcomp}
\\usepackage{microtype}
\\usepackage{hyperref}
\\usepackage{geometry}
\\geometry{a4paper, margin=1in}
\\usepackage{enumitem}
\\setlist{noitemsep}

\\begin{document}

\\begin{center}
  {\\LARGE \\textbf{John Doe}}\\\\[0.2cm]
  {\\small 
  email@example.com $\\cdot$ 
  (123) 456-7890 $\\cdot$ 
  San Francisco, CA $\\cdot$ 
  linkedin.com/in/johndoe
  }
\\end{center}

\\section*{Summary}
Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and optimizing application performance.

\\section*{Experience}
\\textbf{Senior Software Engineer} \\hfill \\textit{Jan 2021 -- Present}\\\\
\\textbf{Tech Innovations Inc.} \\hfill \\textit{San Francisco, CA}
\\begin{itemize}
  \\item Led the development of a microservices architecture that improved system reliability by 40\\%.
  \\item Implemented CI/CD pipelines reducing deployment time from hours to minutes.
  \\item Mentored junior developers and conducted code reviews to ensure code quality.
\\end{itemize}

\\textbf{Software Developer} \\hfill \\textit{Mar 2018 -- Dec 2020}\\\\
\\textbf{Digital Solutions LLC} \\hfill \\textit{Boston, MA}
\\begin{itemize}
  \\item Developed responsive web applications using React and Redux.
  \\item Optimized database queries resulting in 30\\% faster application performance.
  \\item Collaborated with UX designers to implement intuitive user interfaces.
\\end{itemize}

\\section*{Education}
\\textbf{Master of Science in Computer Science} \\hfill \\textit{2016 -- 2018}\\\\
\\textbf{Massachusetts Institute of Technology} \\hfill \\textit{Cambridge, MA}

\\textbf{Bachelor of Science in Software Engineering} \\hfill \\textit{2012 -- 2016}\\\\
\\textbf{University of California, Berkeley} \\hfill \\textit{Berkeley, CA}

\\section*{Skills}
\\textbf{Technical:} JavaScript, TypeScript, Python, Java, SQL, React, Node.js, Express, Next.js, Django, Git, Docker, Kubernetes, AWS, CI/CD, GraphQL

\\textbf{Soft:} Team Leadership, Problem Solving, Technical Communication, Agile Methodologies

\\section*{Projects}
\\textbf{E-commerce Platform}\\\\
Developed a full-stack e-commerce solution with React, Node.js, and MongoDB

\\textbf{AI Recommendation Engine}\\\\
Built a machine learning model to provide personalized product recommendations

\\textbf{Open Source Contribution}\\\\
Active contributor to several open-source projects in the JavaScript ecosystem

\\end{document}`,
  )
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
    onChange(e.target.value)
  }

  const handleSave = () => {
    onChange(code)
    toast({
      title: "Code Saved",
      description: "Your LaTeX code has been saved.",
    })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Copied to Clipboard",
      description: "LaTeX code has been copied to your clipboard.",
    })
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
      <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900 p-3">
        <h2 className="text-lg font-semibold">LaTeX Code</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <textarea
          value={code}
          onChange={handleChange}
          className="h-full w-full resize-none bg-gray-950 p-4 font-mono text-sm text-gray-200 focus:outline-none"
          spellCheck="false"
        />
      </div>
    </motion.div>
  )
}
