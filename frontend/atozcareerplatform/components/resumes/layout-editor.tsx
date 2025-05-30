"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Plus, GripVertical, FileText, Save, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface LayoutEditorProps {
  resumeData: any
  onUpdate: (data: any) => void
}

export default function LayoutEditor({ resumeData, onUpdate }: LayoutEditorProps) {
  const [sections, setSections] = useState([
    { id: "personal", name: "Personal Information", page: 1, visible: true },
    { id: "summary", name: "Professional Summary", page: 1, visible: true },
    { id: "experience", name: "Experience", page: 1, visible: true },
    { id: "education", name: "Education", page: 1, visible: true },
    { id: "skills", name: "Skills", page: 1, visible: true },
    { id: "projects", name: "Projects", page: 1, visible: true },
  ])
  const [pages, setPages] = useState(1)
  const [layout, setLayout] = useState({
    margins: { top: 1, right: 1, bottom: 1, left: 1 },
    fontSize: "11pt",
    lineSpacing: "1.15",
    pageSize: "a4",
  })
  const { toast } = useToast()

  // Initialize with resumeData if available
  useEffect(() => {
    if (resumeData?.layout?.sections) {
      setSections(resumeData.layout.sections)
    }
    if (resumeData?.layout?.pages) {
      setPages(resumeData.layout.pages)
    }
    if (resumeData?.layout?.settings) {
      setLayout(resumeData.layout.settings)
    }
  }, [resumeData])

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(sections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setSections(items)
  }

  const handleAddPage = () => {
    setPages((prev) => prev + 1)
    toast({
      title: "Page Added",
      description: `You now have ${pages + 1} pages in your resume.`,
    })
  }

  const handleChangePage = (sectionId: string, page: number) => {
    setSections((prev) => prev.map((section) => (section.id === sectionId ? { ...section, page } : section)))
  }

  const handleToggleVisibility = (sectionId: string) => {
    setSections((prev) =>
      prev.map((section) => (section.id === sectionId ? { ...section, visible: !section.visible } : section)),
    )
  }

  const handleSaveLayout = () => {
    onUpdate({
      layout: {
        sections,
        pages,
        settings: layout,
      },
    })

    toast({
      title: "Layout Saved",
      description: "Your resume layout has been updated.",
    })
  }

  const handleMarginChange = (margin: string, value: number) => {
    setLayout((prev) => ({
      ...prev,
      margins: {
        ...prev.margins,
        [margin]: value,
      },
    }))
  }

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLayout((prev) => ({
      ...prev,
      fontSize: e.target.value,
    }))
  }

  const handleLineSpacingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLayout((prev) => ({
      ...prev,
      lineSpacing: e.target.value,
    }))
  }

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLayout((prev) => ({
      ...prev,
      pageSize: e.target.value,
    }))
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="h-full overflow-y-auto p-4 pb-20">
      <div className="mb-4 flex items-center justify-between sticky top-0 z-10 bg-gray-950 py-2">
        <h2 className="text-xl font-bold">Resume Layout</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAddPage}>
            <Plus className="mr-2 h-4 w-4" />
            Add Page
          </Button>
          <Button onClick={handleSaveLayout} className="bg-green-600 hover:bg-green-700">
            <Save className="mr-2 h-4 w-4" />
            Save Layout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Section Order & Visibility</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400 mb-4">
              Drag and drop sections to reorder them. Toggle visibility and assign sections to different pages.
            </p>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="sections">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                    {sections.map((section, index) => (
                      <Draggable key={section.id} draggableId={section.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="rounded-lg border border-gray-800 bg-gray-800/50 p-3"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div {...provided.dragHandleProps} className="cursor-grab">
                                  <GripVertical className="h-5 w-5 text-gray-500" />
                                </div>
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-gray-400" />
                                  <span>{section.name}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                  <Switch
                                    id={`section-${section.id}-visible`}
                                    checked={section.visible}
                                    onCheckedChange={() => handleToggleVisibility(section.id)}
                                  />
                                  <Label htmlFor={`section-${section.id}-visible`} className="text-xs">
                                    {section.visible ? "Visible" : "Hidden"}
                                  </Label>
                                </div>
                                <select
                                  value={section.page}
                                  onChange={(e) => handleChangePage(section.id, Number.parseInt(e.target.value))}
                                  className="rounded-md border border-gray-700 bg-gray-800 px-2 py-1 text-sm"
                                >
                                  {Array.from({ length: pages }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                      Page {i + 1}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Page Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Margins (inches)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="margin-top">Top</Label>
                  <select
                    id="margin-top"
                    value={layout.margins.top}
                    onChange={(e) => handleMarginChange("top", Number(e.target.value))}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2"
                  >
                    {[0.5, 0.75, 1, 1.25, 1.5].map((value) => (
                      <option key={value} value={value}>
                        {value}"
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="margin-right">Right</Label>
                  <select
                    id="margin-right"
                    value={layout.margins.right}
                    onChange={(e) => handleMarginChange("right", Number(e.target.value))}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2"
                  >
                    {[0.5, 0.75, 1, 1.25, 1.5].map((value) => (
                      <option key={value} value={value}>
                        {value}"
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="margin-bottom">Bottom</Label>
                  <select
                    id="margin-bottom"
                    value={layout.margins.bottom}
                    onChange={(e) => handleMarginChange("bottom", Number(e.target.value))}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2"
                  >
                    {[0.5, 0.75, 1, 1.25, 1.5].map((value) => (
                      <option key={value} value={value}>
                        {value}"
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="margin-left">Left</Label>
                  <select
                    id="margin-left"
                    value={layout.margins.left}
                    onChange={(e) => handleMarginChange("left", Number(e.target.value))}
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2"
                  >
                    {[0.5, 0.75, 1, 1.25, 1.5].map((value) => (
                      <option key={value} value={value}>
                        {value}"
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="font-size">Font Size</Label>
              <select
                id="font-size"
                value={layout.fontSize}
                onChange={handleFontSizeChange}
                className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2"
              >
                <option value="10pt">10pt</option>
                <option value="10.5pt">10.5pt</option>
                <option value="11pt">11pt</option>
                <option value="11.5pt">11.5pt</option>
                <option value="12pt">12pt</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="line-spacing">Line Spacing</Label>
              <select
                id="line-spacing"
                value={layout.lineSpacing}
                onChange={handleLineSpacingChange}
                className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2"
              >
                <option value="1">Single (1.0)</option>
                <option value="1.15">Comfortable (1.15)</option>
                <option value="1.5">Relaxed (1.5)</option>
                <option value="2">Double (2.0)</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="page-size">Page Size</Label>
              <select
                id="page-size"
                value={layout.pageSize}
                onChange={handlePageSizeChange}
                className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2"
              >
                <option value="a4">A4</option>
                <option value="letter">Letter</option>
                <option value="legal">Legal</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Page Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Array.from({ length: pages }, (_, pageIndex) => (
                <div key={pageIndex} className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium">Page {pageIndex + 1}</h4>
                    {pageIndex > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-950/30"
                        onClick={() => {
                          if (pages > 1) {
                            setPages(pages - 1)
                            // Move sections from deleted page to the previous page
                            setSections((prev) =>
                              prev.map((section) =>
                                section.page === pageIndex + 1 ? { ...section, page: pageIndex } : section,
                              ),
                            )
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Remove Page
                      </Button>
                    )}
                  </div>

                  <div
                    className={`relative border-2 border-gray-700 bg-white rounded-md mx-auto shadow-lg`}
                    style={{
                      width: layout.pageSize === "a4" ? "210mm" : layout.pageSize === "letter" ? "8.5in" : "8.5in",
                      height: layout.pageSize === "a4" ? "297mm" : layout.pageSize === "letter" ? "11in" : "14in",
                      maxWidth: "100%",
                      aspectRatio:
                        layout.pageSize === "a4" ? "210 / 297" : layout.pageSize === "letter" ? "8.5 / 11" : "8.5 / 14",
                    }}
                  >
                    {/* Margin visualization */}
                    <div
                      className="absolute border-2 border-dashed border-blue-400/30 bg-blue-50/10"
                      style={{
                        top: `${layout.margins.top}in`,
                        right: `${layout.margins.right}in`,
                        bottom: `${layout.margins.bottom}in`,
                        left: `${layout.margins.left}in`,
                      }}
                    ></div>

                    {/* Content area */}
                    <div
                      className="absolute overflow-hidden"
                      style={{
                        top: `${layout.margins.top}in`,
                        right: `${layout.margins.right}in`,
                        bottom: `${layout.margins.bottom}in`,
                        left: `${layout.margins.left}in`,
                      }}
                    >
                      <div className="space-y-2 p-2">
                        {sections
                          .filter((section) => section.page === pageIndex + 1 && section.visible)
                          .map((section) => (
                            <div key={section.id} className="rounded bg-gray-100 p-2 text-sm text-gray-800">
                              {section.name}
                            </div>
                          ))}

                        {sections.filter((section) => section.page === pageIndex + 1 && section.visible).length ===
                          0 && (
                          <div className="rounded border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500">
                            No visible sections on this page
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-20"
      >
        <Button onClick={handleSaveLayout} size="lg" className="bg-green-600 hover:bg-green-700 shadow-lg">
          <Save className="h-4 w-4 mr-2" /> Save Layout
        </Button>
      </motion.div>
    </div>
  )
}
