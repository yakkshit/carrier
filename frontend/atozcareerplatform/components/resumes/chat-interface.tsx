"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Paperclip, Send, Settings, Check, Bot, User, Briefcase, Building } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ChatInterfaceProps {
  onApplyChanges: (data: any) => void
  resumeData: any
  onToggleModelSelector: () => void
  showModelSelector: boolean
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatInterface({
  onApplyChanges,
  resumeData,
  onToggleModelSelector,
  showModelSelector,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI resume assistant. I can help you create a professional resume tailored to your profile and target job. What would you like to do today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [useProfileData, setUseProfileData] = useState(true)
  const [targetCompany, setTargetCompany] = useState("")
  const [targetRole, setTargetRole] = useState("")
  const [showJobDetails, setShowJobDetails] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // In a real implementation, this would call your AI API
      // For now, we'll simulate a response
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `I've analyzed your request${
            targetCompany ? ` for ${targetRole} at ${targetCompany}` : ""
          }. I can help tailor your resume to highlight your relevant skills and experience. Would you like me to update your resume with these changes?`,
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Error sending message:", error)
      setIsLoading(false)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded.`,
      })
      // In a real implementation, this would process the file
    }
  }

  const handleApplyChanges = () => {
    // In a real implementation, this would apply the AI-suggested changes
    onApplyChanges({
      // Example data that would come from AI
      summary: {
        content:
          "Experienced software engineer with a strong background in full-stack development and cloud technologies. Proven track record of delivering scalable solutions and optimizing application performance.",
        visible: true,
      },
      targetCompany,
      targetRole,
    })

    toast({
      title: "Changes Applied",
      description: "AI suggestions have been applied to your resume.",
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

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div className="flex h-full flex-col" variants={containerVariants} initial="hidden" animate="visible">
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900 p-3">
        <h2 className="text-lg font-semibold">AI Assistant</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onToggleModelSelector}>
            <Settings className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Switch id="use-profile" checked={useProfileData} onCheckedChange={setUseProfileData} />
            <Label htmlFor="use-profile" className="text-xs">
              Use Profile Data
            </Label>
          </div>
        </div>
      </div>

      {/* Job Target Section */}
      <Accordion
        type="single"
        collapsible
        value={showJobDetails ? "job-details" : ""}
        onValueChange={(value) => setShowJobDetails(value === "job-details")}
        className="border-b border-gray-800"
      >
        <AccordionItem value="job-details" className="border-0">
          <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-gray-800/50">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>Target Job Details</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="target-role" className="text-sm">
                  Target Role
                </Label>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  <Input
                    id="target-role"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Software Engineer"
                    className="flex-1 bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="target-company" className="text-sm">
                  Target Company
                </Label>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-400" />
                  <Input
                    id="target-company"
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    placeholder="e.g. Google"
                    className="flex-1 bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-gray-800 text-gray-100"
                }`}
              >
                <div className="mb-1 flex items-center gap-2">
                  {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  <span className="text-xs font-semibold">{message.role === "assistant" ? "AI Assistant" : "You"}</span>
                </div>
                <p className="whitespace-pre-wrap text-sm">{message.content}</p>

                {/* Apply Changes button for assistant messages */}
                {message.role === "assistant" && message.id !== "1" && (
                  <Button variant="secondary" size="sm" className="mt-2" onClick={handleApplyChanges}>
                    <Check className="mr-2 h-4 w-4" />
                    Apply Changes
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div className="mb-4 flex justify-start" variants={messageVariants} initial="hidden" animate="visible">
            <div className="max-w-[80%] rounded-lg bg-gray-800 p-3 text-gray-100">
              <div className="flex space-x-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="border-t border-gray-800 bg-gray-900 p-3">
        <div className="flex items-end gap-2">
          <Button variant="ghost" size="icon" onClick={handleFileUpload}>
            <Paperclip className="h-5 w-5" />
          </Button>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="min-h-[60px] resize-none bg-gray-800 border-gray-700"
          />
          <Button size="icon" onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.json"
        />
      </div>
    </motion.div>
  )
}
