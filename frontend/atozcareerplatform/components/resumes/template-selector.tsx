"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import templatesData from "@/defaults/templates.json"

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (template: string) => void
}

interface Template {
  id: string
  name: string
  description: string
  thumbnail: string
  tags: string[]
}

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [filter, setFilter] = useState<string>("all")
  const { toast } = useToast()

  useEffect(() => {
    // In a real implementation, this would fetch templates from an API
    setTemplates(templatesData as Template[])
  }, [])

  const filteredTemplates =
    filter === "all" ? templates : templates.filter((template) => template.tags.includes(filter))

  const handleSelectTemplate = (templateId: string) => {
    onSelectTemplate(templateId)
    toast({
      title: "Template Selected",
      description: `Template has been changed to ${templates.find((t) => t.id === templateId)?.name}.`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Resume Templates</h3>
        <div className="flex gap-1">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            className="text-xs h-7 px-2"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "professional" ? "default" : "outline"}
            size="sm"
            className="text-xs h-7 px-2"
            onClick={() => setFilter("professional")}
          >
            Professional
          </Button>
          <Button
            variant={filter === "creative" ? "default" : "outline"}
            size="sm"
            className="text-xs h-7 px-2"
            onClick={() => setFilter("creative")}
          >
            Creative
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto pb-2">
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              className={`cursor-pointer overflow-hidden border-2 transition-all ${
                selectedTemplate === template.id
                  ? "border-primary bg-primary/10"
                  : "border-gray-800 bg-gray-900 hover:border-gray-700"
              }`}
              onClick={() => handleSelectTemplate(template.id)}
            >
              <div className="relative aspect-[210/297] w-full overflow-hidden bg-white">
                <img
                  src={template.thumbnail || "/placeholder.svg"}
                  alt={template.name}
                  className="h-full w-full object-cover"
                />
                {selectedTemplate === template.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
                    <div className="rounded-full bg-primary p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
              <CardContent className="p-2">
                <p className="text-xs font-medium truncate">{template.name}</p>
                <p className="text-[10px] text-gray-400 truncate">{template.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
