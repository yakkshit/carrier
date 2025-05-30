"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Search, ImageIcon, X, Info, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ModelSelectorProps {
  onClose: () => void
}

interface Model {
  id: string
  name: string
  provider: string
  icon: string
  supportsVision: boolean
  supportsWebSearch: boolean
  isPremium: boolean
}

export default function ModelSelector({ onClose }: ModelSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedModel, setSelectedModel] = useState<string | null>("gpt-4")
  const [apiKey, setApiKey] = useState("")
  const [customApiUrl, setCustomApiUrl] = useState("")
  const [enableWebSearch, setEnableWebSearch] = useState(false)
  const [enableImageGeneration, setEnableImageGeneration] = useState(false)
  const { toast } = useToast()

  const models: Model[] = [
    {
      id: "gpt-4",
      name: "GPT-4",
      provider: "OpenAI",
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
      supportsVision: true,
      supportsWebSearch: true,
      isPremium: true,
    },
    {
      id: "gpt-3.5-turbo",
      name: "GPT-3.5 Turbo",
      provider: "OpenAI",
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
      supportsVision: false,
      supportsWebSearch: true,
      isPremium: false,
    },
    {
      id: "claude-3-opus",
      name: "Claude 3 Opus",
      provider: "Anthropic",
      icon: "https://upload.wikimedia.org/wikipedia/commons/1/10/Anthropic_logo.svg",
      supportsVision: true,
      supportsWebSearch: true,
      isPremium: true,
    },
    {
      id: "claude-3-sonnet",
      name: "Claude 3 Sonnet",
      provider: "Anthropic",
      icon: "https://upload.wikimedia.org/wikipedia/commons/1/10/Anthropic_logo.svg",
      supportsVision: true,
      supportsWebSearch: true,
      isPremium: true,
    },
    {
      id: "gemini-pro",
      name: "Gemini Pro",
      provider: "Google",
      icon: "https://seeklogo.com/images/G/google-gemini-logo-A5680F0475-seeklogo.com.png",
      supportsVision: true,
      supportsWebSearch: true,
      isPremium: false,
    },
    {
      id: "llama-3-70b",
      name: "Llama 3 70B",
      provider: "Meta",
      icon: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
      supportsVision: false,
      supportsWebSearch: false,
      isPremium: false,
    },
  ]

  const filteredModels = models.filter((model) => model.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleSave = () => {
    toast({
      title: "Model Settings Saved",
      description: `Selected model: ${selectedModel || "None"}`,
    })
    onClose()
  }

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-2xl rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-xl"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Select AI Model</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="mb-6 max-h-[300px] overflow-y-auto rounded-lg border border-gray-800">
          {filteredModels.map((model) => (
            <div
              key={model.id}
              className={`flex cursor-pointer items-center justify-between border-b border-gray-800 p-3 hover:bg-gray-800 ${
                selectedModel === model.id ? "bg-gray-800" : ""
              }`}
              onClick={() => setSelectedModel(model.id)}
            >
              <div className="flex items-center gap-3">
                <img src={model.icon || "/placeholder.svg"} alt={model.provider} className="h-6 w-6" />
                <div>
                  <div className="font-medium">{model.name}</div>
                  <div className="text-xs text-gray-400">{model.provider}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {model.supportsVision && <ImageIcon className="h-4 w-4 text-gray-400" title="Supports vision" />}
                {model.supportsWebSearch && <Search className="h-4 w-4 text-gray-400" title="Supports web search" />}
                {model.isPremium && (
                  <span className="rounded-full bg-amber-900/30 px-2 py-0.5 text-xs text-amber-400">Premium</span>
                )}
              </div>
            </div>
          ))}

          {filteredModels.length === 0 && (
            <div className="p-4 text-center text-gray-400">No models found matching your search.</div>
          )}
        </div>

        <div className="mb-4 space-y-4 rounded-lg border border-gray-800 p-4">
          <div>
            <Label htmlFor="api-key">API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mt-1"
            />
            <p className="mt-1 text-xs text-gray-400">Required for most models. Your key is stored locally.</p>
          </div>

          <div>
            <Label htmlFor="custom-url">Custom API URL (Optional)</Label>
            <Input
              id="custom-url"
              placeholder="https://api.example.com"
              value={customApiUrl}
              onChange={(e) => setCustomApiUrl(e.target.value)}
              className="mt-1"
            />
            <p className="mt-1 text-xs text-gray-400">For self-hosted or proxy endpoints.</p>
          </div>
        </div>

        <div className="mb-6 space-y-4 rounded-lg border border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Label htmlFor="web-search" className="cursor-pointer">
                Enable Web Search
              </Label>
            </div>
            <Switch id="web-search" checked={enableWebSearch} onCheckedChange={setEnableWebSearch} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-gray-400" />
              <Label htmlFor="image-generation" className="cursor-pointer">
                Enable Image Generation
              </Label>
            </div>
            <Switch id="image-generation" checked={enableImageGeneration} onCheckedChange={setEnableImageGeneration} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Info className="h-3 w-3" />
            <span>Some features may require a paid API plan</span>
            <a
              href="#"
              className="ml-1 flex items-center gap-0.5 text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
