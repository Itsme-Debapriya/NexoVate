"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { ChevronRight, Check } from "lucide-react"

const STEPS = [
  { id: 1, name: "Basic Info", title: "Course Details" },
  { id: 2, name: "Curriculum", title: "Add Lessons" },
  { id: 3, name: "Pricing", title: "Set Price" },
  { id: 4, name: "Publish", title: "Review & Publish" },
]

export default function CreateCoursePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Web Development",
    level: "Beginner",
    duration: "",
    lessons: [],
    price: 0,
    isFree: true,
  })
  const [lessons, setLessons] = useState([])
  const [newLesson, setNewLesson] = useState({ title: "", duration: "" })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddLesson = () => {
    if (newLesson.title && newLesson.duration) {
      setLessons([...lessons, { id: Date.now(), ...newLesson }])
      setNewLesson({ title: "", duration: "" })
    }
  }

  const handleRemoveLesson = (id) => {
    setLessons(lessons.filter((l) => l.id !== id))
  }

  const handlePublish = () => {
    // Mock publish - save to localStorage
    const courses = JSON.parse(localStorage.getItem("created_courses") || "[]")
    courses.push({
      id: Date.now(),
      ...formData,
      lessons,
      instructor: { id: 1, name: "Instructor", avatar: "" },
      students: 0,
      rating: 0,
      reviews: 0,
    })
    localStorage.setItem("created_courses", JSON.stringify(courses))
    router.push("/dashboard")
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.description && formData.category
      case 2:
        return lessons.length > 0
      case 3:
        return formData.isFree || formData.price > 0
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Steps */}
        <div className="mb-12">
          <div className="flex justify-between mb-8">
            {STEPS.map((step, idx) => (
              <div key={step.id} className="flex items-center flex-1">
                <button
                  onClick={() => idx < currentStep && setCurrentStep(step.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition ${
                    currentStep >= step.id ? "bg-primary text-white" : "bg-border text-foreground"
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                </button>
                {idx < STEPS.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 transition ${currentStep > step.id ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Title */}
          <h1 className="text-2xl font-bold">{STEPS[currentStep - 1].title}</h1>
        </div>

        {/* Step Content */}
        <div className="rounded-lg border border-border bg-background shadow-sm p-8 mb-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Course Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter course title"
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your course"
                  className="input resize-none"
                  rows="4"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="input">
                    <option>Web Development</option>
                    <option>Programming</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Business</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Level</label>
                  <select name="level" value={formData.level} onChange={handleInputChange} className="input">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Expected Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 40 hours"
                  className="input"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Add Lesson Form */}
              <div className="rounded-lg border border-border bg-background shadow-sm p-4 border-2 border-dashed">
                <h3 className="font-medium mb-4">Add a Lesson</h3>
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      value={newLesson.title}
                      onChange={(e) => setNewLesson((p) => ({ ...p, title: e.target.value }))}
                      placeholder="Lesson title"
                      className="input"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={newLesson.duration}
                      onChange={(e) => setNewLesson((p) => ({ ...p, duration: e.target.value }))}
                      placeholder="Duration (e.g., 45 min)"
                      className="input"
                    />
                  </div>
                  <button onClick={handleAddLesson} className="btn-primary w-full">
                    Add Lesson
                  </button>
                </div>
              </div>

              {/* Lessons List */}
              {lessons.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">Lessons</h3>
                  <ul className="space-y-2">
                    {lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="flex items-center justify-between p-3 bg-background-secondary rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{lesson.title}</p>
                          <p className="text-xs text-foreground-muted">{lesson.duration}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveLesson(lesson.id)}
                          className="text-red-500 text-sm hover:underline"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={formData.isFree}
                    onChange={() => setFormData((p) => ({ ...p, isFree: true, price: 0 }))}
                  />
                  <span className="font-medium">Free</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!formData.isFree}
                    onChange={() => setFormData((p) => ({ ...p, isFree: false }))}
                  />
                  <span className="font-medium">Paid</span>
                </label>
              </div>

              {!formData.isFree && (
                <div>
                  <label className="block text-sm font-medium mb-2">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    className="input"
                  />
                </div>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Review Your Course</h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <span className="font-medium">Title:</span> {formData.title}
                  </p>
                  <p>
                    <span className="font-medium">Category:</span> {formData.category}
                  </p>
                  <p>
                    <span className="font-medium">Level:</span> {formData.level}
                  </p>
                  <p>
                    <span className="font-medium">Lessons:</span> {lessons.length}
                  </p>
                  <p>
                    <span className="font-medium">Price:</span> {formData.isFree ? "Free" : `$${formData.price}`}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm text-blue-800 dark:text-blue-200">
                <p>
                  Your course will be published and visible to all users. You can edit it later from your instructor
                  dashboard.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="btn-outline flex-1 disabled:opacity-50"
          >
            Previous
          </button>

          {currentStep < STEPS.length ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
              className="btn-primary flex-1 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={handlePublish} className="btn-primary flex-1">
              Publish Course
            </button>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href="/dashboard" className="text-foreground-muted hover:text-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
