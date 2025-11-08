"use client"

import { useState } from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { progressStorage } from "@/lib/storage"
import { useAuth } from "@/hooks/useAuth"

export function LessonPlayer({ course, lessons }) {
  const { user } = useAuth()
  const [currentLesson, setCurrentLesson] = useState(lessons[0] || null)
  const [expandedLessons, setExpandedLessons] = useState(true)
  const [completedLessons, setCompletedLessons] = useState(() => {
    if (user) {
      const progress = progressStorage.getProgress(user.id, course.id)
      return progress.completedLessons || []
    }
    return []
  })

  const handleMarkComplete = () => {
    if (!user || !currentLesson) return

    const updated = completedLessons.includes(currentLesson.id)
      ? completedLessons.filter((id) => id !== currentLesson.id)
      : [...completedLessons, currentLesson.id]

    setCompletedLessons(updated)

    // Save to localStorage
    progressStorage.setProgress(user.id, course.id, {
      completedLessons: updated,
      lastWatched: currentLesson.id,
      completedAt: new Date().toISOString(),
    })
  }

  const isLessonCompleted = (lessonId) => completedLessons.includes(lessonId)
  const completionPercentage = Math.round((completedLessons.length / lessons.length) * 100)

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      {/* Video Player */}
      <div className="lg:col-span-3">
        {currentLesson ? (
          <div className="space-y-4">
            {/* Video */}
            <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-video">
              {currentLesson.videoUrl && (
                <iframe
                  src={currentLesson.videoUrl}
                  title={currentLesson.title}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              )}
            </div>

            {/* Lesson Info */}
            <div className="rounded-lg border border-border bg-background shadow-sm p-4">
              <h2 className="text-xl font-bold mb-2">{currentLesson.title}</h2>
              <p className="text-sm text-foreground-muted mb-4">Duration: {currentLesson.duration}</p>

              {/* Mark Complete Button */}
              <button
                onClick={handleMarkComplete}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  isLessonCompleted(currentLesson.id) ? "bg-green-500 text-white" : "btn-primary"
                }`}
              >
                <Check className="w-4 h-4" />
                {isLessonCompleted(currentLesson.id) ? "Completed" : "Mark as Complete"}
              </button>
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-background-secondary rounded-lg flex items-center justify-center">
            <p className="text-foreground-muted">Select a lesson to start</p>
          </div>
        )}
      </div>

      {/* Lesson Sidebar */}
      <div className="lg:col-span-1">
        <div className="rounded-lg border border-border bg-background shadow-sm p-4 sticky top-20">
          {/* Course Progress */}
          <div className="mb-6">
            <p className="text-xs font-medium text-foreground-muted mb-2">Course Progress</p>
            <div className="w-full bg-border rounded-full h-2 mb-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-sm font-medium">{completionPercentage}% Complete</p>
          </div>

          {/* Lessons List */}
          <div>
            <button
              onClick={() => setExpandedLessons(!expandedLessons)}
              className="flex items-center justify-between w-full font-medium mb-3"
            >
              <span>Lessons</span>
              {expandedLessons ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {expandedLessons && (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => setCurrentLesson(lesson)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition text-sm ${
                      currentLesson?.id === lesson.id ? "bg-primary text-white" : "hover:bg-background-secondary"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {isLessonCompleted(lesson.id) && (
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-500" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-xs">{lesson.title}</p>
                        <p className="text-xs opacity-75">{lesson.duration}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
