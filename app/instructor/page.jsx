"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { useAuth } from "@/hooks/useAuth"
import { BarChart3, Plus, Edit, Trash2, Eye } from "lucide-react"

export default function InstructorDashboard() {
  const router = useRouter()
  const { user, isAuthenticated, loading } = useAuth()
  const [createdCourses, setCreatedCourses] = useState([])
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/signin")
    }
  }, [isAuthenticated, loading, router])

  useEffect(() => {
    // Load created courses from localStorage
    const courses = JSON.parse(localStorage.getItem("created_courses") || "[]")
    setCreatedCourses(courses)

    // Calculate stats
    const totalStudents = courses.reduce((sum, c) => sum + (c.students || 0), 0)
    const totalRevenue = courses.reduce((sum, c) => sum + (c.isFree ? 0 : c.price * (c.students || 0)), 0)
    setStats({
      totalStudents,
      totalCourses: courses.length,
      totalRevenue,
    })
  }, [])

  const handleDeleteCourse = (courseId) => {
    if (confirm("Are you sure you want to delete this course?")) {
      const updated = createdCourses.filter((c) => c.id !== courseId)
      setCreatedCourses(updated)
      localStorage.setItem("created_courses", JSON.stringify(updated))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2">Instructor Dashboard</h1>
            <p className="text-foreground-muted">Manage your courses and track your students</p>
          </div>
          <Link href="/instructor/create-course" className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Course
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-lg border border-border bg-background shadow-sm p-6">
            <p className="text-sm text-foreground-muted mb-1">Total Courses</p>
            <p className="text-3xl font-bold text-primary">{stats.totalCourses}</p>
          </div>
          <div className="rounded-lg border border-border bg-background shadow-sm p-6">
            <p className="text-sm text-foreground-muted mb-1">Total Students</p>
            <p className="text-3xl font-bold text-primary">{stats.totalStudents}</p>
          </div>
          <div className="rounded-lg border border-border bg-background shadow-sm p-6">
            <p className="text-sm text-foreground-muted mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-primary">${stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        {/* My Courses */}
        <div>
          <h2 className="text-2xl font-bold mb-6">My Courses</h2>

          {createdCourses.length === 0 ? (
            <div className="rounded-lg border border-border bg-background shadow-sm p-12 text-center">
              <BarChart3 className="w-12 h-12 text-foreground-muted mx-auto mb-4 opacity-50" />
              <p className="text-foreground-muted mb-4">You haven't created any courses yet</p>
              <Link href="/instructor/create-course" className="btn-primary">
                Create Your First Course
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {createdCourses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-lg border border-border bg-background shadow-sm p-6 hover:shadow-md transition"
                >
                  <div className="flex gap-6 items-start">
                    {/* Thumbnail */}
                    <div className="w-32 h-24 flex-shrink-0 bg-background-secondary rounded-lg flex items-center justify-center">
                      <span className="text-xs text-foreground-muted text-center px-2">{course.category}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold">{course.title}</h3>
                          <p className="text-sm text-foreground-muted">{course.duration}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            course.isFree
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                          }`}
                        >
                          {course.isFree ? "Free" : `$${course.price}`}
                        </span>
                      </div>

                      <p className="text-sm text-foreground-muted mb-3 line-clamp-2">{course.description}</p>

                      <div className="flex gap-2 text-xs text-foreground-muted">
                        <span>{course.lessons?.length || 0} lessons</span>
                        <span>•</span>
                        <span>{course.students || 0} students</span>
                        <span>•</span>
                        <span>{course.level}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => router.push(`/courses/${course.slug || course.id}`)}
                        className="p-2 hover:bg-background-secondary rounded-lg transition"
                        title="View course"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => router.push(`/instructor/edit-course/${course.id}`)}
                        className="p-2 hover:bg-background-secondary rounded-lg transition"
                        title="Edit course"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition text-red-600 dark:text-red-400"
                        title="Delete course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
