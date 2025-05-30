"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Upload, X, User, LogOut } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import ChatInterface from "@/components/resumes/chat-interface"
import ResumePreview from "@/components/resumes/resume-preview"
import DetailsEditor from "@/components/resumes/details-editor"
import LayoutEditor from "@/components/resumes/layout-editor"
import ConsoleOutput from "@/components/resumes/console-output"
import TemplateSelector from "@/components/resumes/template-selector"
import ModelSelector from "@/components/resumes/model-selector"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import defaultResumeData from "@/defaults/resume-data.json"
import defaultSettings from "@/defaults/resume-settings.json"

export default function ResumesPage() {
  const [activeTab, setActiveTab] = useState("preview")
  const [showModelSelector, setShowModelSelector] = useState(false)
  const [latexCode, setLatexCode] = useState("")
  const [consoleErrors, setConsoleErrors] = useState<string[]>([])
  const [resumeData, setResumeData] = useState(defaultResumeData)
  const [resumeSettings, setResumeSettings] = useState(defaultSettings)
  const [selectedTemplate, setSelectedTemplate] = useState("professional")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null)
  const [userMode, setUserMode] = useState<"guest" | "user">("guest")
  const [showGuestBanner, setShowGuestBanner] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check")
        const data = await response.json()

        if (data.authenticated) {
          setIsAuthenticated(true)
          setUserData(data.user)
          setUserMode("user")
          setShowGuestBanner(false)
        } else {
          setShowGuestBanner(true)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        setShowGuestBanner(true)
      }
    }

    checkAuth()
  }, [])

  const handleDownloadPDF = () => {
    toast({
      title: "Downloading PDF",
      description: "Your resume is being prepared for download.",
    })
    // In a real implementation, this would trigger a PDF generation and download
  }

  const handleUploadJSON = () => {
    // This would open a file picker in a real implementation
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          try {
            const jsonData = JSON.parse(event.target?.result as string)
            setResumeData(jsonData)
            toast({
              title: "Resume Loaded",
              description: "Your resume data has been successfully imported.",
            })
          } catch (error) {
            toast({
              title: "Error",
              description: "Failed to parse JSON file.",
              variant: "destructive",
            })
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const handleCodeChange = (newCode: string) => {
    setLatexCode(newCode)
    // In a real implementation, we would validate LaTeX here and update errors
  }

  const handleApplyChanges = (newData: any) => {
    setResumeData({ ...resumeData, ...newData })
    toast({
      title: "Changes Applied",
      description: "Your resume has been updated with the latest changes.",
    })
  }

  const handleLogout = async () => {
    try {
      // In a real implementation, you would call a logout API endpoint
      // For now, we'll just update the state
      setIsAuthenticated(false)
      setUserData(null)
      setUserMode("guest")
      setShowGuestBanner(true)
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
      })
      router.push("/auth/login")
    } catch (error) {
      console.error("Logout failed:", error)
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  }

  if (!isAuthenticated && userMode !== "guest") {
    return (
      <motion.div
        className="flex h-screen items-center justify-center bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md space-y-8 rounded-lg bg-gray-900 p-8 shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Resume Builder</h2>
            <p className="mt-2 text-gray-400">Please login or continue as guest</p>
          </div>
          <div className="space-y-4">
            <Button className="w-full" onClick={() => router.push("/auth/login")}>
              Login
            </Button>
            <Button className="w-full" variant="outline" onClick={() => router.push("/auth/signup")}>
              Sign Up
            </Button>
            <Button className="w-full" variant="ghost" onClick={() => setUserMode("guest")}>
              Continue as Guest
            </Button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="flex h-screen flex-col overflow-hidden bg-gray-950 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Guest Mode Banner */}
      {showGuestBanner && userMode === "guest" && (
        <Alert className="rounded-none border-b border-amber-600/20 bg-amber-950/50 text-amber-200">
          <div className="container flex items-center justify-between">
            <AlertDescription>
              You are currently in guest mode. Your work will not be saved between sessions.
            </AlertDescription>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-amber-200 hover:bg-amber-900/50 hover:text-amber-100"
              onClick={() => setShowGuestBanner(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </Alert>
      )}

      {/* Header */}
      <motion.div
        className="flex h-14 items-center justify-between border-b border-gray-800 bg-gray-900 px-4"
        variants={itemVariants}
      >
        <div className="flex items-center gap-2">
          <span className="font-heading text-xl font-bold">AtoZ</span>
          <span className="text-sm text-gray-400">Resume Builder</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleDownloadPDF} className="hidden sm:flex">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="ghost" size="sm" onClick={handleUploadJSON} className="hidden sm:flex">
            <Upload className="mr-2 h-4 w-4" />
            Upload JSON
          </Button>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 p-0">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/abstract-geometric-shapes.png" alt={userData?.name || "User"} />
                    <AvatarFallback>{userData?.name?.substring(0, 2).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{userData?.name || "My Account"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" onClick={() => router.push("/auth/login")}>
              Sign In
            </Button>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div className="flex flex-1 overflow-hidden" variants={itemVariants}>
        <ResizablePanelGroup direction="horizontal" className="w-full">
          {/* Left Panel - Chat Interface */}
          <ResizablePanel defaultSize={33} minSize={25} maxSize={50} className="bg-gray-950">
            <div className="h-full overflow-hidden flex flex-col">
              <ChatInterface
                onApplyChanges={handleApplyChanges}
                resumeData={resumeData}
                onToggleModelSelector={() => setShowModelSelector(!showModelSelector)}
                showModelSelector={showModelSelector}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle className="bg-gray-800 w-1 h-full" />

          {/* Right Panel - Resume Editor */}
          <ResizablePanel defaultSize={67} className="hidden md:flex md:flex-col">
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <div className="border-b border-gray-800 bg-gray-900">
                <TabsList className="bg-transparent">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="layout">Layout</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="preview" className="flex-1 overflow-auto p-4 bg-gray-950">
                <ResumePreview
                  resumeData={resumeData}
                  template={selectedTemplate}
                  latexCode={latexCode}
                  onLatexChange={handleCodeChange}
                />
              </TabsContent>

              <TabsContent value="editor" className="flex-1 bg-gray-950">
                <div className="h-full overflow-auto">
                  <DetailsEditor resumeData={resumeData} onUpdate={setResumeData} />
                </div>
              </TabsContent>

              <TabsContent value="layout" className="flex-1 bg-gray-950 overflow-auto">
                <div className="h-full overflow-auto p-4">
                  <LayoutEditor resumeData={resumeData} onUpdate={setResumeData} />
                </div>
              </TabsContent>
            </Tabs>

            {/* Bottom Panel - Console & Templates */}
            <div className="h-40 border-t border-gray-800 bg-gray-900">
              <Tabs defaultValue="console">
                <TabsList className="bg-transparent">
                  <TabsTrigger value="console">Console</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                </TabsList>
                <TabsContent value="console" className="h-32 overflow-auto p-2">
                  <ConsoleOutput errors={consoleErrors} />
                </TabsContent>
                <TabsContent value="templates" className="h-32 overflow-auto p-2">
                  <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </motion.div>

      {/* Mobile View */}
      <div className="md:hidden w-full flex-1 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="chat" className="flex-1">
              Chat
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex-1">
              Preview
            </TabsTrigger>
            <TabsTrigger value="editor" className="flex-1">
              Editor
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="h-[calc(100vh-10rem)] overflow-auto">
            <ChatInterface
              onApplyChanges={handleApplyChanges}
              resumeData={resumeData}
              onToggleModelSelector={() => setShowModelSelector(!showModelSelector)}
              showModelSelector={showModelSelector}
            />
          </TabsContent>
          <TabsContent value="preview" className="h-[calc(100vh-10rem)] overflow-auto">
            <ResumePreview
              resumeData={resumeData}
              template={selectedTemplate}
              latexCode={latexCode}
              onLatexChange={handleCodeChange}
            />
          </TabsContent>
          <TabsContent value="editor" className="h-[calc(100vh-10rem)] overflow-auto">
            <DetailsEditor resumeData={resumeData} onUpdate={setResumeData} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Mobile Action Buttons */}
      <div className="md:hidden flex justify-between p-2 border-t border-gray-800 bg-gray-900">
        <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button variant="outline" size="sm" onClick={() => setActiveTab("templates")}>
          Templates
        </Button>
        <Button variant="outline" size="sm" onClick={handleUploadJSON}>
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>

      {/* Model Selector Modal */}
      <AnimatePresence>
        {showModelSelector && <ModelSelector onClose={() => setShowModelSelector(false)} />}
      </AnimatePresence>
    </motion.div>
  )
}
