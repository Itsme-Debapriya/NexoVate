"use client"

import { Search, Filter, X } from "lucide-react"
import { useEffect, useState } from "react"

export function CourseFilters({ courses, onFiltersChange, categories, levels }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)

  // Trigger filter change whenever a filter value changes
  useEffect(() => {
    onFiltersChange({
      searchQuery,
      category: selectedCategory,
      level: selectedLevel,
      sortBy,
    })
  }, [searchQuery, selectedCategory, selectedLevel, sortBy, onFiltersChange])

  const handleReset = () => {
    setSearchQuery("")
    setSelectedCategory("")
    setSelectedLevel("")
    setSortBy("popular")
    onFiltersChange({
      searchQuery: "",
      category: "",
      level: "",
      sortBy: "popular",
    })
  }

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input pl-10 w-full"
        />
      </div>

      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden w-full flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-background-secondary transition"
      >
        <Filter className="w-4 h-4" />
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Filters */}
      <div className={`${showFilters ? "block" : "hidden"} md:flex md:gap-4 md:flex-wrap`}>
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="input">
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Level Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Level</label>
          <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} className="input">
            <option value="">All Levels</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium mb-2">Sort By</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input">
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Reset Button */}
        {(searchQuery || selectedCategory || selectedLevel) && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-background-secondary transition h-fit mt-8 md:mt-8"
          >
            <X className="w-4 h-4" />
            Reset
          </button>
        )}
      </div>
    </div>
  )
}
