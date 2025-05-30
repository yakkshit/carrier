"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Plus, Trash2, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DetailsEditorProps {
  resumeData: any
  onUpdate: (data: any) => void
}

export default function DetailsEditor({ resumeData, onUpdate }: DetailsEditorProps) {
  const [activeTab, setActiveTab] = useState("personal")
  const [editedData, setEditedData] = useState({ ...resumeData })
  const { toast } = useToast()

  const handleInputChange = (section: string, field: string, value: string) => {
    setEditedData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleArrayInputChange = (section: string, index: number, field: string, value: string) => {
    setEditedData((prev) => ({
      ...prev,
      [section]: prev[section].map((item: any, i: number) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const handleArrayItemAdd = (section: string, template: any) => {
    setEditedData((prev) => ({
      ...prev,
      [section]: [...prev[section], { ...template }],
    }))
  }

  const handleArrayItemRemove = (section: string, index: number) => {
    setEditedData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_: any, i: number) => i !== index),
    }))
  }

  const handleSave = () => {
    onUpdate(editedData)
    toast({
      title: "Changes Saved",
      description: "Your resume details have been updated.",
    })
  }

  const renderPersonalInfo = () => (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Your basic contact information and summary</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">First Name</label>
            <Input
              value={editedData.personalInfo?.firstName || ""}
              onChange={(e) => handleInputChange("personalInfo", "firstName", e.target.value)}
              className="bg-gray-800 border-gray-700"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Last Name</label>
            <Input
              value={editedData.personalInfo?.lastName || ""}
              onChange={(e) => handleInputChange("personalInfo", "lastName", e.target.value)}
              className="bg-gray-800 border-gray-700"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Professional Title</label>
          <Input
            value={editedData.personalInfo?.title || ""}
            onChange={(e) => handleInputChange("personalInfo", "title", e.target.value)}
            className="bg-gray-800 border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input
            type="email"
            value={editedData.personalInfo?.email || ""}
            onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
            className="bg-gray-800 border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Phone</label>
          <Input
            value={editedData.personalInfo?.phone || ""}
            onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
            className="bg-gray-800 border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Input
            value={`${editedData.personalInfo?.city || ""}, ${editedData.personalInfo?.state || ""}`}
            onChange={(e) => {
              const [city, state] = e.target.value.split(",").map((item) => item.trim())
              handleInputChange("personalInfo", "city", city)
              handleInputChange("personalInfo", "state", state)
            }}
            placeholder="City, State"
            className="bg-gray-800 border-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Professional Summary</label>
          <Textarea
            value={editedData.personalInfo?.summary || ""}
            onChange={(e) => handleInputChange("personalInfo", "summary", e.target.value)}
            rows={4}
            className="bg-gray-800 border-gray-700 resize-none"
          />
        </div>
      </CardContent>
    </Card>
  )

  const renderExperience = () => (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Work Experience</CardTitle>
          <CardDescription>Your professional work history</CardDescription>
        </div>
        <Button
          size="sm"
          onClick={() =>
            handleArrayItemAdd("experience", {
              company: "New Company",
              position: "Position Title",
              startDate: "",
              endDate: "Present",
              location: "",
              description: "",
              achievements: [""],
            })
          }
        >
          <Plus className="h-4 w-4 mr-1" /> Add Experience
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Accordion type="multiple" className="w-full">
          {editedData.experience?.map((exp: any, index: number) => (
            <AccordionItem key={index} value={`exp-${index}`} className="border-gray-800">
              <AccordionTrigger className="hover:bg-gray-800/50 px-4 rounded-md">
                <div className="flex justify-between w-full items-center pr-4">
                  <span>{exp.company || "New Experience"}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-gray-400 hover:text-red-400"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleArrayItemRemove("experience", index)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-2 pb-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company</label>
                    <Input
                      value={exp.company || ""}
                      onChange={(e) => handleArrayInputChange("experience", index, "company", e.target.value)}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Position</label>
                    <Input
                      value={exp.position || ""}
                      onChange={(e) => handleArrayInputChange("experience", index, "position", e.target.value)}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Input
                      value={exp.startDate || ""}
                      onChange={(e) => handleArrayInputChange("experience", index, "startDate", e.target.value)}
                      placeholder="YYYY-MM"
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Input
                      value={exp.endDate || ""}
                      onChange={(e) => handleArrayInputChange("experience", index, "endDate", e.target.value)}
                      placeholder="YYYY-MM or Present"
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    value={exp.location || ""}
                    onChange={(e) => handleArrayInputChange("experience", index, "location", e.target.value)}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={exp.description || ""}
                    onChange={(e) => handleArrayInputChange("experience", index, "description", e.target.value)}
                    rows={3}
                    className="bg-gray-800 border-gray-700 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Achievements</label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newAchievements = [...exp.achievements, ""]
                        handleArrayInputChange("experience", index, "achievements", newAchievements)
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add
                    </Button>
                  </div>

                  {exp.achievements?.map((achievement: string, achIndex: number) => (
                    <div key={achIndex} className="flex gap-2">
                      <Input
                        value={achievement}
                        onChange={(e) => {
                          const newAchievements = [...exp.achievements]
                          newAchievements[achIndex] = e.target.value
                          handleArrayInputChange("experience", index, "achievements", newAchievements)
                        }}
                        className="bg-gray-800 border-gray-700"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-gray-400 hover:text-red-400"
                        onClick={() => {
                          const newAchievements = exp.achievements.filter((_: string, i: number) => i !== achIndex)
                          handleArrayInputChange("experience", index, "achievements", newAchievements)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )

  const renderEducation = () => (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Education</CardTitle>
          <CardDescription>Your academic background</CardDescription>
        </div>
        <Button
          size="sm"
          onClick={() =>
            handleArrayItemAdd("education", {
              institution: "University Name",
              degree: "Degree",
              field: "Field of Study",
              startDate: "",
              endDate: "",
              gpa: "",
              location: "",
              achievements: [""],
            })
          }
        >
          <Plus className="h-4 w-4 mr-1" /> Add Education
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Accordion type="multiple" className="w-full">
          {editedData.education?.map((edu: any, index: number) => (
            <AccordionItem key={index} value={`edu-${index}`} className="border-gray-800">
              <AccordionTrigger className="hover:bg-gray-800/50 px-4 rounded-md">
                <div className="flex justify-between w-full items-center pr-4">
                  <span>{edu.institution || "New Education"}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-gray-400 hover:text-red-400"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleArrayItemRemove("education", index)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-2 pb-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Institution</label>
                  <Input
                    value={edu.institution || ""}
                    onChange={(e) => handleArrayInputChange("education", index, "institution", e.target.value)}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Degree</label>
                    <Input
                      value={edu.degree || ""}
                      onChange={(e) => handleArrayInputChange("education", index, "degree", e.target.value)}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Field of Study</label>
                    <Input
                      value={edu.field || ""}
                      onChange={(e) => handleArrayInputChange("education", index, "field", e.target.value)}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Input
                      value={edu.startDate || ""}
                      onChange={(e) => handleArrayInputChange("education", index, "startDate", e.target.value)}
                      placeholder="YYYY-MM"
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Input
                      value={edu.endDate || ""}
                      onChange={(e) => handleArrayInputChange("education", index, "endDate", e.target.value)}
                      placeholder="YYYY-MM or Present"
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">GPA</label>
                    <Input
                      value={edu.gpa || ""}
                      onChange={(e) => handleArrayInputChange("education", index, "gpa", e.target.value)}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      value={edu.location || ""}
                      onChange={(e) => handleArrayInputChange("education", index, "location", e.target.value)}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Achievements</label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newAchievements = [...(edu.achievements || []), ""]
                        handleArrayInputChange("education", index, "achievements", newAchievements)
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add
                    </Button>
                  </div>

                  {edu.achievements?.map((achievement: string, achIndex: number) => (
                    <div key={achIndex} className="flex gap-2">
                      <Input
                        value={achievement}
                        onChange={(e) => {
                          const newAchievements = [...edu.achievements]
                          newAchievements[achIndex] = e.target.value
                          handleArrayInputChange("education", index, "achievements", newAchievements)
                        }}
                        className="bg-gray-800 border-gray-700"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-gray-400 hover:text-red-400"
                        onClick={() => {
                          const newAchievements = edu.achievements.filter((_: string, i: number) => i !== achIndex)
                          handleArrayInputChange("education", index, "achievements", newAchievements)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )

  const renderSkills = () => (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Skills</CardTitle>
          <CardDescription>Your technical and professional skills</CardDescription>
        </div>
        <Button
          size="sm"
          onClick={() =>
            handleArrayItemAdd("skills", {
              name: "New Skill",
              level: "Intermediate",
              category: "Category",
            })
          }
        >
          <Plus className="h-4 w-4 mr-1" /> Add Skill
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {editedData.skills?.map((skill: any, index: number) => (
            <div key={index} className="flex items-center gap-2 bg-gray-800 p-3 rounded-md">
              <div className="flex-1 space-y-1">
                <Input
                  value={skill.name || ""}
                  onChange={(e) => handleArrayInputChange("skills", index, "name", e.target.value)}
                  className="bg-gray-700 border-gray-600"
                  placeholder="Skill name"
                />
                <div className="flex gap-2">
                  <select
                    value={skill.level || "Intermediate"}
                    onChange={(e) => handleArrayInputChange("skills", index, "level", e.target.value)}
                    className="flex h-9 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <Input
                    value={skill.category || ""}
                    onChange={(e) => handleArrayInputChange("skills", index, "category", e.target.value)}
                    className="bg-gray-700 border-gray-600"
                    placeholder="Category"
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-gray-400 hover:text-red-400 self-start"
                onClick={() => handleArrayItemRemove("skills", index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderProjects = () => (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Your notable projects and accomplishments</CardDescription>
        </div>
        <Button
          size="sm"
          onClick={() =>
            handleArrayItemAdd("projects", {
              name: "New Project",
              description: "",
              startDate: "",
              endDate: "",
              url: "",
              technologies: [],
              achievements: [],
            })
          }
        >
          <Plus className="h-4 w-4 mr-1" /> Add Project
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Accordion type="multiple" className="w-full">
          {editedData.projects?.map((project: any, index: number) => (
            <AccordionItem key={index} value={`proj-${index}`} className="border-gray-800">
              <AccordionTrigger className="hover:bg-gray-800/50 px-4 rounded-md">
                <div className="flex justify-between w-full items-center pr-4">
                  <span>{project.name || "New Project"}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-gray-400 hover:text-red-400"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleArrayItemRemove("projects", index)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-2 pb-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Name</label>
                  <Input
                    value={project.name || ""}
                    onChange={(e) => handleArrayInputChange("projects", index, "name", e.target.value)}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={project.description || ""}
                    onChange={(e) => handleArrayInputChange("projects", index, "description", e.target.value)}
                    rows={3}
                    className="bg-gray-800 border-gray-700 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Input
                      value={project.startDate || ""}
                      onChange={(e) => handleArrayInputChange("projects", index, "startDate", e.target.value)}
                      placeholder="YYYY-MM"
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Input
                      value={project.endDate || ""}
                      onChange={(e) => handleArrayInputChange("projects", index, "endDate", e.target.value)}
                      placeholder="YYYY-MM or Present"
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">URL</label>
                  <Input
                    value={project.url || ""}
                    onChange={(e) => handleArrayInputChange("projects", index, "url", e.target.value)}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Technologies</label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newTech = [...(project.technologies || []), ""]
                        handleArrayInputChange("projects", index, "technologies", newTech)
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech: string, techIndex: number) => (
                      <div key={techIndex} className="flex items-center bg-gray-800 rounded-full pl-3 pr-1 py-1">
                        <Input
                          value={tech}
                          onChange={(e) => {
                            const newTech = [...project.technologies]
                            newTech[techIndex] = e.target.value
                            handleArrayInputChange("projects", index, "technologies", newTech)
                          }}
                          className="bg-transparent border-0 p-0 h-6 w-auto focus-visible:ring-0"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-gray-400 hover:text-red-400 rounded-full"
                          onClick={() => {
                            const newTech = project.technologies.filter((_: string, i: number) => i !== techIndex)
                            handleArrayInputChange("projects", index, "technologies", newTech)
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Achievements</label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newAchievements = [...(project.achievements || []), ""]
                        handleArrayInputChange("projects", index, "achievements", newAchievements)
                      }}
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add
                    </Button>
                  </div>

                  {project.achievements?.map((achievement: string, achIndex: number) => (
                    <div key={achIndex} className="flex gap-2">
                      <Input
                        value={achievement}
                        onChange={(e) => {
                          const newAchievements = [...project.achievements]
                          newAchievements[achIndex] = e.target.value
                          handleArrayInputChange("projects", index, "achievements", newAchievements)
                        }}
                        className="bg-gray-800 border-gray-700"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-gray-400 hover:text-red-400"
                        onClick={() => {
                          const newAchievements = project.achievements.filter((_: string, i: number) => i !== achIndex)
                          handleArrayInputChange("projects", index, "achievements", newAchievements)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="flex justify-between items-center sticky top-0 z-10 bg-gray-950 py-2 mb-4">
        <h2 className="text-xl font-bold">Resume Details</h2>
        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-5 mb-4">
          <TabsTrigger value="personal" className="flex-1">
            Personal
          </TabsTrigger>
          <TabsTrigger value="experience" className="flex-1">
            Experience
          </TabsTrigger>
          <TabsTrigger value="education" className="flex-1">
            Education
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex-1">
            Skills
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex-1">
            Projects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-0">
          {renderPersonalInfo()}
        </TabsContent>

        <TabsContent value="experience" className="mt-0">
          {renderExperience()}
        </TabsContent>

        <TabsContent value="education" className="mt-0">
          {renderEducation()}
        </TabsContent>

        <TabsContent value="skills" className="mt-0">
          {renderSkills()}
        </TabsContent>

        <TabsContent value="projects" className="mt-0">
          {renderProjects()}
        </TabsContent>
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-20"
      >
        <Button onClick={handleSave} size="lg" className="bg-green-600 hover:bg-green-700 shadow-lg">
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </motion.div>
    </div>
  )
}
