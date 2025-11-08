"use client"

import Link from "next/link"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { CourseCard } from "@/components/CourseCard"
import { useCourses } from "@/hooks/useCourses"
import { ArrowRight, BookOpen, Users, Trophy } from "lucide-react"

export default function HomePage() {
  const { courses, loading } = useCourses()
  const featuredCourses = courses.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Learn Anything, Anytime, Anywhere
            </h1>
            <p className="text-lg text-foreground-muted mb-6">
              Master new skills with our comprehensive courses taught by industry experts. Start your learning journey
              today.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/courses" className="btn-primary">
                Explore Courses
              </Link>
              <Link href="/signup" className="btn-outline">
                Get Started
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-primary">500+</div>
                <p className="text-sm text-foreground-muted">Courses</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">50K+</div>
                <p className="text-sm text-foreground-muted">Students</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">4.8★</div>
                <p className="text-sm text-foreground-muted">Rating</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <img src="/student-learning-online.jpg" alt="Learning" className="w-full rounded-xl shadow-lg" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose NexoVate?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-lg border border-border bg-background shadow-sm p-6">
              <BookOpen className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
              <p className="text-foreground-muted">Learn from industry professionals with real-world experience.</p>
            </div>
            <div className="rounded-lg border border-border bg-background shadow-sm p-6">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Community Support</h3>
              <p className="text-foreground-muted">
                Connect with peers and get help from a supportive learning community.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-background shadow-sm p-6">
              <Trophy className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Certificates</h3>
              <p className="text-foreground-muted">Earn recognized certificates to showcase your achievements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2">Featured Courses</h2>
          <p className="text-foreground-muted">Start learning from our most popular courses today.</p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-64" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/courses" className="inline-flex items-center gap-2 btn-primary">
                View All Courses
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of students already learning on NexoVate. Start your free trial today.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-background-secondary transition"
          >
            Sign Up Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
