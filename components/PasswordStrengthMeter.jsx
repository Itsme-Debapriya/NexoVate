"use client"

import { getPasswordStrength } from "@/lib/utils"

export function PasswordStrengthMeter({ password }) {
  const strength = getPasswordStrength(password)
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"]
  const strengthColors = ["bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"]

  return (
    <div className="space-y-2">
      <div className="flex gap-1 h-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex-1 rounded-full transition-colors ${
              i < strength ? strengthColors[strength - 1] : "bg-border"
            }`}
          />
        ))}
      </div>
      {password && (
        <p className="text-xs text-foreground-muted">
          Password strength: <span className="font-medium">{strengthLabels[Math.min(strength - 1, 3)]}</span>
        </p>
      )}
    </div>
  )
}
