"use client"

import { useEffect, useState } from "react"

export function useCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    const fetchCourses = async () => {
      try {
        const response = await fetch("/mock-data/courses.json")
        const data = await response.json()
        setCourses(data.courses)
      } catch (error) {
        console.error("Error fetching courses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const getCourseById = (id) => courses.find((c) => c.id === id)
  const getCourseBySlug = (slug) => courses.find((c) => c.slug === slug)

  return { courses, loading, getCourseById, getCourseBySlug }
}
