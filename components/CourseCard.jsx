"use client"

import Link from "next/link"
import { Star, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export function CourseCard({ course, isHorizontal = false }) {
  const badgeColor = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-blue-100 text-blue-800",
    Advanced: "bg-purple-100 text-purple-800",
  }

  return (
    <Link href={`/courses/${course.slug}`}>
      <div
        className={cn(
          "rounded-lg border border-border bg-background shadow-sm transition-all hover:shadow-md hover:border-primary/20 group",
          isHorizontal && "md:flex md:gap-4 md:p-4",
        )}
      >
        {/* Image */}
        <div className="relative w-full h-40 md:h-50 overflow-hidden rounded-lg mb-4 md:mb-0">
          <img
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium ${badgeColor[course.level]}`}>
            {course.level}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-3">
          <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition">{course.title}</h3>

          <p className="text-sm text-foreground-muted mb-3 line-clamp-2">{course.description}</p>

          <div className="flex items-center gap-4 mb-3 text-sm text-foreground-muted">
            <span>{course.duration}</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>
                {course.rating} ({course.reviewCount})
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{course.students.toLocaleString()}</span>
            </div>
          </div>

          {/* Instructor & Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={course.instructor.avatar || "/placeholder.svg"}
                alt={course.instructor.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-xs text-foreground-muted">{course.instructor.name}</span>
            </div>
            <span className="font-bold text-primary">{course.isFree ? "Free" : `$${course.price}`}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
