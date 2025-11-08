"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { LessonPlayer } from "@/components/LessonPlayer"
import { ReviewsSection } from "@/components/ReviewsSection"
import { useCourses } from "@/hooks/useCourses"
import { useAuth } from "@/hooks/useAuth"
import { Star, Users, Clock, ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { getCourseBySlug } = useCourses()
  const { user } = useAuth()
  const [isEnrolled, setIsEnrolled] = useState(false)

  const course = getCourseBySlug(params.slug)

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Course Not Found</h1>
          <p className="text-foreground-muted mt-2">The course you're looking for doesn't exist.</p>
          <Link href="/courses" className="text-primary hover:underline mt-4 inline-block">
            Back to Courses
          </Link>
        </div>
      </div>
    )
  }

  const handleEnroll = () => {
    if (!user) {
      router.push("/signup")
      return
    }
    setIsEnrolled(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Course Hero */}
      <section className="bg-background-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium mb-4">
                {course.level}
              </div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-foreground-muted mb-6">{course.description}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>
                    {course.rating} ({course.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="mt-8 flex items-center gap-4 p-4 bg-background rounded-lg">
                <img
                  src={course.instructor.avatar || "/placeholder.svg"}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-sm text-foreground-muted">Instructor</p>
                  <p className="font-medium">{course.instructor.name}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="rounded-lg border border-border bg-background shadow-sm p-6 sticky top-20">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />

                <div className="text-3xl font-bold mb-4">{course.isFree ? "Free" : `$${course.price}`}</div>

                {isEnrolled ? (
                  <div className="space-y-3">
                    <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg text-sm">
                      You're enrolled in this course
                    </div>
                    <Link href="#lessons" className="btn-primary w-full block text-center">
                      Go to Lessons
                    </Link>
                  </div>
                ) : (
                  <button onClick={handleEnroll} className="btn-primary w-full">
                    {user ? "Enroll Now" : "Sign Up to Enroll"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isEnrolled && course.lessons && course.lessons.length > 0 ? (
          <div id="lessons">
            <h2 className="text-2xl font-bold mb-6">Course Content</h2>
            <LessonPlayer course={course} lessons={course.lessons} />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-foreground-muted">
              {isEnrolled ? "This course has no lessons yet." : "Enroll in this course to access the lessons."}
            </p>
          </div>
        )}
      </section>

      {/* Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ReviewsSection reviews={course.reviews || []} />
      </section>

      <Footer />
    </div>
  )
}
