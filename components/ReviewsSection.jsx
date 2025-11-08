"use client"

import { Star } from "lucide-react"
import { formatDate } from "@/lib/utils"

export function ReviewsSection({ reviews = [] }) {
  const averageRating =
    reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0

  return (
    <div className="rounded-lg border border-border bg-background shadow-sm p-6">
      <h3 className="text-2xl font-bold mb-6">Reviews</h3>

      {/* Average Rating */}
      {reviews.length > 0 && (
        <div className="mb-8 p-4 bg-background-secondary rounded-lg">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold">{averageRating}</div>
            <div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-border"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-foreground-muted">{reviews.length} reviews</p>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="pb-4 border-b border-border last:border-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium">{review.author}</p>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-border"}`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-foreground-muted">{formatDate(review.date)}</span>
              </div>
              <p className="text-sm text-foreground-muted">{review.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-foreground-muted">No reviews yet</p>
      )}
    </div>
  )
}
