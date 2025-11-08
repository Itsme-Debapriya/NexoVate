"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { EditProfileModal } from "@/components/EditProfileModal"
import { useAuth } from "@/hooks/useAuth"
import { useCourses } from "@/hooks/useCourses"
import { progressStorage } from "@/lib/storage"
import { Edit, Download, Settings } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading, isAuthenticated } = useAuth()
  const { courses } = useCourses()
  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(user)

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/signin")
    }
  }, [isAuthenticated, loading, router])

  // Sync currentUser state with user once it loads
  useEffect(() => {
    setCurrentUser(user)
  }, [user])

  if (loading || !currentUser) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse">Loading your dashboard...</div>
        </div>
      </div>
    )
  }

  const enrolledCourses =
    courses?.filter((c) => currentUser.enrolledCourses?.includes(c.id)) || []

  const getProgressPercentage = (courseId) => {
    const progress = progressStorage.getProgress(currentUser.id, courseId)
    const course = courses.find((c) => c.id === courseId)
    if (!course || !course.lessons) return 0
    return Math.round((progress.completedLessons.length / course.lessons.length) * 100)
  }

  const handleExportProgress = () => {
    const progressData = enrolledCourses.map((course) => ({
      courseName: course.title,
      progress: getProgressPercentage(course.id),
      instructor: course.instructor.name,
    }))

    const csv =
      "Course,Progress %,Instructor\n" +
      progressData.map((p) => `${p.courseName},${p.progress},${p.instructor}`).join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "progress.csv"
    a.click()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {currentUser?.name || "Learner"}!
          </h1>
          <p className="text-foreground-muted">
            Track your learning progress and manage your courses
          </p>
        </div>

        {/* Profile Card */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2">
            <div className="rounded-lg border border-border bg-background shadow-sm p-6">
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={currentUser.avatar || "/placeholder.svg"}
                  alt={currentUser?.name || "User Avatar"}
                  className="w-20 h-20 rounded-full"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{currentUser?.name || "Unnamed User"}</h2>
                  <p className="text-foreground-muted text-sm mt-1">
                    {currentUser?.bio || "No bio added"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditProfileOpen(true)}
                className="flex items-center gap-2 btn-secondary"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-background shadow-sm p-4 text-center">
              <p className="text-3xl font-bold text-primary">{enrolledCourses.length}</p>
              <p className="text-sm text-foreground-muted">Enrolled Courses</p>
            </div>
            <div className="rounded-lg border border-border bg-background shadow-sm p-4 text-center">
              <p className="text-3xl font-bold text-primary">
                {enrolledCourses.length > 0
                  ? Math.round(
                      enrolledCourses.reduce(
                        (sum, c) => sum + getProgressPercentage(c.id),
                        0
                      ) / enrolledCourses.length
                    )
                  : 0}
                %
              </p>
              <p className="text-sm text-foreground-muted">Avg Progress</p>
            </div>
          </div>
        </div>

        {/* My Courses */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">My Courses</h2>
            {enrolledCourses.length > 0 && (
              <button
                onClick={handleExportProgress}
                className="flex items-center gap-2 btn-outline"
              >
                <Download className="w-4 h-4" />
                Export Progress
              </button>
            )}
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="rounded-lg border border-border bg-background shadow-sm p-12 text-center">
              <p className="text-foreground-muted mb-4">
                You haven't enrolled in any courses yet
              </p>
              <Link href="/courses" className="btn-primary">
                Explore Courses
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {enrolledCourses.map((course) => {
                const progress = getProgressPercentage(course.id)
                return (
                  <div
                    key={course.id}
                    className="rounded-lg border border-border bg-background shadow-sm p-6"
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="w-24 h-24 flex-shrink-0">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <Link
                          href={`/courses/${course.slug}`}
                          className="font-bold hover:text-primary transition"
                        >
                          {course.title}
                        </Link>
                        <p className="text-sm text-foreground-muted mt-1">
                          {course.instructor.name}
                        </p>

                        {/* Progress Bar */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium">{progress}% Complete</span>
                            <span className="text-xs text-foreground-muted">
                              {course.duration}
                            </span>
                          </div>
                          <div className="w-full bg-border rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex items-center">
                        <Link href={`/courses/${course.slug}`} className="btn-primary">
                          Continue
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="rounded-lg border border-border bg-background shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5" />
            <h3 className="font-bold text-lg">Settings</h3>
          </div>
          <p className="text-sm text-foreground-muted mb-4">
            Manage your account and preferences in the navigation menu using the theme toggle.
          </p>
        </div>
      </div>

      {editProfileOpen && (
        <EditProfileModal
          user={currentUser}
          onClose={() => setEditProfileOpen(false)}
          onSave={setCurrentUser}
        />
      )}

      <Footer />
    </div>
  )
}
