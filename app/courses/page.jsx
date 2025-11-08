"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { CourseCard } from "@/components/CourseCard"
import { CourseFilters } from "@/components/CourseFilters"
import { useCourses } from "@/hooks/useCourses"

export default function CoursesPage() {
  const { courses, loading } = useCourses()
  const [filters, setFilters] = useState({
    searchQuery: "",
    category: "",
    level: "",
    sortBy: "popular",
  })
  const [currentPage, setCurrentPage] = useState(1)
  const coursesPerPage = 12

  const filteredAndSortedCourses = useMemo(() => {
    let result = courses

    // Filter by search
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.instructor.name.toLowerCase().includes(query),
      )
    }

    // Filter by category
    if (filters.category) {
      result = result.filter((c) => c.category === filters.category)
    }

    // Filter by level
    if (filters.level) {
      result = result.filter((c) => c.level === filters.level)
    }

    // Sort
    switch (filters.sortBy) {
      case "newest":
        result = [...result].reverse()
        break
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case "popular":
      default:
        result = [...result].sort((a, b) => b.students - a.students)
    }

    return result
  }, [courses, filters])

  const paginatedCourses = filteredAndSortedCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage,
  )

  const totalPages = Math.ceil(filteredAndSortedCourses.length / coursesPerPage)

  const categories = Array.from(new Set(courses.map((c) => c.category)))
  const levels = Array.from(new Set(courses.map((c) => c.level)))

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="bg-background-secondary border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Explore Courses</h1>
          <p className="text-foreground-muted">Discover from {courses.length}+ courses and start learning today</p>
        </div>
      </section>

      {/* Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <CourseFilters courses={courses} onFiltersChange={setFilters} categories={categories} levels={levels} />

        {/* Results Header */}
        <div className="mb-8">
          <p className="text-sm text-foreground-muted">
            Showing {paginatedCourses.length} of {filteredAndSortedCourses.length} courses
          </p>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton h-64" />
            ))}
          </div>
        ) : paginatedCourses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-foreground-muted mb-4">No courses found</p>
            <button
              onClick={() =>
                setFilters({
                  searchQuery: "",
                  category: "",
                  level: "",
                  sortBy: "popular",
                })
              }
              className="text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {paginatedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="btn-outline disabled:opacity-50"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition ${
                      currentPage === page
                        ? "bg-primary text-white"
                        : "border border-border hover:bg-background-secondary"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="btn-outline disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </div>
  )
}
